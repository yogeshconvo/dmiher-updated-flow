import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResearchOpportunities = ({ data }) => {
  // Safety checks
  if (!data || !data.tabs || !data.tabs.length) return null;

  const {
    heading,
    subheading,
    tabs,
    contact_email,
    cta_url = "",
  } = data;

  // Default active tab
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  // Active tab data
  const activeData = tabs.find((t) => t.key === activeTab);

  return (
    <section className="research-op-section container">
      {/* ================= HEADING ================= */}
      <div className="">
        <h2 className="heading">
          <hr className="heading-line" />
          {heading}
        </h2>

        {subheading && (
          <p className="research-op-subheading">{subheading}</p>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="research-op-grid">
        {/* -------- LEFT : ACCORDION -------- */}
        <div className="research-op-accordion">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <div key={tab.key} className="research-op-item">
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`research-op-tab ${
                    isActive
                      ? "research-op-tab-active"
                      : "research-op-tab-inactive"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="research-op-icon">
                    {isActive ? "−" : "+"}
                  </span>
                </button>

                {isActive && tab.items?.length > 0 && (
                  <div className="research-op-list">
                    {tab.items.map((item, idx) => (
                      <div key={idx} className="research-op-list-item">
                        • {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* -------- FOOTER -------- */}
          <div className="research-op-footer">
            {cta_url && (
              <Link to={cta_url} className="research-op-link">
                Know more about research opportunities
              </Link>
            )}

            {contact_email && (
              <p className="research-op-contact">
                <strong>Contact:</strong>{" "}
                <a
                  href={`mailto:${contact_email}`}
                  className="research-op-link"
                >
                  {contact_email}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* -------- RIGHT : IMAGE -------- */}
        <div className="research-op-image-box">
          {activeData?.image && (
            <img
              src={activeData.image}
              alt={activeData.label}
              className="research-op-image"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ResearchOpportunities;
