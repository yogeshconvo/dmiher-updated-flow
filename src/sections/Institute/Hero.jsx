import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RichTextRenderer from "../../components/RichTextRenderer";
import { resolveImage } from "../../utils/resolveImage";
import NpfWidgetButton from "../../components/NpfWidgetButton";
import NpfInlineCard from "../../components/NpfInlineCard";

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

  // Hero CTA buttons from grids[].header (design_type = "buttons") — e.g. the
  // alumni Login / Sign Up buttons shown over the banner.
  const grids = Array.isArray(data.grids) ? data.grids : [];
  const buttonGrid = grids.find(
    (g) =>
      g?._section_enabled !== false &&
      Array.isArray(g?.header) &&
      g.header.length > 0
  );
  const heroButtons = buttonGrid ? buttonGrid.header : [];

  /* ================= INLINE ENQUIRY FORM (NPF) =================
     Optional overlay card on the hero (right side desktop / below banner
     on mobile). Driven by `data.enquiry_form` (first item if repeatable).
     Renders nothing when disabled or widget_id missing — purely additive. */
  const enquiryFormRaw = Array.isArray(data.enquiry_form)
    ? data.enquiry_form[0]
    : data.enquiry_form;
  const enquiryForm = enquiryFormRaw && typeof enquiryFormRaw === "object" ? enquiryFormRaw : null;
  const enquiryFormEnabled =
    !!enquiryForm &&
    enquiryForm._section_enabled !== false &&
    Boolean(enquiryForm.widget_id);
  const enquiryPosition = (enquiryForm?.position || "right").toLowerCase();

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
  // Clamp against the current slide count so a stale index (carried over
  // from a page with more slides) can't push the only slide off-screen
  // for the brief window before the reset effect runs.
  const safeActiveIndex = slides.length
    ? Math.min(activeIndex, slides.length - 1)
    : 0;

  useEffect(() => {
    setActiveIndex(0);
    if (slides.length <= 1) return;
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
            const isNpf = btn.type === "npf_widget";
            const href = buttonHref(btn);
            const label = buttonText(btn);

            // A real "pill" CTA has a background color and is not a phone link.
            // NPF widget buttons also pill out (they have bg_color set in CMS).
            // Everything else (helpline phone, trailing text) renders as plain
            // text so the strip reads like: text  |  [APPLY NOW]  text.
            const isPill = (Boolean(btn.bg_color) && !isPhone) || isNpf;

            // Divider before a pill when the previous item was plain text.
            const prev = allButtons[index - 1];
            const prevIsPill =
              prev &&
              ((Boolean(prev.bg_color) && !buttonIsPhone(prev)) ||
                prev.type === "npf_widget");
            const showDivider = isPill && index > 0 && !prevIsPill;

            // NPF widget pill — same .hero-apply-btn visuals, click opens modal.
            if (isNpf) {
              return (
                <React.Fragment key={index}>
                  {showDivider && <span className="hero-topbar-divider" />}
                  <NpfWidgetButton
                    widgetId={btn.widget_id}
                    modalTitle={btn.modal_title || "Admission Enquiry"}
                    width={btn.data_width || 500}
                    height={btn.data_height || 600}
                    renderTrigger={({ onClick }) => (
                      <button
                        type="button"
                        className="hero-apply-btn"
                        onClick={onClick}
                        style={buttonStyle(btn, false)}
                        onMouseEnter={(e) => {
                          if (btn.hover_bg_color)
                            e.currentTarget.style.backgroundColor =
                              btn.hover_bg_color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            btn.bg_color || "";
                        }}
                      >
                        {label}
                      </button>
                    )}
                  />
                </React.Fragment>
              );
            }

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
                const isNpf = btn.type === "npf_widget";
                const href = buttonHref(btn);
                const label = buttonText(btn);
                const isPill = (Boolean(btn.bg_color) && !isPhone) || isNpf;
                const textStyle = { color: btn.text_color || "#122E5E" };

                if (isNpf) {
                  return (
                    <NpfWidgetButton
                      key={index}
                      widgetId={btn.widget_id}
                      modalTitle={btn.modal_title || "Admission Enquiry"}
                      width={btn.data_width || 500}
                      height={btn.data_height || 600}
                      renderTrigger={({ onClick }) => (
                        <button
                          type="button"
                          className="hero-mobile-apply"
                          onClick={onClick}
                          style={buttonStyle(btn, false)}
                        >
                          {label}
                        </button>
                      )}
                    />
                  );
                }

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

      {/* SLIDER + (optional) INLINE ENQUIRY FORM
         Wrapping div is `relative` so the form card can lg:absolute itself
         to the right side of the hero on desktop and stack below it on
         mobile. When `enquiryFormEnabled` is false the wrapper is purely
         a no-op around the existing swiper. */}
      <div className="relative">
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
                transform: `translateX(${(idx - safeActiveIndex) * 100}%)`,
              }}
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Hero Banner"
                  className="hero-bg-img"
                  // First slide is the LCP element — load it eagerly and tell
                  // the browser to prioritise it. Remaining slides are deferred
                  // so they don't compete for bandwidth on initial paint.
                  fetchPriority={idx === 0 ? "high" : "low"}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
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

                {/* Section-level CTA buttons from grids[].header (Login / Sign Up) */}
                {heroButtons.length > 0 && (
                  <div className="hero-buttons inst-hero-btn-row">
                    {heroButtons.map((btn, btnIndex) => (
                      <SlideCtaButton
                        key={btnIndex}
                        btn={{
                          ...btn,
                          hover_text_color: btn.hover_text_color || btn.text_color,
                        }}
                      />
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
                  idx === safeActiveIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* INLINE ENQUIRY FORM CARD
         Desktop:
           - center → centered horizontally over the hero (lg:left-1/2 + -translate-x-1/2)
           - left   → lg:left-[5%]
           - right  → lg:right-[5%] (default)
         Mobile: stacks below the hero, centered, full width up to 400px. */}
      {enquiryFormEnabled && (() => {
        const lgPos =
          enquiryPosition === "center"
            ? "lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
            : enquiryPosition === "left"
            ? "lg:left-[5%] lg:-translate-y-1/2"
            : "lg:right-[5%] lg:-translate-y-1/2";
        return (
          <div
            className={`w-full px-4 mx-auto max-w-[400px] mt-6 lg:mt-0 lg:w-[400px] lg:max-w-none lg:absolute lg:top-1/2 lg:z-30 ${lgPos}`}
          >
            <NpfInlineCard
              widgetId={enquiryForm.widget_id}
              title={enquiryForm.title || "ENQUIRE NOW"}
              titleBg={enquiryForm.title_bg_color || "#F04E30"}
              titleColor={enquiryForm.title_text_color || "#FFFFFF"}
              width={enquiryForm.data_width || 400}
              height={enquiryForm.data_height || 540}
            />
          </div>
        );
      })()}
      </div>

      {/* BOTTOM STRIP */}
      {strapPosition === "bottom" && TopBarComponent}
    </>
  );
}

/* Per-slide CTA button extracted so we can use a stable hook (no nested useState in .map). */
function SlideCtaButton({ btn }) {
  const [isHover, setIsHover] = useState(false);

  const className =
    "mt-2 mb-4 px-6 py-2 transition-all duration-200 rounded cursor-pointer font-semibold inline-block text-center min-w-[200px]";
  const style = {
    backgroundColor: isHover ? btn.hover_bg_color : btn.bg_color,
    color: isHover ? btn.hover_text_color : btn.text_color,
    transform: isHover ? "scale(1.05)" : "scale(1)",
  };
  const label = btn.text || btn.primary_cta_text;

  // Same visuals — only the click target changes. Used by per-slide CTAs and
  // by hero grids[].header buttons.
  if (btn.type === "npf_widget") {
    return (
      <NpfWidgetButton
        widgetId={btn.widget_id}
        modalTitle={btn.modal_title || "Admission Enquiry"}
        width={btn.data_width || 500}
        height={btn.data_height || 600}
        renderTrigger={({ onClick }) => (
          <button
            type="button"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
            className={className}
            style={style}
          >
            {label}
          </button>
        )}
      />
    );
  }

  return (
    <a
      href={btn.url}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={className}
      style={style}
    >
      {label}
    </a>
  );
}

export default Hero;
