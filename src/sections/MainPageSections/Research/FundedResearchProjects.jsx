import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";
import RichTextRenderer from "../../../components/RichTextRenderer";
import SafeImage from "../../../components/SafeImage";

import "swiper/css";

const FundedResearchProjects = ({ data }) => {
  if (!data) return null;

  const basic = data.basic || {};
  const projects = data.projects || [];

  const { heading, desc } = basic;

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  const swiperSettingsMain = {
    modules: [Controller],
    slidesPerView: 2,
    spaceBetween: 0,
    controller: { control: secondSwiper },
    breakpoints: {
      480: { slidesPerView: 3 },
      640: { slidesPerView: 4 },
    },
  };

  const swiperSettingsNav = {
    modules: [Controller],
    slidesPerView: 2,
    spaceBetween: 0,
    controller: { control: firstSwiper },
    breakpoints: {
      480: { slidesPerView: 3 },
      640: { slidesPerView: 4 },
    },
  };

  return (
    <section className="funded-section">
      <div className="container">

        {heading && (
          <h2 className="heading">
            <hr className="heading-line" />
            {heading}
          </h2>
        )}

        {desc && <RichTextRenderer className="funded-desc" html={desc} />}

        {projects.length > 0 && (
          <div>
            {/* ================= MOBILE SWIPERS ================= */}
            <div className="frp-mobile-wrap">
              <Swiper
                {...swiperSettingsMain}
                onSwiper={setFirstSwiper}
                className="frp-mobile-amount-swiper"
              >
                {projects.map((project, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="frp-mobile-amount-cell"
                    style={{
                      borderRight:
                        idx === projects.length - 1 ? "none" : undefined,
                    }}
                  >
                    <p
                      className="frp-amount-text"
                      style={project.color ? { color: project.color } : undefined}
                    >
                      {project.amount}
                    </p>
                    <p className="frp-amount-label">{project.label}</p>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                {...swiperSettingsNav}
                onSwiper={setSecondSwiper}
                className="frp-mobile-desc-swiper"
              >
                {projects.map((project, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="frp-mobile-desc-cell"
                    style={{
                      borderRight:
                        idx === projects.length - 1 ? "none" : undefined,
                    }}
                  >
                    {project.desc && (
                      <RichTextRenderer html={project.desc} />
                    )}
                    <SafeImage
                      src={project.icon}
                      alt="project icon"
                      className="frp-icon"
                      style={{ width: "110px", height: "110px" }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ================= DESKTOP GRID ================= */}
            <div className="frp-desktop-amount-grid">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="frp-mobile-amount-cell"
                  style={{
                    borderRight:
                      idx === projects.length - 1 ? "none" : undefined,
                  }}
                >
                  <p
                    className="frp-amount-text"
                    style={project.color ? { color: project.color } : undefined}
                  >
                    {project.amount}
                  </p>
                  <p className="frp-amount-label">{project.label}</p>
                </div>
              ))}
            </div>

            <div className="frp-desktop-desc-grid">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="frp-mobile-desc-cell"
                  style={{
                    borderRight:
                      idx === projects.length - 1 ? "none" : undefined,
                  }}
                >
                  {project.desc && (
                    <RichTextRenderer html={project.desc} />
                  )}
                  <SafeImage
                    src={project.icon}
                    alt="project icon"
                    className="frp-icon"
                    style={{ width: "110px", height: "110px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default FundedResearchProjects;
