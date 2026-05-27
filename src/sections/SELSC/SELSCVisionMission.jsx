import React from "react";
import SafeImage from "../../components/SafeImage";
import { resolveImage } from "../../utils/resolveImage";

/**
 * SEL & SC — Vision & Mission
 * Two side-by-side cards with red-bar headings + body text + optional icons.
 *
 * Data shape (section_key: selsc_vision_mission)
 *   {
 *     cards: [
 *       { title: "Vision",  description: "...", icon: "...", bg_color: "#f8f3d9" },
 *       { title: "Mission", description: "...", icon: "...", bg_color: "#d3ebff" }
 *     ]
 *   }
 */
export default function SELSCVisionMission({ data }) {
  if (!data) return null;
  const { cards = [] } = data;
  if (!cards.length) return null;

  return (
    <section className="selsc-vm">
      <div className="container selsc-vm-grid">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="selsc-vm-card"
            style={c.bg_color ? { backgroundColor: c.bg_color } : undefined}
          >
            <div className="selsc-vm-card-head">
              <div>
                <hr className="selsc-vm-line" />
                <h2 className="selsc-vm-title">{c.title}</h2>
              </div>
              {c.icon && (
                <SafeImage
                  src={resolveImage(c.icon)}
                  alt={c.title}
                  className="selsc-vm-icon"
                />
              )}
            </div>
            {c.description && (
              <p className="selsc-vm-desc">{c.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
