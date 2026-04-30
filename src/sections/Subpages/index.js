import Departments from "./Departments";
import Transcript from "./Transcript-type1";
import MandatoryDisclosures from "./MD";
import DeanKnowMore from "./DeanKnowMore";
import AccreditationsRecognitions from "./UniquePages/AccreditationsRecognitions";
import MainMicropage from "../Micropages/Main-micropage";
import ElectivesOfferedFEAT from "./ElectiveOffered";
import PhDDAL from "./UniquePages/PHD-DAL";
import CampusFacilities from "../MainPageSections/Home/CampusFacilities";
import TabwiseMainMicropage from "../Micropages/Tabwise-micropage";
import SubPrograms from "./Programs";
import DeansMicropage from "../Micropages/DeansMicropage";
import NaacSSR from "./UniquePages/NAAC";

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

    // NAAC SSR (section_id from API: "naac_ssr_micropage")
    naac_ssr_micropage: NaacSSR,

    // Micropages
    micro_page: MainMicropage,
    campus_facilities: CampusFacilities,
    tab_group_section: TabwiseMainMicropage,

    // Dean CTA micropage  (section_id from API: "dean_message")
    dean_message: DeansMicropage,
};
