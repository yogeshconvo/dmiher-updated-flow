import React from "react";
import RichTextRenderer from "../../../../components/RichTextRenderer";
import { resolveImage } from "../../../../utils/resolveImage";
import { flattenNumericKeys } from "./utils";

/**
 * Renders one tab's content. `tab` is a single entry from data.tabs[].
 */
export default function AboutHospitalTabBody({ tab }) {
  if (!tab) return null;
  const tabType = tab.tab_type || "rich";

  if (tabType === "vision_mission") return <VisionMissionView tab={tab} />;
  if (tabType === "schemes_table") return <SchemesTableView tab={tab} />;
  if (tabType === "document") return <DocumentView tab={tab} />;
  if (tabType === "gallery") return <GalleryView tab={tab} />;
  return <RichView tab={tab} />;
}

/* ============================================================
 *  RICH
 * ============================================================ */
function RichView({ tab }) {
  const certificates = Array.isArray(tab?.rich_certificates)
    ? tab.rich_certificates
    : [];
  const body = flattenNumericKeys(tab?.rich)?.body;

  return (
    <div className="space-y-8">
      {certificates.length > 0 && (
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto mb-6">
          {certificates.map((c, i) => (
            <img
              key={i}
              src={resolveImage(c.image)}
              alt={c.alt || "Certificate"}
              className="w-full md:w-1/2 h-auto mb-4 rounded-lg shadow-lg"
            />
          ))}
        </div>
      )}

      {body && <RichTextRenderer html={body} />}
    </div>
  );
}

/* ============================================================
 *  VISION / MISSION / QUALITY VALUE
 *  Matches the original AboutSpdcPage layout — orange Vision card,
 *  gray Mission card, navy Quality Value Statement card. Admin can
 *  override each card's bg color (hex) and icon (uploaded image).
 * ============================================================ */
