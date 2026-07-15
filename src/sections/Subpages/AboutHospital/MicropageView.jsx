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

  // Pass image blocks through as-is: MainMicropage's ImageBlock already flattens
  // the nested image shape and lays multiple images out (1 centered / 2 side by
  // side / 3+ slider). Flattening here split them into full-width stacked images.
  return <MainMicropage data={{ block: blocks }} />;
}
