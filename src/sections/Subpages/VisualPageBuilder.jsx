import React, { useState } from "react";
import SafeImage from "../../components/SafeImage";

const BlockRenderer = ({ block }) => {
  const { type, props: p } = block;

  switch (type) {
    case "heading": {
      const Tag = p.level || "h2";
      const sizes = {
        h1: "2.25rem",
        h2: "1.875rem",
        h3: "1.5rem",
        h4: "1.25rem",
        h5: "1.1rem",
        h6: "1rem",
      };
      return (
        <Tag
          style={{
            fontSize: sizes[p.level || "h2"],
            color: p.color || "#1B2A4A",
            textAlign: p.alignment || "left",
            fontWeight: p.fontWeight || "700",
            lineHeight: 1.3,
            margin: "0.5rem 0",
          }}
        >
          {p.text || ""}
        </Tag>
      );
    }

    case "paragraph":
      return (
        <p
          style={{
            color: p.color || "#333",
            textAlign: p.alignment || "left",
            fontSize: `${p.fontSize || 16}px`,
            fontWeight: p.fontWeight || "400",
            lineHeight: p.lineHeight || 1.8,
            fontStyle: p.italic ? "italic" : "normal",
            textDecoration: p.underline ? "underline" : "none",
            margin: "0.5rem 0",
          }}
        >
          {p.text || ""}
        </p>
      );

    case "image":
      return p.src ? (
        <figure style={{ margin: "1rem 0", textAlign: "center" }}>
          <SafeImage
            src={p.src}
            alt={p.alt || ""}
            style={{
              maxWidth: "100%",
              width: p.width || "100%",
              height: p.height || "auto",
              borderRadius: p.borderRadius || "0",
              objectFit: p.objectFit || "cover",
            }}
          />
          {p.caption && (
            <figcaption
              style={{
                fontSize: "0.85rem",
                color: "#666",
                marginTop: "0.5rem",
              }}
            >
              {p.caption}
            </figcaption>
          )}
        </figure>
      ) : null;

    case "image-content": {
      const isRight = p.layout === "right";
      const imgW = parseInt(p.imageWidth || "50", 10);
      const contentW = parseInt(p.contentWidth || String(100 - imgW), 10);
      const vMap = { top: "flex-start", center: "center", bottom: "flex-end" };
      return (
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: vMap[p.verticalAlign] || "center",
            flexDirection: isRight ? "row-reverse" : "row",
            margin: "1.5rem 0",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: `0 0 calc(${imgW}% - 1rem)`, minWidth: "200px" }}>
            {p.image && (
              <SafeImage
                src={p.image}
                alt=""
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <div style={{ flex: `0 0 calc(${contentW}% - 1rem)`, minWidth: "200px", textAlign: p.textAlign || "left" }}>
            {p.heading && (
              <h3
                style={{
                  fontSize: `${p.headingSize || 24}px`,
                  fontWeight: p.headingWeight || 700,
                  color: p.headingColor || "#1B2A4A",
                  marginBottom: "0.75rem",
                }}
              >
                {p.heading}
              </h3>
            )}
            {p.description && (
              <p style={{
                color: p.descColor || "#555",
                fontSize: `${p.descSize || 16}px`,
                fontWeight: p.descWeight || "400",
                lineHeight: p.descLineHeight || 1.8,
                fontStyle: p.descItalic ? "italic" : "normal",
                textDecoration: p.descUnderline ? "underline" : "none",
              }}>{p.description}</p>
            )}
            {p.buttonText && (
              <a
                href={p.buttonLink || "#"}
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  padding: "0.6rem 1.5rem",
                  background: "#1B2A4A",
                  color: "#fff",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                {p.buttonText}
              </a>
            )}
          </div>
        </div>
      );
    }

    case "button": {
      const baseStyle = {
        display: "inline-block",
        borderRadius: "6px",
        fontWeight: 600,
        textDecoration: "none",
        cursor: "pointer",
        border: "2px solid transparent",
        textAlign: "center",
      };
      const variants = {
        primary: {
          background: "#1B2A4A",
          color: "#fff",
          borderColor: "#1B2A4A",
        },
        secondary: {
          background: "#e5e7eb",
          color: "#333",
          borderColor: "#e5e7eb",
        },
        outline: {
          background: "transparent",
          color: "#1B2A4A",
          borderColor: "#1B2A4A",
        },
        ghost: {
          background: "transparent",
          color: "#1B2A4A",
          borderColor: "transparent",
          textDecoration: "underline",
        },
      };
      const sizes = {
        sm: { padding: "0.4rem 1rem", fontSize: "0.8rem" },
        md: { padding: "0.6rem 1.5rem", fontSize: "0.9rem" },
        lg: { padding: "0.8rem 2rem", fontSize: "1rem" },
      };
      return (
        <div
          style={{
            textAlign: p.alignment || "center",
            margin: "1rem 0",
          }}
        >
          <a
            href={p.link || "#"}
            target={p.openInNewTab ? "_blank" : undefined}
            rel={p.openInNewTab ? "noopener noreferrer" : undefined}
            style={{
              ...baseStyle,
              ...(variants[p.variant] || variants.primary),
              ...(sizes[p.size] || sizes.md),
            }}
          >
            {p.label || "Button"}
          </a>
        </div>
      );
    }

    case "cards": {
      const items = Array.isArray(p.items) ? p.items : [];
      const cols = parseInt(p.columns || "3", 10);
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: "1.5rem",
            margin: "1.5rem 0",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#fff",
              }}
            >
              {item.image && (
                <SafeImage
                  src={item.image}
                  alt={item.title || ""}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
              )}
              <div style={{ padding: "1rem" }}>
                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#1B2A4A",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.title || ""}
                </h4>
                <p style={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.6 }}>
                  {item.description || ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    case "gallery": {
      const items = Array.isArray(p.items) ? p.items : [];
      const cols = parseInt(p.columns || "3", 10);
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: "1rem",
            margin: "1.5rem 0",
          }}
        >
          {items.map((item, i) => (
            <figure key={i} style={{ margin: 0 }}>
              {item.src && (
                <SafeImage
                  src={item.src}
                  alt={item.caption || ""}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
              {item.caption && (
                <figcaption
                  style={{
                    fontSize: "0.85rem",
                    color: "#fff",
                    background: "#1B2A4A",
                    textAlign: "center",
                    padding: "0.6rem 0.75rem",
                    borderRadius: "0 0 8px 8px",
                    marginTop: "-8px",
                    fontWeight: 500,
                  }}
                >
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      );
    }

    case "faq": {
      const items = Array.isArray(p.items) ? p.items : [];
      return (
        <div style={{ margin: "1.5rem 0" }}>
          {items.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </div>
      );
    }

    case "accordion": {
      const items = Array.isArray(p.items) ? p.items : [];
      return (
        <div style={{ margin: "1.5rem 0" }}>
          {items.map((item, i) => (
            <AccordionItem key={i} item={item} defaultOpen={i === 0} />
          ))}
        </div>
      );
    }

    case "tabs": {
      const items = Array.isArray(p.items) ? p.items : [];
      return <TabsBlock items={items} />;
    }

    case "notice-box": {
      const colors = {
        info: { bg: "#EFF6FF", border: "#3B82F6", text: "#1E40AF" },
        warning: { bg: "#FFFBEB", border: "#F59E0B", text: "#92400E" },
        success: { bg: "#F0FDF4", border: "#22C55E", text: "#166534" },
        error: { bg: "#FEF2F2", border: "#EF4444", text: "#991B1B" },
      };
      const c = colors[p.variant] || colors.info;
      return (
        <div
          style={{
            background: c.bg,
            borderLeft: `4px solid ${c.border}`,
            borderRadius: "8px",
            padding: "1.25rem 1.5rem",
            margin: "1rem 0",
          }}
        >
          <h4
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: c.text,
              marginBottom: "0.3rem",
            }}
          >
            {p.title || "Notice"}
          </h4>
          <p style={{ fontSize: "0.9rem", color: c.text, opacity: 0.85 }}>
            {p.description || ""}
          </p>
        </div>
      );
    }

    case "faculty-table": {
      const items = Array.isArray(p.items) ? p.items : [];
      const headers = [
        "Sr No",
        "Name",
        "Designation",
        "Qualification",
        "Specialization",
        "Experience",
      ];
      return (
        <div style={{ margin: "1.5rem 0", overflowX: "auto" }}>
          {p.heading && (
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#1B2A4A",
                marginBottom: "1rem",
              }}
            >
              {p.heading}
            </h3>
          )}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr style={{ background: "#1B2A4A", color: "#fff" }}>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr
                  key={i}
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#f9fafb",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <td style={{ padding: "0.6rem 1rem" }}>{i + 1}</td>
                  <td style={{ padding: "0.6rem 1rem" }}>{item.name || "-"}</td>
                  <td style={{ padding: "0.6rem 1rem" }}>{item.designation || "-"}</td>
                  <td style={{ padding: "0.6rem 1rem" }}>{item.qualification || "-"}</td>
                  <td style={{ padding: "0.6rem 1rem" }}>{item.specialization || "-"}</td>
                  <td style={{ padding: "0.6rem 1rem" }}>{item.experience || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "hostel-table": {
      const items = Array.isArray(p.items) ? p.items : [];
      const headers = ["Hostel Name", "Type", "Capacity", "Amenities", "Warden"];
      return (
        <div style={{ margin: "1.5rem 0", overflowX: "auto" }}>
          {p.heading && (
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#1B2A4A",
                marginBottom: "1rem",
              }}
            >
              {p.heading}
            </h3>
          )}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr style={{ background: "#1B2A4A", color: "#fff" }}>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr
                  key={i}
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#f9fafb",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <td style={{ padding: "0.6rem 1rem" }}>{item.name || "-"}</td>
                  <td style={{ padding: "0.6rem 1rem", textTransform: "capitalize" }}>
                    {item.type || "-"}
                  </td>
                  <td style={{ padding: "0.6rem 1rem" }}>{item.capacity || "-"}</td>
                  <td style={{ padding: "0.6rem 1rem" }}>{item.amenities || "-"}</td>
                  <td style={{ padding: "0.6rem 1rem" }}>{item.warden || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "statistics": {
      const items = Array.isArray(p.items) ? p.items : [];
      return (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            justifyContent: "center",
            margin: "1.5rem 0",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 180px",
                maxWidth: "220px",
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "1.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#1B2A4A",
                }}
              >
                {item.value || "0"}
              </p>
              <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.3rem" }}>
                {item.label || ""}
              </p>
            </div>
          ))}
        </div>
      );
    }

    case "download-section": {
      const items = Array.isArray(p.items) ? p.items : [];
      const typeColors = {
        pdf: { bg: "#FEF2F2", color: "#DC2626" },
        doc: { bg: "#EFF6FF", color: "#2563EB" },
        xls: { bg: "#F0FDF4", color: "#16A34A" },
        ppt: { bg: "#FFF7ED", color: "#EA580C" },
        zip: { bg: "#F3F4F6", color: "#4B5563" },
      };
      return (
        <div style={{ margin: "1.5rem 0" }}>
          {p.heading && (
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#1B2A4A",
                marginBottom: "1rem",
              }}
            >
              {p.heading}
            </h3>
          )}
          {items.map((item, i) => {
            const tc = typeColors[item.fileType] || typeColors.pdf;
            return (
              <a
                key={i}
                href={item.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.75rem 1rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  marginBottom: "0.5rem",
                  textDecoration: "none",
                  color: "#333",
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: "1.25rem" }}>📄</span>
                <span style={{ flex: 1, fontSize: "0.95rem" }}>
                  {item.title || "Document"}
                </span>
                <span
                  style={{
                    padding: "0.2rem 0.6rem",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    borderRadius: "4px",
                    background: tc.bg,
                    color: tc.color,
                  }}
                >
                  {item.fileType || "pdf"}
                </span>
              </a>
            );
          })}
        </div>
      );
    }

    case "spacer":
      return <div style={{ height: `${p.height || 40}px` }} />;

    case "divider":
      return (
        <hr
          style={{
            border: "none",
            borderTop: `${p.thickness || 1}px ${p.style || "solid"} ${p.color || "#e5e7eb"}`,
            width: p.width || "100%",
            margin: "1rem auto",
          }}
        />
      );

    case "video": {
      if (!p.url) return null;
      const isYouTube = /youtu(\.be|be\.com)/i.test(p.url);
      if (isYouTube) {
        const match = p.url.match(
          /(?:youtu\.be\/|v=|\/embed\/)([a-zA-Z0-9_-]{11})/
        );
        const videoId = match?.[1] || "";
        return (
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              borderRadius: "8px",
              margin: "1rem 0",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video"
            />
          </div>
        );
      }
      return (
        <div style={{ margin: "1rem 0" }}>
          <video
            src={p.url}
            controls
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
      );
    }

    case "table": {
      const headers = Array.isArray(p.headers) ? p.headers : [];
      const rows = Array.isArray(p.rows) ? p.rows : [];
      if (!headers.length) return null;
      return (
        <div style={{ margin: "1.5rem 0", overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
              border: `1px solid ${p.borderColor || "#e5e7eb"}`,
            }}
          >
            <thead>
              <tr
                style={{
                  background: p.headerColor || "#1B2A4A",
                  color: "#fff",
                }}
              >
                {headers.map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontWeight: 600,
                      border: `1px solid ${p.borderColor || "#e5e7eb"}`,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  style={{
                    background:
                      p.striped && ri % 2 === 1 ? "#f9fafb" : "#fff",
                  }}
                >
                  {headers.map((_, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: "0.6rem 1rem",
                        border: `1px solid ${p.borderColor || "#e5e7eb"}`,
                      }}
                    >
                      {row[ci] ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    default:
      return null;
  }
};

const FaqItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        marginBottom: "0.5rem",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.25rem",
          background: open ? "#f0f4ff" : "#fff",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "#1B2A4A",
        }}
      >
        <span>{item.question || "Question?"}</span>
        <span
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            fontSize: "1.2rem",
          }}
        >
          ▾
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: "1rem 1.25rem",
            fontSize: "0.9rem",
            color: "#555",
            lineHeight: 1.7,
            borderTop: "1px solid #e5e7eb",
          }}
        >
          {item.answer || ""}
        </div>
      )}
    </div>
  );
};

