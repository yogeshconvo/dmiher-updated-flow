// // import { useState } from "react";
// // import { ArrowLeft, ArrowRight } from "lucide-react";

// // function HomeANNOUNCEMENTS({ data }) {
// //   const {
// //     title,
// //     categories = [],
// //     announcements = {},
// //     items_per_page = 4,
// //   } = data || {};

// //   const [activeCategory, setActiveCategory] = useState(categories[0]);
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const currentItems = announcements[activeCategory] || [];

// //   const visibleItems = currentItems.slice(
// //     currentIndex,
// //     currentIndex + items_per_page
// //   );

// //   const handlePrev = () => {
// //     setCurrentIndex((prev) => Math.max(0, prev - items_per_page));
// //   };

// //   const handleNext = () => {
// //     setCurrentIndex((prev) =>
// //       prev + items_per_page >= currentItems.length
// //         ? 0
// //         : prev + items_per_page
// //     );
// //   };

// //   return (
// //     <div className="py-8 pb-10 bg-white text-gray-500">
// //       <div className="container">
// //         {/* Title */}
// //         <h2
// //           className="heading"
          
// //         >
// //           <span className="heading-line" />
// //           <br />
// //           {title}
// //         </h2>

// //         {/* Categories */}
// //         <div className="flex flex-wrap gap-6 mt-6 justify-center">
// //           {categories.map((cat) => (
// //             <button
// //               key={cat}
// //               onClick={() => {
// //                 setActiveCategory(cat);
// //                 setCurrentIndex(0);
// //               }}
// //               className={`text-base md:text-xl ${
// //                 activeCategory === cat ? "underline" : "hover:text-gray-400"
// //               }`}
// //             >
// //               {cat}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Announcements */}
// //         <div className="grid lg:grid-cols-4 gap-4 mt-8">
// //           {visibleItems.map((item, index) => (
// //             <div
// //               key={index}
// //               className="md:border-r md:pr-3 last:border-0"
// //             >
// //               {item.url ? (
// //                 <a
// //                   href={item.url}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-base md:text-xl text-[#707070] hover:underline block"
// //                 >
// //                   {item.title}
// //                 </a>
// //               ) : (
// //                 <h3 className="text-base md:text-xl text-[#707070]">
// //                   {item.title}
// //                 </h3>
// //               )}

// //               {item.date && (
// //                 <p className="text-sm text-[#269BFF] mt-1">
// //                   {item.date}
// //                 </p>
// //               )}
// //             </div>
// //           ))}
// //         </div>

// //         {/* Arrows (mostly hidden because only 2 items) */}
// //         {currentItems.length > items_per_page && (
// //           <div className="flex justify-end gap-3 mt-6">
// //             <button onClick={handlePrev}>
// //               <ArrowLeft size={20} />
// //             </button>
// //             <button onClick={handleNext}>
// //               <ArrowRight size={20} />
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default HomeANNOUNCEMENTS;

// import { useEffect, useState } from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// function HomeANNOUNCEMENTS() {
//   const [data, setData] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/home-notices")
//       .then((res) => res.json())
//       .then((res) => {
//         const section = res.find(
//           (item) => item.section_id === "home_ANNOUNCEMENTS_section"
//         );

//         if (section) {
//           setData(section.data);
//           setActiveCategory(section.data.categories?.[0]);
//         }
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   if (!data) return null;

//   const {
//     title,
//     categories = [],
//     announcements = {},
//     items_per_page = 4,
//   } = data;

//   const currentItems = announcements[activeCategory] || [];
//   const visibleItems = currentItems.slice(
//     currentIndex,
//     currentIndex + items_per_page
//   );

//   return (
//     <div className="announcements-section">
//       <div className="container">
//         <h2 className="heading"> <hr className="heading-line" /> {title}</h2>

//         {/* Categories */}
//         <div className="announcement-categories">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
//               onClick={() => {
//                 setActiveCategory(cat);
//                 setCurrentIndex(0);
//               }}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="announcement-grid">
//           {visibleItems.map((item, index) => (
//             <div key={index} className="announcement-item">
//               <a href={item.url} target="_blank" rel="noreferrer">
//                 {item.title}
//               </a>
//               {item.date && <p className="date">{item.date}</p>}
//             </div>
//           ))}
//         </div>

//         {/* Arrows */}
//         {currentItems.length > items_per_page && (
//           <div className="arrow-controls">
//             <button
//               disabled={currentIndex === 0}
//               onClick={() =>
//                 setCurrentIndex((p) =>
//                   Math.max(p - items_per_page, 0)
//                 )
//               }
//             >
//               <ArrowLeft size={20} />
//             </button>

//             <button
//               disabled={
//                 currentIndex + items_per_page >= currentItems.length
//               }
//               onClick={() =>
//                 setCurrentIndex((p) => p + items_per_page)
//               }
//             >
//               <ArrowRight size={20} />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HomeANNOUNCEMENTS;
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";


function HomeANNOUNCEMENTS() {
  const [data, setData] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/home-notices")
      .then(res => res.json())
      .then(res => {
        const section = res.find(
          item => item.section_id === "home_ANNOUNCEMENTS_section"
        );

        if (section?.data) {
          setData(section.data);
          setActiveCategory(section.data.categories?.[0]);
        }
      })
      .catch(console.error);
  }, []);

  if (!data) return null;

  const {
    title,
    categories = [],
    announcements = {},
    items_per_page = 4,
  } = data;

  const currentItems = announcements[activeCategory] || [];
  const visibleItems = currentItems.slice(
    currentIndex,
    currentIndex + items_per_page
  );

  return (
    <section className="announcements-section">
      <div className="container">
        {/* ===== Heading ===== */}
        <h2 className="heading">
          <hr className="heading-line" />
          {title}
        </h2>

        {/* ===== Tabs ===== */}
        <div className="announcement-categories">
          {categories.map(cat => (
            <span
              key={cat}
              type="button"
              className={`tab-btn ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* ===== Content ===== */}
        <div className="announcement-grid">
          {visibleItems.map((item, index) => (
            <div key={index} className="announcement-item">
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </a>

              {item.date && (
                <p className="date">{item.date}</p>
              )}
            </div>
          ))}
        </div>

        {/* ===== Arrows ===== */}
        {currentItems.length > items_per_page && (
          <div className="arrow-controls">
            <button
              disabled={currentIndex === 0}
              onClick={() =>
                setCurrentIndex(p =>
                  Math.max(p - items_per_page, 0)
                )
              }
            >
              <ArrowLeft size={18} />
            </button>

            <button
              disabled={
                currentIndex + items_per_page >= currentItems.length
              }
              onClick={() =>
                setCurrentIndex(p => p + items_per_page)
              }
            >
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeANNOUNCEMENTS;
