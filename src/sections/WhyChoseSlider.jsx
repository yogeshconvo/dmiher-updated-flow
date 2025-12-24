import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
// import "../styles/feature-slider.css";

const themeMap = {
  orange: "feature-orange",
  lightBlue: "feature-lightBlue",
  navy: "feature-navy",
  white: "feature-white",
  blue: "feature-blue",
};

const WhyChoose = ({ data }) => {
  const { heading, cards = [] } = data || {};
  const sectionRef = useRef(null);
  const [startSwiper, setStartSwiper] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStartSwiper(true),
      { threshold: 0.3 }
    );

    sectionRef.current && observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="feature-section">
      <div className="container">
         <h2 className="heading">
              <hr className="heading-line" />
          {heading}
        </h2>

        <div className="feature-slider-wrapper">
          {startSwiper && (
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                el: ".feature-pagination",
              }}
              loop
              centeredSlides
              breakpoints={{
                640: { slidesPerView: 2, centeredSlides: false },
                1024: { slidesPerView: 4, centeredSlides: false },
              }}
            >
              {cards.map((card, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`feature-card ${themeMap[card.theme]}`}
                  >
                    <div>
                      <p className="feature-title">{card.title}</p>
                      {card.subtitle && (
                        <p className="feature-subtitle">
                          {card.subtitle}
                        </p>
                      )}
                    </div>

                    {card.points && (
                      <div>
                        {card.points.map((p, i) => (
                          <p key={i} className="feature-subtitle">
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="feature-pagination" />
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
