import React from "react";
// import "./InternationalCollaborations.css";
// import dataFile from "./internationalCollaborations.json";

export default function InternationalCollaborations({data}) {
  const { title, stats, background_image } = data;

  return (
    <section
      id="international_collaborations"
      className="intl-section"
      style={{ backgroundImage: `url(${background_image})` }}
    >
      {/* Heading */}
      <div className="intl-container">
        <h2 className="intl-title">
          <hr className="intl-line" />
          {title}
        </h2>
      </div>

      {/* Stats */}
      <div className="intl-stats-wrapper">
        
        {/* Desktop */}
        <div className="intl-desktop">
          <div className="intl-horizontal-line" />

          <div className="intl-grid">
            {stats.map((item, idx) => (
              <div key={idx} className="intl-col">

                {/* Vertical Connector */}
                <div
                  className={`intl-vertical-line ${
                    item.position === "top"
                      ? "intl-line-top"
                      : "intl-line-bottom"
                  }`}
                />

                {/* Data Block */}
                <div
                  className={`intl-data ${
                    item.position === "top"
                      ? "intl-data-top"
                      : "intl-data-bottom"
                  }`}
                >
                  <div
                    className="intl-number"
                    style={{ color: item.color }}
                  >
                    {item.number}
                  </div>
                  <div className="intl-label">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="intl-mobile">
          {stats.map((item, idx) => (
            <div key={idx} className="intl-mobile-item">
              <div
                className="intl-mobile-number"
                style={{ color: item.color }}
              >
                {item.number}
              </div>
              <div className="intl-mobile-label">
                {item.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
