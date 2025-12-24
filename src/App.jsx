// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SECTION_COMPONENTS } from "./sections";
import { usePages } from "./hooks/usePages";

const API_URL = "http://localhost:3000/page-data";

// this component renders one page (home or /:slug)
function PageView({ pages }) {
  const { slug } = useParams();

  // if slug present, find that page, else use first page as default
  const page = slug ? pages.find((p) => p.slug === slug) : pages[0];

  if (!page) return <div>page not found</div>;

  return (
    <div>
      <main style={{ padding: "" }}>
        {page.sections?.map((sec, index) => {
          const SectionComponent = SECTION_COMPONENTS[sec.section_id];

          // if no component for this section_id, skip
          if (!SectionComponent) return null;

          return (
            <section
              id={sec.section_id}
              key={sec.section_id || index}
              // style={{ marginTop: "100px" }}
            >
              <SectionComponent data={sec.data} />
            </section>
          );
        })}
      </main>
    </div>
  );
}
function App() {
  const { data: pages = [], isLoading, error } = usePages();

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  if (!pages.length) return <div>no data</div>;

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