import React, { useEffect, useState } from "react";
import DropdownButton from "../../components/DropDownButton";
import { GalleryWithPopup } from "../../components/GalleryWithPopup";

function DepartmentsSubpage() {
  const [departments, setDepartments] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [currentDept, setCurrentDept] = useState(null);
  const [loading, setLoading] = useState(true);

  const pageSlug = "jnmc";

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://127.0.0.1:8000/api/departments/${pageSlug}`
        );

        const json = await res.json();

        setDepartments(json.data || []);

        // default select first valid department
        const first = json.data?.find(d => d.data !== null);

        if (first) {
          setSelectedKey(first.slug);
          setCurrentDept(first.data.departments[0]);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (slug) => {
    setSelectedKey(slug);

    const selected = departments.find(d => d.slug === slug);

    const deptData = selected?.data?.departments?.[0] || null;

    setCurrentDept(deptData);
  };

  /* ================= LOADING ================= */
  if (loading)
    return <div className="p-10 text-center">Loading...</div>;

  if (!currentDept)
    return <div className="p-10 text-center">No Data</div>;

  /* ================= DROPDOWN OPTIONS ================= */
  const options = departments.map((d) => ({
    key: d.slug,
    label: d.name,
  }));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}
      <header className="bg-[#122E5E] text-white py-10">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-2">
            {currentDept.name}
          </h2>
          <p className="text-lg opacity-90">
            {currentDept.info}
          </p>
        </div>
      </header>

      {/* ================= DROPDOWN ================= */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <DropdownButton
          options={options}
          selectedKey={selectedKey}
          onChange={handleChange}
          placeholder="Select Department"
        />

        {/* ================= CONTENT ================= */}
        <div className="space-y-8 mt-8">

          {/* ================= HOD ================= */}
          {currentDept.dean_image && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-center mb-6">
                Head of Department
              </h3>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={currentDept.dean_image}
                  className="w-44 h-52 rounded-full object-cover shadow"
                />

                <div
                  dangerouslySetInnerHTML={{
                    __html: currentDept.dean_details,
                  }}
                />
              </div>
            </div>
          )}

          {/* ================= STAFF ================= */}
          {currentDept.staff?.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">
                Department Staff
              </h3>

              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Sr No.</th>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Designation</th>
                  </tr>
                </thead>

                <tbody>
                  {currentDept.staff.map((s, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3">{s.name}</td>
                      <td className="p-3">{s.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ================= USP ================= */}
          {currentDept.usp?.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">
                Department Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {currentDept.usp.map((u, i) => (
                  <div
                    key={i}
                    className="flex p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="mr-3 font-bold text-[#F04E30]">
                      {i + 1}.
                    </div>
                    <p>{u.point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= GALLERY ================= */}
        {currentDept.gallery?.length > 0 && (
          <GalleryWithPopup
            title="Gallery"
            images={currentDept.gallery.map(g => g.image)}
          />
        )}
      </div>
    </div>
  );
}

export default DepartmentsSubpage;