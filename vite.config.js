import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// Dev-only: stamp a fresh per-request nonce into every __CSP_NONCE__ placeholder
// in index.html, so view-source mirrors the production behavior where Laravel's
// FrontendController does the same stamping. In production this plugin is a no-op —
// Vite build inlines the placeholder verbatim and Laravel replaces it at request time.
const cspNonceDevPlugin = () => ({
  name: "csp-nonce-dev",
  apply: "serve",
  transformIndexHtml: {
    order: "pre",
    handler(html) {
      const nonce = crypto.createHash("sha256")
        .update(crypto.randomBytes(32))
        .digest("hex");
      return html.replaceAll("__CSP_NONCE__", nonce);
    },
  },
});

// Build-only: compute SHA-256 of every emitted JS/CSS asset (from the final
// bytes on disk, AFTER all Vite/Rollup post-processing) and stamp
// integrity="sha256-..." crossorigin="anonymous" onto the matching
// <script src> / <link rel="stylesheet" href> tags in dist/index.html.
// Browsers refuse to run a bundle whose bytes don't match the integrity hash,
// so tampering with files on the FTP host is detected before execution.
const sriBuildPlugin = () => {
  let outDir;
  let basePath;
  return {
    name: "sri-build",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
      basePath = config.base.endsWith("/") ? config.base : config.base + "/";
    },
    closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const html = fs.readFileSync(indexPath, "utf-8");
      const baseEscaped = basePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const tagRe = new RegExp(
        `<(script|link)\\b([^>]*?)\\b(src|href)="${baseEscaped}([^"]+\\.(?:js|css))"([^>]*)>`,
        "g"
      );
      const newHtml = html.replace(tagRe, (match, tag, before, urlAttr, fileName, after) => {
        if (/\bintegrity=/.test(match)) return match;
        const filePath = path.join(outDir, fileName);
        if (!fs.existsSync(filePath)) return match;
        const buf = fs.readFileSync(filePath);
        const hash = crypto.createHash("sha256").update(buf).digest("base64");
        const hasCrossOrigin = /\bcrossorigin\b/.test(match);
        const corsAttr = hasCrossOrigin ? "" : ` crossorigin="anonymous"`;
        return `<${tag}${before}${urlAttr}="${basePath}${fileName}"${after} integrity="sha256-${hash}"${corsAttr}>`;
      });
      if (newHtml !== html) fs.writeFileSync(indexPath, newHtml, "utf-8");
    },
  };
};

export default defineConfig(({ mode }) => ({
  // Site is hosted at https://dmiher.edu.in/dmiher-web/ — assets must be
  // referenced relative to that subdirectory, not the domain root.
  // Override at build time with `vite build --base=/some-other-path/` if needed.
  base: mode === "production" ? "/dmiher-web/" : "/",
  // base: mode === "production" ? "/" : "/",
  plugins: [
    cspNonceDevPlugin(),
    sriBuildPlugin(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  build: {
    // Prevent Vite from inlining any JS/CSS — everything stays as external files.
    // This avoids inline <script>/<style> that would violate strict CSP.
    assetsInlineLimit: 0,
    cssCodeSplit: true,
  },
  css: {
    // In dev, Vite injects styles via JS. This is fine because dev CSP is relaxed.
    // In production, styles are extracted to .css files — no inline styles.
    devSourcemap: true,
  },
  server: {
    // Dev server needs relaxed CSP headers for HMR WebSocket + injected modules
    headers: mode === "development" ? {
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' https: data: http://127.0.0.1:8000",
        "font-src 'self' https: data:",
        "connect-src 'self' https: http://127.0.0.1:8000 ws://localhost:*",
      ].join("; "),
    } : {},
  },
}));
