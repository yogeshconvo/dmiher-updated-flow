import React from "react";
import { Link } from "react-router-dom";
import RichTextRenderer from "../../components/RichTextRenderer";
import { ROUTES } from "../../utils/routes";
import ViewMoreButton from "../../components/UI/Buttons";

const DeansMessage = ({ data, pageSlug }) => {
  if (!data) return null;

  const main = data.main || {};
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
                src={main.img}
                alt={main.dean_name || "Dean"}
                className="deans-image"
              />
            )}

            {/* Dean Info (name + designation) */}
            {main.desc && (
              <div className="deans-info">
                <RichTextRenderer html={main.desc} />
              </div>
            )}
          </div>

          {/* ================= MESSAGE ================= */}
          <div className="deans-message">

            {/* Paragraph Content */}
            {paragraphs.map((item, i) => (
              <div key={i} className="deans-paragraph">
                <RichTextRenderer html={item.desc} />
              </div>
            ))}

            {/* ================= CTA ================= */}
            {cta?.cta_label && (
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