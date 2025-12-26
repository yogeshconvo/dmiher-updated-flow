import React from "react";
// import "../styles/InstituteSections/Placements.css";

export default function PlacementsJNMC({ data }) {
  const { heading, description, highlights = [] } = data || {};

  return (
    <section className="placements-section">
      <div className="container">
         <h2 className="heading">
              <hr className="heading-line" />
          {heading}
        </h2>

        <p className="placements-description">{description}</p>
      </div>

      <div className="placements-grid">
        {highlights.map((item, index) => (
          <div key={index} className="placements-item">
            <span
              className="placements-highlight"
              style={{ color: item.color }}
            >
              {item.highlight}
            </span>{" "}
            {item.text.replace(item.highlight, "").trim()}
          </div>
        ))}
      </div>
    </section>
  );
}
