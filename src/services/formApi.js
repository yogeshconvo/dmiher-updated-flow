import api from "../config/api";

/**
 * Standalone Forms module client. Deliberately separate from the micropage
 * hooks/services so form traffic never shares an endpoint or React Query cache
 * namespace with CMS page content.
 *
 * Endpoints (Laravel FormApiController):
 *   GET  /api/forms/{slug}          → public form definition (no recipient emails)
 *   POST /api/forms/{slug}/submit   → { values, _hp } ; returns { success, message }
 */
export const getForm = async (slug) => {
  const { data } = await api.get(`/forms/${slug}`);
  return data;
};

export const submitForm = async (slug, values, _hp = "") => {
  // If any field holds a File, send multipart/form-data (files[key]); otherwise
  // a plain JSON body. axios sets the multipart boundary automatically.
  const hasFile = Object.values(values || {}).some(
    (v) => typeof File !== "undefined" && v instanceof File
  );

  if (hasFile) {
    const fd = new FormData();
    fd.append("_hp", _hp ?? "");
    Object.entries(values).forEach(([k, v]) => {
      if (v instanceof File) {
        fd.append(`files[${k}]`, v);
      } else if (Array.isArray(v)) {
        v.forEach((item) => fd.append(`values[${k}][]`, item));
      } else if (v !== undefined && v !== null) {
        fd.append(`values[${k}]`, v);
      }
    });
    const { data } = await api.post(`/forms/${slug}/submit`, fd);
    return data;
  }

  const { data } = await api.post(`/forms/${slug}/submit`, { values, _hp });
  return data;
};
