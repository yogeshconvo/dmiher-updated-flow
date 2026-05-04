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

  // Selected logo/sub-tab index
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reset selection when the parent campus tab changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [campus]);

  if (!hospitals.length) return null;

  const selected = hospitals[selectedIndex] || hospitals[0];
  const contentItems = Array.isArray(selected?.content) ? selected.content : [];

  return (
    <div className="container py-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#707070] mb-2 font-oswald-medium font-[500] tracking-tight">
        <span className="block border-t-4 border-[#F04E30] w-20 sm:w-24 mb-2 mr-4"></span>
        {heading}
      </h2>
      {subheading && <p className="text-[#122E5E] text-xl">{subheading}</p>}

      {/* ===== LOGO SUB-TABS ===== */}
      <div className="flex flex-wrap justify-center max-w-5xl mx-auto items-end gap-6 md:gap-10 mt-16">
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
              className={`w-[220px] md:w-[250px] flex flex-col items-center justify-end text-center gap-3 pb-2 transition-all duration-300 ${
                isActive
                  ? "opacity-100 scale-105 border-b-4 border-[#F04E30]"
                  : "opacity-70 hover:opacity-100 hover:scale-105 border-b-4 border-transparent"
              }`}
            >
              {hospital.logo ? (
                <SafeImage
                  src={resolveImage(hospital.logo)}
                  alt={name}
                  className="max-h-20 object-contain"
                />
              ) : (
                <div className="h-20 flex items-center justify-center text-[#122E5E] font-semibold">
                  {name}
                </div>
              )}
              {/* <span
                className={`text-sm font-semibold leading-tight ${
                  isActive ? "text-[#122E5E]" : "text-[#58595B]"
                }`}
              >
                {name}
              </span> */}
            </button>
          );
        })}
      </div>

      {/* ===== ACTIVE LOGO'S CONTENT ===== */}
      {contentItems.length > 0 && (
        <div className="mt-12 space-y-10">
          {contentItems.map((content, cIdx) => {
            if (!content?.heading && !content?.description && !content?.image) {
              return null;
            }
            return (
              <div
                key={cIdx}
                className="flex items-start gap-8 bg-white p-10 rounded-lg shadow-md flex-col lg:flex-row"
              >
                <div className="flex-1">
                  {content.heading && (
                    <h3 className="text-[#269BFF] font-bold mb-4 text-xl max-w-[350px]">
                      {content.heading}
                    </h3>
                  )}
                  {content.description && (
                    <div className="text-[15px]">
                      <RichTextRenderer html={content.description} />
                    </div>
                  )}
                  {content.url && content.label && (
                    <a
                      href={content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#122E5E] hover:bg-[#F04E30] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <span>{content.label.trim()}</span>
                      <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </a>
                  )}
                </div>
                {content.image && (
                  <div className="flex-1 w-full">
                    <SafeImage
                      src={resolveImage(content.image)}
                      alt=""
                      className="md:mt-10 h-[400px] w-full object-cover rounded-lg"
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
