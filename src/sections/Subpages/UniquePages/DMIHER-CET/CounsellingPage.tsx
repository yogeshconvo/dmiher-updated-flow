import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import { resolveIcon } from "./iconMap";
import resolveImage from "../../../../utils/resolveImage";

/**
 * DMIHER-CET — Counselling subpage (section_id `dmiher_cet_counselling_subpage`).
 *
 * data: { header:{heading,subheading,icon},
 *   rounds_header:{heading,tab_label_round1,tab_label_round2,tab_label_round3},
 *   round1_schedule/round2_schedule/round3_schedule:[{date,category,seats,venue}],
 *   process_header, process_steps:[{icon,step,title,description,duration}],
 *   documents_header:{heading,checklist_pdf}, required_documents:[{document,mandatory,copies}],
 *   contact_header, contact_info:[{icon,type,value}],
 *   instructions_header, instructions:[{text}], alert?:{heading,description} }
 */

const arr = (v) => (Array.isArray(v) ? v : []);
const isTrue = (v) => v === true || v === 1 || v === "1" || v === "true";

function CounsellingPage({ data = {}, college }) {
  const {
    header = {},
    rounds_header = {},
    round1_schedule,
    round2_schedule,
    round3_schedule,
    process_header = {},
    process_steps,
    documents_header = {},
    required_documents,
    contact_header = {},
    contact_info,
    instructions_header = {},
    instructions,
    alert = {},
  } = data || {};

  const backTo = college ? `/${college}/dmiher-cet` : "/";
  const HeaderIcon = resolveIcon(header.icon, Users);

  // Build the round tabs from whichever rounds actually have schedule data.
  const rounds = useMemo(
    () =>
      [
        {
          key: "round1",
          label: rounds_header.tab_label_round1 || "Round 1",
          schedule: arr(round1_schedule),
          activeClass: "up-round-btn-active-orange",
        },
        {
          key: "round2",
          label: rounds_header.tab_label_round2 || "Round 2",
          schedule: arr(round2_schedule),
          activeClass: "up-round-btn-active-blue",
        },
        {
          key: "round3",
          label: rounds_header.tab_label_round3 || "Round 3 (Final)",
          schedule: arr(round3_schedule),
          activeClass: "up-round-btn-active-grad",
        },
      ].filter((r) => r.schedule.length > 0),
    [rounds_header, round1_schedule, round2_schedule, round3_schedule]
  );

  const [selectedRound, setSelectedRound] = useState(null);
  const activeKey = selectedRound || rounds[0]?.key || null;
  const activeRound = rounds.find((r) => r.key === activeKey) || null;

  const steps = arr(process_steps);
  const documents = arr(required_documents);
  const contacts = arr(contact_info);
  const instructionList = arr(instructions);
  const checklistUrl = documents_header.checklist_pdf
    ? resolveImage(documents_header.checklist_pdf)
    : null;

  return (
    <div className="up-page-gray">
      {/* Header */}
      <div className="up-header-px">
        <div className="up-header-container">
          <Link to={backTo} className="up-back-link">
            <ArrowLeft className="up-back-icon" />
            Back to DMIHER-CET
          </Link>
          <div className="up-header-icon-large">
            <div className="up-header-icon-wrap">
              <HeaderIcon className="up-header-icon" />
            </div>
            <div>
              <h1 className="up-header-title-large">{header.heading}</h1>
              {header.subheading && (
                <p className="up-header-subtitle-opacity">{header.subheading}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="up-header-container">
          {/* Round Selection (tabs) */}
          {rounds.length > 0 && (
            <>
              <div className="up-section-card-light-pad">
                {rounds_header.heading && (
                  <h2 className="up-section-title">{rounds_header.heading}</h2>
                )}
                <div className="up-round-btns">
                  {rounds.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => setSelectedRound(r.key)}
                      className={`up-round-btn ${
                        activeKey === r.key ? r.activeClass : "up-round-btn-inactive"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active round schedule */}
              {activeRound && (
                <div className="up-section-card-mb">
                  <h2 className="up-section-title">{activeRound.label} Schedule</h2>
                  <div className="up-step-list">
                    {activeRound.schedule.map((schedule, index) => (
                      <div key={index} className="up-sched-row-bordered">
                        <div className="up-sched-left">
                          <Calendar className="up-sched-icon" />
                          <div>
                            <h3 className="up-sched-time">{schedule.date}</h3>
                            <p className="up-sched-prog">{schedule.category}</p>
                          </div>
                        </div>
                        <div className="up-sched-right-col">
                          {schedule.seats && (
                            <div className="up-sched-seats">{schedule.seats}</div>
                          )}
                          {schedule.venue && (
                            <div className="up-sched-venue">
                              <MapPin className="up-sched-venue-icon" />
                              <span>{schedule.venue}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Counselling Process */}
          {steps.length > 0 && (
            <div className="up-section-card-mb">
              {process_header.heading && (
                <h2 className="up-section-title">{process_header.heading}</h2>
              )}
              <div className="up-process-grid">
                {steps.map((process, index) => {
                  const Icon = resolveIcon(process.icon);
                  return (
                    <div key={index} className="up-process-card">
                      <div className="up-process-icon-wrap">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="up-process-body">
                        {process.step && (
                          <div className="up-process-step">Step {process.step}</div>
                        )}
                        <h3 className="up-process-title">{process.title}</h3>
                        {process.description && (
                          <div
                            className="up-process-desc"
                            dangerouslySetInnerHTML={{ __html: process.description }}
                          />
                        )}
                        {process.duration && (
                          <div className="up-process-duration">
                            {process.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Required Documents */}
          {documents.length > 0 && (
            <div className="up-section-card-mb">
              <div className="up-doc-row-header">
                <h2 className="up-section-title-h2">
                  {documents_header.heading || "Required Documents"}
                </h2>
                {checklistUrl && (
                  <a
                    href={checklistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="up-doc-download-btn"
                  >
                    <Download className="w-5 h-5" />
                    Download Checklist
                  </a>
                )}
              </div>
              <div className="up-doc-grid-2">
                {documents.map((doc, index) => {
                  const mandatory = isTrue(doc.mandatory);
                  const copies = Number(doc.copies) || 0;
                  return (
                    <div key={index} className="up-doc-row">
                      <div className="up-doc-left">
                        <CheckCircle
                          className={
                            mandatory
                              ? "up-doc-check-mandatory"
                              : "up-doc-check-optional"
                          }
                        />
                        <div>
                          <h3 className="up-doc-name">{doc.document}</h3>
                          <p className="up-doc-status">
                            {mandatory ? "Mandatory" : "If Applicable"}
                          </p>
                        </div>
                      </div>
                      {copies > 0 && (
                        <div className="up-sched-right-col">
                          <span className="up-doc-copies">
                            {copies} {copies === 1 ? "copy" : "copies"}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contact Information */}
          {contacts.length > 0 && (
            <div className="up-section-card-mb">
              {contact_header.heading && (
                <h2 className="up-section-title">{contact_header.heading}</h2>
              )}
              <div className="up-grid-2">
                {contacts.map((contact, index) => {
                  const Icon = resolveIcon(contact.icon, MapPin);
                  return (
                    <div key={index} className="up-contact-card">
                      <div className="up-contact-icon-color">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="up-contact-type">{contact.type}</h3>
                        <p className="up-contact-value">{contact.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Important Instructions */}
          {instructionList.length > 0 && (
            <div className="up-section-card">
              {instructions_header.heading && (
                <h2 className="up-section-title">{instructions_header.heading}</h2>
              )}
              <div className="up-instr-list">
                {instructionList.map((instruction, index) => (
                  <div key={index} className="up-instr-item">
                    <div className="up-instr-num">{index + 1}</div>
                    <div
                      className="up-instr-text"
                      dangerouslySetInnerHTML={{
                        __html: instruction?.text || instruction || "",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alert */}
      {(alert.heading || alert.description) && (
        <div className="up-alert-strip">
          <div className="up-header-container">
            <div className="up-alert-card">
              <div className="up-alert-row">
                <AlertCircle className="up-alert-icon" />
                <div>
                  {alert.heading && (
                    <h3 className="up-alert-title">{alert.heading}</h3>
                  )}
                  {alert.description && (
                    <div
                      className="up-alert-text"
                      dangerouslySetInnerHTML={{ __html: alert.description }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CounsellingPage;
