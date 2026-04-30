import { useId, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/components/gallery.css";
import RichTextRenderer from "./RichTextRenderer";
import { resolveImage } from "../utils/resolveImage";

export function GalleryWithPopup({ data }) {
  if (!data) return null;

  const images = Array.isArray(data.gallery) ? data.gallery : [];
  const [popupIndex, setPopupIndex] = useState(null);

  // Per-instance unique class names for prev/next so multiple gallery
  // sections on the same page don't share their navigation buttons.
  const instanceId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const prevCls = `gallery-prev-${instanceId}`;
  const nextCls = `gallery-next-${instanceId}`;

  const viewType = data.header?.view_type;
  const isSlider = viewType === "slider";

  const getImageSrc = (img) => {
    if (!img) return null;
    if (Array.isArray(img)) return resolveImage(img[0]);
    if (typeof img === "string") return resolveImage(img);
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

        {/* `ml-auto` keeps the arrows pinned to the right corner
            even when there's no intro_text on the left. */}
        <div className="button-wrapper ml-auto">
          <button className={`gallery-nav-btn ${prevCls}`} aria-label="Previous">
            <ArrowLeft />
          </button>
          <button className={`gallery-nav-btn ${nextCls}`} aria-label="Next">
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* ============== SLIDER MODE — 3 visible at a time ============== */}
      {isSlider ? (
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{ prevEl: `.${prevCls}`, nextEl: `.${nextCls}` }}
          breakpoints={{
            0:    { slidesPerView: 1 },
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {images.map((img, idx) => {
            const imageSrc = getImageSrc(img.image);
            return (
              <SwiperSlide key={idx}>
                <div
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        /* ============== DEFAULT GRID MODE (unchanged behaviour) ============== */
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{ prevEl: `.${prevCls}`, nextEl: `.${nextCls}` }}
        >
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
      )}

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
    if (Array.isArray(img)) return resolveImage(img[0]);
    if (typeof img === "string") return resolveImage(img);
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
