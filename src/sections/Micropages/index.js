import { lazy } from "react";

const TabMenu = lazy(() => import("./Tabwise-micropage"));
const HospitalTabsSection = lazy(() => import("./HospitalTabsSection"));
const MicroPageTabLink = lazy(() => import("./MicroPageTabLink"));
const DMIHERConferences = lazy(() => import("./DMIHERConferences"));
const DynamicFormSection = lazy(() => import("./DynamicFormSection"));
const CertificateGallery = lazy(() => import("./CertificateGallery"));

export const SECTION_COMPONENTS = {

    // Common Sections
    tab_group_section: TabMenu,
    hospital_tabs_section: HospitalTabsSection,
    micro_page_tab_link: MicroPageTabLink,
    dmiher_conferences: DMIHERConferences,
    certificate_gallery: CertificateGallery,

    // Dynamic Forms — rendered via the section-dependent micropage API,
    // submitted via the Form API (see DynamicFormSection).
    dynamic_application_form: DynamicFormSection,

};
