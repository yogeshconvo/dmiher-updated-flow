import React from "react";
import MainMicropage from "../../Micropages/Main-micropage";

/**
 * MICROPAGE TAB — independent content blocks.
 *
 * Mirrors the same content-flow + repeater shape as the `micro_page`
 * section. The tab JSON looks like:
 *   {
 *     tab_name: "...",
 *     tab_type: "micropage",
 *     block: [
 *       { tab_type: "title", heading: "..." },
 *       { tab_type: "paragraph", desc: "<p>...</p>" },
 *       { tab_type: "dean", dean: [...] },
 *       { tab_type: "table", excel: [...] },
 *       { tab_type: "team",  management_team: [...] },
 *       { tab_type: "slider", slider: [...] },
 *     ]
 *   }
 *
 * No fetch, no relational link — just hand `{ block }` to the same
 * MainMicropage renderer the real micropages use.
 */
export default function MicropageView({ tab }) {
  const blocks = Array.isArray(tab?.block) ? tab.block : [];

  if (blocks.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        No content blocks added yet.
      </div>
    );
  }

  // API image shape: { tab_type:"image", image:[{ image:[{ image:"path" },...] }] }
  // Flatten to individual { tab_type:"image", image:"path" } items MainMicropage can render.
  const normalizedBlocks = blocks.flatMap((item) => {
    if (item.tab_type === "image" && Array.isArray(item.image)) {
      const imgs = item.image.flatMap((group) =>
        Array.isArray(group.image) ? group.image : [group]
      );
      return imgs.map((img) => ({ ...item, image: img.image }));
    }
    return [item];
  });

  return <MainMicropage data={{ block: normalizedBlocks }} />;
}
