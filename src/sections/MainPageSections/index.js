
import HomePrograms from "../MainPageSections/Programs"
import HeroSection from "../Institute/Hero"
import HomeBulletin from "../MainPageSections/Home/BULLETIN"
import HomeANNOUNCEMENTS from "../MainPageSections/Home/ANNOUNCEMENTS"
import HomeTestimonial from "../MainPageSections/Home/testimonial"
import ExcellenceSection from "../MainPageSections/About/ExcellenceSection"
import VisionMissionSection from "./About/VisionMissionSection"
import CoreValues from "./About/CoreValues"
import AboutGrid from "./About/AboutGrid"
import CommitteesSection from "./About/CommitteesSection"
import DMIHERJourney from "./About/DMIHERJourney"
import OneHealth from "../MainPageSections/OneHealth"
import HolisticLearningPage from "../MainPageSections/HolisticLearningPage"
import SDGSection from "./About/SDGSection"
import Gallery from "../MainPageSections/Gallery"
import ResearchHighlights from "./Research/ResearchHighlights"
import Grid from "./Grid"
import ResearchEcosystem from "./Research/ResearchEcosystem"
import TheEdge from "./Research/TheEdge"
import SDGResearchContributions from "./Research/SDGResearchContributions"
import FundedResearchProjects from "./Research/FundedResearchProjects"
import ResearchOpportunities from "./Research/ResearchOpportunities"
import HomeInfo from "../Institute/InfoSection"
import AlliancesGlobal from "./Global/AlliancesGlobal"
import GlobalExchange from "./Global/GlobalExchange"
import FunctionalUnits from "./IQAC/FunctionalUnits"
import IQACSection from "./IQAC/IQACButtons"
import ProgramsComponent from "./Programs/Programs"
import ImportantContacts from "./Programs/ImportantContacts"
import EnquiryGlobal from "./Global/EnquiryGlobal"
import StudentLife from "../Institute/StudentLife"
import WhyChoose from "../Institute/WhyChoseSlider"
import HomeSteps from "./Home/HomeSteps"
import UniversalSection from "./Global/HeadwithPara"
import AdmissionInfoPage from "./Admissions/AdmissionInfoPage"
import Outcome from "./Home/Outcome"
import FootprintSection from "./Home/FootprintSection"
import ResearchInnovation from "./Home/ResearchInnovation"
import RecognitionsSection from "./Home/RecognitionsSection"
import SubPrograms from "../Subpages/Programs"
import MainMicropage from "../Micropages/Main-micropage"
import ClinicalResearch from "./Research/ClinicalResearch"
import TabMenu from "../Micropages/Tabwise-micropage"
import FeatureCards from "./Admissions/FeatureCards"
import AdmissionFAQs from "./Admissions/Faqs"
import InternationalCollaborations from "./Admissions/InternationalCollaboration"
import StepsPage from "./Admissions/StepsPage"
import AdvantageIndia from "./Admissions/AdvantageIndia"
import ImageContentBlocks from "./Admissions/ImageContentBlocks"
import ArrivalGuidance from "./Admissions/ArrivalGuidance"
import SocialLinks from "./Admissions/SocialLinks"
import AlumniTestimonials from "./Admissions/AlumniTestimonials"
import UsefulLinks from "./Admissions/UsefulLinks"
import ProgramsGrid from "./Admissions/ProgramsGrid"
import WhyStudyAdmissions from "./Admissions/WhyStudyAdmissions"
import ActivitiesAndAnnouncements from "./Alumni/ActivitiesAndAnnouncements"
import EminentAlumni from "./Alumni/EminentAlumni"
import ExamCellOfficials from "./ControllerOfExamination/ExamCellOfficials"
import AcademicFC from "./CampusFacilities/AcademicFC"
import WellbeingComfortFC from "./CampusFacilities/WellbeingComfortFC"
import ContactUS from "./Contact/ContactUS"
import TeachingHospitals from "./Hospital/TeachingHospitals/TeachingHospitals"
import TextEditor from "../Common/TextEditor"
import FloatingButtons from "../../components/FloatingButtons"
import DALNurturingEcosystem from "./DAL/DALNurturingEcosystem"
import DALKeyFunctions from "./DAL/DALKeyFunctions"
import DALVisionMission from "./DAL/DALVisionMission"
// Campus Life — only the truly unique sections that can't be served by the
// generic hero_section / institute_info / why_choose_us components.
import CampusLifeImmersive from "./CampusLife/CampusLifeImmersive"
import CampusLifeAcademic from "./CampusLife/CampusLifeAcademic"
import CampusLifeInfrastructure from "./CampusLife/CampusLifeInfrastructure"
import CampusLifeWellbeing from "./CampusLife/CampusLifeWellbeing"
import CampusLifeHostel from "./CampusLife/CampusLifeHostel"

