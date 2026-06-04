import React from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * MicroPageTabLink — shared tab strip for dependent (micro) pages.
 *
 * API section shape (section_id: "micro_page_tab_link"):
 *   data: {
 *     basic: { menu_name: "IQAC Menu" },
 *     tabs:  [ { title, cta_key }, ... ]
 *   }
 *
 * Each tab points to a sibling micro page via cta_key. The backend prepends
 * this section to every page the menu links to, so the same strip shows on all
 * of them. Clicking a tab navigates to /{college}/{cta_key}; the tab matching
 * the current URL is highlighted.
 */
const MicroPageTabLink = ({ data, college }) => {
  const params = useParams();
  const navigate = useNavigate();

  const tabs = Array.isArray(data?.tabs) ? data.tabs : [];
  if (!tabs.length) return null;

  // Base path = /{college}; the active tab key comes from the current URL.
  const base = college || params.college || params.slug || "";
  const activeKey = params.page;

  const go = (ctaKey) => {
    if (!ctaKey || ctaKey === activeKey) return;
    navigate(`/${base}/${ctaKey}`);
  };

  return (
    <div className="tabwise-tabs" style={{ borderBottom: "1px solid #e5e7eb" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "1rem",
        }}
      >
        {tabs.map((tab, i) => {
          const label = tab.title || tab.cta_key;
          if (!label) return null;

          const isActive = tab.cta_key === activeKey;

          return (
            <button
              key={i}
              type="button"
              onClick={() => go(tab.cta_key)}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                isActive
                  ? "bg-[#F04E30] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-[#112a62] hover:text-white"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MicroPageTabLink;
