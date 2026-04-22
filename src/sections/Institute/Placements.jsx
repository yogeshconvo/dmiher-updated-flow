import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";
// import "../styles/InstituteSections/Placements.css";

export default function PlacementsJNMC({ data }) {
  const { header = {} } = data || {};

  // Support both legacy flat `highlights` and new
  // `optinal_content[]._section_enabled + .highlights[]` structure.
  const highlights = Array.isArray(data?.highlights)
    ? data.highlights
    : (data?.optinal_content || [])
        .filter((block) => block?._section_enabled !== false)
        .flatMap((block) => block?.highlights || []);

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
