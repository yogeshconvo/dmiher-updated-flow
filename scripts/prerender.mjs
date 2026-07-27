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

  // Order routes so "/" is processed LAST. Vite preview serves whatever is
  // currently at dist/client/index.html for any URL that doesn't match a
  // file, so once "/" is prerendered (and index.html is overwritten with
  // rendered home content), every subsequent subroute capture would receive
  // that home HTML — React hits a hydration mismatch (#418) as it tries to
  // reconcile home content against the URL's actual page, and during the
  // reconciliation window Puppeteer's page.content() can catch a moment
  // where <main> is briefly gone. Result: /spdc, /dmmc, etc. get skipped
  // even though they render fine seconds later. Deferring "/" to the end
  // means every non-root prerender sees the empty Vite shell as its base
  // HTML — no hydration mismatch, clean captures.
  const orderedRoutes = [
    ...prerenderRoutes.filter((r) => r !== "/"),
    ...prerenderRoutes.filter((r) => r === "/"),
  ];

  // Attempt a single capture. Returns the rendered HTML on success or null
  // if the capture didn't land on real content (no <main>). Errors bubble
  // up as thrown exceptions.
  async function attemptCapture(route, url, attempt) {
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
      // .error-boundary-fallback).
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

      // Buffer so React's post-load work (Helmet head sync, lazy chunk
      // resolutions, initial swiper mount) settles before we serialize.
      // Combined with entry-client.jsx's conditional createRoot() (which
      // eliminated the hydration-remount cliff for shell-served routes),
      // 3s is enough to reach a stable DOM in >95% of captures.
      await new Promise((r) => setTimeout(r, 3000));

      let hasMain = await page.evaluate(
        () => !!document.getElementById("root")?.querySelector("main")
      );
      if (!hasMain) {
        await new Promise((r) => setTimeout(r, 2000));
        hasMain = await page.evaluate(
          () => !!document.getElementById("root")?.querySelector("main")
        );
      }

      const html = await page.content();

      // Safety guard: only accept a capture that clearly has real content
      // (contains <main>). A capture without <main> (auth failure, upstream
      // 5xx, skeleton stuck) is a candidate for retry — the caller decides.
      if (!hasMain || !/<main\b/i.test(html)) {
        return null;
      }

      return html;
    } finally {
      await page.close();
    }
  }

  // Retry each route up to 3 times before giving up. Local runs and the last
  // CI pipeline showed the "no <main>" skips concentrated in a small tail of
  // 4-6 routes per run — and different routes each run, i.e. real flakiness
  // (React remount timing, Swiper autoplay mutations, image-load races), not
  // a genuine backend failure. Retrying almost always catches these. If all
  // 3 attempts fail we skip cleanly (existing file untouched, safety guard
  // preserved).
  const MAX_ATTEMPTS = 3;

  try {
    for (const route of orderedRoutes) {
      // route is authored as "/", "/jnmc", etc.; baseUrl already ends in "/"
      // so strip the leading slash from route before joining or we produce
      // "//jnmc" and Vite 404s.
      const url = `${baseUrl}${route.replace(/^\/+/, "")}`;
      console.log(`\n🌐 Prerendering: ${route}  →  ${url}`);

      let capturedHtml = null;
      let lastError = null;

      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          capturedHtml = await attemptCapture(route, url, attempt);
          if (capturedHtml) break;
          if (attempt < MAX_ATTEMPTS) {
            console.log(
              `   ↻ attempt ${attempt}: no <main>, retrying (${MAX_ATTEMPTS - attempt} left)…`
            );
          }
        } catch (err) {
          lastError = err;
          if (attempt < MAX_ATTEMPTS) {
            console.log(
              `   ↻ attempt ${attempt} failed (${err.message}), retrying (${MAX_ATTEMPTS - attempt} left)…`
            );
          }
        }
      }

      if (!capturedHtml) {
        const reason = lastError
          ? lastError.message
          : `no <main> after ${MAX_ATTEMPTS} attempts`;
        console.warn(`   ⚠️  Skipped ${route}: ${reason} — keeping existing file untouched.`);
        skipped++;
        continue;
      }

      const filePath =
        route === "/"
          ? HOME_PATH
          : path.join(DIST_DIR, route, "index.html");

      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      fs.writeFileSync(filePath, capturedHtml, "utf-8");
      console.log(`   ✅ Written: ${path.relative(DIST_DIR, filePath)}`);
      ok++;
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
