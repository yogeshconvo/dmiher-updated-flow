import HeroSection from "./Hero"
import InfoSection from "./InfoSection"
import ProgramsSection from "./ProgramsSection"
import HospitalSection from "./HospitalSection"
import AffiliatedHospital from "./AffiliatedHospital"
import DeansMessage from "./DeanMessage"
import EducationUnit from "./EducationUnit"
import departments from "./Departments"
import InnovativeLearning from "./Innovative-learning"
import Collabaration from "./Collaboration"
import GlobalOpportunities from "./Global-opportunities"
import Testimonial from "./Testimonial"
import StudentLife from "./StudentLife"
import ButtonSection from "./ButtonSection"
import Placements from "./Placements"
import SPDCPlacements from "./SPDCPlacements"
import ProgramsAnnouncements from "./ProgramsAnnouncements"
import WhyChoose from "./WhyChoseSlider"
import HolisticInfrastructureSection from "./HoliisticLearning"
import Outcome from "../MainPageSections/Home/Outcome"
import KeyFunctionTabs from "./KeyFunctionTabs"
import MandatoryDisclosure from "./MandatoryDisclosure"
import Logos from "./Logos"
import TabMenu from "../Micropages/Tabwise-micropage"
import Departments from "./Departments"
import InstituteCampusTabsNav from "./InstituteCampusTabsNav"
import NursingTestimonial from "./NursingTestimonial"
import NursingAdvantage from "./NursingAdvantage"
import NursingCollegeBrief from "./NursingCollegeBrief"
import SAHSCollaborations from "./SAHSCollaborations"
import SAHSPlacements from "./SAHSPlacements"
import SAHSAdmissions from "./SAHSAdmissions"
import CourseraCertifications from "./CourseraCertifications"
import {
    MandatoryDisclosureSection,
    mandatoryDisclosureConfig,
} from "../../instituteSections/mandatoryDisclosure"

export const SECTION_COMPONENTS = {

    // Common Sections
    hero_section: HeroSection,
    institute_info: InfoSection,
    institute_programs_section: ProgramsSection,
    institute_hospital_section: HospitalSection,
    affiliated_hospital_section: AffiliatedHospital,
    deans_message_section: DeansMessage,
    section_banner: EducationUnit,
    departments: departments,
    feature_cards: InnovativeLearning,
    research_collaborations: Collabaration,
    global_opportunities: GlobalOpportunities,
    institute_testimonial_section: Testimonial,
    Institute_testimonial_section: Testimonial, // capital-I alias from JNMC API
    student_gallery: StudentLife,
    button_section: ButtonSection,
    placements: Placements,
    spdc_placements: SPDCPlacements,
    institute_announcements: ProgramsAnnouncements,
    institute_mandatory_disclosures: MandatoryDisclosure,
    why_choose_us: WhyChoose,
    key_functions: KeyFunctionTabs,
    // deans_message_section: deans_message_section,
    outcome_section: Outcome,
    holistic_learning_Section: HolisticInfrastructureSection,
    institute_logos: Logos,
    institute_departments: Departments,

    // Campus-switch tabs for multi-campus institutes (SAHS Wardha/Nagpur,
    // Nursing SRMMCON/SMCON-W/SMCON-N) — unique key, no collision with
    // tab_group_section which is used elsewhere.
    institute_nursing_tabs_nav: InstituteCampusTabsNav,

    // Unique sections for Nursing campus pages (SRMMCON / SMCON-W / SMCON-N).
    // These mirror the live-site Nursing JSX layout, which has a distinct
    // testimonial card design and a 9-card colorful "ADVANTAGE" carousel
    // that the generic Institute components can't reproduce 1:1.
    nursing_testimonials: NursingTestimonial,
    nursing_advantage: NursingAdvantage,
    nursing_college_brief: NursingCollegeBrief,

    // SAHS-dedicated sections (Wardha + Nagpur). Built to mirror the
    // live-site SAHS JSX 1:1 — partner-logo carousels, NHS + national
    // placement carousels, and the International Admissions block — none
    // of which the generic Institute components could reproduce faithfully.
    sahs_collaborations: SAHSCollaborations,
    sahs_placements: SAHSPlacements,
    sahs_admissions: SAHSAdmissions,

    // CDOE-dedicated: Coursera-enabled certificate courses — a 2×2 stat grid
    // with decorative connectors that the carousel-based feature_cards can't
    // reproduce. Mirrors live-site sections/CDOE/Certifications.jsx.
    coursera_certifications: CourseraCertifications,

    // Mandatory Disclosure subpage — driven dynamically from API (no hardcoding)
    [mandatoryDisclosureConfig.sectionId]: MandatoryDisclosureSection,

};