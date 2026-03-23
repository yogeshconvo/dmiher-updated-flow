import React, { useState } from "react";
import { Link } from "react-router-dom";
import RichTextRenderer from "../../components/RichTextRenderer";
import { ROUTES } from "../../utils/routes";
import ViewMoreButton from "../../components/UI/Buttons";

const DeansMessage = ({ data, pageSlug }) => {
  if (!data) return null;

  const main = data.main || {};
  const paragraphs = data.paragraphs || [];
  const moreParagraphs = data.view_more_paragraphs || [];

  const cta = data.cta || {};
  const ctaItem = cta?.["0"];

  const [expanded, setExpanded] = useState(false);

  // ✅ CTA LINK LOGIC
  const ctaLink =
    ctaItem?.has_micro_page && ctaItem?.micro_slug
      ? ROUTES.microPage(pageSlug, ctaItem.micro_slug)
      : null;

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

          {/* ================= IMAGE ================= */}
          <div className="deans-image-wrapper">
            {main.img && (
              <img
                src={main.img}
                alt={main.dean_name || "Dean"}
                className="deans-image"
              />
            )}

            {main.desc && (
              <div className="deans-info">
                <RichTextRenderer html={main.desc} />
              </div>
            )}
          </div>

          {/* ================= MESSAGE ================= */}
          <div className="deans-message">

            {/* DEFAULT PARAGRAPHS */}
            {paragraphs.map((item, i) => (
              <div key={i} className="deans-paragraph">
                <RichTextRenderer html={item.desc} />
              </div>
            ))}

            {/* ================= EXPAND CONTENT ================= */}
            {expanded &&
              moreParagraphs.map((item, i) => (
                <div key={i} className="deans-paragraph">
                  <RichTextRenderer html={item.desc} />
                </div>
              ))}

            {/* ================= CTA ================= */}

            {/* ✅ CASE 1: Redirect */}
            {ctaLink ? (
              <ViewMoreButton href={ctaLink} label={cta.cta_label || "View More"} />
            ) : (
              // ✅ CASE 2: Expand/Collapse
              moreParagraphs.length > 0 && (
                <ViewMoreButton
                  onClick={() => setExpanded(!expanded)}
                  label={expanded ? "Read Less" : "Read More"}
                />
              )
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DeansMessage;