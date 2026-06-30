import { lazy } from "react";

const Departments = lazy(() => import("./Departments"));
const Transcript = lazy(() => import("./Transcript-type1"));
const MandatoryDisclosures = lazy(() => import("./MD"));
const DeanKnowMore = lazy(() => import("./DeanKnowMore"));
const AccreditationsRecognitions = lazy(() => import("./UniquePages/AccreditationsRecognitions"));
const MainMicropage = lazy(() => import("../Micropages/Main-micropage"));
const ElectivesOfferedFEAT = lazy(() => import("./ElectiveOffered"));
const PhDDAL = lazy(() => import("./UniquePages/PHD-DAL"));
const PostDoc = lazy(() => import("./UniquePages/PostDoc"));
const CampusFacilities = lazy(() => import("../MainPageSections/Home/CampusFacilities"));
const TabwiseMainMicropage = lazy(() => import("../Micropages/Tabwise-micropage"));
const SubPrograms = lazy(() => import("./Programs"));
const DeansMicropage = lazy(() => import("../Micropages/DeansMicropage"));
const NaacSSR = lazy(() => import("./UniquePages/NAAC"));
const DmiherCet = lazy(() => import("./UniquePages/DMIHER-CET"));
const DmiherCetPhase1 = lazy(() => import("./UniquePages/DMIHER-CET/Phase1Page"));
const DmiherCetPhase2 = lazy(() => import("./UniquePages/DMIHER-CET/Phase2Page"));
const DmiherCetCounselling = lazy(() => import("./UniquePages/DMIHER-CET/CounsellingPage"));
const DALFellowship = lazy(() => import("./UniquePages/DALFellowship"));
const ClinicalResearch = lazy(() => import("./UniquePages/ClinicalResearch"));
const AboutHospital = lazy(() => import("./AboutHospital"));
const HigherEducationPlacement = lazy(() => import("./HigherEducationPlacement"));

export const SECTION_COMPONENTS = {

    // Subpages
    programs_subpage: SubPrograms,
    departments_section: Departments,
    // transcript_subpage: TranscriptSubpage,
    mandatoryDisclore_subpage: MandatoryDisclosures,
    dean_know_more: DeanKnowMore,
    accreditations_recognitions: AccreditationsRecognitions,
    electives_offered: ElectivesOfferedFEAT,
    post_doctoral_programme: PhDDAL,
    post_doc_subpage: PostDoc,
    dal_fellowship_subpage: DALFellowship,
    clinical_research_subpage: ClinicalResearch,
    about_hospital_subpage: AboutHospital,
    higher_education_placement_subpage: HigherEducationPlacement,

    // NAAC SSR (section_id from API: "naac_ssr_micropage")
    naac_ssr_micropage: NaacSSR,

    // DMIHER CET (section_id from API: "dmiher_cet_subpage")
    dmiher_cet_subpage: DmiherCet,
    dmiher_cet_phase1_subpage: DmiherCetPhase1,
    dmiher_cet_phase2_subpage: DmiherCetPhase2,
    dmiher_cet_counselling_subpage: DmiherCetCounselling,

    // Micropages
    micro_page: MainMicropage,
    campus_facilities: CampusFacilities,
    tab_group_section: TabwiseMainMicropage,

    // Dean CTA micropage  (section_id from API: "dean_message")
    dean_message: DeansMicropage,
};
