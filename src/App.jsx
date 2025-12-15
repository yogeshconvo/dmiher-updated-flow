// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SECTION_COMPONENTS } from "./sections";

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
              style={{ marginTop: "100px" }}
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
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("API error: " + res.status);

        const data = await res.json();
        console.log("API response:", data);

        // --- if API returns an array directly (json-server /page-data) ---
        if (!Array.isArray(data)) {
          throw new Error("API did not return an array");
        }
        setPages(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error: {error}</div>;
  if (!pages || pages.length === 0) return <div>no data</div>;

  const defaultSlug = pages[0].slug;

  return (
    <>
      <Navbar />
      <Routes>
        {/* home → first page */}
        <Route path="/" element={<PageView pages={pages} />} />
        {/* dynamic → same renderer, but with slug */}
        <Route path="/:slug" element={<PageView pages={pages} />} />
      </Routes>{" "}
      <Footer />
    </>
  );
}

export default App;
