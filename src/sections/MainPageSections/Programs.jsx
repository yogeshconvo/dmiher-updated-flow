import React from "react";
import { Link } from "react-router-dom";
import icon from "../../../public/programicon.png";

function Programs({ data }) {

  if (!data) return null;

  const heading = data?.header?.heading;
  const bgColor = data?.header?.color || "#122E5E";
  const heading_color = data?.header?.heading_color || "#122E5E";


  // function to generate slug if API missing it
  const createSlug = (text) =>
    text?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="py-15" style={{ backgroundColor: bgColor }}>
      <div className="container">

        {/* Heading */}
        <div className="text-white mb-8">
          <h2 className="heading" style={{ color: heading_color }}> <hr className="heading-line" />
            {heading}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {data?.programs?.map((program, index) => {

            const slug = program.page_slug || createSlug(program.title);

            return (
              <Link
                key={index}
                to={`/programs/${slug}`}
                className="program-card"
                style={{ background: program.color }}
              >
                <img
                  src={program.image}
                  alt={program.title}
                  className="program-image"
                />

                <div className="program-content">
                  <h6 className="program-title">
                    {program.title}
                  </h6>

                  <div className="program-icon-wrapper">
                    <img
                      src={icon}
                      alt="icon"
                      className="program-icon"
                    />
                  </div>
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default Programs;