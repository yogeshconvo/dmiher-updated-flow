import React from "react";

const Banner = ({ image, html }) => {
  if (!image && !html) return null;

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {image && (
        <img
          src={image}
          alt="NAAC banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute top-auto md:top-0 bottom-0 w-full h-1/2 md:h-full z-10 bg-gradient-to-t hidden lg:block left-0 md:bg-gradient-to-r" />

      <div className="lg:hidden absolute inset-0 bg-opacity-60" />

      <div
        className="absolute top-auto bottom-12 p-5 md:p-15 sm:top-1/2 sm:bottom-auto sm:transform sm:-translate-y-1/2
          text-white w-full sm:w-full lg:w-[40%] max-w-none z-20 text-left sm:left-8 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.6)]"
      >
        {html ? (
          <div
            className="naac-banner-text font-oswald-medium leading-snug whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Banner;
