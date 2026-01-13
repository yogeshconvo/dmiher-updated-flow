import React from "react";

function KnowMore({ data }) {
  if (!data) return null;

  const {heading, dean, message, managementTeam } = data;

  return (
    <section className="knowmore-container container ">
      {/* ===== Heading ===== */}
      <div className="">
        <h2 className="heading">
          <hr className="heading-line"></hr>
          {heading}
        </h2>
      </div>

      {/* ===== Dean Section ===== */}
      <div className="knowmore-dean-layout">
        {/* Image + Info */}
        <div className="knowmore-dean-profile">
          <img
            src={dean.image}
            alt={dean.name}
            className="knowmore-dean-image"
          />

          <div className="knowmore-dean-info">
            <p className="knowmore-dean-name">{dean.name}</p>
            <p>
              {dean.designation}
              <br />
              {dean.qualifications}
            </p>
            <p>{dean.email}</p>
          </div>
        </div>

        {/* Message */}
        <div className="knowmore-dean-message">
          {message.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>

      {/* ===== Management Team ===== */}
      <div className="knowmore-team-wrapper">
        <div className="knowmore-team-grid">
          {managementTeam.map((member, idx) => (
            <div key={idx} className="knowmore-team-card">
              <img
                src={member.image}
                alt={member.name}
                className="knowmore-team-image"
              />

              <h3 className="knowmore-team-name">{member.name}</h3>

              <p className="knowmore-team-designation">
                {member.designation}
              </p>

              <p className="knowmore-team-qualification">
                {member.qualification}
              </p>

              <p className="knowmore-team-email">{member.email}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KnowMore;
