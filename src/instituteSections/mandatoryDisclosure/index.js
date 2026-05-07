/**
 * @file index.js
 * Barrel for the Mandatory Disclosure module.
 *
 * Public surface:
 *   - useMandatoryDisclosure  (data hook)
 *   - mapMandatoryDisclosureData, detectLinkType  (transform layer)
 *   - MandatoryDisclosureSection  (component registered in PageView)
 *   - mandatoryDisclosureConfig  (slug / section_id / route constants)
 */

import MandatoryDisclosureSection from "./component";

export { useMandatoryDisclosure } from "./hook";
export { mapMandatoryDisclosureData, detectLinkType } from "./mapper";
export { MandatoryDisclosureSection };

/**
 * Single source of truth for slug / section_id / route paths.
 * Any future rename touches only this file.
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

export default MandatoryDisclosureSection;
