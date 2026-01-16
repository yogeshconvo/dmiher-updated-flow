
import React, { useState } from "react";
import {
  BookOpen,
  Star,
  Building2,
  ChevronDown,
} from "lucide-react";

function TranscriptFEAT({ data }) {


  const { title, departments } = data;

  const [selectedDept, setSelectedDept] = useState(
    departments?.[0]?.name
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const renderCourses = (courses) => (
    <section className="courses-section">
      <div className="courses-wrapper">
        <div className="courses-grid">
          {courses.map((course) => (
            <div
              key={`${course.id}-${course.name}`}
              className="course-card"
            >
              {/* Header */}
              <div className="course-card-header">
                <div className="course-header-left">
                  <div className="course-header-icon">
                    <BookOpen />
                  </div>
                  <div>
                    <div className="course-number">
                      Course #{course.id}
                    </div>
                    <div className="course-sem">
                      {course.sem && `Semester : ${course.sem}`}
                      {course.year && `Year : ${course.year}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="course-card-body">
                <h3 className="course-title">
                  {course.name}
                </h3>

                <div className="course-university">
                  <div className="university-icon">
                    <Building2 />
                  </div>
                  <div>
                    <span className="powered-by">
                      Powered by
                    </span>
                    <p>{course.university}</p>
                  </div>
                </div>

                <div className="course-meta">
                  <Star />
                  {course.days} days • {course.mode}
                </div>
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
        {/* Dropdown */}
        <div className="department-dropdown">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="dropdown-button"
          >
            <span>{selectedDept}</span>
            <ChevronDown
              className={`dropdown-icon ${
                isDropdownOpen ? "open" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="dropdown-list">
              {departments.map((dept, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedDept(dept.name);
                    setIsDropdownOpen(false);
                  }}
                  className="dropdown-item"
                >
                  {dept.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Courses */}
        {departments
          .filter((d) => d.name === selectedDept)
          .map((dept) => (
            <div key={dept.name}>
              {renderCourses(dept.courses)}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TranscriptFEAT;
