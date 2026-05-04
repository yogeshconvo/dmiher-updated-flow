import React from "react";
import { Link } from "react-router";
import SafeImage from "../../../components/SafeImage";

const ProgramsComponent = ({ data }) => {

  if (!data) return null;

  const heading = data?.header?.heading || "Programs";
  const programs = data?.programs || [];
  const bgColor = data?.header?.color || "#ffffff";
  const heading_color = data?.header?.heading_color || "#000000ff";

  return (
    <section
      className="programs-section"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container">

        {/* Heading */}
        <div className="programs-heading-wrapper">
          <div className="heading-line" />
          <h2 className="heading" style={{ color: heading_color }}>{heading}</h2>
        </div>

        {/* Grid */}
        <div className="programs-grid">
          {programs.map((program, index) => (
            <div
              key={index}
              className="program-card"
              style={{ background: program.color }}
            >
              <SafeImage
                src={program.image}
                alt={program.title}
                className="program-image"
              />

              <div className="program-content">
                <h6 className="program-title">{program.title}</h6>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProgramsComponent;