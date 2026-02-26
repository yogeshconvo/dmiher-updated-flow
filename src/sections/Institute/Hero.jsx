
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hero({ data, slug }) {
  if (!data) return null;

  const topbar = data.topbar || {};
  const slides = Array.isArray(data.slides) ? data.slides : [];
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

  /* ================= TOPBAR COMPONENT ================= */

  const TopBarComponent =
    isTopbarEnabled && topbar ? (
      <div className="hero-topbar">
        <span className="hero-admission-text">
          {topbar.admissions_text}
        </span>

        {/* Desktop */}
        <div className="hero-desktop-actions">
          {topbar.primary_cta_text && (
            <button
              onClick={handleScrollToSection}
              className="hero-primary-btn btn-primary"
            >
              {topbar.primary_cta_text}
            </button>
          )}

          {topbar.apply_now_url && (
            <a
              href={topbar.apply_now_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-apply-btn"
            >
              APPLY NOW
            </a>
          )}

          {topbar.phone_number && (
            <a href={`tel:${topbar.phone_number}`}>
              <button className="hero-phone-btn">
                {topbar.phone_label || topbar.phone_number}
              </button>
            </a>
          )}
        </div>

        {/* Mobile */}
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
            {topbar.apply_now_url && (
              <a
                href={topbar.apply_now_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-mobile-apply"
              >
                APPLY NOW
              </a>
            )}

            {topbar.phone_number && (
              <a href={`tel:${topbar.phone_number}`}>
                <button className="hero-mobile-phone">
                  {topbar.phone_label || topbar.phone_number}
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      {/* ================= TOP POSITION ================= */}
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
              {/* Background */}
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Hero Banner"
                  className="hero-bg-img"
                />
              ) : (
                <div className="hero-bg-fallback" />
              )}

              {/* Overlay */}
              <div className="hero-overlay" />

              {/* Content */}
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
                {slide.title && (
                  <h1 className="hero-title">{slide.title}</h1>
                )}

                {slide.highlight && (
                  <h2 className="hero-highlight">
                    {slide.highlight}
                  </h2>
                )}

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

      {/* ================= BOTTOM POSITION ================= */}
      {strapPosition === "bottom" && TopBarComponent}
    </>
  );
}

export default Hero;