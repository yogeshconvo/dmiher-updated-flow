import React, { useEffect, useState } from "react";
import api, { API_BASE } from "../../config/api";
import HelperTabwisePage from "./HelperTabwisePage";

const TabMenu = ({ data }) => {
  const tabs = data?.tabs || [];
  const [activeTab, setActiveTab] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===== FETCH PAGE (pages API → fallback to independent-pages) =====
     Use the configured axios `api` so X-API-KEY auth header is sent. */
  const fetchPage = async (slug) => {
    try {
      const { data } = await api.get(`/pages/${slug}`);
      return data;
    } catch {
      try {
        const { data } = await api.get(`/independent-pages/${slug}`);
        return data;
      } catch (err) {
        console.error("Page fetch failed:", err);
        return null;
      }
    }
  };

  /* ===== ACTIVATE SLUG — load and show, no auto-skip ===== */
  const activateSlug = async (slug) => {
    setLoading(true);
    setActiveTab(slug);
    const json = await fetchPage(slug);
    setPageData(json || null);
    setLoading(false);
  };

  /* ===== INIT — load first page-type tab on mount ===== */
  useEffect(() => {
    if (tabs.length === 0) return;

    // Find the first tab that has a page_slug (top-level or nested in dropdown)
    let firstSlug = null;
    for (const tab of tabs) {
      if (tab.type === "page" && tab.page_slug) {
        firstSlug = tab.page_slug;
        break;
      }
      if (tab.type === "dropdown") {
        const child = tab.items?.find((it) => it.page_slug);
        if (child) {
          firstSlug = child.page_slug;
          break;
        }
      }
    }

    if (firstSlug) activateSlug(firstSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs.length]);

  /* ===== TAB CLICK ===== */
  const handleTabClick = (tab, index) => {
    if (tab.type === "page" && tab.page_slug) {
      setOpenDropdown(null);
      setLoading(true);
      setActiveTab(tab.page_slug);
      fetchPage(tab.page_slug).then((json) => {
        setLoading(false);
        setPageData(json || null);
      });
    }

    if (tab.type === "pdf" && tab.pdf) {
      window.open(
        `${API_BASE}/${tab.pdf}`,
        "_blank",
      );
    }

    if (tab.type === "dropdown") {
      setOpenDropdown(openDropdown === index ? null : index);
    }
  };

  /* ===== DROPDOWN ITEM CLICK ===== */
  const handleDropdownItem = (item) => {
    setOpenDropdown(null);

    if (item.type === "pdf" && item.pdf) {
      window.open(
        `${API_BASE}/${item.pdf}`,
        "_blank",
      );
      return;
    }

    if (item.page_slug) {
      setActiveTab(item.page_slug);
      setLoading(true);
      fetchPage(item.page_slug).then((json) => {
        setLoading(false);
        setPageData(json || null);
      });
    }
  };

  /* ===== ACTIVE CHECK — highlights dropdown parent if child is active ===== */
  const isTabActive = (tab) => {
    if (tab.type === "page") return activeTab === tab.page_slug;
    if (tab.type === "dropdown")
      return tab.items?.some((item) => item.page_slug === activeTab);
    return false;
  };

  return (
    <div>
      {/* ===== TAB BAR ===== */}
      <div className="flex flex-wrap gap-2 shadow-lg  pb-2 mb-6 px-4 justify-center mt-2">
        {tabs.map((tab, i) => {
          if (!tab.title) return null;

          return (
            <div key={i} className="relative">
              <button
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

      {/* ===== CONTENT ===== */}
      <div className="px-4">
        {loading && <div>Loading tab content...</div>}
        {!loading && pageData && <HelperTabwisePage data={pageData} />}
        {!loading && !pageData && <div>No content available</div>}
      </div>
    </div>
  );
};

export default TabMenu;
