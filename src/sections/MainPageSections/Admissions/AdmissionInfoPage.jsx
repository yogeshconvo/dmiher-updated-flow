import React from "react";
import * as Icons from "lucide-react";

const AdmissionInfoPage = ({ data }) => {
  const { basic, cards } = data;

  return (
    <section id="admission_info" className="container mx-auto">
      <div className="admission-container">

        {/* Heading */}
        {/* <div className="admission-heading">
          <h2 className="admission-title">{basic.title}</h2>
          <p className="admission-description">{basic.description}</p>
        </div> */}

        {/* Heading */}

        <h2 className="text-3xl font-bold text-gray-800 text-center">{basic.title}</h2>
        <p className="text-gray-600 text-center">{basic.description}</p>

        {/* Grid */}
        <div className="admission-grid">
          {cards.map((item, index) => {
            const IconComponent = Icons[item.icon];

            return (
              <div key={index} className="admission-card">

                {IconComponent && (
                  <div className="admission-icon-wrapper">
                    <IconComponent className="admission-icon" />
                  </div>
                )}

                <h3 className="admission-card-title">
                  {item.title}
                </h3>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admission-btn"
                >
                  {item.cta_text}
                </a>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AdmissionInfoPage;