function VisionMissionView({ tab }) {
  // New schema (post-redesign): vision_card / mission_card / quality_card
  // Legacy schema: vision_mission group with vision/mission/quality_value_statement
  const legacy = flattenNumericKeys(tab?.vision_mission) || {};

  const vision = flattenNumericKeys(tab?.vision_card) || {
    text: legacy.vision,
  };
  const mission = flattenNumericKeys(tab?.mission_card) || {
    text: legacy.mission,
  };
  const quality = flattenNumericKeys(tab?.quality_card) || {
    text: legacy.quality_value_statement,
  };

  const orgValues = Array.isArray(tab?.organizational_values)
    ? tab.organizational_values
    : [];
  const objectives = Array.isArray(tab?.quality_objectives)
    ? tab.quality_objectives
    : [];

  return (
    <div className="w-full px-4 sm:px-8 md:px-15 py-10 sm:py-20">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 max-md:gap-0">
        <Card
          title="Vision"
          bgColor={vision.bg_color || "#F7941D"}
          iconUrl={vision.icon ? resolveImage(vision.icon) : null}
          textHtml={vision.text}
        />
        <Card
          title="Mission"
          bgColor={mission.bg_color || "#707070"}
          iconUrl={mission.icon ? resolveImage(mission.icon) : null}
          textHtml={mission.text}
        />
      </div>

      {(quality.text || orgValues.length > 0 || objectives.length > 0) && (
        <div
          className="p-6 sm:p-10 text-white shadow-md mt-10"
          style={{ backgroundColor: quality.bg_color || "#122E5E" }}
        >
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl uppercase sm:text-3xl md:text-4xl text-white mb-2 font-oswald-medium font-[500] tracking-tight leading-tight">
              <span className="block border-t-4 border-[#F04E30] w-20 sm:w-24 mb-2 mr-4"></span>
              Quality Value Statement
            </h2>
            {quality.icon && (
              <img
                src={resolveImage(quality.icon)}
                alt="Quality"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
              />
            )}
          </div>

          {quality.text && (
            <div className="leading-relaxed">
              <RichTextRenderer html={quality.text} />
            </div>
          )}

          {orgValues.length > 0 && (
            <>
              <h3 className="text-xl mt-6 mb-2 font-semibold">
                Organizational Values
              </h3>
              <ul className="list-disc list-inside leading-relaxed">
                {orgValues.map((row, i) => (
                  <li key={i}>
                    <RichTextRenderer html={row.item} />
                  </li>
                ))}
              </ul>
            </>
          )}

          {objectives.length > 0 && (
            <>
              <h3 className="text-xl mt-6 mb-2 font-semibold">
                Quality Objectives
              </h3>
              <ul className="list-disc list-inside leading-relaxed space-y-1">
                {objectives.map((row, i) => (
                  <li key={i}>
                    <RichTextRenderer html={row.item} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Card({ title, bgColor, iconUrl, textHtml }) {
  return (
    <div
      className="p-5 sm:p-8 md:p-12 shadow-md min-h-[370px] text-white"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="pt-5 sm:pt-12">
          <h2 className="text-2xl uppercase mt-5 md:mt-10 sm:text-3xl md:text-4xl text-white mb-2 font-oswald-medium font-[500] tracking-tight leading-tight">
            <span className="block border-t-4 border-[#F04E30] w-20 sm:w-24 mb-2 mr-4"></span>
            {title}
          </h2>
        </div>
        {iconUrl && (
          <img
            src={iconUrl}
            alt={title}
            className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-contain"
          />
        )}
      </div>
      {textHtml && (
        <div className="leading-relaxed">
          <RichTextRenderer html={textHtml} />
        </div>
      )}
    </div>
  );
}

/* ============================================================
 *  SCHEMES TABLE
 * ============================================================ */
function SchemesTableView({ tab }) {
  const heading = flattenNumericKeys(tab?.schemes)?.heading;
  const rows = Array.isArray(tab?.schemes_rows) ? tab.schemes_rows : [];

  return (
    <section>
      {heading && (
        <h2 className="text-2xl uppercase mt-5 md:mt-10 sm:text-3xl md:text-4xl text-[#707070] mb-2 font-oswald-medium font-[500] tracking-tight leading-tight">
          <span className="block border-t-4 border-[#F04E30] w-20 sm:w-24 mb-2 mr-4"></span>
          {heading}
        </h2>
      )}

      <div className="rounded-lg overflow-x-auto">
        <table className="min-w-full text-left text-gray-700 text-base border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-[#facc15] text-black">
              <th className="px-4 py-3 border border-gray-200 rounded-tl-lg">Sr. No.</th>
              <th className="px-4 py-3 border border-gray-200">Name of Scheme</th>
              <th className="px-4 py-3 border border-gray-200 rounded-tr-lg">Beneficiary</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 border border-gray-200">{i + 1}</td>
                <td className="px-4 py-3 border border-gray-200">{row.scheme}</td>
                <td className="px-4 py-3 border border-gray-200">
                  {row.beneficiary && <RichTextRenderer html={row.beneficiary} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ============================================================
 *  DOCUMENT (PDF or image)
 * ============================================================ */
function DocumentView({ tab }) {
  const doc = flattenNumericKeys(tab?.document) || {};
  const heading = doc.heading;
  const filePath = doc.file;
  const url = filePath ? resolveImage(filePath) : null;
  const isPdf = typeof filePath === "string" && /\.pdf$/i.test(filePath);

  if (!url) {
    return (
      <section className="py-10 text-center text-gray-500">
        {heading && (
          <h2 className="text-2xl uppercase mt-5 sm:text-3xl md:text-4xl text-[#707070] mb-4 font-oswald-medium font-[500] tracking-tight leading-tight">
            <span className="block border-t-4 border-[#F04E30] w-20 sm:w-24 mb-2 mr-4 mx-auto"></span>
            {heading}
          </h2>
        )}
        Document not uploaded yet.
      </section>
    );
  }

  return (
    <section>
      {heading && (
        <h2 className="text-2xl uppercase mt-5 md:mt-10 sm:text-3xl md:text-4xl text-[#707070] mb-4 font-oswald-medium font-[500] tracking-tight leading-tight">
          <span className="block border-t-4 border-[#F04E30] w-20 sm:w-24 mb-2 mr-4"></span>
          {heading}
        </h2>
      )}

      <div className="w-full h-[80vh] border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        {isPdf ? (
          <object data={url} type="application/pdf" className="w-full h-full">
            <iframe src={url} title={heading || "Document"} className="w-full h-full" />
          </object>
        ) : (
          <img
            src={url}
            alt={heading || "Document"}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      <div className="mt-3 text-sm">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F04E30] hover:underline"
        >
          Open in new tab
        </a>
      </div>
    </section>
  );
}

/* ============================================================
 *  GALLERY
 * ============================================================ */
function GalleryView({ tab }) {
  const heading = flattenNumericKeys(tab?.gallery)?.heading;
  const images = Array.isArray(tab?.gallery_images) ? tab.gallery_images : [];

  return (
    <section>
      {heading && (
        <h2 className="text-2xl uppercase mt-5 md:mt-10 sm:text-3xl md:text-4xl text-[#707070] mb-4 font-oswald-medium font-[500] tracking-tight leading-tight">
          <span className="block border-t-4 border-[#F04E30] w-20 sm:w-24 mb-2 mr-4"></span>
          {heading}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={resolveImage(img.image)}
            alt={img.alt || `Gallery ${i + 1}`}
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    </section>
  );
}
