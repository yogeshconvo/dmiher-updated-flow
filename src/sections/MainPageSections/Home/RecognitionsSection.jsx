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
    <div className="bg-white py-4 sm:py-6 min-h-[400px] sm:min-h-[450px]  !flex items-center font-sans">
      <div className="flex flex-col xl:flex-row flex-wrap justify-between items-stretch gap-4 sm:gap-6 xl:gap-4 w-full font-sans">
        {/* NAAC Block */}
        <div className="w-full flex flex-col xl:flex-row xl:w-1/4 text-center xl:text-left border-b xl:border-b-0 xl:border-r-2 pb-4 xl:pb-0 xl:pr-6">
          <div className="flex flex-row xl:flex-col justify-between xl:justify-start items-center xl:items-start w-full xl:w-auto">
            <SafeImage
              src={naac.logo}
              alt="NAAC Logo"
              className="xl:mx-0 w-24 sm:w-28 xl:w-32 xl:w-36 h-auto"
              loading="lazy"
            />
            <div className="xl:mt-0 ml-4 xl:ml-0 text-left xl:text-left">
              <h3 className="mt-0 sm:mt-3">
                <span className="text-[#E60019] font-bold text-3xl md:text-2xl xl:text-4xl 2xl:text-5xl">
                  {naac.grade}
                </span>
                <span className="block text-[#122E5E] text-3xl md:text-2xl xl:text-4xl 2xl:text-5xl">
                  {naac.cgpa}
                </span>
              </h3>
              {naac.description && (
                <p className="text-xl text-gray-500 mt-1 xl:block">
                  {naac.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* NIRF Rankings Block */}
        <div className="w-full xl:w-1/2 border-b xl:border-b-0 xl:border-r-2 px-0 xl:px-2 xl:px-4 pb-4 xl:pb-0 flex flex-col justify-between">
          <div className="flex flex-col items-center xl:items-start">
            <SafeImage
              src={nirfImage.logo}
              alt="NIRF Logo"
              className="w-28 sm:w-32 xl:w-36 xl:w-40 max-w-xs"
              loading="lazy"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 xl:flex xl:flex-wrap justify-center xl:justify-start pt-2 sm:pt-3 gap-2 sm:gap-1 w-full">
              {nirfRankings.map((item, i) => (
                <div
                  key={i}
                  className={`px-2 sm:px-3 ${
                    i < nirfRankings.length - 1 ? "xl:border-r-2" : ""
                  } ${
                    i === 0 || i === 2 ? "border-r-2 sm:border-r-0" : ""
                  } border-gray-300 flex-1 text-center xl:text-left min-w-0`}
                >
                  <em className="text-8xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#E60019] not-italic block">
                    {item.num}
                    <sup className="text-xl xl:text-lg 2xl:text-xl font-bold mt-0 align-super">
                      {item.suffix}
                    </sup>
                  </em>
                  <span className="block text-lg md:text-lg xl:text-lg 2xl:text-2xl text-[#707070] mt-1 leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Times Higher Education Block */}
        <div className="w-full xl:w-1/5 text-center xl:text-left pt-4 xl:pt-0 flex flex-col justify-between">
          <div className="flex flex-row xl:flex-col justify-between items-center xl:items-start">
            <em className="text-5xl xl:text-6xl 2xl:text-7xl text-start text-[#E60019] leading-tight font-[500] not-italic block">
              {theRanking.rank}
            </em>
            <p className="text-3xl xl:text-4xl 2xl:text-5xl text-start text-[#707070] mt-1 xl:mt-1 font-sans leading-tight">
              {theRanking.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageSlide = ({ slide }) => {
  const image = firstOf(slide?.image);

  return (
    <div className="lg:bg-white text-white py-4 sm:py-6 2xl:py-4 min-h-[400px] sm:min-h-[450px] 2xl:h-[450px] !flex items-center lg:p-0">
      <div className="w-[100%] min-h-[400px] sm:min-h-[450px] 2xl:h-[450px] lg:flex items-center">
        {image.desktop && (
          <SafeImage
            src={image.desktop}
            alt="Rankings Slide"
            className="h-[100%] m-auto hidden md:block"
          />
        )}
        {image.mobile && (
          <SafeImage
            src={image.mobile}
            alt="Rankings Slide"
            className="h-[100%] m-auto block md:hidden"
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
          <div
            key={gIdx}
            className="bg-white p-2 sm:p-4 2xl:p-1  flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 border-gray-300 pb-4 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl text-[#122E5E] font-oswald-medium">
                {grid.name}
              </h2>
              <hr className="flex-grow border-gray-300" />
            </div>
            <div
              className={
                isNational
                  ? "grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 2xl:gap-6 justify-items-center"
                  : "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 2xl:grid-cols-4 gap-4 sm:gap-6"
              }
            >
              {logos.map((logo, idx) => (
                <div
                  key={idx}
                  className={
                    isNational
                      ? "flex items-center justify-center h-24 sm:h-28 2xl:h-36 w-full"
                      : "flex justify-center items-center p-2 sm:p-3 2xl:p-4"
                  }
                >
                  <SafeImage
                    src={logo.src}
                    alt={grid.name ? `${grid.name} logo ${idx + 1}` : `logo ${idx + 1}`}
                    className="max-h-20 sm:max-h-24 2xl:max-h-28 max-w-full object-contain"
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
    <div className="container py-15 overflow-hidden">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-oswald-medium mb-6 font-[500] text-[#707070] leading-tight">
          <hr className="w-16 sm:w-20 border-[#F04E30] mb-4 border-t-4" />
          ACCREDITATIONS, RANKINGS <br className="hidden sm:block" />
          <span className="sm:hidden">& </span>AND RECOGNITIONS
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
