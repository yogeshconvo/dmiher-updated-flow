import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "../../../components/icons";
import api from "../../../config/api";

// Cached fetch — react-query re-uses the response across every mount during
// its staleTime window (5 min in entry-client.jsx). The old useEffect +
// api.get pattern re-hit /api/bulletins every time the user navigated back
// to home, flashed the null → data skeleton, and helped push the API into
// its 429 rate limit under normal browsing.
const fetchBulletins = async () => {
  const { data } = await api.get("/bulletins");
  return data;
};

function HomeBulletin() {
  const [activeTab, setActiveTab] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: responseData } = useQuery({
    queryKey: ["bulletins"],
    queryFn: fetchBulletins,
  });

  // Response can be a bare section object or an array of sections; the
  // section_id filter picks the right one out of the array shape without
  // breaking the direct-object shape.
  const section = Array.isArray(responseData)
    ? responseData.find((item) => item.section_id === "home_BULLETIN_section")
    : responseData;

  const data = section?.data;

  // Once the query resolves and we know the tabs list, sync activeTab to
  // the first entry — but only if the user hasn't already picked one, so
  // their tab choice sticks across re-renders.
  if (data && !activeTab && data.tabs?.[0]) {
    setActiveTab(data.tabs[0]);
  }

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
