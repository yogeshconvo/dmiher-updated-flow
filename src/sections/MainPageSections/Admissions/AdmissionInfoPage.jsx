import React from "react";
import * as Icons from "lucide-react";
import "./AdmissionInfoPage.css";
import dataFile from "./admissionInfo.json";

const AdmissionInfoPage = () => {
  const { title, description, items } = dataFile.data;

  return (
    <section id="admission_info" className="admission-section">
      <div className="admission-container">

        {/* Heading */}
        <div className="admission-heading">
          <h2 className="admission-title">{title}</h2>
          <p className="admission-description">{description}</p>
        </div>

        {/* Grid */}
        <div className="admission-grid">
          {items.map((item, index) => {
            const IconComponent = Icons[item.icon];

            return (
              <div key={index} className="admission-card">

                {/* Icon */}
                {IconComponent && (
                  <div className="admission-icon-wrapper">
                    <IconComponent className="admission-icon" />
                  </div>
                )}

                <h3 className="admission-card-title">
                  {item.title}
                </h3>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admission-btn"
                >
                  View Details
                </a>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AdmissionInfoPage;
