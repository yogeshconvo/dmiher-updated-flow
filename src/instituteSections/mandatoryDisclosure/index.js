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
 * Pattern:
 *   Parent route  : /:college/mandatory-disclosure
 *   Nested route  : /:college/mandatory-disclosure/:nestedPage
 *   Parent API    : {API_BASE}/api/{college}/mandatory-disclosure
 *   Nested API    : {API_BASE}/api/{college}/mandatory-disclosure/{nestedPage}
 */
export const mandatoryDisclosureConfig = Object.freeze({
  sectionId: "mandatory-disclosure-subpage",
  routePattern: "/:college/mandatory-disclosure",
  nestedRoutePattern: "/:college/mandatory-disclosure/:nestedPage",
  /**
   * @param {string} college
   * @param {string} [nestedPage]
   */
  buildRoutePath: (college, nestedPage) => {
    if (!college) return "/mandatory-disclosure";
    return nestedPage
      ? `/${college}/mandatory-disclosure/${nestedPage}`
      : `/${college}/mandatory-disclosure`;
  },
  /**
   * @param {string} college
   * @param {string} [nestedPage]
   */
  buildApiPath: (college, nestedPage) => {
    if (!college) return "";
    return nestedPage
      ? `/${college}/mandatory-disclosure/${nestedPage}`
      : `/${college}/mandatory-disclosure`;
  },
});

export default MandatoryDisclosureSection;
