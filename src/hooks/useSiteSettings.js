import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

/**
 * Fetches site-wide settings (favicon, …) once per session and swaps the
 * <link rel="icon"> tag in the document head when the favicon URL changes.
 *
 * Settings are dashboard-managed via /super-admin/settings/site on the
 * backend. The endpoint is application-cached server-side for 5 minutes,
 * and React Query caches it for the SPA's lifetime.
 */
const fetchSiteSettings = async () => {
  const { data } = await api.get("/site/settings");
  return data;
};

export default function useSiteSettings() {
  const { data } = useQuery({
    queryKey: ["site-settings"],
    queryFn: fetchSiteSettings,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const faviconUrl = data?.favicon_url || null;

  useEffect(() => {
    if (typeof document === "undefined" || !faviconUrl) return;

    // Find an existing rel=icon link (any variant — "icon", "shortcut icon",
    // "apple-touch-icon" — get replaced so the swap is consistent across
    // browsers). If none exist we create a fresh one.
    const links = Array.from(
      document.querySelectorAll("link[rel~='icon']")
    );

    if (links.length === 0) {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = faviconUrl;
      document.head.appendChild(link);
      return;
    }

    for (const link of links) {
      link.setAttribute("href", faviconUrl);
      // Clear any restrictive type so the browser sniffs from the new file
      // (don't lock png/svg from a previous favicon onto a new ico).
      link.removeAttribute("type");
    }
  }, [faviconUrl]);

  return data;
}
