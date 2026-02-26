import React from "react";
import { Link } from "react-router-dom";

const AboutGrid = ({ data }) => {
  const {
    gridItems = [],
    cta = {},
    ctaButtons = [],
    bottomButtons = []
  } = data || {};

  const renderLink = (item, children) => {
    if (!item?.url) return children;

    const isExternal = item.url.startsWith("http");

    if (isExternal) {
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

    return (
      <Link key={item.url} to={item.url}>
        {children}
      </Link>
    );
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

          {/* Primary Buttons */}
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

        {/* Secondary Buttons */}
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