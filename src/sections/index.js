import InfoSection from "./InfoSection";
import ProgramsSection from "./ProgramsSection";
import HospitalSection from "./HospitalSection";
import HeroSection from "./Hero"
import HolisticInfrastructureSection from "./HoliisticLearning"
import DeansMessage from "./DeanMessage"
import EducationUnit from "./EducationUnit"
import departments from "./Departments"

// Non-institute
import HomeHero from "../sections/non-institute/Home/Hero"
import HomeInfo from "../sections/non-institute/Home/HomeInfo"
import HomePrograms from "../sections/non-institute/Home/Programs"
//import ResearchInnovation from "../sections/non-institute/ResearchInnovation"
import HomeBulletin from "../sections/non-institute/Home/BULLETIN"
import HomeANNOUNCEMENTS from"../sections/non-institute/Home/ANNOUNCEMENTS"
import HomeTestimonial from"../sections/non-institute/Home/testimonial"
import ExcellenceSection from"../sections/non-institute/About/ExcellenceSection"


export const SECTION_COMPONENTS = {
    hero_section: HeroSection,
    info_section: InfoSection,
    programs_section: ProgramsSection,
    hospital_section: HospitalSection,
    holistic_infrastructure_section: HolisticInfrastructureSection,
    deans_message_section: DeansMessage,
    medical_education_unit: EducationUnit,
    departments: departments,

    // Non-institute
    hero_home_section: HomeHero,
    home_info_section: HomeInfo,
    home_programs_section: HomePrograms,
    //home_ResearchInnovation_section: ResearchInnovation,
    home_BULLETIN_section: HomeBulletin,
    home_ANNOUNCEMENTS_section: HomeANNOUNCEMENTS,
    home_testimonial_section: HomeTestimonial,
    About_Excellence_Section: ExcellenceSection,
    

};
