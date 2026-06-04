import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText } from "lucide-react";

export default function IQACSection({ data }) {
  const { title, buttons, annual_reports, annual_reports_items, ciqa_items } = data || {};
  const location = useLocation();

  // Derive the base path from the first URL segment (e.g. "/iqac" from "/iqac/foo")
  const [firstSegment] = location.pathname.split("/").filter(Boolean);
  const basePath = firstSegment ? `/${firstSegment}` : "";

  /* Build the click target for any item, across all shapes the API may send. */
  const resolveTarget = (item) => {
    if (!item) return null;

    // type "external" → dependent page; slug lives in cta[0].cta_key (or flat cta_key)
    if (item.type === "external") {
      const key = item.cta?.[0]?.cta_key || item.cta_key;
      if (key) return { kind: "internal", href: `${basePath}/${key}` };
    }

    // type "pdf" → open the document in a new tab
    if (item.type === "pdf" && item.pdf) {
      return { kind: "external", href: item.pdf };
    }

    // type "route" → top-level page slug
    if (item.type === "route" && item.page_slug) {
      return { kind: "internal", href: `/${item.page_slug}` };
    }

    // Fallbacks: dependent cta_key or legacy link field
    const key = item.cta?.[0]?.cta_key || item.cta_key;
    if (key) return { kind: "internal", href: `${basePath}/${key}` };
    if (item.link) return { kind: "internal", href: item.link };

    return null;
  };

  const renderLink = (item, idx, className, children) => {
    const target = resolveTarget(item);

    if (!target) {
      // Nothing to link to — render a non-navigating button so it doesn't jump to "#"
      return (
        <span key={idx} className={className}>
          {children}
        </span>
      );
    }

    if (target.kind === "external") {
      return (
        <a
          key={idx}
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    }

    return (
      <Link key={idx} to={target.href} className={className}>
        {children}
      </Link>
    );
  };

  const renderButton = (btn, idx) =>
    renderLink(btn, idx, "iqac-btn", btn.label);

  const renderReport = (report, idx) =>
    renderLink(report, idx, "iqac-report-btn", (
      <>
        <FileText className="iqac-icon" />
        {report.label}
      </>
    ));

  return (
    <>
      <section id="iqac_section" className="iqac-section">
        <div className="iqac-container">

          {/* Title */}
          {title && (
            <div className="iqac-heading">
              <hr className="iqac-line" />
              <h2 className="iqac-title">{title}</h2>
            </div>
          )}

          {/* Buttons */}
          <div className="iqac-buttons">
            {buttons?.map(renderButton)}
          </div>

          {/* Annual Reports */}
          <div className="iqac-annual">
            <h3 className="iqac-annual-title">
              {annual_reports?.title}
            </h3>

            <hr />

            <div className="iqac-reports">
              {annual_reports_items?.map(renderReport)}
            </div>
          </div>

          {/* CIQA */}
          <div className="ciqa-section">
            <h2 className="heading">
              <hr className="iqac-line" />{data?.ciqa?.title}
            </h2>

            {ciqa_items?.map((item, idx) =>
              renderLink(item, idx, "ciqa-link", (
                <>
                  <FileText /> {item.label}
                </>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
