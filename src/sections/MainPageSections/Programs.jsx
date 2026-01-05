import React from "react";
import { Link } from "react-router";

function HomePrograms({ data }) {
  const {
    title,
    background_color,
    programs = [],
    icon,
  } = data || {};

  return (
    <div className="py-15" style={{ backgroundColor: background_color }}>
      <div className="container">
        {/* Heading */}
        <div className="text-white mb-8">
          <div className="w-20 h-1.5 bg-red-500 mb-2"></div>
          <h2 className="text-3xl md:text-4xl font-oswald-medium font-medium tracking-wide">
            {title}
          </h2>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[15px] gap-y-4 sm:gap-y-6">
         {data.programs.map((program) => (
                   <Link
                     key={program.id}
                     to={program.slug}
                     className="program-card"
                   >
                     <img
                       src={program.image}
                       alt={program.name}
                       className="program-image"
                     />
       
                     <div className="program-content">
                       <h6 className="program-title">{program.name}</h6>
       
                       {program.icon && (
                         <div className="program-icon-wrapper">
                           <img
                             src={program.icon}
                             alt="Program Icon"
                             className="program-icon"
                           />
                         </div>
                       )}
                     </div>
                   </Link>
                 ))}
        </div>
      </div>
    </div>
  );
}

export default HomePrograms;
