import { API_BASE } from "../../config/api";

const BASE_URL = `${API_BASE}/storage/`;

export const getImageSrc = (img) => {
  if (!img) return "";

  if (Array.isArray(img)) {
    return BASE_URL + img[0];
  }
  return BASE_URL + img;
};
