import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { API_BASE } from "../../../config/api";

function HomeBulletin() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/api/bulletins`)
      .then((res) => res.json())
      .then((res) => {
  const section = Array.isArray(res)
    ? res.find((item) => item.section_id === "home_BULLETIN_section")
    : res;

  if (section) {
    setData(section.data);
    setActiveTab(section.data.tabs?.[0]);
  }
})
      .catch((err) => console.error(err));
  }, []);

  if (!data) return null;

  const { title, tabs = [], content = {}, items_per_page = 4 } = data;

  const currentItems = content[activeTab] || [];
  const visibleItems = currentItems.slice(
    currentIndex,
    currentIndex + items_per_page,
  );

  return (
    <div className="bulletin-section">
      <div className="container">
        <h2 className="heading">
          {" "}
          <hr className="heading-line" /> {title}
        </h2>

        {/* Tabs */}
        <div className="bulletin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentIndex(0);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bulletin-grid">
          {visibleItems.map((item, index) => (
            <div key={index} className="bulletin-item">
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </a>
              {item.college && <div>{item.college}</div>}
              {item.date && <div className="date">{item.date}</div>}
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

export default HomeBulletin;
