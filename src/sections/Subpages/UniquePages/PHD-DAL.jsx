import React, { useMemo, useState } from "react";
import {
  GraduationCap,
  Calendar,
  FileText,
  CreditCard,
  Building2,
  Globe,
} from "lucide-react";
import ViewMoreButton from "../../../components/UI/ViewMore";
import RichTextRenderer from "../../../components/RichTextRenderer";

const firstOf = (val) => {
  if (Array.isArray(val)) return val[0] || {};
  return val || {};
};

const isInternalTab = (tab) => tab.link_type !== "external" && !tab.url;

const PhDDAL = ({ data }) => {
  const header = firstOf(data?.header);
  const tabs = data?.tabs || [];
  const notifications = data?.notifications || [];

  const firstInternalKey = useMemo(() => {
    const t = tabs.find((tab) => isInternalTab(tab) && tab.tab_key);
    return t?.tab_key || "";
  }, [tabs]);

  const [activeTabKey, setActiveTabKey] = useState(firstInternalKey);

  const activeTab = useMemo(
    () =>
      tabs.find(
        (t) => isInternalTab(t) && (t.tab_key || "") === activeTabKey
      ),
    [tabs, activeTabKey]
  );

  const handleTabClick = (tab) => {
    if (!isInternalTab(tab)) {
      window.open(tab.url, "_blank", "noopener,noreferrer");
    } else if (tab.tab_key) {
      setActiveTabKey(tab.tab_key);
    }
  };

  const renderSyllabusFaculty = (faculty, idx) => (
    <div key={idx} className="mb-8">
      <div className="bg-[#facc15] text-black p-3 rounded-t-lg">
        <h3 className="font-semibold flex items-center space-x-3">
          <Building2 className="w-5 h-5" />
          <span>{faculty.faculty_name}</span>
        </h3>
      </div>
      <div className="border border-amber-200 rounded-b-lg overflow-hidden">
        <table className="w-full">
          <tbody>
            {(faculty.subjects || []).map((subject, i) => (
              <tr key={i} className="border-b border-amber-200 last:border-b-0">
                <td className="p-4 border-r border-amber-100 font-medium text-gray-700 bg-white/50 w-1/6">
                  {i + 1}
                </td>
                <td className="p-4 font-medium text-gray-700 bg-white/50">
                  <a
                    href={subject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    aria-label={`View syllabus for ${subject.name}`}
                  >
                    {subject.name}
                  </a>
                </td>
                <td className="p-4 text-gray-800 font-semibold"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBankTable = (rows, label, Icon = Building2) => (
    <div className="mb-8">
      <div className="bg-[#facc15] text-black p-3 rounded-t-lg">
        <h3 className="font-semibold flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </h3>
      </div>
      <div className="border border-amber-200 rounded-b-lg overflow-hidden">
        <table className="w-full">
          <tbody>
            {rows.map(({ label, value }, i) => (
              <tr key={i} className="border-b border-amber-200 last:border-b-0">
                <td className="p-4 border-r border-amber-100 font-medium text-gray-700 bg-white/50 w-1/6">
                  {i + 1}
                </td>
                <td className="p-4 font-medium text-gray-700 bg-white/50">
                  {label}
                </td>
                <td className="p-4 text-gray-800 font-semibold">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    if (!activeTab) return null;

    switch (activeTab.tab_key) {
      case "overview": {
        const overview = firstOf(activeTab.overview_content);
        const objectives = activeTab.objectives || [];
        return (
          <div className="text-lg text-gray-700 space-y-3 leading-relaxed">
            {overview.description && (
              <RichTextRenderer html={overview.description} />
            )}
            {(overview.objectives_title || objectives.length > 0) && (
              <>
                <h3 className="text-xl font-semibold text-[#707070] tracking-wider mt-4">
                  {overview.objectives_title || "Objectives"}
                </h3>
                <ul className="list-disc list-inside">
                  {objectives.map((o, i) => (
                    <li key={i}>{o.text}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );
      }

      case "syllabus": {
        const syllabus = activeTab.syllabus || [];
        return (
          <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-4">
            <h3 className="font-semibold text-base">
              Doctoral Degree Program (Ph.D.) – Syllabus
            </h3>
            {syllabus.map(renderSyllabusFaculty)}
          </div>
        );
      }

      case "office_bearer": {
        const officeBearers = activeTab.office_bearers || [];
        return (
          <div className="text-base md:text-lg text-gray-800">
            <div className="mb-8">
              <div className="bg-[#facc15] text-black p-3 rounded-t-lg">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Ph.D. Cell Office Bearer</span>
                </h3>
              </div>
              <div className="border border-amber-200 rounded-b-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {officeBearers.map((item, i) => (
                      <tr
                        key={i}
                        className="border-b border-amber-200 last:border-b-0"
                      >
                        <td className="p-4 border-r border-amber-100 font-medium text-gray-700 bg-white/50 w-1/6">
                          {i + 1}
                        </td>
                        <td className="p-4 font-medium text-gray-700 bg-white/50">
                          {item.name}
                        </td>
                        <td className="p-4 text-gray-800 font-semibold whitespace-pre-line">
                          {item.designation}
                          {item.contact && (
                            <>
                              <br />
                              {item.contact}
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case "contact": {
        const contact = firstOf(activeTab.contact_info);
        return (
          <div className="text-base md:text-lg text-gray-800">
            <div className="mb-8 w-full md:w-3/4 lg:w-1/2">
              <div className="bg-[#facc15] text-black p-3 rounded-t-lg">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Contact For PhD Enquiries</span>
                </h3>
              </div>
              <div className="border border-amber-200 rounded-b-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-amber-200 last:border-b-0">
                      <td className="p-4 text-gray-800 font-semibold whitespace-pre-line">
                        {contact.designation}
                        {contact.address && (
                          <>
                            <br />
                            {contact.address}
                          </>
                        )}
                        {contact.mobile && (
                          <>
                            <br />
                            Mobile No: {contact.mobile}
                          </>
                        )}
                        {contact.email && (
                          <>
                            <br />
                            Email: {contact.email}
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case "bank_details": {
        const bankNational = activeTab.bank_national || [];
        const bankInternational = activeTab.bank_international || [];
        return (
          <div>
            {bankNational.length > 0 &&
              renderBankTable(
                bankNational,
                "Bank Details for National Admissions (PhD)",
                Building2
              )}
            {bankInternational.length > 0 &&
              renderBankTable(
                bankInternational,
                "Bank Details for International",
                Globe
              )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  const activeTabIsBank = activeTab?.tab_key === "bank_details";
  const activeTabIsOverview = activeTab?.tab_key === "overview";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans [&_h4]:font-sans [&_h5]:font-sans [&_h6]:font-sans">
      {/* Header */}
      <div className="bg-[#122E5E] text-white py-8">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-full">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {header.title || "Ph.D. Programmes"}
              </h1>
              <p className="text-blue-100 mt-1">
                {header.subtitle || "Directorate Of Advanced Learning"}
              </p>
            </div>
          </div>
          {(header.cta_label || header.cta_url) && (
            <div>
              <ViewMoreButton
                label={header.cta_label || "Enquire Now"}
                href={header.cta_url}
                target="_blank"
              />
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {tabs.map((item, index) => {
                  const isInternal = isInternalTab(item);
                  const isActive =
                    isInternal && activeTabKey === (item.tab_key || "");
                  return (
                    <div
                      key={index}
                      className={`p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-200 text-sm ${
                        isActive ? "bg-blue-100" : ""
                      }`}
                      onClick={() => handleTabClick(item)}
                      role="button"
                      aria-label={`Navigate to ${item.label}`}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Notifications — only on Overview tab */}
            {activeTabIsOverview && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Latest Notifications
                  </h2>
                </div>
                <div className="space-y-3">
                  {notifications.length > 0 ? (
                    notifications.map((n, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                          n.is_highlighted
                            ? "border-amber-200 hover:bg-amber-100"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <a
                            href={n.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-gray-800"
                          >
                            {n.title}
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">
                      No notification Available
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Content panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {renderContent()}
            </div>

            {/* Fee Payment block — only on Bank Details tab */}
            {activeTabIsBank && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Pay Fee by RTGS/NEFT/IMPS
                  </h2>
                </div>
                {(activeTab?.bank_national || []).length > 0 &&
                  renderBankTable(
                    activeTab.bank_national,
                    "Bank Details for National Admissions (PhD)",
                    Building2
                  )}
                {(activeTab?.bank_international || []).length > 0 &&
                  renderBankTable(
                    activeTab.bank_international,
                    "Bank Details for International",
                    Globe
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhDDAL;
