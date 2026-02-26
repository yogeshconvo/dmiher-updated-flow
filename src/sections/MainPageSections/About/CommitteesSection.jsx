import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  GraduationCap,
  BookOpenCheck,
  Wallet,
  ShieldAlert,
  Accessibility,
  Scale,
} from "lucide-react";

const iconMap = {
  Users: <Users />,
  GraduationCap: <GraduationCap />,
  BookOpenCheck: <BookOpenCheck />,
  Wallet: <Wallet />,
  ShieldAlert: <ShieldAlert />,
  Accessibility: <Accessibility />,
  Scale: <Scale />,
};

const Card = ({ icon, name, link }) => {
  // if link is "#" → disable navigation
  const isDisabled = !link || link === "#";

  if (isDisabled) {
    return (
      <div className="committee-card cursor-not-allowed ">
        <div className="committee-icon">{icon}</div>
        <div className="committee-name">{name}</div>
      </div>
    );
  }

  const isInternal = link.startsWith("/");
  const Wrapper = isInternal ? Link : "a";
  const props = isInternal
    ? { to: link }
    : { href: link, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Wrapper {...props}>
      <div className="committee-card">
        <div className="committee-icon">{icon}</div>
        <div className="committee-name">{name}</div>
      </div>
    </Wrapper>
  );
};

function CommitteesSection({ data }) {
  const {
    basic = {},
    committees = [],
    inclusiveFacilities = [],
  } = data || {};

  const { title, inclusiveTitle } = basic;

  return (
    <section className="committees-section">
      <div className="max-w-7xl mx-auto">
        {/* Committees */}
        <h2 className="committees-title">
          <hr className="committees-underline" />
          {title}
        </h2>

        <div className="committees-grid">
          {committees.map((item, i) => (
            <Card
              key={i}
              name={item.name}
              link={item.link}
              icon={iconMap[item.icon] || <Users />}
            />
          ))}
        </div>

        {/* Inclusive Facilities */}
        <h2 className="committees-title">
          <hr className="committees-underline" />
          {inclusiveTitle}
        </h2>

        <div className="committees-grid">
          {inclusiveFacilities.map((item, i) => (
            <Card
              key={i}
              name={item.name}
              link={item.link}
              icon={iconMap[item.icon] || <Accessibility />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommitteesSection;