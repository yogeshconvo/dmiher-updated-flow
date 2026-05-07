import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageView from "./PageView";
import SubPrograms from "./sections/Subpages/Programs";
import HeadPrograms from "./sections/Subpages/HeadPrograms";
import DepartmentsSubpage from "./sections/Subpages/Departments";
import TranscriptFEAT from "./sections/Subpages/Transcript-type1";
import MandatoryDisclosurePage from "./Pages/MandatoryDisclosurePage";
import { mandatoryDisclosureConfig } from "./instituteSections/mandatoryDisclosure";

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* =================== STATIC =================== */}
        <Route path="/" element={<PageView />} />

        {/* =================== PROGRAMS =================== */}
        <Route
          path="/:college/programs/:category"
          element={<SubPrograms />}
        />
        <Route
          path="/:college/programs"
          element={<SubPrograms />}
        />
        <Route
          path="/programs/:slug"
          element={<HeadPrograms />}
        />

        {/* =================== DEPARTMENTS =================== */}
        <Route
          path="/:college/departments/:deptSlug"
          element={<DepartmentsSubpage />}
        />

        {/* =================== MANDATORY DISCLOSURE (isolated, college-scoped) =================== */}
        <Route
          path={mandatoryDisclosureConfig.deepRoutePattern}
          element={<MandatoryDisclosurePage />}
        />
        <Route
          path={mandatoryDisclosureConfig.nestedRoutePattern}
          element={<MandatoryDisclosurePage />}
        />
        <Route
          path={mandatoryDisclosureConfig.routePattern}
          element={<MandatoryDisclosurePage />}
        />

        {/* =================== MICROPAGE / CTA =================== */}
        <Route path="/:college/:page" element={<PageView />} />

        {/* =================== NORMAL SLUG =================== */}
        <Route path="/:slug" element={<PageView />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
