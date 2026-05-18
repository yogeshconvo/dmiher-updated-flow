import React from "react";
import ViewMoreButton from "../../components/UI/ViewMore";
import ResearchSectionMobileSlider from "../../components/MobileSlider";
import SafeImage from "../../components/SafeImage";

function HomeResearchInnovation({ data }) {
  const {
    title,
    image,
    stats = [],
    view_more,
  } = data || {};

  return (
    <div className="mri-section">
      <div className="container">
        {/* Heading */}
        <h2 className="mri-heading">
          <div className="mri-heading-line"></div>
          {title}
        </h2>

        {/* Main Content */}
        <div className="mri-main">
          {/* Left Image */}
          <div className="mri-image-wrap">
            <SafeImage
              src={image}
              alt={title}
              className="mri-image"
            />
          </div>

          {/* Desktop Grid */}
          <div className="mri-grid">
            {stats.map((item, index) => (
              <div
                key={index}
                className={`mri-stat ${
                  index < stats.length - 1 ? "mri-stat-divider" : ""
                }`}
              >
                <SafeImage src={item.icon} alt={item.alt} className="mri-stat-icon" />
                <h3 className="mri-stat-value">
                  {item.value}
                </h3>
                <p className="mri-stat-label">
                  {item.label.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="mri-mobile">
            <ResearchSectionMobileSlider
              data={stats}
              autoplayDelay={3000}
              speed={500}
            />
          </div>
        </div>

        {/* View More */}
        {view_more && (
          <div className="mri-button-wrap">
            <ViewMoreButton
              href={view_more.link}
              label={view_more.label}
              className="mri-button"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeResearchInnovation;
