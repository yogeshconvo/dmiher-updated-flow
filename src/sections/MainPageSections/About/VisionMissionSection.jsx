import React from "react";

function VisionMissionSection({ data }) {
  const {
    vision,
    vision_points = [],
    mission,
    mission_points = [],
  } = data || {};

  return (
    <div className="vision-mission-wrapper">
      <div className="vision-mission-grid">

        {/* Vision */}
        <div
          className="vision-card"
          style={{ backgroundColor: vision?.bg_color || "#fff" }}
        >
          <div className="section-header">
            <hr className="section-line" />
            <h2 className="section-title-vm">
              {vision?.title}
            </h2>
          </div>

          <div className="vision-text">
            {vision_points.map((item, index) => (
              <p key={index}>{item.value}</p>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div
          className="mission-card"
          style={{ backgroundColor: mission?.bg_color || "#fff" }}
        >
          <div className="section-header mission-header">
            <hr className="section-line" />
            <h2 className="section-title-vm mission-title">
              {mission?.title}
            </h2>
          </div>

          <div className="mission-text">
            {mission_points.map((item, index) => (
              <p key={index}>{item.value}</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default VisionMissionSection;