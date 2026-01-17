import parse from "html-react-parser";
import DOMPurify from "dompurify";
import clsx from "clsx";

const createDOMPurify = () => {
  if (typeof window !== "undefined") {
    return DOMPurify;
  }
  return { sanitize: (html) => html }; 
};

export default function RichTextRenderer({ html, className }) {
  if (!html) return null;

  const purify = createDOMPurify();
  const clean = purify.sanitize(html);
  const content = parse(clean);

  return <div className={clsx("prose max-w-none", className)}>{content}</div>;
}
