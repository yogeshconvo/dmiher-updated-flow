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
            <div className="block md:hidden">
              {/* Amount + Label */}
              <Swiper
                {...swiperSettingsMain}
                onSwiper={setFirstSwiper}
                className="border-2 border-gray-300 border-b-0"
              >
                {projects.map((project, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="border-r-2 border-b-2 border-gray-300 p-4 text-center"
                    style={{
                      borderRight:
                        idx === projects.length - 1 ? "none" : undefined,
                    }}
                  >
                    <p
                      className="text-xl font-bold"
                      style={project.color ? { color: project.color } : undefined}
                    >
                      {project.amount}
                    </p>
                    <p className="text-gray-400 mb-1">{project.label}</p>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Desc (title/subtitle HTML) + Icon */}
              <Swiper
                {...swiperSettingsNav}
                onSwiper={setSecondSwiper}
                className="border-x-2 border-gray-300 border-b-2"
              >
                {projects.map((project, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="border-r-2 border-gray-300 p-4 flex flex-col items-center gap-3 text-center min-h-[220px]"
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
                      className="mt-auto object-contain"
                      style={{ width: "110px", height: "110px" }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ================= DESKTOP GRID ================= */}
            <div className="hidden md:grid md:grid-cols-8 border-2 border-gray-300 border-b-0">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="border-r-2 border-b-2 border-gray-300 p-4 text-center"
                  style={{
                    borderRight:
                      idx === projects.length - 1 ? "none" : undefined,
                  }}
                >
                  <p
                    className="text-xl font-bold"
                    style={project.color ? { color: project.color } : undefined}
                  >
                    {project.amount}
                  </p>
                  <p className="text-gray-400 mb-1">{project.label}</p>
                </div>
              ))}
            </div>

            <div className="hidden md:grid md:grid-cols-8 border-x-2 border-b-2 border-gray-300">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="border-r-2 border-gray-300 p-4 flex flex-col items-center gap-3 text-center min-h-[220px]"
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
                    className="mt-auto object-contain"
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
