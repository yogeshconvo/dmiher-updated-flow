const BASE_URL = "http://127.0.0.1:8000/storage/";

export const getImageSrc = (img) => {
  if (!img) return "";

  if (Array.isArray(img)) {
    return BASE_URL + img[0];
  }
  return BASE_URL + img;
};
