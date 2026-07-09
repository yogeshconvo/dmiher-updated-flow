/**
 * Routes to pre-render at build time (SSG).
 *
 * The prerender script (scripts/prerender.mjs) drives a headless Chrome
 * against each of these routes, waits for React + API data to settle, then
 * writes the fully-rendered HTML back to dist/client/<route>/index.html.
 * spa.php serves those files (with a fresh CSP nonce stamped in) for the
 * matching URLs — every other URL gets the empty SPA shell so React Router
 * renders fresh on the client.
 *
 * Rules:
 *   1. ONLY static, single-segment routes (/ and /:slug). Dynamic routes
 *      like /:college/:page micropages, /:college/programs and department
 *      subpages stay SPA — prerendering them would multiply the file matrix
 *      into hundreds of files, each still fetching data client-side anyway,
 *      and stale-data staleness would be baked into deploys.
 *   2. Slugs must match a real backend page row. If a slug 404s during
 *      prerender the "no <main>" safety guard in scripts/prerender.mjs
 *      logs and skips it — the pipeline stays green and the SPA shell
 *      keeps serving that URL until the slug is either fixed or removed
 *      from this list.
 *   3. This list was extracted from /api/menus/Header on 2026-07-09. Update
 *      it when navbar slugs change (add/remove/rename an institute, launch
 *      a new top-level page, retire an old one).
 */
export const prerenderRoutes = [
  // ── Home ────────────────────────────────────────────────────────────
  "/",

  // ── Institutes / colleges (from Header → Academics children) ───────
  "/jnmc",
  "/spdc",
  "/dmmc",
  "/smcon-w",
  "/smcon-n",
  "/sahs-wardha",
  "/sahs-nagpur",
  "/srmmcon",
  "/sher",
  "/feat",

  // ── Top-level main-site pages (from Header → Main position) ────────
  "/about",
  "/admissions",
  "/international-admissions",
  "/hospital",
  "/research",
  "/contactus",
  "/iqac",
  "/global-connect",

  // ── Sub-brand / centre pages (from Header submenus) ────────────────
  "/cdoe",
  "/dal",
  "/dmcp",
  "/mgac",
  "/rnpc",
  "/sas",
  "/smhh",
];
