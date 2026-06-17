import { lazy } from "react";

// Hero is the above-the-fold LCP element — keep it eager (in the main bundle)
// so it paints the moment page data arrives, with no extra chunk round-trip.
import HeroSection from "../Institute/Hero"

const HomePrograms = lazy(() => import("../MainPageSections/Programs"))
const HomeBulletin = lazy(() => import("../MainPageSections/Home/BULLETIN"))
const HomeANNOUNCEMENTS = lazy(() => import("../MainPageSections/Home/ANNOUNCEMENTS"))
const HomeTestimonial = lazy(() => import("../MainPageSections/Home/testimonial"))
const ExcellenceSection = lazy(() => import("../MainPageSections/About/ExcellenceSection"))
const VisionMissionSection = lazy(() => import("./About/VisionMissionSection"))
const CoreValues = lazy(() => import("./About/CoreValues"))
const AboutGrid = lazy(() => import("./About/AboutGrid"))
const CommitteesSection = lazy(() => import("./About/CommitteesSection"))
const DMIHERJourney = lazy(() => import("./About/DMIHERJourney"))
const OneHealth = lazy(() => import("../MainPageSections/OneHealth"))
const HolisticLearningPage = lazy(() => import("../MainPageSections/HolisticLearningPage"))
const SDGSection = lazy(() => import("./About/SDGSection"))
const Gallery = lazy(() => import("../MainPageSections/Gallery"))
const ResearchHighlights = lazy(() => import("./Research/ResearchHighlights"))
const Grid = lazy(() => import("./Grid"))
const ResearchEcosystem = lazy(() => import("./Research/ResearchEcosystem"))
const TheEdge = lazy(() => import("./Research/TheEdge"))
const SDGResearchContributions = lazy(() => import("./Research/SDGResearchContributions"))
const FundedResearchProjects = lazy(() => import("./Research/FundedResearchProjects"))
const ResearchOpportunities = lazy(() => import("./Research/ResearchOpportunities"))
const HomeInfo = lazy(() => import("../Institute/InfoSection"))
const AlliancesGlobal = lazy(() => import("./Global/AlliancesGlobal"))
const GlobalExchange = lazy(() => import("./Global/GlobalExchange"))
const FunctionalUnits = lazy(() => import("./IQAC/FunctionalUnits"))
const IQACSection = lazy(() => import("./IQAC/IQACButtons"))
const ImportantContacts = lazy(() => import("./Programs/ImportantContacts"))
const EnquiryGlobal = lazy(() => import("./Global/EnquiryGlobal"))
const StudentLife = lazy(() => import("../Institute/StudentLife"))
const WhyChoose = lazy(() => import("../Institute/WhyChoseSlider"))
const HomeSteps = lazy(() => import("./Home/HomeSteps"))
const UniversalSection = lazy(() => import("./Global/HeadwithPara"))
const AdmissionInfoPage = lazy(() => import("./Admissions/AdmissionInfoPage"))
const Outcome = lazy(() => import("./Home/Outcome"))
const FootprintSection = lazy(() => import("./Home/FootprintSection"))
const ResearchInnovation = lazy(() => import("./Home/ResearchInnovation"))
const RecognitionsSection = lazy(() => import("./Home/RecognitionsSection"))
const SubPrograms = lazy(() => import("../Subpages/Programs"))
const MainMicropage = lazy(() => import("../Micropages/Main-micropage"))
const ClinicalResearch = lazy(() => import("./Research/ClinicalResearch"))
const TabMenu = lazy(() => import("../Micropages/Tabwise-micropage"))
const FeatureCards = lazy(() => import("./Admissions/FeatureCards"))
const AdmissionFAQs = lazy(() => import("./Admissions/Faqs"))
const InternationalCollaborations = lazy(() => import("./Admissions/InternationalCollaboration"))
const StepsPage = lazy(() => import("./Admissions/StepsPage"))
const AdvantageIndia = lazy(() => import("./Admissions/AdvantageIndia"))
const ImageContentBlocks = lazy(() => import("./Admissions/ImageContentBlocks"))
const ArrivalGuidance = lazy(() => import("./Admissions/ArrivalGuidance"))
const SocialLinks = lazy(() => import("./Admissions/SocialLinks"))
const AlumniTestimonials = lazy(() => import("./Admissions/AlumniTestimonials"))
const UsefulLinks = lazy(() => import("./Admissions/UsefulLinks"))
const ProgramsGrid = lazy(() => import("./Admissions/ProgramsGrid"))
const WhyStudyAdmissions = lazy(() => import("./Admissions/WhyStudyAdmissions"))
const ActivitiesAndAnnouncements = lazy(() => import("./Alumni/ActivitiesAndAnnouncements"))
const EminentAlumni = lazy(() => import("./Alumni/EminentAlumni"))
const ExamCellOfficials = lazy(() => import("./ControllerOfExamination/ExamCellOfficials"))
const AcademicFC = lazy(() => import("./CampusFacilities/AcademicFC"))
const WellbeingComfortFC = lazy(() => import("./CampusFacilities/WellbeingComfortFC"))
const ContactUS = lazy(() => import("./Contact/ContactUS"))
const TeachingHospitals = lazy(() => import("./Hospital/TeachingHospitals/TeachingHospitals"))
const TextEditor = lazy(() => import("../Common/TextEditor"))
const FloatingButtons = lazy(() => import("../../components/FloatingButtons"))
const DALNurturingEcosystem = lazy(() => import("./DAL/DALNurturingEcosystem"))
const DALKeyFunctions = lazy(() => import("./DAL/DALKeyFunctions"))
const DALVisionMission = lazy(() => import("./DAL/DALVisionMission"))
// Campus Life — only the truly unique sections that can't be served by the
// generic hero_section / institute_info / why_choose_us components.
const CampusLifeImmersive = lazy(() => import("./CampusLife/CampusLifeImmersive"))
const CampusLifeAcademic = lazy(() => import("./CampusLife/CampusLifeAcademic"))
const CampusLifeInfrastructure = lazy(() => import("./CampusLife/CampusLifeInfrastructure"))
const CampusLifeWellbeing = lazy(() => import("./CampusLife/CampusLifeWellbeing"))
const CampusLifeHostel = lazy(() => import("./CampusLife/CampusLifeHostel"))

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
