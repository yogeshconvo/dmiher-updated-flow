import axios from "axios";

/**
 * Centralized API configuration.
 * Uses environment variable in production, falls back to localhost in dev.
 */
export const API_BASE =
  import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    "X-API-KEY": import.meta.env.VITE_API_KEY,
    Accept: "application/json",
  },
});

export default api;
