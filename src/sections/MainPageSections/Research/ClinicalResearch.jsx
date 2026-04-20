import React from "react";
import MicroPageCTA from "../../../components/MicroPageCTA";

export default function ClinicalResearch({ data, instituteSlug }) {
  if (!data) return null;

  const basic = data.basic || {};
  const { title, subtitle, image, image_alt, cta } = basic;

  return (
    <div className="infograph-section">
      <div className="infograph-container">

        {/* Image */}
        <div className="infograph-image">
          <img src={image} alt={image_alt || title || "Clinical Research"} />
        </div>

        {/* Content */}
        <div className="infograph-content">

          {title && (
            <h2 className="heading">
              <hr className="heading-line" />
              {title}
            </h2>
          )}

          {subtitle && (
            <h3 className="infograph-subtitle">{subtitle}</h3>
          )}

          {cta?.label && (
            <MicroPageCTA
              cta={cta}
              pageslug={instituteSlug}
              className="mt-2 mb-4 px-6 py-2 bg-[#F04E30] hover:bg-[#122E5E] hover:scale-105 transition-transform duration-200 text-white rounded font-semibold"
            />
          )}

        </div>
      </div>
    </div>
  );
}
