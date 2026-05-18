import React from "react";
import {
  Calendar,
  FileText,
  Users,
  Phone,
  Mail,
  Globe,
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle,
} from "lucide-react";
import RichTextRenderer from "../../../components/RichTextRenderer";

const firstOf = (val) => {
  if (Array.isArray(val)) return val[0] || {};
  return val || {};
};

const ICONS = {
  graduation: GraduationCap,
  book: BookOpen,
  clock: Clock,
  file: FileText,
  users: Users,
  check: CheckCircle,
};

const Icon = ({ name, ...rest }) => {
  const Cmp = ICONS[name] || Clock;
  return <Cmp {...rest} />;
};

const PostDoc = ({ data }) => {
  const header = firstOf(data?.header);
  const programs = data?.programs || [];
  const importantDates = data?.important_dates || [];
  const eligibilityPoints = data?.eligibility_points || [];
  const pubReq = firstOf(data?.publication_requirements);
  const pubCols = data?.publication_columns || [];
  const applicationProcess = data?.application_process || [];
  const requiredDocs = data?.required_documents || [];
  const selectionProcedure = data?.selection_procedure || [];
  const contact = firstOf(data?.contact);

  return (
    <div className="up-page">
      {/* Header */}
      <div className="up-header">
        <div className="up-header-container">
          <div className="up-header-row">
            <div className="up-header-icon-wrap">
              <GraduationCap className="up-header-icon" />
            </div>
            <div>
              <h1 className="up-header-title">{header.title}</h1>
              {header.subtitle && (
                <p className="up-header-subtitle">{header.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="up-main">
        {/* Programs Overview */}
        {programs.length > 0 && (
          <section className="up-section-card">
            <div className="up-grid-2">
              {programs.map((p, i) => (
                <div key={i}>
                  <div className="up-prog-cat-row">
                    <Icon
                      name={p.icon || "graduation"}
                      className="up-prog-cat-icon"
                      size={32}
                    />
                    <h3 className="up-prog-cat-h3">
                      {p.title}
                    </h3>
                  </div>
                  <div className="up-prog-cat-desc">
                    <RichTextRenderer html={p.description} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Important Dates */}
        {importantDates.length > 0 && (
          <section className="up-section-card">
            <div className="up-section-title-row">
              <Calendar className="up-section-title-icon" size={32} />
              <h3 className="up-section-title-h2">
                Important Dates
              </h3>
            </div>
            <div className="up-grid-4">
              {importantDates.map((d, i) => (
                <div
                  key={i}
                  className="up-impdate-card"
                >
                  <div className="up-impdate-row">
                    <Icon name={d.icon || "clock"} className="up-impdate-icon" size={20} />
                    <span className="up-impdate-label">{d.label}</span>
                  </div>
                  <p className="up-impdate-date">{d.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Eligibility */}
        {(eligibilityPoints.length > 0 ||
          pubReq.heading ||
          pubCols.length > 0) && (
          <section className="up-section-card">
            <h3 className="up-section-title-h3">
              Eligibility Requirements
            </h3>
            <div className="up-elig-points">
              {eligibilityPoints.map((p, i) => (
                <div key={i} className="up-elig-item">
                  <div className="up-elig-num">
                    {i + 1}
                  </div>
                  <div className="up-elig-text">
                    <RichTextRenderer html={p.text} />
                  </div>
                </div>
              ))}

              {(pubReq.heading || pubCols.length > 0) && (
                <div className="up-elig-pub-card">
                  {pubReq.heading && (
                    <h4 className="up-elig-pub-h4">
                      {pubReq.heading}
                    </h4>
                  )}
                  <div className="up-elig-pub-grid">
                    {pubCols.map((col, i) => (
                      <div key={i}>
                        <h5
                          className={
                            i === 0 ? "up-elig-pub-h5-orange" : "up-elig-pub-h5-blue"
                          }
                        >
                          {col.label}
                        </h5>
                        <div className="up-elig-pub-desc">
                          <RichTextRenderer html={col.description} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Application Process */}
        {applicationProcess.length > 0 && (
          <section className="up-section-card">
            <h3 className="up-section-title-h3">
              Application Process
            </h3>
            <div className="up-step-list">
              {applicationProcess.map((step, i) => (
                <div
                  key={i}
                  className="up-step"
                >
                  <div className="up-step-num">
                    {i + 1}
                  </div>
                  <div className="up-step-text">
                    <RichTextRenderer html={step.text} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Required Documents */}
        {requiredDocs.length > 0 && (
          <section className="up-section-card">
            <h3 className="up-section-title-h3">
              Required Documents
            </h3>
            <div className="up-grid-3-doc">
              {requiredDocs.map((doc, i) => (
                <div
                  key={i}
                  className="up-doc-item"
                >
                  <FileText className="up-doc-icon" size={20} />
                  <span className="up-doc-text">{doc.text}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Selection Procedure */}
        {selectionProcedure.length > 0 && (
          <section className="up-section-card">
            <h3 className="up-section-title-h3">
              Selection Procedure
            </h3>
            <div className="up-step-list">
              {selectionProcedure.map((step, i) => (
                <div
                  key={i}
                  className="up-sel-item"
                >
                  <CheckCircle className="up-sel-icon" size={20} />
                  <p className="up-sel-text">{step.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        {(contact.office_name ||
          contact.phone ||
          contact.email ||
          contact.address ||
          contact.website) && (
          <section className="up-contact-section">
            <h3 className="up-contact-h3">Contact Information</h3>
            <div className="up-grid-2">
              <div>
                {contact.office_name && (
                  <h4 className="up-contact-name">
                    {contact.office_name}
                  </h4>
                )}
                {contact.address && (
                  <p className="up-contact-addr">
                    {contact.address}
                  </p>
                )}
              </div>
              <div className="up-contact-list">
                {contact.phone && (
                  <div className="up-contact-item">
                    <Phone className="up-contact-icon" size={20} />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.email && (
                  <div className="up-contact-item">
                    <Mail className="up-contact-icon" size={20} />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.website && (
                  <div className="up-contact-item">
                    <Globe className="up-contact-icon" size={20} />
                    <span>{contact.website}</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default PostDoc;
