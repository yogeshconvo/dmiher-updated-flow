import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../config/api";

const fetchPages = async (slug) => {
  const finalSlug = slug || "home";
  const res = await fetch(`${API_BASE}/api/pages/${finalSlug}`);
  if (!res.ok) throw new Error("API error");
  return res.json();
};

export const usePages = (slug) =>
  useQuery({
    queryKey: ["pages", slug || "home"],
    queryFn: () => fetchPages(slug),
  });
