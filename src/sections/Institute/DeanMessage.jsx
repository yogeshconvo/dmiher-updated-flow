import React from "react";
import { Link } from "react-router-dom";
import { getImageSrc } from "../../components/Services/FetchImages";
import { ROUTES } from "../../utils/routes";
import ViewMoreButton from "../../components/UI/Buttons";

const DeansMessage = ({ data, pageSlug }) => {
  if (!data) return null;

  const main = data.main || {};

  /* ================= FIX DESIGNATION ================= */
  let designationLines = [];
  if (Array.isArray(data.designation_lines)) {
    designationLines = data.designation_lines;
  } else if (data.designation_lines?.value) {
    designationLines = [data.designation_lines];
  }

  const paragraphs = Array.isArray(data.paragraphs)
    ? data.paragraphs
    : [];

  const cta = data.cta || {};
  const ctaItem = cta?.["0"];

  const ctaLink =
    ctaItem?.has_micro_page && ctaItem?.micro_slug
      ? ROUTES.microPage(pageSlug, ctaItem.micro_slug)
      : "";

  return (
    <div className="deans-section">
      <div className="container">

        {/* ================= HEADING ================= */}
        {main.heading && (
          <h2 className="deans-heading">
            <div className="deans-heading-line"></div>
            {main.heading}
          </h2>
        )}

        <div className="deans-layout">

          {/* ================= IMAGE + INFO ================= */}
          <div className="deans-image-wrapper">
            {main.img && (
              <img
                src={getImageSrc(main.img)}
                alt={main.dean_name || "Dean"}
                className="deans-image"
              />
            )}

            <div className="deans-info">
              {main.dean_name && (
                <p className="deans-name">{main.dean_name}</p>
              )}

              {designationLines.length > 0 && (
                <p className="deans-designation">
                  {designationLines.map((line, idx) => (
                    <span key={idx}>
                      {line.value}
                      <br />
                    </span>
                  ))}
                </p>
              )}

              {main.email && (
                <p className="deans-email">{main.email}</p>
              )}
            </div>
          </div>

          {/* ================= MESSAGE ================= */}
          <div className="deans-message">
            {paragraphs.map((para, idx) =>
              para?.desc ? (
                <p key={idx} className="deans-paragraph">
                  {para.desc}
                </p>
              ) : null
            )}

            {/* ================= CTA ================= */}
            {cta?.cta_label && ctaLink && (
              <ViewMoreButton
                href={ctaLink}
                label={cta.cta_label}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DeansMessage;
