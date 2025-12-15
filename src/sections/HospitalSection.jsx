function HospitalSection({ data }) {
  const { heading, paragraphs, images } = data || {};
  return (
    <div className="bg-[#fefaf3] py-14">
      <div className="container gap-12 items-center justify-center">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl text-[#707070] uppercase mb-2 font-oswald-medium  tracking-tight leading-tight">
            <span className="block border-t-4 border-[#F04E30] w-20 sm:w-24 mb-2"></span>
            {heading}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full pb-6 lg:pb-10 basis-[40%]">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[#58595B] text-base font-oswald font-[400] pb-2 tracking-normal"
              >
                {p}
              </p>
            ))}
          </div>

          {images.length > 0 && (
            <div className="relative w-full lg:w-auto basis-[60%]"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HospitalSection;
