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
             
              


               <div className="fu-card-row">
                <div
                  className="fu-card-num"
                  style={{ backgroundColor: unit.color }}
                >
                    {unit.number}
              </div>

                <h3
                  className="fu-card-title"
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