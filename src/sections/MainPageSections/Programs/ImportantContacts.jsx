import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Link } from "react-router";

const ImportantContacts = ({data}) => {

  return (
<section className="important-contacts-section">
  <div className="container">
    <h2 className="heading">
      <hr className="heading-line" />
      {data?.basic?.heading}
    </h2>

    <a href={`tel:${data?.basic?.main_phone}`}>
      <div className="important-contacts-phone">
        <Phone className="w-5 h-5 mr-2 text-white" />
    {data?.basic?.main_phone}
      </div>
    </a>

    <div className="important-contacts-grid">
      {data?.contacts?.map((item, idx) => (
        <div key={idx} className="important-contact-card">
          <div className="important-contact-title">
            <p className="important-contact-title-text">
              {item.title}
            </p>
          </div>

          <div className="important-contact-body">
            <p className="important-contact-text mb-1">
              <span className="important-contact-label">Contact:</span>{" "}
              {item.contact_person}
            </p>
            <p className="important-contact-text break-words">
              <span className="important-contact-label">Email:</span>{" "}
              {item.email}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default ImportantContacts;