const AccordionItem = ({ item, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        marginBottom: "0.5rem",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.85rem 1.25rem",
          background: open ? "#f9fafb" : "#fff",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "#1B2A4A",
        }}
      >
        <span>{item.title || "Section"}</span>
        <span
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            fontSize: "1.2rem",
          }}
        >
          ▾
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: "1rem 1.25rem",
            fontSize: "0.9rem",
            color: "#555",
            lineHeight: 1.7,
            borderTop: "1px solid #e5e7eb",
          }}
        >
          {item.content || ""}
        </div>
      )}
    </div>
  );
};

const TabsBlock = ({ items }) => {
  const [active, setActive] = useState(0);
  if (!items.length) return null;

  return (
    <div style={{ margin: "1.5rem 0" }}>
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #e5e7eb",
          gap: "0",
          overflowX: "auto",
        }}
      >
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "0.75rem 1.5rem",
              border: "none",
              borderBottom: i === active ? "3px solid #1B2A4A" : "3px solid transparent",
              background: "transparent",
              cursor: "pointer",
              fontWeight: i === active ? 600 : 400,
              color: i === active ? "#1B2A4A" : "#666",
              fontSize: "0.9rem",
              whiteSpace: "nowrap",
              marginBottom: "-2px",
            }}
          >
            {item.label || `Tab ${i + 1}`}
          </button>
        ))}
      </div>
      <div
        style={{
          padding: "1.25rem 0.5rem",
          fontSize: "0.95rem",
          color: "#444",
          lineHeight: 1.7,
        }}
      >
        {items[active]?.content || ""}
      </div>
    </div>
  );
};

function VisualPageBuilder({ data }) {
  const blocks = data?.blocks || [];

  if (!blocks.length) return null;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 1rem",
      }}
    >
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}

export default VisualPageBuilder;
