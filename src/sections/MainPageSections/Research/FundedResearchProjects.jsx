import React from "react";
import RichTextRenderer from "../../../components/RichTextRenderer";

const colorMap = {
  orange: "text-orange-600",
  blue: "text-blue-600",
  yellow: "text-yellow-500",
  red: "text-red-500",
};

const FundedResearchProjects = ({ data }) => {
  if (!data) return null;

  const basic = data.basic || {};
  const projects = data.projects || [];

  const { heading, description, thematic } = basic;

  return (
    <section className="funded-section">
      <div className="container">

        {heading && (
          <h2 className="heading">
            <hr className="heading-line" />
            {heading}
          </h2>
        )}

        {description && (
          <p className="funded-desc">{description}</p>
        )}

        {thematic && (
          <p className="funded-theme">{thematic}</p>
        )}

        {/* GRID */}
        {projects.length > 0 && (
          <div className="funded-grid">
            {projects.map((p, idx) => (
              <div key={idx} className="funded-cell funded-info">

                <div className="funded-title">
                  <div className="funded-padding">
                    {/* <p
                      className={`funded-amount ${
                        colorMap[p.color] || "text-gray-700"
                      }`}
                    >
                      {p.amount}
                    </p> */}
                    <RichTextRenderer
  className="edge-card-title font-bold"
  html={p.amount}
  textcolor={p.bg_color}
/>
                    <p className="funded-label">{p.label}</p>
                  </div>
                </div>

                <div className="funded-padding">
                  <p className="font-semibold">{p.title}</p>
                  {p.subtitle && (
                    <p className="text-xs text-gray-500">
                      {p.subtitle}
                    </p>
                  )}
                </div>

                {p.icon && (
                  <img
                    src={p.icon}
                    alt={p.title}
                    className="funded-icon"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FundedResearchProjects;