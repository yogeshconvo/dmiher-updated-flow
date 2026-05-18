import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SafeImage from "../../../components/SafeImage";

const firstOf = (val) => {
  if (Array.isArray(val)) return val[0] || {};
  return val || {};
};

const StatsSlide = ({ slide }) => {
  const naac = firstOf(slide?.naac);
  const nirfImage = firstOf(slide?.nirf_image);
  const nirfRankings = slide?.nirf_rankings || [];
  const theRanking = firstOf(slide?.the_ranking);

  return (
    <div className="recog-stats">
      <div className="recog-stats-inner">
        {/* NAAC Block */}
        <div className="recog-naac">
          <div className="recog-naac-row">
            <SafeImage
              src={naac.logo}
              alt="NAAC Logo"
              className="recog-naac-logo"
              loading="lazy"
            />
            <div className="recog-naac-text">
              <h3 className="recog-naac-h3">
                <span className="recog-naac-grade">{naac.grade}</span>
                <span className="recog-naac-cgpa">{naac.cgpa}</span>
              </h3>
              {naac.description && (
                <p className="recog-naac-desc">{naac.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* NIRF Rankings Block */}
        <div className="recog-nirf">
          <div className="recog-nirf-inner">
            <SafeImage
              src={nirfImage.logo}
              alt="NIRF Logo"
              className="recog-nirf-logo"
              loading="lazy"
            />
            <div className="recog-nirf-grid">
              {nirfRankings.map((item, i) => {
                const dividerClass =
                  i < nirfRankings.length - 1 ? "recog-nirf-item-divider" : "";
                const mobileDividerClass =
                  i === 0 || i === 2 ? "recog-nirf-item-mobile-divider" : "";
                return (
                  <div
                    key={i}
                    className={`recog-nirf-item ${dividerClass} ${mobileDividerClass}`}
                  >
                    <em className="recog-nirf-num">
                      {item.num}
                      <sup className="recog-nirf-suffix">{item.suffix}</sup>
                    </em>
                    <span className="recog-nirf-label">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Times Higher Education Block */}
        <div className="recog-the">
          <div className="recog-the-inner">
            <em className="recog-the-rank">{theRanking.rank}</em>
            <p className="recog-the-title">{theRanking.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageSlide = ({ slide }) => {
  const image = firstOf(slide?.image);

  return (
    <div className="recog-image-slide">
      <div className="recog-image-inner">
        {image.desktop && (
          <SafeImage
            src={image.desktop}
            alt="Rankings Slide"
            className="recog-image-desktop"
          />
        )}
        {image.mobile && (
          <SafeImage
            src={image.mobile}
            alt="Rankings Slide"
            className="recog-image-mobile"
          />
        )}
      </div>
    </div>
  );
};

const GridSlide = ({ slide }) => {
  const grids = slide?.grid || [];

  return (
    <>
      {grids.map((grid, gIdx) => {
        const logos = grid?.logos || [];
        const isNational = (grid?.name || "").toLowerCase() === "national";

        return (
          <div key={gIdx} className="recog-grid-card">
            <div className="recog-grid-header">
              <h2 className="recog-grid-name">{grid.name}</h2>
              <hr className="recog-grid-rule" />
            </div>
            <div
              className={
                isNational ? "recog-grid-national" : "recog-grid-international"
              }
            >
              {logos.map((logo, idx) => (
                <div
                  key={idx}
                  className={
                    isNational
                      ? "recog-grid-logo-national"
                      : "recog-grid-logo-international"
                  }
                >
                  <SafeImage
                    src={logo.src}
                    alt={
                      grid.name
                        ? `${grid.name} logo ${idx + 1}`
                        : `logo ${idx + 1}`
                    }
                    className="recog-grid-logo-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

const SlideRenderer = ({ slide }) => {
  switch (slide?.type) {
    case "stats":
      return <StatsSlide slide={slide} />;
    case "image":
      return <ImageSlide slide={slide} />;
    case "grid":
      return <GridSlide slide={slide} />;
    default:
      return null;
  }
};

const RecognitionsSection = ({ data }) => {
  const slides = data?.slides || [];
  if (slides.length === 0) return null;

  return (
    <div className="container recog-section">
      <div className="recog-header">
        <h2 className="recog-heading">
          <hr className="recog-heading-line" />
          ACCREDITATIONS, RANKINGS <br className="recog-heading-break" />
          <span className="recog-heading-amp">& </span>AND RECOGNITIONS
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}"></span>`,
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        centeredSlides
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <SlideRenderer slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecognitionsSection;
