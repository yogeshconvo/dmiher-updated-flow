import React from "react";
import ViewMoreButton from "../../../components/UI/ViewMore";
// import "../../tailwind.css";

export default function ClinicalResearch({ data }) {

  if (!data) return null;

  return (
    <div className="infograph-section">
      <div className="infograph-container">

        {/* Image */}
        <div className="infograph-image">
          <img
            src={data.basic.image}
            alt={data.basic.image_alt || "Research Ecosystem"}
          />
        </div>

        {/* Content */}
        <div className="infograph-content">

          <h2 className="heading">
            <hr className="heading-line" />
            {data.basic.title}
          </h2>

          <h3 className="infograph-subtitle">
            {data.basic.subtitle}
          </h3>

          <ViewMoreButton
            href={data.basic.button_link}
            label={data.basic.button_label}
          />

        </div>
      </div>
    </div>
  );
}