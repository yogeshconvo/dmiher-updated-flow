import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

function ProgramsSection({ data, college }) {
  const { header, programs } = data || {};

  // Resolve college slug: prop → URL fallback
  const locationSlug = useLocation().pathname.split("/")[1];
  const instituteSlug = college || locationSlug;

  if (!programs?.length) return null;

  /**
   * Flatten programs → one card per category.
   *
   * API gives:  [{ category: ["undergraduate", "postgraduate"] }]
   * We need:    [{ category: "undergraduate" }, { category: "postgraduate" }]
   *
   * Each category becomes its own clickable card linking to:
   *   /{college}/programs/{category}
   */
  const categoryCards = programs.flatMap((program) => {
    const cats = Array.isArray(program.category)
      ? program.category
      : [program.category].filter(Boolean);

    return cats.map((cat) => ({
      label: cat.charAt(0).toUpperCase() + cat.slice(1), // "undergraduate" → "Undergraduate"
      category: cat,
      link: ROUTES.programsByCategory(instituteSlug, cat),
    }));
  });

  if (!categoryCards.length) return null;

  return (
    <div className="w-full flex justify-center">
      <div className="container">
        <h2 className="heading">
          <hr className="heading-line" />
          {header?.heading}
        </h2>

        {/* Mobile */}
        <ul className="flex flex-col items-center sm:hidden flex-wrap gap-6">
          {categoryCards.map((card) => (
            <li
              key={card.category}
              className="clip-path-message group cursor-pointer"
            >
              <Link to={card.link}>
                <span className="clip-path-message-inner">
                  <span className="text-center block w-[160px]">
                    {card.label}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop */}
        <div className="hidden sm:block">
          <ul className="flex justify-center gap-20 mb-10 flex-wrap container">
            {categoryCards.map((card) => (
              <li
                key={card.category}
                className="clip-path-message group cursor-pointer"
              >
                <Link to={card.link}>
                  <span className="clip-path-message-inner">
                    <span className="text-center break-words block w-[180px]">
                      {card.label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProgramsSection;
