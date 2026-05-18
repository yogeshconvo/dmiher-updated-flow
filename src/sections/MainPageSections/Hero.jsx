import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";


function Hero({ data, slug = "Home" }) {
  if (!data) return null;

  const topbar = data.topbar || {};
  const slides = data.slides || [];

  const primarySectionId =
    topbar.primary_cta_section_id || "jnmc-announcements";

  const handleScrollToSection = () => {
    const yOffset = -10;
    const el = document.querySelector(`#${primarySectionId}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="mph-topbar">
        <span className="mph-admission-text">
          {topbar.admissions_text}
        </span>

        {/* Desktop / large view */}
        <div className="mph-desktop-actions">
          {Array.isArray(topbar.buttons) && topbar.buttons.length > 0
            ? topbar.buttons.map((btn, index) => {
                const isPhone = btn.url_type === "phone";
                return (
                  <a
                    key={index}
                    href={isPhone ? `tel:${btn.phone}` : btn.url}
                    target={isPhone ? undefined : "_blank"}
                    rel={isPhone ? undefined : "noopener noreferrer"}
                    className="mph-dyn-btn"
                    style={{
                      backgroundColor: btn.bg_color,
                      color: btn.text_color,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        btn.hover_bg_color || btn.bg_color)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = btn.bg_color)
                    }
                  >
                    <span>{btn.text}</span>
                  </a>
                );
              })
            : <>
                {topbar.primary_cta_text && (
                  <button
                    onClick={handleScrollToSection}
                    className="mph-primary-btn btn-primary"
                  >
                    <span>{topbar.primary_cta_text}</span>
                  </button>
                )}

                {/* APPLY NOW Button */}
                {topbar.apply_now_url && (
                  <a
                    href={topbar.apply_now_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mph-apply-btn"
                  >
                    <span>APPLY NOW</span>
                  </a>
                )}

                {/* Phone Button */}
                {topbar.phone_number && (
                  <a href={`tel:${topbar.phone_number}`}>
                    <button className="mph-phone-btn">
                      <svg
                        className="mph-phone-icon"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.36 11.36 0 003.55.57 1 1 0 011 1v3.43a1 1 0 01-1 1A17.93 17.93 0 012 6a1 1 0 011-1h3.44a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.27 1.11z" />
                      </svg>
                      <span className="mph-phone-text">
                        {topbar.phone_label || topbar.phone_number}
                      </span>
                    </button>
                  </a>
                )}
              </>
          }
        </div>

        {/* Mobile View */}
        <div className="mph-mobile">
          {Array.isArray(topbar.buttons) && topbar.buttons.length > 0
            ? <div className="mph-mobile-row">
                {topbar.buttons.map((btn, index) => {
                  const isPhone = btn.url_type === "phone";
                  return (
                    <a
                      key={index}
                      href={isPhone ? `tel:${btn.phone}` : btn.url}
                      target={isPhone ? undefined : "_blank"}
                      rel={isPhone ? undefined : "noopener noreferrer"}
                      className="mph-mobile-dyn-btn"
                      style={{
                        backgroundColor: btn.bg_color,
                        color: btn.text_color,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          btn.hover_bg_color || btn.bg_color)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = btn.bg_color)
                      }
                    >
                      {btn.text}
                    </a>
                  );
                })}
              </div>
            : <>
                {topbar.primary_cta_text && (
                  <Link
                    to={`/${slug}#${primarySectionId}`}
                    rel="noopener noreferrer"
                    className="mph-mobile-primary btn-primary"
                  >
                    <span>{topbar.primary_cta_text}</span>
                  </Link>
                )}

                <div className="mph-mobile-actions">
                  {topbar.apply_now_url && (
                    <a
                      href={topbar.apply_now_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mph-mobile-apply"
                    >
                      APPLY NOW
                    </a>
                  )}

                  {topbar.phone_number && (
                    <a
                      href={`tel:${topbar.phone_number}`}
                      className="mph-mobile-phone-link"
                    >
                      <button className="mph-mobile-phone">
                        <svg
                          className="mph-phone-icon"
                          fill="white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.36 11.36 0 003.55.57 1 1 0 011 1v3.43a1 1 0 01-1 1A17.93 17.93 0 012 6a1 1 0 011-1h3.44a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.27 1.11z" />
                        </svg>
                        <span className="mph-mobile-phone-text">
                          {topbar.phone_label || topbar.phone_number}
                        </span>
                      </button>
                    </a>
                  )}
                </div>
              </>
          }
        </div>

        {/* Button Animation CSS */}
        <style>
          {`
            .btn-primary {
              background: linear-gradient(90deg, #005bbb, #0099ff);
              animation: slideIn 1s ease-out, pulseBlue 1.8s infinite;
              box-shadow: 0 0 15px rgba(0, 123, 255, 0.4);
            }

            @keyframes pulseBlue {
              0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.6); }
              70% { box-shadow: 0 0 0 18px rgba(0, 123, 255, 0); }
              100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
            }

            @keyframes slideIn {
              from { opacity: 0; transform: translateY(-25px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>

      {/* Swiper section */}
      <div className="mph-swiper-wrapper">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="mph-swiper banner-swiper"
          loop={true}
          pagination={{ clickable: true }}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx} className="mph-slide">
              {slide.img ? (
                <img
                  src={slide.img}
                  alt="Campus"
                  className="mph-slide-img"
                />
              ) : (
                <div className="mph-slide-fallback" />
              )}

              {/* overlay */}
              {![2, 3].includes(idx) && (
                <div className="mph-slide-overlay" />
              )}

              <div
                className={`mph-slide-content ${
                  slide.textPosition === "right"
                    ? "mph-slide-content-right"
                    : "mph-slide-content-left"
                }`}
              >
                <h1
                  className={`mph-slide-title ${
                    idx === 1
                      ? "mph-slide-title-shift-1"
                      : idx === 3
                      ? "mph-slide-title-shift-3"
                      : ""
                  }`}
                >
                  {slide.title}
                </h1>
                {slide.highlight && (
                  <p className="mph-slide-highlight">
                    {slide.highlight}
                  </p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Hero;
