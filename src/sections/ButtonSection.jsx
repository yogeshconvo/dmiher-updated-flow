import React from "react";
import { Link } from "react-router";
// import "../styles/InstituteSections/Buttons.css";

const ButtonSection = ({ data }) => {
  const { buttons = [], center_button } = data || {};

  return (
    <div className="button-section">
      {/* GRID BUTTONS */}
      <div className="button-grid">
        {buttons.map((btn, index) => (
          <Link
            key={index}
            to={btn.to}
            className="button-item"
          >
            {btn.label}
          </Link>
        ))}
      </div>

      {/* CENTER BUTTON */}
      {center_button && (
        <div className="button-center-wrapper">
          <Link
            to={center_button.to}
            className="button-center"
          >
            {center_button.label}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ButtonSection;
