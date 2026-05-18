import React from "react";
import { CheckCircle } from "lucide-react";

const ProgramSectionsList = ({ header, sections = [] }) => {
  if (!sections.length && !header?.heading) return null;

  return (
    <div className="dcet-section-grey">
      <div className="dcet-container">
        {header?.heading ? (
          <h2 className="dcet-section-title-mb12">
            {header.heading}
          </h2>
        ) : null}

        {sections.length ? (
          <div className="dcet-grid-3">
            {sections.map((program, index) => (
              <div
                key={`${program.title}-${index}`}
                className="dcet-prog-card"
              >
                <div className="dcet-prog-header">
                  <div className="dcet-prog-row">
                    <h3 className="dcet-prog-title">
                      {program.title}
                    </h3>
                  </div>
                </div>
                <div className="dcet-prog-body">
                  <div className="dcet-prog-list">
                    {program.subjects.map((subject, idx) => (
                      <div
                        key={`${subject.name}-${idx}`}
                        className="dcet-prog-item"
                      >
                        <CheckCircle className="dcet-prog-check" />
                        <span>{subject.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProgramSectionsList;
