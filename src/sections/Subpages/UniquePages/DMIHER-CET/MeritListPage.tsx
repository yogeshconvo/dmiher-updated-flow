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
} from "lucide-react";

function MeritListPage() {
  const [selectedPhase, setSelectedPhase] = useState("phase1");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const meritListData = {
    phase1: [
      { rank: 1, name: "Arjun Sharma", rollNo: "DMI2025001", score: 198, category: "General", program: "MBBS" },
      { rank: 2, name: "Priya Patel", rollNo: "DMI2025002", score: 196, category: "General", program: "Computer Science" },
      { rank: 3, name: "Rahul Kumar", rollNo: "DMI2025003", score: 194, category: "OBC", program: "MBBS" },
      { rank: 4, name: "Sneha Reddy", rollNo: "DMI2025004", score: 192, category: "General", program: "Electronics" },
      { rank: 5, name: "Vikram Singh", rollNo: "DMI2025005", score: 190, category: "SC", program: "BDS" },
      { rank: 6, name: "Ananya Gupta", rollNo: "DMI2025006", score: 188, category: "General", program: "B.Pharm" },
      { rank: 7, name: "Karthik Nair", rollNo: "DMI2025007", score: 186, category: "OBC", program: "Mechanical" },
      { rank: 8, name: "Divya Joshi", rollNo: "DMI2025008", score: 184, category: "General", program: "BAMS" },
      { rank: 9, name: "Rohit Agarwal", rollNo: "DMI2025009", score: 182, category: "General", program: "Civil" },
      { rank: 10, name: "Kavya Menon", rollNo: "DMI2025010", score: 180, category: "OBC", program: "B.Sc Nursing" },
      { rank: 11, name: "Aditya Verma", rollNo: "DMI2025011", score: 178, category: "General", program: "Electrical" },
      { rank: 12, name: "Riya Shah", rollNo: "DMI2025012", score: 176, category: "General", program: "BHMS" },
      { rank: 13, name: "Manish Yadav", rollNo: "DMI2025013", score: 174, category: "OBC", program: "Biotechnology" },
      { rank: 14, name: "Pooja Kumari", rollNo: "DMI2025014", score: 172, category: "SC", program: "Physiotherapy" },
      { rank: 15, name: "Siddharth Jain", rollNo: "DMI2025015", score: 170, category: "General", program: "Pharm.D" },
    ],
    phase2: [
      { rank: 1, name: "Arjun Sharma", rollNo: "DMI2025001", score: 195, category: "General", program: "MD Internal Medicine" },
      { rank: 2, name: "Priya Patel", rollNo: "DMI2025002", score: 193, category: "General", program: "AI & ML" },
      { rank: 3, name: "Rahul Kumar", rollNo: "DMI2025003", score: 191, category: "OBC", program: "MS Surgery" },
      { rank: 4, name: "Sneha Reddy", rollNo: "DMI2025004", score: 189, category: "General", program: "Robotics Engineering" },
      { rank: 5, name: "Vikram Singh", rollNo: "DMI2025005", score: 187, category: "SC", program: "MDS" },
      { rank: 6, name: "Ananya Gupta", rollNo: "DMI2025006", score: 185, category: "General", program: "M.Pharm" },
      { rank: 7, name: "Karthik Nair", rollNo: "DMI2025007", score: 183, category: "OBC", program: "Cyber Security" },
      { rank: 8, name: "Divya Joshi", rollNo: "DMI2025008", score: 181, category: "General", program: "PhD Biotechnology" },
      { rank: 9, name: "Rohit Agarwal", rollNo: "DMI2025009", score: 179, category: "General", program: "Data Science" },
      { rank: 10, name: "Kavya Menon", rollNo: "DMI2025010", score: 177, category: "OBC", program: "Research Fellowship" },
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
              <Award className="up-header-icon" />
            </div>
            <div>
              <h1 className="up-header-title-large">
                Merit List 2025
              </h1>
              <p className="up-header-subtitle-opacity">Official Rankings & Results</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="up-header-container">
          {/* Phase Selection */}
          <div className="up-section-card-light-pad">
            <h2 className="up-section-title">
              Select Phase
            </h2>
            <div className="up-phase-btn-row">
              <button
                onClick={() => setSelectedPhase("phase1")}
                className={`up-round-btn ${
                  selectedPhase === "phase1"
                    ? "up-round-btn-active-orange"
                    : "up-round-btn-inactive"
                }`}
              >
                Phase 1 Results
              </button>
              <button
                onClick={() => setSelectedPhase("phase2")}
                className={`up-round-btn ${
                  selectedPhase === "phase2"
                    ? "up-round-btn-active-blue"
                    : "up-round-btn-inactive"
                }`}
              >
                Phase 2 Results
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="up-section-card-mb">
            <h2 className="up-section-title">
              {selectedPhase === "phase1" ? "Phase 1" : "Phase 2"} Statistics
            </h2>
            <div className="up-grid-4-stat">
              <div className="up-stat-blue">
                <Users className="up-stat-icon-blue" />
                <h3 className="up-stat-label-blue">Total Candidates</h3>
                <p className="up-stat-value-blue">{currentStats.totalCandidates}</p>
              </div>
              <div className="up-stat-green">
                <CheckCircle className="up-stat-icon-green" />
                <h3 className="up-stat-label-green">Qualified</h3>
                <p className="up-stat-value-green">{currentStats.qualified}</p>
              </div>
              <div className="up-stat-purple">
                <TrendingUp className="up-stat-icon-purple" />
                <h3 className="up-stat-label-purple">Success Rate</h3>
                <p className="up-stat-value-purple">{currentStats.qualificationRate}</p>
              </div>
              <div className="up-stat-orange">
                <Trophy className="up-stat-icon-orange" />
                <h3 className="up-stat-label-orange">Highest Score</h3>
                <p className="up-stat-value-orange">{currentStats.highestScore}</p>
              </div>
            </div>

            {/* Cutoff Information */}
            <div className="up-cutoff-section">
              <h3 className="up-cutoff-h3">
                Category-wise Cutoff Marks
              </h3>
              <div className="up-cutoff-grid">
                <div className="up-cutoff-row">
                  <span className="up-cutoff-label">General</span>
                  <span className="up-cutoff-value">{currentStats.cutoffGeneral}</span>
                </div>
                <div className="up-cutoff-row">
                  <span className="up-cutoff-label">OBC</span>
                  <span className="up-cutoff-value">{currentStats.cutoffOBC}</span>
                </div>
                <div className="up-cutoff-row">
                  <span className="up-cutoff-label">SC/ST</span>
                  <span className="up-cutoff-value">{currentStats.cutoffSC}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="up-section-card-light-pad">
            <div className="up-search-row">
              <div className="up-search-flex">
                <Search className="up-search-icon" />
                <input
                  type="text"
                  placeholder="Search by name or roll number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="up-search-input"
                />
              </div>
              <div className="up-filter-row">
                <div className="up-filter-block">
                  <Filter className="up-filter-icon" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="up-filter-select"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="up-doc-download-btn">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Merit List Table */}
          <div className="up-merit-card">
            <div className="up-merit-card-header">
              <h2 className="up-section-title-h2">
                {selectedPhase === "phase1" ? "Phase 1" : "Phase 2"} Merit List
              </h2>
              <p className="up-merit-card-info">
                Showing {filteredData.length} of{" "}
                {meritListData[selectedPhase].length} candidates
              </p>
            </div>

            <div className="up-merit-table-wrap">
              <table className="up-merit-table-grey">
                <thead className="up-merit-thead-grey">
                  <tr>
                    <th className="up-merit-th-grey">Rank</th>
                    <th className="up-merit-th-grey">Name</th>
                    <th className="up-merit-th-grey">Roll Number</th>
                    <th className="up-merit-th-grey">Score</th>
                    <th className="up-merit-th-grey">Category</th>
                    <th className="up-merit-th-grey">Program</th>
                  </tr>
                </thead>
                <tbody className="up-merit-tbody-grey">
                  {filteredData.map((student) => (
                    <tr key={student.rollNo} className="up-merit-row-grey">
                      <td className="up-merit-td-grey">
                        <div className="up-merit-rank-row">
                          {getRankIcon(student.rank)}
                          <span className="up-merit-rank-text">
                            {student.rank}
                          </span>
                        </div>
                      </td>
                      <td className="up-merit-td-grey">
                        <div className="up-merit-name">
                          {student.name}
                        </div>
                      </td>
                      <td className="up-merit-td-grey">
                        <div className="up-merit-roll">
                          {student.rollNo}
                        </div>
                      </td>
                      <td className="up-merit-td-grey">
                        <div className="up-merit-score">
                          {student.score}/200
                        </div>
                      </td>
                      <td className="up-merit-td-grey">
                        <span
                          className={
                            student.category === "General"
                              ? "up-merit-cat-general"
                              : student.category === "OBC"
                              ? "up-merit-cat-obc"
                              : "up-merit-cat-other"
                          }
                        >
                          {student.category}
                        </span>
                      </td>
                      <td className="up-merit-td-grey">
                        <div className="up-merit-prog">{student.program}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Notice */}
          <div className="up-merit-notice">
            <div className="up-merit-notice-row">
              <AlertCircle className="up-alert-icon" />
              <div>
                <h3 className="up-alert-title">Important Notice</h3>
                <p className="up-alert-text">
                  This merit list is provisional and subject to verification of
                  documents. Candidates are advised to report for counselling as
                  per the schedule with all required documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeritListPage;
