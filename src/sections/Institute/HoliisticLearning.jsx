import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
// import "./HolisticHorizontal.css"; // make sure this file exists

/* =========================
   Arrow Button Component
========================= */

const ArrowButton = ({ direction = "next", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="hlh-arrow-btn"
      aria-label={direction === "next" ? "Next Slide" : "Previous Slide"}
    >
      {direction === "next" ? (
        <ArrowRight className="hlh-arrow-icon" />
      ) : (
        <ArrowLeft className="hlh-arrow-icon" />
      )}
    </button>
  );
};

/* =========================
   Main Component
========================= */

function HolisticInfrastructureSection({ data }) {
  const layoutType = data?.layout?.layout_type || "vertical";
  const heading = data?.header?.title || "";
  const subtitle = data?.header?.subtitle || "";

  const dimensions =
    data?.dimensions?.map((item, index) => ({
      id: index + 1,
      title: item.title,
      desc: item.desc,
      image: item.img
    })) || [];

  const swiperRef = useRef(null);

  /* ===============================
     HORIZONTAL LAYOUT
  =============================== */

  if (layoutType === "horizontal") {
    return (
      <div className="hlh-section">
        <div className="hlh-container">

          {/* Header */}
          <div className="hlh-header">
            <h1 className="hlh-title">
              <hr className="hlh-line" />
              {heading}
            </h1>
          </div>

          <div className="hlh-subheader">
            <h2 className="hlh-subtitle">{subtitle}</h2>

            {/* Navigation Arrows */}
            <div className="hidden sm:flex gap-2">
              <ArrowButton
                direction="prev"
                onClick={() => swiperRef?.current?.slidePrev()}
              />
              <ArrowButton
                direction="next"
                onClick={() => swiperRef?.current?.slideNext()}
              />
            </div>
          </div>

          {/* Swiper */}
          <div className="hlh-swiper">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
              }}
            >
              {dimensions.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="hlh-slide">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="hlh-image"
                    />

                    <div className="hlh-content">
                      <div className="hlh-number">
                        <span className="hlh-number-overlay"></span>
                        <span className="hlh-number-text">
                          {item.id}
                        </span>
                      </div>

                      <div className="hlh-text">
                        <h3 className="hlh-item-title">
                          {item.title}
                        </h3>
                        <p className="hlh-item-desc">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    );
  }

  /* ===============================
     VERTICAL DEFAULT LAYOUT
  =============================== */

  const items =
    dimensions.map((item) => ({
      id: item.id,
      label: item.title,
      description: item.desc,
      image_key: item.image
    })) || [];

  const [activeId, setActiveId] = useState(items[0]?.id ?? null);

  const activeItem =
    items.find((section) => section.id === activeId) || items[0] || {};

  return (
    <div className="holistic-section container">
      <div className="holistic-layout">

        {/* TEXT */}
        <div className="holistic-text">
          <h2 className="heading">
            <hr className="heading-line" />
            {heading}
          </h2>

          <div className="holistic-list custom-scrollbar">
            {items.map((section) => (
              <div key={section.id} className="holistic-item">
                <span
                  onClick={() => setActiveId(section.id)}
                  className={`holistic-item-label ${
                    activeId === section.id
                      ? "holistic-item-label-active"
                      : "holistic-item-label-inactive"
                  }`}
                >
                  {section.label}
                </span>

                <p className="holistic-item-content">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE */}
        <div className="holistic-image-wrapper">
          <div className="holistic-image-box">
            {activeItem.image_key ? (
              <img
                src={activeItem.image_key}
                alt={activeItem.label}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default HolisticInfrastructureSection;