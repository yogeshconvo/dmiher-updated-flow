import React from "react";
import { BookOpen } from "lucide-react";

/**
 * TranscriptSubpage — renders the NEW micro-page data structure.
 *
 * Expected data shape (from /api/micropage/{slug}/transcript):
 * {
 *   section: [
 *     {
 *       title: string,
 *       subtitle: string,
 *       courses_normal: [
 *         { course_number, roman_number, title, university, badge, icon }
 *       ]
 *     }
 *   ]
 * }
 *
 * The existing Transcript-type1.jsx (departments/electives structure) is unchanged.
 */
function TranscriptSubpage({ data }) {
  const sections = data?.section || [];

  if (!sections.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        No transcript data available.
      </div>
    );
  }

  return (
    <div className="transcript-page">
      {sections.map((sectionItem, sIdx) => (
        <div key={sIdx} className="transcript-section">

          {/* ── Section Header ── */}
          {(sectionItem.title || sectionItem.subtitle) && (
            <header className="transcript-header">
              {sectionItem.title && (
                <h1 className="transcript-title">{sectionItem.title}</h1>
              )}
              {sectionItem.subtitle && (
                <p className="transcript-subtitle">{sectionItem.subtitle}</p>
              )}
            </header>
          )}

          {/* ── Courses Grid ── */}
          <section className="courses-section">
            <div className="courses-wrapper">
              <div className="courses-grid">
                {(sectionItem.courses_normal || []).length > 0 ? (
                  sectionItem.courses_normal.map((course, cIdx) => (
                    <div key={cIdx} className="course-card">

                      {/* Card Header */}
                      <div className="course-card-header">
                        <div className="course-header-left">

                          {/* Icon */}
                          <div className="course-header-icon">
                            {course.icon ? (
                              <img
                                src={course.icon}
                                alt={course.title || "course icon"}
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <BookOpen size={20} />
                            )}
                          </div>

                          {/* Course Number / Roman Number */}
                          <div>
                            {course.course_number && (
                              <div className="course-number">
                                {course.course_number}
                              </div>
                            )}
                            {course.roman_number && (
                              <div className="course-roman">
                                {course.roman_number}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Badge */}
                        {course.badge && (
                          <span className="course-badge">{course.badge}</span>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="course-card-body">
                        {course.title && (
                          <h3 className="course-title">{course.title}</h3>
                        )}
                        {course.university && (
                          <p className="course-university">
                            {course.university}
                          </p>
                        )}
                      </div>

                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    No courses available.
                  </p>
                )}
              </div>
            </div>
          </section>

        </div>
      ))}
    </div>
  );
}

export default TranscriptSubpage;
