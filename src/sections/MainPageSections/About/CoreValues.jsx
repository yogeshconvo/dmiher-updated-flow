
// import React, { useEffect, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import "swiper/css";

// function CoreValues({ data }) {
//   const { title, values = [] } = data || {};
//   const swiperRef = useRef(null);

//   const [isMobile, setIsMobile] = useState(false);
//   const [atStart, setAtStart] = useState(true);
//   const [atEnd, setAtEnd] = useState(false);

//   useEffect(() => {
//     const resize = () => setIsMobile(window.innerWidth < 768);
//     resize();
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
//   }, []);

//   const Slide = ({ item }) => (
//     <div className="core-values-slide">
//       <div className="core-values-number">{item.number}</div>
//       <div>
//         <img src={item.img} alt={item.title} className="mb-4 max-h-24" />
//         <h3 className="core-values-heading">{item.title}</h3>
//         <p className="core-values-desc">{item.description}</p>
//       </div>
//     </div>
//   );

//   return (
//     <section className="core-values-section">
//       <div className="container">
//         <div className="core-values-header">
//           <h2 className="core-values-title">
//             <hr className="committees-underline" />
//             {title}
//           </h2>

//           {!isMobile && (
//             <div className="flex gap-2">
//               <button onClick={() => swiperRef.current?.slidePrev()}>
//                 <ArrowLeft />
//               </button>
//               <button onClick={() => swiperRef.current?.slideNext()}>
//                 <ArrowRight />
//               </button>
//             </div>
//           )}
//         </div>

//         {isMobile ? (
//           <div className="flex flex-col gap-6">
//             {values.map((item) => (
//               <Slide key={item.number} item={item} />
//             ))}
//           </div>
//         ) : (
//           <Swiper
//             slidesPerView={4}
//             spaceBetween={16}
//             onSwiper={(s) => (swiperRef.current = s)}
//             onSlideChange={(s) => {
//               setAtStart(s.isBeginning);
//               setAtEnd(s.isEnd);
//             }}
//           >
//             {values.map((item) => (
//               <SwiperSlide key={item.number}>
//                 <Slide item={item} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//       </div>
//     </section>
//   );
// }

// export default CoreValues;
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";

const STORAGE_URL = "http://127.0.0.1:8000/storage/";

function CoreValues({ data }) {
  const { basic, values = [] } = data || {};
  const swiperRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  // Track edges to dim arrows
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const Slide = ({ item }) => (
    <div className="core-values-slide">
      <div className="core-values-number">{item.number}</div>

      <div>
        <img
          src={`${STORAGE_URL}${item.img}`}
          alt={item.title}
          className="mb-4 max-h-24 mx-auto"
        />
        <h3 className="core-values-heading">{item.title}</h3>
        <p className="core-values-desc">{item.description}</p>
      </div>
    </div>
  );

  return (
    <section className="core-values-section">
      <div className="container">

        <div className="core-values-header">
          <h2 className="core-values-title">
            <hr className="committees-underline" />
            {basic?.title}
          </h2>

          {!isMobile && (
            <div className="flex items-center space-x-2">
              {/* <button onClick={() => swiperRef.current?.slidePrev()}>
                <ArrowLeft />
              </button>
              <button onClick={() => swiperRef.current?.slideNext()}>
                <ArrowRight />
              </button> */}
               <button
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={atStart}
                aria-disabled={atStart}
                className={`p-2 rounded-full border border-gray-300 hover:bg-gray-200 transition ${
                  atStart ? "opacity-50 pointer-events-none" : ""
                }`}
                title="Previous"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                disabled={atEnd}
                aria-disabled={atEnd}
                className={`p-2 rounded-full border border-gray-300 hover:bg-gray-200 transition ${
                  atEnd ? "opacity-50 pointer-events-none" : ""
                }`}
                title="Next"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-6">
            {values.map((item) => (
              <Slide key={item.number} item={item} />
            ))}
          </div>
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={16}
            onSwiper={(s) => (swiperRef.current = s)}
          >
            {values.map((item) => (
              <SwiperSlide key={item.number}>
                <Slide item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export default CoreValues;
