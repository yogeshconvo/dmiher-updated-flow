import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import SafeImage from "../../../components/SafeImage";

export const SectionHeader = ({
  title,
  subtitle,
  onPrev,
  onNext,
  showViewAll = true,
  viewAllLink = "#",
}) => (
  <div className="cf-section-header">
    {title && (
      <>
        <div className="cf-section-line" />
        <h2 className="cf-section-title">{title}</h2>
      </>
    )}

    <div className="cf-header-row">
      <p className="cf-subtitle">{subtitle}</p>

      <div className="cf-divider" />

      <div className="cf-actions">
        <button onClick={onPrev} className="cf-nav-btn">
          <ArrowLeft size={20} />
        </button>

        <button onClick={onNext} className="cf-nav-btn">
          <ArrowRight size={20} />
        </button>

        {showViewAll && (
          <Link to={viewAllLink} className="cf-view-all">
            VIEW ALL
          </Link>
        )}
      </div>
    </div>

    {showViewAll && (
      <div className="cf-view-all-mobile">
        <a href={viewAllLink} target="_blank" rel="noopener noreferrer">
          VIEW ALL
        </a>
      </div>
    )}
  </div>
);

function CampusFacilities({ data }) {
  const swiperRef = useRef(null);
  const [popupImages, setPopupImages] = useState([]);
  const [popupIndex, setPopupIndex] = useState(null);

  const openPopup = (items, index) => {
    setPopupImages(items.map((i) => i.image));
    setPopupIndex(index);
  };

  return (
    <section className="cf-main-section">
      <div className="cf-container">
        <h2 className="heading">
          <hr className="heading-line" />
          {data.basic?.title}
        </h2>

        {data.tabs?.map((tab, idx) => (
          <div key={idx} className="cf-tab-block">
            <SectionHeader
              subtitle={tab.tab_label}
              onPrev={() => swiperRef.current?.swiper.slidePrev()}
              onNext={() => swiperRef.current?.swiper.slideNext()}
              viewAllLink={tab.url}
            />

            <Swiper
              ref={swiperRef}
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                480: { slidesPerView: 1 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {tab.images?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="cf-card"
                    onClick={() => openPopup(tab.images, index)}
                  >
                    <SafeImage
                      src={item.image}
                      alt={item.text}
                      className="cf-card-img"
                    />
                    <p className="cf-card-text">{item.text}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}

        {/* Popup */}
        {popupIndex !== null && (
          <div
            className="cf-popup-overlay"
            onClick={() => setPopupIndex(null)}
          >
            <div
              className="cf-popup-content"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage
                src={popupImages[popupIndex]}
                className="cf-popup-img"
                alt="preview"
              />
              <button
                className="cf-popup-close"
                onClick={() => setPopupIndex(null)}
              >
                <X />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CampusFacilities;