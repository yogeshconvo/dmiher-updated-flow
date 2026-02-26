import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

export const SectionHeader = ({
  title,
  subtitle,
  onPrev,
  onNext,
  showViewAll = true,
  viewAllLink = "#",
}) => (
  <div className="mb-8">
    {title && (
      <>
        <div className="h-1 w-20 bg-red-500 mt-1" />
        <h2
          className="text-3xl md:text-4xl mt-3 text-[#707070] uppercase"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
        >
          {title}
        </h2>
      </>
    )}
    <div className="flex flex-row items-center justify-between mt-4 gap-2 flex-wrap">
      <p className="text-sm sm:text-lg text-[#F04E30] font-[500]">{subtitle}</p>
      <div className="flex-1 h-px bg-gray-300 mx-2 min-w-[40px]" />
      <div className="hidden md:flex items-center gap-2 flex-wrap">
        <button
          onClick={onPrev}
          className="p-2 border rounded-full text-gray-600 hover:bg-gray-100 hover:opacity-85 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={onNext}
          className="p-2 border rounded-full text-gray-600 hover:bg-gray-100  hover:opacity-85 transition "
        >
          <ArrowRight size={20} />
        </button>
        {showViewAll && (
          <Link
            to={viewAllLink}
            className="text-[#F04E30] ml-2 font-[600] sm:text-base text-sm cursor-pointer hover:underline whitespace-nowrap"
            style={{
              fontFamily: '"Helvetica LT Std", "Condensed", sans-serif',
            }}
          >
            VIEW ALL
          </Link>
        )}
      </div>
    </div>

    {showViewAll && (
      <div className="md:hidden mt-4 text-end">
        <a
          href={viewAllLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-[600] text-sm cursor-pointer hover:underline"
          style={{ fontFamily: '"Helvetica LT Std", "Condensed", sans-serif' }}
        >
          VIEW ALL
        </a>
      </div>
    )}
  </div>
);
function CampusFacilities({ data }) {
  const swiperRef = useRef(null);
  const [popupImages, setPopupImages] = useState([]);
  const [popupIndex, setPopupIndex] = useState(null);

  const openPopup = (items, index) => {
    setPopupImages(items.map((i) => i.image));
    setPopupIndex(index);
  };


  return (
    <section className="campus-page py-10 px-5">
      <div className="max-w-7xl mx-auto">

      <h2 className="heading"><hr className="heading-line" /> {data.basic?.title}</h2>

        {data.tabs?.map((tab, idx) => (
          <div key={idx} className="mb-10">
          <SectionHeader
          //  title={data.basic?.title} 
           subtitle={tab.tab_label}
           onPrev={() => swiperRef.current?.swiper.slidePrev()}
           onNext={() => swiperRef.current?.swiper.slideNext()}
              showViewAll={true}
              viewAllLink={tab.url}
          />
            
                  {/* Swiper */}
           <Swiper
  ref={swiperRef}
  modules={[Navigation]}
  slidesPerView={1}
  spaceBetween={20}  
  breakpoints={{
    480: { slidesPerView: 1, spaceBetween: 2 },
    768: { slidesPerView: 3, spaceBetween: 2 },
    1024: { slidesPerView: 4, spaceBetween: 3 },
  }}
>
  {tab.images?.map((item, index) => (
    <SwiperSlide key={index}>
      <div
        className="cursor-pointer px-2"
        onClick={() => openPopup(tab.images, index)}
      >
        <img
          src={item.image}
          alt={item.text}
          className="w-full h-50 object-cover rounded-lg"
        />
       <p
                    className="mt-2 text-gray-600 text-base sm:text-lg  font-oswald-medium" 
                  
                  >
                    {item.text}
                  </p>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
          </div>
        ))}

        {/* Popup */}
        {popupIndex !== null && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center z-50 justify-center"
            onClick={() => setPopupIndex(null)}
          >
            <div
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={popupImages[popupIndex]}
                className="max-h-[80vh] rounded"
                alt="preview"
              />
              <button
                className="absolute top-2 right-2 text-white"
                onClick={() => setPopupIndex(null)}
              >
                <X />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CampusFacilities;