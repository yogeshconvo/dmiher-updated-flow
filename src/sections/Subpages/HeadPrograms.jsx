import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Search, X, GraduationCap } from "lucide-react";
import { useMedicineProgramsData } from "../../hooks/useMedicineProgramsData";
import { renderIcon } from "../../utils/renderIcon";
import { CardSkeletonGrid } from "../../components/Skeletons/CardSkeleton";

const Medicine = ({ slug: slugProp }) => {
  const { slug: slugParam } = useParams();
  const slug = slugParam || slugProp || "medicine";

  const { institutes, settings, loading, error } = useMedicineProgramsData(slug);

  const [activeInstIndex, setActiveInstIndex] = useState(0);
  const [activeSubTabIndex, setActiveSubTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setActiveInstIndex(0);
    setActiveSubTabIndex(0);
    setSearchQuery("");
  }, [slug]);

  useEffect(() => {
    setActiveSubTabIndex(0);
    setSearchQuery("");
  }, [activeInstIndex]);

  const currentInstitute = institutes[activeInstIndex];
  const subTabs = currentInstitute?.tabs || [];
  const currentSubTab = subTabs[activeSubTabIndex];

  const filteredPrograms = useMemo(() => {
    const programs = currentSubTab?.programs || [];
    if (!searchQuery) return programs;
    const q = searchQuery.toLowerCase();
    return programs.filter((p) => (p.title || "").toLowerCase().includes(q));
  }, [currentSubTab, searchQuery]);

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

  if (error) {
    return <div className="sub-error">{error}</div>;
  }

  if (!institutes.length) {
    return (
      <div className="sub-empty">
        <GraduationCap size={60} className="sub-empty-icon" />
        <h3 className="sub-empty-title">
          No Programs Available
        </h3>
      </div>
    );
  }

  return (
    <section className="streams-wrapper">
      <div className="container py-8">
        {/* ================= MAIN TABS ================= */}
        {institutes.length > 0 && (
          <div className="subprog-tabs-wrap">
            <ul
              id="main-tabs"
              className="medicine-tabs main-tabs"
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
                    className={`medicine-tab ${
                      isActive ? "medicine-tab-active" : "medicine-tab-inactive"
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
        <div className="subprog-search-wrap">
          <div className="subprog-search-inner">
            <Search size={20} className="subprog-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={settings.search_placeholder || "Search programs..."}
              className="subprog-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="subprog-search-clear"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* ================= SUB-TABS ================= */}
        {subTabs.length > 1 && (
          <div className="subprog-tabs-wrap">
            <div className="subprog-tabs-card">
              <div
                className="subprog-tabs-grid"
                style={{
                  gridTemplateColumns: `repeat(${subTabs.length}, minmax(0, 1fr))`,
                }}
              >
                <div
                  className="subprog-tabs-indicator subprog-tabs-indicator-orange"
                  style={{
                    left: `calc(${activeSubTabIndex * (100 / subTabs.length)}%)`,
                    width: `${100 / subTabs.length}%`,
                  }}
                />
                {subTabs.map((tab, index) => {
                  const isActive = activeSubTabIndex === index;
                  return (
                    <button
                      key={tab.tab_id}
                      onClick={() => setActiveSubTabIndex(index)}
                      className={`subprog-subtab ${
                        isActive
                          ? "subprog-subtab-active"
                          : "subprog-subtab-inactive"
                      }`}
                    >
                      {renderIcon(
                        tab.icon,
                        18,
                        "sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0"
                      )}
                      <span className="subprog-subtab-label">
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
        <div className="subprog-grid">
          {filteredPrograms.map((program, index) => (
            <div
              key={`${program.title}-${index}`}
              className="subprog-card group"
            >
              <div className="subprog-card-inner">
                <div className="subprog-card-header">
                  <div className="subprog-card-title-row">
                    <h3 className="subprog-card-title">
                      {program.title}
                    </h3>
                    <span className="subprog-card-badge">
                      {program.duration || "N/A"}
                    </span>
                  </div>
                  <p className="subprog-card-desc">
                    {program.description || "Program details not available."}
                  </p>
                </div>

                <div className="subprog-card-college">
                  <p className="subprog-card-college-text">
                    {program.college_name}
                  </p>
                </div>

                <div className="subprog-card-elig">
                  <p className="subprog-card-elig-label">
                    Eligibility
                  </p>
                  <p className="subprog-card-elig-text">
                    {program.eligibility ||
                      "Contact the college for eligibility details."}
                  </p>
                </div>

                <button className="subprog-card-cta">
                  {settings.apply_label || "Apply Now"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= EMPTY STATE ================= */}
        {filteredPrograms.length === 0 && (
          <div className="subprog-empty">
            <GraduationCap
              size={60}
              className="sub-empty-icon"
            />
            <h3 className="sub-empty-title">
              No Programs Found
            </h3>
            {searchQuery && (
              <p className="subprog-empty-hint">Try a different search term</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Medicine;
