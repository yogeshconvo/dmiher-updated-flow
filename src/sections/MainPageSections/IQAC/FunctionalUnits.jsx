import React from "react";
// import "./FunctionalUnits.css";
// import dataFile from "./functionalUnits.json";

export default function FunctionalUnits({data}) {
  const { heading, units, initiative_label } = data;

  return (
    <section id="functional_units" className="functional">
      <div className="functional-container">
        
        {/* Heading */}
        <div className="functional-heading">
          <div className="functional-line" />
          <h2 className="functional-title">
            {heading.title} <br />
            <span>{heading.highlight}</span>
          </h2>
          <p className="functional-description">
            {heading.description}
          </p>
        </div>

        {/* Units Grid */}
        <div className="functional-grid">
          {units.map((unit, index) => (
            <div
              key={index}
              className={`functional-card ${
                index === units.length - 1 ? "no-border" : ""
              }`}
            >
              <div className="functional-card-header">
                <div className={`functional-number ${unit.color}`}>
                  {unit.number}
                </div>
                <h3 className={`functional-card-title ${unit.color}`}>
                  {unit.title}
                </h3>
              </div>

              <ul className="functional-list">
                {unit.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              {unit.initiatives && (
                <>
                  <p className="functional-initiative-title">
                    {initiative_label}
                  </p>
                  <ul className="functional-list">
                    {unit.initiatives.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
