import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/components/gallery.css";
import RichTextRenderer from "./RichTextRenderer";

export function GalleryWithPopup({ data }) {
  if (!data) return null;

  const images = Array.isArray(data.gallery) ? data.gallery : [];
  const [popupIndex, setPopupIndex] = useState(null);

  // Use CSS-based responsive grid instead of JS resize listener
  // Desktop: 9 per slide, Tablet: 6 per slide — handled via gallery-grid CSS

  const getImageSrc = (img) => {
    if (!img) return null;
    if (Array.isArray(img)) return img[0] || null;
    if (typeof img === "string") return img;
    return null;
  };

  if (!images.length) return null;

  return (
    <section className="container">
      <h2 className="heading">
        <hr className="heading-line" />
        {data.header?.heading || "Gallery"}
      </h2>

      <div className="gallery-nav">
        <RichTextRenderer html={data.header?.intro_text} />

        <div className="button-wrapper">
          <button className="gallery-nav-btn gallery-prev">
            <ArrowLeft />
          </button>
          <button className="gallery-nav-btn gallery-next">
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation={{
          prevEl: ".gallery-prev",
          nextEl: ".gallery-next",
        }}
      >
        {/* Single slide with all images - CSS grid handles responsive layout */}
        <SwiperSlide>
          <div className="gallery-grid">
            {images.map((img, idx) => {
              const imageSrc = getImageSrc(img.image);

              return (
                <div
                  key={idx}
                  className="gallery-card"
                  onClick={() => setPopupIndex(idx)}
                >
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={img.caption || "gallery"}
                      className="gallery-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="gallery-image-fallback" />
                  )}

                  {img.caption && (
                    <p className="gallery-image-title">{img.caption}</p>
                  )}
                </div>
              );
            })}
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Popup */}
      {popupIndex !== null && (
        <ImagePopup
          images={images}
          index={popupIndex}
          onClose={() => setPopupIndex(null)}
        />
      )}
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const imageSrc = getImageSrc(images[index]?.image);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="gallery-popup"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="gallery-popup-inner"
        onClick={(e) => e.stopPropagation()}
      >
        {imageSrc ? (
          <img src={imageSrc} alt="popup" />
        ) : (
          <div className="gallery-popup-fallback" />
        )}

        <button
          className="gallery-popup-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
    </div>,
    document.body,
  );
}
