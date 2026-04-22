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

const ALIGN_MAP = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const COL_MAP = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export default function CTAButtons({ data }) {
  const buttons = data?.buttons || [];
  const layout = data?.layout || {};

  const alignClass = ALIGN_MAP[layout.alignment] || "justify-center";
  const columns = Number(layout.columns) || 0;
  const colClass = COL_MAP[columns] || "";

  // When columns is set, use grid; otherwise fall back to the
  // existing flex row layout for backward compatibility.
  const useGrid = columns > 0;
  const containerClass = useGrid
    ? `grid grid-cols-1 ${colClass} gap-10 m-10 ${alignClass}`
    : `flex flex-col md:flex-row ${alignClass} gap-10 m-10`;

  return (
    <div className={containerClass}>
      {buttons.map((btn, index) => {
        const isExternal =
          btn.tab_type === "url" ||
          (typeof btn.link === "string" && btn.link.startsWith("http"));

        const path =
          btn.link && btn.link !== "#"
            ? btn.link
            : btn.page_slug
              ? `/${btn.page_slug}`
              : "#";

        const buttonEl = (
          <button className="w-[18rem] bg-[#F05423] hover:bg-[#0B2A6D] text-white text-2xl font-oswald-medium px-8 py-3 rounded-md drop-shadow-[4px_6px_6px_rgba(0,0,0,0.5)] hover:scale-105 transition">
            {btn.label}
          </button>
        );

        if (isExternal) {
          return (
            <a
              key={index}
              href={path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
            >
              {buttonEl}
            </a>
          );
        }

        return (
          <Link key={index} to={path} className="flex justify-center">
            {buttonEl}
          </Link>
        );
      })}
    </div>
  );
}