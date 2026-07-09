/**
 * Post-build SSG script.
 *
 * 1. Starts Vite preview server against the built dist/client/
 * 2. Uses Puppeteer (headless Chromium) to visit each route in
 *    src/prerender-routes.js and wait for the React tree + API data to settle
 * 3. Captures the fully-rendered HTML and writes it back to
 *    dist/client/<route>/index.html so Apache/spa.php can serve it directly
 *
 * A failure on any single route is logged and skipped — the rest of the
 * routes still prerender, and the CI job doesn't fail just because one slug
 * 404s. The SPA fallback in spa.php will still handle unrendered routes at
 * runtime, so a partial prerender pass is not a broken deploy.
 *
 * Usage:  node scripts/prerender.mjs
 * Runs after `vite build --outDir dist/client` — see "build:ssg" npm script.
 */

import puppeteer from "puppeteer";
import { preview } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Match the CI/FTP layout — dist/client/ is what actually ships to Apache.
// build:ssr and build:ssg both output there, so the prerender pass writes
// alongside index.html/spa.php/.htaccess/assets/ and nothing else moves.
const DIST_DIR = path.resolve(__dirname, "../dist/client");

// Vite build sets base to /dmiher-web/ in production. `vite preview` respects
// that too, so URLs need the prefix or the preview server 404s. Everything
// after this prefix is what we write to disk relative to DIST_DIR.
const BASE = "/dmiher-web/";

const { prerenderRoutes } = await import("../src/prerender-routes.js");

const PORT = 4174;

async function prerender() {
  console.log("\n🔧 Starting prerender...\n");

  const server = await preview({
    // Point preview at the split-build client directory so it serves the same
    // bytes CI/FTP will deploy. configFile: false so we don't accidentally
    // pick up a devSourcemap or dev-only setting from vite.config.js.
    root: path.resolve(__dirname, ".."),
    build: { outDir: "dist/client" },
    preview: { port: PORT, strictPort: true },
    base: BASE,
    configFile: false,
  });

  const baseUrl = `http://localhost:${PORT}${BASE}`.replace(/\/+$/, "/");
  console.log(`📡 Preview server running at ${baseUrl}`);

  const browser = await puppeteer.launch({
    headless: true,
    // --no-sandbox required inside CI containers (no user namespaces).
    // If PUPPETEER_EXECUTABLE_PATH is set (CI installs system chromium),
    // Puppeteer honours it automatically — no extra config needed here.
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let ok = 0;
  let failed = 0;

  try {
    for (const route of prerenderRoutes) {
      // route is authored as "/", "/jnmc", etc. Join to baseUrl carefully
      // so we don't get "//jnmc" or drop segments.
      const url = new URL(route.replace(/^\/+/, ""), baseUrl).toString();
      console.log(`\n🌐 Prerendering: ${route}  →  ${url}`);

      const page = await browser.newPage();
      try {
        await page.goto(url, {
          waitUntil: "networkidle0",
          timeout: 30000,
        });

        // Wait until React has painted real content into #root — the
        // skeleton state has < 100 chars of innerHTML, so this gates on the
        // page actually having rendered its sections.
        await page.waitForFunction(
          () => {
            const root = document.getElementById("root");
            return root && root.innerHTML.length > 100;
          },
          { timeout: 15000 }
        );

        // Buffer for any final effect that runs one frame late (Helmet
        // pushing head tags, lazy-hydrating swiper measuring itself).
        await new Promise((r) => setTimeout(r, 1000));

        const html = await page.content();

        const filePath =
          route === "/"
            ? path.join(DIST_DIR, "index.html")
            : path.join(DIST_DIR, route, "index.html");

        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(filePath, html, "utf-8");
        console.log(`   ✅ Written: ${path.relative(DIST_DIR, filePath)}`);
        ok++;
      } catch (routeErr) {
        // A single-route failure is not a job failure — spa.php falls back
        // to the SPA shell for anything we didn't prerender, so the site
        // still works. Log and move on so a bad slug doesn't block ship.
        console.warn(`   ⚠️  Skipped ${route}: ${routeErr.message}`);
        failed++;
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.httpServer.close();
  }

  console.log(
    `\n🎉 Prerender complete — ${ok} rendered, ${failed} skipped.\n`
  );
}

prerender();
