import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RichTextRenderer from "../../components/RichTextRenderer";
import { resolveImage } from "../../utils/resolveImage";

function Hero({ data, slug }) {
  if (!data) return null;

  /* ================= NORMALIZE TOPBAR =================
     New API : data.topbar = [{ _section_enabled, strip_position, buttons[], admissions_text, ... }]
     Legacy  : data.topbar = { enabled, position, buttons[], ... }                                */
  const topbar = Array.isArray(data.topbar)
    ? data.topbar[0] || {}
    : data.topbar || {};

  const slides = Array.isArray(data.slides) ? data.slides : [];

  // Dynamic fallback buttons (legacy address[] field)
  const ctaButtons = Array.isArray(data.address) ? data.address : [];

  const primarySectionId = topbar.primary_cta_section_id;

  // New: strip_position. Legacy: position. Default: top.
  const strapPosition =
    topbar.strip_position || topbar.position || "top";

  // The strip has real content if there's admissions text, buttons, or a CTA.
  // Used so the strip shows by default whenever data is present (pages don't
  // all set the _section_enabled flag, e.g. IQAC and other non-institute pages).
  const hasTopbarContent =
    Boolean(topbar.admissions_text) ||
    (Array.isArray(topbar.buttons) && topbar.buttons.length > 0) ||
    Boolean(topbar.apply_now_url) ||
    Boolean(topbar.primary_cta_text);

  // _section_disabled is a hard kill switch. Otherwise respect an explicit
  // enable flag (_section_enabled / enabled), and if neither is set, fall back
  // to showing the strip whenever it actually has content.
  const isTopbarEnabled =
    topbar._section_disabled === true
      ? false
      : (topbar._section_enabled ?? topbar.enabled ?? hasTopbarContent);

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

  /* ============ Per-button helpers (handle both shapes) ============ */
  const buttonText = (btn) =>
    btn.primary_cta_text || btn.text || btn.label || "";

  const buttonIsPhone = (btn) => {
    const t = btn.type || btn.url_type;
    if (t === "phone") return true;
    if (typeof btn.apply_now_url === "string" && btn.apply_now_url.startsWith("+"))
      return true;
    return false;
  };

  const buttonHref = (btn) => {
    if (buttonIsPhone(btn)) return `tel:${btn.phone || btn.apply_now_url}`;
    return btn.url || btn.apply_now_url || "#";
  };

  const buttonStyle = (btn, hovered) => ({
    backgroundColor: hovered
      ? btn.hover_bg_color || btn.bg_color || undefined
      : btn.bg_color || undefined,
    color: btn.text_color || undefined,
    transition: "background-color 0.3s ease",
  });

  /* ================= TOPBAR COMPONENT ================= */
  const allButtons =
    Array.isArray(topbar.buttons) && topbar.buttons.length > 0
      ? topbar.buttons
      : ctaButtons;

  const TopBarComponent = isTopbarEnabled ? (
    <div className="hero-topbar">
      {topbar.admissions_text && (
        <span className="hero-admission-text">{topbar.admissions_text}</span>
      )}

      {/* DESKTOP */}
      <div className="hero-desktop-actions">
        {allButtons.length > 0 ? (
          allButtons.map((btn, index) => {
            const isPhone = buttonIsPhone(btn);
            const href = buttonHref(btn);
            const label = buttonText(btn);

            // A real "pill" CTA has a background color and is not a phone link.
            // Everything else (helpline phone, trailing text) renders as plain
            // text so the strip reads like: text  |  [APPLY NOW]  text.
            const isPill = Boolean(btn.bg_color) && !isPhone;

            // Divider before a pill when the previous item was plain text.
            const prev = allButtons[index - 1];
            const prevIsPill =
              prev && Boolean(prev.bg_color) && !buttonIsPhone(prev);
            const showDivider = isPill && index > 0 && !prevIsPill;

            if (isPill) {
              return (
                <React.Fragment key={index}>
                  {showDivider && <span className="hero-topbar-divider" />}
                  <a
                    className="hero-apply-btn"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={buttonStyle(btn, false)}
                    onMouseEnter={(e) => {
                      if (btn.hover_bg_color)
                        e.currentTarget.style.backgroundColor =
                          btn.hover_bg_color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = btn.bg_color || "";
                    }}
                  >
                    {label}
                  </a>
                </React.Fragment>
              );
            }

            // Plain text item. Phone => clickable tel link, otherwise a link if
            // a url exists, else static text. Color comes from data (navy default).
            const textStyle = { color: btn.text_color || "#122E5E" };
            if (isPhone) {
              return (
                <a key={index} href={href} className="hero-topbar-text" style={textStyle}>
                  {label}
                </a>
              );
            }
            return href && href !== "#" ? (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-topbar-text"
                style={textStyle}
              >
                {label}
              </a>
            ) : (
              <span key={index} className="hero-topbar-text" style={textStyle}>
                {label}
              </span>
            );
          })
        ) : topbar.apply_now_url ? (
          <a
            href={topbar.apply_now_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-apply-btn"
          >
            APPLY NOW
          </a>
        ) : null}

        {topbar.primary_cta_text && (
          <button
            onClick={handleScrollToSection}
            className="hero-primary-btn btn-primary"
          >
            {topbar.primary_cta_text}
          </button>
        )}
      </div>

      {/* MOBILE */}
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
          {allButtons.length > 0
            ? allButtons.map((btn, index) => {
                const isPhone = buttonIsPhone(btn);
                const href = buttonHref(btn);
                const label = buttonText(btn);
                const isPill = Boolean(btn.bg_color) && !isPhone;
                const textStyle = { color: btn.text_color || "#122E5E" };

                if (isPill) {
                  return (
                    <a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-mobile-apply"
                      style={buttonStyle(btn, false)}
                    >
                      {label}
                    </a>
                  );
                }
                return isPhone ? (
                  <a key={index} href={href} className="hero-topbar-text" style={textStyle}>
                    {label}
                  </a>
                ) : (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-topbar-text"
                    style={textStyle}
                  >
                    {label}
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
      {/* TOP STRIP */}
      {strapPosition === "top" && TopBarComponent}

      {/* SLIDER */}
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
          const imageSrc = resolveImage(slide.img);
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
                  <p className="hero-paragraph">{slide.paragraph}</p>
                )}

                {slide.cta_buttons && slide.cta_buttons.length > 0 && (
                  <div className="hero-buttons inst-hero-btn-row">
                    {slide.cta_buttons.map((btn, btnIndex) => (
                      <SlideCtaButton key={btnIndex} btn={btn} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* DOTS */}
        {slides.length > 1 && (
          <div className="inst-hero-dots">
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
        )}
      </div>

      {/* BOTTOM STRIP */}
      {strapPosition === "bottom" && TopBarComponent}
    </>
  );
}

/* Per-slide CTA button extracted so we can use a stable hook (no nested useState in .map). */
function SlideCtaButton({ btn }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <a
      href={btn.url}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="mt-2 mb-4 px-6 py-2 transition-all duration-200 rounded cursor-pointer font-semibold inline-block text-center min-w-[200px]"
      style={{
        backgroundColor: isHover ? btn.hover_bg_color : btn.bg_color,
        color: isHover ? btn.hover_text_color : btn.text_color,
        transform: isHover ? "scale(1.05)" : "scale(1)",
      }}
    >
      {btn.text || btn.primary_cta_text}
    </a>
  );
}

export default Hero;
