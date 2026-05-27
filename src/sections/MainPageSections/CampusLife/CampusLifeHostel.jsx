import React from "react";
import SafeImage from "../../../components/SafeImage";

/**
 * CampusLifeHostel — heading + description + 4 colored stat cards.
 * Each card: title (large oswald), description (with line breaks), icon (svg).
 */
const CampusLifeHostel = ({ data }) => {
  if (!data) return null;
  const cards = data.cards || [];
  return (
    <section className="clho-section container">
      <div className="clho-head">
        <h2 className="clho-heading">
          <hr className="clho-heading-line" />
          {data.title}
        </h2>
        <p className="clho-desc">{data.description}</p>
      </div>

      <div className="clho-grid">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="clho-card"
            style={{ backgroundColor: card.bg_color || "#0f2f6e" }}
          >
            <div>
              <h3
                className="clho-card-title"
                style={{ color: card.title_color || "#F7941D" }}
              >
                {card.title}
              </h3>
              <div
                className="clho-card-desc"
                style={{ color: card.desc_color || "#ffffff", whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: card.description || "" }}
              />
            </div>
            {card.icon && (
              <div className="clho-card-icon">
                <SafeImage src={card.icon} alt="" className="clho-icon-img" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CampusLifeHostel;
