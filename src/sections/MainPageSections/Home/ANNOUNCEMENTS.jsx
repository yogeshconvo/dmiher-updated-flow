import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "../../../components/icons";
import api from "../../../config/api";

// Cached fetch — react-query re-uses the response across every mount of
// HomeANNOUNCEMENTS during its staleTime window (5 min by default in
// entry-client.jsx's QueryClient config). Before this we called
// api.get("/announcements") inside a useEffect on every mount, so
// navigating away from home and back re-fetched every time, flashed the
// null → data skeleton, and contributed to the /api/announcements 429s
// live users were hitting.
const fetchAnnouncements = async () => {
  const { data } = await api.get("/announcements");
  return data;
};

function HomeANNOUNCEMENTS() {
  const [activeCategory, setActiveCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: responseData } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });

  // Response is either the section object directly or an array of section
  // objects — the section_id filter picks the right one out of the array
  // shape without breaking the direct-object shape.
  const section = Array.isArray(responseData)
    ? responseData.find(
        (item) => item.section_id === "home_ANNOUNCEMENTS_section"
      )
    : responseData;

  const data = section?.data;

  // Once the query resolves and we know the categories list, sync
  // activeCategory to the first entry (only if the user hasn't already
  // picked one, so their tab choice sticks across re-renders).
  if (data && !activeCategory && data.categories?.[0]) {
    setActiveCategory(data.categories[0]);
  }

  if (!data) return null;

  const {
    title,
    categories = [],
    announcements = {},
    items_per_page = 4,
  } = data;

  const currentItems = announcements[activeCategory] || [];
  const visibleItems = currentItems.slice(
    currentIndex,
    currentIndex + items_per_page,
  );

  return (
    <div className="announcements-section">
      <div className="container">
        <h2 className="heading">
          {" "}
          <hr className="heading-line" /> {title}
        </h2>

        {/* Categories */}
        <div className="announcement-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="announcement-grid">
          {visibleItems.map((item, index) => (
            <div key={index} className="announcement-item">
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </a>
              {item.date && <p className="date">{item.date}</p>}
            </div>
          ))}
        </div>

        {/* Arrows */}
        {currentItems.length > items_per_page && (
          <div className="arrow-controls">
            <button
              disabled={currentIndex === 0}
              onClick={() =>
                setCurrentIndex((p) => Math.max(p - items_per_page, 0))
              }
            >
              <ArrowLeft size={20} />
            </button>

            <button
              disabled={currentIndex + items_per_page >= currentItems.length}
              onClick={() => setCurrentIndex((p) => p + items_per_page)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeANNOUNCEMENTS;
