import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SafeImage from "../../components/SafeImage";
import RichTextRenderer from "../../components/RichTextRenderer";
import { resolveImage } from "../../utils/resolveImage";
import "swiper/css";
import "swiper/css/pagination";

/**
 * SEL & SC — PROGRAMS & COURSES AT SEL & SC
 * Dark-blue section with a 4-up swiper of image-headed program cards.
 *
 * Data shape (section_key: selsc_programs)
 *   {
 *     heading:    "PROGRAMS & COURSES AT SEL & SC",
 *     subtitle:   "Where Skill Meets Simulation. Learning Comes Alive.",
 *     description:"<p>...</p>",
 *     programs: [
 *       { title, description (HTML), image }
 *     ]
 *   }
 */
export default function SELSCPrograms({ data }) {
  if (!data) return null;
  const { heading, subtitle, description, programs = [] } = data;
  if (!programs.length) return null;

  return (
    <section className="selsc-programs">
      <div className="container">
        {heading && (
          <h2 className="selsc-programs-heading">
            <hr className="selsc-programs-line" />
            {heading}
          </h2>
        )}
        {subtitle && (
          <p className="selsc-programs-subtitle">{subtitle}</p>
        )}
        {description && (
          <div className="selsc-programs-desc">
            <RichTextRenderer html={description} />
          </div>
        )}

        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640:  { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1200: { slidesPerView: 4 },
          }}
          className="selsc-programs-swiper"
        >
          {programs.map((p, idx) => (
            <SwiperSlide key={idx}>
              <div className="selsc-programs-card">
                {p.image && (
                  <SafeImage
                    src={resolveImage(p.image)}
                    alt={p.title || "program"}
                    className="selsc-programs-card-img"
                  />
                )}
                <div className="selsc-programs-card-body">
                  {p.title && (
                    <h3 className="selsc-programs-card-title">{p.title}</h3>
                  )}
                  {p.description && (
                    <div className="selsc-programs-card-desc">
                      <RichTextRenderer html={p.description} />
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
