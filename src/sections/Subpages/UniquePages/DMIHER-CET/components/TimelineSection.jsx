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
      <div className="bg-[#F04E30] text-white p-4 rounded-full inline-block mb-4 group-hover:bg-[#122E5E] transition-colors duration-300">
        <Calendar className="w-5 h-5" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{phase.phase}</h3>
      <p className="text-gray-600 mb-3">{phase.month}</p>
      {path ? (
        <div className="flex items-center justify-center text-[#F04E30] group-hover:text-[#122E5E] transition-colors duration-300">
          <span className="text-sm font-medium mr-1">Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      ) : null}
    </>
  );

  const baseClass =
    "bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl group";

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
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {header?.heading ? (
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {header.heading}
          </h2>
        ) : null}

        {phases.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((phase, idx) => (
              <PhaseCard
                key={`${phase.phase}-${idx}`}
                phase={phase}
                collegeSlug={collegeSlug}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">
            Timeline details will be announced soon.
          </p>
        )}
      </div>
    </div>
  );
};

export default TimelineSection;
