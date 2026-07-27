import { useState } from "react";
import RichTextRenderer from "../../../components/RichTextRenderer";

function FDPActivities({ data }) {
  const heading = data?.header?.heading || "";
  const description = data?.header?.description || "";
  const activities = Array.isArray(data?.activities) ? data.activities : [];
  // Dynamic section background from the backend (section_style.bg_color).
  const bgColor = data?.section_style?.bg_color;

  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx((cur) => (cur === i ? null : i));

  if (!heading && !activities.length) return null;

  return (
    <section
      className="fdp-activities-section"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className="fdp-activities-container">
        {heading && (
          <h2 className="fdp-activities-title">
            <hr className="fdp-activities-underline" />
            {heading}
          </h2>
        )}

        {description && (
          <p className="fdp-activities-description">{description}</p>
        )}

        {activities.length > 0 && (
          <div className="fdp-activities-list">
            {activities.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={i} className="fdp-activity-item">
                  <button
                    type="button"
                    className="fdp-activity-toggle"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span className="fdp-activity-title">{item?.title}</span>
                    <span className="fdp-activity-icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && item?.content && (
                    <div className="fdp-activity-content">
                      <RichTextRenderer html={item.content} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default FDPActivities;
