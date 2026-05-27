import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import RichTextRenderer from "../../components/RichTextRenderer";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

/**
 * SEL & SC — TARGETED COURSES & TRAINING
 * Auto-playing 4-up swiper of role-specific course cards.
 *
 * Data shape (section_key: selsc_training)
 *   {
 *     heading: "TARGETED COURSES & TRAINING",
 *     cards: [
 *       { title, description (HTML) },
 *       ...
 *     ]
 *   }
 */
export default function SELSCTraining({ data }) {
  if (!data) return null;
  const { heading, cards = [] } = data;
  if (!cards.length) return null;

  return (
    <section className="selsc-training">
      <div className="container">
        {heading && (
          <h2 className="selsc-training-heading">
            <hr className="selsc-training-line" />
            {heading}
          </h2>
        )}

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={4}
          loop={cards.length > 4}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          grabCursor
          breakpoints={{
            0:    { slidesPerView: 1 },
            768:  { slidesPerView: 2 },
            1200: { slidesPerView: 4 },
          }}
          className="selsc-training-swiper"
          onSwiper={(s) => {
            s.el.addEventListener("mouseenter", () => s.autoplay.stop());
            s.el.addEventListener("mouseleave", () => s.autoplay.start());
          }}
        >
          {cards.map((card, idx) => (
            <SwiperSlide key={idx}>
              <div className="selsc-training-card">
                <h4 className="selsc-training-card-title">{card.title}</h4>
                <div className="selsc-training-card-desc">
                  <RichTextRenderer html={card.description} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
