import React from "react";
// import "../../styles/functional-units-main.css";
// import "../../styles/functional-units-responsive.css";

const FunctionalUnits = ({ data, loading = false }) => {
  if (loading) {
    return (
      <section className="functional-section">
        <div className="container">Loading...</div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="functional-section">
      <div className="container">
        {/* Heading */}
        <div className="functional-header">
          <div className="heading-line" />
          <h2 className="heading">
            {data.heading}: <br />
            <span>{data.subheading}</span>
          </h2>
          <p className="functional-description">{data.description}</p>
        </div>

        {/* Units Grid */}
        <div className="functional-grid">
          {data.units.map((unit) => (
            <div key={unit.id} className="functional-card">
              <div className="functional-card-header">
                <div className={`functional-number ${unit.color}`}>
                  {unit.number}
                </div>
                <h3 className={`functional-title ${unit.color}`}>
                  {unit.title}
                </h3>
              </div>

              <ul className="functional-list">
                {unit.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>

              {unit.initiatives?.length > 0 && (
                <>
                  <p className="functional-subtitle">
                    Related DMIHER initiatives:
                  </p>
                  <ul className="functional-initiative-list">
                    {unit.initiatives.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunctionalUnits;
