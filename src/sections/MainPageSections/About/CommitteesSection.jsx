import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Icons from "../../../utils/lucideIcons";

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
const Card = ({ iconName, name, target }) => {
  const IconComponent = getLucideIcon(iconName);

  const inner = (
    <div className={`committee-card${target ? " hover:scale-105 transition" : " cursor-not-allowed"}`}>
      <div className="committee-icon">
        <IconComponent size={28} />
      </div>
      <div className="committee-name">{name}</div>
    </div>
  );

  if (!target) return inner;

  if (target.external) {
    return (
      <a href={target.href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return <Link to={target.href}>{inner}</Link>;
};

/* ================= RESOLVE TARGET ================= */
const resolveTarget = (item, parentSlug) => {
  if (!item) return null;

  // action_type: "url" → external link
  if (item.action_type === "url" && item.url) {
    if (/^https?:\/\//i.test(item.url)) {
      return { href: item.url, external: true };
    }
    return { href: item.url.startsWith("/") ? item.url : `/${parentSlug}/${item.url}`, external: false };
  }

  // action_type: "page" with has_micro_page → /{parentSlug}/{cta_key}
  if (item.action_type === "page") {
    const cta = item.cta;
    if (cta?.has_micro_page && cta?.cta_key) {
      return { href: `/${parentSlug}/${cta.cta_key}`, external: false };
    }
  }

  // action_type: "link" → page_slug based routing
  if (item.action_type === "link" && item.page_slug) {
    const isScoped =
      item.page_type === "independent_pages" || item.page_type === "subpages";
    return {
      href: isScoped ? `/${parentSlug}/${item.page_slug}` : `/${item.page_slug}`,
      external: false,
    };
  }

  // Fallback: plain page_slug
  if (item.page_slug) {
    return { href: `/${parentSlug}/${item.page_slug}`, external: false };
  }

  return null;
};

/* ================= MAIN ================= */
function CommitteesSection({ data, college, pageSlug }) {
  if (!data) return null;

  const committees = data?.committees || [];
  const title = data?.heading?.title || "Committees";

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
              target={resolveTarget(item, parentSlug)}
              iconName={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommitteesSection;
