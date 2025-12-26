import React from "react";


const colorMap = {
  orange: "text-orange-600",
  blue: "text-blue-600",
  yellow: "text-yellow-500",
  red: "text-red-500",
};

const FundedResearchProjects = ({ data }) => {
  if (!data) return null;

  const { heading, description, projects } = data;

  return (
    <section className="funded-section">
      <div className="container">
        <h2 className="heading">
          <hr className="heading-line" />
          {heading}
        </h2>

        <p className="funded-desc">{description}</p>

        {/* DESKTOP GRID */}
        <div className="funded-grid">
    

          {projects.map((p, idx) => (
            <div key={idx} className="funded-cell funded-info">
              <div className="funded-title">
                <div className="funded-padding">
              <p className={`funded-amount ${colorMap[p.color]}`}>
                {p.amount}
              </p>
                <p className="funded-label ">{p.label}</p></div>
              </div>
              <p className="font-semibold text-sm">{p.title}</p>
              {p.subtitle && (
                <p className="text-xs text-gray-500">{p.subtitle}</p>
              )}
              <img
                src={p.icon}
                alt={p.title}
                className="funded-icon"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundedResearchProjects;
