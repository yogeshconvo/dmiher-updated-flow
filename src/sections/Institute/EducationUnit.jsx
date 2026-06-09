
import React from "react";
import { Link } from "react-router-dom";
import RichTextRenderer from "../../components/RichTextRenderer";
// import "../../styles/education-unit.css";

function EducationUnit({ data, college }) {
  if (!data) return null;

  // Support both legacy shape (header/paragraphs/cta) and new `slides[]` shape
  const slide = Array.isArray(data?.slides) ? data.slides[0] : null;

  const bgImage = slide?.bg_image || data?.header?.background_image || "";
  const heading = slide?.heading || data?.header?.heading || "";

  // Collect description paragraphs from either shape
  const paragraphsHtml = slide?.description
    ? [slide.description]
    : Array.isArray(data?.paragraphs)
      ? data.paragraphs.map((p) => p?.description).filter(Boolean)
      : [];

  // Normalize CTAs to array form
  const ctaRaw = slide?.cta ?? data?.cta;
  const ctaList = Array.isArray(ctaRaw)
    ? ctaRaw
    : ctaRaw
      ? [ctaRaw]
      : [];

  // content_align: position the content block left / center / right.
  const align = (slide?.content_align || data?.content_align || "left").toLowerCase();
  const blockClass =
    align === "right"
      ? "ml-auto text-right max-w-2xl"
      : align === "center"
        ? "mx-auto text-center max-w-2xl"
        : "mr-auto text-left";
  const lineClass =
    align === "right" ? "ml-auto" : align === "center" ? "mx-auto" : "";

  const buildCtaHref = (item) => {
    if (item?.link || item?.cta_url) return item.link || item.cta_url;
    if (item?.has_micro_page && item?.cta_key) {
      return college ? `/${college}/${item.cta_key}` : `/${item.cta_key}`;
    }
    if (item?.cta_key) return `/${item.cta_key}`;
    return "";
  };

  return (
    <section
      className="education-section"
      style={{ "--edu-bg": `url(${bgImage})` }}
    >
      <div className="education-overlay" />

      <div className="education-content container">
        <div className={`mb-8 ${blockClass}`}>
          {heading && (
            <h2 className="education-heading">
              <hr className={`education-heading-line ${lineClass}`} />
              {heading}
            </h2>
          )}

          {paragraphsHtml.map((html, index) => (
            <div key={index} className="education-paragraph">
              <RichTextRenderer html={html} />
            </div>
          ))}

          {ctaList.map((item, idx) => {
            const href = buildCtaHref(item);
            const label = item?.label || item?.cta_label;
            if (!href || !label) return null;
            const isExternal =
              item?.tab_type === "url" ||
              (typeof href === "string" && href.startsWith("http"));
            return isExternal ? (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="cta"
              >
                {label}
              </a>
            ) : (
              <Link key={idx} to={href} className="cta">
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default EducationUnit;
