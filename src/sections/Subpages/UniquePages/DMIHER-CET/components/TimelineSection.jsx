import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const buildCtaPath = (collegeSlug, ctaKey) => {
  if (!ctaKey) return null;
  if (collegeSlug) return `/${collegeSlug}/${ctaKey}`;
  return `/${ctaKey}`;
};

const PhaseCard = ({ phase, collegeSlug }) => {
  const cta = phase.primaryCta;
  const path = cta?.hasMicroPage ? buildCtaPath(collegeSlug, cta.ctaKey) : null;

  const inner = (
    <>
      <div className="dcet-phase-icon-wrap">
        <Calendar className="dcet-phase-icon" />
      </div>
      <h3 className="dcet-phase-title">{phase.phase}</h3>
      <p className="dcet-phase-month">{phase.month}</p>
      {path ? (
        <div className="dcet-phase-cta">
          <span className="dcet-phase-cta-text">Learn More</span>
          <ArrowRight className="dcet-phase-cta-icon" />
        </div>
      ) : null}
    </>
  );

  const baseClass = "dcet-phase-card group";

  if (path) {
    return (
      <Link to={path} className={baseClass}>
        {inner}
      </Link>
    );
  }

  return <div className={baseClass}>{inner}</div>;
};

const TimelineSection = ({ header, phases = [], collegeSlug }) => {
  if (!phases.length && !header?.heading) return null;

  return (
    <div className="dcet-section-plain">
      <div className="dcet-container">
        {header?.heading ? (
          <h2 className="dcet-section-title-mb12">
            {header.heading}
          </h2>
        ) : null}

        {phases.length ? (
          <div className="dcet-grid-3-col">
            {phases.map((phase, idx) => (
              <PhaseCard
                key={`${phase.phase}-${idx}`}
                phase={phase}
                collegeSlug={collegeSlug}
              />
            ))}
          </div>
        ) : (
          <p className="dcet-empty-italic">
            Timeline details will be announced soon.
          </p>
        )}
      </div>
    </div>
  );
};

export default TimelineSection;
