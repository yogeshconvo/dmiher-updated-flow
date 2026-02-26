import { getImageSrc } from "../../../components/Services/FetchImages";

function HomeSteps({ data }) {
  const {
    header = {},
    paragraphs = [],
    counters = [],
  } = data || {};

  const {
    heading,
    background_image, 
  } = header;

  const bgImage = background_image;

  return (
    <div className="max-w-7xl mx-auto px-5  py-10 ">
      <div
        className="bg-white bg-no-repeat bg-center bg-contain text-center px-4 md:px-12 pt-[60px] mx-4 md:mx-20"
        style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
      >
        {/* Heading */}
        {heading && (
          <h2 className="text-2xl md:text-5xl font-[500] font-oswald-medium p-6 md:p-10 text-[#707070] mb-4 leading-snug">
            {heading}
          </h2>
        )}

        {/* Counters */}
        {counters.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mt-6 md:mt-10">
            {counters.map((item, index) => (
              <div
                key={item.id || item.label || index}
                className="flex flex-col gap-1 items-center"
              >
                <div className="bg-[#E1CD67] rounded-full w-32 h-32 md:w-36 md:h-36 flex items-center justify-center shadow-md">
                  <span className="text-4xl font-[500] text-[#122E5E] font-oswald-medium">
                    {item.value}
                  </span>
                </div>

                <p className="mt-2 text-2xl text-[#122E5E] font-oswald-medium text-center font-[600] max-w-[9rem]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Paragraphs */}
        {paragraphs.length > 0 && (
          <div className="mt-8 text-[#58595B] max-w-3xl mx-auto text-base">
            {paragraphs.map((item, index) => (
              <p key={index} className="mb-3">
                {item.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeSteps;
