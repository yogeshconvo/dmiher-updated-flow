import React, { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";
import resolveImage from "../utils/resolveImage";

/**
 * SafeImage — drop-in replacement for <img> that renders a
 * "No image available" placeholder when the src is missing or fails to load.
 *
 * Also normalises the src through resolveImage() so callers can pass
 * any shape the backend returns (absolute URL, "assets/..." path,
 * legacy "storage/..." path, or a stale localhost reference) without
 * having to wrap every call site themselves. Absolute URLs and data:
 * URIs are passed through unchanged.
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

  // Resolve once per src change. resolveImage() returns "" for falsy or
  // non-string inputs so the placeholder branch below handles them.
  const resolvedSrc =
    typeof src === "string" && src.trim() ? resolveImage(src) : "";

  useEffect(() => {
    setErrored(false);
  }, [resolvedSrc]);

  const isMissing = !resolvedSrc || errored;

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
      src={resolvedSrc}
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
