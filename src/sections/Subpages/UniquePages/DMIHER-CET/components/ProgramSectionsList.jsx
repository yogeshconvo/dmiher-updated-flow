import React from "react";
import { CheckCircle } from "lucide-react";

const ProgramSectionsList = ({ header, sections = [] }) => {
  if (!sections.length && !header?.heading) return null;

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {header?.heading ? (
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {header.heading}
          </h2>
        ) : null}

        {sections.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((program, index) => (
              <div
                key={`${program.title}-${index}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-[#F04E30]">
                      {program.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    {program.subjects.map((subject, idx) => (
                      <div
                        key={`${subject.name}-${idx}`}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
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
