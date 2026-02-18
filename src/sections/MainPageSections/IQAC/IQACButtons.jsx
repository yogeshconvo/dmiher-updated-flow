import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";


export default function IQACSection({data}) {
  const { title, buttons, annual_reports } = data;

  const renderButton = (btn, idx) => {
    if (!btn.link || btn.link === "#") {
      return (
        <button key={idx} className="iqac-btn disabled" disabled>
          {btn.label}
        </button>
      );
    }

    if (btn.type === "route") {
      return (
        <Link key={idx} to={btn.link} className="iqac-btn">
          {btn.label}
        </Link>
      );
    }

    return (
      <a
        key={idx}
        href={btn.link}
        target="_blank"
        rel="noopener noreferrer"
        className="iqac-btn"
      >
        {btn.label}
      </a>
    );
  };

  const renderReport = (report, idx) => {
    if (report.type === "route") {
      return (
        <Link key={idx} to={report.link} className="iqac-report-btn">
          <FileText className="iqac-icon" />
          {report.label}
        </Link>
      );
    }

    return (
      <a
        key={idx}
        href={report.link}
        target="_blank"
        rel="noopener noreferrer"
        className="iqac-report-btn"
      >
        <FileText className="iqac-icon" />
        {report.label}
      </a>
    );
  };

  return (
    <section id="iqac_section" className="iqac-section">
      <div className="iqac-container">
        
        {/* Title */}
        <div className="iqac-heading">
          <hr className="iqac-line" />
          <h2 className="iqac-title">{title}</h2>
        </div>

        {/* Buttons */}
        <div className="iqac-buttons">
          {buttons.map(renderButton)}
        </div>

        {/* Annual Reports */}
        <div className="iqac-annual">
          <h3 className="iqac-annual-title">
            {annual_reports.title}
          </h3>
          <hr />
          <div className="iqac-reports">
            {annual_reports.reports.map(renderReport)}
          </div>
        </div>

      </div>
    </section>
  );
}
