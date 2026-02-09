import React from "react";
import "../../../styles/mainpagesections.css";
function VisionMissionSection({ data }) {
  const {
    vision,
    vision_points = [],
    mission,
    mission_points = [],
  } = data || {};

  return (
    <div className="container">
      <div className="vm-wrapper">

        {/* Vision */}
        <div className="vm-card vm-vision">
          <div className="vm-header">
            <hr className="vm-divider" />
            <h2 className="vm-title">
              {vision?.title}
            </h2>
          </div>

          <p className="vm-text">
            {vision_points?.[0]?.value}
          </p>
        </div>

        {/* Mission */}
        <div className="vm-card vm-mission">
          <div className="vm-header vm-header-mission">
            <hr className="vm-divider" />
            <h2 className="vm-title vm-title-mission">
              {mission?.title}
            </h2>
          </div>

          <div className="vm-mission-points">
            {mission_points?.map((item, index) => (
              <p key={index}>“{item.value}”</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default VisionMissionSection;
