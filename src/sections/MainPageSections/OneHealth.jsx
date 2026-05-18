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

  const safeGrid = useMemo(() => {
    if (!Array.isArray(grid)) return [];

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
    <div className="onehealth-section">

      {/* Heading */}
      <h2 className="onehealth-heading">
        <hr className="onehealth-heading-line" />
        {basic?.title}
      </h2>

      <div className="onehealth-body">

        {/* Legend */}
        <div className="onehealth-legend">
          {legend.map((item, i) => (
            <div key={i} className="onehealth-legend-item">
              <div
                className="onehealth-legend-swatch"
                style={{ backgroundColor: item.bg_color }}
              />
              <span className="onehealth-legend-text">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div
          className="onehealth-grid-wrap"
          style={{
            width: cellSize * columns.length,
            height: cellSize * rows.length,
          }}
        >
          {/* Vertical lines */}
          {columns.map((_, colIdx) => (
            <div
              key={`v-${colIdx}`}
              className="onehealth-grid-vline"
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
              className="onehealth-grid-hline"
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
                  className="onehealth-diamond"
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
              className="onehealth-grid-label"
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
              className="onehealth-grid-label"
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
