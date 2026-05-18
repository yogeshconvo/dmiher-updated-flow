import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function IQACSection({ data }) {
  const { title, buttons, annual_reports, annual_reports_items,ciqa_items } = data || {};

  const renderButton = (btn, idx) => {
    if (btn.type === "Route") {
      return (
        <Link key={idx} to={btn.link || "#"} className="iqac-btn">
          {btn.label}
        </Link>
      );
    }

    return (
      <a
        key={idx}
        href={btn.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="iqac-btn"
      >
        {btn.label}
      </a>
    );
  };

  const renderReport = (report, idx) => {
    if (report.type === "Route") {
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
    <>
    <section id="iqac_section" className="iqac-section">
      <div className="iqac-container">

        {/* Title */}
        {title && (
          <div className="iqac-heading">
            <hr className="iqac-line" />
            <h2 className="iqac-title">{title}</h2>
          </div>
        )}

        {/* Buttons */}
        <div className="iqac-buttons">
          {buttons?.map(renderButton)}
        </div>

        {/* Annual Reports */}
        <div className="iqac-annual">
          <h3 className="iqac-annual-title">
            {annual_reports?.title}
          </h3>

          <hr />

          <div className="iqac-reports">
            {annual_reports_items?.map(renderReport)}
          </div>
        </div>

 
         <div className="ciqa-section">
        <h2 className="heading">
          <hr className="iqac-line" />{data.ciqa.title}</h2>

        {ciqa_items.map((item, idx) => (
         <Link
          to={item.link}
          rel="noopener noreferrer"
          className="ciqa-link"
        >
          <FileText /> {item.label}
          </Link>
          ))}
      </div>       </div>
   </section>
     
 </>
          
  );
}