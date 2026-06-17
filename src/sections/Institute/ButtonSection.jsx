
import React from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";

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

  // With 2+ buttons in a grid, stretch each button to fill its column so they
  // render uniform full-width (matches the production/server design). A lone
  // button stays content-width and centered.
  const gridFullWidth = useGrid && mainButtons.length > 1;

  const gridClass = useGrid
    ? `grid grid-cols-1 ${colClass} gap-6 mx-auto ${
        gridFullWidth
          ? "w-full max-w-4xl"
          : `max-w-fit ${GRID_ITEM_ALIGN_MAP[alignment] || "justify-items-center"}`
      }`
    : `flex flex-col md:flex-row flex-wrap ${FLEX_ALIGN_MAP[alignment] || "justify-center"} gap-10`;

  const renderButton = (btn, index, fullWidth = false) => {
    // Link can arrive as `link` or `url` (CMS uses both depending on schema).
    const rawLink = btn.link || btn.url || "";

    const isExternal =
      btn.tab_type === "url" ||
      (typeof rawLink === "string" && rawLink.startsWith("http"));

    const path =
      rawLink && rawLink !== "#"
        ? rawLink
        : btn.page_slug
          ? `/${btn.page_slug}`
          : "#";

    // Show a download icon for PDF / download / brochure buttons.
    const isDownload =
      btn.tab_type === "pdf" ||
      /\.pdf($|\?)/i.test(rawLink) ||
      /download|brochure/i.test(btn.label || "");

    const wrapClass = `inst-cta-link-wrap${fullWidth ? " w-full" : ""}`;
    const btnClass = `inst-cta-btn${fullWidth ? " w-full" : ""}`;

    const buttonEl = (
      <button className={btnClass}>
        {btn.label}
        {isDownload && <Download className="w-5 h-5 shrink-0" />}
      </button>
    );

    if (isExternal) {
      return (
        <a
          key={index}
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className={wrapClass}
        >
          {buttonEl}
        </a>
      );
    }

    return (
      <Link key={index} to={path} className={wrapClass}>
        {buttonEl}
      </Link>
    );
  };

  return (
    <div className="inst-cta-wrap py-20">
      <div className={gridClass}>
        {mainButtons.map((btn, i) => renderButton(btn, i, gridFullWidth))}
      </div>

      {tailButtons.length > 0 && (
        <div
          className={`inst-cta-tail${
            gridFullWidth ? " w-full max-w-md mx-auto" : ""
          }`}
        >
          {tailButtons.map((btn, i) =>
            renderButton(btn, mainButtons.length + i, gridFullWidth),
          )}
        </div>
      )}
    </div>
  );
}