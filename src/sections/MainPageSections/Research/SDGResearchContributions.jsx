import React from "react";
import { Link } from "react-router-dom";

const SDGResearchContributions = ({ data }) => {
  if (!data) return null;

  const basic = data.basic || {};
  const titleLines = data.title_lines || [];

  const {
    heading,
    image,
    cta_label,
    cta_url = "",
  } = basic;

  return (
    <section className="sdg-section">
      <div className="container">

        {/* LEFT */}
        <div className="flex ">
        <div className="sdg-left">
          {heading && (
            <h2 className="heading">
              <hr className="heading-line" />
              {heading}
            </h2>
          )}

          {/* TITLE LINES */}
          {titleLines.length > 0 && (
            <div className="sdg-title">
              {titleLines.map((item, idx) => (
                <div key={idx}>{item.line}</div>
              ))}
            </div>
          )}

          {/* CTA */}
          {cta_label && cta_url && (
            <div className="cta">
              {/* If external link use <a> instead of Link */}
              {cta_url.startsWith("http") ? (
                <a href={cta_url} target="_blank" rel="noopener noreferrer">
                  {cta_label}
                </a>
              ) : (
                <Link to={cta_url}>{cta_label}</Link>
              )}
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
      </div>
    </section>
  );
};

export default SDGResearchContributions;