
// import React, { useState, useRef } from "react";

// function HolisticInfrastructureSection({ data }) {
//   const { heading, items = [] } = data || {};

//   const [activeId, setActiveId] = useState(items[0]?.id ?? null);
//   const textRef = useRef(null);
//   const imageRef = useRef(null);

//   const activeItem =
//     items.find((section) => section.id === activeId) || items[0] || {};

//   const getHeadingClass = (id) =>
//     `holistic-item-label ${
//       activeId === id
//         ? "holistic-item-label-active"
//         : "holistic-item-label-inactive"
//     }`;

//   return (
//     <div className="holistic-section container">
//       <div className="holistic-layout">
//         {/* TEXT SECTION */}
//         <div ref={textRef} className="holistic-text">
//             <h2 className="heading">
//               <hr className="heading-line" />
//             {heading}
//           </h2>

//           <div className="holistic-list custom-scrollbar">
//             {items.map((section) => (
//               <div key={section.id} className="holistic-item">
//                 <p>
//                   <span
//                     onClick={() => setActiveId(section.id)}
//                     className={getHeadingClass(section.id)}
//                   >
//                     {section.label}
//                   </span>
//                   <br />
//                   <span className="holistic-item-content">
//                     {section.content}
//                   </span>
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* IMAGE / PLACEHOLDER */}
//         <div className="holistic-image-wrapper">
//           <div className="holistic-image-box">
//             <div>
//               {/* <p className="holistic-placeholder-title">
//                 {activeItem.label || "Infrastructure Item"}
//               </p>
//               <p>Placeholder area (no image configured)</p> */}
//               <img src={activeItem.image_key} alt={activeItem.label} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HolisticInfrastructureSection;
import React, { useState, useRef } from "react";

function HolisticInfrastructureSection({ data }) {
  const heading = data?.header?.title || "";
  const items =
    data?.dimensions?.map((item, index) => ({
      id: index + 1,
      label: item.title,
      content: item.description || "",
      image_key: item.image?.[0] || "",
    })) || [];

  const [activeId, setActiveId] = useState(items[0]?.id ?? null);

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
        <div className="holistic-text">
          <h2 className="heading">
            <hr className="heading-line" />
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
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="holistic-image-wrapper">
          <div className="holistic-image-box">
            {activeItem.image_key ? (
              <img
                src={activeItem.image_key}
                alt={activeItem.label}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default HolisticInfrastructureSection;
