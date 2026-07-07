import RichTextRenderer from "../../../components/RichTextRenderer";

// grid_size comes in as "colsXrows" (e.g. "1x2", "2x1"). Return safe integers.
const parseGridSize = (size) => {
  if (typeof size !== "string") return { cols: 1, rows: 1 };
  const [c, r] = size.toLowerCase().split("x").map((n) => parseInt(n, 10));
  return {
    cols: Number.isFinite(c) && c > 0 ? c : 1,
    rows: Number.isFinite(r) && r > 0 ? r : 1,
  };
};

function ThrustAreas({ data }) {
  const heading = data?.header?.heading || "";
  const bgColor = data?.section_style?.bg_color || "#ebf6ff";

  // Boxes may arrive out of order; render by sort_order to match the mock.
  const boxes = Array.isArray(data?.boxes)
    ? [...data.boxes].sort(
        (a, b) => Number(a?.sort_order || 0) - Number(b?.sort_order || 0)
      )
    : [];

  return (
    <section
      className="thrust-areas-section"
      style={{ backgroundColor: bgColor }}
    >
      <div className="thrust-areas-container">
        {heading && (
          <h2 className="thrust-areas-title">
            <hr className="thrust-areas-underline" />
            {heading}
          </h2>
        )}

        {boxes.length > 0 && (
          <div className="thrust-areas-grid">
            {boxes.map((box, i) => {
              const { cols, rows } = parseGridSize(box?.grid_size);
              // The two banner cells at the bottom (2x1 each) share row 3 of a
              // 5-column grid — let the final box stretch to the row end so it
              // matches the wider "International Standards" band in the design.
              const isLastRowLastCell =
                i === boxes.length - 1 && cols === 2 && rows === 1;
              const style = {
                gridColumn: `span ${cols}`,
                gridRow: `span ${rows}`,
                backgroundColor: box?.background_color || "#1A2F4D",
                color: box?.text_color || "#ffffff",
                ...(isLastRowLastCell && { gridColumnEnd: -1 }),
              };
              return (
                <div key={i} className="thrust-areas-box" style={style}>
                  <RichTextRenderer html={box?.description || ""} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ThrustAreas;
