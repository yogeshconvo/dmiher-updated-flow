import React from "react";
import SafeImage from "../../components/SafeImage";
import { resolveImage } from "../../utils/resolveImage";

/**
 * SEL & SC — OUR PRESTIGIOUS COLLABORATIONS
 * Single-row grid of partner logos with vertical dividers.
 *
 * Data shape (section_key: selsc_collaborations)
 *   {
 *     heading: "OUR PRESTIGIOUS COLLABORATIONS",
 *     logos:   [{ src, alt }, ...]
 *   }
 */
export default function SELSCCollaborations({ data }) {
  if (!data) return null;
  const { heading, logos = [] } = data;
  if (!logos.length) return null;

  return (
    <section className="selsc-collab">
      <div className="container">
        {heading && (
          <h2 className="selsc-collab-heading">
            <hr className="selsc-collab-line" />
            {heading}
          </h2>
        )}
        <ul className="selsc-collab-grid">
          {logos.map((logo, idx) => (
            <li key={idx} className="selsc-collab-cell">
              <SafeImage
                src={resolveImage(logo.src || logo.image)}
                alt={logo.alt || "partner"}
                className="selsc-collab-logo"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
