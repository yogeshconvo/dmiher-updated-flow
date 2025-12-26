
import React from "react";
import { Link } from "react-router-dom";
// import "../styles/InstituteSections/DeanMessage.css";

const DeansMessage = ({ data }) => {
  const {
    heading,
    dean_name,
    designation_lines = [],
    email,
    dean_image,
    paragraphs = [],
    cta_label,
    cta_url,
  } = data || {};

  return (
    <div className="deans-section">
      <div className="container">
        <h2 className="deans-heading">
          <div className="deans-heading-line"></div>
          {heading}
        </h2>

        <div className="deans-layout">
          {/* IMAGE + NAME */}
          <div className="deans-image-wrapper">
            <img
              src={dean_image}
              alt={dean_name}
              className="deans-image"
            />

            <div className="deans-info">
              <p className="deans-name">{dean_name}</p>

              {designation_lines.length > 0 && (
                <p>
                  {designation_lines.map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              )}

              {email && <p className="deans-email">{email}</p>}
            </div>
          </div>

          {/* MESSAGE */}
          <div className="deans-message">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="deans-paragraph">
                {para}
              </p>
            ))}

            {cta_label && cta_url && (
              <Link to={cta_url} className="cta">
                {cta_label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeansMessage;
