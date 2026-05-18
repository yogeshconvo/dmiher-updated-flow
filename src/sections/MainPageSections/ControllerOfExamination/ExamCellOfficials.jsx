import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ExamCellOfficials = ({data}) => {
  

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
        <div className="exam-btn-wrap">
          <Link to={data.basic?.button_link || "#"}>
            <button className="exam-btn">
              {data.basic?.button_text || "Organogram"}
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ExamCellOfficials;