import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageView from "./PageView";
import PageSkeleton from "./components/Skeletons/PageSkeleton";
import { mandatoryDisclosureConfig } from "./instituteSections/mandatoryDisclosure/config";
import useSiteSettings from "./hooks/useSiteSettings";
import NiaaChatbot from "./components/NiaaChatbot";

// Route-level code splitting: these page types are only needed when the user
// navigates to them, so they're loaded on demand instead of bloating the
// initial home-page bundle. PageView (the home/slug route) stays eager.
const SubPrograms = lazy(() => import("./sections/Subpages/Programs"));
const HeadPrograms = lazy(() => import("./sections/Subpages/HeadPrograms"));
const DepartmentsSubpage = lazy(() => import("./sections/Subpages/Departments"));
const MandatoryDisclosurePage = lazy(() => import("./Pages/MandatoryDisclosurePage"));

function App() {
  // Apply the dashboard-managed favicon once it's fetched.
  useSiteSettings();

  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Suspense fallback={<PageSkeleton />}>
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
      </Suspense>

      <Footer />
      <NiaaChatbot />
    </>
  );
}

export default App;
