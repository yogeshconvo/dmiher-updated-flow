import React from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  FileText,
  Shield,
  Target,
  Award,
  TrendingUp,
  Brain,
} from "lucide-react";

function Phase2Page() {
  const phase2Programs = [
    {
      category: "Advanced Engineering",
      programs: [
        "AI & Machine Learning",
        "Robotics Engineering",
        "Cyber Security",
        "Data Science",
        "Biotechnology",
      ],
      seats: 150,
      icon: <Brain className="w-6 h-6" />,
      cutoff: "85%",
    },
    {
      category: "Specialized Health Sciences",
      programs: [
        "MD Programs",
        "MS Programs",
        "MDS",
        "Physiotherapy",
        "Occupational Therapy",
      ],
      seats: 100,
      icon: <Shield className="w-6 h-6" />,
      cutoff: "90%",
    },
    {
      category: "Research Programs",
      programs: ["M.Pharm", "PhD Programs", "Research Fellowship"],
      seats: 80,
      icon: <Target className="w-6 h-6" />,
      cutoff: "88%",
    },
  ];

  const examSchedule = [
    {
      time: "09:00 AM - 12:30 PM",
      programs: "Advanced Engineering",
      duration: "3.5 hours",
      difficulty: "High",
    },
    {
      time: "02:00 PM - 05:30 PM",
      programs: "Specialized Health Sciences",
      duration: "3.5 hours",
      difficulty: "Very High",
    },
    {
      time: "06:00 PM - 08:30 PM",
      programs: "Research Programs",
      duration: "2.5 hours",
      difficulty: "High",
    },
  ];

  const importantDates = [
    { event: "Phase 1 Results", date: "June 5, 2025", status: "Closed" },
    {
      event: "Phase 2 Registration",
      date: "June 10-15, 2025",
      status: "Closed",
    },
    { event: "Admit Card Release", date: "June 18, 2025", status: "Closed" },
    { event: "Phase 2 Exam", date: "June 25-30, 2025", status: "Closed" },
    { event: "Final Results", date: "July 10, 2025", status: "Closed" },
  ];

  const advancedPreparation = [
    {
      title: "Advanced Problem Solving",
      description:
        "Focus on complex analytical and application-based questions",
      icon: <Brain className="w-8 h-8" />,
      tips: [
        "Practice case studies",
        "Solve previous year papers",
        "Focus on conceptual clarity",
      ],
    },
    {
      title: "Time Optimization",
      description:
        "Master advanced time management techniques for longer duration",
      icon: <Clock className="w-8 h-8" />,
      tips: [
        "Practice 4-hour mock tests",
        "Develop question prioritization",
        "Learn quick elimination techniques",
      ],
    },
    {
      title: "Subject Mastery",
      description:
        "Achieve deep understanding of core subjects with advanced topics",
      icon: <Award className="w-8 h-8" />,
      tips: [
        "Study advanced concepts",
        "Practice interdisciplinary questions",
        "Focus on research methodology",
      ],
    },
    {
      title: "Mental Preparation",
      description:
        "Build stamina and focus for the intensive examination format",
      icon: <TrendingUp className="w-8 h-8" />,
      tips: [
        "Practice meditation",
        "Maintain consistent sleep schedule",
        "Build exam endurance",
      ],
    },
  ];

  const eligibilityCriteria = [
    {
      criteria: "Phase 1 Qualification",
      requirement: "Must have qualified Phase 1 with minimum 75% marks",
      status: "mandatory",
    },
    {
      criteria: "Academic Performance",
      requirement: "Minimum 80% in qualifying examination",
      status: "mandatory",
    },
    {
      criteria: "Program Specific",
      requirement: "Meet specific program requirements",
      status: "varies",
    },
    {
      criteria: "Document Verification",
      requirement: "Complete document verification process",
      status: "mandatory",
    },
  ];

  return (
    <div className="up-page-gray">
      {/* Header */}
      <div className="up-header-px">
        <div className="up-header-container">
          <Link to="/" className="up-back-link">
            <ArrowLeft className="up-back-icon" />
            Back to Home
          </Link>
          <div className="up-header-icon-large">
            <div className="up-header-icon-wrap">
              <Calendar className="up-header-icon" />
            </div>
            <div>
              <h1 className="up-header-title-large">
                Phase 2 Examination
              </h1>
              <p className="up-header-subtitle-opacity">
                June 2025 • Advanced Selection Round
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
              Phase 2 Overview
            </h2>
            <div className="up-grid-4-stat">
              <div className="up-stat-blue">
                <Users className="up-stat-icon-blue" />
                <h3 className="up-stat-label-blue">Total Seats</h3>
                <p className="up-stat-value-blue">330</p>
              </div>
              <div className="up-stat-green">
                <Clock className="up-stat-icon-green" />
                <h3 className="up-stat-label-green">Duration</h3>
                <p className="up-stat-value-green">2.5-3.5 Hours</p>
              </div>
              <div className="up-stat-purple">
                <FileText className="up-stat-icon-purple" />
                <h3 className="up-stat-label-purple">Question Type</h3>
                <p className="up-stat-value-purple">Advanced MCQs</p>
              </div>
              <div className="up-stat-orange">
                <TrendingUp className="up-stat-icon-orange" />
                <h3 className="up-stat-label-orange">Difficulty</h3>
                <p className="up-stat-value-orange">High</p>
              </div>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="up-section-card-mb">
            <h2 className="up-section-title">
              Eligibility Criteria
            </h2>
            <div className="up-step-list">
              {eligibilityCriteria.map((item, index) => (
                <div key={index} className="up-elig-row">
                  <div className="up-elig-row-left">
                    <CheckCircle
                      className={
                        item.status === "mandatory"
                          ? "up-elig-icon-mandatory"
                          : item.status === "varies"
                          ? "up-elig-icon-varies"
                          : "up-elig-icon-optional"
                      }
                    />
                    <div>
                      <h3 className="up-date-event">
                        {item.criteria}
                      </h3>
                      <p className="up-date-text">{item.requirement}</p>
                    </div>
                  </div>
                  <span
                    className={
                      item.status === "mandatory"
                        ? "up-elig-status-mandatory"
                        : item.status === "varies"
                        ? "up-elig-status-varies"
                        : "up-elig-status-optional"
                    }
                  >
                    {item.status === "mandatory"
                      ? "Required"
                      : item.status === "varies"
                      ? "Program Specific"
                      : "Optional"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Programs Available */}
          <div className="up-section-card-mb">
            <h2 className="up-section-title">
              Advanced Programs in Phase 2
            </h2>
            <div className="up-grid-3">
              {phase2Programs.map((category, index) => (
                <div key={index} className="up-prog-card-blue">
                  <div className="up-prog-card-row">
                    <div className="up-prog-card-icon-blue">{category.icon}</div>
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
                  <div className="up-prog-row">
                    <div className="up-prog-seats-blue">
                      {category.seats} Seats
                    </div>
                    <div className="up-prog-cutoff">
                      {category.cutoff} Cutoff
                    </div>
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
                    <Clock className="up-sched-blue-icon" />
                    <div>
                      <h3 className="up-sched-time">
                        {slot.time}
                      </h3>
                      <p className="up-sched-prog">{slot.programs}</p>
                    </div>
                  </div>
                  <div className="up-sched-right-stack">
                    <div className="up-sched-duration-blue">
                      {slot.duration}
                    </div>
                    <div className="up-sched-difficulty">
                      {slot.difficulty}
                    </div>
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
                <div key={index} className="up-date-row-blue">
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
                    {date.status === "completed" ? "Completed" : "Upcoming"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Preparation */}
          <div className="up-section-card">
            <h2 className="up-section-title">
              Advanced Preparation Strategy
            </h2>
            <div className="up-grid-2">
              {advancedPreparation.map((strategy, index) => (
                <div key={index} className="up-strategy-card">
                  <div className="up-strategy-row">
                    <div className="up-strategy-icon">{strategy.icon}</div>
                    <h3 className="up-strategy-title">
                      {strategy.title}
                    </h3>
                  </div>
                  <p className="up-strategy-desc">{strategy.description}</p>
                  <div className="up-strategy-tips">
                    {strategy.tips.map((tip, idx) => (
                      <div key={idx} className="up-strategy-tip">
                        <div className="up-strategy-bullet"></div>
                        <span className="up-strategy-tip-text">{tip}</span>
                      </div>
                    ))}
                  </div>
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
                <h3 className="up-alert-title">Phase 2 Notice</h3>
                <p className="up-alert-text">
                  Phase 2 is highly competitive with advanced level questions.
                  Only top performers from Phase 1 are eligible. Prepare
                  thoroughly for specialized and research-oriented programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Phase2Page;
