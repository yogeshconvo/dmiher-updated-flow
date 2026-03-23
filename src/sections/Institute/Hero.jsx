import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RichTextRenderer from "../../components/RichTextRenderer";

function Hero({ data, slug }) {
  if (!data) return null;

  const topbar = data.topbar || {};
  const slides = Array.isArray(data.slides) ? data.slides : [];

  // ✅ Dynamic buttons
  const ctaButtons = Array.isArray(data.address) ? data.address : [];

  const primarySectionId = topbar.primary_cta_section_id;
  const strapPosition = topbar.position || "top";
  const isTopbarEnabled = topbar?.enabled;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleScrollToSection = () => {
    if (!primarySectionId) return;
    const el = document.getElementById(primarySectionId);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - 10;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  /* ================= TOPBAR ================= */

  const TopBarComponent =
    isTopbarEnabled && topbar ? (
      <div className="hero-topbar">
        <span className="hero-admission-text">
          {topbar.admissions_text}
        </span>

        {/* ================= DESKTOP ================= */}
        <div className="hero-desktop-actions">
          {ctaButtons.length > 0
            ? ctaButtons.map((btn, index) => {
                const isPhone = btn.apply_now_url?.startsWith("+");

                const commonProps = {
                  key: index,
                  className: "hero-apply-btn",
                  style: {
                    backgroundColor: btn.bg_color,
                    color: btn.text_color,
                    transition: "background-color 0.3s ease",
                  },
                  onMouseEnter: (e) =>
                    (e.currentTarget.style.backgroundColor =
                      btn.hover_bg_color || btn.bg_color),
                  onMouseLeave: (e) =>
                    (e.currentTarget.style.backgroundColor = btn.bg_color),
                };

                return isPhone ? (
                  <a {...commonProps} href={`tel:${btn.apply_now_url}`}>
                    {btn.primary_cta_text}
                  </a>
                ) : (
                  <a
                    {...commonProps}
                    href={btn.apply_now_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {btn.primary_cta_text}
                  </a>
                );
              })
            : topbar.apply_now_url && (
                <a
                  href={topbar.apply_now_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-apply-btn"
                >
                  APPLY NOW
                </a>
              )}

          {/* Optional Scroll Button */}
          {topbar.primary_cta_text && (
            <button
              onClick={handleScrollToSection}
              className="hero-primary-btn btn-primary"
            >
              {topbar.primary_cta_text}
            </button>
          )}
        </div>

        {/* ================= MOBILE ================= */}
        <div className="hero-mobile">
          {topbar.primary_cta_text && (
            <Link
              to={`/${slug}#${primarySectionId}`}
              className="hero-mobile-primary btn-primary"
            >
              {topbar.primary_cta_text}
            </Link>
          )}

          <div className="hero-mobile-actions">
            {ctaButtons.length > 0
              ? ctaButtons.map((btn, index) => {
                  const isPhone = btn.apply_now_url?.startsWith("+");

                  return isPhone ? (
                    <a key={index} href={`tel:${btn.apply_now_url}`}>
                      {btn.primary_cta_text}
                    </a>
                  ) : (
                    <a
                      key={index}
                      href={btn.apply_now_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {btn.primary_cta_text}
                    </a>
                  );
                })
              : topbar.apply_now_url && (
                  <a
                    href={topbar.apply_now_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    APPLY NOW
                  </a>
                )}
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      {/* ================= TOP ================= */}
      {strapPosition === "top" && TopBarComponent}

      {/* ================= SLIDER ================= */}
      <div
        className={`hero-swiper-wrapper ${
          isTopbarEnabled && strapPosition === "top"
            ? "h-[80dvh] md:h-[calc(86dvh-10px)]"
            : isTopbarEnabled && strapPosition === "bottom"
            ? "h-[90dvh] md:h-[calc(84dvh-6px)]"
            : "h-[90dvh] md:h-[calc(96dvh-10px)]"
        } overflow-hidden relative`}
      >
        {slides.map((slide, idx) => {
          const imageSrc = slide.img;

          return (
            <div
              key={idx}
              className="hero-slide absolute inset-0 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(${(idx - activeIndex) * 100}%)`,
              }}
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Hero Banner"
                  className="hero-bg-img"
                />
              ) : (
                <div className="hero-bg-fallback" />
              )}

              <div className="hero-overlay" />

              <div
                className={`hero-content ${
                  slide.textPosition === "right"
                    ? "hero-content-right"
                    : slide.textPosition === "center"
                    ? "hero-content-center"
                    : slide.textPosition === "bottom"
                    ? "hero-content-bottom"
                    : "hero-content-left"
                }`}
              >
                <RichTextRenderer html={slide.desc} />

                {slide.paragraph && (
                  <p className="hero-paragraph">
                    {slide.paragraph}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* ================= DOTS ================= */}
        {slides.length > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition ${
                  idx === activeIndex
                    ? "bg-white"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= BOTTOM ================= */}
      {strapPosition === "bottom" && TopBarComponent}
    </>
  );
}

export default Hero;