import React, { useState, useEffect, useCallback } from "react";
import { BookOpen } from "lucide-react";
import TopUI from "../../components/TranscriptTopUI";
import { useParams, useLocation } from "react-router-dom";
import { useMicropageData } from "../../hooks/useMicropageData";

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

  // ---------- Transform raw API/prop data → UI format ----------
  const transformedData = React.useMemo(() => {
    // When rendered via PageView → propData IS section data directly
    // When self-fetched         → sections[0].data holds section data
    const sectionData = propData
      ? propData
      : sections?.[0]?.data || {};

    const section = sectionData?.section?.[0] || {};

    return {
      title: section?.title || "Transcript",
      departments: [
        {
          id: 1,
          name: "General",
          category: "All",
          electives:
            section?.courses_normal?.map((c, i) => ({
              srNo: i + 1,
              name: c.title,
              semester: c.roman_number,
            })) || [],
        },
      ],
      top_ui: {
        type: "dropdown",
        categories: ["All"],
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
  const renderCourses = useCallback((courses = []) => {
    return (
      <section className="courses-section">
        <div className="courses-wrapper">
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.srNo} className="course-card">
                <div className="course-card-header">
                  <div className="course-header-left">
                    <div className="course-header-icon">
                      <BookOpen />
                    </div>
                    <div>
                      <div className="course-number">
                        Elective #{course.srNo}
                      </div>
                      <div className="course-sem">
                        Semester: {course.semester}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="course-card-body">
                  <h3 className="course-title">{course.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }, []);

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
