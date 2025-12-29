import React from "react";
// import "../../styles/alliances-global-main.css";
// import "../../styles/alliances-global-responsive.css";

function AlliancesGlobal({ data }) {
  if (!data) return null;

  const {
    heading,
    description,
    background_image,
    logos = [],
    center_logo,
  } = data;

  return (
    <section
      className="alliances-section"
      style={{ backgroundImage: `url(${background_image})` ,backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="container">
        <h2 className="alliances-heading">
          <div className="alliances-heading-line" />
          {heading}
        </h2>

        <p className="alliances-text">{description}</p>

        <ul className="alliances-list ">
          {logos.map((logo, idx) => (
            <li key={idx} className="alliance-item">
              <img
                src={logo}
                alt="alliance logo"
                className="alliance-image"
              />
            </li>
          ))}
        </ul>

        {center_logo && (
          <div className="alliance-center">
            <img
              src={center_logo}
              alt="alliance"
              className="alliance-center-image"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default AlliancesGlobal;
