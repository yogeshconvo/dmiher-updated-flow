import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// import "../../styles/research-highlights-main.css";
// import "../../styles/research-highlights-responsive.css";

const CustomDots = ({ activeIndex, total, onDotClick }) => (
  <div className="research-dots">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className="research-dot" onClick={() => onDotClick(i)}>
        <div
          className={`research-dot-inner ${
            i === activeIndex ? "research-dot-active" : ""
          }`}
        />
      </div>
    ))}
  </div>
);

const ResearchHighlights = ({ data }) => {
  if (!data) return null;

  const { basic = {}, desktop_columns = [] } = data;
  const { heading } = basic;

  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);
  // {
  //           "page_section_id": 102,
  //           "section_id": "research_highlights",
  //           "data": {
  //               "basic": {
  //                   "heading": "Reseach Heading"
  //               },
  //               "desktop_columns": [
  //                   {
  //                       "icon": "https://demos.convomax.com/dmiher_backend/storage/research_highlights/desktop_columns/2026/02/researchicon1.png",
  //                       "items": [
  //                           {
  //                               "label": "17,500+",
  //                               "text": " publications in top-tier journals (indexed in Scopus, WoS, PubMed) like The Lancet, NEJM, BMJ, Nature, Frontiers, JAMA, etc."
  //                           },
  //                           {
  //                               "label": "50,000+ ",
  //                               "text": "citations"
  //                           },
  //                           {
  //                               "label": "500+",
  //                               "text": "High Impact publications"
  //                           }
  //                       ]
  //                   },
  //                   {
  //                       "icon": "https://demos.convomax.com/dmiher_backend/storage/research_highlights/desktop_columns/2026/02/researchicon2.png",
  //                       "items": [
  //                           {
  //                               "label": "130+ ",
  //                               "text": "patents granted"
  //                           },
  //                           {
  //                               "label": "180+",
  //                               "text": "patents published"
  //                           },
  //                           {
  //                               "label": "185+ ",
  //                               "text": " ICMR Short-Term Studentships (among the highest in India)"
  //                           }
  //                       ]
  //                   },
  //                   {
  //                       "icon": "https://demos.convomax.com/dmiher_backend/storage/research_highlights/desktop_columns/2026/02/researchicon3.png",
  //                       "items": [
  //                           {
  //                               "label": "12,500+",
  //                               "text": "lakhs INR in research grants"
  //                           },
  //                           {
  //                               "label": "100+",
  //                               "text": "Research Collaborations"
  //                           },
  //                           {
  //                               "label": "15+",
  //                               "text": "Global Consortia"
  //                           }
  //                       ]
  //                   }
  //               ]
  //           }
  //       }
  return (
    <section className="research-section ">
      {/* Heading */}
      <div className="container">
        <h2 className="heading">
          <hr className="heading-line" />
          {heading}
        </h2>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="research-grid">
        {desktop_columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className={`research-column ${
              colIdx < desktop_columns.length - 1
                ? "research-column-bordered"
                : ""
            }`}
          >
            <img
              src={col.icon}
              alt="highlight icon"
              className="research-icon"
            />

            {col.items.map((item, idx) => (
              <div key={idx}>
                <p className="research-text">
                  <span className="research-highlight">{item.label}</span>{" "}
                  {item.text}
                </p>
                {idx < col.items.length - 1 && <hr />}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="research-mobile">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          loop
          speed={500}
          onSwiper={setSwiperRef}
          onSlideChange={(s) => setActiveSlide(s.realIndex)}
        >
          {desktop_columns.map((col, index) => (
            <SwiperSlide key={index}>
              <div className="research-mobile-content">
                <img
                  src={col.icon}
                  alt="highlight icon"
                  className="research-icon"
                />

                <div className="research-mobile-text">
                  {col.items.map((item, i) => (
                    <div key={i}>
                      <p>
                        <span className="research-highlight">{item.label}</span>{" "}
                        {item.text}
                      </p>
                      {i < col.items.length - 1 && <hr />}
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <CustomDots
          activeIndex={activeSlide}
          total={desktop_columns.length}
          onDotClick={(i) => swiperRef?.slideToLoop(i)}
        />
      </div>
    </section>
  );
};

export default ResearchHighlights;
