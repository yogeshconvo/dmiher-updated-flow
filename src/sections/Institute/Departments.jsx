



"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { resolveImage } from "../../utils/resolveImage";

import "swiper/css";
import "swiper/css/pagination";

const getDepartmentCardStyle = (image) => {
  const resolvedImage = resolveImage(image);
  if (!resolvedImage) {
    return { backgroundColor: "#122E5E" };
  }

  return {
    backgroundImage: `url(${resolvedImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
};

/* ================= CARD (institute slider) ================= */
const DepartmentCard = ({ title, url, image, external = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!url) return;
    if (external) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      navigate(url);
    }
  };

  return (
    <div
      className="department-card-wrapper cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="department-card department-card-hover department-card-height"
        style={getDepartmentCardStyle(image)}
      >
        <div className="department-card-overlay">
          <h3 className="department-card-title">{title}</h3>
        </div>
      </div>
    </div>
  );
};

/* ================= ABOUT-VARIANT HELPERS ================= */
/* Read first cta entry — supports both array form [{...}]
   and keyed-object form { "1": {...} } */
const firstCta = (cta) => {
  if (!cta) return null;
  if (Array.isArray(cta)) return cta[0] || null;
  if (typeof cta === "object") {
    const keys = Object.keys(cta);
    return keys.length ? cta[keys[0]] : null;
  }
  return null;
};

/* Resolve href for an item or button based on action_type.
   Accepts both shapes the CMS emits:
     - nested:  { action_type:"dependent", cta:[{cta_key:"x"}] }
     - flat:    { action_type:"dependent", cta_key:"x" }            */
const resolveHref = (item, parent) => {
  if (item?.action_type === "link" && item?.page_slug) {
    return `/${parent}/${item.page_slug}`;
  }
  if (item?.action_type === "dependent") {
    const nestedKey = firstCta(item.cta)?.cta_key;
    const flatKey = item?.cta_key;
    const key = nestedKey || flatKey;
    if (key) return `/${parent}/${key}`;
  }
  return null;
};

/* Extract micro-page trigger info if action_type is dependent + has_micro_page.
   Same flat-vs-nested tolerance as resolveHref. */
const getMicroPageCta = (item) => {
  if (item?.action_type !== "dependent") return null;

  const nested = firstCta(item.cta);
  if (nested?.has_micro_page && nested?.cta_key) return nested;

  if (item?.has_micro_page && item?.cta_key) {
    return { has_micro_page: true, cta_key: item.cta_key, label: item.label };
  }
  return null;
};

const labelFor = (item) =>
  item?.title || item?.label || firstCta(item?.cta)?.label || "";

/* ================= ABOUT GRID =================
   Reuses the existing .departments-grid + .department-card-* styling
   so the UI matches the rest of the site. */
const AboutGrid = ({ grid, parent }) => {
  const navigate = useNavigate();
  const items = grid?.grid_items || [];
  const buttons = grid?.cta_buttons || [];
  const ctaText = grid?.cta?.[0]?.cta_text;

  const handleClick = (item) => {
    // For both "link" (page_slug) and "dependent" (cta[0].cta_key),
    // navigate to /{parent}/{slug}. PageView's /:college/:page route
    // fires useSubpage → /api/micropage/{parent}/{slug} and renders.
    const href = resolveHref(item, parent);
    if (href) navigate(href);
  };

  const isPending = false;

  return (
    <>
      {/* Image card grid */}
      {items.length > 0 && (
        <div className="departments-grid">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="department-card-wrapper cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <div
                className="department-card department-card-hover department-card-height"
                style={getDepartmentCardStyle(item.image)}
              >
                <div className="department-card-overlay">
                  <h3 className="department-card-title">{labelFor(item)}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Helper text above buttons */}
      {ctaText && (
        <p className="text-center text-[#58595B] text-sm md:text-base mt-8">
          {ctaText}
        </p>
      )}

      {/* Pill button row */}
      {buttons.length > 0 && (
        <div className="inst-dept-row">
          {buttons.map((btn, idx) => {
            const micro = getMicroPageCta(btn);
            const href = resolveHref(btn, parent);
            const isClickable = Boolean(micro || href);
            const label = labelFor(btn);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleClick(btn)}
                disabled={!isClickable || isPending}
                className={`px-10 py-3 min-w-[260px] text-base font-semibold text-center rounded-full shadow-md transition-all duration-300 ${
                  isClickable
                    ? "bg-[#122E5E] text-white hover:bg-[#F04E30] hover:scale-105 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

/* ================= MAIN ================= */
const Departments = ({ data, college, pageSlug }) => {
  const swiperRef = useRef(null);
  const [departments, setDepartments] = useState([]);
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // First grid drives the rendering decision
  const firstGrid = data?.grids?.[0];
  const designType = firstGrid?.design_type;
  const isAboutVariant = designType === "about";

  /* ================= DATA (institute slider) — skip for about variant ===== */
  useEffect(() => {
    if (isAboutVariant) return;
    if (!data?.grids?.length) return;

    const grid = data.grids[0] || {};
    const parent = college || pageSlug || "";

    // Prefer `departments` (institute flow); fall back to `cards` (generic grid)
    const source =
      (Array.isArray(grid.departments) && grid.departments.length
        ? grid.departments
        : grid.cards) || [];

    const isCards =
      !(Array.isArray(grid.departments) && grid.departments.length);

    const deptList = source.map((item) => {
      // Department flow keeps its existing /{parent}/departments/{page_slug} path
      if (!isCards) {
        return {
          title: item.title,
          image: item.image,
          url: item.page_slug ? `/${parent}/departments/${item.page_slug}` : null,
          external: false,
        };
      }

      // Card-mode supports multiple action types: "link" | "page" | "pdf"
      const action = item.action_type;

      // PDF — open in a new tab
      if (action === "pdf" && item.pdf) {
        return {
          title: item.title,
          image: item.image,
          url: item.pdf,
          external: true,
        };
      }

      // Micropage CTA — page_slug is empty; the real key lives in cta[0].cta_key
      // (e.g. national-admissions DMIHER-CET card). Falls back to page_slug if present.
      if (action === "page") {
        const ctaKey = firstCta(item.cta)?.cta_key || item.page_slug || "";
        return {
          title: item.title,
          image: item.image,
          url: ctaKey ? `/${parent}/${ctaKey}` : null,
          external: false,
        };
      }

      // Default ("link" or unspecified) — page_slug is treated as a top-level
      // route, so navigate directly to /{page_slug} without the parent prefix.
      return {
        title: item.title,
        image: item.image,
        url: item.page_slug ? `/${item.page_slug}` : null,
        external: false,
      };
    });

    setDepartments(deptList);
  }, [data, college, pageSlug, isAboutVariant]);

  /* ================= SLIDER ================= */
  useEffect(() => {
    if (isAboutVariant) return;
    if (!departments.length) return;

    const chunkSize = window.innerWidth < 640 ? 4 : window.innerWidth < 1024 ? 6 : 8;

    const chunks = [];
    for (let i = 0; i < departments.length; i += chunkSize) {
      chunks.push(departments.slice(i, i + chunkSize));
    }

    setSlides(chunks);
    setCurrentSlide(0);
  }, [departments, isAboutVariant]);

  /* ===== ABOUT VARIANT — render grid_items + cta_buttons ===== */
  if (isAboutVariant) {
    const parent = college || pageSlug || "about";
    return (
      <div className="departments-section">
        <div className="container">
          <AboutGrid grid={firstGrid} parent={parent} />
        </div>
      </div>
    );
  }

  if (!departments.length) return <p>Loading...</p>;

  // Single-row layout applies ONLY to design_type === "normal" (cards variant)
  // when there are 5 or fewer items. Department slider keeps its swiper.
  const isSingleRow =
    designType === "normal" && departments.length <= 5;

   return (
    <div className="departments-section">
      <div className="container">
        {(() => {
          // Header may arrive as an object ({heading}) OR an array ([{heading}]).
          // The grid itself can also carry the heading on `firstGrid.header[0]`.
          const dh = data?.header;
          const headingFromData = Array.isArray(dh)
            ? dh[0]?.heading
            : dh?.heading;
          const gh = firstGrid?.header;
          const headingFromGrid = Array.isArray(gh)
            ? gh[0]?.heading
            : gh?.heading;
          const heading = headingFromData || headingFromGrid;
          return heading ? (
            <h2 className="heading">
              <hr className="heading-line" />
              {heading}
            </h2>
          ) : null;
        })()}

        {isSingleRow ? (
          /* ===== Single-row layout (≤ 5 cards) ===== */
          <div
            className="departments-grid departments-grid-single"
            style={{
              gridTemplateColumns: `repeat(${departments.length}, minmax(0, 1fr))`,
            }}
          >
            {departments.map((item, idx) => (
              <DepartmentCard
                key={idx}
                title={item.title}
                url={item.url}
                image={item.image}
                external={item.external}
              />
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* NAV */}
            <div className="departments-nav">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={currentSlide === 0}
                className={`departments-nav-btn ${
                  currentSlide === 0
                    ? "departments-nav-btn-disabled"
                    : "departments-nav-btn-active"
                }`}
              >
                <ArrowLeft size={20} />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                disabled={currentSlide === slides.length - 1}
                className={`departments-nav-btn ${
                  currentSlide === slides.length - 1
                    ? "departments-nav-btn-disabled"
                    : "departments-nav-btn-active"
                }`}
              >
                <ArrowRight size={20} />
              </button>
            </div>

            {/* SWIPER */}
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              speed={500}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) =>
                setCurrentSlide(swiper.activeIndex)
              }
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="departments-grid">
                    {slide.map((item, idx) => (
                      <DepartmentCard
                        key={idx}
                        title={item.title}
                        url={item.url}
                        image={item.image}
                      />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};



export default Departments;
