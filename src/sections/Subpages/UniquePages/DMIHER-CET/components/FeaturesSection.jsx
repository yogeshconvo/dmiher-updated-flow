import React from "react";
import { renderIcon } from "../../../../../utils/renderIcon";

/**
 * Key Features grid for the DMIHER-CET main page.
 * Reuses the Exam-Pattern card styling for visual consistency.
 *
 * props: header:{heading}, items:[{icon, title, description(html)}]
 */
const FeaturesSection = ({ header, items = [] }) => {
  if (!items.length && !header?.heading) return null;

  return (
    <div className="dcet-pattern-section">
      <div className="dcet-container">
        {header?.heading ? (
          <div className="dcet-pattern-header">
            <h2 className="dcet-pattern-h2">{header.heading}</h2>
          </div>
        ) : null}

        {items.length ? (
          <div className="dcet-pattern-grid">
            {items.map((item, index) => (
              <div key={`${item.title}-${index}`} className="dcet-pattern-card">
                <div className="dcet-pattern-card-top">
                  <div className="dcet-pattern-card-blob"></div>
                  <div className="dcet-pattern-card-content">
                    <div className="dcet-pattern-card-icon-wrap">
                      {renderIcon(item.icon, 64, "w-16 h-16")}
                    </div>
                  </div>
                </div>
                <div className="dcet-pattern-card-bottom">
                  {item.title ? (
                    <h3 className="dcet-pattern-card-title">{item.title}</h3>
                  ) : null}
                  {item.description ? (
                    <div
                      className="dcet-pattern-card-desc"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
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

export default FeaturesSection;
