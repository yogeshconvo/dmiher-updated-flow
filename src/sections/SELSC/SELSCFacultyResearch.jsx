import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

/**
 * SEL & SC — FACULTY & RESEARCH
 * Heading + tagline + 2-3 highlight blocks separated by vertical dividers.
 *
 * Data shape (section_key: selsc_faculty_research)
 *   {
 *     heading:  "FACULTY & RESEARCH",
 *     subtitle: "Powered by Experience. Shaped by Global Standards.",
 *     description: "<p>...</p>",
 *     highlights: [
 *       { value: "15+ Experts", value_color: "#F04E30", description: "across healthcare..." }
 *     ],
 *     cta: { label: "Meet Our Team", url: "#" }
 *   }
 */
export default function SELSCFacultyResearch({ data }) {
  if (!data) return null;
  const {
    heading,
    subtitle,
    description,
    highlights = [],
    cta,
  } = data;

  return (
    <section className="selsc-fr">
      <div className="container">
        {heading && (
          <h2 className="selsc-fr-heading">
            <hr className="selsc-fr-line" />
            {heading}
          </h2>
        )}
        {subtitle && (
          <p className="selsc-fr-subtitle">{subtitle}</p>
        )}
        {description && (
          <div className="selsc-fr-desc">
            <RichTextRenderer html={description} />
          </div>
        )}

        {highlights.length > 0 && (
          <div className="selsc-fr-grid">
            {highlights.map((h, idx) => (
              <div key={idx} className="selsc-fr-item">
                {h.value && (
                  <b
                    className="selsc-fr-item-value"
                    style={h.value_color ? { color: h.value_color } : undefined}
                  >
                    {h.value}
                  </b>
                )}{" "}
                {h.description}
              </div>
            ))}
          </div>
        )}

        {cta?.label && (
          <a
            href={cta.url || "#"}
            target={cta.url?.startsWith("http") ? "_blank" : undefined}
            rel={cta.url?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="selsc-fr-cta"
          >
            {cta.label}
          </a>
        )}
      </div>
    </section>
  );
}
