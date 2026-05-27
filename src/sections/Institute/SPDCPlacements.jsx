import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";
import SafeImage from "../../components/SafeImage";
import resolveImage from "../../utils/resolveImage";

/**
 * SPDC-specific Placements layout.
 *
 * Renders (top → bottom):
 *   - heading + description (red-bar style)
 *   - horizontal split bar with N colored cells (e.g. 40/60)
 *   - 2-column info grid
 *   - centred row of partner-university logos (Birmingham, Adelaide, etc.)
 *
 * Data shape (section_key: spdc_placements):
 *   {
 *     header: { heading, description },
 *     split_bar:  [ { percent, label, bg_color, width }, ... ],
 *     info_blocks:[ { description }, ... ],
 *     logos:      [ { image, alt }, ... ]
 *   }
 */
export default function SPDCPlacements({ data }) {
  if (!data) return null;

  const {
    header = {},
    split_bar = [],
    info_blocks = [],
    logos = [],
  } = data;

  return (
    <section className="spdc-placements-section">
      <div className="container">
        {/* Heading */}
        {header?.heading && (
          <h2 className="heading">
            <hr className="heading-line" />
            {header.heading}
          </h2>
        )}

        {/* Description */}
        {header?.description && (
          <p className="spdc-placements-desc">{header.description}</p>
        )}

        {/* Split bar */}
        {split_bar.length > 0 && (
          <div className="spdc-placements-bar">
            {split_bar.map((cell, idx) => (
              <div
                key={idx}
                className="spdc-placements-bar-cell"
                style={{
                  width: cell.width || `${100 / split_bar.length}%`,
                  backgroundColor: cell.bg_color || "#0A2B61",
                }}
              >
                <div className="spdc-placements-bar-percent">{cell.percent}</div>
                <div className="spdc-placements-bar-label">{cell.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Info blocks — 2-column grid */}
        {info_blocks.length > 0 && (
          <div className="spdc-placements-info-grid">
            {info_blocks.map((block, idx) => (
              <div key={idx} className="spdc-placements-info-item">
                <RichTextRenderer html={block.description} />
              </div>
            ))}
          </div>
        )}

        {/* Partner-university logos */}
        {logos.length > 0 && (
          <div className="spdc-placements-logos">
            {logos.map((logo, idx) => (
              <div
                key={idx}
                className={
                  "spdc-placements-logo-cell" +
                  (idx < logos.length - 1
                    ? " spdc-placements-logo-cell-border"
                    : "")
                }
              >
                <SafeImage
                  src={resolveImage(logo.image || logo.src)}
                  alt={logo.alt || `Partner university ${idx + 1}`}
                  className="spdc-placements-logo"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
