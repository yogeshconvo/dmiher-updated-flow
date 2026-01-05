import React, { useEffect, useState } from "react";
import { Link } from "react-router";
// import "../styles/InstituteSections/Banner.css";

function Hero({ data, slug }) {
  if (!data) return null;

  const topbar = data.topbar || {};
  const slides = data.slides || [];
  const primarySectionId = topbar.primary_cta_section_id;

  const [activeIndex, setActiveIndex] = useState(0);

  // AUTOPLAY LOGIC
  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleScrollToSection = () => {
    const el = document.querySelector(`#${primarySectionId}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 10;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>

      {topbar?.enabled &&
        <div className={`hero-topbar`}>
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
                  <span className="hero-phone-text">
                    {topbar.phone_label || topbar.phone_number}
                  </span>
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
                <a href={`tel:${topbar.phone_number}`} className="w-full">
                  <button className="hero-mobile-phone">
                    {topbar.phone_label || topbar.phone_number}
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      }
    
   {/* SLIDER (ONE DIRECTION) */}
<div className={`hero-swiper-wrapper    ${
  topbar?.enabled
    ? "h-[80dvh] md:h-[calc(86dvh-10px)]"
    : "h-[90dvh] md:h-[calc(96dvh-10px)]"
} overflow-hidden`}>
  {slides.map((slide, idx) => (
    <div
      key={idx}
      className="hero-slide absolute inset-0 transition-transform duration-700 ease-in-out"
      style={{
        transform: `translateX(${(idx - activeIndex) * 100}%)`,
      }}
    >
      {/* Background */}
   {slide.img ? (
  <img
    src={slide.img}
    alt="Hero Banner"
    className="hero-bg-img"
  />
) : (
  <div className="hero-bg-fallback" />
)}

      {/* Overlay */}
      {![2, 3].includes(idx) && <div className="hero-overlay" />}

      {/* Content */}
      <div
        className={`hero-content ${
          slide.textPosition === "right"
            ? "hero-content-right"
            : "hero-content-left"
        }`}
      >
        <h1 className="hero-title">{slide.title}</h1>
        <h1 className="hero-highlight">{slide.highlight}</h1>


        {slide.paragraph && (
          <p className="hero-paragraph">{slide.paragraph}</p>
        )}
      </div>
    </div>
  ))}

  {/* Pagination */}
  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
    {slides.map((_, idx) => (
      <button
        key={idx}
        onClick={() => setActiveIndex(idx)}
        className={`w-3 h-3 rounded-full transition ${
          idx === activeIndex ? "bg-white" : "bg-white/40"
        }`}
      />
    ))}
  </div>
</div>

    </>
  );
}

export default Hero;
