// import { useState } from "react";
// import RichTextRenderer from "../../components/RichTextRenderer";

// function InfoSection({ data }) {
//   if (!data) return null;

//   const basic = data.basic || {};
//   const introParagraphs = Array.isArray(data.intro_paragraphs)
//     ? data.intro_paragraphs
//     : [];
//   const moreParagraphs = Array.isArray(data.view_more_paragraphs)
//     ? data.view_more_paragraphs
//     : [];

//   const { title, tagline, highlight_color } = basic;
//   // const quickLinks = data.quick_links || [];
//   const quickLinks = [
//     { title: "Quick Link 1", url: "https://example.com/quick-link-1" },
//     { title: "Quick Link 2", url: "https://example.com/quick-link-2" },
//     { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
//     { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
//     { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
//     { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
//     { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
//     { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
//   ];

//   const [showMore, setShowMore] = useState(false);

//   return (
//     <div className="info-section">
//       {/* ================= TITLE ================= */}
//       {title && (
//         <h2 className="info-title">
//           <hr
//             className="info-title-line"
//             style={{ borderColor: highlight_color || "#ccc" }}
//           />

//           <span className="info-title-text">{title}</span>

//           <hr
//             className="info-title-line"
//             style={{ borderColor: highlight_color }}
//           />
//         </h2>
//       )}

//       {/* {quickLinks && quickLinks.length > 0 && (
//        <div className="quick-links">
//         {quickLinks.map((link, i) => (
//           <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
//             {link.title}
//           </a>
//         ))}
//        </div>
//       )} */}
//       {/* ================= CONTENT ================= */}
//       <section className="info-content">
//         {tagline && (
//           <h1 className="info-tagline">
//             {tagline}
//           </h1>
//         )}

//         <div className="">
//           {/* Intro paragraphs */}
//           {introParagraphs.map((p, i) => (
//             <p key={i} className="">
//               <RichTextRenderer html={p.desc} />
//                  {!showMore && moreParagraphs.length > 0 && (
//             <button
//               className="info-btn info-btn-more"
//               onClick={() => setShowMore(true)}
//             >
//               View More
//             </button>
//           )}

//             </p>
            
//           ))}      

//           {/* View More */}
       
//           {/* Extra paragraphs */}
//           {showMore &&
//             moreParagraphs.map((p, i) => (
//               <p key={i} className="info-paragraph">
//                 <RichTextRenderer html={p.desc}/>
//               </p>
//             ))}

//           {/* View Less */}
//           {showMore && moreParagraphs.length > 0 && (
//             <button
//               className="info-btn info-btn-less"
//               onClick={() => setShowMore(false)}
//             >
//               View Less
//             </button>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default InfoSection;
import { useState } from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

function InfoSection({ data }) {
  if (!data) return null;

  const [showMore, setShowMore] = useState(false);

  // 🔥 Detect which structure is coming
  const isSlider = Array.isArray(data?.slider);

  // ================= CASE 1 =================
  const basic = data.basic || {};
  const introParagraphs = Array.isArray(data.intro_paragraphs)
    ? data.intro_paragraphs
    : [];
  const moreParagraphs = Array.isArray(data.view_more_paragraphs)
    ? data.view_more_paragraphs
    : [];

  const { title, tagline, highlight_color } = basic;

  // ================= CASE 2 =================
  const sliderItem = isSlider ? data.slider[0] : null;

  return (
    <div className="info-section">

      {/* ================= TITLE ================= */}
      {(title || sliderItem?.title) && (
        <h2 className="info-title">
          <hr
            className="info-title-line"
            style={{ borderColor: highlight_color || "#ccc" }}
          />

          <span className="info-title-text">
            {title || sliderItem?.title}
          </span>

          <hr
            className="info-title-line"
            style={{ borderColor: highlight_color || "#ccc" }}
          />
        </h2>
      )}

      {/* ================= CONTENT ================= */}
      <section className="info-content">

        {/* Tagline */}
        {(tagline || sliderItem?.tegline) && (
          <h1 className="info-tagline">
            {tagline || sliderItem?.tegline}
          </h1>
        )}

        <div>

          {/* ================= CASE 2 (SLIDER) ================= */}
          {isSlider && (
            <>
              {sliderItem?.desc && (
                <div className="info-paragraph">
                  <RichTextRenderer html={sliderItem.desc} />
                </div>
              )}

              {/* View More for viredesc */}
              {!showMore && sliderItem?.viredesc && (
                <button
                  className="info-btn info-btn-more"
                  onClick={() => setShowMore(true)}
                >
                  View More
                </button>
              )}

              {showMore && sliderItem?.viredesc && (
                <div className="info-paragraph">
                  <RichTextRenderer html={sliderItem.viredesc} />
                </div>
              )}

              {showMore && sliderItem?.viredesc && (
                <button
                  className="info-btn info-btn-less"
                  onClick={() => setShowMore(false)}
                >
                  View Less
                </button>
              )}
            </>
          )}

          {/* ================= CASE 1 (OLD STRUCTURE) ================= */}
          {!isSlider && (
            <>
              {/* Intro */}
              {introParagraphs.map((p, i) => (
                <div key={i} className="info-paragraph">
                  <RichTextRenderer html={p.desc} />
                </div>
              ))}

              {/* View More */}
              {!showMore && moreParagraphs.length > 0 && (
                <button
                  className="info-btn info-btn-more"
                  onClick={() => setShowMore(true)}
                >
                  View More
                </button>
              )}

              {/* Extra */}
              {showMore &&
                moreParagraphs.map((p, i) => (
                  <div key={i} className="info-paragraph">
                    <RichTextRenderer html={p.desc} />
                  </div>
                ))}

              {/* View Less */}
              {showMore && moreParagraphs.length > 0 && (
                <button
                  className="info-btn info-btn-less"
                  onClick={() => setShowMore(false)}
                >
                  View Less
                </button>
              )}
            </>
          )}

        </div>
      </section>
    </div>
  );
}

export default InfoSection;