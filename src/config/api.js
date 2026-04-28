import axios from "axios";
import {
  getTokenAsync,
  refreshToken,
  invalidateToken,
} from "../utils/auth";

export const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use(async (config) => {
  if (config.url === "/auth/token") return config;

  const token = await getTokenAsync();
  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (response?.status === 401 && config && !config.__isRetry) {
      invalidateToken();
      try {
        const newToken = await refreshToken();
        config.__isRetry = true;
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${newToken}`;
        return api(config);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }

    if (response?.status >= 500) {
      console.error("[api] server error", response.status, config?.url);
    }

    return Promise.reject(error);
  }
);

export default api;
