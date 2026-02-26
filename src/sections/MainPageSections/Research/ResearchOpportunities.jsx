import React, { useState } from "react";
import { Link } from "react-router-dom";
import RichTextRenderer from "../../../components/RichTextRenderer";

const ResearchOpportunities = ({ data }) => {
  if (!data) return null;

  const basic = data.basic || {};
  const tabs = data.tabs || [];

  if (!tabs.length) return null;

  const {
    heading,
    subheading,
    contact_email,
    cta_url,
    cta_name
  } = basic;

  // Since API has no key, use index
  const [activeTab, setActiveTab] = useState(0);

  const activeData = tabs[activeTab];

  return (
    <section className="research-op-section container">
      
      {/* ================= HEADING ================= */}
      <div>
        {heading && (
          <h2 className="heading">
            <hr className="heading-line" />
            {heading}
          </h2>
        )}

        {subheading && (
          <p className="research-op-subheading">{subheading}</p>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="research-op-grid">

        {/* -------- LEFT -------- */}
        <div className="research-op-accordion">
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;

            return (
              <div key={index} className="research-op-item">
                <button
                  type="button"
                  onClick={() => setActiveTab(index)}
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

                {isActive && tab.desc && (
                  <RichTextRenderer
                    className="research-op-list"
                  html={ tab.desc}
                  
                  />
                )}
              </div>
            );
          })}

          {/* -------- FOOTER -------- */}
          <div className="research-op-footer">
            {cta_url && (
              <Link to={cta_url} className="research-op-link">
               {cta_name}
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

        {/* -------- RIGHT IMAGE -------- */}
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