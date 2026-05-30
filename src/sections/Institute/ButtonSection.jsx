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

const FLEX_ALIGN_MAP = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

// Grid containers need `justify-items-*` (each cell's contents) rather than
// `justify-*` (whole track), so we map separately.
const GRID_ITEM_ALIGN_MAP = {
  left: "justify-items-start",
  center: "justify-items-center",
  right: "justify-items-end",
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

  const alignment = layout.alignment || "center";
  const columns = Number(layout.columns) || 2;
  const colClass = COL_MAP[columns] || "";

  const useGrid = columns > 0;

  // Split into full rows + a trailing partial row so any leftover buttons
  // (e.g. 5 items in 2 cols → 1 extra, 7 items in 3 cols → 1 extra,
  // 8 items in 3 cols → 2 extras) render as a centered flex row below
  // the grid instead of getting stuck in a single grid cell off to one side.
  const extras = useGrid ? buttons.length % columns : 0;
  const mainButtons = extras === 0 ? buttons : buttons.slice(0, -extras);
  const tailButtons = extras === 0 ? [] : buttons.slice(-extras);

  const gridClass = useGrid
    ? `grid grid-cols-1 ${colClass} ${GRID_ITEM_ALIGN_MAP[alignment] || "justify-items-center"} gap-10 max-w-fit mx-auto`
    : `flex flex-col md:flex-row flex-wrap ${FLEX_ALIGN_MAP[alignment] || "justify-center"} gap-10`;

  const renderButton = (btn, index) => {
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
      <button className="inst-cta-btn">
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
          className="inst-cta-link-wrap"
        >
          {buttonEl}
        </a>
      );
    }

    return (
      <Link key={index} to={path} className="inst-cta-link-wrap">
        {buttonEl}
      </Link>
    );
  };

  return (
    <div className="inst-cta-wrap">
      <div className={gridClass}>{mainButtons.map(renderButton)}</div>

      {tailButtons.length > 0 && (
        <div className="inst-cta-tail">
          {tailButtons.map((btn, i) =>
            renderButton(btn, mainButtons.length + i),
          )}
        </div>
      )}
    </div>
  );
}