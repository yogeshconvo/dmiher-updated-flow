import { lazy } from "react";

const CadWLLabSection = lazy(() => import("./CadWLLabSection"));

export const SECTION_COMPONENTS = {
    cadwl_lab_section: CadWLLabSection,
}
