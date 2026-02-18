const BASE_URL = "https://convomax.com/admin_dmiher/storage/";

export const getImageSrc = (img) => {
  if (!img) return "";

  if (Array.isArray(img)) {
    return BASE_URL + img[0];
  }
  return BASE_URL + img;
};
