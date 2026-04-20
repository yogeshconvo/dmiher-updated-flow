import React from "react";
import { Link } from "react-router-dom";
import RichTextRenderer from "../../../components/RichTextRenderer";

const SDGResearchContributions = ({ data }) => {
  if (!data) return null;

  const basic = data.basic || {};

  const { heading, desc, image, cta_label, page_slug = "" } = basic;

  return (
    <section className="sdg-section">
      <div className="container">
        {/* LEFT */}
        <div className="flex ">
          <div className="sdg-left">
            {heading && (
              <h2 className="heading">
                <hr className="heading-line" />
                {heading}
              </h2>
            )}

            {desc && <RichTextRenderer className="sdg-title" html={desc} />}

            {/* CTA */}
            {cta_label && page_slug && (
              <div className="cta">
                {page_slug.startsWith("http") ? (
                  <a
                    href={page_slug}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {cta_label}
                  </a>
                ) : (
                  <Link to={`/${page_slug}`}>{cta_label}</Link>
                )}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="sdg-right">
            {image && (
              <img
                src={image}
                alt="SDG Research Contributions"
                className="sdg-image"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDGResearchContributions;
