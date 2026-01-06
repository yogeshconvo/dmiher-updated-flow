import React from "react";
import { Link } from "react-router";
import {
  CalendarDays,
  FileText,
  Leaf,
  BookOpen,
  Link2,
  BadgeDollarSign,
  ScrollText,
  RotateCcw,
  Megaphone,
  UserCheck,
} from "lucide-react";
import { CardMandatoryDisclosure } from "../../components/UI/CardMandatoryDisclosure";

/* ================= ICON MAP ================= */
const ICON_MAP = {
  CalendarDays,
  FileText,
  Leaf,
  BookOpen,
  Link2,
  BadgeDollarSign,
  ScrollText,
  RotateCcw,
  Megaphone,
  UserCheck,
};


const MandatoryDisclosures = ({ data }) => {

  const { title, items } = data;

  return (
    <section className="mandatory-section">
      <div className="mandatory-container">
        <h2 className="mandatory-heading">
          <hr className="mandatory-heading-line" />
          {title}
        </h2>

        <div className="mandatory-grid">
          {items.map((item, index) => (
            <CardMandatoryDisclosure key={index} name={item.name} link={item.link}  />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MandatoryDisclosures;
