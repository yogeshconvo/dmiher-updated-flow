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

  // Once data loads, auto-select based on URL slug
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
      <div className="text-center py-20 text-gray-500">
        No department data available.
      </div>
    );
  }

  const options = departments.map((d) => ({
    key: d.slug,
    label: d.name,
  }));

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      {/* Header */}
      <header className="bg-[#122E5E] text-white py-8 text-center">
        <h1 className="text-4xl font-bold">
          {currentDept.college_name || "Department"}
        </h1>
        <p className="text-xl opacity-90">{currentDept.college_info || ""}</p>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Dropdown */}
        <DropdownButton
          options={options}
          selectedKey={effectiveKey}
          onChange={handleChange}
          placeholder="Select Department"
        />

        {/* Dept Header */}
        <div className="bg-[#122E5E] text-white rounded-xl p-8 mt-6 text-center">
          <div className="flex items-center gap-2 justify-center">
            {renderIcon(currentDept.icon, 30)}
            <h2 className="text-3xl font-bold">{currentDept.name}</h2>
          </div>
          <p className="mt-2 text-lg max-w-4xl mx-auto">{currentDept.info}</p>
        </div>

        {/* HOD */}
        {currentDept.dean_image && (
          <div className="bg-white p-8 mt-6 py-2 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-center mb-6">
              Head of Department
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <SafeImage
                src={currentDept.dean_image}
                alt="Head of Department"
                className="w-44 h-52 rounded-full object-cover"
              />
              <RichTextRenderer html={currentDept.dean_details} />
            </div>
          </div>
        )}

        {/* Staff Table */}
        {currentDept.staff?.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Department Staff
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">
                      Sr. No.
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">
                      Designation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentDept.staff.map((member, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                      <td className="py-3 px-4 text-gray-800 font-medium">
                        {member.name}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
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
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Department's Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {currentDept.usp.map((u, i) => (
                <div
                  key={i}
                  className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-[#F04E30] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{u.point}</p>
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
