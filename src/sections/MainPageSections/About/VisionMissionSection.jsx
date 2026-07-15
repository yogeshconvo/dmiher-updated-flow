import React from "react";
import Icons from "../../../utils/lucideIcons";

function VisionMissionSection({ data }) {
  const sectionData = data?.vision || [];

  // Extract Vision & Mission
  const visionData = sectionData.find(item => item.title === "Vision");
  const missionData = sectionData.find(item => item.title === "Mission");

  // Convert icon string → Lucide component
  const getIcon = (iconName) => {
    if (!iconName) return null;

    const formattedName = iconName
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    return Icons[formattedName] || null;
  };

  const VisionIcon = getIcon(visionData?.icon);
  const MissionIcon = getIcon(missionData?.icon);

  return (
    <div className="vision-mission-wrapper">
      <div className="vision-mission-grid">

        {/* ================= VISION ================= */}
        <div
          className="vm-card vision-card"
          style={{ backgroundColor: visionData?.bg_color || "#fff" }}
        >
          {/* ICON (Top Right) */}
          {VisionIcon && (
            <VisionIcon
              className="vm-icon"
              color={visionData?.icon_color || "#000"}
            />
          )}

          <div className="section-header">
            <hr className="section-line" />
            <h2 className="section-title-vm">
              {visionData?.title}
            </h2>
          </div>

          <div
            className="vision-text"
            dangerouslySetInnerHTML={{
              __html: visionData?.desc || ""
            }}
          />
        </div>

        {/* ================= MISSION ================= */}
        <div
          className="vm-card mission-card"
          style={{ backgroundColor: missionData?.bg_color || "#fff" }}
        >
          {/* ICON (Top Right) */}
          {MissionIcon && (
            <MissionIcon
              className="vm-icon"
              color={missionData?.icon_color || "#000"}
            />
          )}

          <div className="section-header mission-header">
            <hr className="section-line" />
            <h2 className="section-title-vm mission-title">
              {missionData?.title}
            </h2>
          </div>

          <div
            className="mission-text"
            dangerouslySetInnerHTML={{
              __html: missionData?.desc || ""
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default VisionMissionSection;