import React, { useEffect, useState } from "react";

function OneHealth({ data }) {
  const {
    title,
    legend = [],
    rows = [],
    columns = [],
    grid = [],
  } = data || {};

  const [cellSize, setCellSize] = useState(70);

  useEffect(() => {
    const updateCellSize = () => {
      const width = window.innerWidth;
      let size = 70;

      if (width < 350) size = 30;
      else if (width < 640) size = 40;
      else if (width < 768) size = 55;
      else if (width < 1024) size = 55;
      else size = 70;

      setCellSize(Math.max(20, size));
    };

    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, []);

  return (
    <div className="my-10 flex flex-col items-start gap-16 sm:gap-32 container mx-auto">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-oswald-medium font-[500] text-[#58595B]">
        <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
        {title}
      </h2>

      <div className="w-full flex flex-col-reverse sm:flex-col lg:flex-row lg:justify-evenly gap-10 lg:gap-20">
        {/* Legend */}
        <div className="space-y-4 mx-auto">
          {legend.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 font-[600]"
              style={{ top: `${i * 10}px` }}
            >
              <div
                className={`w-5 h-5 transform rotate-45 ${item.color}`}
              />
              <span className="text-[#58595B] text-sm sm:text-base md:text-lg lg:text-[18px] max-w-xs">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div
          className="relative ml-auto md:mx-auto sm:mt-5 mt-36"
          style={{
            width: cellSize * columns.length,
            height: cellSize * rows.length,
          }}
        >
          {/* Vertical lines */}
          {columns.map((_, colIdx) => (
            <div
              key={`v-${colIdx}`}
              className="absolute top-[-40px] w-px bg-[#707070]"
              style={{
                left: `${colIdx * cellSize}px`,
                height: `${cellSize === 40 ? 100 : 90}%`,
              }}
            />
          ))}

          {/* Horizontal lines */}
          {rows.map((_, rowIdx) => (
            <div
              key={`h-${rowIdx}`}
              className="absolute left-[-40px] h-px bg-[#707070]"
              style={{
                top: `${rowIdx * cellSize}px`,
                width: `${cellSize === 40 ? 100 : 90}%`,
              }}
            />
          ))}

          {/* Diamonds */}
          {grid.map((row, rowIdx) =>
            row.map((cell, colIdx) =>
              cell ? (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className={`absolute w-5 h-5 transform rotate-45 ${cell}`}
                  style={{
                    top: `${rowIdx * cellSize - 8}px`,
                    left: `${colIdx * cellSize - 8}px`,
                  }}
                />
              ) : null
            )
          )}

          {/* Column headers */}
          {columns.map((col, idx) => (
            <div
              key={idx}
              className="absolute text-sm text-[#58595B]"
              style={{
                left: `${idx * cellSize + 60}px`,
                top: "-70px",
                transform: "translateX(-50%) rotate(-90deg)",
                width: "100px",
                whiteSpace: "nowrap",
              }}
            >
              {col}
            </div>
          ))}

          {/* Row labels */}
          {rows.map((row, idx) => (
            <div
              key={idx}
              className="absolute text-sm text-[#58595B]"
              style={{
                top: `${idx * cellSize}px`,
                left: "-160px",
                height: `${cellSize}px`,
                display: "flex",
                alignItems: "center",
                width: "120px",
                transform: "translateY(-50%)",
              }}
            >
              {row}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OneHealth;
