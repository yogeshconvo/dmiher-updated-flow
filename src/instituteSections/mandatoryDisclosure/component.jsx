import MandatoryDisclosureUI from "../../sections/InstituteMD/MandatoryDisclosure";
import { mapMandatoryDisclosureData } from "./mapper";

/**
 * Smart section wrapper registered in PageView's SECTION_COMPONENTS map.
 *
 * Accepts RAW section data from the API (shape: `{ header, cards }`)
 * and normalizes it through `mapMandatoryDisclosureData` before handing
 * to the dumb UI component. The mapper is idempotent, so passing an
 * already-mapped `{ title, items }` payload is also safe — useful when
 * called from a route that fetches via `useMandatoryDisclosure`.
 *
 * `college` is forwarded into the mapper so `card_page` cards with
 * `has_micro_page: true` get built as
 * `/{college}/mandatory-disclosure/{cta_key}`.
 */
const MandatoryDisclosureSection = ({ data, college }) => {
  const view = mapMandatoryDisclosureData(data, { college });
  return <MandatoryDisclosureUI data={view} />;
};

MandatoryDisclosureSection.displayName = "MandatoryDisclosureSection";

export default MandatoryDisclosureSection;
