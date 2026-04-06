import * as LucideIcons from "lucide-react";
import { createElement } from "react";

/**
 * Renders a Lucide icon by kebab-case name (e.g. "graduation-cap" → GraduationCap).
 *
 * @param {string} iconName - kebab-case icon name
 * @param {number} size - icon size in px
 * @param {string} className - optional CSS class
 * @returns {React.ReactElement|null}
 */
export function renderIcon(iconName, size = 18, className = "") {
  if (!iconName) return null;

  const formatted = iconName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  const Icon = LucideIcons[formatted];
  if (!Icon) return null;

  return createElement(Icon, { size, className });
}
