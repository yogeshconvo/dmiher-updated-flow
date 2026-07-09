/**
 * Post-build SSG script.
 *
 * Flow:
 *   1. Vite build has already produced dist/client/index.html — the empty SPA
 *      shell. Copy that shell to dist/client/index.shell.html BEFORE running
 *      Puppeteer, so we always have a clean shell to serve for URLs that
 *      aren't in prerenderRoutes (micropages, department pages, arbitrary
 *      client-side routes).
 *   2. Start Vite preview server on the built dist/client with base=/dmiher-web/.
 *   3. Puppeteer visits every route in src/prerender-routes.js, waits for the
 *      React tree + API data to settle (leaves the PageSkeleton loading
 *      state), and captures the fully-rendered HTML.
 *   4. Write each capture to dist/client/<route>/index.html (or index.html at
 *      the root for "/").
 *
 * Per-route failures are logged and skipped — they don't fail the whole pass,
 * and a "no <main>" safety guard prevents a broken capture from overwriting
 * a working shell. So an upstream 401/timeout/5xx in CI can never take the
 * site down: at worst the site keeps serving the SPA shell for that route.
 *
 * Usage:  node scripts/prerender.mjs
 * Runs after `vite build --outDir dist/client` — see "build:ssg" npm script.
 */

import puppeteer from "puppeteer";
import { preview } from "vite";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// dist/client/ matches CI's build output and what FTP mirrors to the webroot.
const DIST_DIR = path.resolve(__dirname, "../dist/client");
const SHELL_PATH = path.join(DIST_DIR, "index.shell.html");
const HOME_PATH = path.join(DIST_DIR, "index.html");

const { prerenderRoutes } = await import("../src/prerender-routes.js");

const PORT = 4174;

// vite.config.js bakes base=/dmiher-web/ into every asset URL for prod builds.
// Preview server + Puppeteer must both use the same base, else the browser
// requests /assets/*.js at the root and 404s.
const BASE = "/dmiher-web/";

function preserveShell() {
  // Snapshot the Vite-built shell BEFORE any prerender overwrites the root
  // index.html. spa.php serves this shell for URLs that aren't prerendered
  // (micropages, department pages, arbitrary paths) so the SPA renders fresh
  // instead of hydrating on top of the wrong page's HTML.
  if (!fs.existsSync(HOME_PATH)) {
    throw new Error(
      `Expected Vite shell at ${HOME_PATH} — did vite build run first?`
    );
  }
  fs.copyFileSync(HOME_PATH, SHELL_PATH);
  console.log(`📄 Shell saved: ${path.relative(DIST_DIR, SHELL_PATH)}`);
}

async function prerender() {
  console.log("\n🔧 Starting prerender...\n");

  preserveShell();

  const server = await preview({
    build: { outDir: "dist/client" },
    preview: { port: PORT, strictPort: true },
    base: BASE,
    configFile: false,
  });

  const baseUrl = `http://localhost:${PORT}${BASE}`;
  console.log(`📡 Preview server running at ${baseUrl}`);

  // --disable-web-security + --user-data-dir: the prerender runs from
  // localhost while the site's API (admin.dmiher.edu.in) only sets
  // Access-Control-Allow-Origin for the production origin (dmiher.edu.in).
  // Without these flags every /api/* fetch is CORS-blocked. Safe here because
  // Puppeteer only visits our own preview server + our own backend.
  //
  // --no-sandbox: required inside CI containers where user namespaces aren't
  // available. Harmless locally.
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      `--user-data-dir=${path.join(os.tmpdir(), "puppeteer-prerender")}`,
    ],
  });

  let ok = 0;
  let skipped = 0;

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

      try {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

        // Wait for the app to leave its <PageSkeleton /> loading state. That
        // only happens when the /pages/{slug} query resolves — either with
        // data (renders <main>) or with an error (renders
        // .error-boundary-fallback). Waiting on "#root.innerHTML.length > 100"
        // alone triggered on the skeleton itself.
        await page.waitForFunction(
          () => {
            const root = document.getElementById("root");
            if (!root) return false;
            if (root.querySelector(".page-skeleton")) return false;
            return !!(
              root.querySelector("main") ||
              root.querySelector(".error-boundary-fallback")
            );
          },
          { timeout: 30000 }
        );

        await new Promise((r) => setTimeout(r, 1000));

        const html = await page.content();

        // Safety guard: only accept a capture that clearly has real content
        // (contains <main>). A capture without <main> (auth failure, upstream
        // 5xx, skeleton stuck) must NOT overwrite index.html — otherwise a
        // temporary upstream blip in CI would take the site down.
        if (!/<main\b/i.test(html)) {
          console.warn(
            `   ⚠️  Skipped ${route}: no <main> in capture — keeping existing file untouched.`
          );
          skipped++;
          continue;
        }

        const filePath =
          route === "/"
            ? HOME_PATH
            : path.join(DIST_DIR, route, "index.html");

        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(filePath, html, "utf-8");
        console.log(`   ✅ Written: ${path.relative(DIST_DIR, filePath)}`);
        ok++;
      } catch (routeErr) {
        console.warn(`   ⚠️  Skipped ${route}: ${routeErr.message}`);
        skipped++;
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.httpServer.close();
  }

  console.log(
    `\n🎉 Prerender complete — ${ok} rendered, ${skipped} skipped.\n`
  );
}

prerender();
