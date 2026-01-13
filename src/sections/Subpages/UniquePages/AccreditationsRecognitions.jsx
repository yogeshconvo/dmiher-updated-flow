import React, { useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
// import data from "./accreditations-recognitions.json";


const AccreditationsRecognitions = ({ data }) => {
const{categories,internationalCertificates,nationalCertificates}=data;
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const allCertificates = [
    ...internationalCertificates,
    ...nationalCertificates,
  ];

  const filteredCertificates =
    activeCategory === "All"
      ? allCertificates
      : allCertificates.filter(
          (item) => item.category === activeCategory
        );

  return (
    <section className="accreditation-section">
      <div className="accreditation-container">
        {/* Tabs */}
        <div className="accreditation-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`accreditation-tab ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="accreditation-grid">
          {filteredCertificates.map((item) => (
            <div
              key={item.id}
              className="accreditation-card"
            >
              <div className="card-image-wrapper">
                <img src={item.image} alt={item.title} />
                <button
                  className="preview-btn"
                  onClick={() => setSelectedCertificate(item)}
                >
                  <FaEye />
                </button>
                <span className={`badge ${item.category.toLowerCase()}`}>
                  {item.category}
                </span>
              </div>

              <div className="card-body">
                <h3>{item.title}</h3>
                {item.year && <span className="year">{item.year}</span>}
                <p>{item.description}</p>

                {item.url.startsWith("/") ? (
                  <Link to={item.url} className="view-btn">
                    View Certificate
                  </Link>
                ) : (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-btn"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCertificate && (
        <div
          className="accreditation-modal"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedCertificate(null)}
            >
              <FaTimes />
            </button>

            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
            />

            <h2>{selectedCertificate.title}</h2>
            <p>{selectedCertificate.description}</p>

            <a
              href={selectedCertificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn"
            >
              View Certificate
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default AccreditationsRecognitions;
