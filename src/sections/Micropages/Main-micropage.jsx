// import React from "react";

// const MainMicropage = ({ data }) => {
//   console.log(data, "FULL DATA");


//   const pageData = Array.isArray(data) ? data[0] : data;

//   const title = pageData?.title;
//   const contentFlow = pageData?.content_flow || [];

//   return (
//     <div className="micropage">
//       <div className="container">
//         <h1>{title}</h1>

//         {contentFlow.map((item, index) => {
      
//           const key = `${item.type}-${index}-${item.value?.length || "x"}`;

//           switch (item.type) {
//             case "heading":
//               return <h2 key={key}>{item.value}</h2>;

//             case "paragraph":
//               return (
//                 <div
//                   key={key}
//                   dangerouslySetInnerHTML={{ __html: item.value }}
//                 />
//               );

//             case "table":
//               return (
//                 <table key={key} border="1" cellPadding="8">
//                   <tbody>
//                     {item.value.map((row, rIdx) => (
//                       <tr key={`${key}-row-${rIdx}`}>
//                         {row.map((cell, cIdx) => (
//                           <td key={`${key}-cell-${rIdx}-${cIdx}`}>
//                             {cell}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               );

//             case "image":
//               return (
//                 <img
//                   key={key}
//                   src={item.value}
//                   alt=""
//                   style={{ width: "100%", margin: "20px 0" }}
//                 />
//               );

//             default:
//               return null;
//           }
//         })}
//       </div>
//     </div>
//   );
// };

// export default MainMicropage;
import React from "react";

const MainMicropage = ({ data }) => {
  const pageData = Array.isArray(data) ? data[0] : data;

  const title = pageData?.title;
  const contentFlow = pageData?.content_flow || [];

  return (
    <div className="bg-gray-50 py-14 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-12">
        {/* Page Title */}
        {title && (
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
            {title}
          </h1>
        )}

        {/* Content Flow */}
        {contentFlow.map((item, index) => {
          const key = `${item.type}-${index}`;

          switch (item.type) {
            case "heading":
              return (
                <div key={key} className="mt-10 mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {item.value}
                  </h2>
                  <div className="w-16 h-1 bg-blue-600 mt-2 rounded" />
                </div>
              );

            case "paragraph":
              return (
                <div
                  key={key}
                  className="text-gray-600 leading-relaxed text-base mb-5"
                  dangerouslySetInnerHTML={{ __html: item.value }}
                />
              );

            case "image":
              return (
                <div key={key} className="my-8 flex justify-center">
                  <img
                    src={item.value}
                    alt=""
                    className="rounded-xl shadow-md max-w-full"
                  />
                </div>
              );

            case "table":
              return (
                <div key={key} className="overflow-x-auto my-8">
                  <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <tbody>
                      {item.value.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="even:bg-gray-50 hover:bg-gray-100 transition"
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className="border border-gray-200 px-4 py-3 text-sm text-gray-700"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default MainMicropage;
