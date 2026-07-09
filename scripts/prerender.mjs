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
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "../dist");

// Import routes to prerender
const { prerenderRoutes } = await import("../src/prerender-routes.js");

const PORT = 4174;

async function prerender() {
  console.log("\n🔧 Starting prerender...\n");

  // 1. Start Vite preview server (serves built dist/ as production)
  const server = await preview({
    preview: { port: PORT, strictPort: true },
    configFile: false,
  });

  const baseUrl = `http://localhost:${PORT}`;
  console.log(`📡 Preview server running at ${baseUrl}`);

  // 2. Launch headless browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const route of prerenderRoutes) {
      const url = `${baseUrl}${route}`;
      console.log(`\n🌐 Prerendering: ${route}`);

      const page = await browser.newPage();

      // Navigate and wait for network to be idle (API calls finished)
      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Extra wait for React to finish rendering
      await page.waitForFunction(
        () => {
          const root = document.getElementById("root");
          // Wait until root has actual content (not just skeleton/loading)
          return root && root.innerHTML.length > 100;
        },
        { timeout: 15000 }
      );

      // Small extra buffer for any final renders
      await new Promise((r) => setTimeout(r, 1000));

      // 3. Capture the full rendered HTML
      let html = await page.content();

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
