import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  // Site is hosted at https://dmiher.edu.in/dmiher-web/ — assets must be
  // referenced relative to that subdirectory, not the domain root.
  // Override at build time with `vite build --base=/some-other-path/` if needed.
  base: mode === "production" ? "/dmiher-web/" : "/",
  plugins: [
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
