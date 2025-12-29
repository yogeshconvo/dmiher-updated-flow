import React, { useEffect, useState } from "react";
import { Link } from "react-router";

// import "../../styles/programs-main.css";
// import "../../styles/programs-responsive.css";

const ProgramsComponent = ({data}) => {
  const [programs, setPrograms] = useState([]);
  const [heading, setHeading] = useState("PROGRAMS");
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/programs") // 🔁 your real API
//       .then((res) => res.json())
//       .then((res) => {
//         setPrograms(res.programs || []);
//         setHeading(res.heading || "PROGRAMS");
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <section className="programs-section">
//         <div className="container">Loading programs...</div>
//       </section>
//     );
// //   }

//   if (!programs.length) return null;

  return (
    <section className="programs-section">
      <div className="container">
        {/* Heading */}
        <div className="programs-heading-wrapper">
          <div className="programs-heading-line" />
          <h2 className="programs-heading">{data.heading}</h2>
        </div>

        {/* Grid */}
        <div className="programs-grid">
          {data.programs.map((program) => (
            <Link
              key={program.id}
              to={program.slug}
              className="program-card"
            >
              <img
                src={program.image}
                alt={program.name}
                className="program-image"
              />

              <div className="program-content">
                <h6 className="program-title">{program.name}</h6>

                {program.icon && (
                  <div className="program-icon-wrapper">
                    <img
                      src={program.icon}
                      alt="Program Icon"
                      className="program-icon"
                    />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsComponent;
