// import React from "react";

// function ExcellenceSection({ data }) {
//   const { title, intro, highlight, pillars = [] } = data || {};

//   return (
//     <div className="max-w-6xl mx-auto px-4 md:px-20 pt-12 text-center bg-white text-[#707070]">
//       {/* Main Title */}
//       <h1 className="text-3xl md:text-3xl font-[600] font-oswald-medium p-2 uppercase leading-tight">
//         {title.split(".").map((line, i) => (
//           <span key={i}>
//             {line.trim()}
//             {i === 0 && <br />}
//           </span>
//         ))}
//       </h1>

//       {/* Intro */}
//       <p
//         className="mt-4 text-md md:text-xs font-[500] max-w-2xl mx-auto text-gray-600"
//         style={{ fontFamily: "Arial, sans-serif" }}
//       >
//         {intro}
//       </p>

//       {/* Highlight */}
//       <div className="mt-4 border-t-2 border-b-2 pt-5 pb-5 border-blue-900 md:border-0">
//         <h2 className="text-2xl md:text-3xl font-bold font-oswald-medium text-[#122E5E]">
//           {highlight?.title}
//         </h2>
//         <p className="text-[15px] text-[#122E5E] mt-1 font-[500]">
//           {highlight?.subtitle}
//         </p>
//       </div>

//       {/* Pillars Grid */}
//       <div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6
//         w-4/5 mx-auto md:w-full"
//       >
//         {pillars.map((item, index) => (
//           <div
//             key={index}
//             className="p-4 h-full flex flex-col items-center
//               border-t border-[#58595B] md:border md:border-[#58595B]
//               md:border-t  last:border-t"
//           >
//             <div className="w-4/5 mx-auto md:w-full">
//               <h3
//                 className={`font-bold mb-2 font-oswald-medium ${item.color} ${
//                   item.title === "Community/ Industry Oriented"
//                     ? "text-lg"
//                     : "text-xl"
//                 }`}
//               >
//                 {item.title}
//               </h3>
//               <p className="text-xs text-[#58595B] text-center">
//                 {item.desc}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ExcellenceSection;
import React from "react";

function ExcellenceSection({ data }) {
  const { title, intro, highlight, pillars = [] } = data || {};

  return (
    <section className="excellence-wrapper">
      <h1 className="excellence-title">
        {title.split(".").map((line, i) => (
          <span key={i}>
            {line.trim()}
            {i === 0 && <br />}
          </span>
        ))}
      </h1>

      <p className="excellence-intro">{intro}</p>

      <div className="excellence-highlight">
        <h2 className="excellence-highlight-title">{highlight?.title}</h2>
        <p className="excellence-highlight-sub">{highlight?.subtitle}</p>
      </div>

      <div className="excellence-grid">
        {pillars.map((item, i) => (
          <div key={i} className="excellence-card">
            <h3 className={`excellence-card-title ${item.color}`}>
              {item.title}
            </h3>
            <p className="excellence-card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExcellenceSection;
