import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { resolveIcon } from "./iconMap";

/**
 * DMIHER-CET — Phase 2 subpage (section_id `dmiher_cet_phase2_subpage`).
 *
 * data: { header:{heading,subheading,icon}, overview_header, overview_stats,
 *   eligibility_header, eligibility_criteria:[{criteria,requirement,status}],
 *   programs_header, programs:[{icon,category,seats,cutoff,list:[{name}]}],
 *   schedule_header, schedule:[{time,programs,duration,difficulty}],
 *   dates_header, important_dates:[{event,date,status}],
 *   preparation_header, advanced_preparation:[{icon,title,description,tips:[{text}]}],
 *   alert:{heading,description} }
 */

const STAT_VARIANTS = [
  { wrap: "up-stat-blue", icon: "up-stat-icon-blue", label: "up-stat-label-blue", value: "up-stat-value-blue" },
  { wrap: "up-stat-green", icon: "up-stat-icon-green", label: "up-stat-label-green", value: "up-stat-value-green" },
  { wrap: "up-stat-purple", icon: "up-stat-icon-purple", label: "up-stat-label-purple", value: "up-stat-value-purple" },
  { wrap: "up-stat-orange", icon: "up-stat-icon-orange", label: "up-stat-label-orange", value: "up-stat-value-orange" },
];

const ELIG = {
  mandatory: { icon: "up-elig-icon-mandatory", status: "up-elig-status-mandatory", label: "Required" },
  varies: { icon: "up-elig-icon-varies", status: "up-elig-status-varies", label: "Program Specific" },
  optional: { icon: "up-elig-icon-optional", status: "up-elig-status-optional", label: "Optional" },
};
const eligOf = (s) => ELIG[String(s).toLowerCase()] || ELIG.optional;

const arr = (v) => (Array.isArray(v) ? v : []);
const isDone = (status) => String(status).toLowerCase() === "completed";
const statusLabel = (status) =>
  status ? String(status).charAt(0).toUpperCase() + String(status).slice(1) : "";

