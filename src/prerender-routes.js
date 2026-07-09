/**
 * Routes to pre-render at build time (SSG).
 *
 * The prerender script (scripts/prerender.mjs) drives a headless Chrome
 * against each of these routes, waits for React + API data to settle, then
 * writes the fully-rendered HTML back to dist/client/<route>/index.html.
 * Apache serves those files via spa.php, giving crawlers a full HTML body
 * on first request — the SEO win we'd otherwise need a Node SSR host for.
 *
 * Rules:
 *   1. Only static single-segment routes (/, /:slug) — dynamic
 *      /:college/:page micropages, /:college/programs, department
 *      subpages and mandatory-disclosure trees stay SPA. Prerendering the
 *      dynamic tree would multiply the route matrix into hundreds of
 *      files and each still fetches data client-side anyway.
 *   2. Slugs must match the backend's page slug (case-sensitive on the
 *      API — PageView.jsx lowercases URL params before hitting /pages/,
 *      so "sher" and "SHER" both resolve, but the file we write here is
 *      the CANONICAL URL the sitemap advertises).
 *   3. Trailing slash matters — "/about" writes dist/client/about/index.html,
 *      which Apache picks up on both /about and /about/ requests.
 *
 * Extend this list as new institutes or main-nav pages ship. If the list
 * gets long enough that maintaining it by hand hurts, replace this file
 * with a build-time fetch of /api/pages that emits the list dynamically.
 */
export const prerenderRoutes = [
  // ── Home ────────────────────────────────────────────────────────────
  "/",

  // ── Institutes (each has its own dedicated page under /:slug) ──────
  //    Slugs match the backend page rows. Add / remove as institutes
  //    onboard. If a slug 404s during prerender the script logs and
  //    skips it (see scripts/prerender.mjs error handling).
  "/jnmc",
  "/spdc",
  "/dmmc",
  "/smcon-w",
  "/sahs",
  "/srmmcon",
  "/avbrh",
  "/selsc",
  "/feat",
  "/museum",
  "/cadwetlab",

  // ── Top-level main-site pages ──────────────────────────────────────
  //    Independent pages / navbar top-level links that render via the
  //    /:slug route. Add the actual navbar slugs here once confirmed
  //    against the backend — leaving conservative for now so a bad slug
  //    doesn't fail the whole prerender pass.
  "/about",
  "/announcements",
  "/contact",
];
