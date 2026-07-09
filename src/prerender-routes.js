/**
 * Routes to pre-render at build time (SSG).
 *
 * Add new institute slugs or static pages here.
 * Dynamic routes (/:college/:page) are NOT prerendered —
 * they load as SPA and fetch data client-side.
 *
 * Extend this list as new institutes or key pages are added.
 */
export const prerenderRoutes = [
  "/",
];
