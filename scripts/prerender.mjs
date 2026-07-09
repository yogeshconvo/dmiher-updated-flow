/**
 * Post-build SSG script.
 *
 * 1. Starts Vite preview server on the built dist/
 * 2. Uses Puppeteer to visit each route
 * 3. Captures rendered HTML and writes it back to dist/
 * 4. Adds data-server-rendered attribute for hydration detection
 *
 * Usage:  node scripts/prerender.mjs
 * Runs after `vite build` — see "build:ssg" npm script.
 */

import puppeteer from "puppeteer";
import { preview } from "vite";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// dist/client/ matches CI's build output and what FTP mirrors to the webroot.
// Prerender writes each route's index.html here so the deployed static site
// carries fully-rendered HTML on the first byte.
const DIST_DIR = path.resolve(__dirname, "../dist/client");

// Import routes to prerender
const { prerenderRoutes } = await import("../src/prerender-routes.js");

const PORT = 4174;

// vite.config.js bakes base=/dmiher-web/ into every asset URL for prod builds.
// The preview server + Puppeteer must both use the same base, else the browser
// requests /assets/*.js at the root and 404s, React never mounts, and the
// waitForFunction below times out with "#root has no content".
const BASE = "/dmiher-web/";

async function prerender() {
  console.log("\n🔧 Starting prerender...\n");

  // 1. Start Vite preview server (serves built dist/client as production).
  // build.outDir explicitly points at dist/client so `vite preview` finds the
  // built assets — otherwise it looks at the default dist/ and 404s the shell.
  const server = await preview({
    build: { outDir: "dist/client" },
    preview: { port: PORT, strictPort: true },
    base: BASE,
    configFile: false,
  });

  const baseUrl = `http://localhost:${PORT}${BASE}`;
  console.log(`📡 Preview server running at ${baseUrl}`);

  // 2. Launch headless browser
  //
  // --disable-web-security + --user-data-dir: The prerender pass runs from
  // localhost while the site's API (admin.dmiher.edu.in) only sets
  // Access-Control-Allow-Origin for the production origin (dmiher.edu.in).
  // Without these flags every /api/* fetch is CORS-blocked, the app stays in
  // its skeleton state, and we capture an empty page. Disabling web security
  // is safe here because Puppeteer only ever visits our own preview server
  // and our own backend — no untrusted content.
  //
  // --no-sandbox pair: required inside CI containers where user namespaces
  // aren't available. Harmless locally.
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      `--user-data-dir=${path.join(os.tmpdir(), "puppeteer-prerender")}`,
    ],
  });

  try {
    for (const route of prerenderRoutes) {
      // route is authored as "/", "/jnmc", etc.; baseUrl already ends in "/"
      // (it's http://host:port/dmiher-web/) so strip the leading slash from
      // route before joining or we produce "//jnmc" and Vite 404s.
      const url = `${baseUrl}${route.replace(/^\/+/, "")}`;
      console.log(`\n🌐 Prerendering: ${route}  →  ${url}`);

      const page = await browser.newPage();

      // Surface page-side errors so a silent skeleton-only render is diagnosable.
      page.on("pageerror", (e) => console.warn(`   [pageerror] ${e.message}`));
      page.on("console", (msg) => {
        if (msg.type() === "error" || msg.type() === "warning") {
          console.warn(`   [${msg.type()}] ${msg.text()}`);
        }
      });
      page.on("requestfailed", (req) =>
        console.warn(`   [requestfailed] ${req.url()} - ${req.failure()?.errorText}`)
      );

      // Navigate and wait for network to be idle (API calls finished)
      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Wait for the app to leave its <PageSkeleton /> loading state. That
      // only happens when the /pages/{slug} query resolves — either with data
      // (renders <main>) or with an error (renders .error-boundary-fallback).
      // Waiting on "#root.innerHTML.length > 100" alone triggered on the
      // skeleton itself, so we captured a page-skeleton snapshot with no real
      // content. Waiting on <main> or the error UI guarantees data settled.
      await page.waitForFunction(
        () => {
          const root = document.getElementById("root");
          if (!root) return false;
          const stillLoading = root.querySelector(".page-skeleton");
          if (stillLoading) return false;
          return !!(
            root.querySelector("main") ||
            root.querySelector(".error-boundary-fallback")
          );
        },
        { timeout: 30000 }
      );

      // Small extra buffer for any final renders
      await new Promise((r) => setTimeout(r, 1000));

      // 3. Capture the full rendered HTML
      let html = await page.content();

      // Guard: only accept a capture that clearly landed on real content
      // (has <main>) — never a lingering skeleton or a bare error fallback.
      // Without this, an API failure in CI would silently overwrite the
      // Vite-built shell with a broken snapshot, taking the site down.
      if (!/<main\b/i.test(html)) {
        console.warn(
          `   ⚠️  Skipped ${route}: capture has no <main> — likely a data/auth failure. Keeping the Vite shell index.html untouched.`
        );
        failed++;
        continue;
      }

      // 4. Write to the correct file path
      const filePath =
        route === "/"
          ? path.join(DIST_DIR, "index.html")
          : path.join(DIST_DIR, route, "index.html");

      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, html, "utf-8");
      console.log(`   ✅ Written: ${path.relative(DIST_DIR, filePath)}`);

      await page.close();
    }
  } catch (err) {
    console.error("❌ Prerender error:", err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.httpServer.close();
  }

  console.log(
    `\n🎉 Prerender complete! ${prerenderRoutes.length} route(s) rendered.\n`
  );
}

prerender();
