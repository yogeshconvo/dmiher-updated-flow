import HeroSection from "./Hero"
import InfoSection from "./InfoSection"
import ProgramsSection from "./ProgramsSection"
import HospitalSection from "./HospitalSection"
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
    deans_message_section: DeansMessage,
    hero_meu_section: EducationUnit,
    departments: departments,
    feature_cards: InnovativeLearning,
    research_collaborations: Collabaration,
    global_opportunities: GlobalOpportunities,
    institute_testimonial_section: Testimonial,
    Institute_testimonial_section: Testimonial, // capital-I alias from JNMC API
    student_gallery: StudentLife,
    button_section: ButtonSection,
    placements: Placements,
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
    institute_campus_tabs_nav: InstituteCampusTabsNav,

    // Mandatory Disclosure subpage — driven dynamically from API (no hardcoding)
    [mandatoryDisclosureConfig.sectionId]: MandatoryDisclosureSection,

};