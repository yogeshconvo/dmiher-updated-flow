import { useState } from "react";
import "../styles/InstituteSections/info-section.css";

function InfoSection({ data }) {
  const {
    title,
    tagline,
    highlight_color,
    intro_paragraphs = [],
    more_paragraphs = [],
  } = data || {};

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="info-section">
      {/* TITLE */}
      <h2 className="info-title">
        <hr
          className="info-title-line"
          style={{ borderColor: "highlight_color" }}
        />

        <span className="info-title-text">
          {title}
        </span>

        <hr
          className="info-title-line"
          style={{ borderColor: highlight_color }}
        />
      </h2>

      {/* CONTENT */}
      <section className="info-content">
        <h1 className="info-tagline">
          {tagline?.toUpperCase()}
        </h1>

        <div className="info-text-wrapper">
          {intro_paragraphs.map((p, i) => (
            <p key={i} className="info-paragraph">
              {p}
            </p>
          ))}

          {!showMore && more_paragraphs.length > 0 && (
            <button
              className="info-btn info-btn-more"
              onClick={() => setShowMore(true)}
            >
              View More
            </button>
          )}

          {showMore &&
            more_paragraphs.map((p, i) => (
              <p key={i} className="info-paragraph">
                {p}
              </p>
            ))}

          {showMore && more_paragraphs.length > 0 && (
            <button
              className="info-btn info-btn-less"
              onClick={() => setShowMore(false)}
            >
              View Less
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default InfoSection;