function Phase2Page({ data = {}, college }) {
  const {
    header = {},
    overview_header = {},
    overview_stats,
    eligibility_header = {},
    eligibility_criteria,
    programs_header = {},
    programs,
    schedule_header = {},
    schedule,
    dates_header = {},
    important_dates,
    preparation_header = {},
    advanced_preparation,
    alert = {},
  } = data || {};

  const backTo = college ? `/${college}/dmiher-cet` : "/";
  const HeaderIcon = resolveIcon(header.icon, Calendar);

  const stats = arr(overview_stats);
  const eligibility = arr(eligibility_criteria);
  const programList = arr(programs);
  const scheduleList = arr(schedule);
  const dates = arr(important_dates);
  const strategies = arr(advanced_preparation);

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
          {/* Overview */}
          {stats.length > 0 && (
            <div className="up-section-card-mb">
              {overview_header.heading && (
                <h2 className="up-section-title">{overview_header.heading}</h2>
              )}
              <div className="up-grid-4-stat">
                {stats.map((stat, i) => {
                  const v = STAT_VARIANTS[i % STAT_VARIANTS.length];
                  const Icon = resolveIcon(stat.icon);
                  return (
                    <div key={i} className={v.wrap}>
                      <Icon className={v.icon} />
                      <h3 className={v.label}>{stat.title}</h3>
                      <p className={v.value}>{stat.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Eligibility Criteria */}
          {eligibility.length > 0 && (
            <div className="up-section-card-mb">
              {eligibility_header.heading && (
                <h2 className="up-section-title">{eligibility_header.heading}</h2>
              )}
              <div className="up-step-list">
                {eligibility.map((item, index) => {
                  const e = eligOf(item.status);
                  return (
                    <div key={index} className="up-elig-row">
                      <div className="up-elig-row-left">
                        <CheckCircle className={e.icon} />
                        <div>
                          <h3 className="up-date-event">{item.criteria}</h3>
                          {item.requirement && (
                            <div
                              className="up-date-text"
                              dangerouslySetInnerHTML={{ __html: item.requirement }}
                            />
                          )}
                        </div>
                      </div>
                      <span className={e.status}>{e.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Programs */}
          {programList.length > 0 && (
            <div className="up-section-card-mb">
              {programs_header.heading && (
                <h2 className="up-section-title">{programs_header.heading}</h2>
              )}
              <div className="up-grid-3">
                {programList.map((category, index) => {
                  const Icon = resolveIcon(category.icon);
                  return (
                    <div key={index} className="up-prog-card-blue">
                      <div className="up-prog-card-row">
                        <div className="up-prog-card-icon-blue">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="up-prog-card-title">{category.category}</h3>
                      </div>
                      <div className="up-prog-list">
                        {arr(category.list).map((program, idx) => (
                          <div key={idx} className="up-prog-item">
                            <CheckCircle className="up-prog-item-icon" />
                            <span className="up-prog-item-text">
                              {program?.name || program}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="up-prog-row">
                        {category.seats && (
                          <div className="up-prog-seats-blue">
                            {category.seats} Seats
                          </div>
                        )}
                        {category.cutoff && (
                          <div className="up-prog-cutoff">
                            {category.cutoff} Cutoff
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Exam Schedule */}
          {scheduleList.length > 0 && (
            <div className="up-section-card-mb">
              {schedule_header.heading && (
                <h2 className="up-section-title">{schedule_header.heading}</h2>
              )}
              <div className="up-step-list">
                {scheduleList.map((slot, index) => (
                  <div key={index} className="up-sched-row">
                    <div className="up-sched-left">
                      <Clock className="up-sched-blue-icon" />
                      <div>
                        <h3 className="up-sched-time">{slot.time}</h3>
                        <p className="up-sched-prog">{slot.programs}</p>
                      </div>
                    </div>
                    <div className="up-sched-right-stack">
                      {slot.duration && (
                        <div className="up-sched-duration-blue">{slot.duration}</div>
                      )}
                      {slot.difficulty && (
                        <div className="up-sched-difficulty">{slot.difficulty}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Dates */}
          {dates.length > 0 && (
            <div className="up-section-card-mb">
              {dates_header.heading && (
                <h2 className="up-section-title">{dates_header.heading}</h2>
              )}
              <div className="up-step-list">
                {dates.map((d, index) => (
                  <div key={index} className="up-date-row-blue">
                    <div className="up-sched-left">
                      <div
                        className={
                          isDone(d.status)
                            ? "up-date-dot-completed"
                            : "up-date-dot-pending"
                        }
                      ></div>
                      <div>
                        <h3 className="up-date-event">{d.event}</h3>
                        <p className="up-date-text">{d.date}</p>
                      </div>
                    </div>
                    <span
                      className={
                        isDone(d.status)
                          ? "up-date-status-completed"
                          : "up-date-status-pending"
                      }
                    >
                      {statusLabel(d.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Preparation */}
          {strategies.length > 0 && (
            <div className="up-section-card">
              {preparation_header.heading && (
                <h2 className="up-section-title">{preparation_header.heading}</h2>
              )}
              <div className="up-grid-2">
                {strategies.map((strategy, index) => {
                  const Icon = resolveIcon(strategy.icon);
                  return (
                    <div key={index} className="up-strategy-card">
                      <div className="up-strategy-row">
                        <div className="up-strategy-icon">
                          <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="up-strategy-title">{strategy.title}</h3>
                      </div>
                      {strategy.description && (
                        <div
                          className="up-strategy-desc"
                          dangerouslySetInnerHTML={{ __html: strategy.description }}
                        />
                      )}
                      {arr(strategy.tips).length > 0 && (
                        <div className="up-strategy-tips">
                          {arr(strategy.tips).map((tip, idx) => (
                            <div key={idx} className="up-strategy-tip">
                              <div className="up-strategy-bullet"></div>
                              <span className="up-strategy-tip-text">
                                {tip?.text || tip}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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

export default Phase2Page;
