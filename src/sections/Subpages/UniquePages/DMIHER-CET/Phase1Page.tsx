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
 * DMIHER-CET — Phase 1 subpage (section_id `dmiher_cet_phase1_subpage`).
 * Rendered by PageView with the micro-page `data` already fetched.
 *
 * data: { header:{heading,subheading}, overview_header:{heading},
 *   overview_stats:[{icon,title,value}], programs_header:{heading},
 *   programs:[{icon,category,seats,list:[{name}]}], schedule_header:{heading},
 *   schedule:[{time,programs,duration}], dates_header:{heading},
 *   important_dates:[{event,date,status}], tips_header:{heading},
 *   preparation_tips:[{icon,title,description}], alert:{heading,description} }
 */

const STAT_VARIANTS = [
  { wrap: "up-stat-blue", icon: "up-stat-icon-blue", label: "up-stat-label-blue", value: "up-stat-value-blue" },
  { wrap: "up-stat-green", icon: "up-stat-icon-green", label: "up-stat-label-green", value: "up-stat-value-green" },
  { wrap: "up-stat-purple", icon: "up-stat-icon-purple", label: "up-stat-label-purple", value: "up-stat-value-purple" },
  { wrap: "up-stat-orange", icon: "up-stat-icon-orange", label: "up-stat-label-orange", value: "up-stat-value-orange" },
];

const arr = (v) => (Array.isArray(v) ? v : []);
const isDone = (status) => String(status).toLowerCase() === "completed";
const statusLabel = (status) =>
  status ? String(status).charAt(0).toUpperCase() + String(status).slice(1) : "";

function Phase1Page({ data = {}, college }) {
  const {
    header = {},
    overview_header = {},
    overview_stats,
    programs_header = {},
    programs,
    schedule_header = {},
    schedule,
    dates_header = {},
    important_dates,
    tips_header = {},
    preparation_tips,
    alert = {},
  } = data || {};

  const backTo = college ? `/${college}/dmiher-cet` : "/";

  const stats = arr(overview_stats);
  const programList = arr(programs);
  const scheduleList = arr(schedule);
  const dates = arr(important_dates);
  const tips = arr(preparation_tips);

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
              <Calendar className="up-header-icon" />
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
              <div className="up-grid-3">
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
                    <div key={index} className="up-prog-card">
                      <div className="up-prog-card-row">
                        <div className="up-prog-card-icon">
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
                      {category.seats && (
                        <div className="up-prog-seats">
                          {category.seats} Seats Available
                        </div>
                      )}
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
                      <Clock className="up-sched-icon" />
                      <div>
                        <h3 className="up-sched-time">{slot.time}</h3>
                        <p className="up-sched-prog">{slot.programs}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="up-sched-duration">{slot.duration}</span>
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
                  <div key={index} className="up-date-row">
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

          {/* Preparation Tips */}
          {tips.length > 0 && (
            <div className="up-section-card">
              {tips_header.heading && (
                <h2 className="up-section-title">{tips_header.heading}</h2>
              )}
              <div className="up-grid-2">
                {tips.map((tip, index) => {
                  const Icon = resolveIcon(tip.icon);
                  return (
                    <div key={index} className="up-tip-card">
                      <div className="up-tip-row">
                        <div className="up-tip-icon">
                          <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="up-tip-title">{tip.title}</h3>
                      </div>
                      {tip.description && (
                        <div
                          className="up-tip-desc"
                          dangerouslySetInnerHTML={{ __html: tip.description }}
                        />
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

export default Phase1Page;
