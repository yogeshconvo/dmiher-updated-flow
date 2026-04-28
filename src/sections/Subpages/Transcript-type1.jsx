import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, Building2, Star, GraduationCap, Award } from "lucide-react";
import TopUI from "../../components/TranscriptTopUI";
import { useParams, useLocation } from "react-router-dom";
import { useMicropageData } from "../../hooks/useMicropageData";

const ICON_MAP = {
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  "book": BookOpen,
  "award": Award,
  "star": Star,
};

const resolveIcon = (name) => ICON_MAP[name] || BookOpen;

function Transcript({ data: propData, college: propCollege }) {
  // ---------- Derive slugs from URL ----------
  const params = useParams();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const pageSlug = params.college || propCollege || pathSegments[0];
  const ctaKey = params.page || pathSegments[1];

  // ---------- Fetch data via reusable hook ----------
  const { sections, loading, error } = useMicropageData(
    pageSlug,
    ctaKey,
    propData
  );

  // ---------- Local UI state ----------
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCourse, setHoveredCourse] = useState(null);

  // ---------- Transform raw API/prop data → UI format ----------
  const transformedData = React.useMemo(() => {
    // When rendered via PageView → propData IS section data directly
    // When self-fetched         → sections[0].data holds section data
    const sectionData = propData ? propData : sections?.[0]?.data || {};

    // ── Legacy shape: { title, top_ui, departments } ──
    if (Array.isArray(sectionData?.departments)) {
      return {
        title: sectionData.title || "Transcript",
        departments: sectionData.departments,
        top_ui: sectionData.top_ui || { type: "dropdown" },
      };
    }

    // ── New shape: { tab_type, categories, courses_normal, courses_category } ──
    const tabType = sectionData?.tab_type;
    const title = sectionData?.title || "Transcript";

    const mapCourse = (c, i) => ({
      srNo: i + 1,
      name: c.title,
      semester: c.roman_number,
      course_number: c.course_number,
      roman_number: c.roman_number,
      university: c.university,
      badge: c.badge,
      icon: c.icon,
    });

    if (tabType === "categories") {
      const categories = Array.isArray(sectionData.categories)
        ? sectionData.categories
        : [];
      const coursesCategory = Array.isArray(sectionData.courses_category)
        ? sectionData.courses_category
        : [];

      const departments = categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        category: cat.name,
        electives: coursesCategory
          .filter((c) => c.category_id === cat.id)
          .map(mapCourse),
      }));

      return {
        title,
        departments,
        top_ui: {
          type: "category",
          title: sectionData?.top_ui_title || "",
          subtitle: sectionData?.top_ui_subtitle || "",
          categories: categories.map((c) => c.name),
        },
      };
    }

    // tab_type === "normal" (default)
    const coursesNormalRaw = Array.isArray(sectionData.courses_normal)
      ? sectionData.courses_normal
      : [];
    const coursesNormal = coursesNormalRaw.flat();

    return {
      title,
      departments: [
        {
          id: "general",
          name: "General",
          category: "All",
          electives: coursesNormal.map(mapCourse),
        },
      ],
      top_ui: {
        type: "heading",
        title: sectionData?.top_ui_title || "",
        subtitle: sectionData?.top_ui_subtitle || "",
      },
    };
  }, [propData, sections]);

  // ---------- Apply defaults when data changes ----------
  useEffect(() => {
    if (loading) return;

    if (transformedData.departments.length > 0) {
      setSelectedDept(transformedData.departments[0].name);
    }
    if (transformedData.top_ui?.categories?.length > 0) {
      setSelectedCategory(transformedData.top_ui.categories[0]);
    }
  }, [transformedData, loading]);

  // ---------- Courses renderer (hook BEFORE early returns) ----------
  const renderCourses = useCallback(
    (courses = []) => {
      if (courses.length === 0) {
        return (
          <p className="text-center text-gray-500 py-8">
            No courses available
          </p>
        );
      }

      return (
        <section className="courses-section">
          <div className="courses-wrapper">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course, i) => {
                const IconComponent = resolveIcon(course.icon);
                const cardKey = course.srNo ?? i;

                return (
                  <div
                    key={cardKey}
                    className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden"
                    onMouseEnter={() => setHoveredCourse(cardKey)}
                    onMouseLeave={() => setHoveredCourse(null)}
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r bg-[#122E5E] hover:bg-[#F04E30] cursor-pointer p-6 text-white relative overflow-hidden">
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-white/20 p-3 rounded-full mr-4">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            {course.course_number && (
                              <div className="text-sm font-medium opacity-90">
                                Course #{course.course_number}
                              </div>
                            )}
                            {course.badge && (
                              <div className="text-xs opacity-75">
                                {course.badge}
                              </div>
                            )}
                          </div>
                        </div>
                        {course.roman_number && (
                          <div className="bg-white/20 rounded-full px-3 py-1">
                            <span className="text-xs font-bold">
                              {course.roman_number}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {course.name && (
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#F04E30] transition-colors duration-300 leading-tight">
                          {course.name}
                        </h3>
                      )}

                      {course.university && (
                        <div className="mb-4">
                          <div className="flex items-start">
                            <div className="bg-[#F04E30]/10 p-2 rounded-lg mr-3 mt-1">
                              <Building2 className="h-4 w-4 text-[#F04E30]" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 font-medium mb-1">
                                Powered by
                              </p>
                              <p className="text-gray-700 font-semibold leading-relaxed">
                                {course.university}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {course.badge && (
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-sm font-medium text-gray-700 group-hover:from-[#F04E30]/10 group-hover:to-[#122E5E]/10 transition-all duration-300">
                            <Star className="h-3 w-3 mr-2 text-[#F04E30]" />
                            {course.badge}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    },
    [hoveredCourse]
  );

  // ---------- Loading ----------
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // ---------- Error ----------
  if (error) {
    return (
      <div className="text-center py-20 text-red-500">{error}</div>
    );
  }

  // ---------- Render ----------
  const { title, departments = [], top_ui } = transformedData;

  const visibleDepartments =
    top_ui?.type === "dropdown"
      ? departments.filter((d) => d.name === selectedDept)
      : top_ui?.type === "category"
      ? departments.filter((d) => d.category === selectedCategory)
      : departments;

  return (
    <div className="transcript-page">
      {/* Header */}
      <header className="transcript-header">
        <h1 className="transcript-title">{title}</h1>
      </header>

      <div className="transcript-content">
        <TopUI
          topUI={top_ui}
          departments={departments}
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {visibleDepartments.length > 0 ? (
          visibleDepartments.map((dept) => (
            <div key={dept.id}>{renderCourses(dept.electives)}</div>
          ))
        ) : (
          <p className="text-center text-gray-500">No courses available</p>
        )}
      </div>
    </div>
  );
}

export default Transcript;
