// import { useState } from "react";
// import { FileText } from "lucide-react";
// import { PopupModal } from "../../components/UI/CardMandatoryDisclosure";
// // import "../styles/InstituteSections/Announcements.css";

// const ProgramsAnnouncements = ({ data }) => {
//   const { heading, buttons = [], pg_docs = [], ug_docs = [] } = data || {};
//   const [showPG, setShowPG] = useState(false);
//   const [showUG, setShowUG] = useState(false);

//   const openPopup = (type) =>
//     type === "pg" ? setShowPG(true) : setShowUG(true);

//   return (
//     <>
//       <section className="announce-section container">
//      <h2 className="heading">
//               <hr className="heading-line" />
//           {heading}
//         </h2>

//         <div className="announce-grid">
//           {buttons.map((btn, i) => (
//             <button
//               key={i}
//               onClick={() => openPopup(btn.type)}
//               className="announce-btn"
//             >
//               <FileText className="text-[#F04E30] w-6 h-6 min-w-6" />
//               <div className="announce-btn-text">{btn.label}</div>
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* PG POPUP */}
//       <PopupModal show={showPG} onClose={() => setShowPG(false)} title="">
//         <PopupGrid docs={pg_docs} />
//       </PopupModal>

//       {/* UG POPUP */}
//       <PopupModal show={showUG} onClose={() => setShowUG(false)} title="">
//         <PopupGrid docs={ug_docs} />
//       </PopupModal>
//     </>
//   );
// };

// export default ProgramsAnnouncements;

// /* ================= REUSABLE GRID ================= */
// function PopupGrid({ docs }) {
//   if (!docs.length) return <p>No documents available.</p>;

//   return (
//     <div
//       className={`announce-popup-grid ${
//         docs.length > 1 ? "announce-popup-grid-2" : ""
//       }`}
//     >
//       {docs.map((item, index) => {
//         const single =
//           docs.length > 1 &&
//           docs.length % 2 === 1 &&
//           index === docs.length - 1;

//         return (
//           <a
//             key={index}
//             href={item.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={`announce-doc ${
//               single ? "announce-doc-single" : ""
//             }`}
//           >
//             <FileText className="w-5 h-5" />
//             <span>{item.name}</span>
//           </a>
//         );
//       })}
//     </div>
//   );
// }
import { useState } from "react";
import { FileText } from "lucide-react";
import { PopupModal } from "../../components/UI/CardMandatoryDisclosure";

// Columns-per-row coming from the backend (layout.columns), mirrors the
// button section. Cards stretch to fill their column for a uniform grid.
const COL_MAP = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

const ProgramsAnnouncements = ({ data }) => {
  if (!data) return null;

  const heading = data?.header?.heading;
  const cards = Array.isArray(data?.cards) ? data.cards : [];

  const columns = Number(data?.layout?.columns) || 3;
  const colClass = COL_MAP[columns] || "md:grid-cols-3";

  const [popupDocs, setPopupDocs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (card) => {
    if (card.action_type === "Direct PDF") {
      window.open(card.pdf, "_blank");
    }

    if (card.action_type === "Popup PDFs") {
      setPopupDocs([
        {
          name: card.title,
          link: card.pdf,
        },
      ]);
      setShowPopup(true);
    }
  };

  return (
    <>
      <section className="announce-section container">
        {heading && (
          <h2 className="heading">
            <hr className="heading-line" />
            {heading}
          </h2>
        )}

        <div className={`grid grid-cols-1 ${colClass} gap-6 w-full`}>
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => handleClick(card)}
              className="announce-btn"
            >
              <FileText className="text-[#F04E30] w-6 h-6 min-w-6" />
              <div className="announce-btn-text">{card.title}</div>
            </button>
          ))}
        </div>
      </section>

      {/* POPUP */}
      <PopupModal
        show={showPopup}
        onClose={() => setShowPopup(false)}
        title=""
      >
        <PopupGrid docs={popupDocs} />
      </PopupModal>
    </>
  );
};

export default ProgramsAnnouncements;

/* ================= POPUP GRID ================= */
function PopupGrid({ docs = [] }) {
  if (!docs.length) return <p>No documents available.</p>;

  return (
    <div className="announce-popup-grid">
      {docs.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="announce-doc"
        >
          <FileText className="w-5 h-5" />
          <span>{item.name}</span>
        </a>
      ))}
    </div>
  );
}
