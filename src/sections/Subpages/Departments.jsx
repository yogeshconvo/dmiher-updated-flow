import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import "../../styles/main.css";
// import "../../styles/responsive.css";

function Departments({ data }) {
  const { deptKey } = useParams();

  const { title, subtitle, departments = [] } = data || {};

  const [selectedDepartment, setSelectedDepartment] = useState(
    deptKey || departments?.[0]?.key
  );

  useEffect(() => {
    if (deptKey) {
      setSelectedDepartment(deptKey);
    }
  }, [deptKey]);

  const currentDept = departments.find(
    (dept) => dept.key === selectedDepartment
  );

  if (!currentDept) return null;

  return (
    <div className="page-wrapper">
      {/* ================= HEADER ================= */}
      <header className="jnmc-header">
        <h1 className="jnmc-header-title">{title}</h1>
        <p className="jnmc-header-subtitle">{subtitle}</p>
      </header>

      <div className="container">
        {/* ================= DEPARTMENT HEADER ================= */}
        <div className="department-header">
          <h2 className="department-header-title">{currentDept.name}</h2>
          <p className="department-header-info">{currentDept.info}</p>
        </div>

        {/* ================= HOD ================= */}
        {currentDept.hod?.length > 0 && (
          <div className="section-card mt-8">
            <h3 className="section-title">Head of Department</h3>

            <div className="hod-wrapper">
              {currentDept.hod.map((hod, index) => (
                <div key={index} className="hod-card">
                  <img
                    src={hod.image}
                    alt={hod.name}
                    className="hod-image"
                  />

                  <div>
                    <h4 className="hod-name">{hod.name}</h4>
                    <p className="hod-designation">{hod.designation}</p>

                    {hod.qualification && (
                      <p className="hod-qualification">
                        {hod.qualification}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= STAFF ================= */}
        {currentDept.staff?.length > 0 && (
          <div className="section-card mt-8">
            <h3 className="section-title">Department Staff</h3>

            <div className="overflow-x-auto">
              <table className="staff-table">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Designation</th>
                  </tr>
                </thead>

                <tbody>
                  {currentDept.staff.map((staff, index) => (
                    <tr key={index} className="staff-row">
                      <td>{index + 1}</td>
                      <td className="font-medium text-gray-800">
                        {staff.name}
                      </td>
                      <td>{staff.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= USP ================= */}
        {currentDept.usp?.length > 0 && (
          <div className="section-card mt-8">
            <h3 className="section-title">
              Department’s Information
            </h3>

            <div className="usp-grid">
              {currentDept.usp.map((point, index) => (
                <div key={index} className="usp-item">
                  <span className="usp-index">{index + 1}</span>
                  <p className="usp-text">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Departments;
