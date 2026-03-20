import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";
// import "../styles/InstituteSections/Placements.css";

export default function PlacementsJNMC({ data }) {
  const { header, highlights = [] } = data || {};

  return (
    <section className="placements-section">
      <div className="container">
         <h2 className="heading">
              <hr className="heading-line" />
          {header.heading}
        </h2>
        <p>{header.description}</p>

      </div>

      <div className="placements-grid">
        {highlights.map((item, index) => (
          <div key={index} className="placements-item">
       <RichTextRenderer html={item.description} />
          </div>
        ))}
      </div>
    </section>
  );
}
