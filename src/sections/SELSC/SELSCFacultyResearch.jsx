import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

/**
 * SEL & SC — FACULTY & RESEARCH
 * Heading + tagline + 2-3 highlight blocks separated by vertical dividers.
 *
 * Data shape (section_key: selsc_faculty_research)
 *   {
 *     header: {
 *       heading:     "FACULTY & RESEARCH",
 *       description: "<p class=\"selsc-fr-subtitle\">Powered by Experience...</p>
 *                     <div class=\"selsc-fr-desc\">...</div>"   // subtitle + desc as HTML
 *     },
 *     highlights: [
 *       // value is inline <strong> inside the HTML, color set via inline style
 *       { description: "<p><span style=\"color:#ef5539\"><strong>15+ Experts</strong></span> across...</p>" }
 *     ],
 *     cta: { label: "Meet Our Team", url: "#" }
 *   }
 */
export default function SELSCFacultyResearch({ data }) {
  if (!data) return null;
  const { header = {}, highlights = [], cta } = data;
  const { heading, description } = header;

  return (
    <section className="selsc-fr">
      <div className="container">
        {heading && (
          <h2 className="selsc-fr-heading">
            <hr className="selsc-fr-line" />
            {heading}
          </h2>
        )}
        {description && <RichTextRenderer html={description} />}

        {highlights.length > 0 && (
          <div className="selsc-fr-grid">
            {highlights.map((h, idx) => (
              <div key={idx} className="selsc-fr-item">
                <RichTextRenderer html={h.description} />
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
