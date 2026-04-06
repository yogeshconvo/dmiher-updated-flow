import React, { useState } from "react";
import RichTextRenderer from "../../components/RichTextRenderer";
import ViewMoreButton from "../../components/UI/Buttons";

const DeansMessage = ({ data, pageSlug, college }) => {
  const [expanded, setExpanded] = useState(false);

  if (!data) return null;

  const main = data.main || {};
  const paragraphs = data.paragraphs || [];
  const moreParagraphs = data.view_more_paragraphs || [];
  const cta = data.cta || {};

  // Resolve the college slug for building the CTA link
  const resolvedSlug = college || pageSlug;

  // CTA LINK: /{college}/{cta_key}  e.g. /jnmc/deanKnowMore
  const ctaLink =
    cta?.has_micro_page && cta?.cta_key && resolvedSlug
      ? `/${resolvedSlug}/${cta.cta_key}`
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

            {/* EXPAND CONTENT */}
            {expanded &&
              moreParagraphs.map((item, i) => (
                <div key={i} className="deans-paragraph">
                  <RichTextRenderer html={item.desc} />
                </div>
              ))}

            {/* ================= CTA ================= */}

            {/* CASE 1: Redirect → /{college}/{ctaKey} */}
            {ctaLink ? (
              <ViewMoreButton
                href={ctaLink}
                label={cta.cta_label || "View More"}
              />
            ) : (
              // CASE 2: Expand / Collapse
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
