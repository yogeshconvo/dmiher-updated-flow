import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DropdownButton from "../../components/DropDownButton";
import { GalleryWithPopup } from "../../components/GalleryWithPopup";
import { renderIcon } from "../../utils/renderIcon";
import api from "../../config/api";
import PageSkeleton from "../../components/Skeletons/PageSkeleton";
import RichTextRenderer from "../../components/RichTextRenderer";
import SafeImage from "../../components/SafeImage";

const fetchDepartments = async (college) => {
  const { data } = await api.get(`/departments/${college}`);
  return data.data || [];
};

function DepartmentsSubpage() {
  const { college, deptSlug } = useParams();

  const { data: departments = [], isLoading } = useQuery({
    queryKey: ["departments", college],
    queryFn: () => fetchDepartments(college),
    enabled: !!college,
  });

  const [selectedKey, setSelectedKey] = useState(null);
  const [activeDeptIndex, setActiveDeptIndex] = useState(0);

  const effectiveKey = selectedKey ?? deptSlug;
  const selected = departments.find((d) => d.slug === effectiveKey);
  const currentDeptList = selected?.data?.departments || [];
  const currentDept = currentDeptList[activeDeptIndex];

  const handleChange = (slug) => {
    setSelectedKey(slug);
    setActiveDeptIndex(0);
  };

  if (isLoading) return <PageSkeleton />;

  if (!currentDept) {
    return (
      <div className="deptpage-empty">
        No department data available.
      </div>
    );
  }

  const options = departments.map((d) => ({
    key: d.slug,
    label: d.name,
  }));

  return (
    <div className="deptpage-root fade-in">
      {/* Header */}
      <header className="deptpage-header">
        <h1 className="deptpage-college-name">
          {currentDept.college_name || "Department"}
        </h1>
        <p className="deptpage-college-info">{currentDept.college_info || ""}</p>
      </header>

      <div className="deptpage-content">
        {/* Dropdown */}
        <DropdownButton
          options={options}
          selectedKey={effectiveKey}
          onChange={handleChange}
          placeholder="Select Department"
        />

        {/* Dept Header */}
        <div className="deptpage-dept-card">
          <div className="deptpage-dept-row">
            {renderIcon(currentDept.icon, 30)}
            <h2 className="deptpage-dept-name">{currentDept.name}</h2>
          </div>
          <p className="deptpage-dept-info">{currentDept.info}</p>
        </div>

        {/* HOD — render whenever we have either an image or details.
            Previously gated on dean_image only, which hid the whole card
            for departments whose HOD photo hasn't been uploaded yet. */}
        {(currentDept.dean_image || currentDept.dean_details) && (
          <div className="deptpage-hod-card">
            <h3 className="deptpage-hod-title">
              Head of Department
            </h3>

            <div className="deptpage-hod-row">
              {/* Always render the HOD image slot. When dean_image is empty,
                  SafeImage shows the "No image available" fallback — keeping
                  the space reserved so an admin-uploaded photo appears here
                  later without any layout change. */}
              <SafeImage
                src={currentDept.dean_image}
                alt="Head of Department"
                className="deptpage-hod-image"
              />
              {currentDept.dean_details && (
                <RichTextRenderer html={currentDept.dean_details} />
              )}
            </div>
          </div>
        )}

        {/* Staff Table */}
        {currentDept.staff?.length > 0 && (
          <div className="deptpage-staff-card">
            <h3 className="deptpage-staff-title">
              Department Staff
            </h3>
            <div className="deptpage-staff-table-wrap">
              <table className="deptpage-staff-table">
                <thead>
                  <tr className="deptpage-staff-thead-row">
                    <th className="deptpage-staff-th">Sr. No.</th>
                    <th className="deptpage-staff-th">Name</th>
                    <th className="deptpage-staff-th">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDept.staff.map((member, index) => (
                    <tr
                      key={index}
                      className="deptpage-staff-tbody-row"
                    >
                      <td className="deptpage-staff-td">{index + 1}</td>
                      <td className="deptpage-staff-td-name">
                        {member.name}
                      </td>
                      <td className="deptpage-staff-td">
                        {member.designation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USP / Department Info */}
        {currentDept.usp?.length > 0 && (
          <div className="deptpage-usp-card">
            <h3 className="deptpage-usp-title">
              Department's Information
            </h3>
            <div className="deptpage-usp-grid">
              {currentDept.usp.map((u, i) => (
                <div
                  key={i}
                  className="deptpage-usp-item"
                >
                  <div className="deptpage-usp-num">
                    {i + 1}
                  </div>
                  <p className="deptpage-usp-text">{u.point}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {currentDept.gallery?.length > 0 && (
          <GalleryWithPopup
            data={{
              gallery: currentDept.gallery,
              header: { heading: "Gallery" },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default DepartmentsSubpage;
