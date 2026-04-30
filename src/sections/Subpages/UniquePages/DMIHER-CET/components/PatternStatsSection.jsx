import React from "react";
import { renderIcon } from "../../../../../utils/renderIcon";

const PatternStatsSection = ({ header, stats = [] }) => {
  if (!stats.length && !header?.heading) return null;

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {(header?.heading || header?.description) && (
          <div className="text-center mb-12">
            {header.heading ? (
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {header.heading}
              </h2>
            ) : null}
            {header.description ? (
              <div
                className="text-gray-600 max-w-2xl mx-auto"
                dangerouslySetInnerHTML={{ __html: header.description }}
              />
            ) : null}
          </div>
        )}

        {stats.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="bg-gradient-to-br bg-[#122E5E] p-6 text-white relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="relative z-10">
                    <div className="mb-4 opacity-90">
                      {renderIcon(item.icon, 64, "w-16 h-16")}
                    </div>
                    {item.stat ? (
                      <div className="text-3xl font-bold mb-1">{item.stat}</div>
                    ) : null}
                    {item.statLabel ? (
                      <div className="text-sm opacity-90">{item.statLabel}</div>
                    ) : null}
                  </div>
                </div>
                <div className="p-6">
                  {item.title ? (
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      {item.title}
                    </h3>
                  ) : null}
                  {item.description ? (
                    <p className="text-gray-600 text-sm">{item.description}</p>
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

export default PatternStatsSection;
