import React, { useState } from "react";
import SafeImage from "../../../components/SafeImage";

export default function FeatureCards({ data }) {
  const basic = data?.basic || {};
  const cards = Array.isArray(data?.cards) ? data.cards : [];
  const [index, setIndex] = useState(0);

  const visibleCards = 3;

  const nextSlide = () => {
    if (index < cards.length - visibleCards) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  function Card({ card }) {
    const titleHidden = card?._disabled?.title === true;

    return (
      <div className="fcards-card group">
        <SafeImage
          src={card.image}
          alt={card.title || ""}
          className="fcards-card-img"
        />

        <div className="fcards-card-overlay">
          {!titleHidden && card.title && (
            <h3 className="fcards-card-title">{card.title}</h3>
          )}
          <p className="fcards-card-desc">{card.description}</p>
        </div>
      </div>
    );
  }

  const subtitleHidden = basic?._disabled?.subtitle === true;

  return (
    <section className="fcards-section">
      <h2 className="heading">
        <hr className="heading-line" />
        {basic.heading}
      </h2>

      {!subtitleHidden && basic.subtitle && (
        <p className="fcards-subtitle">
          {basic.subtitle}
        </p>
      )}

      <div className="fcards-track-wrap">

        {/* Slider */}
        <div
          className="fcards-track"
          style={{
            transform: `translateX(-${index * 350}px)`
          }}
        >
          {cards.map((card, i) => (
            <Card key={i} card={card} />
          ))}
        </div>

        {/* Arrows only if cards > 3 */}
        {cards.length > 3 && (
          <>
            <button
              onClick={prevSlide}
              className="fcards-arrow-prev"
            >
              ◀
            </button>

            <button
              onClick={nextSlide}
              className="fcards-arrow-next"
            >
              ▶
            </button>
          </>
        )}
      </div>
    </section>
  );
}
