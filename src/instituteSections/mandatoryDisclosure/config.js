/**
 * @file config.js
 * Plain route / slug / section-id constants for the Mandatory Disclosure
 * module — no React, no component imports.
 *
 * Kept separate from index.js so that consumers which only need the config
 * (App.jsx route patterns, the Institute section registry's computed key) can
 * import it WITHOUT pulling the component — and its icon/UI dependencies — onto
 * the eager home-page bundle. The component is loaded lazily where it's used.
 *
 * Three-level URL pattern:
 *   L1  : /:college/mandatory-disclosure
 *   L2  : /:college/mandatory-disclosure/:nestedPage
 *   L3  : /:college/mandatory-disclosure/:nestedPage/:nestedSlug
 *
 * Three-level API pattern:
 *   L1  : {API_BASE}/api/{college}/mandatory-disclosure
 *   L2  : {API_BASE}/api/{college}/mandatory-disclosure/{cardSlug}
 *   L3  : {API_BASE}/api/{college}/mandatory-disclosure/{cardSlug}/{nestedSlug}
 */
export const mandatoryDisclosureConfig = Object.freeze({
  sectionId: "mandatory-disclosure-subpage",
  nestedSectionId: "mandatory-disclosure-nested",
  routePattern: "/:college/mandatory-disclosure",
  nestedRoutePattern: "/:college/mandatory-disclosure/:nestedPage",
  deepRoutePattern: "/:college/mandatory-disclosure/:nestedPage/:nestedSlug",

  /**
   * @param {string} college
   * @param {string} [nestedPage]
   * @param {string} [nestedSlug]
   */
  buildRoutePath: (college, nestedPage, nestedSlug) => {
    if (!college) return "/mandatory-disclosure";
    if (nestedPage && nestedSlug) {
      return `/${college}/mandatory-disclosure/${nestedPage}/${nestedSlug}`;
    }
    return nestedPage
      ? `/${college}/mandatory-disclosure/${nestedPage}`
      : `/${college}/mandatory-disclosure`;
  },

  /**
   * @param {string} college
   * @param {string} [nestedPage]
   * @param {string} [nestedSlug]
   */
  buildApiPath: (college, nestedPage, nestedSlug) => {
    if (!college) return "";
    if (nestedPage && nestedSlug) {
      return `/${college}/mandatory-disclosure/${nestedPage}/${nestedSlug}`;
    }
    return nestedPage
      ? `/${college}/mandatory-disclosure/${nestedPage}`
      : `/${college}/mandatory-disclosure`;
  },
});

export default mandatoryDisclosureConfig;
