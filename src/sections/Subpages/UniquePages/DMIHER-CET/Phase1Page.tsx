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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-[#122E5E] text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/dmiher-cet"
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
                Phase 1 Examination
              </h1>
              <p className="text-xl opacity-90">
                May 2025 • Primary Selection Round
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
              Phase 1 Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-blue-800">
                  Total Seats
                </h3>
                <p className="text-2xl font-bold text-blue-600">540</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Clock className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-green-800">
                  Duration
                </h3>
                <p className="text-2xl font-bold text-green-600">2-3 Hours</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-purple-800">
                  Question Type
                </h3>
                <p className="text-2xl font-bold text-purple-600">MCQs</p>
              </div>
            </div>
          </div>

          {/* Programs Available */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Programs Available in Phase 1
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phase1Programs.map((category, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:border-[#F04E30] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[#F04E30]">{category.icon}</div>
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
                  <div className="bg-[#F04E30] text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {category.seats} Seats Available
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
                    <Clock className="w-6 h-6 text-[#F04E30]" />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {slot.time}
                      </h3>
                      <p className="text-gray-600">{slot.programs}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-[#F04E30] text-white px-3 py-1 rounded-full text-sm">
                      {slot.duration}
                    </span>
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
                  className="flex items-center justify-between p-4 border-l-4 border-[#F04E30] bg-gray-50"
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
                    {date.status === "completed" ? "Completed" : "Closed"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Tips */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Preparation Tips for Phase 1
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {preparationTips.map((tip, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-lg hover:border-[#F04E30] transition-colors"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-[#F04E30]">{tip.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {tip.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{tip.description}</p>
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
                <h3 className="text-lg font-semibold mb-2">Important Notice</h3>
                <p className="opacity-90">
                  Candidates who qualify Phase 1 will be eligible for Phase 2.
                  Results will be declared within 15 days of the examination.
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

export default Phase1Page;
