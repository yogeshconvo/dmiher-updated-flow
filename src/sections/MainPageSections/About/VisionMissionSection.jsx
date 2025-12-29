import React from "react";
// import VisionImg from "../../assets/About/Vision.png";
// import MissionImg from "../../assets/About/Mission.png";

function VisionMissionSection({ data }) {
  const { vision, mission } = data || {};

  return (
    <div className="w-full px-0 sm:px-8 md:px-15 lg:px-35 sm:py-10">
      <div className="max-w-5xl mx-auto px-2 grid grid-cols-1 md:grid-cols-2 gap-4 max-md:gap-0 text-white">
        
        {/* Vision */}
        <div className="bg-[#0b2d62] p-5 sm:p-8 md:p-10 shadow-md min-h-[360px]">
          <div className="flex justify-between items-start mb-2">
            <div className="pt-5 sm:pt-12">
              <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide font-oswald-medium">
                {vision?.title}
              </h2>
            </div>
            {/* <img
              src={VisionImg}
              alt="Vision Icon"
              className="h-29 object-cover sm:block"
            /> */}
          </div>

          {/* Mobile */}
          <p className="block sm:hidden text-lg leading-relaxed">
            “{vision?.content_mobile}”
          </p>

          {/* Desktop */}
          <p className="hidden sm:block text-lg leading-relaxed">
            {vision?.content_desktop?.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>

        {/* Mission */}
        <div className="bg-[#e5cf60] p-6 sm:p-8 text-[#58595B] shadow-md min-h-[360px]">
          <div className="flex justify-between items-start mb-2">
            <div className="pt-5 sm:pt-16">
              <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide font-oswald-medium text-gray-700">
                {mission?.title}
              </h2>
            </div>
            {/* <img
              src={MissionImg}
              alt="Mission Icon"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
            /> */}
          </div>

          <div
            className="space-y-3 text-xs sm:text-sm leading-snug"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {mission?.points?.map((point, index) => (
              <p key={index}>“{point}”</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default VisionMissionSection;
