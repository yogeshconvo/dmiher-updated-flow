import { useState } from "react";
import RichTextRenderer from "../../components/RichTextRenderer";
import ViewMoreButton from "../../components/UI/ViewMore";

function InfoSection({ data }) {
  const source = data?.Info || data?.slider;
  if (!data || !Array.isArray(source) || source.length === 0) {
    return null;
  }

  const [showMore, setShowMore] = useState(false);

  const item = source[0] || {};

  const {
    title,
    subtitle,
    tegline,
    desc,
    institute_desc,
    non_desc,
    viredesc,
    content,
  } = item;

  const mainDesc = institute_desc || non_desc || desc;

  // Expanded content: legacy `viredesc` OR new `content[]` (only enabled, tab_type === "view")
  const expandedBlocks = Array.isArray(content)
    ? content.filter(
        (c) => c?._section_enabled !== false && c?.description
      )
    : [];

  const hasExpanded = Boolean(viredesc) || expandedBlocks.length > 0;

  return (
    <div className="info-wrapper">

      {/* TITLE */}
      {title && (
        <h2 className="info-title">
          <hr className="info-title-line" />

          <span className="info-title-text">
            {title}

            {subtitle && (
              <p className="info-subtitle">{subtitle}</p>
            )}
          </span>

          <hr className="info-title-line" />
        </h2>
      )}

      {/* CONTENT */}
      <section className="info-section">

        {/* Tagline */}
        {tegline && (
          <h1 className="info-tagline">{tegline}</h1>
        )}

        {/* Main Description */}
        {mainDesc && (
          <div className="info-description">
            <RichTextRenderer html={mainDesc} />
          </div>
        )}

        {/* ===== EXPANDED BLOCKS ===== */}
        {showMore && viredesc && (
          <div className="info-description">
            <RichTextRenderer html={viredesc} />
          </div>
        )}

        {showMore &&
          expandedBlocks.map((block, idx) => (
            <div key={idx} className="info-description">
              <RichTextRenderer html={block.description} />
            </div>
          ))}

        {/* ===== VIEW MORE / VIEW LESS ===== */}
        {hasExpanded && !showMore && (
          <ViewMoreButton
            label="View More"
            onClick={() => setShowMore(true)}
          />
        )}

        {hasExpanded && showMore && (
          <ViewMoreButton
            label="View Less"
            onClick={() => setShowMore(false)}
          />
        )}

      </section>
    </div>
  );
}

export default InfoSection;
