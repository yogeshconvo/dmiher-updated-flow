// import React, { useEffect, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import "swiper/css";
// import "swiper/css/navigation";

// // Assets map
// // import purpose from "../../assets/About/CoreValues/Purpose.png";
// // import compassion from "../../assets/About/CoreValues/compassion.png";
// // import innovation from "../../assets/About/CoreValues/innovation.png";
// // import collaboration from "../../assets/About/CoreValues/united.png";
// // import equity from "../../assets/About/CoreValues/scientific.png";

// const imageMap = {
// //   purpose,
// //   compassion,
// //   innovation,
// //   collaboration,
// //   equity,
// };

// function CoreValues({ data }) {
//   const { title, values = [] } = data || {};

//   const [isMobile, setIsMobile] = useState(false);
//   const [slidesPerView, setSlidesPerView] = useState(4);
//   const swiperRef = useRef(null);
//   const [atStart, setAtStart] = useState(true);
//   const [atEnd, setAtEnd] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       setIsMobile(width < 768);
//       setSlidesPerView(width < 1024 ? 2 : 4);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const renderSlide = (item) => (
//     <div className="flex max-w-7xl items-start w-full p-4 h-full">
//       <div className="flex-shrink-0 mt-30 font-[300] w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#58595B] opacity-40 text-white flex items-center justify-center text-xl md:text-4xl mr-4 font-['Oswald']">
//         {item.number}
//       </div>

//       <div>
//         <img
//           src={item.img}
//           alt={item.title}
//           className="mb-4 max-h-24 md:max-h-28 w-auto object-contain"
//         />

//         <h3
//           className="text-lg md:text-xl text-[#F04E30] mb-2 font-bold"
//           style={{ fontFamily: "'Helvetica LT Std', sans-serif" }}
//         >
//           {item.title === "Integrity in Innovation" ? (
//             <>
//               Integrity in <br /> Innovation
//             </>
//           ) : (
//             item.title
//           )}
//         </h3>

//         <p className="text-xs leading-relaxed">{item.description}</p>
//       </div>
//     </div>
//   );

//   return (
//     <section className="bg-gray-100 py-12">
//       <div className="container">
//         {/* Header */}
//         <div className="flex justify-between mb-8">
//           <h2 className="text-3xl md:text-4xl font-[500] text-[#707070] font-oswald-medium">
//             <hr className="w-16 border-[#F04E30] mb-2 border-t-4" />
//             {title}
//           </h2>

//           {!isMobile && (
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={() => swiperRef.current?.slidePrev()}
//                 disabled={atStart}
//                 className={`p-2 rounded-full border ${
//                   atStart ? "opacity-50" : "hover:bg-gray-200"
//                 }`}
//               >
//                 <ArrowLeft size={20} />
//               </button>
//               <button
//                 onClick={() => swiperRef.current?.slideNext()}
//                 disabled={atEnd}
//                 className={`p-2 rounded-full border ${
//                   atEnd ? "opacity-50" : "hover:bg-gray-200"
//                 }`}
//               >
//                 <ArrowRight size={20} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         {isMobile ? (
//           <div className="flex flex-col space-y-6">
//             {values.map((item) => (
//               <div key={item.number}>{renderSlide(item)}</div>
//             ))}
//           </div>
//         ) : (
//           <Swiper
//             modules={[Navigation]}
//             slidesPerView={slidesPerView}
//             spaceBetween={16}
//             onSwiper={(s) => {
//               swiperRef.current = s;
//               setAtStart(s.isBeginning);
//               setAtEnd(s.isEnd);
//             }}
//             onSlideChange={(s) => {
//               setAtStart(s.isBeginning);
//               setAtEnd(s.isEnd);
//             }}
//           >
//             {values.map((item) => (
//               <SwiperSlide key={item.number}>
//                 {renderSlide(item)}
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

function CoreValues({ data }) {
  const { title, values = [] } = data || {};
  const swiperRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
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
        <img src={item.img} alt={item.title} className="mb-4 max-h-24" />
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
            {title}
          </h2>

          {!isMobile && (
            <div className="flex gap-2">
              <button onClick={() => swiperRef.current?.slidePrev()}>
                <ArrowLeft />
              </button>
              <button onClick={() => swiperRef.current?.slideNext()}>
                <ArrowRight />
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
            onSlideChange={(s) => {
              setAtStart(s.isBeginning);
              setAtEnd(s.isEnd);
            }}
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
