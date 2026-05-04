import React from "react";
import { Link } from "react-router-dom";
import SafeImage from "../../../components/SafeImage";

export default function StepsPage({data}) {
  const { title, steps, background_image, note } = data;

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
          <h2 className="steps-title">{title}</h2>
        </div>

        {/* Steps */}
        <div className="steps-wrapper">
          {steps.map((step, index) => {
            const lineAfter = index < steps.length - 1;

            return (
              <div key={index} className="step-card">

                <div className="step-top">
                  {step.step && (
                    <p className="step-number">{step.step}</p>
                  )}

                  <SafeImage
                    src={step.icon}
                    alt={step.title}
                    className="step-icon"
                  />

                  {lineAfter && <div className="step-line-horizontal" />}
                </div>

                <h3
                  className={`step-title ${
                    step.step === "" ? "final-step" : ""
                  }`}
                >
                  {step.title}
                </h3>

                {step.description && (
                  <p className="step-desc">
                    {step.linkText && step.href ? (
                      <>
                        {step.type === "external" ? (
                          <a
                            href={step.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="step-link"
                          >
                            {step.linkText}
                          </a>
                        ) : (
                          <Link to={step.href} className="step-link">
                            {step.linkText}
                          </Link>
                        )}
                        <span> {step.description}</span>
                      </>
                    ) : (
                      step.description
                    )}
                  </p>
                )}

                {step.note && (
                  <p className="step-note">{step.note}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <p className="steps-bottom-note">{note}</p>

      </div>
    </section>
  );
}
