// import React, { useState, useRef } from "react";

// function HolisticInfrastructureSection({ data }) {
//   const { heading, items = [] } = data || {};

//   const [activeId, setActiveId] = useState(items[0]?.id ?? null);
//   const textRef = useRef(null);
//   const imageRef = useRef(null);

//   const activeItem =
//     items.find((section) => section.id === activeId) || items[0] || {};

//   const getHeadingClass = (id) =>
//     `text-lg cursor-pointer transition ${
//       activeId === id
//         ? "text-primary font-bold font-oswald-medium"
//         : "text-[#58595B] hover:text-primary"
//     }`;

//   return (
//     <div className="py-20 bg-white container">
//       <div className="flex flex-col md:flex-col lg:flex-row items-start justify-center lg:gap-8">
//         {/* Text Section */}
//         <div ref={textRef} className="flex-2 min-w-[300px] w-full">
//           <h2 className="text-3xl md:text-4xl font-[500] text-[#707070] mb-8 tracking-wider font-oswald-medium">
//             <hr className="w-16 sm:w-20 border-[#F04E30] mb-4 border-t-4" />
//             {heading}
//           </h2>

//           <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
//             {items.map((section) => (
//               <div
//                 key={section.id}
//                 className="mb-2 pb-2 border-b border-gray-500 last:border-0"
//               >
//                 <p>
//                   <span
//                     onClick={() => setActiveId(section.id)}
//                     className={getHeadingClass(section.id)}
//                   >
//                     {section.label}
//                   </span>
//                   <br />
//                   <span className="text-sm text-[#707070]">
//                     {section.content}
//                   </span>
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Placeholder Section */}
//         <div ref={imageRef} className="flex-3 min-w-[315px] w-full">
//           <div className="w-full h-[500px] md:mt-32 rounded-md overflow-hidden shadow-lg flex items-center justify-center bg-gray-200 text-gray-600 text-sm text-center px-4">
//             <div>
//               <p className="font-semibold mb-2">
//                 {activeItem.label || "Infrastructure Item"}
//               </p>
//               <p>Placeholder area (no image configured)</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HolisticInfrastructureSection;
import React, { useState, useRef } from "react";
import "../styles/InstituteSections/InfrastructureSection.css";

function HolisticInfrastructureSection({ data }) {
  const { heading, items = [] } = data || {};

  const [activeId, setActiveId] = useState(items[0]?.id ?? null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const activeItem =
    items.find((section) => section.id === activeId) || items[0] || {};

  const getHeadingClass = (id) =>
    `holistic-item-label ${
      activeId === id
        ? "holistic-item-label-active"
        : "holistic-item-label-inactive"
    }`;

  return (
    <div className="holistic-section container">
      <div className="holistic-layout">
        {/* TEXT SECTION */}
        <div ref={textRef} className="holistic-text">
          <h2 className="holistic-heading">
            <hr className="holistic-heading-line" />
            {heading}
          </h2>

          <div className="holistic-list custom-scrollbar">
            {items.map((section) => (
              <div key={section.id} className="holistic-item">
                <p>
                  <span
                    onClick={() => setActiveId(section.id)}
                    className={getHeadingClass(section.id)}
                  >
                    {section.label}
                  </span>
                  <br />
                  <span className="holistic-item-content">
                    {section.content}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE / PLACEHOLDER */}
        <div ref={imageRef} className="holistic-image-wrapper">
          <div className="holistic-image-box">
            <div>
              <p className="holistic-placeholder-title">
                {activeItem.label || "Infrastructure Item"}
              </p>
              <p>Placeholder area (no image configured)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HolisticInfrastructureSection;
