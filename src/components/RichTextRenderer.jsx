import parse from "html-react-parser";
import DOMPurify from "dompurify";
import clsx from "clsx";

// Only create a DOMPurify instance when window is defined
const createDOMPurify = () => {
  if (typeof window !== "undefined") {
    return DOMPurify;
  }
  return { sanitize: (html) => html }; // fallback for SSR (no-op)
};

export default function RichTextRenderer({ html, className }) {
  if (!html) return null;

  const purify = createDOMPurify();
  const clean = purify.sanitize(html);
  const content = parse(clean);

  return <div className={clsx("prose max-w-none", className)}>{content}</div>;
}
