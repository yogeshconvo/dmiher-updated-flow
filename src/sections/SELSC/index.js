import { lazy } from "react";

const SELSCDetails = lazy(() => import("./SELSCDetails"));
const SELSCSimulation = lazy(() => import("./SELSCSimulation"));
const SELSCVisionMission = lazy(() => import("./SELSCVisionMission"));
const SELSCInfrastructure = lazy(() => import("./SELSCInfrastructure"));
const SELSCCollaborations = lazy(() => import("./SELSCCollaborations"));
const SELSCLearners = lazy(() => import("./SELSCLearners"));
const SELSCTraining = lazy(() => import("./SELSCTraining"));
const SELSCPrograms = lazy(() => import("./SELSCPrograms"));
const SELSCFacultyResearch = lazy(() => import("./SELSCFacultyResearch"));
const SELSCStudentLife = lazy(() => import("./SELSCStudentLife"));

export const SECTION_COMPONENTS = {
    selsc_details:           SELSCDetails,
    selsc_simulation:        SELSCSimulation,
    selsc_vision_mission:    SELSCVisionMission,
    selsc_infrastructure:    SELSCInfrastructure,
    selsc_collaborations:    SELSCCollaborations,
    selsc_learners:          SELSCLearners,
    selsc_training:          SELSCTraining,
    selsc_programs:          SELSCPrograms,
    selsc_faculty_research:  SELSCFacultyResearch,
    selsc_student_life:      SELSCStudentLife,
}
