import Departments from "./Departments";
import Transcript from "./Transcript-type1";
import MandatoryDisclosures from "./MD";
import DeanKnowMore from "./DeanKnowMore";
import AccreditationsRecognitions from "./UniquePages/AccreditationsRecognitions";
import MainMicropage from "../Micropages/Main-micropage";
import ElectivesOfferedFEAT from "./ElectiveOffered";
import PhDDAL from "./UniquePages/PHD-DAL";
import PostDoc from "./UniquePages/PostDoc";
import CampusFacilities from "../MainPageSections/Home/CampusFacilities";
import TabwiseMainMicropage from "../Micropages/Tabwise-micropage";
import SubPrograms from "./Programs";
import DeansMicropage from "../Micropages/DeansMicropage";
import NaacSSR from "./UniquePages/NAAC";
import DmiherCet from "./UniquePages/DMIHER-CET";
import AboutHospital from "./UniquePages/AboutHospital";

export const SECTION_COMPONENTS = {

    // Subpages
    programs_subpage: SubPrograms,
    departments_section: Departments,
    transcript_subpage: Transcript,
    mandatoryDisclore_subpage: MandatoryDisclosures,
    dean_know_more: DeanKnowMore,
    accreditations_recognitions: AccreditationsRecognitions,
    electives_offered: ElectivesOfferedFEAT,
    post_doctoral_programme: PhDDAL,
    post_doc_subpage: PostDoc,

    // NAAC SSR (section_id from API: "naac_ssr_micropage")
    naac_ssr_micropage: NaacSSR,

    // DMIHER CET (section_id from API: "dmiher_cet_subpage")
    dmiher_cet_subpage: DmiherCet,

    // About Hospital — single section, tabs + content inline
    about_hospital_subpage: AboutHospital,

    // Micropages
    micro_page: MainMicropage,
    campus_facilities: CampusFacilities,
    tab_group_section: TabwiseMainMicropage,

    // Dean CTA micropage  (section_id from API: "dean_message")
    dean_message: DeansMicropage,
};
