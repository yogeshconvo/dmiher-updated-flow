import React from "react";
import { BookOpen, Bookmark } from "lucide-react";
import SafeImage from "../../components/SafeImage";

/**
 * TranscriptSubpage — renders the NEW micro-page data structure.
 *
 * Expected data shape (from /api/micropage/{slug}/transcript):
 * {
 *   header: [
 *     {
 *       main_heading: string,
 *       subtitle: string,
 *       heading: string,
 *       description: string,
 *       categories: [{ id, title }]
 *     }
 *   ],
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
  const headerData = data?.header?.[0];
  const sections = data?.section || [];

  if (!headerData && !sections.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        No transcript data available.
      </div>
    );
  }

  return (
    <div className="transcript-page">
      {/* ── PAGE TITLE BAR ── */}
      <div className="transcript-title-bar">
        <h1>Transcript Courses</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── COURSE CATEGORIES HEADER ── */}
        {headerData && (
          <div className="transcript-categories-header">
            <div className="container">
              {/* Main Heading */}
              {headerData.main_heading && (
                <h1 className="transcript-categories-main-heading">
                  {headerData.main_heading}
                </h1>
              )}

              {/* Subtitle */}
              {headerData.subtitle && (
                <p className="transcript-categories-subtitle">
                  {headerData.subtitle}
                </p>
              )}

              {/* Categories Pills */}
              {headerData.categories && headerData.categories.length > 0 && (
                <div className="transcript-categories-pills">
                  {headerData.categories.map((cat) => (
                    <button
                      key={cat.id}
                      className="transcript-category-pill"
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── AVAILABLE COURSES SECTION ── */}
        {headerData && (
          <div className="transcript-available-courses">
            <div className="container">
              <div className="transcript-courses-heading">
                <div className="transcript-courses-icon">
                  <Bookmark size={24} />
                </div>
                <h2 className="transcript-courses-title">
                  {headerData.heading || "Available Courses"}
                </h2>
              </div>
              {headerData.description && (
                <p className="transcript-courses-description">
                  {headerData.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── COURSE SECTIONS ── */}
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
                          {course.badge && (
                            <p className="course-badge-text">{course.badge}</p>
                          )}
                          {course.roman_number && (
                            <span className="course-category-badge">{course.roman_number}</span>
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
    </div>
  );
}

export default TranscriptSubpage;
