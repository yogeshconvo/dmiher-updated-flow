import React from "react";

function AlliancesGlobal({ data }) {
  if (!data?.header?.length) return null;

  const header = data.header[0];

  const { heading, description, background_image, icons = [] } = header;

  return (
    <section
      className="alliances-section"
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">

        <h2 className="alliances-heading">
          <div className="alliances-heading-line"></div>
          {heading}
        </h2>

        <p className="alliances-text">{description}</p>

        <ul className="alliances-list">
          {icons.map((item, idx) => (
            <li key={idx} className="alliance-item">
              <img
                src={item.image}
                alt="alliance logo"
                className="alliance-image"
              />
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}

export default AlliancesGlobal;