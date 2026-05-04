import React, { useState } from "react";
import RichTextRenderer from "../../../components/RichTextRenderer";
import SafeImage from "../../../components/SafeImage";

const ResearchOpportunities = ({ data }) => {
  if (!data) return null;

  const basic = data.basic || {};
  const tabs = data.tabs || [];

  if (!tabs.length) return null;

  const { heading, subheading, sub_heading, desc } = basic;

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

        {sub_heading ? (
          <RichTextRenderer
            className="research-op-subheading"
            html={sub_heading}
          />
        ) : (
          subheading && (
            <p className="research-op-subheading">{subheading}</p>
          )
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
                    html={tab.desc}
                  />
                )}
              </div>
            );
          })}

          {/* -------- FOOTER -------- */}
          {desc && (
            <div className="research-op-footer">
              <RichTextRenderer html={desc} />
            </div>
          )}
        </div>

        {/* -------- RIGHT IMAGE -------- */}
        <div className="research-op-image-box">
          {activeData?.image && (
            <SafeImage
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
