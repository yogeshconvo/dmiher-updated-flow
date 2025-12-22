import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
// import "../styles/InstituteSections/testimonial.css";

const Testimonial  = ({ data }) => {
  const { heading, tabs = [], testimonials = {} } = data || {};
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="testimonial-section">
      <div className="container">
        <h2 className="testimonial-heading">
          <hr className="testimonial-heading-line" />
          {heading}
        </h2>

        {/* TABS */}
        <div className="testimonial-tabs">
          {tabs.map((label, index) => (
            <button
              key={label}
              className={`testimonial-tab ${
                activeTab === label ? "testimonial-tab-active" : ""
              } ${index < tabs.length - 1 ? "testimonial-tab-divider" : ""}`}
              onClick={() => setActiveTab(label)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* SWIPER */}
        <div className="testimonial-swiper-wrapper">
          <Swiper
            slidesPerView={"auto"}
            centeredSlides
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
          >
            {testimonials[activeTab]?.length ? (
              testimonials[activeTab].map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="testimonial-slide">
                    <div className="testimonial-avatar">
                      <img src={t.img} alt={t.name} />
                    </div>

                    <div className="testimonial-content">
                      <p className="testimonial-text">{t.text}</p>
                      <p className="testimonial-name">{t.name}</p>
                      <pre className="testimonial-year">{t.year}</pre>
                      {t.extra && (
                        <div className="testimonial-extra">{t.extra}</div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="testimonial-empty">
                  No testimonials available for this category yet.
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonial ;
