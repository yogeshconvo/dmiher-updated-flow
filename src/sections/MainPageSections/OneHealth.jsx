import React, { useEffect, useState, useMemo } from "react";

function OneHealth({ data }) {
  const {
    basic,
    legend = [],
    rows = [],
    columns = [],
    grid = [],
  } = data || {};

  const [cellSize, setCellSize] = useState(70);

  // Normalize grid to 2D array
  const safeGrid = useMemo(() => {
    if (!Array.isArray(grid)) return [];

    // If backend sends flat grid, convert to NxN
    if (!Array.isArray(grid[0])) {
      const size = Math.min(rows.length, columns.length);
      return Array.from({ length: size }, () =>
        Array.from({ length: size }, () => grid[0]?.bg2_color || null)
      );
    }

    return grid;
  }, [grid, rows.length, columns.length]);

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
      <h2 className="heading">
        <hr className="heading-line" />
        {basic?.title}
      </h2>

      <div className="w-full flex flex-col-reverse lg:flex-row lg:justify-evenly gap-10 lg:gap-20">

        {/* Legend */}
        <div className="space-y-4 mx-auto">
          {legend.map((item, i) => (
            <div key={i} className="flex items-center gap-3 font-[600]">
              <div
                className="w-5 h-5 rotate-45"
                style={{ backgroundColor: item.bg_color }}
              />
              <span className="text-[#58595B] text-sm md:text-lg">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div
          className="relative md:mx-auto mt-10"
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
                height: "90%",
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
                width: "90%",
              }}
            />
          ))}

          {/* Diamonds */}
          {safeGrid.map((row, rIdx) =>
            row.map((color, cIdx) =>
              color ? (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className="absolute w-5 h-5 rotate-45"
                  style={{
                    backgroundColor: color,
                    top: `${rIdx * cellSize - 9}px`,
                    left: `${cIdx * cellSize - 9}px`,
                  }}
                />
              ) : null
            )
          )}

          {/* Column labels */}
          {columns.map((col, idx) => (
            <div
              key={idx}
              className="absolute text-sm text-[#58595B]"
              style={{
                left: `${idx * cellSize}px`,
                top: "-140px",
                transform: "translateX(-50%) rotate(-90deg)",
                width: "120px",
                whiteSpace: "nowrap",
              }}
            >
              {col.column_label}
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
                width: "140px",
                transform: "translateY(-50%)",
              }}
            >
              {row.row_label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OneHealth;
