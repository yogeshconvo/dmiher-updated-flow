import React, { useState } from "react";
import { BookOpen, Star } from "lucide-react";
import DropdownButton from "../../components/UI/DropDownButton";
// import data from "./electivesData.json";

const iconMap = {
  BookOpen,
};

function ElectivesOffered({data}) {
  const [selectedDept, setSelectedDept] = useState("0");

  const selectedDepartment =
    data.departments[Number(selectedDept)];

  return (
    <section className="electives-page">
      {/* ===== HEADER ===== */}
      <div className="electives-header">
        <h1 className="electives-title">{data.title}</h1>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="electives-container">
        <DropdownButton
          options={data.departments.map((dept, index) => ({
            key: index.toString(),
            name: dept.name,
          }))}
          selectedKey={selectedDept}
          onChange={setSelectedDept}
          placeholder="Select Department"
          className="mb-8"
        />

        {selectedDepartment && (
          <div className="electives-grid">
            {selectedDepartment.electives.map((elective) => {
              const Icon = iconMap[elective.icon] || BookOpen;

              return (
                <div
                  key={`${elective.srNo}-${elective.name}`}
                  className="elective-card"
                >
                  {/* Header */}
                  <div className="elective-card-header">
                    <div className="elective-icon">
                      <Icon />
                    </div>
                    <div>
                      <p className="elective-meta">
                        Sr. No. {elective.srNo}
                      </p>
                      <p className="elective-meta">
                        Semester {elective.semester}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="elective-card-body">
                    <h3 className="elective-name">
                      {elective.name}
                    </h3>

                    <span className="elective-badge">
                      <Star size={14} />
                      Elective Excellence
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ElectivesOffered;