export const SECTION_COMPONENTS = {

    // Common Sections
    hero_section: HeroSection,
    info_section: HomeInfo,
    institute_info: HomeInfo,
    gallery: StudentLife,
    why_choose: WhyChoose,
    why_choose_us: WhyChoose,

    // Home
    outcome_section: Outcome,
    international_footprint: FootprintSection,
    research_innovation: ResearchInnovation,
    home_steps_section: HomeSteps,
    home_BULLETIN_section: HomeBulletin,
    home_ANNOUNCEMENTS_section: HomeANNOUNCEMENTS,
    home_testimonial_section: HomeTestimonial,
    recognitions: RecognitionsSection,

    // About Section
    About_Excellence_Section: ExcellenceSection,
    about_VisionMission_Section: VisionMissionSection,
    about_CoreValues_section: CoreValues,
    AboutGrid_section: AboutGrid,
    institute_departments: AboutGrid,
    committees_facilities_section: CommitteesSection,
    dmiher_journey: DMIHERJourney,
    about_OneHealth_section: OneHealth,
    about_HolisticLearningPage: HolisticLearningPage,
    about_SDGSection: SDGSection,
    filterable_gallery_section: Gallery,

    // Research Section
    research_highlights: ResearchHighlights,
    grid_section: Grid,
    research_ecosystem: ResearchEcosystem,
    the_edge: TheEdge,
    research_sdg: SDGResearchContributions,
    sdg_research: SDGResearchContributions,
    funded_projects: FundedResearchProjects,
    research_opportunities: ResearchOpportunities,
    ResearchOpportunities: ResearchOpportunities,
    clinical_research: ClinicalResearch,

    // Global Section
    global_alliances: AlliancesGlobal,
    global_exchange: GlobalExchange,
    enquiry_global: EnquiryGlobal,
    universal_section: UniversalSection,

    // IQAC Section
    iqac_button: IQACSection,
    functional_units: FunctionalUnits,

    // Programs Section
    programs_section: HomePrograms,
    important_contacts: ImportantContacts,
    programs_subpage: SubPrograms,

    // Admission Page
    admission_info_boxes: AdmissionInfoPage,
    admission_faqs: AdmissionFAQs,
    international_collaborations_admission: InternationalCollaborations,
    feature_cards: FeatureCards,
    admission_steps: StepsPage,
    advantage_india: AdvantageIndia,
    image_content_blocks: ImageContentBlocks,
    arrival_guidance: ArrivalGuidance,
    social_links: SocialLinks,
    alumni_testimonials: AlumniTestimonials,
    useful_links: UsefulLinks,
    programs_grid_section: ProgramsGrid,
    why_study_admissions: WhyStudyAdmissions,

    // Micropages
    micro_page: MainMicropage,
    tab_menu: TabMenu,

    // Alumni
    activities_announcements: ActivitiesAndAnnouncements,
    eminent_alumni: EminentAlumni,

    // Exam Cell
    exam_cell_officials: ExamCellOfficials,

    // Campus Facilities
    academic_innovation_facilities: AcademicFC,
    wellbeing_section: WellbeingComfortFC,

    // Contact Us
    contact_tabs_section: ContactUS,

    // Hospital
    hospitals_tab_section: TeachingHospitals,

    // DAL (Directorate of Advanced Learning)
    dal_nurturing_ecosystem: DALNurturingEcosystem,
    dal_key_functions: DALKeyFunctions,
    dal_vision_mission: DALVisionMission,

    // Campus Life — dedicated sections only (the unique layouts).
    // Hero / Info / Reasons reuse the generic hero_section / institute_info /
    // why_choose_us components.
    campus_life_immersive: CampusLifeImmersive,
    campus_life_academic: CampusLifeAcademic,
    campus_life_infrastructure: CampusLifeInfrastructure,
    campus_life_wellbeing: CampusLifeWellbeing,
    campus_life_hostel: CampusLifeHostel,

    // Generic / cross-page
    text_editor: TextEditor,
    floating_buttons: FloatingButtons,
};
