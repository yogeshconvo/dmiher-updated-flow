import { Link, useLocation } from "react-router-dom";

function ProgramsSection({ data }) {
  const {
   header,
    programs,
    disclosures_heading,
    disclosures_link_text,
    disclosures_cta_text,
    disclosures_url,
  } = data || {};
  const instituteSlug = useLocation().pathname.split("/")[1];

  return (
    <div className="w-full flex justify-center ">
      <div className="container">
         <h2 className="heading">
              <hr className="heading-line" />
          {header?.heading}
        </h2>

        {/* mobile */}
        <ul className="flex flex-col items-center sm:hidden flex-wrap gap-6 ">
          {programs.map((program) => (
            <li
              key={program.name}
              className="clip-path-message group cursor-pointer"
            >
              <Link
                to={`/${instituteSlug}/programs`}
              // to={`/${instituteSlug}/programs/${encodeURIComponent(
              //   program.category
              // )}`}
              >
                <span className="clip-path-message-inner">
                  <span className="text-center  block w-[160px]">
                    {program.name}
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
                  // to={`/${instituteSlug}/programs/${encodeURIComponent(
                  //   program.category
                  // )}`}
                  to={`/${instituteSlug}/programs`}
                >
                  <span className="clip-path-message-inner">
                    <span className="text-center break-words block w-[180px]">
                      {program.name}
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
