import { lazy } from "react";

// Hero is the above-the-fold LCP element on every institute page — keep it in
// the main bundle (eager) so it renders the instant page data arrives, without
// waiting for an extra chunk round-trip.
import HeroSection from "./Hero"

const StudentWelfareCell = lazy(() => import("./StudentWelfareCell"))
const InfoSection = lazy(() => import("./InfoSection"))
const ProgramsSection = lazy(() => import("./ProgramsSection"))
const HospitalSection = lazy(() => import("./HospitalSection"))
const AffiliatedHospital = lazy(() => import("./AffiliatedHospital"))
const DeansMessage = lazy(() => import("./DeanMessage"))
const EducationUnit = lazy(() => import("./EducationUnit"))
const departments = lazy(() => import("./Departments"))
const InnovativeLearning = lazy(() => import("./Innovative-learning"))
const Collabaration = lazy(() => import("./Collaboration"))
const GlobalOpportunities = lazy(() => import("./Global-opportunities"))
const Testimonial = lazy(() => import("./Testimonial"))
const StudentLife = lazy(() => import("./StudentLife"))
const ButtonSection = lazy(() => import("./ButtonSection"))
const Placements = lazy(() => import("./Placements"))
const SPDCPlacements = lazy(() => import("./SPDCPlacements"))
const ProgramsAnnouncements = lazy(() => import("./ProgramsAnnouncements"))
const WhyChoose = lazy(() => import("./WhyChoseSlider"))
const HolisticInfrastructureSection = lazy(() => import("./HoliisticLearning"))
const Outcome = lazy(() => import("../MainPageSections/Home/Outcome"))
const KeyFunctionTabs = lazy(() => import("./KeyFunctionTabs"))
const MandatoryDisclosure = lazy(() => import("./MandatoryDisclosure"))
const Logos = lazy(() => import("./Logos"))
const Departments = lazy(() => import("./Departments"))
const InstituteCampusTabsNav = lazy(() => import("./InstituteCampusTabsNav"))
const NursingTestimonial = lazy(() => import("./NursingTestimonial"))
const NursingAdvantage = lazy(() => import("./NursingAdvantage"))
const NursingCollegeBrief = lazy(() => import("./NursingCollegeBrief"))
const SAHSCollaborations = lazy(() => import("./SAHSCollaborations"))
const SAHSPlacements = lazy(() => import("./SAHSPlacements"))
const SAHSAdmissions = lazy(() => import("./SAHSAdmissions"))
const CourseraCertifications = lazy(() => import("./CourseraCertifications"))

// mandatoryDisclosureConfig is plain route/section-id constants consumed
// synchronously here (computed key) and by App.jsx — imported from the
// component-free config module so it doesn't pull the section (and its icon
// deps) onto the eager bundle. The component itself is code-split like the rest.
import { mandatoryDisclosureConfig } from "../../instituteSections/mandatoryDisclosure/config"
const MandatoryDisclosureSection = lazy(() => import("../../instituteSections/mandatoryDisclosure/component"))

export const SECTION_COMPONENTS = {

    // Common Sections
    hero_section: HeroSection,
    student_welfare_and_8objectives: StudentWelfareCell,
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
