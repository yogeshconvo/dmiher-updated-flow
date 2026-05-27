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
  const { heading, subtitle, columns = [] } = data;

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
                <RichTextRenderer html={col} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
