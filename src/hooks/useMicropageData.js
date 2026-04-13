import { useState, useEffect, useRef } from "react";
import api from "../config/api";

/**
 * useMicropageData — Reusable hook for fetching micropage data.
 *
 * API: GET /api/micropage/{pageSlug}/{ctaKey}
 *
 * @param {string|null} pageSlug  - College/page slug  (e.g. "jnmc")
 * @param {string|null} ctaKey    - CTA key / subpage   (e.g. "deanKnowMore", "transcript")
 * @param {object|null} propData  - Pre-fetched data passed as prop (skips fetch when present)
 *
 * @returns {{ rawData, sections, loading, error }}
 */
export function useMicropageData(pageSlug, ctaKey, propData = null) {
  const [rawData, setRawData] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(!propData);
  const [error, setError] = useState("");

  const prevPropData = useRef(propData);

  // CASE 1: Data passed via props (rendered through PageView)
  useEffect(() => {
    if (!propData) return;
    if (prevPropData.current === propData && rawData) return;
    prevPropData.current = propData;

    setRawData(propData);
    setSections([{ data: propData }]);
    setLoading(false);
    setError("");
  }, [propData]);

  // CASE 2: Self-fetch from API (rendered via direct route)
  useEffect(() => {
    if (propData) return;
    if (!pageSlug || !ctaKey) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/micropage/${pageSlug}/${ctaKey}`, {
          signal: controller.signal,
        });

        const json = res.data;

        if (!json?.sections?.length) {
          throw new Error("Empty response");
        }

        setRawData(json);
        setSections(json.sections);
      } catch (err) {
        if (err.name === "AbortError" || err.name === "CanceledError") return;
        console.error("useMicropageData →", err);
        setError("Failed to load data");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [pageSlug, ctaKey, propData]);

  return { rawData, sections, loading, error };
}
