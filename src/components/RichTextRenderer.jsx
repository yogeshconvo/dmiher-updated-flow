import parse from "html-react-parser";
import DOMPurify from "dompurify";
import clsx from "clsx";

const createDOMPurify = () => {
  if (typeof window !== "undefined") {
    return DOMPurify;
  }
  // SSR fallback: strip all HTML tags to prevent XSS in pre-rendered pages
  return { sanitize: (html) => String(html).replace(/<[^>]*>/g, "") };
};

export default function RichTextRenderer({
  html,
  className,
  bgColor,
  textcolor,
}) {
  if (!html) return null;

  const purify = createDOMPurify();
  const clean = purify.sanitize(html);
  const content = parse(clean);

  return (
    <div
      className={clsx("prose max-w-none", className)}
      style={{
        ...(bgColor && { backgroundColor: bgColor }),
        ...(textcolor && { color: textcolor }),
      }}
    >
      {content}
    </div>
  );
}