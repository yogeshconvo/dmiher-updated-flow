import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import TopUI from "../../components/TranscriptTopUI";

function TranscriptFEAT() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 🔥 API CALL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/pages/jnmc/transcript"
        );
        const json = await res.json();

        const section =
          json?.sections?.[0]?.data?.section?.[0];

        // 🎯 Transform API → UI format
        const transformed = {
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
          top_ui: null, // later dynamic kar sakte ho
        };

        setData(transformed);

        // 🎯 Set defaults AFTER data load
        setSelectedDept(transformed.departments[0]?.name);
        setSelectedCategory(
          transformed.top_ui?.categories?.[0] || null
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🟡 Loading UI
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading...
      </div>
    );
  }

  // 🔴 Error UI
  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  const { title, departments = [], top_ui } = data || {};

  // 🎯 Filter Logic
  const visibleDepartments =
    top_ui?.type === "dropdown"
      ? departments.filter((d) => d.name === selectedDept)
      : top_ui?.type === "category"
      ? departments.filter((d) => d.category === selectedCategory)
      : departments;

  // 🎯 Courses Renderer
  const renderCourses = (courses = []) => (
    <section className="courses-section">
      <div className="courses-wrapper">
        <div className="courses-grid">
          {courses.map((course) => (
            <div
              key={`${course.srNo}-${course.name}`}
              className="course-card"
            >
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

  return (
    <div className="transcript-page">
      {/* Header */}
      <header className="transcript-header">
        <h1 className="transcript-title">{title}</h1>
      </header>

      <div className="transcript-content">
        {/* Top UI */}
        <TopUI
          topUI={top_ui}
          departments={departments}
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Courses */}
        {visibleDepartments.length > 0 ? (
          visibleDepartments.map((dept) => (
            <div key={dept.id}>
              {renderCourses(dept.electives)}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No courses available
          </p>
        )}
      </div>
    </div>
  );
}

export default TranscriptFEAT;