import React from "react";
import { Link } from "react-router-dom";


const AboutGrid = ({data}) => {
  const {
    grid_items,
    bottom_description,
    primary_buttons,
    secondary_buttons
  } = data;

  const renderLink = (item, children) => {
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
          {grid_items.map((item) =>
            renderLink(
              item,
              <div
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
          <p>{bottom_description}</p>

          {/* Primary Buttons */}
          <div className="about-btn-grid">
            {primary_buttons.map((btn) =>
              renderLink(
                btn,
                <span className="about-btn">
                  {btn.label}
                </span>
              )
            )}
          </div>
        </div>

        {/* Secondary Buttons */}
        <div className="about-btn-grid secondary">
          {secondary_buttons.map((btn) =>
            renderLink(
              btn,
              <span className="about-btn">
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