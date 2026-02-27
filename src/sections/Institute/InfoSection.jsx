import { useState } from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

function InfoSection({ data }) {
  if (!data) return null;

  const basic = data.basic || {};
  const introParagraphs = Array.isArray(data.intro_paragraphs)
    ? data.intro_paragraphs
    : [];
  const moreParagraphs = Array.isArray(data.view_more_paragraphs)
    ? data.view_more_paragraphs
    : [];
  //  "data": {
  //               "basic": {
  //                   "title": "JNMC",
  //                   "subtitle": "JJNNMMCC",
  //                   "tagline": "AA"
  //               },
  //               "intro_paragraphs": [
  //                   {
  //                       "desc": "AA"
  //                   }
  //               ],
  //               "view_more_paragraphs": [
  //                   {
  //                       "desc": "DErr"
  //                   }
  //               ]
  //           }
  const { title, tagline, highlight_color } = basic;
  // const quickLinks = data.quick_links || [];
  const quickLinks = [
    { title: "Quick Link 1", url: "https://example.com/quick-link-1" },
    { title: "Quick Link 2", url: "https://example.com/quick-link-2" },
    { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
    { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
    { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
    { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
    { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
    { title: "Quick Link 3", url: "https://example.com/quick-link-3" },
  ];

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="info-section">
      {/* ================= TITLE ================= */}
      {title && (
        <h2 className="info-title">
          <hr
            className="info-title-line"
            style={{ borderColor: highlight_color || "#ccc" }}
          />

          <span className="info-title-text">{title}</span>

          <hr
            className="info-title-line"
            style={{ borderColor: highlight_color }}
          />
        </h2>
      )}

      {/* {quickLinks && quickLinks.length > 0 && (
       <div className="quick-links">
        {quickLinks.map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.title}
          </a>
        ))}
       </div>
      )} */}
      {/* ================= CONTENT ================= */}
      <section className="info-content">
        {tagline && (
          <h1 className="info-tagline">
            {tagline}
          </h1>
        )}

        <div className="info-text-wrapper">
          {/* Intro paragraphs */}
          {introParagraphs.map((p, i) => (
            <p key={i} className="">
              <RichTextRenderer html={p.desc} />
                 {!showMore && moreParagraphs.length > 0 && (
            <button
              className="info-btn info-btn-more"
              onClick={() => setShowMore(true)}
            >
              View More
            </button>
          )}

            </p>
            
          ))}      

          {/* View More */}
       
          {/* Extra paragraphs */}
          {showMore &&
            moreParagraphs.map((p, i) => (
              <p key={i} className="info-paragraph">
                <RichTextRenderer html={p.desc}/>
              </p>
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
        </div>
      </section>
    </div>
  );
}

export default InfoSection;
