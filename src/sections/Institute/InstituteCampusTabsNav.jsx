import React from "react";
import { Link, useLocation } from "react-router-dom";

/*
 * InstituteCampusTabsNav
 * ----------------------
 * Renders campus-switch tabs for multi-campus institutes.
 * Tab styling auto-adapts based on tab count to match live site:
 *   - 2 tabs (SAHS Wardha/Nagpur)     → text-lg md:text-2xl, max-w-[800px], gap-[15%], font-bold active
 *   - 3+ tabs (Nursing SRMMCON/W/N)   → text-xl,             max-w-[440px], gap-[8%],  font-[500] active
 *
 * Section key: institute_campus_tabs_nav (unique, no collision with tab_group_section)
 * Data shape:  { tabs: [{ label, page_slug }, ...] }
 *
 * Active tab matched against first path segment of current URL (case-insensitive).
 */
function InstituteCampusTabsNav({ data }) {
  const { pathname } = useLocation();

  const tabs = Array.isArray(data?.tabs) ? data.tabs : [];
  if (!tabs.length) return null;

  // Live-site variants — adapt by tab count
  const isMulti = tabs.length >= 3;
  const gapClass     = isMulti ? "gap-[4%] md:gap-[8%]"  : "gap-[8%] md:gap-[15%]";
  const textSize     = isMulti ? "text-lg md:text-xl"    : "text-lg md:text-2xl";
  const maxWidth     = isMulti ? "max-w-[440px]"         : "max-w-[800px]";
  const activeWeight = isMulti ? "font-[500]"            : "font-bold";

  // Extract first path segment (e.g. "/sahs-wardha/foo" → "sahs-wardha")
  const currentSlug = pathname.split("/").filter(Boolean)[0]?.toLowerCase() || "";

  return (
    <ul
      className={`container flex items-center font-oswald-medium justify-center ${gapClass} border-b my-8 w-fit m-auto max-sm:flex-col max-sm:gap-0 max-sm:border-b-0`}
    >
      {tabs.map((tab, idx) => {
        const slug = (tab.page_slug || "").toLowerCase();
        const isActive = slug === currentSlug;
        return (
          <li
            key={idx}
            className={`cursor-pointer text-center ${textSize} py-4 ${maxWidth} max-sm:w-full max-sm:border-b ${
              isActive
                ? `${activeWeight} text-[#122E5E] border-b-4 border-[#F04E30]`
                : "text-[#58595B]"
            }`}
          >
            <Link to={`/${tab.page_slug}`} className="block w-full h-full px-2">
              {tab.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default InstituteCampusTabsNav;
