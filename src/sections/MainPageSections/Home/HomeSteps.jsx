import React from 'react';

function HomeSteps({ data }) {
  const {
    header = {},
    paragraphs = [],
    counters = [],
  } = data || {};

  const { heading, background_image } = header;

  const bgImage = background_image;

  return (
    <div className="home-steps-container">
      <div
        className="home-steps-inner"
        style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
      >
        {/* Heading */}
        {heading && (
          <div className="home-steps-heading">
            <h2 className="home-steps-heading-text">
              {heading}
            </h2>
          </div>
        )}

        {/* Counters */}
        {counters.length > 0 && (
          <div className="home-steps-counters">
            {counters.map((item, index) => (
              <div
                key={item.id || item.label || index}
                className="counter-item"
              >
                <div className="counter-circle">
                  <span className="counter-value">
                    {item.value}
                  </span>
                </div>

                <p className="counter-label">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Paragraphs */}
        {paragraphs.length > 0 && (
          <div className="home-steps-paragraphs">
            {paragraphs.map((item, index) => (
              <p key={index} className="home-steps-text">
                {item.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeSteps;