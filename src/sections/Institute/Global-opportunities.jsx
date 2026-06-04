import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, useParams } from "react-router-dom";
import RichTextRenderer from "../../components/RichTextRenderer";
import SafeImage from "../../components/SafeImage";

export default function GlobalOpportunities({
  data,
  college,
  pageSlug,
  instituteSlug,
  institute,
}) {
  const params = useParams();

  const {
    header = {},
    image_section = {},
    logos: rawLogos = [],
    layout = {},
  } = data || {};

  const { heading, description } = header;
  const { image } = image_section;

  // Base slug for micro-page links (works on institute + generic pages).
  const base =
    college ||
    pageSlug ||
    instituteSlug ||
    institute?.slug ||
    params.college ||
    params.slug ||
    "";

  // CTA button(s) — API may send a single object or an array.
  const ctaRaw = data?.cta;
  const ctaList = Array.isArray(ctaRaw) ? ctaRaw : ctaRaw ? [ctaRaw] : [];

  // Normalize: API sends `logos` as an array of sections
  //   [{ _section_enabled, logos: [{image}], tab_type }]
  // Legacy form was a flat array [{src, alt}]. Support both.
  const isNested =
    Array.isArray(rawLogos) &&
    rawLogos.length > 0 &&
    Array.isArray(rawLogos[0]?.logos);

  const enabledSections = isNested
    ? rawLogos.filter((s) => s?._section_enabled !== false)
    : [];

  const logos = isNested
    ? enabledSections.flatMap((s) => s.logos || [])
    : rawLogos;

  // Layout: prefer explicit layout.layout_type, otherwise first section tab_type
  const layout_type =
    layout.layout_type ||
    enabledSections[0]?.tab_type ||
    "image_logo";

  // Layout logic
  const showImage =
    layout_type === "image_logo" || layout_type === "only_image";

  const showLogos =
    layout_type === "image_logo" || layout_type === "only_logo";

  // Auto slider logic
  const isOnlyLogo = layout_type === "only_logo";
  const isOnlyImage = layout_type === "only_image";
  const useSlider = isOnlyLogo && logos.length > 6;

  return (
    <section className="global-section">
      <div className="container font-[Arial]">

        {/* HEADER */}
        <div className="global-header">
          {heading && (
            <h2 className="heading">
              <hr className="heading-line" />
              {heading}
            </h2>
          )}
          {description && <RichTextRenderer html={description} />}

          {/* CTA button(s) — navigates to the micro page /{slug}/{cta_key} */}
          {ctaList.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {ctaList.map((cta, i) =>
                cta?.label ? (
                  <Link
                    key={i}
                    to={`/${base}/${cta.cta_key}`}
                    className="inline-block bg-[#F04E30] hover:bg-[#122E5E] text-white font-semibold text-base px-6 py-3 rounded-md transition-colors"
                  >
                    {cta.label}
                  </Link>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* DESKTOP VIEW */}
        <div className="global-desktop">

          {/* IMAGE — kept inside the container for all image layouts.
              image_logo  → 40% width (sits beside the logo grid)
              only_image  → full container width (e.g. RNPC alumni world-map) */}
          {showImage && image && (
            <div className={isOnlyImage ? "global-image-only" : "global-image-wrapper"}>
              <SafeImage src={image} alt="global" className="global-image" />
            </div>
          )}

          {/* LOGOS */}
          {showLogos && logos.length > 0 && (
            <>
              {/* GRID */}
              {!useSlider && (
                <div
                  className={
                    "global-logos" +
                    (isOnlyLogo ? " global-logos-only" : "")
                  }
                >
                  {logos.map((logo, idx) => {
                    // Border logic:
                    //   • only_logo (single row): every cell gets a right
                    //     border except the last
                    //   • image_logo (3-col grid): no border on cols 3 & 6
                    //     (i.e. idx 2 and 5)
                    const showBorder = isOnlyLogo
                      ? idx !== logos.length - 1
                      : idx !== 2 && idx !== 5;
                    return (
                      <div
                        key={idx}
                        className={`global-logo-cell ${
                          showBorder ? "global-logo-cell-border" : ""
                        }`}
                      >
                        <div className="global-logo-box">
                          <SafeImage
                            src={logo.image || logo.src}
                            alt={logo.alt || "logo"}
                            className="global-logo"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* SLIDER */}
              {useSlider && (
                <Swiper
                  spaceBetween={20}
                  slidesPerView={4}
                  breakpoints={{
                    1024: { slidesPerView: 4 },
                    768: { slidesPerView: 3 },
                    480: { slidesPerView: 2 },
                  }}
                  className="global-logos-slider"
                >
                  {logos.map((logo, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="global-logo-box">
                        <SafeImage
                          src={logo.image || logo.src}
                          alt={logo.alt || "logo"}
                          className="global-logo"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </>
          )}
        </div>

        {/* MOBILE VIEW */}
        <div className="global-mobile">

          {/* IMAGE — inside the container for all image layouts */}
          {showImage && image && (
            <div className="global-mobile-image">
              <SafeImage src={image} alt="global" className="global-image" />
            </div>
          )}

          {/* LOGOS */}
          {showLogos && logos.length > 0 && (
            <Swiper
              spaceBetween={15}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
              }}
              className="global-mobile-logos"
            >
              {logos.map((logo, idx) => (
                <SwiperSlide key={idx}>
                  <SafeImage
                    src={logo.image || logo.src}
                    alt={logo.alt || "logo"}
                    className="global-mobile-logo-img"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}