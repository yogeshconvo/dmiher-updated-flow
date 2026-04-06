import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageView from "./PageView";
import SubPrograms from "./sections/Subpages/Programs";
import DepartmentsSubpage from "./sections/Subpages/Departments";

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
          element={<SubPrograms />}
        />

        {/* =================== DEPARTMENTS =================== */}
        <Route
          path="/:college/departments/:deptSlug"
          element={<DepartmentsSubpage />}
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
