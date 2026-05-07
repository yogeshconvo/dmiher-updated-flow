import MandatoryDisclosureUI from "../../sections/InstituteMD/MandatoryDisclosure";
import { mapMandatoryDisclosureData } from "./mapper";

/**
 * Smart section wrapper registered in PageView's SECTION_COMPONENTS map.
 *
 * Accepts RAW section data from the API (shape: `{ header, cards }`)
 * and normalizes it through `mapMandatoryDisclosureData` before handing
 * to the dumb UI component. The mapper is idempotent, so passing an
 * already-mapped view model is also safe — useful when called from a
 * route that fetches via `useMandatoryDisclosure`.
 *
 *   - `college`    drives internal-link building.
 *   - `parentSlug` is the L2 cardSlug — set on L2/L3 routes so any
 *                  `card_page` cards on L2 link into L3 instead of L2.
 */
const MandatoryDisclosureSection = ({ data, college, parentSlug }) => {
  const view = mapMandatoryDisclosureData(data, { college, parentSlug });
  return <MandatoryDisclosureUI data={view} />;
};

MandatoryDisclosureSection.displayName = "MandatoryDisclosureSection";

export default MandatoryDisclosureSection;
