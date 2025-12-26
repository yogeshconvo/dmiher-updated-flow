import React from "react";
// import "../../styles/research-ecosystem-main.css";
// import "../../styles/research-ecosystem-responsive.css";

function ResearchEcosystem({ data }) {
  if (!data) return null;

  const {
    heading,
    subheading,
    description_title,
    description,
    points = [],
    image,
  } = data;

  return (
    <section className="reco-section">
      <div className="container reco-layout">
        {/* IMAGE */}
        <div className="reco-image-wrapper">
          <img
            src={image}
            alt={heading}
            className="reco-image"
          />
        </div>

        {/* CONTENT */}
        <div className="reco-content">
          <h2 className="heading">
            <hr className="heading-line" />
            {heading}
          </h2>

          {subheading && (
            <h3 className="reco-subheading">{subheading}</h3>
          )}

          <p className="reco-text">
            <span className="reco-text-strong">
              {description_title}
            </span>
            <br />
            {description}
          </p>

          <ul className="reco-list">
            {points.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ResearchEcosystem;
