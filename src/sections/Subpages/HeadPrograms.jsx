import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Search, X, GraduationCap } from "lucide-react";
import { useMedicineProgramsData } from "../../hooks/useMedicineProgramsData";
import { renderIcon } from "../../utils/renderIcon";
import { CardSkeletonGrid } from "../../components/Skeletons/CardSkeleton";

/**
 * Medicine / HeadPrograms page.
 *
 * One API call → `/api/programs/{slug}`.
 *   - Outer `.main-tabs` are generated from `institutes[].page_slug`
 *     (e.g. JNMC, DMMC). Selecting one drives everything below.
 *   - Sub-tabs (UG / PG / Fellowship …) come from the selected
 *     institute's `tabs` array.
 *   - Programs live inside each tab — no flat list, no extra API call.
 */
const Medicine = ({ slug: slugProp }) => {
  // Slug comes from /programs/:slug route; prop is a fallback for direct use.
  const { slug: slugParam } = useParams();
  const slug = slugParam || slugProp || "medicine";

  const { institutes, settings, loading, error } = useMedicineProgramsData(slug);

  // ---------- UI state ----------
  const [activeInstIndex, setActiveInstIndex] = useState(0);
  const [activeSubTabIndex, setActiveSubTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Reset everything when the page slug changes (e.g. medicine → dental)
  useEffect(() => {
    setActiveInstIndex(0);
    setActiveSubTabIndex(0);
    setSearchQuery("");
  }, [slug]);

  // Reset sub-tab when the main (institute) tab changes
  useEffect(() => {
    setActiveSubTabIndex(0);
    setSearchQuery("");
  }, [activeInstIndex]);

  // ---------- Derived data ----------
  const currentInstitute = institutes[activeInstIndex];
  const subTabs = currentInstitute?.tabs || [];
  const currentSubTab = subTabs[activeSubTabIndex];

  const filteredPrograms = useMemo(() => {
    const programs = currentSubTab?.programs || [];
    if (!searchQuery) return programs;
    const q = searchQuery.toLowerCase();
    return programs.filter((p) => (p.title || "").toLowerCase().includes(q));
  }, [currentSubTab, searchQuery]);

  // ---------- Loading ----------
  if (loading) {
    return (
      <section className="streams-wrapper">
        <div className="container py-8">
          <div
            className="skeleton"
            style={{ width: "40%", height: 32, marginBottom: 24 }}
          />
          <CardSkeletonGrid count={6} />
        </div>
      </section>
    );
  }

  // ---------- Error ----------
  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  // ---------- Empty ----------
  if (!institutes.length) {
    return (
      <div className="text-center py-20">
        <GraduationCap size={60} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">
          No Programs Available
        </h3>
      </div>
    );
  }

  return (
    <section className="streams-wrapper">
      <div className="container py-8">
        {/* ================= MAIN TABS (jnmc, dmmc, …) ================= */}
        {institutes.length > 0 && (
          <div className="mb-6 mx-auto">
            <ul
              id="main-tabs"
              className="main-tabs relative flex items-center font-oswald-medium justify-center gap-[8%] border-b my-8 w-fit m-auto max-sm:flex-col"
              role="tablist"
              aria-label="College tabs"
            >
              {institutes.map((inst, index) => {
                const isActive = activeInstIndex === index;
                return (
                  <li
                    key={inst.page_slug}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={0}
                    data-slug={inst.page_slug}
                    onClick={() => setActiveInstIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveInstIndex(index);
                      }
                    }}
                    className={`cursor-pointer text-center text-2xl py-4 max-w-[500px] uppercase ${
                      isActive
                        ? "font-[500] text-[#122E5E] border-b-4 border-[#F04E30]"
                        : "text-[#58595B]"
                    }`}
                  >
                    {inst.page_slug}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* ================= SEARCH ================= */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={settings.search_placeholder || "Search programs..."}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* ================= SUB-TABS (UG / PG / Fellowship …) ================= */}
        {subTabs.length > 1 && (
          <div className="mb-6 mx-auto">
            <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-1 sm:p-2">
              <div
                className="grid gap-2 relative"
                style={{
                  gridTemplateColumns: `repeat(${subTabs.length}, minmax(0, 1fr))`,
                }}
              >
                <div
                  className="absolute top-0 bottom-0 bg-[#F04E30] rounded-lg sm:rounded-xl transition-all duration-300 ease-in-out shadow-md z-0"
                  style={{
                    left: `calc(${
                      activeSubTabIndex * (100 / subTabs.length)
                    }%)`,
                    width: `${100 / subTabs.length}%`,
                  }}
                />
                {subTabs.map((tab, index) => {
                  const isActive = activeSubTabIndex === index;
                  return (
                    <button
                      key={tab.tab_id}
                      onClick={() => setActiveSubTabIndex(index)}
                      className={`relative z-10 flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-medium min-h-[50px] sm:min-h-[60px] transition-all duration-300 w-full ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 hover:text-white hover:bg-[#122E5E]"
                      }`}
                    >
                      {renderIcon(
                        tab.icon,
                        18,
                        "sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0"
                      )}
                      <span className="text-xs sm:text-sm lg:text-base text-center leading-tight font-medium">
                        {tab.tab_label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= PROGRAMS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program, index) => (
            <div
              key={`${program.title}-${index}`}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="mb-3">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {program.title}
                    </h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full whitespace-nowrap">
                      {program.duration || "N/A"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {program.description || "Program details not available."}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <p className="text-sm font-medium text-blue-800">
                    {program.college_name}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Eligibility
                  </p>
                  <p className="text-sm text-gray-600">
                    {program.eligibility ||
                      "Contact the college for eligibility details."}
                  </p>
                </div>

                <button className="w-full bg-[#F04E30] text-white py-2.5 rounded-lg hover:bg-[#122E5E] transition-all duration-300 mt-auto">
                  {settings.apply_label || "Apply Now"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= EMPTY STATE ================= */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap
              size={60}
              className="mx-auto text-gray-300 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-600">
              No Programs Found
            </h3>
            {searchQuery && (
              <p className="text-gray-400 mt-2">Try a different search term</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Medicine;
