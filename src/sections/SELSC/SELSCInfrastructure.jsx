import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import SafeImage from "../../components/SafeImage";
import { resolveImage } from "../../utils/resolveImage";
import "swiper/css";
import "swiper/css/navigation";

/**
 * SEL & SC — INFRASTRUCTURE AND FACILITIES
 * 2-per-row outer swiper. Each card shows a single image (or nested
 * image carousel) at top with a caption overlay, plus title +
 * description + Know More button below. Cards are uniform height so
 * the bottom CTA always lines up regardless of description length.
 *
 * Data shape (section_key: selsc_infrastructure)
 *   {
 *     heading: "INFRASTRUCTURE AND FACILITIES",
 *     items: [
 *       { title, description, image },
 *       { title, description, images: [{src, title}, ...] }
 *     ]
 *   }
 */
export default function SELSCInfrastructure({ data }) {
  if (!data) return null;
  const { heading, items = [] } = data;
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [popup, setPopup] = useState(null);

  if (!items.length) return null;

  return (
    <section className="selsc-infra">
      <div className="container">
        <div className="selsc-infra-top">
          {heading && (
            <h2 className="selsc-infra-heading">
              <hr className="selsc-infra-line" />
              {heading}
            </h2>
          )}
          <div className="selsc-infra-nav-wrap">
            <button ref={prevRef} className="selsc-infra-nav-btn" aria-label="Previous">
              <ArrowLeft size={16} />
            </button>
            <button ref={nextRef} className="selsc-infra-nav-btn" aria-label="Next">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={2}
          loop={items.length > 2}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            0:   { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
        >
          {items.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="selsc-infra-card">
                {/* Image area (single image OR inner carousel) */}
                <div className="selsc-infra-card-media" onClick={() => setPopup(item)}>
                  {Array.isArray(item.images) && item.images.length ? (
                    <InnerImageSwiper images={item.images} />
                  ) : (
                    <>
                      {item.image && (
                        <SafeImage
                          src={resolveImage(item.image)}
                          alt={item.title}
                          className="selsc-infra-card-img"
                        />
                      )}
                      {item.title && (
                        <span className="selsc-infra-card-caption">{item.title}</span>
                      )}
                    </>
                  )}
                </div>

                {/* Body */}
                <div className="selsc-infra-card-body">
                  <h3 className="selsc-infra-card-title">{item.title}</h3>
                  {item.description && (
                    <p className="selsc-infra-card-desc">{item.description}</p>
                  )}
                  <button
                    type="button"
                    className="selsc-infra-card-cta"
                    onClick={() => setPopup(item)}
                  >
                    Know More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {popup && (
        <div className="selsc-infra-popup" onClick={() => setPopup(null)}>
          <div className="selsc-infra-popup-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="selsc-infra-popup-close"
              onClick={() => setPopup(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <h3 className="selsc-infra-popup-title">{popup.title}</h3>
            {Array.isArray(popup.images) && popup.images.length ? (
              <InnerImageSwiper images={popup.images} large />
            ) : (
              popup.image && (
                <SafeImage
                  src={resolveImage(popup.image)}
                  alt={popup.title}
                  className="selsc-infra-popup-img"
                />
              )
            )}
            {popup.description && (
              <p className="selsc-infra-popup-desc">{popup.description}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function InnerImageSwiper({ images = [], large = false }) {
  const prev = useRef(null);
  const next = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className={"selsc-infra-inner" + (large ? " selsc-infra-inner-large" : "")}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{ prevEl: prev.current, nextEl: next.current }}
        onBeforeInit={(s) => {
          s.params.navigation.prevEl = prev.current;
          s.params.navigation.nextEl = next.current;
        }}
        onSlideChange={(s) => setActiveIdx(s.realIndex)}
        className="selsc-infra-inner-swiper"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="selsc-infra-inner-slide">
              <SafeImage
                src={resolveImage(img.src || img)}
                alt={img.title || ""}
                className="selsc-infra-inner-img"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Caption overlay outside the SwiperSlide so it doesn't get re-mounted */}
      {images[activeIdx]?.title && (
        <span className="selsc-infra-card-caption">
          {images[activeIdx].title}
        </span>
      )}

      <button
        ref={prev}
        className="selsc-infra-inner-btn selsc-infra-inner-prev"
        aria-label="Previous image"
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowLeft size={14} />
      </button>
      <button
        ref={next}
        className="selsc-infra-inner-btn selsc-infra-inner-next"
        aria-label="Next image"
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
