import React from "react";
import { Link, useLocation } from "react-router-dom";
import { resolveImage } from "../../../utils/resolveImage";

const AboutGrid = ({ data }) => {
  const location = useLocation();

  // New API shape nests data under `grids[0]`.
  // Legacy shape puts everything at `data.*` directly.
  const grid = Array.isArray(data?.grids) && data.grids.length > 0
    ? data.grids[0]
    : data || {};

  const gridItems = grid.grid_items || grid.gridItems || [];
  const ctaButtonList = grid.cta_buttons || grid.ctaButtons || [];
  const bottomButtons = grid.bottomButtons || [];

  // `cta` may be an array (new) — [{cta_text: "..."}] — or an object (legacy) — {ctaText: "..."}
  const ctaText = Array.isArray(grid.cta)
    ? grid.cta[0]?.cta_text || ""
    : grid.cta?.ctaText || grid.cta?.cta_text || "";

  // Derive the base path from the first URL segment (e.g. "/about" from "/about/foo")
  const [firstSegment] = location.pathname.split("/").filter(Boolean);
  const basePath = firstSegment ? `/${firstSegment}` : "";

  /* Build the click target for any item, across all shapes the API may send. */
  const resolveTarget = (item) => {
    if (!item) return null;

    // action_type: "link" → use page_slug
    if (item.action_type === "link" && item.page_slug) {
      return { kind: "internal", href: `${basePath}/${item.page_slug}` };
    }

    // action_type: "dependent" — accepts both:
    //   nested: { cta: [{ cta_key: "x" }] }
    //   flat:   { cta_key: "x" }
    if (item.action_type === "dependent") {
      const key = item.cta?.[0]?.cta_key || item.cta_key;
      if (key) return { kind: "internal", href: `${basePath}/${key}` };
    }

    // Legacy: direct page_slug on the item
    if (item.page_slug) {
      return { kind: "internal", href: `${basePath}/${item.page_slug}` };
    }

    // Legacy: url field
    if (typeof item.url === "string" && item.url.length > 0) {
      if (/^https?:\/\//i.test(item.url)) {
        return { kind: "external", href: item.url };
      }
      if (item.url.startsWith("/")) {
        return { kind: "internal", href: item.url };
      }
      return { kind: "internal", href: `${basePath}/${item.url}` };
    }

    return null;
  };

  const renderLink = (item, children) => {
    const target = resolveTarget(item);
    if (!target) return children;

    if (target.kind === "external") {
      return (
        <a
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return <Link to={target.href}>{children}</Link>;
  };

  return (
    <section id="about_grid" className="about-section">
      <div className="about-container">

        {/* Grid */}
        <div className="about-grid">
          {gridItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderLink(
                item,
                <div
                  className="about-card"
                  style={{ backgroundImage: `url(${resolveImage(item.image)})` }}
                >
                  <div className="about-overlay">
                    <span className="about-title">
                      {item.title}
                    </span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Description + primary CTAs */}
        <div className="about-description">
          {ctaText && <p>{ctaText}</p>}

          <div className="about-btn-grid">
            {ctaButtonList.map((btn, index) => (
              <React.Fragment key={index}>
                {renderLink(
                  btn,
                  <span className="about-btn">
                    {btn.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Secondary CTAs */}
        {bottomButtons.length > 0 && (
          <div className="about-btn-grid secondary">
            {bottomButtons.map((btn, index) => (
              <React.Fragment key={index}>
                {renderLink(
                  btn,
                  <span className="about-btn">
                    {btn.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default AboutGrid;
