import React from "react";
import { renderIcon } from "../../../../../utils/renderIcon";

const SyllabusSection = ({ header, topics = [] }) => {
  if (!topics.length && !header?.heading && !header?.description) return null;

  return (
    <div className="dcet-section">
      <div className="dcet-container">
        {header?.heading ? (
          <h2 className="dcet-section-title">
            {header.heading}
          </h2>
        ) : null}

        {header?.description ? (
          <div
            className="dcet-section-desc"
            dangerouslySetInnerHTML={{ __html: header.description }}
          />
        ) : null}

        {topics.length ? (
          <div className="dcet-grid-3">
            {topics.map((topic, index) => (
              <div
                key={`${topic.subject}-${index}`}
                className="dcet-syllabus-card"
              >
                <div className="dcet-syllabus-row">
                  {topic.icon ? (
                    <div className="dcet-syllabus-icon-wrap">
                      {renderIcon(topic.icon, 24, "w-6 h-6")}
                    </div>
                  ) : null}
                  <h3 className="dcet-syllabus-title">
                    {topic.subject}
                  </h3>
                </div>
                <div className="dcet-syllabus-list">
                  {(topic.topics || []).map((subtopic, idx) => (
                    <div
                      key={`${subtopic}-${idx}`}
                      className="dcet-syllabus-item"
                    >
                      <div className="dcet-syllabus-bullet"></div>
                      <span className="dcet-syllabus-text">{subtopic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SyllabusSection;
