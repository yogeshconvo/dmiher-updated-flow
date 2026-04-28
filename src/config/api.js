import axios from "axios";
import { getAuthToken, clearAuthToken } from "./auth";

/**
 * Centralized API client.
 *
 * Auth precedence (per request):
 *   1. Bearer token from auth.js (static token OR logged-in session)
 *   2. X-API-KEY header (legacy fallback) if VITE_API_KEY is set
 *   3. No auth header — endpoint must be public
 *
 * On a 401 (Mode B / auto-login only), we drop the cached token and
 * retry the request once.
 */

export const API_BASE = import.meta.env.VITE_API_BASE;
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    Accept: "application/json",
    ...(API_KEY ? { "X-API-KEY": API_KEY } : {}),
  },
});

/* ================= REQUEST: attach Bearer (if any) ================= */
api.interceptors.request.use(async (config) => {
  // Don't authenticate the login call itself.
  if (config.url?.includes("/auth/login")) return config;

  try {
    const token = await getAuthToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    // Login failed — let the request go and surface the resulting 401.
    console.error("Auth token fetch failed:", err);
  }

  return config;
});

/* ================= RESPONSE: retry once on 401 ================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    if (status === 401 && original && !original._retried) {
      original._retried = true;
      clearAuthToken();
      try {
        const token = await getAuthToken();
        if (token) {
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${token}`;
        }
        return api(original);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
