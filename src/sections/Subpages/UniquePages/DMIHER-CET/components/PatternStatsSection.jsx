import React from "react";
import { renderIcon } from "../../../../../utils/renderIcon";

const PatternStatsSection = ({ header, stats = [] }) => {
  if (!stats.length && !header?.heading) return null;

  return (
    <div className="dcet-pattern-section">
      <div className="dcet-container">
        {(header?.heading || header?.description) && (
          <div className="dcet-pattern-header">
            {header.heading ? (
              <h2 className="dcet-pattern-h2">
                {header.heading}
              </h2>
            ) : null}
            {header.description ? (
              <div
                className="dcet-pattern-desc"
                dangerouslySetInnerHTML={{ __html: header.description }}
              />
            ) : null}
          </div>
        )}

        {stats.length ? (
          <div className="dcet-pattern-grid">
            {stats.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="dcet-pattern-card"
              >
                <div className="dcet-pattern-card-top">
                  <div className="dcet-pattern-card-blob"></div>
                  <div className="dcet-pattern-card-content">
                    <div className="dcet-pattern-card-icon-wrap">
                      {renderIcon(item.icon, 64, "w-16 h-16")}
                    </div>
                    {item.stat ? (
                      <div className="dcet-pattern-card-stat">{item.stat}</div>
                    ) : null}
                    {item.statLabel ? (
                      <div className="dcet-pattern-card-statlabel">{item.statLabel}</div>
                    ) : null}
                  </div>
                </div>
                <div className="dcet-pattern-card-bottom">
                  {item.title ? (
                    <h3 className="dcet-pattern-card-title">
                      {item.title}
                    </h3>
                  ) : null}
                  {item.description ? (
                    <p className="dcet-pattern-card-desc">{item.description}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PatternStatsSection;
