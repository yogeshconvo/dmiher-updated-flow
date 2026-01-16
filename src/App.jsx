
import { Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import { SECTION_COMPONENTS as InstituteSections } from "./sections/Institute";
// import { SECTION_COMPONENTS as MainPageSections } from "./sections/MainPageSections";
// import { SECTION_COMPONENTS as SubpagesSections } from "./sections/Subpages";
import { usePages } from "./hooks/usePages";
import { useSubpages } from "./hooks/useSubpages";
import PageView from "./PageView";
import ScrollToTop from "./components/ScrollToTop";
import KnowMore from "./sections/Subpages/DeanKnowMore";




function App() {
  const {
    data: pages = [],
    isLoading,
    error,
  } = usePages();

  const {
    data: subpages = [],
    isLoading: subpagesLoading,
    error: subpagesError,
  } = useSubpages();

  if (isLoading || subpagesLoading)
    return <div>Loading...</div>;

  if (error || subpagesError)
    return <div>Error loading data</div>;

  return (
    <>
      <Navbar />

      <Routes>
  {/* HOME */}
  <Route
    path="/"
    element={
      <PageView
        pages={pages}
        subpages={subpages}
      />
    }
  />

  {/* SINGLE LEVEL: /about, /programs */}
  <Route
    path="/:slug"
    element={
      <PageView
        pages={pages}
        subpages={subpages}
      />
    }
        />
         <Route
         path="know-more"
         element={
          <KnowMore />
         }
         />

  {/* TWO LEVEL: /jnmc/transcript */}
  <Route
    path="/:college/:page"
    element={
      <PageView
        pages={pages}
        subpages={subpages}
      />
    }
  />
</Routes>
<ScrollToTop />

      <Footer />
    </>
  );
}


export default App;
