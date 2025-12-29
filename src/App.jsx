// src/App.jsx
import { Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import { SECTION_COMPONENTS as InstituteSections } from "./sections/Institute";
import { SECTION_COMPONENTS as MainPageSections } from "./sections/MainPageSections";
import { usePages } from "./hooks/usePages";

// 🔥 merge all section components
const SECTION_COMPONENTS = {
  // ...InstituteSections,
  ...MainPageSections,
};

// renders a single page (home or slug)
function PageView({ pages }) {
  const { slug } = useParams();

  const page = slug
    ? pages.find((p) => p.slug === slug)
    : pages[0];

  if (!page) return <div>Page not found</div>;

  return (
    <main>
      {page.sections?.map((sec, index) => {
        const SectionComponent =
          SECTION_COMPONENTS[sec.section_id];

        if (!SectionComponent) {
          console.warn(
            `No component for section_id: ${sec.section_id}`
          );
          return null;
        }

        return (
          <section id={sec.section_id} key={sec.section_id || index}>
            <SectionComponent data={sec.data} />
          </section>
        );
      })}
    </main>
  );
}

function App() {
  const { data: pages = [], isLoading, error } = usePages();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading pages</div>;
  if (!pages.length) return <div>No data</div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PageView pages={pages} />} />
        <Route path="/:slug" element={<PageView pages={pages} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
