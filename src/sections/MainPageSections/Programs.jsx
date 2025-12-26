import React from "react";
import { Link } from "react-router";

function HomePrograms({ data }) {
  const {
    title,
    background_color,
    programs = [],
    program_icon,
  } = data || {};

  return (
    <div className="py-15" style={{ backgroundColor: background_color }}>
      <div className="container">
        {/* Heading */}
        <div className="text-white mb-8">
          <div className="w-20 h-1.5 bg-red-500 mb-2"></div>
          <h2 className="text-3xl md:text-4xl font-oswald-medium font-medium tracking-wide">
            {title}
          </h2>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[15px] gap-y-4 sm:gap-y-6">
          {programs.map((program, index) => (
            <Link
              key={index}
              to={program.path}
              className="bg-white rounded-b-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={program.image}
                alt={program.name}
                className="w-full h-36 sm:h-50 object-cover"
              />

              <div className="flex-grow flex flex-col justify-between">
                <h6
                  className="text-xl px-3 py-3 sm:p-5 text-[#0a2b5a]"
                  style={{
                    fontFamily:
                      '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}
                >
                  {program.name.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h6>

                <div className="flex justify-start px-3 pb-3 sm:p-4">
                  <img
                    src={program_icon}
                    alt="Program Icon"
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePrograms;
