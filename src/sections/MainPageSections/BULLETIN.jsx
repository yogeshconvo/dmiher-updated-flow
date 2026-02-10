import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useHomeNotices } from "../../hooks/useHomeNotices";

function HomeBulletin() {
  const { bulletin, isLoading, isError } = useHomeNotices();

  const [activeTab, setActiveTab] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (bulletin?.tabs?.length) {
      setActiveTab(bulletin.tabs[0]);
    }
  }, [bulletin]);

  if (isLoading || isError || !bulletin) return null;

  const { title, tabs = [], content = {}, items_per_page = 4 } = bulletin;

  const currentItems = content[activeTab] || [];
  const visibleItems = currentItems.slice(
    currentIndex,
    currentIndex + items_per_page
  );

  return (
    <section className="bulletin-section">
      <div className="container">
        <h2 className="heading">
          <hr className="heading-line" />
          {title}
        </h2>

        {/* Tabs */}
        <div className="announcement-categories">
          {tabs.map(tab => (
            <span
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentIndex(0);
              }}
            >
              {tab}
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
              {item.college && <div>{item.college}</div>}
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

export default HomeBulletin;
