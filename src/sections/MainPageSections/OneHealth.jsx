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

  // The CMS sends grid cells as {row_index, col_index, bg2_color} entries
  // (1-based coordinates). Depending on how the repeater serialises, `grid`
  // can be an array of those entries, an object with numeric keys, or (legacy)
  // an array-of-arrays of colors. Normalise everything into "r-c" -> color.
  const cellMap = useMemo(() => {
    const entries = [];
    if (Array.isArray(grid)) {
      if (Array.isArray(grid[0])) {
        // legacy nested-array shape: grid[r][c] = color
        const map = {};
        grid.forEach((row, r) =>
          row.forEach((color, c) => {
            if (color) map[`${r}-${c}`] = color;
          })
        );
        return map;
      }
      entries.push(...grid);
    } else if (grid && typeof grid === "object") {
      Object.keys(grid).forEach((k) => {
        if (/^\d+$/.test(k) && grid[k] && typeof grid[k] === "object") {
          entries.push(grid[k]);
        }
      });
      // single flattened entry (no numeric keys)
      if (!entries.length && grid.row_index) entries.push(grid);
    }

    const map = {};
    entries.forEach((e) => {
      const r = Number(e?.row_index);
      const c = Number(e?.col_index);
      const color = e?.bg2_color || e?.color;
      if (r >= 1 && c >= 1 && color) map[`${r - 1}-${c - 1}`] = color;
    });
    return map;
  }, [grid]);

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

          {/* Diamonds — one per CMS grid entry, centred on its intersection */}
          {rows.map((_, rIdx) =>
            columns.map((_, cIdx) => {
              const color = cellMap[`${rIdx}-${cIdx}`];
              return color ? (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className="onehealth-diamond"
                  style={{
                    backgroundColor: color,
                    top: `${rIdx * cellSize - 9}px`,
                    left: `${cIdx * cellSize - 9}px`,
                  }}
                />
              ) : null;
            })
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
