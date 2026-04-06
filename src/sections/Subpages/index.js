
<<<<<<< HEAD
import Departments from "./Departments";
=======
import Programs from "./Programs"
import Departments from "./Departments"
import TranscriptSubpage from "./Transcript-type1";
>>>>>>> f6a1a30e2d1aad8312445e992cdca4091642b60b
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

    // Micropages
    micro_page: MainMicropage,
    campus_facilities: CampusFacilities,
    tabwise_micropage: TabwiseMainMicropage,

    // Dean CTA micropage  (section_id from API: "dean_message")
    dean_message: DeansMicropage,
};
