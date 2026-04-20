import React from "react";
import RichTextRenderer from "../../../components/RichTextRenderer";

function ResearchEcosystem({ data }) {
  if (!data) return null;

  const basic = data.basic || {};
  const { heading, desc, image } = basic;

  return (
    <section className="reco-section">
      <div className="container reco-layout">
        {/* IMAGE */}
        <div className="reco-image-wrapper">
          <img src={image} alt={heading} className="reco-image" />
        </div>

        {/* CONTENT */}
        <div className="reco-content">
          {heading && (
            <h2 className="heading">
              <hr className="heading-line" />
              {heading}
            </h2>
          )}

          {desc && <RichTextRenderer className="reco-text" html={desc} />}
        </div>
      </div>
    </section>
  );
}

export default ResearchEcosystem;
