import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Search, X, GraduationCap } from "lucide-react";
import { useProgramsData } from "../../hooks/useProgramsData";
import { renderIcon } from "../../utils/renderIcon";
import { CardSkeletonGrid } from "../../components/Skeletons/CardSkeleton";

const SubPrograms = () => {
  const { college, category, slug } = useParams();
  const resolvedSlug = college || slug;

  const {
    institutes,
    programs,
    settings,
    loading,
    error,
  } = useProgramsData(resolvedSlug);

  const [activeInstitute, setActiveInstitute] = useState("");
  const [activeInstIndex, setActiveInstIndex] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState("");
  const [activeSubTabIndex, setActiveSubTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (institutes.length > 0 && !activeInstitute) {
      setActiveInstitute(institutes[0].page_slug);
      setActiveInstIndex(0);
    }
  }, [institutes]);

  const currentInstitute = institutes.find(
    (inst) => inst.page_slug === activeInstitute
  );
  const subTabs = currentInstitute?.tabs || [];

  useEffect(() => {
    if (subTabs.length === 0) return;

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

    setActiveSubTab(subTabs[0].tab_id);
    setActiveSubTabIndex(0);
  }, [activeInstitute, subTabs.length, category]);

  const handleInstituteChange = (instSlug, index) => {
    setActiveInstitute(instSlug);
    setActiveInstIndex(index);
  };

  const handleSubTabChange = (tabId, index) => {
    setActiveSubTab(tabId);
    setActiveSubTabIndex(index);
  };

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

  if (error) {
    return <div className="sub-error">{error}</div>;
  }

  if (!institutes.length && !programs.length) {
    return (
      <div className="sub-empty">
        <GraduationCap size={60} className="sub-empty-icon" />
        <h3 className="sub-empty-title">No Programs Available</h3>
      </div>
    );
  }

  return (
    <section className="streams-wrapper">
      <div className="container py-8">

        {/* ================= INSTITUTE TABS ================= */}
        {institutes.length > 1 && (
          <div className="subprog-tabs-wrap">
            <div className="subprog-tabs-card">
              <div
                className="subprog-tabs-grid"
                style={{
                  gridTemplateColumns: `repeat(${institutes.length}, minmax(0, 1fr))`,
                }}
              >
                <div
                  className="subprog-tabs-indicator subprog-tabs-indicator-blue"
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
                      className={`subprog-inst-tab ${
                        isActive
                          ? "subprog-inst-tab-active"
                          : "subprog-inst-tab-inactive"
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
              <button onClick={() => setSearchQuery("")} className="subprog-search-clear">
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* ================= SUB-TABS ================= */}
        {subTabs.length > 1 && (
          <div className="subprog-tabs-wrap">
            <div className="subprog-tabs-card">
              <div className="subprog-subtab-mobile-wrap">
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
                    const isActive = activeSubTab === tab.tab_id;
                    return (
                      <button
                        key={tab.tab_id}
                        onClick={() => handleSubTabChange(tab.tab_id, index)}
                        className={`subprog-subtab ${
                          isActive
                            ? "subprog-subtab-active"
                            : "subprog-subtab-inactive"
                        }`}
                      >
                        {renderIcon(tab.icon, 18, "sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0")}
                        <span className="subprog-subtab-label">
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
        <div className="subprog-grid">
          {filteredPrograms.map((program, index) => (
            <div
              key={`${program.title}-${index}`}
              className="subprog-card group"
            >
              <div className="subprog-card-inner">
                <div className="subprog-card-header">
                  <div className="subprog-card-title-row">
                    <h3 className="subprog-card-title">{program.title}</h3>
                    <span className="subprog-card-badge">
                      {program.duration || "N/A"}
                    </span>
                  </div>
                  <p className="subprog-card-desc">
                    {program.description || "Program details not available."}
                  </p>
                </div>

                <div className="subprog-card-college">
                  <p className="subprog-card-college-text">{program.college_name}</p>
                </div>

                <div className="subprog-card-elig">
                  <p className="subprog-card-elig-label">Eligibility</p>
                  <p className="subprog-card-elig-text">
                    {program.eligibility || "Contact the college for eligibility details."}
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
            <GraduationCap size={60} className="sub-empty-icon" />
            <h3 className="sub-empty-title">No Programs Found</h3>
            {searchQuery && <p className="subprog-empty-hint">Try a different search term</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubPrograms;
