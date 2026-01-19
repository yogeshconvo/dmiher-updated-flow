import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  Calendar,
  FileText,
  Building2,
  Globe,
} from "lucide-react";

const PhDDAL = ({ data }) => {
  const [apiData, setApiData] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (data) {
      setApiData(data);
      setActiveTab(data?.tabs?.[0]?.id || 1);
    }
  }, [data]);

  if (!apiData) return null;

  /* ================= RENDER SECTION ================= */
  const renderSection = () => {
    const tab = apiData.tabs?.find((t) => t.id === activeTab);
    if (!tab) return null;

    switch (tab.type) {
      case "content":
        return (
          <div className="phd-text">
            {apiData.overview?.description?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <h3>Objectives</h3>
            <ul>
              {apiData.overview?.objectives?.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        );

      case "syllabus":
        return (
          <div className="phd-syllabus">
            {apiData.syllabus?.map((f, i) => (
              <div key={i} className="phd-syllabus-block">
                <h3>
                  <Building2 /> {f.faculty}
                </h3>
                <table>
                  <tbody>
                    {f.subjects?.map((s, j) => (
                      <tr key={j}>
                        <td>{j + 1}</td>
                        <td>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {s.name}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        );

      case "bank":
        return (
          <>
            <h3>National</h3>
            <table>
              <tbody>
                {apiData.bankDetails?.national?.map((b, i) => (
                  <tr key={i}>
                    <td>{b.label}</td>
                    <td>{b.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>International</h3>
            <table>
              <tbody>
                {apiData.bankDetails?.international?.map((b, i) => (
                  <tr key={i}>
                    <td>{b.label}</td>
                    <td>{b.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );

      case "office":
        return (
          <table className="phd-table">
            <tbody>
              {apiData.officeBearers?.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.name}</td>
                  <td>
                    {p.designation}
                    <br />
                    {p.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "contact":
        return (
          <div className="phd-contact">
            <p>{apiData.contact?.designation}</p>
            <p>{apiData.contact?.address}</p>
            <p>Mobile: {apiData.contact?.mobile}</p>
            <p>Email: {apiData.contact?.email}</p>
          </div>
        );

      case "pdf":
        window.open(tab.url, "_blank", "noopener,noreferrer");
        return null;

      case "iframe":
        return (
          <iframe
            src={tab.url}
            title="Document Viewer"
            className="phd-iframe"
          />
        );

      default:
        return null;
    }
  };

  /* ================= JSX ================= */
  return (
    <div className="phd-wrapper">
      <header className="phd-header">
        <GraduationCap />
        <h1>Post Doctoral Programme</h1>
      </header>

      <div className="phd-layout">
        {/* SIDEBAR */}
        <aside className="phd-sidebar">
          {apiData.tabs?.map((t) => (
            <div
              key={t.id}
              className={`phd-tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </div>
          ))}
        </aside>

        {/* CONTENT */}
        <main className="phd-content">
          {/* NOTIFICATIONS (only first tab) */}
          {activeTab === apiData.tabs?.[0]?.id && (
            <div className="phd-card">
              <h2>
                <FileText /> Notifications
              </h2>

              {apiData.notifications?.map((n, i) => (
                <a
                  key={i}
                  href={n.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`phd-notification ${
                    n.highlight ? "highlight" : ""
                  }`}
                >
                  <Calendar /> {n.title}
                </a>
              ))}
            </div>
          )}

          <div className="phd-card">{renderSection()}</div>
        </main>
      </div>
    </div>
  );
};

export default PhDDAL;
