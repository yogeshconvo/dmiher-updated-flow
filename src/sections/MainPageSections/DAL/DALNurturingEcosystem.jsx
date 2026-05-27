import { Link } from "react-router-dom";
import RichTextRenderer from "../../../components/RichTextRenderer";

const DALNurturingEcosystem = ({ data }) => {
  const heading = data?.heading || "";
  const subheading = data?.subheading || "";
  const bold_intro = data?.bold_intro || "";
  const description = data?.description || "";
  const buttons = data?.buttons || [];

  return (
    <div className="w-full px-4 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto text-center">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-[500] text-[#707070] tracking-wide uppercase font-oswald-medium">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="text-base text-[#707070] mt-3">{subheading}</p>
        )}
        {bold_intro && (
          <p className="text-sm font-semibold text-[#0a2c61] mt-6">
            {bold_intro}
          </p>
        )}
        {description && (
          <div className="text-sm text-[#707070] mt-3 leading-7">
            <RichTextRenderer html={description} />
          </div>
        )}

        {buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {buttons.map((btn, i) => {
              const label = btn.label || "";
              const url = btn.url || "#";
              const isExternal = /^https?:\/\//i.test(url);
              const cls =
                "bg-[#F7941D] hover:bg-[#e07f0f] text-white font-semibold px-8 py-3 rounded shadow transition";
              if (isExternal) {
                return (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
                    {label}
                  </a>
                );
              }
              return (
                <Link key={i} to={url} className={cls}>
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DALNurturingEcosystem;
