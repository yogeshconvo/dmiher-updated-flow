import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

/**
 * SEL & SC — page title bar with optional Mandatory Disclosures / FAQ links,
 * main heading and intro paragraph. Matches the second block of the live
 * SELSC.jsx (DetailsSELSC.jsx).
 *
 * Data shape (section_key: selsc_details)
 *   {
 *     title:        "SCHOOL OF EXPERIENTIAL LEARNING & SIMULATION CENTRE (SEL & SC)",
 *     links:        [{ label, url }, ...],
 *     main_heading: "TRANSFORMING HEALTHCARE EDUCATION THROUGH SIMULATION-BASED TRAINING",
 *     description:  "<p>SEL & SC offers ...</p>"
 *   }
 */
export default function SELSCDetails({ data }) {
  if (!data) return null;
  const { title, links = [], main_heading, description } = data;

  return (
    <section className="selsc-details">
      <div className="container">
        {title && (
          <h2 className="selsc-details-title">
            <hr className="selsc-details-line" />
            <span>{title}</span>
            <hr className="selsc-details-line" />
          </h2>
        )}

        {links.length > 0 && (
          <div className="selsc-details-links">
            {links.map((l, i) => (
              <React.Fragment key={i}>
                <a
                  href={l.url || "#"}
                  target={l.url?.startsWith("http") ? "_blank" : undefined}
                  rel={l.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {l.label}
                </a>
                {i < links.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </div>
        )}

        {main_heading && (
          <h3 className="selsc-details-main">{main_heading}</h3>
        )}

        {description && (
          <div className="selsc-details-desc">
            <RichTextRenderer html={description} />
          </div>
        )}
      </div>
    </section>
  );
}
