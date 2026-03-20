import { useState } from "react";
import RichTextRenderer from "../../components/RichTextRenderer";
import ViewMoreButton from "../../components/UI/ViewMore";

function InfoSection({ data }) {
  if (!data || !Array.isArray(data.slider) || data.slider.length === 0) {
    return null;
  }

  const [showMore, setShowMore] = useState(false);

  const item = data.slider[0];

  const {
    title,
    subtitle,
    tegline,
    desc,
    viredesc, 
  } = item || {};

  return (
    <div className="info-wrapper">

      {/* TITLE */}
      {title && (
        <h2 className="info-title">
          <hr className="info-title-line" />

          <span className="info-title-text">
            {title}

            {subtitle && (
              <p className="info-subtitle">{subtitle}</p>
            )}
          </span>

          <hr className="info-title-line" />
        </h2>
      )}

      {/* CONTENT */}
      <section className="info-section">

        {/* Tagline */}
        {tegline && (
          <h1 className="info-tagline">{tegline}</h1>
        )}

        {/* Main Description */}
        {desc && (
          <div className="info-description">
            <RichTextRenderer html={desc} />
          </div>
        )}

        {/* ===== VIEW MORE LOGIC (ONLY IF DATA EXISTS) ===== */}
        {!showMore && viredesc && (
          <ViewMoreButton
      label="View More"
            onClick={() => setShowMore(true)}
          >
            View More
          </ViewMoreButton>
        )}

        {showMore && viredesc && (
          <div className="info-description">
            <RichTextRenderer html={viredesc} />
          </div>
        )}

        {showMore && viredesc && (
          <ViewMoreButton
      label="View Less"
            onClick={() => setShowMore(false)}
          >
            View Less
          </ViewMoreButton>
        )}

      </section>
    </div>
  );
}

export default InfoSection;