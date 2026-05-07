import React from "react";
import { renderIcon } from "../../../utils/renderIcon";
import "./StepsPage.css";

export default function StepsPage({ data }) {
  const { heading, steps = [], background_image, note } = data?.header || {};

  return (
    <section
      id="admission_steps"
      className="steps-section"
      style={{ backgroundImage: `url(${background_image})` }}
    >
      <div className="steps-container">

        {/* Title */}
        <div className="steps-heading">
          <hr className="steps-line" />
          <h2 className="steps-title">{heading}</h2>
        </div>

        {/* Steps */}
        <div className="steps-wrapper">
          {steps.map((step, index) => {
            const lineAfter = index < steps.length - 1;

            return (
              <div key={index} className="step-card">

                <div className="step-top">
                  <p className="step-number">{step.step || " "}</p>

                  <span className="step-icon">
                    {renderIcon(step.icon, 26)}
                  </span>

                  {lineAfter && <div className="step-line-horizontal" />}
                </div>

                {step.points && (
                  <div
                    className="step-points"
                    dangerouslySetInnerHTML={{ __html: step.points }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        {note && <p className="steps-bottom-note">{note}</p>}

      </div>
    </section>
  );
}
