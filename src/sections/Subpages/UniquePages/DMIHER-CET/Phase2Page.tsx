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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-[#122E5E] text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/10 p-3 rounded-full">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Phase 2 Examination
              </h1>
              <p className="text-xl opacity-90">
                June 2025 • Advanced Selection Round
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Phase 2 Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-blue-800">
                  Total Seats
                </h3>
                <p className="text-2xl font-bold text-blue-600">330</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Clock className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-green-800">
                  Duration
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  2.5-3.5 Hours
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-purple-800">
                  Question Type
                </h3>
                <p className="text-2xl font-bold text-purple-600">
                  Advanced MCQs
                </p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-orange-800">
                  Difficulty
                </h3>
                <p className="text-2xl font-bold text-orange-600">High</p>
              </div>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Eligibility Criteria
            </h2>
            <div className="space-y-4">
              {eligibilityCriteria.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#122E5E] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle
                      className={`w-6 h-6 ${
                        item.status === "mandatory"
                          ? "text-red-500"
                          : item.status === "varies"
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.criteria}
                      </h3>
                      <p className="text-gray-600">{item.requirement}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "mandatory"
                        ? "bg-red-100 text-red-800"
                        : item.status === "varies"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-green-100 text-green-800"
                    }`}
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
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Advanced Programs in Phase 2
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phase2Programs.map((category, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:border-[#122E5E] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[#122E5E]">{category.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {category.category}
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    {category.programs.map((program, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 text-sm">{program}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="bg-[#122E5E] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {category.seats} Seats
                    </div>
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {category.cutoff} Cutoff
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Schedule */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Exam Schedule
            </h2>
            <div className="space-y-4">
              {examSchedule.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Clock className="w-6 h-6 text-[#122E5E]" />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {slot.time}
                      </h3>
                      <p className="text-gray-600">{slot.programs}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="bg-[#122E5E] text-white px-3 py-1 rounded-full text-sm">
                      {slot.duration}
                    </div>
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {slot.difficulty}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Dates */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Important Dates
            </h2>
            <div className="space-y-4">
              {importantDates.map((date, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-l-4 border-[#122E5E] bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        date.status === "completed"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                    ></div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {date.event}
                      </h3>
                      <p className="text-gray-600">{date.date}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      date.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {date.status === "completed" ? "Completed" : "Upcoming"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Preparation */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Advanced Preparation Strategy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advancedPreparation.map((strategy, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-lg hover:border-[#122E5E] transition-colors"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-[#122E5E]">{strategy.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {strategy.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">{strategy.description}</p>
                  <div className="space-y-2">
                    {strategy.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#122E5E] rounded-full"></div>
                        <span className="text-gray-600 text-sm">{tip}</span>
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
      <div className="bg-[#122E5E] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 text-white">
              <AlertCircle className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Phase 2 Notice</h3>
                <p className="opacity-90">
                  Phase 2 is highly competitive with advanced level questions.
                  Only top performers from Phase 1 are eligible. Prepare
                  thoroughly for specialized and research-oriented programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="bg-gray-800 text-center py-8 px-4">
        <p className="text-gray-400">© 2025 DMIHER CET Information Portal. All rights reserved.</p>
      </div> */}
    </div>
  );
}

export default Phase2Page;
