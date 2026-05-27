import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { createPortal } from "react-dom";
import SafeImage from "../../components/SafeImage";
import RichTextRenderer from "../../components/RichTextRenderer";
import { resolveImage } from "../../utils/resolveImage";
import "swiper/css";
import "swiper/css/navigation";

/**
 * SEL & SC — STUDENT LIFE
 * 9-per-page (3x3) gallery with arrow pagination when there are more than
 * 9 images. Clicking an image opens it in a full-screen popup.
 *
 * Data shape (section_key: selsc_student_life)
 *   {
 *     heading:    "STUDENT LIFE",
 *     intro_html: "<p>Learning, Well-Being & Growth — All in One Place</p>",
 *     images:     [{ image, title }, ...]
 *   }
 */
export default function SELSCStudentLife({ data }) {
  if (!data) return null;
  const { heading, intro_html, images = [] } = data;
  const prev = useRef(null);
  const next = useRef(null);
  const [popup, setPopup] = useState(null);

  if (!images.length) return null;

  // 9-per-page chunking
  const PAGE = 9;
  const pages = Array.from(
    { length: Math.ceil(images.length / PAGE) },
    (_, p) => images.slice(p * PAGE, (p + 1) * PAGE),
  );
  const needsArrows = pages.length > 1;

  return (
    <section className="selsc-sl">
      <div className="container">
        {heading && (
          <h2 className="selsc-sl-heading">
            <hr className="selsc-sl-line" />
            {heading}
          </h2>
        )}

        <div className="selsc-sl-nav">
          {intro_html && (
            <div className="selsc-sl-intro">
              <RichTextRenderer html={intro_html} />
            </div>
          )}
          {needsArrows && (
            <div className="selsc-sl-btns">
              <button ref={prev} className="selsc-sl-btn" aria-label="Previous">
                <ArrowLeft />
              </button>
              <button ref={next} className="selsc-sl-btn" aria-label="Next">
                <ArrowRight />
              </button>
            </div>
          )}
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{ prevEl: prev.current, nextEl: next.current }}
          onBeforeInit={(s) => {
            s.params.navigation.prevEl = prev.current;
            s.params.navigation.nextEl = next.current;
          }}
        >
          {pages.map((page, pIdx) => (
            <SwiperSlide key={pIdx}>
              <div className="selsc-sl-grid">
                {page.map((img, lIdx) => {
                  const abs = pIdx * PAGE + lIdx;
                  return (
                    <div
                      key={abs}
                      className="selsc-sl-card"
                      onClick={() => setPopup(abs)}
                    >
                      <SafeImage
                        src={resolveImage(img.image)}
                        alt={img.title || "gallery"}
                        className="selsc-sl-img"
                        loading="lazy"
                      />
                      {img.title && (
                        <p className="selsc-sl-caption">{img.title}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {popup !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="selsc-sl-popup" onClick={() => setPopup(null)}>
            <div
              className="selsc-sl-popup-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage
                src={resolveImage(images[popup]?.image)}
                alt={images[popup]?.title || "popup"}
              />
              <button
                className="selsc-sl-popup-close"
                onClick={() => setPopup(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
