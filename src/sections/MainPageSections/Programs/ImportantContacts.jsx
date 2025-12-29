import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Link } from "react-router";

const ImportantContacts = ({data}) => {
//   const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/important-contacts") // 🔁 replace with real endpoint
//       .then((res) => res.json())
//       .then((res) => {
//         setData(res);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <section className="w-full py-14 bg-gray-100">
//         <div className="container">Loading contacts...</div>
//       </section>
//     );
//   }

//   if (!data || !data.contacts?.length) return null;

  return (
<section className="important-contacts-section">
  <div className="container">
    <h2 className="heading">
      <hr className="heading-line" />
      {data?.heading}
    </h2>

    <a href={`tel:${data?.main_phone}`}>
      <div className="important-contacts-phone">
        <Phone className="w-5 h-5 mr-2 text-white" />
    {data?.main_phone}
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
