import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import RichTextRenderer from "../../../../components/RichTextRenderer";
import { resolveImage } from "../../../../utils/resolveImage";
import { pickIndexedBlock } from "./helpers";
import SafeImage from "../../../../components/SafeImage";

function OurHospitals({ campus }) {
  const diff = campus?.difference || {};
  const diffHeader = pickIndexedBlock(diff);
  const heading = diffHeader.hospital_heading || "OUR HOSPITALS";
  const subheading = diffHeader.hospital_subheading || "";
  const hospitals = Array.isArray(diff?.hospitals) ? diff.hospitals : [];

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [campus]);

  if (!hospitals.length) return null;

  const selected = hospitals[selectedIndex] || hospitals[0];
  const contentItems = Array.isArray(selected?.content) ? selected.content : [];

  return (
    <div className="our-hospitals-section">
      <h2 className="our-hospitals-heading">
        <span className="our-hospitals-heading-line"></span>
        {heading}
      </h2>
      {subheading && <p className="our-hospitals-subheading">{subheading}</p>}

      {/* ===== LOGO SUB-TABS ===== */}
      <div className="our-hospitals-tabs">
        {hospitals.map((hospital, idx) => {
          const isActive = selectedIndex === idx;
          const name = hospital?.content?.[0]?.heading || `Hospital ${idx + 1}`;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-selected={isActive}
              aria-label={name}
              className={`our-hospitals-tab-btn ${
                isActive
                  ? "our-hospitals-tab-active"
                  : "our-hospitals-tab-inactive"
              }`}
            >
              {hospital.logo ? (
                <SafeImage
                  src={resolveImage(hospital.logo)}
                  alt={name}
                  className="our-hospitals-logo"
                />
              ) : (
                <div className="our-hospitals-fallback">
                  {name}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* ===== ACTIVE LOGO'S CONTENT ===== */}
      {contentItems.length > 0 && (
        <div className="our-hospitals-content">
          {contentItems.map((content, cIdx) => {
            if (!content?.heading && !content?.description && !content?.image) {
              return null;
            }
            return (
              <div
                key={cIdx}
                className="our-hospitals-card"
              >
                <div className="our-hospitals-content-text">
                  {content.heading && (
                    <h3 className="our-hospitals-content-heading">
                      {content.heading}
                    </h3>
                  )}
                  {content.description && (
                    <div className="our-hospitals-content-desc">
                      <RichTextRenderer html={content.description} />
                    </div>
                  )}
                  {content.url && content.label && (
                    <a
                      href={content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="our-hospitals-content-cta group/cta"
                    >
                      <span>{content.label.trim()}</span>
                      <ExternalLink className="our-hospitals-content-cta-icon" />
                    </a>
                  )}
                </div>
                {content.image && (
                  <div className="our-hospitals-content-img-wrap">
                    <SafeImage
                      src={resolveImage(content.image)}
                      alt=""
                      className="our-hospitals-content-img"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OurHospitals;
