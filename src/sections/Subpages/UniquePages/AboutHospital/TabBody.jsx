import React from "react";
import RichTextRenderer from "../../../../components/RichTextRenderer";
import { resolveImage } from "../../../../utils/resolveImage";
import { flattenNumericKeys } from "./utils";
import MicropageView from "./MicropageView";

export default function AboutHospitalTabBody({ tab }) {
  if (!tab) return null;
  const tabType = tab.tab_type || "rich";

  if (tabType === "vision_mission") return <VisionMissionView tab={tab} />;
  if (tabType === "schemes_table") return <SchemesTableView tab={tab} />;
  if (tabType === "document") return <DocumentView tab={tab} />;
  if (tabType === "gallery") return <GalleryView tab={tab} />;
  if (tabType === "micropage") return <MicropageView tab={tab} />;
  return <RichView tab={tab} />;
}

function RichView({ tab }) {
  const certificates = Array.isArray(tab?.rich_certificates)
    ? tab.rich_certificates
    : [];
  const body = flattenNumericKeys(tab?.rich)?.body;

  return (
    <div className="ah-rich-section">
      {certificates.length > 0 && (
        <div className="ah-cert-row">
          {certificates.map((c, i) => (
            <img
              key={i}
              src={resolveImage(c.image)}
              alt={c.alt || "Certificate"}
              className="ah-cert-img"
            />
          ))}
        </div>
      )}

      {body && <RichTextRenderer html={body} />}
    </div>
  );
}

function VisionMissionView({ tab }) {
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
    <div className="ah-vm-section">
      <div className="ah-vm-grid">
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
          className="ah-vm-quality-card"
          style={{ backgroundColor: quality.bg_color || "#122E5E" }}
        >
          <div className="ah-vm-row">
            <h2 className="ah-vm-title-white">
              <span className="ah-vm-title-line"></span>
              Quality Value Statement
            </h2>
            {quality.icon && (
              <img
                src={resolveImage(quality.icon)}
                alt="Quality"
                className="ah-vm-icon"
              />
            )}
          </div>

          {quality.text && (
            <div className="ah-vm-text">
              <RichTextRenderer html={quality.text} />
            </div>
          )}

          {orgValues.length > 0 && (
            <>
              <h3 className="ah-vm-h3">
                Organizational Values
              </h3>
              <ul className="ah-vm-list">
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
              <h3 className="ah-vm-h3">
                Quality Objectives
              </h3>
              <ul className="ah-vm-list-spaced">
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
      className="ah-card"
      style={{ backgroundColor: bgColor }}
    >
      <div className="ah-vm-row">
        <div className="ah-card-pad">
          <h2 className="ah-card-title">
            <span className="ah-vm-title-line"></span>
            {title}
          </h2>
        </div>
        {iconUrl && (
          <img
            src={iconUrl}
            alt={title}
            className="ah-card-icon"
          />
        )}
      </div>
      {textHtml && (
        <div className="ah-vm-text">
          <RichTextRenderer html={textHtml} />
        </div>
      )}
    </div>
  );
}

function SchemesTableView({ tab }) {
  const heading = flattenNumericKeys(tab?.schemes)?.heading;
  const rows = Array.isArray(tab?.schemes_rows) ? tab.schemes_rows : [];

  return (
    <section>
      {heading && (
        <h2 className="ah-grey-title">
          <span className="ah-grey-line"></span>
          {heading}
        </h2>
      )}

      <div className="ah-table-wrap">
        <table className="ah-table">
          <thead>
            <tr className="ah-table-thead-row">
              <th className="ah-table-th-tl">Sr. No.</th>
              <th className="ah-table-th">Name of Scheme</th>
              <th className="ah-table-th-tr">Beneficiary</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="ah-table-row">
                <td className="ah-table-td">{i + 1}</td>
                <td className="ah-table-td">{row.scheme}</td>
                <td className="ah-table-td">
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

function DocumentView({ tab }) {
  const doc = flattenNumericKeys(tab?.document) || {};
  const heading = doc.heading;
  const filePath = doc.file;
  const url = filePath ? resolveImage(filePath) : null;
  const isPdf = typeof filePath === "string" && /\.pdf$/i.test(filePath);

  if (!url) {
    return (
      <section className="ah-doc-empty">
        {heading && (
          <h2 className="ah-grey-title-empty">
            <span className="ah-grey-line-center"></span>
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
        <h2 className="ah-grey-title-mb">
          <span className="ah-grey-line"></span>
          {heading}
        </h2>
      )}

      <div className="ah-doc-frame">
        {isPdf ? (
          <object data={url} type="application/pdf" className="ah-doc-frame-inner">
            <iframe src={url} title={heading || "Document"} className="ah-doc-frame-inner" />
          </object>
        ) : (
          <img
            src={url}
            alt={heading || "Document"}
            className="ah-doc-frame-img"
          />
        )}
      </div>

      <div className="ah-doc-link-row">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ah-doc-link"
        >
          Open in new tab
        </a>
      </div>
    </section>
  );
}

function GalleryView({ tab }) {
  const heading = flattenNumericKeys(tab?.gallery)?.heading;
  const images = Array.isArray(tab?.gallery_images) ? tab.gallery_images : [];

  return (
    <section>
      {heading && (
        <h2 className="ah-grey-title-mb">
          <span className="ah-grey-line"></span>
          {heading}
        </h2>
      )}

      <div className="ah-gallery-grid">
        {images.map((img, i) => (
          <img
            key={i}
            src={resolveImage(img.image)}
            alt={img.alt || `Gallery ${i + 1}`}
            className="ah-gallery-img"
          />
        ))}
      </div>
    </section>
  );
}
