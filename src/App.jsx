import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { useSubpages } from "./hooks/useSubpages";

import PageView from "./PageView";
import ScrollToTop from "./components/ScrollToTop";
import KnowMore from "./sections/Subpages/DeanKnowMore";

function App() {
  const {
    data: subpages = [],
    isLoading,
    error,
  } = useSubpages();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={<PageView subpages={subpages} />}
        />

        {/* STATIC */}
        <Route path="/know-more" element={<KnowMore />} />

        {/* TWO LEVEL */}
        <Route
          path="/:college/:page"
          element={<PageView subpages={subpages} />}
        />

        {/* SINGLE LEVEL */}
        <Route
          path="/:slug"
          element={<PageView subpages={subpages} />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
