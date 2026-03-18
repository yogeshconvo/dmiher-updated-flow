// import React from "react";
// import { Link } from "react-router";


// const ButtonSection = ({ data }) => {
//   const { buttons = [], center_button } = data || {};

//   return (
//     <div className="button-section">
//       {/* GRID BUTTONS */}
//       <div className="button-grid">
//         {buttons.map((btn, index) => (
//           <Link
//             key={index}
//             to={btn.to}
//             className="button-item"
//           >
//             {btn.label}
//           </Link>
//         ))}
//       </div>

//       {/* CENTER BUTTON */}
//       {center_button && (
//         <div className="button-center-wrapper">
//           <Link
//             to={center_button.to}
//             className="button-center"
//           >
//             {center_button.label}
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ButtonSection;
import React from "react";
import { Link } from "react-router-dom";

export default function CTAButtons({ data }) {
  const buttons = data?.buttons || [];

  return (
    <div className="flex flex-col md:flex-row justify-center gap-10 m-10">
      {buttons.map((btn, index) => {
        // 🔥 Priority logic
        const path =
          btn.link && btn.link !== "#"
            ? btn.link
            : btn.page_slug
            ? `/${btn.page_slug}`
            : "#";

        return (
          <Link key={index} to={path}>
            <button className="w-[18rem] bg-[#F05423] hover:bg-[#0B2A6D] text-white text-2xl font-oswald-medium px-8 py-3 rounded-md drop-shadow-[4px_6px_6px_rgba(0,0,0,0.5)] hover:scale-105 transition">
              {btn.label}
            </button>
          </Link>
        );
      })}
    </div>
  );
}