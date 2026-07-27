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

  // Heading color is managed dynamically: the CMS `text_color` wins;
  // otherwise pick white or gray from the card background's brightness so the
  // title stays readable on any bg (navy → white, cream/yellow → dark).
  const isLightColor = (hex) => {
    if (typeof hex !== "string") return false;
    const m = hex.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!m) return false;
    let h = m[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
  };

  const titleColor = (item, fallback) =>
    item?.text_color ||
    item?.title_color ||
    (item?.bg_color
      ? isLightColor(item.bg_color)
        ? "#374151"
        : "#ffffff"
      : fallback);

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
            <h2
              className="section-title-vm"
              style={{ color: titleColor(visionData, "#ffffff") }}
            >
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
            <h2
              className="section-title-vm mission-title"
              style={{ color: titleColor(missionData, "#374151") }}
            >
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