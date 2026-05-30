import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

/**
 * SEL & SC — DIVERSE LEARNERS
 * Heading + tagline + 2-column bullet list.
 *
 * Data shape (section_key: selsc_learners)
 *   {
 *     heading:  "DIVERSE LEARNERS",
 *     subtitle: "Across the Healthcare & Emergency Ecosystem",
 *     columns:  ["<ul>...</ul>", "<ul>...</ul>"]
 *   }
 */
export default function SELSCLearners({ data }) {
  if (!data) return null;
  // Support both the legacy flat shape ({heading, subtitle, columns:[html]})
  // and the normalized shape ({header:{heading,subtitle}, columns:[{content}]}).
  const heading = data.header?.heading ?? data.heading;
  const subtitle = data.header?.subtitle ?? data.subtitle;
  const columns = data.columns ?? [];

  return (
    <section className="selsc-learners">
      <div className="container">
        {heading && (
          <h2 className="selsc-learners-heading">
            <hr className="selsc-learners-line" />
            {heading}
          </h2>
        )}
        {subtitle && (
          <p className="selsc-learners-subtitle">{subtitle}</p>
        )}

        {columns.length > 0 && (
          <div className="selsc-learners-grid">
            {columns.map((col, idx) => (
              <div key={idx} className="selsc-learners-col">
                <RichTextRenderer html={typeof col === "string" ? col : col?.content} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
