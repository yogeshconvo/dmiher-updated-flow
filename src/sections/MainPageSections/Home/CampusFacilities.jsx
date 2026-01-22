import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// import data from "./campusFacilities.json";
import { ImagePopup } from "../../../components/GalleryWithPopup";


const SectionHeader = ({ title, subtitle, onPrev, onNext }) => (
  <div className="section-header">
        {title && <h2 className="heading">
            <hr className="heading-line" />
            {title}
        </h2>}
    <div className="section-subheader">
      <p className="section-subtitle">{subtitle}</p>
      <div className="section-divider" />
      <div className="section-nav">
        <button onClick={onPrev} className="nav-btn">
          <ArrowLeft />
        </button>
        <button onClick={onNext} className="nav-btn">
          <ArrowRight />
        </button>
      </div>
    </div>
  </div>
);

function CampusFacilities({data}) {
  const [popupImages, setPopupImages] = useState([]);
  const [popupIndex, setPopupIndex] = useState(null);

  const academicRef = useRef(null);
  const amenitiesRef = useRef(null);

  const openPopup = (items, index) => {
    setPopupImages(items.map((i) => resolveImage(i.image)));
    setPopupIndex(index);
  };

  return (
    <section className="campus-page">
      <div className="container">
        {data.sections.map((section, idx) => {
          const ref = idx === 0 ? academicRef : amenitiesRef;

          return (
            <div key={section.key} className="campus-section">
              <SectionHeader
                title={idx === 0 ? data.pageTitle : ""}
                subtitle={section.subtitle}
                onPrev={() => ref.current?.swiper.slidePrev()}
                onNext={() => ref.current?.swiper.slideNext()}
              />

              <Swiper
                ref={ref}
                modules={[Navigation]}
                slidesPerView={1}
                breakpoints={{
                  480: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {section.items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="facility-card"
                      onClick={() => openPopup(section.items, index)}
                    >
                      <img
                        src={resolveImage(item.image)}
                        alt={item.title}
                        className="facility-image"
                      />
                      <p className="facility-title">{item.title}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
        })}
      </div>

      <ImagePopup
        images={popupImages}
        index={popupIndex}
        onClose={() => setPopupIndex(null)}
        onPrev={() =>
          setPopupIndex((i) => (i > 0 ? i - 1 : popupImages.length - 1))
        }
        onNext={() =>
          setPopupIndex((i) => (i < popupImages.length - 1 ? i + 1 : 0))
        }
      />
    </section>
  );
}

export default CampusFacilities;
