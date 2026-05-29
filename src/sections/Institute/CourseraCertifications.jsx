import React from "react";
import SafeImage from "../../components/SafeImage";
import resolveImage from "../../utils/resolveImage";

/**
 * Coursera-Enabled Certificate Courses — unique CDOE section.
 *
 * Renders a 2×2 grid of stat boxes (icon + title + bullet list) joined by a
 * decorative "tree" of connecting lines, mirroring the live-site layout.
 *
 * Data shape (section_key = coursera_certifications):
 *   {
 *     basic: { heading, subtitle },
 *     cards: [ { title, image, description } ]   // description bullets split on "•"
 *   }
 */
const CourseraCertifications = ({ data }) => {
  if (!data) return null;

  const heading = data?.basic?.heading || data?.heading || "";
  const subtitle = data?.basic?.subtitle || data?.subtitle || "";
  const cards = Array.isArray(data?.cards) ? data.cards : [];

  if (!cards.length) return null;

  // Split a "a • b" description into individual bullet strings.
  const toBullets = (desc = "") =>
    String(desc)
      .split("•")
      .map((s) => s.trim())
      .filter(Boolean);

  return (
    <section className="coursera-section">
      <div className="container">
        {heading && (
          <h2 className="coursera-heading">
            <hr className="coursera-heading-line" />
            {heading}
          </h2>
        )}

        {subtitle && <p className="coursera-subtitle">{subtitle}</p>}

        <div className="coursera-grid">
          {/* decorative connectors (desktop only) */}
          <span className="coursera-line coursera-line-vert" />
          <span className="coursera-line coursera-line-horiz" />
          <span className="coursera-line coursera-line-drop-left" />
          <span className="coursera-line coursera-line-drop-right" />

          {cards.map((card, idx) => (
            <div key={idx} className="coursera-card">
              <div className="coursera-card-bar" />
              <div className="coursera-card-body">
                {card.image && (
                  <SafeImage
                    src={resolveImage(card.image)}
                    alt={card.title || "icon"}
                    className="coursera-card-icon"
                  />
                )}
                <div>
                  {card.title && (
                    <h3 className="coursera-card-title">{card.title}</h3>
                  )}
                  <ul className="coursera-card-list">
                    {toBullets(card.description).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseraCertifications;
