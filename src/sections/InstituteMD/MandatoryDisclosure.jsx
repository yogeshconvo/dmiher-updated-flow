import { useCallback } from "react";
import { CardMandatoryDisclosure } from "./CardMandatoryDisclosure";

const MandatoryDisclosure = ({ data }) => {
  const capitalizeWords = useCallback(
    (text = "") => text.replace(/\b\w/g, (char) => char.toUpperCase()),
    [],
  );

  const title = data?.title || "";
  const items = Array.isArray(data?.items) ? data.items : [];

  if (!items.length) return null;

  return (
    <section className="bg-[#FAFAF6] py-12">
      <div className="container">
        <h2 className="text-3xl md:text-4xl pt-5 pb-5 font-[500] text-[#707070] font-oswald-medium uppercase mb-5 tracking-wide">
          <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
          {title}
        </h2>

        <div className="flex flex-wrap max-w-6xl mx-auto justify-between gap-y-6">
          {items.map((item, index) => (
            <CardMandatoryDisclosure
              key={index}
              {...item}
              name={capitalizeWords(item.name || "")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MandatoryDisclosure;
