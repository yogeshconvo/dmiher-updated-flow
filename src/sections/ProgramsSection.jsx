import { Link } from "react-router-dom";

function ProgramsSection({ data }) {
  const {
    heading,
    programs,
    disclosures_heading,
    disclosures_link_text,
    disclosures_cta_text,
    disclosures_url,
  } = data || {};

  return (
    <div className="w-full flex justify-center py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-[500] text-[#707070] mb-8 tracking-wider font-oswald-medium">
          <hr className="w-16 sm:w-20 border-[#F04E30] mb-4 border-t-4" />
          {heading}
        </h2>

        {/* mobile */}
        <ul className="flex flex-col items-center sm:hidden flex-wrap gap-6 mb-10">
          {programs.map((program) => (
            <li
              key={program.name}
              className="clip-path-message group cursor-pointer"
            >
              <Link
              // to={`/${instituteSlug}/programs/${encodeURIComponent(
              //   program.category
              // )}`}
              >
                <span className="clip-path-message-inner">
                  <span className="text-center  block w-[160px]">
                    {program.category}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* desktop */}
        <div className="hidden sm:block">
          <ul className="flex justify-center gap-20 mb-10 flex-wrap container">
            {programs.map((program) => (
              <li
                key={program.name}
                className="clip-path-message group cursor-pointer"
              >
                <Link
                //   to={`/${instituteSlug}/programs/${encodeURIComponent(
                //     program.category
                //   )}`}
                >
                  <span className="clip-path-message-inner">
                    <span className="text-center break-words block w-[180px]">
                      {program.category}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <h2 className="text-3xl md:text-4xl mt-10 md:mt-15 font-[500] text-[#707070] mb-8 tracking-wider font-oswald-medium">
          <hr className="w-16 sm:w-20 border-[#F04E30] mb-4 border-t-4" />
          {disclosures_heading}
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex justify-center">
            <Link
              to={disclosures_url}
              className="text-base md:text-xl tracking-wide font-oswald-medium text-gray-600 rounded-md font-[300] hover:bg-blue-100 transition text-center py-2"
            >
              {disclosures_link_text}{" "}
              <span className="font-[400] underline">
                {disclosures_cta_text}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramsSection;
