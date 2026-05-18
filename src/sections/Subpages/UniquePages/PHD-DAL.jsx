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
    <div key={idx} className="up-table-block">
      <div className="up-table-header">
        <h3 className="up-table-header-h3">
          <Building2 className="up-table-header-icon" />
          <span>{faculty.faculty_name}</span>
        </h3>
      </div>
      <div className="up-table-wrap">
        <table className="up-table">
          <tbody>
            {(faculty.subjects || []).map((subject, i) => (
              <tr key={i} className="up-table-row">
                <td className="up-table-td-num">
                  {i + 1}
                </td>
                <td className="up-table-td-mid">
                  <a
                    href={subject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="up-table-link"
                    aria-label={`View syllabus for ${subject.name}`}
                  >
                    {subject.name}
                  </a>
                </td>
                <td className="up-table-td-val"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBankTable = (rows, label, Icon = Building2) => (
    <div className="up-table-block">
      <div className="up-table-header">
        <h3 className="up-table-header-h3-tight">
          <Icon className="up-table-header-icon" />
          <span>{label}</span>
        </h3>
      </div>
      <div className="up-table-wrap">
        <table className="up-table">
          <tbody>
            {rows.map(({ label, value }, i) => (
              <tr key={i} className="up-table-row">
                <td className="up-table-td-num">
                  {i + 1}
                </td>
                <td className="up-table-td-mid">
                  {label}
                </td>
                <td className="up-table-td-val">{value}</td>
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
          <div className="up-overview">
            {overview.description && (
              <RichTextRenderer html={overview.description} />
            )}
            {(overview.objectives_title || objectives.length > 0) && (
              <>
                <h3 className="up-overview-h3">
                  {overview.objectives_title || "Objectives"}
                </h3>
                <ul className="up-overview-list">
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
          <div className="up-syllabus-wrap">
            <h3 className="up-syllabus-h3">
              Doctoral Degree Program (Ph.D.) – Syllabus
            </h3>
            {syllabus.map(renderSyllabusFaculty)}
          </div>
        );
      }

      case "office_bearer": {
        const officeBearers = activeTab.office_bearers || [];
        return (
          <div className="up-bank-section">
            <div className="up-table-block">
              <div className="up-table-header">
                <h3 className="up-table-header-h3-tight">
                  <Building2 className="up-table-header-icon" />
                  <span>Ph.D. Cell Office Bearer</span>
                </h3>
              </div>
              <div className="up-table-wrap">
                <table className="up-table">
                  <tbody>
                    {officeBearers.map((item, i) => (
                      <tr
                        key={i}
                        className="up-table-row"
                      >
                        <td className="up-table-td-num">
                          {i + 1}
                        </td>
                        <td className="up-table-td-mid">
                          {item.name}
                        </td>
                        <td className="up-table-td-pre">
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
          <div className="up-bank-section">
            <div className="up-table-block-half">
              <div className="up-table-header">
                <h3 className="up-table-header-h3-tight">
                  <Building2 className="up-table-header-icon" />
                  <span>Contact For PhD Enquiries</span>
                </h3>
              </div>
              <div className="up-table-wrap">
                <table className="up-table">
                  <tbody>
                    <tr className="up-table-row">
                      <td className="up-table-td-pre">
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
    <div className="up-page-gradient">
      {/* Header */}
      <div className="up-header">
        <div className="up-header-container-flex">
          <div className="up-header-row">
            <div className="up-header-icon-wrap">
              <GraduationCap className="up-header-icon" />
            </div>
            <div>
              <h1 className="up-header-title">
                {header.title || "Ph.D. Programmes"}
              </h1>
              <p className="up-header-subtitle">
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

      <div className="up-main-container">
        <div className="up-side-grid">
          {/* Sidebar */}
          <div className="up-side-col">
            <div className="up-side-card">
              <div className="up-side-divide">
                {tabs.map((item, index) => {
                  const isInternal = isInternalTab(item);
                  const isActive =
                    isInternal && activeTabKey === (item.tab_key || "");
                  return (
                    <div
                      key={index}
                      className={`up-side-item ${isActive ? "up-side-item-active" : ""}`}
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
          <div className="up-side-main">
            {/* Notifications — only on Overview tab */}
            {activeTabIsOverview && (
              <div className="up-section-card-light">
                <div className="up-notif-row">
                  <div className="up-notif-icon-wrap">
                    <FileText className="up-notif-icon" />
                  </div>
                  <h2 className="up-section-title-h2">
                    Latest Notifications
                  </h2>
                </div>
                <div className="up-notif-list">
                  {notifications.length > 0 ? (
                    notifications.map((n, index) => (
                      <div
                        key={index}
                        className={`up-notif-item ${
                          n.is_highlighted
                            ? "up-notif-item-highlighted"
                            : "up-notif-item-default"
                        }`}
                      >
                        <div className="up-notif-item-row">
                          <Calendar className="up-notif-cal" />
                          <a
                            href={n.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="up-notif-title"
                          >
                            {n.title}
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="up-notif-empty">
                      No notification Available
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Content panel */}
            <div className="up-section-card-light">
              {renderContent()}
            </div>

            {/* Fee Payment block — only on Bank Details tab */}
            {activeTabIsBank && (
              <div className="up-section-card-light">
                <div className="up-notif-row">
                  <div className="up-fee-icon-wrap">
                    <CreditCard className="up-fee-icon" />
                  </div>
                  <h2 className="up-section-title-h2">
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
