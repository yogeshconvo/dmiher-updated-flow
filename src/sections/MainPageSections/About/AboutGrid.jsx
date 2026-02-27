import React from "react";
import { Link, useLocation } from "react-router-dom";

const AboutGrid = ({ data }) => {
  const location = useLocation(); // get current route

  const {
    gridItems = [],
    cta = {},
    ctaButtons = [],
    bottomButtons = []
  } = data || {};

  const renderLink = (item, children) => {
    // If page_slug exists → use it
    if (item?.page_slug) {
      const newPath = `${location.pathname}/${item.page_slug}`;

      return (
        <Link key={item.page_slug} to={newPath}>
          {children}
        </Link>
      );
    }

    // External URL support
    if (item?.url?.startsWith("http")) {
      return (
        <a
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return children;
  };

  return (
    <section id="about_grid" className="about-section">
      <div className="about-container">

        {/* Grid */}
        <div className="about-grid">
          {gridItems.map((item, index) =>
            renderLink(
              item,
              <div
                key={index}
                className="about-card"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="about-overlay">
                  <span className="about-title">
                    {item.title}
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        {/* Description */}
        <div className="about-description">
          <p>{cta?.ctaText}</p>

          <div className="about-btn-grid">
            {ctaButtons.map((btn, index) =>
              renderLink(
                btn,
                <span key={index} className="about-btn">
                  {btn.label}
                </span>
              )
            )}
          </div>
        </div>

        <div className="about-btn-grid secondary">
          {bottomButtons.map((btn, index) =>
            renderLink(
              btn,
              <span key={index} className="about-btn">
                {btn.label}
              </span>
            )
          )}
        </div>

      </div>
    </section>
  );
};

export default AboutGrid;