import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

function HomeANNOUNCEMENTS() {
  const [data, setData] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://demos.convomax.com/dmiher_backend/api/announcements")
      .then((res) => res.json())
      .then((res) => {
        const section = Array.isArray(res)
          ? res.find((item) => item.section_id === "home_ANNOUNCEMENTS_section")
          : res;

        if (section) {
          setData(section.data);
          setActiveCategory(section.data.categories?.[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

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
