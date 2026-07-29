import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

/**
 * Generic rich-text section. Used to drop CMS-authored extra content
 * onto any page. Driven by section_id: "text_editor".
 *
 * Expected payload (matches the API):
 * {
 *   header: [
 *     { heading: string, desc: string (HTML) }
 *   ]
 * }
 *
 * Also tolerates a flat shape: { heading, desc } at the top level.
 */
function TextEditor({ data }) {
  if (!data) return null;

  const blocks = Array.isArray(data.header)
    ? data.header
    : data.header
    ? [data.header]
    : data.heading || data.desc
    ? [{ heading: data.heading, desc: data.desc }]
    : [];

  if (!blocks.length) return null;

  // CMS-managed section background (data.section_style.bg_color) — painted on
  // the full-width section so the color bleeds edge to edge while the text
  // stays inside the container.
  const bgColor = data.section_style?.bg_color || data.bg_color || null;

  return (
    <section style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <div className="container py-10">
        {blocks.map((block, i) => {
          if (!block?.heading && !block?.desc) return null;
          return (
            <div key={i} className={i > 0 ? "mt-10" : ""}>
              {block.heading && (
                <h2 className="heading">
                  <hr className="heading-line" />
                  {block.heading}
                </h2>
              )}
              {block.desc && <RichTextRenderer html={block.desc} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TextEditor;
