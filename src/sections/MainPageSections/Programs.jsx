// import React from "react";
// import { Link } from "react-router";
// import icon from "../../../public/programicon.png";

// function HomePrograms({ data }) {

//   return (
//     <div className="py-15 bg-[#122E5E]">
//       <div className="container">
        
//         {/* Heading */}
//         <div className="text-white mb-8">
//           <div className="w-20 h-1.5 bg-red-500 mb-2"></div>
//           <h2 className="text-3xl md:text-4xl font-oswald-medium font-medium tracking-wide">
//             {data?.header?.heading}
//           </h2>
//         </div>

//         {/* Programs Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[15px] gap-y-4 sm:gap-y-6">

//           {data?.programs?.map((program, index) => (
//             <Link
//               key={index}
//               to={`/${program.page_slug}`}
//               className="program-card"
//             >
//               <img
//                 src={program.image}
//                 alt={program.title}
//                 className="program-image"
//               />

//               <div className="program-content">
//                 <h6 className="program-title">
//                   {program.title}
//                 </h6>
//                 <div className="program-icon-wrapper">
//                     <img
//                       src={icon}
//                       alt="Program Icon"
//                       className="program-icon"
//                     />
//                   </div>
//               </div>
//             </Link>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePrograms;


import React from "react";
import { Link } from "react-router-dom";
import icon from "../../../public/programicon.png";

function Programs({ data }) {
  return (
    <div className="py-15 bg-[#122E5E]">
      <div className="container">

        {/* Heading */}
        <div className="text-white mb-8">
          <div className="w-20 h-1.5 bg-red-500 mb-2"></div>
          <h2 className="text-3xl md:text-4xl font-medium">
            {data?.header?.heading}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {data?.programs?.map((program, index) => (
            program.page_slug && (
              <Link
                key={index}
                to={`/programs/${program.page_slug}`}
                className="program-card"
              >
                <img
                  src={program.image}
                  alt={program.title}
                  className="program-image"
                />

                <div className="program-content">
                  <h6 className="program-title">
                    {program.title}
                  </h6>

                  <div className="program-icon-wrapper">
                    <img
                      src={icon}
                      alt="icon"
                      className="program-icon"
                    />
                  </div>
                </div>
              </Link>
            )
          ))}

        </div>
      </div>
    </div>
  );
}

export default Programs;