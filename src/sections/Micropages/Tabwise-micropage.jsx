import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../../config/api";

/**
 * TabWiseMicroPage / TabMenu — pure navigation strip.
 *
 * URL contract: /:college/:page  (e.g. /about/executive)
 * The second path segment (`params.page`) is the active tab key.
 *
 * Each tab entry defines its key via `page_slug`. Clicking a tab
 * navigates to /{college}/{page_slug}. PageView then fetches that
 * micropage and renders its sections (`micro_page`, etc.) — TabMenu
 * never fetches or renders content itself, so the body never
 * duplicates the page sections rendered by PageView.
 */
const TabMenu = ({ data }) => {
  const tabs = data?.tabs || [];
  const params = useParams();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null);

  /* ===== ALL SLUGS (top-level + dropdown children) ===== */
  const allSlugs = useMemo(() => {
    const slugs = [];
    for (const tab of tabs) {
      if (tab.type === "page" && tab.page_slug) slugs.push(tab.page_slug);
      if (tab.type === "dropdown") {
        (tab.items || []).forEach((it) => {
          if (it.page_slug) slugs.push(it.page_slug);
        });
      }
    }
    return slugs;
  }, [tabs]);

  /* ===== ACTIVE TAB — from URL, with fallback to first tab ===== */
  const activeTab = useMemo(() => {
    const urlSlug = params.page;
    if (urlSlug && allSlugs.includes(urlSlug)) return urlSlug;
    return allSlugs[0] || null;
  }, [params.page, allSlugs]);

  /* ===== BASE PATH — /{college} ===== */
  const basePath = params.college ? `/${params.college}` : "";

  /* ===== TAB CLICK → NAVIGATE URL ===== */
  const handleTabClick = (tab, index) => {
    if (tab.type === "page" && tab.page_slug) {
      setOpenDropdown(null);
      // Don't navigate if we're already there — saves a no-op URL change
      if (tab.page_slug !== params.page) {
        navigate(`${basePath}/${tab.page_slug}`);
      }
      return;
    }

    if (tab.type === "pdf" && tab.pdf) {
      window.open(`${API_BASE}/${tab.pdf}`, "_blank");
      return;
    }

    if (tab.type === "dropdown") {
      setOpenDropdown(openDropdown === index ? null : index);
    }
  };

  /* ===== DROPDOWN ITEM CLICK ===== */
  const handleDropdownItem = (item) => {
    setOpenDropdown(null);

    if (item.type === "pdf" && item.pdf) {
      window.open(`${API_BASE}/${item.pdf}`, "_blank");
      return;
    }

    if (item.page_slug && item.page_slug !== params.page) {
      navigate(`${basePath}/${item.page_slug}`);
    }
  };

  /* ===== ACTIVE CHECK ===== */
  const isTabActive = (tab) => {
    if (tab.type === "page") return activeTab === tab.page_slug;
    if (tab.type === "dropdown")
      return tab.items?.some((item) => item.page_slug === activeTab);
    return false;
  };

  if (!tabs.length) return null;

  return (
    <div className="flex flex-wrap gap-2 shadow-lg pb-2 mb-6 px-4 justify-center mt-2">
      {tabs.map((tab, i) => {
        if (!tab.title) return null;

        return (
          <div key={i} className="relative">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                isTabActive(tab)
                  ? "bg-[#F04E30] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-[#112a62] hover:text-white"
              }`}
              onClick={() => handleTabClick(tab, i)}
            >
              {tab.title}
              {tab.type === "dropdown" && (
                <span className="ml-1 text-xs">▾</span>
              )}
            </button>

            {/* ===== DROPDOWN PANEL ===== */}
            {tab.type === "dropdown" && openDropdown === i && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white border rounded shadow-lg z-50">
                {tab.items?.map((item, j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => handleDropdownItem(item)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      activeTab === item.page_slug
                        ? "bg-orange-50 text-[#F04E30] font-semibold"
                        : ""
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TabMenu;
