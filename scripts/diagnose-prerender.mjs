/**
 * Throwaway diagnostic — loads the preview server in Puppeteer and reports
 * what React actually rendered, plus any console / network errors that
 * stopped it from going past the 100-char threshold.
 *
 * Usage:  node scripts/diagnose-prerender.mjs
 * Assumes Vite preview is already running at http://localhost:4174
 */
import puppeteer from "puppeteer";

const URL = "http://localhost:4174/";
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();

  const consoleEntries = [];
  const failedRequests = [];

  page.on("console", (msg) => {
    consoleEntries.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => {
    consoleEntries.push(`[pageerror] ${err.message}`);
  });
  page.on("requestfailed", (req) => {
    failedRequests.push(`${req.method()} ${req.url()} :: ${req.failure()?.errorText}`);
  });

  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 15000 });

  // Give React a generous 8s to render
  await new Promise((r) => setTimeout(r, 8000));

  const snapshot = await page.evaluate(function () {
    var root = document.getElementById("root");
    var inner = root ? root.innerHTML : "";
    return {
      url: location.href,
      title: document.title,
      rootChildren: root ? root.children.length : -1,
      rootHtmlLen: inner.length,
      rootFirst200: inner.slice(0, 200),
      bodyHtmlLen: document.body.innerHTML.length,
    };
  });

  console.log("\n=== SNAPSHOT ===");
  console.log(JSON.stringify(snapshot, null, 2));

  console.log("\n=== CONSOLE / PAGE ERRORS ===");
  for (const e of consoleEntries) console.log(e);

  console.log("\n=== FAILED REQUESTS ===");
  for (const r of failedRequests) console.log(r);

  await page.close();
} finally {
  await browser.close();
}
