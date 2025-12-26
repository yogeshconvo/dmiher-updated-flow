import React from "react";
import ViewMoreButton from "../../components/UI/ViewMore";
import ResearchSectionMobileSlider from "../../components/MobileSlider";

function HomeResearchInnovation({ data }) {
  const {
    title,
    image,
    stats = [],
    view_more,
  } = data || {};

  return (
    <div className="bg-gray-100 py-12">
      <div className="container">
        {/* Heading */}
        <h2 className="font-oswald-medium text-[#707070] text-2xl sm:text-3xl md:text-4xl uppercase font-[500]">
          <div className="w-20 h-1 bg-[#F04E30] mb-2"></div>
          {title}
        </h2>

        {/* Main Content */}
        <div className="mt-10 flex flex-col lg:flex-row gap-7">
          {/* Left Image */}
          <div className="lg:w-2/5">
            <img
              src={image}
              alt={title}
              className="w-full h-auto max-h-96 object-cover rounded-lg shadow"
            />
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:w-3/5 grid-cols-3 gap-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center px-2 ${
                  index < stats.length - 1 ? "border-r border-gray-300" : ""
                }`}
              >
                <img src={item.icon} alt={item.alt} className="w-24 h-24 mb-2" />
                <h3 className="text-2xl font-bold text-orange-600">
                  {item.value}
                </h3>
                <p className="text-gray-700 text-xl">
                  {item.label.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="lg:hidden w-full">
            <ResearchSectionMobileSlider
              data={stats}
              autoplayDelay={3000}
              speed={500}
            />
          </div>
        </div>

        {/* View More */}
        {view_more && (
          <div className="mt-8 text-center md:text-right">
            <ViewMoreButton
              href={view_more.link}
              label={view_more.label}
              className="hover:scale-105 transition-all"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeResearchInnovation;
