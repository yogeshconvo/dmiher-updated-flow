import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useHomeNotices } from "../../hooks/useHomeNotices";

function HomeANNOUNCEMENTS() {
  const { announcements, isLoading, isError } = useHomeNotices();

  const [activeCategory, setActiveCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (announcements?.categories?.length) {
      setActiveCategory(announcements.categories[0]);
    }
  }, [announcements]);

  if (isLoading || isError || !announcements) return null;

  const {
    title,
    categories = [],
    announcements: items = {},
    items_per_page = 4,
  } = announcements;

  const currentItems = items[activeCategory] || [];
  const visibleItems = currentItems.slice(
    currentIndex,
    currentIndex + items_per_page
  );

  return (
    <section className="announcements-section">
      <div className="container">
        <h2 className="heading">
          <hr className="heading-line" />
          {title}
        </h2>

        {/* Tabs */}
        <div className="announcement-categories">
          {categories.map(cat => (
            <span
              key={cat}
              className={`tab-btn ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="announcement-grid">
          {visibleItems.map((item, i) => (
            <div key={i} className="announcement-item">
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
                setCurrentIndex(p =>
                  Math.max(p - items_per_page, 0)
                )
              }
            >
              <ArrowLeft size={18} />
            </button>

            <button
              disabled={
                currentIndex + items_per_page >= currentItems.length
              }
              onClick={() =>
                setCurrentIndex(p => p + items_per_page)
              }
            >
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeANNOUNCEMENTS;
