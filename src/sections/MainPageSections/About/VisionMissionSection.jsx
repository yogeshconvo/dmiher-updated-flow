import React from "react";

function VisionMissionSection({ data }) {
  const {
    vision,
    vision_points = [],
    mission,
    mission_points = [],
  } = data || {};

  return (
    <div className="w-full px-0 sm:px-8 md:px-15 lg:px-35 sm:py-10">
      <div className="max-w-5xl mx-auto px-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-white">

        {/* Vision */}
        <div className="bg-[#0b2d62] p-5 sm:p-8 md:p-10 shadow-md min-h-[360px]">
          <div className="pt-5 sm:pt-12 mb-4">
            <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide font-oswald-medium">
              {vision?.title}
            </h2>
          </div>

          <p className="text-lg leading-relaxed">
            {vision_points?.[0]?.value}
          </p>
        </div>

        {/* Mission */}
        <div className="bg-[#e5cf60] p-6 sm:p-8 text-[#58595B] shadow-md min-h-[360px]">
          <div className="pt-5 sm:pt-16 mb-4">
            <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide font-oswald-medium text-gray-700">
              {mission?.title}
            </h2>
          </div>

          <div
            className="space-y-3 text-xs sm:text-sm leading-snug"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {mission_points?.map((item, index) => (
              <p key={index}>“{item.value}”</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default VisionMissionSection;
