import { useState } from "react";

function InfoSection({ data }) {
  const { title, tagline, highlight_color, intro_paragraphs, more_paragraphs } =
    data || {};
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="py-12 ">
      <h2 className="flex flex-wrap items-center justify-center sm:justify-between text-[#F04E30] font-oswald-medium text-3xl tracking-wider uppercase mb-6 text-center">
        <hr
          className="hidden sm:block flex-grow border-t"
          style={{ borderColor: highlight_color }}
        />
        <span className="px-4 whitespace-normal text-sm sm:text-lg md:text-xl lg:text-xl xl:text-3xl">
          {title}
        </span>
        <hr
          className="hidden sm:block flex-grow border-t"
          style={{ borderColor: highlight_color }}
        />
      </h2>

      <section className="bg-white text-center text-sm mx-auto max-w-7xl px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-[500] font-oswald-medium text-[#58595B] leading-snug mb-6">
          {tagline?.toUpperCase()}
        </h1>

        <div className="text-[#58595B] font-[Arial] tracking-wide max-w-4xl mx-auto">
          {intro_paragraphs.map((p, i) => (
            <p key={i} className="mb-4">
              {p}
            </p>
          ))}

          {!showMore && more_paragraphs.length > 0 && (
            <button
              className="mt-2 mb-4 px-6 py-2 bg-[#F04E30] text-white rounded font-semibold transition hover:bg-[#d13d22]"
              onClick={() => setShowMore(true)}
            >
              View More
            </button>
          )}

          {showMore &&
            more_paragraphs.map((p, i) => (
              <p key={i} className="mb-4">
                {p}
              </p>
            ))}

          {showMore && more_paragraphs.length > 0 && (
            <button
              className="mt-2 mb-4 px-6 py-2 bg-[#f47660] text-white rounded font-semibold transition hover:bg-[#d13d22]"
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
