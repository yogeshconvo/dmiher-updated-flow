import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link, useParams } from "react-router-dom";
import RichTextRenderer from "../../components/RichTextRenderer";
import SafeImage from "../../components/SafeImage";

/**
 * GlobalOpportunities — supports 5 layout types, all nested under `layout`:
 *
 *   page         → header + description + CTA button (layout.Buttons)
 *   image_logo   → main image (left) + logos grid (right)   (layout.image_logo)
 *   only_logo    → logos in a single row                     (layout.Logos)
 *   only_image   → one full-width image                      (layout.image)
 *   logo_slider  → a logo (left) + image carousel (right)    (layout.logo_slider)
 */
export default function GlobalOpportunities({
  data,
  college,
  pageSlug,
  instituteSlug,
  institute,
}) {
  const params = useParams();

  const header = data?.header || {};
  const layout = data?.layout || {};
  const { heading, description } = header;

  const layoutType = layout.layout_type || "page";
  const bgColor = data?.section_style?.bg_color;

  // Base slug for micro-page links (works on institute + generic pages).
  const base =
    college ||
    pageSlug ||
    instituteSlug ||
    institute?.slug ||
    params.college ||
    params.slug ||
    "";

  /* ===== Normalise per layout type into a common shape ===== */
  let mainImage = null;
  let logos = []; // [{ src }]
  let sliderLogo = null;
  let sliderImages = []; // [src]

  if (layoutType === "image_logo") {
    const il = layout.image_logo || {};
    mainImage = il.image || null;
    logos = (il.logos || [])
      .map((l) => ({ src: l.logo || l.image || l.src }))
      .filter((l) => l.src);
  } else if (layoutType === "only_logo") {
    logos = (layout.Logos || layout.logos || [])
      .map((l) => ({ src: l.src || l.logo || l.image }))
      .filter((l) => l.src);
  } else if (layoutType === "only_image") {
    mainImage = layout.image?.image || layout.image || null;
  } else if (layoutType === "logo_slider") {
    const ls = layout.logo_slider || {};
    sliderLogo = ls.logo || null;
    sliderImages = (ls.slider || [])
      .map((s) => s.imgslider || s.image || s.src)
      .filter(Boolean);
  }

  const isOnlyImage = layoutType === "only_image";
  const isOnlyLogo = layoutType === "only_logo";
  const isLogoSlider = layoutType === "logo_slider";

  // CTA button(s) — `page` layout sends layout.Buttons (object or array).
  const buttonsRaw = layout.Buttons || layout.buttons || data?.cta;
  const ctaList = Array.isArray(buttonsRaw)
    ? buttonsRaw
    : buttonsRaw
      ? [buttonsRaw]
      : [];

  return (
    <section
      className="global-section"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className="container font-[Arial]">

        {/* ================= HEADER ================= */}
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

        {/* ================= LOGO SLIDER (logo left + carousel right) ===== */}
        {isLogoSlider ? (
          <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
            <div className="w-full md:w-1/2 flex items-center justify-start">
              {sliderLogo && (
                <SafeImage
                  src={sliderLogo}
                  alt="partner logo"
                  className="max-h-24 w-auto object-contain"
                />
              )}
            </div>

            <div className="w-full md:w-1/2">
              {sliderImages.length > 0 && (
                <Swiper
                  modules={[Navigation]}
                  navigation
                  loop={sliderImages.length > 1}
                  spaceBetween={20}
                  slidesPerView={1}
                  className="global-logo-slider rounded-md overflow-hidden"
                >
                  {sliderImages.map((src, i) => (
                    <SwiperSlide key={i}>
                      <SafeImage
                        src={src}
                        alt={`slide ${i + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* ================= DESKTOP VIEW ================= */}
            {(mainImage || logos.length > 0) && (
              <div className="global-desktop">

                {/* IMAGE — image_logo → beside logos, only_image → full width */}
                {mainImage && (
                  <div className={isOnlyImage ? "global-image-only" : "global-image-wrapper"}>
                    <SafeImage src={mainImage} alt="global" className="global-image" />
                  </div>
                )}

                {/* LOGOS */}
                {logos.length > 0 && (
                  <div className={"global-logos" + (isOnlyLogo ? " global-logos-only" : "")}>
                    {logos.map((logo, idx) => {
                      // only_logo (single row): right border except last.
                      // image_logo (3-col grid): no border on cols 3 & 6.
                      const showBorder = isOnlyLogo
                        ? idx !== logos.length - 1
                        : idx !== 2 && idx !== 5;
                      return (
                        <div
                          key={idx}
                          className={`global-logo-cell ${showBorder ? "global-logo-cell-border" : ""}`}
                        >
                          <div className="global-logo-box">
                            <SafeImage src={logo.src} alt="logo" className="global-logo" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ================= MOBILE VIEW ================= */}
            {(mainImage || logos.length > 0) && (
              <div className="global-mobile">
                {mainImage && (
                  <div className="global-mobile-image">
                    <SafeImage src={mainImage} alt="global" className="global-image" />
                  </div>
                )}

                {logos.length > 0 && (
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
                          src={logo.src}
                          alt="logo"
                          className="global-mobile-logo-img"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
