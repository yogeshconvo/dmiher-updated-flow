import React from "react";
import { Link, useLocation } from "react-router-dom";


const ExamCellOfficials = ({data}) => {
  // Micro-page CTA: `basic` carries { label, cta_key, has_micro_page } — the
  // target lives at {current path}/{cta_key} (e.g. /coe/organogram). Legacy
  // `button_link`/`button_text` keep working when present.
  const { pathname } = useLocation();
  const base = pathname.replace(/\/+$/, "");
  const basic = data.basic || {};
  const btnLink =
    basic.button_link ||
    (basic.has_micro_page && basic.cta_key
      ? base
        ? `${base}/${basic.cta_key}`
        : `/${basic.cta_key}`
      : null);
  const btnLabel = basic.button_text || basic.label || "Organogram";

  return (
    <div className="exam-section">
      <div className="container">
        
        {/* Title */}
        <h2 className="exam-title">
          <span className="exam-title-line"></span>
          {data.basic?.title}
        </h2>

        {/* Grid */}
        <div className="exam-grid">
          {data.officials?.map((official, index) => {
            const isLastInRow = index === 3 || index === 5;
            const isStartCol2 = index === 4;

            return (
              <div
                key={index}
                className={`exam-card ${
                  !isLastInRow ? "md:border-r border-gray-300" : ""
                } ${isStartCol2 ? "md:col-start-2" : ""}`}
              >
                <p className="exam-name">{official.name}</p>
                <p className="exam-designation">
                  {official.designation}
                </p>
                <a
                  href={`mailto:${official.email}`}
                  className="exam-email"
                >
                  {official.email}
                </a>
              </div>
            );
          })}
        </div>

        {/* Button */}
        {btnLink && (
          <div className="exam-btn-wrap">
            <Link to={btnLink}>
              <button className="exam-btn">{btnLabel}</button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default ExamCellOfficials;