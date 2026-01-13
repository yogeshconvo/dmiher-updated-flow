import { useState } from "react";

function InfoSection({ data }) {
  if (!data) return null;

  const basic = data.basic || {};
  const introParagraphs = Array.isArray(data.intro_paragraphs)
    ? data.intro_paragraphs
    : [];
  const moreParagraphs = Array.isArray(data.view_more_paragraphs)
    ? data.view_more_paragraphs
    : [];

  const { title, tagline, highlight_color } = basic;

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="info-section">
      {/* ================= TITLE ================= */}
      {title && (
        <h2 className="info-title">
          <hr
            className="info-title-line"
            style={{ borderColor: highlight_color || "#ccc" }}
          />

          <span className="info-title-text">{title}</span>

          <hr
            className="info-title-line"
            style={{ borderColor: highlight_color || "#ccc" }}
          />
        </h2>
      )}

      {/* ================= CONTENT ================= */}
      <section className="info-content">
        {tagline && (
          <h1 className="info-tagline">
            {tagline.toUpperCase()}
          </h1>
        )}

        <div className="info-text-wrapper">
          {/* Intro paragraphs */}
          {introParagraphs.map((p, i) => (
            <p key={i} className="info-paragraph">
              {p.text}
            </p>
          ))}

          {/* View More */}
          {!showMore && moreParagraphs.length > 0 && (
            <button
              className="info-btn info-btn-more"
              onClick={() => setShowMore(true)}
            >
              View More
            </button>
          )}

          {/* Extra paragraphs */}
          {showMore &&
            moreParagraphs.map((p, i) => (
              <p key={i} className="info-paragraph">
                {p.text}
              </p>
            ))}

          {/* View Less */}
          {showMore && moreParagraphs.length > 0 && (
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
