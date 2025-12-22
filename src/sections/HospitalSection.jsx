import React from "react";
// import "../styles/InstituteSections/Hospital-section.css";

function HospitalSection({ data }) {
  const { heading, paragraphs = [], images = [] } = data || {};

  return (
    <div className="hospital-section">
      <div className="container gap-12 items-center justify-center">
        {/* HEADING */}
        <div className="hospital-heading-wrapper">
          <h2 className="hospital-heading">
            <span className="hospital-heading-line"></span>
            {heading}
          </h2>
        </div>

        {/* CONTENT */}
        <div className="hospital-layout">
          {/* TEXT */}
          <div className="hospital-text">
            {paragraphs.map((p, i) => (
              <p key={i} className="hospital-paragraph">
                {p}
              </p>
            ))}
          </div>

          {/* IMAGE PLACEHOLDER */}
          {images.length > 0 && (
            <div className="hospital-image-wrapper">
              <div className="hospital-image-placeholder">
                <div>
                  <p className="hospital-placeholder-title">
                    Hospital Infrastructure
                  </p>
                  <p>Image placeholder (no image configured)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HospitalSection;
