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
  const { data } = await api.post(`/forms/${slug}/submit`, { values, _hp });
  return data;
};
