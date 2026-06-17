import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import crypto from "node:crypto";

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

export default defineConfig(({ mode }) => ({
  // Site is hosted at https://dmiher.edu.in/dmiher-web/ — assets must be
  // referenced relative to that subdirectory, not the domain root.
  // Override at build time with `vite build --base=/some-other-path/` if needed.
  base: mode === "production" ? "/dmiher-web/" : "/",
  // base: mode === "production" ? "/" : "/",
  plugins: [
    cspNonceDevPlugin(),
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
    rollupOptions: {
      output: {
        // Split the always-needed framework libs into their own long-lived,
        // cacheable chunks so they aren't re-downloaded on every deploy and
        // don't bloat the per-page section chunks. Everything else (the lazy
        // section chunks) is left to Vite's automatic code-splitting.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler|react-helmet-async)[\\/]/.test(id))
            return "react-vendor";
          if (id.includes("@tanstack")) return "query-vendor";
          if (id.includes("swiper")) return "swiper";
          if (id.includes("lottie")) return "lottie";
          // NOTE: lucide-react and react-icons are deliberately NOT pinned to
          // manual chunks. They depend on React, and forcing them into their
          // own chunk makes rolldown turn that chunk into a shared re-export
          // hub that every page imports — pulling the full icon set onto every
          // route. Left to automatic splitting, each lands in a shared chunk
          // loaded ONLY by the (lazy) routes that actually import it.
        },
      },
    },
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
        // Third-party hosts mirrored from server.js dev CSP so plain `vite dev`
        // (no SSR) and `dev:ssr` agree. NoPaperForms enquiry widget needs its
        // script + frame allowed; GA/GTM/GetAAI follow the prod whitelist.
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://widgets.in6.nopaperforms.com https://www.googletagmanager.com https://www.google-analytics.com https://static.getaai.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' https: data: http://127.0.0.1:8000",
        "font-src 'self' https: data:",
        "connect-src 'self' https: http://127.0.0.1:8000 ws://localhost:*",
        "frame-src 'self' https://widgets.in6.nopaperforms.com",
      ].join("; "),
    } : {},
  },
  ssr: {
    // react-helmet-async ships as CommonJS only; Vite SSR's strict ESM module
    // runner errors with "Named export 'HelmetProvider' not found" if it stays
    // external. Bundling it in via noExternal sidesteps the CJS interop trap.
    noExternal: ["react-helmet-async"],
  },
}));
