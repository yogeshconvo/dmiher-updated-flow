import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";

/* Convert API icon name → Lucide component (e.g. "graduation-cap" → GraduationCap) */
const getLucideIcon = (name) => {
  if (!name) return Icons.Users;
  const formatted = name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  return Icons[formatted] || Icons.Users;
};

/* ================= CARD ================= */
const Card = ({ iconName, name, link }) => {
  const IconComponent = getLucideIcon(iconName);
  const isDisabled = !link;

  if (isDisabled) {
    return (
      <div className="committee-card cursor-not-allowed">
        <div className="committee-icon">
          <IconComponent size={28} />
        </div>
        <div className="committee-name">{name}</div>
      </div>
    );
  }

  return (
    <Link to={link}>
      <div className="committee-card hover:scale-105 transition">
        <div className="committee-icon">
          <IconComponent size={28} />
        </div>
        <div className="committee-name">{name}</div>
      </div>
    </Link>
  );
};

/* ================= MAIN ================= */
function CommitteesSection({ data, college, pageSlug }) {
  if (!data) return null;

  const committees = data?.committees || [];
  const title = data?.heading?.title || "Committees";

  // Resolve which "college/parent" segment we should prefix the link with so
  // links go to /:college/:page (the route that already handles micropages).
  // Priority: explicit prop → first segment of current URL → fallback "about".
  const params = useParams();
  const location = useLocation();
  const firstSegment = location.pathname.split("/").filter(Boolean)[0];
  const parentSlug = college || pageSlug || params.college || firstSegment || "about";

  return (
    <section className="committees-section">
      <div className="container">
        <h2 className="committees-title">
          <hr className="committees-underline" />
          {title}
        </h2>

        <div className="committees-grid">
          {committees.map((item, i) => (
            <Card
              key={i}
              name={item.name}
              link={item.page_slug ? `/${parentSlug}/${item.page_slug}` : null}
              iconName={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommitteesSection;
