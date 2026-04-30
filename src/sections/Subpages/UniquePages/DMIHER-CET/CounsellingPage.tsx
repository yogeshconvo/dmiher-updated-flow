import React, { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Users,
  Calendar,
  Clock,
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Phone,
  Mail,
  Globe,
  Building,
  CreditCard,
  BookOpen,
  Award,
  User,
  GraduationCap,
} from "lucide-react";

function CounsellingPage() {
  const [selectedRound, setSelectedRound] = useState("round1");

  const counsellingSchedule = {
    round1: [
      {
        date: "August 5-7, 2025",
        category: "General & OBC",
        seats: "70% of total seats",
        venue: "DMIHER Campus, Wardha",
      },
      {
        date: "August 8-9, 2025",
        category: "SC/ST",
        seats: "Reserved seats",
        venue: "DMIHER Campus, Wardha",
      },
      {
        date: "August 10, 2025",
        category: "PWD",
        seats: "Reserved seats",
        venue: "DMIHER Campus, Wardha",
      },
    ],
    round2: [
      {
        date: "August 15-16, 2025",
        category: "All Categories",
        seats: "Remaining seats",
        venue: "DMIHER Campus, Wardha",
      },
      {
        date: "August 17, 2025",
        category: "Spot Round",
        seats: "Vacant seats",
        venue: "DMIHER Campus, Wardha",
      },
    ],
    round3: [
      {
        date: "August 22-23, 2025",
        category: "Final Round",
        seats: "All vacant seats",
        venue: "DMIHER Campus, Wardha",
      },
      {
        date: "August 24, 2025",
        category: "Mop-up Round",
        seats: "Last chance",
        venue: "DMIHER Campus, Wardha",
      },
    ],
  };

  const requiredDocuments = [
    { document: "Merit List Rank Card", mandatory: true, copies: 2 },
    { document: "10th Mark Sheet & Certificate", mandatory: true, copies: 2 },
    { document: "12th Mark Sheet & Certificate", mandatory: true, copies: 2 },
    { document: "Transfer Certificate", mandatory: true, copies: 1 },
    { document: "Migration Certificate", mandatory: true, copies: 1 },
    {
      document: "Category Certificate (if applicable)",
      mandatory: false,
      copies: 2,
    },
    {
      document: "PWD Certificate (if applicable)",
      mandatory: false,
      copies: 2,
    },
    { document: "Domicile Certificate", mandatory: true, copies: 2 },
    { document: "Passport Size Photographs", mandatory: true, copies: 6 },
    { document: "Aadhar Card", mandatory: true, copies: 2 },
    { document: "Income Certificate", mandatory: false, copies: 2 },
  ];

  const counsellingProcess = [
    {
      step: 1,
      title: "Document Verification",
      description: "Submit all required documents for verification",
      duration: "30-45 minutes",
      icon: <FileText className="w-8 h-8" />,
    },
    {
      step: 2,
      title: "Choice Filling",
      description: "Select your preferred programs and colleges",
      duration: "15-20 minutes",
      icon: <BookOpen className="w-8 h-8" />,
    },
    {
      step: 3,
      title: "Seat Allotment",
      description: "Seats allocated based on merit and preferences",
      duration: "Real-time",
      icon: <Award className="w-8 h-8" />,
    },
    {
      step: 4,
      title: "Fee Payment",
      description: "Pay admission fees to confirm your seat",
      duration: "10-15 minutes",
      icon: <CreditCard className="w-8 h-8" />,
    },
    {
      step: 5,
      title: "Admission Confirmation",
      description: "Receive admission confirmation and college details",
      duration: "5 minutes",
      icon: <GraduationCap className="w-8 h-8" />,
    },
  ];

  // const feeStructure = [
  //   {
  //     program: "MBBS",
  //     tuitionFee: "₹18,50,000",
  //     hostelFee: "₹1,20,000",
  //     totalFee: "₹19,70,000",
  //   },
  //   {
  //     program: "BDS",
  //     tuitionFee: "₹12,00,000",
  //     hostelFee: "₹1,20,000",
  //     totalFee: "₹13,20,000",
  //   },
  //   {
  //     program: "B.Pharm",
  //     tuitionFee: "₹3,50,000",
  //     hostelFee: "₹1,20,000",
  //     totalFee: "₹4,70,000",
  //   },
  //   {
  //     program: "Engineering",
  //     tuitionFee: "₹4,50,000",
  //     hostelFee: "₹1,20,000",
  //     totalFee: "₹5,70,000",
  //   },
  //   {
  //     program: "B.Sc Nursing",
  //     tuitionFee: "₹2,80,000",
  //     hostelFee: "₹1,20,000",
  //     totalFee: "₹4,00,000",
  //   },
  //   {
  //     program: "BAMS",
  //     tuitionFee: "₹8,50,000",
  //     hostelFee: "₹1,20,000",
  //     totalFee: "₹9,70,000",
  //   },
  // ];

  const contactInfo = [
    {
      type: "Phone",
      value: "+91-7152-287701",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      type: "Email",
      value: "admissions@dmiher.edu.in",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      type: "Website",
      value: "www.dmiher.edu.in",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      type: "Address",
      value: "DMIHER, Sawangi (Meghe), Wardha - 442001",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  const importantInstructions = [
    "Candidates must report at the counselling venue 30 minutes before their scheduled time",
    "Original documents along with photocopies are mandatory for verification",
    "Seat allotment is final and no changes will be entertained after confirmation",
    "Fee payment must be completed on the same day to secure the allotted seat",
    "Candidates who fail to report for counselling will forfeit their eligibility",
    "Mobile phones are not allowed inside the counselling hall",
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
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Counselling Process
              </h1>
              <p className="text-xl opacity-90">
                August 2025 • Seat Allotment & Admission
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Round Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Counselling Rounds
            </h2>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => setSelectedRound("round1")}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedRound === "round1"
                    ? "bg-[#F04E30] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Round 1
              </button>
              <button
                onClick={() => setSelectedRound("round2")}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedRound === "round2"
                    ? "bg-[#122E5E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Round 2
              </button>
              <button
                onClick={() => setSelectedRound("round3")}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedRound === "round3"
                    ? "bg-gradient-to-r from-[#F04E30] to-[#122E5E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Round 3 (Final)
              </button>
            </div>
          </div>

          {/* Counselling Schedule */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {selectedRound === "round1"
                ? "Round 1"
                : selectedRound === "round2"
                ? "Round 2"
                : "Round 3"}{" "}
              Schedule
            </h2>
            <div className="space-y-4">
              {counsellingSchedule[selectedRound].map((schedule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#F04E30] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Calendar className="w-6 h-6 text-[#F04E30]" />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {schedule.date}
                      </h3>
                      <p className="text-gray-600">{schedule.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-[#F04E30] text-white px-3 py-1 rounded-full text-sm mb-1">
                      {schedule.seats}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>Wardha Campus</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Counselling Process */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Counselling Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {counsellingProcess.map((process, index) => (
                <div key={index} className="text-center">
                  <div className="bg-[#F04E30] text-white p-4 rounded-full inline-block mb-4 hover:bg-[#122E5E] transition-colors">
                    {process.icon}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-[#F04E30] mb-2">
                      Step {process.step}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {process.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {process.description}
                    </p>
                    <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                      {process.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Required Documents
              </h2>
              <button className="flex items-center gap-2 bg-[#F04E30] text-white px-4 py-2 rounded-lg hover:bg-[#122E5E] transition-colors">
                <Download className="w-5 h-5" />
                Download Checklist
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requiredDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className={`w-5 h-5 ${
                        doc.mandatory ? "text-red-500" : "text-green-500"
                      }`}
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {doc.document}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {doc.mandatory ? "Mandatory" : "If Applicable"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {doc.copies} {doc.copies === 1 ? "copy" : "copies"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Structure */}
          {/* <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Fee Structure (Annual)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Program
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Tuition Fee
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Hostel Fee
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Total Fee
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {feeStructure.map((fee, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {fee.program}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {fee.tuitionFee}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {fee.hostelFee}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#F04E30]">
                        {fee.totalFee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">
                  Note: Fees are subject to annual revision and additional
                  charges may apply.
                </span>
              </div>
            </div>
          </div> */}

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="text-[#F04E30]">{contact.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {contact.type}
                    </h3>
                    <p className="text-gray-600">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Important Instructions
            </h2>
            <div className="space-y-3">
              {importantInstructions.map((instruction, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-6 h-6 bg-[#F04E30] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{instruction}</p>
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
                <h3 className="text-lg font-semibold mb-2">
                  Counselling Notice
                </h3>
                <p className="opacity-90">
                  Candidates are advised to stay updated with the official
                  website for any changes in counselling schedule. Ensure all
                  documents are ready before attending counselling.
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

export default CounsellingPage;
