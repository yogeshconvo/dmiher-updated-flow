import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/components/gallery.css";

export function GalleryWithPopup({ data }) {
  if (!data) return null;

  const images = Array.isArray(data.gallery)
    ? data.gallery
    : [];

  const [popupIndex, setPopupIndex] = useState(null);
  const [chunkSize, setChunkSize] = useState(9);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  /* ============== RESPONSIVE GRID ============== */
  useEffect(() => {
    const updateChunkSize = () => {
      if (window.innerWidth < 1024) setChunkSize(6);
      else setChunkSize(9);
    };
    updateChunkSize();
    window.addEventListener("resize", updateChunkSize);
    return () =>
      window.removeEventListener("resize", updateChunkSize);
  }, []);

  /* ============== SLIDES ============== */
  const slides = [];
  for (let i = 0; i < images.length; i += chunkSize) {
    slides.push({
      startIndex: i,
      items: images.slice(i, i + chunkSize),
    });
  }

  const getImageSrc = (img) => {
    if (!img) return null;
    if (Array.isArray(img)) return img[0] || null;
    if (typeof img === "string") return img;
    return null;
  };

  if (!images.length) return null;

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="gallery-heading-line"></div>
        <h2 className="gallery-heading">
         {data.header.heading}
        </h2>

        {/* NAV */}
        <div className="gallery-nav">
          <button ref={prevRef} className="gallery-nav-btn">
            <ArrowLeft />
          </button>
          <button ref={nextRef} className="gallery-nav-btn">
            <ArrowRight />
          </button>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl =
              prevRef.current;
            swiper.params.navigation.nextEl =
              nextRef.current;
          }}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="gallery-grid">
                {slide.items.map((img, idx) => {
                  const imageSrc = getImageSrc(img.image);
                  const globalIndex =
                    slide.startIndex + idx;

                  return (
                    <div
                      key={globalIndex}
                      className="gallery-card"
                      onClick={() =>
                        setPopupIndex(globalIndex)
                      }
                    >
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={img.caption || "gallery"}
                          className="gallery-image"
                        />
                      ) : (
                        <div className="gallery-image-fallback" />
                      )}

                      {img.caption && (
                        <p className="gallery-image-title">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {popupIndex !== null && (
          <ImagePopup
            images={images}
            index={popupIndex}
            onClose={() => setPopupIndex(null)}
          />
        )}
      </div>
    </section>
  );
}

/* ================= POPUP ================= */
export function ImagePopup({ images, index, onClose }) {
  const getImageSrc = (img) => {
    if (!img) return null;
    if (Array.isArray(img)) return img[0] || null;
    if (typeof img === "string") return img;
    return null;
  };

  const imageSrc = getImageSrc(images[index]?.image);

  return (
    <div className="gallery-popup" onClick={onClose}>
      <div
        className="gallery-popup-inner"
        onClick={(e) => e.stopPropagation()}
      >
        {imageSrc ? (
          <img src={imageSrc} alt="" />
        ) : (
          <div className="gallery-popup-fallback" />
        )}

        <button
          className="gallery-popup-close"
          onClick={onClose}
        >
          <X size={30} />
        </button>
      </div>
    </div>
  );
}
