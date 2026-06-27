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

// The config now lives in its own component-free module so it can be imported
// without pulling this component (and its icon deps) onto the home bundle.
// Re-exported here to preserve the barrel's public API.
export { mandatoryDisclosureConfig } from "./config";

export default MandatoryDisclosureSection;
