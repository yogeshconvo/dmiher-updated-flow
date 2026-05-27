import React from "react";
import { Link } from "react-router";
import SafeImage from "../../../components/SafeImage";
import resolveImage from "../../../utils/resolveImage";

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
          {programs.map((program, index) => {
            const slug = program.page_slug;
            const to = slug ? (slug.startsWith("/") ? slug : `/${slug}`) : null;
            const cardInner = (
              <>
                <SafeImage
                  src={resolveImage(program.image)}
                  alt={program.title}
                  className="program-image"
                />
                <div className="program-content">
                  <h6 className="program-title">{program.title}</h6>
                </div>
              </>
            );
            return to ? (
              <Link
                key={index}
                to={to}
                className="program-card"
                style={{ background: program.color }}
              >
                {cardInner}
              </Link>
            ) : (
              <div
                key={index}
                className="program-card"
                style={{ background: program.color }}
              >
                {cardInner}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProgramsComponent;