import React, { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";

/**
 * SafeImage — drop-in replacement for <img> that renders a
 * "No image available" placeholder when the src is missing or fails to load.
 *
 * Use it everywhere EXCEPT hero banners and grid backgrounds.
 *
 * Props:
 *   src          — image URL (falsy → placeholder)
 *   alt          — alt text (defaults to "")
 *   className    — applied to both <img> and the placeholder wrapper
 *   wrapperStyle — optional inline style for placeholder wrapper
 *   ...rest      — forwarded to <img>
 */
function SafeImage({
  src,
  alt = "",
  className = "",
  wrapperStyle,
  onClick,
  style,
  ...rest
}) {
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [src]);

  const isMissing = !src || typeof src !== "string" || !src.trim() || errored;

  if (isMissing) {
    return (
      <div
        className={`safe-image-fallback ${className}`}
        style={{ ...wrapperStyle, ...style }}
        role="img"
        aria-label={alt || "No image available"}
        onClick={onClick}
      >
        <ImageOff className="safe-image-fallback-icon" />
        <span className="safe-image-fallback-text">No image available</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onClick={onClick}
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}

export default SafeImage;
