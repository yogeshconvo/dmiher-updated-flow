import React, { useState } from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

/**
 * Museum — FAQ accordion.
 *
 * Data shape (section_key: museum_faqs)
 *   {
 *     heading: "FAQ'S",
 *     faqs: [
 *       { question, answer (HTML) }
 *     ]
 *   }
 */
export default function MuseumFAQs({ data }) {
  if (!data) return null;
  const { heading, faqs = [] } = data;
  const [openIdx, setOpenIdx] = useState(-1);

  if (!faqs.length) return null;

  return (
    <section className="museum-faqs">
      <div className="container">
        {heading && (
          <h2 className="museum-faqs-heading">
            <hr className="museum-faqs-line" />
            {heading}
          </h2>
        )}

        <div className="museum-faqs-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="museum-faqs-item">
                <button
                  type="button"
                  className={
                    "museum-faqs-question" +
                    (isOpen ? " museum-faqs-question-open" : "")
                  }
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="museum-faqs-toggle">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="museum-faqs-answer">
                    <RichTextRenderer html={faq.answer} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
