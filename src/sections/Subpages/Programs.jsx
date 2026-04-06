import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Search, X, GraduationCap } from "lucide-react";
import { useProgramsData } from "../../hooks/useProgramsData";
import { renderIcon } from "../../utils/renderIcon";
import { CardSkeletonGrid } from "../../components/Skeletons/CardSkeleton";

/**
 * SubPrograms — Programs listing page.
 *
 * ONE API call → all filtering is frontend-only.
 *
 *   /:college/programs             → show all
 *   /:college/programs/:category   → activeCategory = category (UI filter)
 */
const SubPrograms = () => {
  const { college, category, slug } = useParams();
  const resolvedSlug = college || slug;

  // ---------- Single fetch — never refetches on category change ----------
  const {
    institutes,
    programs,
    settings,
    loading,
    error,
  } = useProgramsData(resolvedSlug);

  // ---------- UI State ----------
  const [activeInstitute, setActiveInstitute] = useState("");
  const [activeInstIndex, setActiveInstIndex] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState("");
  const [activeSubTabIndex, setActiveSubTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Set default institute when data loads
  useEffect(() => {
    if (institutes.length > 0 && !activeInstitute) {
      setActiveInstitute(institutes[0].page_slug);
      setActiveInstIndex(0);
    }
  }, [institutes]);

  // Set default sub-tab when institute changes
  const currentInstitute = institutes.find(
    (inst) => inst.page_slug === activeInstitute
  );
  const subTabs = currentInstitute?.tabs || [];

  useEffect(() => {
    if (subTabs.length === 0) return;

    // If URL has a category, find the tab whose programs match that category
    if (category) {
      const matchIndex = subTabs.findIndex((tab) =>
        programs.some(
          (p) =>
            p.tab_id === tab.tab_id &&
            p.institute_slug === activeInstitute &&
            p.category === category
        )
      );

      if (matchIndex !== -1) {
        setActiveSubTab(subTabs[matchIndex].tab_id);
        setActiveSubTabIndex(matchIndex);
        return;
      }
    }

    // Default: first tab
    setActiveSubTab(subTabs[0].tab_id);
    setActiveSubTabIndex(0);
  }, [activeInstitute, subTabs.length, category]);

  // ---------- Handlers (UI only — no API calls) ----------
  const handleInstituteChange = (instSlug, index) => {
    setActiveInstitute(instSlug);
    setActiveInstIndex(index);
  };

  const handleSubTabChange = (tabId, index) => {
    setActiveSubTab(tabId);
    setActiveSubTabIndex(index);
  };

  // ---------- Icon renderer (shared utility) ----------

  // ---------- Filter programs (memoized — no unnecessary recompute) ----------
  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      if (p.institute_slug !== activeInstitute) return false;
      if (p.tab_id !== activeSubTab) return false;
      if (searchQuery) {
        return (p.title || "").toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });
  }, [programs, activeInstitute, activeSubTab, searchQuery]);

  // ---------- Loading ----------
  if (loading) {
    return (
      <section className="streams-wrapper">
        <div className="container py-8">
          <div className="skeleton" style={{ width: "40%", height: 32, marginBottom: 24 }} />
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
  if (!institutes.length && !programs.length) {
    return (
      <div className="text-center py-20">
        <LucideIcons.GraduationCap size={60} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">No Programs Available</h3>
      </div>
    );
  }

  return (
    <section className="streams-wrapper">
      <div className="container py-8">

      

        {/* ================= INSTITUTE TABS (jnmc, dmmc) ================= */}
        {institutes.length > 1 && (
          <div className="mb-6 mx-auto">
            <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-1 sm:p-2">
              <div
                className="grid gap-2 relative"
                style={{
                  gridTemplateColumns: `repeat(${institutes.length}, minmax(0, 1fr))`,
                }}
              >
                <div
                  className="absolute top-0 bottom-0 bg-[#122E5E] rounded-lg sm:rounded-xl transition-all duration-300 ease-in-out shadow-md z-0"
                  style={{
                    left: `calc(${activeInstIndex * (100 / institutes.length)}%)`,
                    width: `${100 / institutes.length}%`,
                  }}
                />

                {institutes.map((inst, index) => {
                  const isActive = activeInstitute === inst.page_slug;
                  return (
                    <button
                      key={inst.page_slug}
                      onClick={() => handleInstituteChange(inst.page_slug, index)}
                      className={`relative z-10 flex items-center justify-center px-3 py-3 lg:py-4 rounded-lg sm:rounded-xl font-semibold min-h-[50px] transition-all duration-300 w-full uppercase text-sm ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 hover:text-white hover:bg-[#F04E30]"
                      }`}
                    >
                      {inst.page_slug}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= SEARCH ================= */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={settings.search_placeholder || "Search programs..."}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* ================= SUB-TABS (UG Programs / PG Programs) ================= */}
        {subTabs.length > 1 && (
          <div className="mb-6 mx-auto">
            <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-1 sm:p-2">
              <div className="hidden sm:block">
                <div
                  className="grid gap-2 relative"
                  style={{
                    gridTemplateColumns: `repeat(${subTabs.length}, minmax(0, 1fr))`,
                  }}
                >
                  <div
                    className="absolute top-0 bottom-0 bg-[#F04E30] rounded-lg sm:rounded-xl transition-all duration-300 ease-in-out shadow-md z-0"
                    style={{
                      left: `calc(${activeSubTabIndex * (100 / subTabs.length)}%)`,
                      width: `${100 / subTabs.length}%`,
                    }}
                  />

                  {subTabs.map((tab, index) => {
                    const isActive = activeSubTab === tab.tab_id;
                    return (
                      <button
                        key={tab.tab_id}
                        onClick={() => handleSubTabChange(tab.tab_id, index)}
                        className={`relative z-10 flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-medium min-h-[50px] sm:min-h-[60px] transition-all duration-300 w-full ${
                          isActive
                            ? "text-white"
                            : "text-gray-600 hover:text-white hover:bg-[#122E5E]"
                        }`}
                      >
                        {renderIcon(tab.icon, 18, "sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0")}
                        <span className="text-xs sm:text-sm lg:text-base text-center leading-tight font-medium">
                          {tab.tab_label}
                        </span>
                      </button>
                    );
                  })}
                </div>
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
                    <h3 className="text-lg font-semibold text-gray-800">{program.title}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full whitespace-nowrap">
                      {program.duration || "N/A"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {program.description || "Program details not available."}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <p className="text-sm font-medium text-blue-800">{program.college_name}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-1">Eligibility</p>
                  <p className="text-sm text-gray-600">
                    {program.eligibility || "Contact the college for eligibility details."}
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
            <GraduationCap size={60} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No Programs Found</h3>
            {searchQuery && <p className="text-gray-400 mt-2">Try a different search term</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubPrograms;
