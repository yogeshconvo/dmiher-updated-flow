



"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

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
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
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

/* Resolve href for an item or button based on action_type */
const resolveHref = (item, parent) => {
  if (item?.action_type === "link" && item?.page_slug) {
    return `/${parent}/${item.page_slug}`;
  }
  if (item?.action_type === "dependent") {
    const c = firstCta(item.cta);
    if (c?.cta_key) return `/${parent}/${c.cta_key}`;
  }
  return null;
};

/* Extract micro-page trigger info if action_type is dependent + has_micro_page */
const getMicroPageCta = (item) => {
  if (item?.action_type !== "dependent") return null;
  const c = firstCta(item.cta);
  if (c?.has_micro_page && c?.cta_key) return c;
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
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
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
        <div className="flex flex-wrap justify-center gap-3 mt-4">
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
                className={`px-5 py-2 text-sm font-medium rounded-full transition-colors border ${
                  isClickable
                    ? "bg-white border-[#122E5E] text-[#122E5E] hover:bg-[#122E5E] hover:text-white cursor-pointer"
                    : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
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
      // Card-mode supports multiple action types: "link" | "pdf"
      const isPdf = isCards && item.action_type === "pdf" && item.pdf;
      const url = isPdf
        ? item.pdf
        : isCards
          ? `/${parent}/${item.page_slug}`
          : `/${parent}/departments/${item.page_slug}`;

      return {
        title: item.title,
        image: item.image,
        url,
        external: isPdf,
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
        {data?.header?.heading && <h2 className="heading">
          <hr className="heading-line" />
          {data?.header?.heading}
        </h2>}

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