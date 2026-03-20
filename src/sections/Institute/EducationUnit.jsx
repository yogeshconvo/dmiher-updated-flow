
import React from "react";
import { Link } from "react-router";
import RichTextRenderer from "../../components/RichTextRenderer";
// import "../../styles/education-unit.css";

function EducationUnit({ data }) {
  if (!data) return null;

  const {
  header,
    paragraphs = [],
   cta
  } = data;

  return (
    <section
      className="education-section"
      style={{ "--edu-bg": `url(${header.background_image})` }}
    >
      <div className="education-overlay" />

      <div className="education-content container">
        <div className="mb-8">
          <h2 className="education-heading">
            <hr className="education-heading-line" />
            {header.heading}
          </h2>
          

          {paragraphs.map((para, index) => (
           <p key={index} className="education-paragraph">
              <RichTextRenderer html={para.description} />
            </p>
          ))}

          
            <Link to={cta.cta_url} className="cta">
              {cta.cta_label}
            </Link>
          
        </div>
      </div>
    </section>
  );
}

export default EducationUnit;
