import React from "react";
import { Calendar } from "lucide-react";

const HeroSection = ({ heading, description, bannerText }) => {
  if (!heading && !description && !bannerText) return null;

  return (
    <>
      {heading ? (
        <div>
          <h2 className="text-3xl md:text-4xl font-[500] text-[#707070] mb-5 tracking-wide uppercase font-oswald-medium">
            <hr className="w-16 sm:w-20 border-[#F04E30] mb-3 border-t-4" />
            {heading}
          </h2>
        </div>
      ) : null}

      {description ? (
        <div
          className="text-lg mb-8 opacity-90 text-[#707070] max-w-4xl leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : null}

      {bannerText ? (
        <div className="bg-white/10 text-[#707070] rounded-lg p-6 max-w-2xl mx-auto">
          <div className="text-3xl font-bold flex text-gray-800">
            <Calendar className="w-10 h-10 p-1" />
            <span> {bannerText}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HeroSection;
