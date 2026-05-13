// Thin wrapper around the central resolver. The image upload pipeline
// in the backend was moved from storage/app/public to <project_root>/assets,
// so the URL prefix isn't fixed at "/storage/" anymore — resolveImage()
// handles both shapes (and absolute / stale-localhost cases too).
import resolveImage from "../../utils/resolveImage";

export const getImageSrc = (img) => {
  if (!img) return "";
  // Repeatable fields are sometimes stored as a single-element array.
  if (Array.isArray(img)) return resolveImage(img[0]);
  return resolveImage(img);
};
