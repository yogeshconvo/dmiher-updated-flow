import { useState } from "react";

function HomeSteps({ data }) {
  const {
    backgroundImg,
    title,
    stats = [],
    intro_paragraphs = [],
  } = data || {};

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-5">
      <div
        className="bg-white bg-no-repeat bg-center bg-contain text-center px-4 md:px-12 pt-15 py-12 mx-4 md:mx-20"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        {/* Title */}
        <h2 className="text-2xl md:text-5xl font-[500] font-oswald-medium p-6 md:p-10 text-[#707070] mb-4 leading-snug">
          {title}
        </h2>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 md:mt-10">
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col gap-1 items-center">
              <div className="bg-[#E1CD67] rounded-full w-32 h-32 md:w-35 md:h-35 flex items-center justify-center shadow-md">
                <span className="text-4xl font-[500] text-[#122E5E] font-oswald-medium">
                  {item.number}
                </span>
              </div>

              <p className="mt-2 text-2xl text-[#122E5E] font-oswald-medium text-center font-[600] max-w-[9rem]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Paragraphs */}
        <div className="mt-8 text-[#58595B] max-w-3xl mx-auto text-base">
          {intro_paragraphs.map((text, index) => (
            <p key={index} className="mb-3">
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeSteps;
