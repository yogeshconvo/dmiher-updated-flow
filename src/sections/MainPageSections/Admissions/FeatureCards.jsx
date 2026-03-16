import React, { useState } from "react";

export default function FeatureCards({ data }) {
  const { basic, cards } = data;
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
    return (
      <div className="relative w-[320px] h-[500px] rounded-xl overflow-hidden shadow-lg group flex-shrink-0">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 text-white p-4 h-44 flex flex-col">
          <h3 className="text-[18px] font-bold">{card.title}</h3>
          <p className="text-sm mt-1 line-clamp-4">{card.description}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10">
      <h2 className="heading"> <hr className="heading-line" />{data.basic.heading}</h2>

      <div className="relative overflow-hidden ">

        {/* Slider */}
        <div
          className="flex gap-6 justify-center transition-transform duration-500"
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
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-2"
            >
              ◀
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-2"
            >
              ▶
            </button>
          </>
        )}
      </div>
    </section>
  );
}