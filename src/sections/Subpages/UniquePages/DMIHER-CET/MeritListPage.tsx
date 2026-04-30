import React, { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Award,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertCircle,
  Trophy,
  Medal,
  Star,
  Users,
  TrendingUp,
  Calendar,
  FileText,
} from "lucide-react";

function MeritListPage() {
  const [selectedPhase, setSelectedPhase] = useState("phase1");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const meritListData = {
    phase1: [
      {
        rank: 1,
        name: "Arjun Sharma",
        rollNo: "DMI2025001",
        score: 198,
        category: "General",
        program: "MBBS",
      },
      {
        rank: 2,
        name: "Priya Patel",
        rollNo: "DMI2025002",
        score: 196,
        category: "General",
        program: "Computer Science",
      },
      {
        rank: 3,
        name: "Rahul Kumar",
        rollNo: "DMI2025003",
        score: 194,
        category: "OBC",
        program: "MBBS",
      },
      {
        rank: 4,
        name: "Sneha Reddy",
        rollNo: "DMI2025004",
        score: 192,
        category: "General",
        program: "Electronics",
      },
      {
        rank: 5,
        name: "Vikram Singh",
        rollNo: "DMI2025005",
        score: 190,
        category: "SC",
        program: "BDS",
      },
      {
        rank: 6,
        name: "Ananya Gupta",
        rollNo: "DMI2025006",
        score: 188,
        category: "General",
        program: "B.Pharm",
      },
      {
        rank: 7,
        name: "Karthik Nair",
        rollNo: "DMI2025007",
        score: 186,
        category: "OBC",
        program: "Mechanical",
      },
      {
        rank: 8,
        name: "Divya Joshi",
        rollNo: "DMI2025008",
        score: 184,
        category: "General",
        program: "BAMS",
      },
      {
        rank: 9,
        name: "Rohit Agarwal",
        rollNo: "DMI2025009",
        score: 182,
        category: "General",
        program: "Civil",
      },
      {
        rank: 10,
        name: "Kavya Menon",
        rollNo: "DMI2025010",
        score: 180,
        category: "OBC",
        program: "B.Sc Nursing",
      },
      {
        rank: 11,
        name: "Aditya Verma",
        rollNo: "DMI2025011",
        score: 178,
        category: "General",
        program: "Electrical",
      },
      {
        rank: 12,
        name: "Riya Shah",
        rollNo: "DMI2025012",
        score: 176,
        category: "General",
        program: "BHMS",
      },
      {
        rank: 13,
        name: "Manish Yadav",
        rollNo: "DMI2025013",
        score: 174,
        category: "OBC",
        program: "Biotechnology",
      },
      {
        rank: 14,
        name: "Pooja Kumari",
        rollNo: "DMI2025014",
        score: 172,
        category: "SC",
        program: "Physiotherapy",
      },
      {
        rank: 15,
        name: "Siddharth Jain",
        rollNo: "DMI2025015",
        score: 170,
        category: "General",
        program: "Pharm.D",
      },
    ],
    phase2: [
      {
        rank: 1,
        name: "Arjun Sharma",
        rollNo: "DMI2025001",
        score: 195,
        category: "General",
        program: "MD Internal Medicine",
      },
      {
        rank: 2,
        name: "Priya Patel",
        rollNo: "DMI2025002",
        score: 193,
        category: "General",
        program: "AI & ML",
      },
      {
        rank: 3,
        name: "Rahul Kumar",
        rollNo: "DMI2025003",
        score: 191,
        category: "OBC",
        program: "MS Surgery",
      },
      {
        rank: 4,
        name: "Sneha Reddy",
        rollNo: "DMI2025004",
        score: 189,
        category: "General",
        program: "Robotics Engineering",
      },
      {
        rank: 5,
        name: "Vikram Singh",
        rollNo: "DMI2025005",
        score: 187,
        category: "SC",
        program: "MDS",
      },
      {
        rank: 6,
        name: "Ananya Gupta",
        rollNo: "DMI2025006",
        score: 185,
        category: "General",
        program: "M.Pharm",
      },
      {
        rank: 7,
        name: "Karthik Nair",
        rollNo: "DMI2025007",
        score: 183,
        category: "OBC",
        program: "Cyber Security",
      },
      {
        rank: 8,
        name: "Divya Joshi",
        rollNo: "DMI2025008",
        score: 181,
        category: "General",
        program: "PhD Biotechnology",
      },
      {
        rank: 9,
        name: "Rohit Agarwal",
        rollNo: "DMI2025009",
        score: 179,
        category: "General",
        program: "Data Science",
      },
      {
        rank: 10,
        name: "Kavya Menon",
        rollNo: "DMI2025010",
        score: 177,
        category: "OBC",
        program: "Research Fellowship",
      },
    ],
  };

  const categories = ["all", "General", "OBC", "SC", "ST"];

  const filteredData = meritListData[selectedPhase].filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || student.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <Star className="w-6 h-6 text-blue-500" />;
  };

  const statistics = {
    phase1: {
      totalCandidates: 2450,
      qualified: 540,
      qualificationRate: "22%",
      highestScore: 198,
      cutoffGeneral: 165,
      cutoffOBC: 155,
      cutoffSC: 145,
    },
    phase2: {
      totalCandidates: 540,
      qualified: 330,
      qualificationRate: "61%",
      highestScore: 195,
      cutoffGeneral: 170,
      cutoffOBC: 160,
      cutoffSC: 150,
    },
  };

  const currentStats = statistics[selectedPhase];

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
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Merit List 2025
              </h1>
              <p className="text-xl opacity-90">Official Rankings & Results</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Phase Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Select Phase
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedPhase("phase1")}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedPhase === "phase1"
                    ? "bg-[#F04E30] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Phase 1 Results
              </button>
              <button
                onClick={() => setSelectedPhase("phase2")}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedPhase === "phase2"
                    ? "bg-[#122E5E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Phase 2 Results
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {selectedPhase === "phase1" ? "Phase 1" : "Phase 2"} Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-blue-800">
                  Total Candidates
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {currentStats.totalCandidates}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-green-800">
                  Qualified
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {currentStats.qualified}
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-purple-800">
                  Success Rate
                </h3>
                <p className="text-2xl font-bold text-purple-600">
                  {currentStats.qualificationRate}
                </p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Trophy className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-orange-800">
                  Highest Score
                </h3>
                <p className="text-2xl font-bold text-orange-600">
                  {currentStats.highestScore}
                </p>
              </div>
            </div>

            {/* Cutoff Information */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Category-wise Cutoff Marks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium text-gray-700">General</span>
                  <span className="font-bold text-[#F04E30]">
                    {currentStats.cutoffGeneral}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium text-gray-700">OBC</span>
                  <span className="font-bold text-[#F04E30]">
                    {currentStats.cutoffOBC}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium text-gray-700">SC/ST</span>
                  <span className="font-bold text-[#F04E30]">
                    {currentStats.cutoffSC}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or roll number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F04E30] focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#F04E30] focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="flex items-center gap-2 bg-[#F04E30] text-white px-4 py-2 rounded-lg hover:bg-[#122E5E] transition-colors">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Merit List Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedPhase === "phase1" ? "Phase 1" : "Phase 2"} Merit List
              </h2>
              <p className="text-gray-600 mt-1">
                Showing {filteredData.length} of{" "}
                {meritListData[selectedPhase].length} candidates
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Roll Number
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Program
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((student, index) => (
                    <tr
                      key={student.rollNo}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(student.rank)}
                          <span className="font-semibold text-gray-800">
                            {student.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">
                          {student.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600 font-mono">
                          {student.rollNo}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#F04E30]">
                          {student.score}/200
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.category === "General"
                              ? "bg-blue-100 text-blue-800"
                              : student.category === "OBC"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {student.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">{student.program}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-8 bg-[#122E5E] rounded-xl p-6 text-white">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Important Notice</h3>
                <p className="opacity-90">
                  This merit list is provisional and subject to verification of
                  documents. Candidates are advised to report for counselling as
                  per the schedule with all required documents.
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

export default MeritListPage;
