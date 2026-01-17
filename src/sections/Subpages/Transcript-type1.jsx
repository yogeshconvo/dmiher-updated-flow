import React, { useState } from "react";
import { BookOpen, Star, Building2 } from "lucide-react";
import TopUI from "../../components/TranscriptTopUI";

function TranscriptFEAT({ data }) {
  const { title, departments, top_ui } = data;

  const [selectedDept, setSelectedDept] = useState(
    departments?.[0]?.name
  );
  const [selectedCategory, setSelectedCategory] = useState(
    top_ui?.type === "category" ? top_ui.categories?.[0] : null
  );

  const renderCourses = (courses) => (
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
                      Semester : {course.semester}
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
   {
          top_ui?.type === "category" && (
            <section className="mb-16 text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F04E30] to-[#102B64] bg-clip-text text-transparent mb-4">
                {top_ui.title}
              </h2>

              {top_ui.subtitle && (
                <p className="text-gray-600 mb-10">{top_ui.subtitle}</p>
              )}

              <div className="flex flex-wrap justify-center gap-4">
                {top_ui.categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}   
                    className={`rounded-2xl px-6 py-3 shadow border transition
                      ${
                        selectedCategory === cat
                          ? "bg-[#102B64] text-white"
                          : "bg-white text-gray-700"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>
          )
        }

  const visibleDepartments =
    top_ui?.type === "dropdown"
      ? departments.filter((d) => d.name === selectedDept)
      : top_ui?.type === "category"
      ? departments.filter((d) => d.category === selectedCategory)
      : departments;
  

  return (
    <div className="transcript-page">
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
        {visibleDepartments.map((dept) => (
          <div key={dept.id}>
            {renderCourses(dept.electives)}
          </div>
        ))}
       
        
      </div>
    </div>
  );
}

export default TranscriptFEAT;
