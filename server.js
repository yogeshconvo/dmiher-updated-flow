import fs from "node:fs/promises";
import crypto from "node:crypto";
import express from "express";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

// Read VITE_API_BASE from .env so the CSP can whitelist the Laravel backend
// host. process.env is not populated by Vite for non-Vite-bundled code, so
// parse the file directly.
async function loadEnv() {
  const out = {};
  for (const f of [".env", ".env.local", `.env.${process.env.NODE_ENV || "development"}`]) {
    try {
      const text = await fs.readFile(f, "utf-8");
      for (const line of text.split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (m && !line.trim().startsWith("#")) {
          out[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
        }
      }
    } catch {}
  }
  return out;
}
const env = await loadEnv();
const apiBase = process.env.VITE_API_BASE || env.VITE_API_BASE || "";

function sha256(content) {
  return crypto.createHash("sha256").update(content, "utf8").digest("base64");
}

function buildCsp(nonce, scriptHashes = []) {
  const hashList = scriptHashes.map((h) => `'sha256-${h}'`).join(" ");
  if (!isProduction) {
    // Dev: Vite injects an inline React-refresh preamble + uses HMR over WS,
    // and components render with React inline `style={{}}` attributes.
    // Mirror the original vite.config.js dev CSP — `'unsafe-inline'` for
    // script/style, `'unsafe-eval'` for transformed modules, http+ws for the
    // local backend.
    return [
      "default-src 'self'",
      // Important: don't add hashes/nonces here. Per CSP spec, browsers
      // ignore 'unsafe-inline' as soon as any hash or nonce appears in the
      // same source list — which would block Vite's React-refresh preamble.
      // In dev we rely on 'unsafe-inline' for everything; the hash matters in
      // production where 'unsafe-inline' is absent.
      // Third-party script hosts mirrored from the production CSP so dev
      // doesn't silently block them (NoPaperForms enquiry widget, GA, GTM,
      // GetAAI chatbot). Niaa chatbot loads from chatbot.in6.nopaperforms.com
      // and pulls jQuery + its icon image from chatcdn.npfs.co — keep both.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://widgets.in6.nopaperforms.com https://chatbot.in6.nopaperforms.com https://chatcdn.npfs.co https://www.googletagmanager.com https://www.google-analytics.com https://static.getaai.com",
      "style-src 'self' 'unsafe-inline' https://chatbot.in6.nopaperforms.com",
      `img-src 'self' https: http: data:`,
      "font-src 'self' https: data:",
      `connect-src 'self' https: http: ws://localhost:* wss://localhost:* ${apiBase}`,
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com https://docs.google.com https://drive.google.com https://www.googletagmanager.com https://widgets.in6.nopaperforms.com https://chatbot.in6.nopaperforms.com",
      "frame-ancestors 'self'",
      "form-action 'self' https://api.web3forms.com",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; ");
  }

  // Production: mirrors laravel-csp/CspMiddleware.php. `'unsafe-inline'` stays
  // on style-src because React renders many components with inline
  // `style={{}}` attributes that a nonce can't cover. Browsers ignore
  // `'unsafe-inline'` when a nonce is also present in the same directive, so
  // we drop the nonce there to keep inline styles working — script-src keeps
  // the nonce since scripts are the actual attack surface.
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' ${hashList} https://www.googletagmanager.com https://www.google-analytics.com https://widgets.in6.nopaperforms.com https://chatbot.in6.nopaperforms.com https://chatcdn.npfs.co https://static.getaai.com`.replace(/\s+/g, " "),
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://chatbot.in6.nopaperforms.com`,
    `img-src 'self' https: data: ${apiBase}`.trim(),
    "font-src 'self' https://fonts.gstatic.com data:",
    `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://api.web3forms.com https://static.getaai.com https://chatbot.in6.nopaperforms.com ${apiBase}`.trim(),
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com https://docs.google.com https://drive.google.com https://www.googletagmanager.com https://chatbot.in6.nopaperforms.com",
    "frame-ancestors 'self'",
    "form-action 'self' https://api.web3forms.com",
    "object-src 'none'",
    "base-uri 'self'",
  ].join("; ");
}

const app = express();

let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

app.use(/.*/, async (req, res) => {
  try {
    const url = req.originalUrl;

    let template;
    let render;
    if (!isProduction) {
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url);

    const nonce = crypto.randomBytes(24).toString("base64");

    const stateJson = JSON.stringify(rendered.state ?? {}).replace(
      /</g,
      "\\u003c"
    );
    // Inline script body — hash this content (not the surrounding <script>
    // tags) and add 'sha256-<hash>' to script-src so the dehydration script
    // executes without needing a nonce attribute.
    const stateBody = `window.__REACT_QUERY_STATE__ = ${stateJson};`;
    const stateHash = sha256(stateBody);
    const stateScript = `<script>${stateBody}</script>`;

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "")
      .replace(`<!--app-state-->`, stateScript)
      .replaceAll("__CSP_NONCE__", nonce);

    res
      .status(200)
      .set({
        "Content-Type": "text/html",
        "Content-Security-Policy": buildCsp(nonce, [stateHash]),
      })
      .send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.error(e.stack);
    res.status(500).end(e.stack);
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
