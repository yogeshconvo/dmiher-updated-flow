import ViewMoreButton from "../../../components/UI/ViewMore";
import ResearchSectionMobileSlider from "../../../components/UI/MobileSlider";
// import { getImageSrc } from "../../../components/Services/FetchImages";
import RichTextRenderer from "../../../components/RichTextRenderer";

const ResearchInnovation = ({ data }) => {
  if (!data) return null;

  const heading = data?.header?.heading;
  const image = data?.header?.image;
  const stats = data?.stats || [];
  const button = data?.button;

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-5">

        {/* ================= HEADING ================= */}
        {heading && (
          <h2 className="font-oswald-medium text-[#707070] text-2xl sm:text-3xl md:text-4xl uppercase font-[500]">
            <div className="w-20 h-1 bg-[#F04E30] mb-2"></div>
            {heading}
          </h2>
        )}

        {/* ================= MAIN CONTENT ================= */}
        <div className="mt-10 flex flex-col lg:flex-row gap-7">

          {/* ========== LEFT IMAGE ========== */}
          {image && typeof image === "string" && (
            <div className="lg:w-2/5">
              <img
                src={image}
                alt="Research"
                className="w-full h-auto max-h-96 object-cover rounded-lg shadow"
              />
            </div>
          )}

          {/* ========== DESKTOP GRID (lg+) ========== */}
          <div className="hidden lg:grid lg:w-3/5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {stats.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center px-2 ${
                  index !== 2 ? "border-r border-gray-300" : ""
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-24 h-24 mb-2"
                />
                <RichTextRenderer className="text-2xl font-bold text-orange-600" html=  {item.value}/>
              
             
              </div>
            ))}

            {/* Bottom Two Centered */}
            {stats.length > 3 && (
              <div className="col-span-full flex justify-center gap-5 mt-4">
                {stats.slice(3, 5).map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center text-center px-8 ${
                      index === 0 ? "border-r border-gray-300" : ""
                    }`}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-24 h-24 mb-2"
                    />
                   <RichTextRenderer className="text-2xl font-bold text-orange-600" html=  {item.value}/>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* ========== MOBILE SLIDER ========== */}
          <div className="lg:hidden w-full">
            <ResearchSectionMobileSlider
              data={stats}
              autoplayDelay={3000}
              speed={500}
            />
          </div>

        </div>

        {/* ================= BUTTON ================= */}
        {button && (
          <div className="mt-8 text-center md:text-right">
            <ViewMoreButton
              href={button.link}
              label={button.label}
              className="hover:scale-105 transition-all"
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default ResearchInnovation;
