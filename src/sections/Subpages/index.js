
import Programs from "./Programs"
import Departments from "./Departments"
import TranscriptSubpage from "./Transcript-type1";
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
// import Transcript from "./Transcript-type1";

export const SECTION_COMPONENTS = {

    programs_subpage: Programs,
    departments_section: Departments,
    // transcript_subpage: TranscriptFEAT,
    mandatoryDisclore_subpage: MandatoryDisclosures,
    dean_know_more: DeanKnowMore,
    accreditations_recognitions: AccreditationsRecognitions,
    electives_offered: ElectivesOfferedFEAT,
    post_doctoral_programme: PhDDAL,




    micro_page: MainMicropage,
    campus_facilities: CampusFacilities,
    tabwise_micropage: TabwiseMainMicropage,

    transcript_subpage: Transcript,

    programs_subpage: SubPrograms


};
