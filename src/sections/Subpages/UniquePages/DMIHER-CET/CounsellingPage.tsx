import React, { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Phone,
  Mail,
  Globe,
  CreditCard,
  BookOpen,
  Award,
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
              <Users className="up-header-icon" />
            </div>
            <div>
              <h1 className="up-header-title-large">
                Counselling Process
              </h1>
              <p className="up-header-subtitle-opacity">
                August 2025 • Seat Allotment & Admission
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="up-header-container">
          {/* Round Selection */}
          <div className="up-section-card-light-pad">
            <h2 className="up-section-title">
              Counselling Rounds
            </h2>
            <div className="up-round-btns">
              <button
                onClick={() => setSelectedRound("round1")}
                className={`up-round-btn ${
                  selectedRound === "round1"
                    ? "up-round-btn-active-orange"
                    : "up-round-btn-inactive"
                }`}
              >
                Round 1
              </button>
              <button
                onClick={() => setSelectedRound("round2")}
                className={`up-round-btn ${
                  selectedRound === "round2"
                    ? "up-round-btn-active-blue"
                    : "up-round-btn-inactive"
                }`}
              >
                Round 2
              </button>
              <button
                onClick={() => setSelectedRound("round3")}
                className={`up-round-btn ${
                  selectedRound === "round3"
                    ? "up-round-btn-active-grad"
                    : "up-round-btn-inactive"
                }`}
              >
                Round 3 (Final)
              </button>
            </div>
          </div>

          {/* Counselling Schedule */}
          <div className="up-section-card-mb">
            <h2 className="up-section-title">
              {selectedRound === "round1"
                ? "Round 1"
                : selectedRound === "round2"
                ? "Round 2"
                : "Round 3"}{" "}
              Schedule
            </h2>
            <div className="up-step-list">
              {counsellingSchedule[selectedRound].map((schedule, index) => (
                <div key={index} className="up-sched-row-bordered">
                  <div className="up-sched-left">
                    <Calendar className="up-sched-icon" />
                    <div>
                      <h3 className="up-sched-time">
                        {schedule.date}
                      </h3>
                      <p className="up-sched-prog">{schedule.category}</p>
                    </div>
                  </div>
                  <div className="up-sched-right-col">
                    <div className="up-sched-seats">
                      {schedule.seats}
                    </div>
                    <div className="up-sched-venue">
                      <MapPin className="up-sched-venue-icon" />
                      <span>Wardha Campus</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Counselling Process */}
          <div className="up-section-card-mb">
            <h2 className="up-section-title">
              Counselling Process
            </h2>
            <div className="up-process-grid">
              {counsellingProcess.map((process, index) => (
                <div key={index} className="up-process-card">
                  <div className="up-process-icon-wrap">
                    {process.icon}
                  </div>
                  <div className="up-process-body">
                    <div className="up-process-step">
                      Step {process.step}
                    </div>
                    <h3 className="up-process-title">
                      {process.title}
                    </h3>
                    <p className="up-process-desc">
                      {process.description}
                    </p>
                    <div className="up-process-duration">
                      {process.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="up-section-card-mb">
            <div className="up-doc-row-header">
              <h2 className="up-section-title-h2">
                Required Documents
              </h2>
              <button className="up-doc-download-btn">
                <Download className="w-5 h-5" />
                Download Checklist
              </button>
            </div>
            <div className="up-doc-grid-2">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="up-doc-row">
                  <div className="up-doc-left">
                    <CheckCircle
                      className={
                        doc.mandatory ? "up-doc-check-mandatory" : "up-doc-check-optional"
                      }
                    />
                    <div>
                      <h3 className="up-doc-name">
                        {doc.document}
                      </h3>
                      <p className="up-doc-status">
                        {doc.mandatory ? "Mandatory" : "If Applicable"}
                      </p>
                    </div>
                  </div>
                  <div className="up-sched-right-col">
                    <span className="up-doc-copies">
                      {doc.copies} {doc.copies === 1 ? "copy" : "copies"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="up-section-card-mb">
            <h2 className="up-section-title">
              Contact Information
            </h2>
            <div className="up-grid-2">
              {contactInfo.map((contact, index) => (
                <div key={index} className="up-contact-card">
                  <div className="up-contact-icon-color">{contact.icon}</div>
                  <div>
                    <h3 className="up-contact-type">
                      {contact.type}
                    </h3>
                    <p className="up-contact-value">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Instructions */}
          <div className="up-section-card">
            <h2 className="up-section-title">
              Important Instructions
            </h2>
            <div className="up-instr-list">
              {importantInstructions.map((instruction, index) => (
                <div key={index} className="up-instr-item">
                  <div className="up-instr-num">
                    {index + 1}
                  </div>
                  <p className="up-instr-text">{instruction}</p>
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
                <h3 className="up-alert-title">
                  Counselling Notice
                </h3>
                <p className="up-alert-text">
                  Candidates are advised to stay updated with the official
                  website for any changes in counselling schedule. Ensure all
                  documents are ready before attending counselling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounsellingPage;
