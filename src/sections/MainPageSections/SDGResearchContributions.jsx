import React from "react";
import { Link } from "react-router-dom";

const SDGResearchContributions = ({ data }) => {
  if (!data) return null;

  const {
    heading,
    title_lines = [],
    image,
    cta_label,
    cta_url = "",
  } = data;

  return (
    <section className="sdg-section">
      <div className="container">
        {/* LEFT */}
        <div className="sdg-left">
          <h2 className="heading">
            <hr className="heading-line" />
            {heading}
          </h2>

          {/* TITLE LINES */}
          {title_lines.length > 0 && (
            <div className="sdg-title">
              {title_lines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          )}

          {/* CTA */}
          {cta_label && cta_url && (
            <div className="cta">
              <Link to={cta_url}>{cta_label}</Link>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="sdg-right">
          {image && (
            <img
              src={image}
              alt="SDG Research Contributions"
              className="sdg-image"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SDGResearchContributions;
