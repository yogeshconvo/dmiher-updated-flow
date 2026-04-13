import React from "react";
import RichTextRenderer from "../../../components/RichTextRenderer";

export default function FunctionalUnits({ data }) {
  const { heading, units } = data || {};

  return (
    <section id="functional_units" className="functional">
      <div className="functional-container">

        {/* Heading */}
        {heading && (
          <div className="functional-heading">
            <div className="functional-line"></div>

            <h2 className="functional-title">
              {heading.title} <br />
              <span>{heading.highlight}</span>
            </h2>

            <p className="functional-description">
              {heading.description}
            </p>
          </div>
        )}

        {/* Units Grid */}
        <div className="functional-grid">
          {units?.map((unit, index) => (
            <div
              key={index}
              className={`functional-card ${
                index === units.length - 1 ? "no-border" : ""
              }`}
            >
             
              


               <div className="flex items-center mb-2">
                <div className="text-white rounded-full h-12 w-12 flex items-center justify-center text-3xl font-[500] mr-2"
                style={{ backgroundColor: unit.color }}
                >
                    {unit.number}
              </div>

                <h3 className="font-oswald-medium font-[500] pb-3 text-xl"
                style={{ color: unit.color }}
                >
              {unit.title}
              </h3>
            </div>

              {/* Description HTML */}
              {unit.desc && (
                <RichTextRenderer html={unit.desc} className="functional-desc" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}