import React, { useState, useEffect } from "react";
import { Library } from "lucide-react";
import SafeImage from "../../../components/SafeImage";

/**
 * CampusLifeAcademic — dark blue panel with accordion + swap image.
 */
const CampusLifeAcademic = ({ data }) => {
  const tabs = data?.tabs || [];
  const [activeKey, setActiveKey] = useState(tabs[0]?.key || null);

  useEffect(() => {
    if (tabs.length && !tabs.find((t) => t.key === activeKey)) {
      setActiveKey(tabs[0].key);
    }
  }, [tabs, activeKey]);

  const activeTab = tabs.find((t) => t.key === activeKey);
  const bg = data?.bg_color || "#122E5E";
  const accent = data?.accent_color || "#F04E30";

  return (
    <section className="cla-section" style={{ backgroundColor: bg, color: "#fff" }}>
      <div className="container">
        <div className="cla-row">
          <div className="cla-left">
            <div className="cla-head">
              <h2 className="cla-heading">
                <hr className="cla-heading-line" style={{ borderColor: accent }} />
                {data?.title}
              </h2>
              <p className="cla-desc">{data?.description}</p>
            </div>

            <div className="cla-tabs">
              {tabs.map((tab) => (
                <div key={tab.key} className="cla-tab">
                  <button
                    onClick={() => setActiveKey((p) => (p === tab.key ? null : tab.key))}
                    className="cla-tab-btn"
                  >
                    {tab.title}
                    <span>{activeKey === tab.key ? "-" : "+"}</span>
                  </button>
                  {activeKey === tab.key && (
                    <div className="cla-items">
                      {(tab.items || []).map((it, i) => (
                        <div key={i} className="cla-item">
                          <span className="cla-bullet" style={{ color: accent }}>•</span>
                          <span>{it.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="cla-right">
            {activeTab?.image ? (
              <SafeImage src={activeTab.image} alt={activeTab.title} className="cla-img" />
            ) : (
              <div className="cla-empty">
                <Library className="cla-empty-icon" style={{ color: accent }} />
                <span>Select a section to view details</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusLifeAcademic;
