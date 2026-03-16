// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const TabMenu = ({ data }) => {
//   const navigate = useNavigate();
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const handleClick = (tab, index) => {
//     if (tab.type === "page") {
//       navigate(`/page/${tab.page_slug }`);
//       console.log(tab.page_slug );
//     }

//     if (tab.type === "pdf") {
//       window.open(`/${tab.pdf}`, "_blank");
//     }

//     if (tab.type === "dropdown") {
//       setOpenDropdown(openDropdown === index ? null : index);
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4">
//       <ul className="flex gap-6">
//         {data.tabs.map((tab, index) => (
//           <li key={index} className="relative">
            
//             <button
//               onClick={() => handleClick(tab, index)}
//               className="font-medium text-gray-700 hover:text-blue-600 transition"
//             >
//               {tab.title}
//             </button>

//             {/* Dropdown */}
//             {tab.type === "dropdown" && openDropdown === index && (
//               <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded-md">
//                 {tab.items.map((item, i) => (
//                   <li key={i}>
//                     <button
//                       onClick={() => navigate(`/page/${item.page_slug}`)}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       {item.title}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}

//           </li>
//         ))}
//       </ul>
//     </div>


//     I want page will render here when type === page and tabs will be clickable and fixed to that post-- -> {
      
//     }
//   );
// };

// export default TabMenu;
import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
// import PageRenderer from "./PageRenderer";
import MainMicropage from "./Main-micropage";

const TabMenu = ({ data }) => {

  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleClick = (tab, index) => {

    if (tab.type === "page") {
      navigate(tab.page_slug);
    }

    if (tab.type === "pdf") {
      window.open(`/${tab.pdf}`, "_blank");
    }

    if (tab.type === "dropdown") {
      setOpenDropdown(openDropdown === index ? null : index);
    }
  };

  return (
    <div>

      {/* Tabs */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <ul className="flex gap-6 px-6 py-3">

          {data.tabs.map((tab, index) => (
            <li key={index} className="relative">

              <button
                onClick={() => handleClick(tab, index)}
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                {tab.title}
              </button>

              {/* Dropdown */}
              {tab.type === "dropdown" && openDropdown === index && (
                <ul className="absolute left-0 mt-2 w-44 bg-white shadow-lg border rounded-md">

                  {tab.items.map((item, i) => (
                    <li key={i}>
                      <button
                        onClick={() => navigate(item.page_slug)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}

                </ul>
              )}

            </li>
          ))}

        </ul>
      </div>

      {/* Page Render Area */}
      <div className="p-6">

        <Routes>

          {data.tabs.map((tab, index) => {

            if (tab.type === "page") {
              return (
                <Route
                  key={index}
                  path={tab.page_slug}
                  element={<MainMicropage slug={tab.page_slug} />}
                />
              );
            }

            if (tab.type === "dropdown") {
              return tab.items.map((item, i) => (
                <Route
                  key={i}
                  path={item.page_slug}
                  element={<MainMicropage slug={item.page_slug} />}
                />
              ));
            }

            return null;

          })}

        </Routes>

      </div>

    </div>
  );
};

export default TabMenu;