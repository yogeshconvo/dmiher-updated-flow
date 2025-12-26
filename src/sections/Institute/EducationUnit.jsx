
import React from "react";
import { Link } from "react-router";
// import "../../styles/education-unit.css";

function EducationUnit({ data }) {
  if (!data) return null;

  const {
    section_id,
    heading,
    paragraphs = [],
    cta_label,
    cta_url,
    background_image,
  } = data;

  return (
    <section
      id={section_id}
      className="education-section"
      style={{ "--edu-bg": `url(${background_image})` }}
    >
      <div className="education-overlay" />

      <div className="education-content container">
        <div className="mb-8">
          <h2 className="education-heading">
            <hr className="education-heading-line" />
            {heading}
          </h2>

          {paragraphs.map((text, index) => (
            <p key={index} className="education-paragraph">
              {text}
            </p>
          ))}

          {cta_label && cta_url && (
            <Link to={cta_url} className="cta">
              {cta_label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default EducationUnit;
