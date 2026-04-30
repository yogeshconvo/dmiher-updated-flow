import React from "react";
import { renderIcon } from "../../../../../utils/renderIcon";

const SyllabusSection = ({ header, topics = [] }) => {
  if (!topics.length && !header?.heading && !header?.description) return null;

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {header?.heading ? (
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            {header.heading}
          </h2>
        ) : null}

        {header?.description ? (
          <div
            className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: header.description }}
          />
        ) : null}

        {topics.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <div
                key={`${topic.subject}-${index}`}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-[#F04E30] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  {topic.icon ? (
                    <div className="bg-orange-100 text-[#F04E30] rounded-lg p-2">
                      {renderIcon(topic.icon, 24, "w-6 h-6")}
                    </div>
                  ) : null}
                  <h3 className="text-xl font-semibold text-gray-800">
                    {topic.subject}
                  </h3>
                </div>
                <div className="space-y-2">
                  {(topic.topics || []).map((subtopic, idx) => (
                    <div
                      key={`${subtopic}-${idx}`}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-[#F04E30] rounded-full"></div>
                      <span className="text-gray-600">{subtopic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SyllabusSection;
