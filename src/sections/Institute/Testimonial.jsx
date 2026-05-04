import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import RichTextRenderer from "../../components/RichTextRenderer";
import SafeImage from "../../components/SafeImage";

const Testimonial = ({ data }) => {
  const { tabs = [], header = {} } = data || {};

  const [activeTab, setActiveTab] = useState(tabs[0]?.tab_name);

  // Find active tab object
  const activeTabData = tabs.find(
    (tab) => tab.tab_name === activeTab
  );

  const testimonials = activeTabData?.testimonials || [];

  return (
    <div className="testimonial-section">
      <div className="container">
        
        {/* HEADER */}
        {header?.title && (
          <h2 className="heading">
            <hr className="heading-line" />
            {header.title}
          </h2>
        )}

        {/* TABS */}
        <div className="testimonial-tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.tab_name}
              className={`testimonial-tab ${
                activeTab === tab.tab_name
                  ? "testimonial-tab-active"
                  : ""
              } ${index < tabs.length - 1 ? "testimonial-tab-divider" : ""}`}
              onClick={() => setActiveTab(tab.tab_name)}
            >
              {tab.tab_name}
            </button>
          ))}
        </div>

        {/* SWIPER */}
        <div className="testimonial-swiper-wrapper">
          <Swiper
            slidesPerView={"auto"}
            centeredSlides
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
          >
            {testimonials.length > 0 ? (
              testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="testimonial-slide">
                    
                    {/* IMAGE */}
                  <div className="testimonial-avatar">
                      <SafeImage src={t.image} alt="testimonial" />
                    </div>

                    {/* CONTENT */}
                    <div className="testimonial-content">
                      <RichTextRenderer html={t.paragraph} />
                    </div>

                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="testimonial-empty">
                  No testimonials available for this category yet.
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>

      </div>
    </div>
  );
};

export default Testimonial;