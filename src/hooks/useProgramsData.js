import { useState, useEffect, useMemo } from "react";
import { normalizeProgramsData } from "../utils/programs";
import { API_BASE } from "../config/api";

/**
 * useProgramsData — Fetches ALL programs ONCE from:
 *
 *   GET /api/programs/page/{slug}
 *
 * Category filtering is done on the FRONTEND only.
 * No API call on tab/category change.
 *
 * @param {string|null} slug - College/page slug (e.g. "jnmc")
 */
export function useProgramsData(slug) {
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `${API_BASE}/api/programs/page/${encodeURIComponent(slug)}`;
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) throw new Error(`API Error (${res.status})`);

        const json = await res.json();

        if (!json?.data) throw new Error("Empty or invalid response");

        setRawData(json);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("useProgramsData →", err);
        setError("Failed to load programs");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [slug]);

  const normalized = useMemo(
    () => normalizeProgramsData(rawData),
    [rawData]
  );

  return {
    institutes: normalized.institutes,
    programs: normalized.programs,
    categories: normalized.categories,
    settings: normalized.settings,
    loading,
    error,
  };
}
