import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";
import { resolveImage } from "../../utils/resolveImage";

/**
 * SEL & SC — SIMULATION & CLINICAL SKILLS LABS
 *
 * Dark-blue section with a background image overlay and 3 columns
 * (Campuses / Highlights / Core Learning Outcomes). Mirrors
 * SimulationSELSC.jsx from the live site.
 *
 * Data shape (section_key: selsc_simulation)
 *   {
 *     heading:    "SIMULATION & CLINICAL SKILLS LABS",
 *     background: "assets/hero_section/sel-sc/hero.png",
 *     columns: [
 *       { title, description (HTML) },
 *       { title, description (HTML) },
 *       { title, description (HTML), bordered: true }
 *     ]
 *   }
 */
export default function SELSCSimulation({ data }) {
  if (!data) return null;
  const { heading, background, columns = [] } = data;

  const style = background
    ? { backgroundImage: `url(${resolveImage(background)})` }
    : {};

  return (
    <section className="selsc-simulation" style={style}>
      <div className="selsc-simulation-overlay">
        <div className="container selsc-simulation-inner">
          {heading && (
            <h2 className="selsc-simulation-heading">
              <hr className="selsc-simulation-line" />
              {heading}
            </h2>
          )}

          {columns.length > 0 && (
            <div className="selsc-simulation-grid">
              {columns.map((col, idx) => (
                <div
                  key={idx}
                  className={
                    "selsc-simulation-col" +
                    (col.bordered ? " selsc-simulation-col-bordered" : "")
                  }
                >
                  {col.title && (
                    <h5 className="selsc-simulation-col-title">{col.title}</h5>
                  )}
                  {col.description && (
                    <div className="selsc-simulation-col-desc">
                      <RichTextRenderer html={col.description} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
