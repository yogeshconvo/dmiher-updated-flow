import React from "react";
import { Link } from "react-router";
import {
  Users,
  GraduationCap,
  BookOpenCheck,
  Wallet,
  ShieldAlert,
  Accessibility,
  Scale,
} from "lucide-react";

/* icon mapper */
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
  const isInternal = link.startsWith("/");

  const content = (
    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-[#fef7f6]">
      <div className="bg-[#F04E30]/10 text-[#F04E30] rounded-full p-3">
        <div className="w-6 h-6">{icon}</div>
      </div>
      <div className="text-gray-800 font-medium text-[20px] mt-2 leading-snug">
        {name}
      </div>
    </div>
  );

  return isInternal ? (
    <Link to={link}>{content}</Link>
  ) : (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
};

function CommitteesSection({ data }) {
  const {
    title,
    inclusiveTitle,
    committees = [],
    inclusiveFacilities = [],
  } = data || {};

  return (
    <section className="bg-[#FAFAF6] py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Committees */}
        <h2 className="text-3xl md:text-4xl pt-5 pb-5 font-[500] text-[#707070] font-oswald-medium uppercase mb-5 tracking-wide">
          <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-8">
          {committees.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              link={item.link}
              icon={iconMap[item.icon]}
            />
          ))}
        </div>

        {/* Inclusive Facilities */}
        <h2 className="text-3xl md:text-4xl font-[500] pt-5 pb-5 text-[#707070] font-oswald-medium uppercase mb-5 tracking-wide">
          <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
          {inclusiveTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {inclusiveFacilities.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              link={item.link}
              icon={iconMap[item.icon]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommitteesSection;
