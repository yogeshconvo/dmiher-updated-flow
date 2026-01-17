// import DropdownButton from "./UI/DropDownButton";

// const TopUI = ({ topUI, departments, selectedDept, setSelectedDept,selectedCategory,setSelectedCategory }) => {
//   if (!topUI || !topUI.type) return null;

//   /* ---------------- DROPDOWN ---------------- */
//   if (topUI.type === "dropdown") {
//     // ✅ convert array → object map (WHAT DropdownButton EXPECTS)
//     const options = departments.reduce((acc, dept) => {
//       acc[dept.name] = { name: dept.name };
//       return acc;
//     }, {});

//     return (
//       <div className="mb-14 text-center">
//         <div className="relative max-w-md mx-auto">
//           <DropdownButton
//             options={options}
//             selectedKey={selectedDept}
//             onChange={setSelectedDept}  
//             placeholder="Select Department"
//             className="mb-8"
//           />
//         </div>
//       </div>
//     );
//   }


// /* ---------------- CATEGORY ---------------- */
// if (topUI.type === "category") {
//   return (
//     <section className="mb-16 text-center">
//       <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F04E30] to-[#102B64] bg-clip-text text-transparent mb-4">
//         {topUI.title}
//       </h2>

//       {topUI.subtitle && (
//         <p className="text-gray-600 mb-10">{topUI.subtitle}</p>
//       )}

//       <div className="flex flex-wrap justify-center gap-4">
//         {topUI.categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}   
//             className={`rounded-2xl px-6 py-3 shadow border transition
//               ${
//                 selectedCategory === cat
//                   ? "bg-[#102B64] text-white"
//                   : "bg-white text-gray-700"
//               }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }


//   /* ---------------- HEADING ---------------- */
//   if (topUI.type === "heading") {
//     return (
//       <div className="text-center mb-16">
//         <h2 className="text-4xl font-bold text-[#102B64] mb-4">
//           {topUI.title}
//         </h2>
//         {topUI.subtitle && (
//           <p className="text-gray-600 text-xl font-medium">
//             {topUI.subtitle}
//           </p>
//         )}
//       </div>
//     );
//   }

//   return null;
// };

// export default TopUI;
import DropdownButton from "./UI/DropDownButton";
// import "./TopUI.css";

const TopUI = ({
  topUI,
  departments,
  selectedDept,
  setSelectedDept,
  selectedCategory,
  setSelectedCategory,
}) => {
  if (!topUI || !topUI.type) return null;

  /* ---------------- DROPDOWN ---------------- */
  if (topUI.type === "dropdown") {
    const options = departments.reduce((acc, dept) => {
      acc[dept.name] = { name: dept.name };
      return acc;
    }, {});

    return (
      <div className="topui-dropdown-wrapper">
        <div className="topui-dropdown-inner">
          <DropdownButton
            options={options}
            selectedKey={selectedDept}
            onChange={setSelectedDept}
            placeholder="Select Department"
          />
        </div>
      </div>
    );
  }

  /* ---------------- CATEGORY ---------------- */
  if (topUI.type === "category") {
    return (
      <section className="topui-category">
        <h2 className="topui-category-title">{topUI.title}</h2>

        {topUI.subtitle && (
          <p className="topui-category-subtitle">{topUI.subtitle}</p>
        )}

        <div className="topui-category-list">
          {topUI.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`topui-category-btn ${
                selectedCategory === cat ? "topui-category-btn-active" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
    );
  }

  /* ---------------- HEADING ---------------- */
  if (topUI.type === "heading") {
    return (
      <div className="topui-heading">
        <h2 className="topui-heading-title">{topUI.title}</h2>

        {topUI.subtitle && (
          <p className="topui-heading-subtitle">{topUI.subtitle}</p>
        )}
      </div>
    );
  }

  return null;
};

export default TopUI;
