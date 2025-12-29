// import React from "react";
// import { Link } from "react-router";

// // Images
// // import AG1 from "../../assets/About/AG1.png";
// // import AG2 from "../../assets/About/AG2.png";
// // import AG3 from "../../assets/About/AG3.png";
// // import AG4 from "../../assets/About/AG4.png";
// // import AG5 from "../../assets/About/AG5.png";
// // import AG6 from "../../assets/About/AG6.png";
// // import AG7 from "../../assets/About/AG7.png";
// // import AG8 from "../../assets/About/AG8.png";

// const imageMap = { 
//     // AG1, AG2, AG3, AG4, AG5, AG6, AG7, AG8 
// };

// function AboutGrid({ data }) {
//     const {
//         gridItems = [],
//         ctaText,
//         ctaButtons = [],
//         bottomButtons = [],
//     } = data || {};

//     return (
//         <>
//             {/* Top Grid */}
//             <section className="pt-10 px-4 sm:px-6 md:px-20 mx-auto mt-10 mb-10 max-w-5xl">
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
//                     {gridItems.map((item, index) => {
//                         const isExternal = item.url.startsWith("http");
//                         const Wrapper = isExternal ? "a" : Link;
//                         const wrapperProps = isExternal
//                             ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
//                             : { to: item.url };

//                         return (
//                             <Wrapper key={index} {...wrapperProps}>
//                                 <div
//                                     className="relative h-28 md:h-36 w-full rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105"
//                                     style={{
//                                         backgroundImage: `url(${imageMap[item.image]})`,
//                                         backgroundSize: "cover",
//                                         backgroundPosition: "center",
//                                     }}
//                                 >
//                                     <div className="absolute inset-0 flex items-center justify-center px-2 text-center bg-black/20">
//                                         <span
//                                             className="text-white whitespace-pre-line text-sm sm:text-base md:text-lg font-medium leading-tight"
//                                             style={{
//                                                 fontFamily:
//                                                     "Helvetica LT Std Condensed, Arial, sans-serif",
//                                             }}
//                                         >
//                                             {item.title}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </Wrapper>
//                         );
//                     })}
//                 </div>
//             </section>

//             {/* CTA Buttons */}
//             <div className="text-center px-4 sm:px-6 mx-auto max-w-5xl mt-12">
//                 {ctaText && (
//                     <p className="text-gray-700 font-medium mb-6 text-sm sm:text-base">
//                         {ctaText}
//                     </p>
//                 )}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
//                     {ctaButtons.map((btn, index) => (
//                         <Link
//                             key={index}
//                             to={btn.url}
//                             className="px-6 py-2 rounded-full text-white bg-[#102B64] hover:bg-[#F04E30] font-semibold transition-all hover:scale-105 shadow-md text-center"
//                         >
//                             {btn.label}
//                         </Link>
//                     ))}
//                 </div>
//             </div>

//             {/* Bottom Buttons */}
//             <div className="max-w-3xl px-4 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
//                 {bottomButtons.map((btn, index) => (
//                     <Link
//                         key={index}
//                         to={btn.url}
//                         className="px-6 py-2 rounded-full text-white bg-[#102B64] hover:bg-[#F04E30] font-semibold transition-all hover:scale-105 shadow-md text-center"
//                     >
//                         {btn.label}
//                     </Link>
//                 ))}
//             </div>
//         </>
//     );
// }

// export default AboutGrid;
import React from "react";
import { Link } from "react-router";

const imageMap = {
  // AG1, AG2, AG3 ...
};

function AboutGrid({ data }) {
  const { gridItems = [], ctaText, ctaButtons = [], bottomButtons = [] } = data || {};

  return (
    <>
      {/* GRID */}
      <section className="about-grid-section">
        <div className="about-grid">
          {gridItems.map((item, index) => {
            const isExternal = item.url.startsWith("http");
            const Wrapper = isExternal ? "a" : Link;
            const props = isExternal
              ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
              : { to: item.url };

            return (
              <Wrapper key={index} {...props}>
                <div
                  className="about-grid-card"
                  style={{
                    backgroundImage: `url(${imageMap[item.image]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="about-grid-overlay">
                    <span className="about-grid-title">{item.title}</span>
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center px-4 max-w-5xl mx-auto mt-12">
        {ctaText && <p className="text-gray-700 font-medium mb-6">{ctaText}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {ctaButtons.map((btn, i) => (
            <Link key={i} to={btn.url} className="about-btn">
              {btn.label}
            </Link>
          ))}
        </div>
      </div>

      {/* BOTTOM BUTTONS */}
      <div className="max-w-3xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {bottomButtons.map((btn, i) => (
          <Link key={i} to={btn.url} className="about-btn">
            {btn.label}
          </Link>
        ))}
      </div>
    </>
  );
}

export default AboutGrid;
