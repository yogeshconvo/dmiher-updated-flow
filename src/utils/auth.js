import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const REFRESH_INTERVAL_MS = 50 * 1000;

const tokenClient = axios.create({
  baseURL: API_BASE,
  headers: { Accept: "application/json" },
});

let currentToken = null;
let inFlight = null;
let refreshTimer = null;

async function fetchTokenFromServer() {
  const { data } = await tokenClient.get("/api/auth/token");
  if (!data?.token) throw new Error("Token missing in /auth/token response");
  return data.token;
}

export async function fetchToken() {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      currentToken = await fetchTokenFromServer();
      return currentToken;
    } catch (e) {
      console.error("Token error:", e);
      throw e;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}

export const refreshToken = fetchToken;

export function getToken() {
  return currentToken;
}

export async function getTokenAsync() {
  if (currentToken) return currentToken;
  return fetchToken();
}

export function invalidateToken() {
  currentToken = null;
}

export function startTokenAutoRefresh() {
  if (refreshTimer) return;

  fetchToken().catch(() => {});

  refreshTimer = setInterval(() => {
    fetchToken().catch(() => {});
  }, REFRESH_INTERVAL_MS);
}

export function stopTokenAutoRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
}
