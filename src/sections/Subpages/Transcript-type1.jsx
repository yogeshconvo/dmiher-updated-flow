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
  const params = useParams();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const pageSlug = params.college || propCollege || pathSegments[0];
  const ctaKey = params.page || pathSegments[1];

  const { sections, loading, error } = useMicropageData(
    pageSlug,
    ctaKey,
    propData
  );

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCourse, setHoveredCourse] = useState(null);

  const transformedData = React.useMemo(() => {
    const sectionData = propData ? propData : sections?.[0]?.data || {};

    if (Array.isArray(sectionData?.departments)) {
      return {
        title: sectionData.title || "Transcript",
        departments: sectionData.departments,
        top_ui: sectionData.top_ui || { type: "dropdown" },
      };
    }

    const tabType = sectionData?.tab_type;
    const title = sectionData?.title || "Transcript";

    const mapCourse = (c, i) => ({
      srNo: i + 1,
      name: c.title,
      semester: c.roman_number,
      course_number: c.course_number,
      roman_number: c.roman_number,
      university: c.university,
      // Per-institute provider label ("Powered by" default; SPDC PG uses
      // "Certified by"). Course-level overrides the section-level default.
      university_label: c.university_label || sectionData.university_label,
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

  useEffect(() => {
    if (loading) return;

    if (transformedData.departments.length > 0) {
      setSelectedDept(transformedData.departments[0].name);
    }
    if (transformedData.top_ui?.categories?.length > 0) {
      setSelectedCategory(transformedData.top_ui.categories[0]);
    }
  }, [transformedData, loading]);

  const renderCourses = useCallback(
    (courses = []) => {
      if (courses.length === 0) {
        return (
          <p className="course-empty">
            No courses available
          </p>
        );
      }

      return (
        <section className="courses-section">
          <div className="courses-wrapper">
            <div className="course-grid">
              {courses.map((course, i) => {
                const IconComponent = resolveIcon(course.icon);
                const cardKey = course.srNo ?? i;

                return (
                  <div
                    key={cardKey}
                    className="course-card group"
                    onMouseEnter={() => setHoveredCourse(cardKey)}
                    onMouseLeave={() => setHoveredCourse(null)}
                  >
                    {/* Header */}
                    <div className="course-card-header">
                      <div className="course-card-header-row">
                        <div className="course-card-header-left">
                          <div className="course-card-icon-wrap">
                            <IconComponent className="course-card-icon" />
                          </div>
                          <div>
                            {course.course_number && (
                              <div className="course-card-num">
                                Course #{course.course_number}
                              </div>
                            )}
                            {course.badge && (
                              <div className="course-card-mini-badge">
                                {course.badge}
                              </div>
                            )}
                          </div>
                        </div>
                        {course.roman_number && (
                          <div className="course-card-roman">
                            <span className="course-card-roman-text">
                              {course.roman_number}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="course-card-body">
                      {course.name && (
                        <h3 className="course-card-name group-hover:text-[#F04E30]">
                          {course.name}
                        </h3>
                      )}

                      {course.university && (
                        <div className="course-card-univ-row">
                          <div className="course-card-univ-inner">
                            <div className="course-card-univ-icon-wrap">
                              <Building2 className="course-card-univ-icon" />
                            </div>
                            <div>
                              <p className="course-card-univ-label">
                                {course.university_label || "Powered by"}
                              </p>
                              <p className="course-card-univ-name">
                                {course.university}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {course.badge && (
                        <div className="course-card-badge-row">
                          <div className="course-card-badge group-hover:from-[#F04E30]/10 group-hover:to-[#122E5E]/10">
                            <Star className="course-card-badge-icon" />
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

  if (loading) {
    return (
      <div className="sub-loading-wrap">
        <div className="sub-loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sub-error">{error}</div>
    );
  }

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
          <p className="course-empty-text">No courses available</p>
        )}
      </div>
    </div>
  );
}

export default Transcript;
