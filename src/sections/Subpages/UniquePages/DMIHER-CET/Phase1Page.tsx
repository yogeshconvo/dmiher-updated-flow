import React from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  AlertCircle,
  FileText,
  Monitor,
  Shield,
  Target,
  Zap,
} from "lucide-react";

function Phase1Page() {
  const phase1Programs = [
    {
      category: "Engineering Programs",
      programs: [
        "Computer Science Engineering",
        "Electronics & Communication",
        "Mechanical Engineering",
        "Civil Engineering",
        "Electrical Engineering",
      ],
      seats: 240,
      icon: <Zap className="w-6 h-6" />,
    },
    {
      category: "Health Sciences",
      programs: ["MBBS", "BDS", "BAMS", "BHMS", "B.Sc Nursing"],
      seats: 180,
      icon: <Shield className="w-6 h-6" />,
    },
    {
      category: "Pharmacy",
      programs: ["B.Pharm", "Pharm.D"],
      seats: 120,
      icon: <Target className="w-6 h-6" />,
    },
  ];

  const examSchedule = [
    {
      time: "09:00 AM - 12:00 PM",
      programs: "Engineering Programs",
      duration: "3 hours",
    },
    {
      time: "02:00 PM - 05:00 PM",
      programs: "Health Sciences",
      duration: "3 hours",
    },
    {
      time: "06:00 PM - 08:00 PM",
      programs: "Pharmacy Programs",
      duration: "2 hours",
    },
  ];

  const importantDates = [
    { event: "Application Start", date: "March 15, 2025", status: "Closed" },
    {
      event: "Application Deadline",
      date: "April 30, 2025",
      status: "Closed",
    },
    { event: "Admit Card Release", date: "May 10, 2025", status: "Closed" },
    { event: "Phase 1 Exam", date: "May 20-25, 2025", status: "Closed" },
    { event: "Result Declaration", date: "June 5, 2025", status: "Closed" },
  ];

  const preparationTips = [
    {
      title: "Study Plan",
      description:
        "Create a structured 60-day study plan covering all subjects",
      icon: <BookOpen className="w-8 h-8" />,
    },
    {
      title: "Mock Tests",
      description:
        "Take at least 3 mock tests per week to improve speed and accuracy",
      icon: <Monitor className="w-8 h-8" />,
    },
    {
      title: "Time Management",
      description: "Practice solving questions within the allocated time frame",
      icon: <Clock className="w-8 h-8" />,
    },
    {
      title: "Revision Strategy",
      description:
        "Dedicate the last 15 days for intensive revision and weak areas",
      icon: <Target className="w-8 h-8" />,
    },
  ];

  return (
    <div className="up-page-gray">
      {/* Header */}
      <div className="up-header-px">
        <div className="up-header-container">
          <Link to="/dmiher-cet" className="up-back-link">
            <ArrowLeft className="up-back-icon" />
            Back to Home
          </Link>
          <div className="up-header-icon-large">
            <div className="up-header-icon-wrap">
              <Calendar className="up-header-icon" />
            </div>
            <div>
              <h1 className="up-header-title-large">
                Phase 1 Examination
              </h1>
              <p className="up-header-subtitle-opacity">
                May 2025 • Primary Selection Round
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="py-12 px-4">
        <div className="up-header-container">
          <div className="up-section-card-mb">
            <h2 className="up-section-title">
              Phase 1 Overview
            </h2>
            <div className="up-grid-3">
              <div className="up-stat-blue">
                <Users className="up-stat-icon-blue" />
                <h3 className="up-stat-label-blue">
                  Total Seats
                </h3>
                <p className="up-stat-value-blue">540</p>
              </div>
              <div className="up-stat-green">
                <Clock className="up-stat-icon-green" />
                <h3 className="up-stat-label-green">
                  Duration
                </h3>
                <p className="up-stat-value-green">2-3 Hours</p>
              </div>
              <div className="up-stat-purple">
                <FileText className="up-stat-icon-purple" />
                <h3 className="up-stat-label-purple">
                  Question Type
                </h3>
                <p className="up-stat-value-purple">MCQs</p>
              </div>
            </div>
          </div>

          {/* Programs Available */}
          <div className="up-section-card-mb">
            <h2 className="up-section-title">
              Programs Available in Phase 1
            </h2>
            <div className="up-grid-3">
              {phase1Programs.map((category, index) => (
                <div key={index} className="up-prog-card">
                  <div className="up-prog-card-row">
                    <div className="up-prog-card-icon">{category.icon}</div>
                    <h3 className="up-prog-card-title">
                      {category.category}
                    </h3>
                  </div>
                  <div className="up-prog-list">
                    {category.programs.map((program, idx) => (
                      <div key={idx} className="up-prog-item">
                        <CheckCircle className="up-prog-item-icon" />
                        <span className="up-prog-item-text">{program}</span>
                      </div>
                    ))}
                  </div>
                  <div className="up-prog-seats">
                    {category.seats} Seats Available
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Schedule */}
          <div className="up-section-card-mb">
            <h2 className="up-section-title">
              Exam Schedule
            </h2>
            <div className="up-step-list">
              {examSchedule.map((slot, index) => (
                <div key={index} className="up-sched-row">
                  <div className="up-sched-left">
                    <Clock className="up-sched-icon" />
                    <div>
                      <h3 className="up-sched-time">
                        {slot.time}
                      </h3>
                      <p className="up-sched-prog">{slot.programs}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="up-sched-duration">
                      {slot.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Dates */}
          <div className="up-section-card-mb">
            <h2 className="up-section-title">
              Important Dates
            </h2>
            <div className="up-step-list">
              {importantDates.map((date, index) => (
                <div key={index} className="up-date-row">
                  <div className="up-sched-left">
                    <div
                      className={
                        date.status === "completed"
                          ? "up-date-dot-completed"
                          : "up-date-dot-pending"
                      }
                    ></div>
                    <div>
                      <h3 className="up-date-event">
                        {date.event}
                      </h3>
                      <p className="up-date-text">{date.date}</p>
                    </div>
                  </div>
                  <span
                    className={
                      date.status === "completed"
                        ? "up-date-status-completed"
                        : "up-date-status-pending"
                    }
                  >
                    {date.status === "completed" ? "Completed" : "Closed"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Tips */}
          <div className="up-section-card">
            <h2 className="up-section-title">
              Preparation Tips for Phase 1
            </h2>
            <div className="up-grid-2">
              {preparationTips.map((tip, index) => (
                <div key={index} className="up-tip-card">
                  <div className="up-tip-row">
                    <div className="up-tip-icon">{tip.icon}</div>
                    <h3 className="up-tip-title">
                      {tip.title}
                    </h3>
                  </div>
                  <p className="up-tip-desc">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alert Section */}
      <div className="up-alert-strip">
        <div className="up-header-container">
          <div className="up-alert-card">
            <div className="up-alert-row">
              <AlertCircle className="up-alert-icon" />
              <div>
                <h3 className="up-alert-title">Important Notice</h3>
                <p className="up-alert-text">
                  Candidates who qualify Phase 1 will be eligible for Phase 2.
                  Results will be declared within 15 days of the examination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Phase1Page;
