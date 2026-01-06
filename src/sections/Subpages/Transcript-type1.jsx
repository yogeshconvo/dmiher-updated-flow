// import React from "react";
// import {
//   Heart,
//   Trophy,
//   Globe,
//   FileText,
//   Brain,
//   BookOpen,
//   Target,
//   CheckCircle,
//   Star,
//   Award,
//   Building2,
// } from "lucide-react";

// /* ================= ICON MAP ================= */
// const ICON_MAP = {
//   Heart,
//   Trophy,
//   Globe,
//   FileText,
//   Brain,
//   BookOpen,
//   Target,
//   CheckCircle,
// };

// /* ================= COMPONENT ================= */
// function TranscriptSubpage({ data }) {
// //   if (!section || section.section_id !== "transcript_subpage") return null;

//   const { header, categories, courses, section_id } = data;

//   return (
//     <div className="page-wrapper">
//       {/* HEADER */}
//       <header className="page-header">
//         <div className="header-inner">
//           <h1 className="page-title">{header?.title}</h1>
//           {header?.subtitle && (
//             <p className="page-subtitle">{header.subtitle}</p>
//           )}
//         </div>
//       </header>

//       <main className="page-content">
//         {/* ================= CATEGORIES ================= */}
//         {categories?.length > 0 && (
//           <section className="categories-section">
//             <h2 className="section-title">Course Categories</h2>
//             <p className="section-subtitle">
//               Specialized training across medical disciplines
//             </p>

//             <div className="categories-list">
//               {categories.map((category, index) => (
//                 <div key={index} className="category-chip">
//                   {category}
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* ================= COURSES ================= */}
//         {courses?.length > 0 && (
//           <section className="courses-section">
//             <div className="courses-header">
//               <span className="courses-icon">
//                 <Award />
//               </span>
//               <h2 className="courses-title">Available Courses</h2>
//             </div>

//             <div className="courses-card">
//               <div className="courses-grid">
//                 {courses.map((course) => {
//                   const Icon = ICON_MAP[course.icon];

//                   return (
//                     <div key={course.id} className="course-item">
//                       {/* CARD HEADER */}
//                       <div className="course-header">
//                         <div className="course-header-left">
//                           <span className="course-icon">
//                             {Icon && <Icon />}
//                           </span>

//                           <div>
//                             <span className="course-number">
//                               Course #{course.id}
//                             </span>
//                             <span className="course-category">
//                               {course.category}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* CARD BODY */}
//                       <div className="course-body">
//                         <h3 className="course-name">
//                           {course.name}
//                         </h3>

//                         <div className="course-org">
//                           <Building2 />
//                           <div>
//                             <span className="powered-by">
//                               Powered by
//                             </span>
//                             <p>{course.organization}</p>
//                           </div>
//                         </div>

//                         <div className="course-badge">
//                           <Star />
//                           {course.category}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }

// export default TranscriptSubpage;
import React, { useState } from "react";
import {
  BookOpen,
  Star,
  Building2,
  ChevronDown,
} from "lucide-react";

function TranscriptFEAT({ data }) {
  // if (!section || section.section_id !== "transcript_subpage") return null;

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
