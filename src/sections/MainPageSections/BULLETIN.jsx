// import { useState } from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// function HomeBulletin({ data }) {
//   const {
//     title,
//     tabs = [],
//     content = {},
//     items_per_page = 4,
//   } = data || {};

//   const [activeTab, setActiveTab] = useState(tabs[0]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const currentItems = content[activeTab] || [];

//   const handlePrev = () => {
//     setCurrentIndex((prev) => Math.max(0, prev - items_per_page));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) =>
//       prev + items_per_page >= currentItems.length ? 0 : prev + items_per_page
//     );
//   };

//   const visibleItems = currentItems.slice(
//     currentIndex,
//     currentIndex + items_per_page
//   );

//   return (
//     <div className="py-10 px-5 bg-gray-200 text-gray-500">
//       <div className="container">
//         {/* Title */}
//         <h2
//           className="heading"
          
//         >
//           <span className="heading-line" />
//           <br />
//           {title}
//         </h2>

//         {/* Tabs */}
//         <div className="flex justify-center mt-6 space-x-6">
//           {tabs.map((tab, index) => (
//             <button
//               key={tab}
//               className={`text-base md:text-xl ${
//                 activeTab === tab ? "underline" : ""
//               }`}
//               onClick={() => {
//                 setActiveTab(tab);
//                 setCurrentIndex(0);
//               }}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Items */}
//         <div className="grid lg:grid-cols-4 gap-4 mt-8">
//           {visibleItems.map((item, index) => (
//             <div
//               key={index}
//               className="md:border-r md:pr-3 last:border-0"
//             >
//               {item.url ? (
//                 <a
//                   href={item.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-base md:text-xl text-[#707070] hover:underline block"
//                 >
//                   {item.title}
//                 </a>
//               ) : (
//                 <h3 className="text-base md:text-xl text-[#707070]">
//                   {item.title}
//                 </h3>
//               )}

//               {item.college && (
//                 <p className="text-sm italic text-gray-600">
//                   {item.college}
//                 </p>
//               )}

//               {item.date && (
//                 <p className="text-sm text-[#269BFF]">{item.date}</p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Arrows */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button onClick={handlePrev}>
//             <ArrowLeft size={20} />
//           </button>
//           <button onClick={handleNext}>
//             <ArrowRight size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomeBulletin;
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

function HomeBulletin({ data }) {
  const { title, tabs = [], content = {}, items_per_page = 4 } = data || {};

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItems = content[activeTab] || [];
  const visibleItems = currentItems.slice(currentIndex, currentIndex + items_per_page);

  return (
    <div className="bulletin-section">
      <div className="container">
        <h2 className="heading">
          <hr className="heading-line" />
          {title}
        </h2>

        <div className="bulletin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentIndex(0);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bulletin-grid">
          {visibleItems.map((item, index) => (
            <div key={index} className="bulletin-item">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              ) : (
                <p>{item.title}</p>
              )}

              {item.college && <p className="college">{item.college}</p>}
              {item.date && <p className="date">{item.date}</p>}
            </div>
          ))}
        </div>

        <div className="arrow-controls">
          <button><ArrowLeft size={20} /></button>
          <button><ArrowRight size={20} /></button>
        </div>
      </div>
    </div>
  );
}

export default HomeBulletin;
