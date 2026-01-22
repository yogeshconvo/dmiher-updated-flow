import React from "react";
import {
  FileText,
  Stethoscope,
  ActivitySquare,
  User,
  Pill,
  Zap,
} from "lucide-react";


const iconMap = {
  FileText,
  Stethoscope,
  ActivitySquare,
  User,
  Pill,
  Zap,
};

function AdmissionInfoPage({data}) {
  return (
    <section className="admission-page">
      {/* ===== HEADER ===== */}
      <div className="admission-header">
        <h2 className="admission-title">{data.heading}</h2>
        <p className="admission-subtitle">{data.subheading}</p>
      </div>

      {/* ===== GRID ===== */}
      <div className="admission-grid">
        {data.items.map((item, index) => {
          const Icon = iconMap[item.icon] || FileText;

          return (
            <div key={index} className="admission-card">
              <div className="admission-icon">
                <Icon />
              </div>

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
    </section>
  );
}

export default AdmissionInfoPage;
