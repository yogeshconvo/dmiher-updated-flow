import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../config/api";

const fetchIndependentPage = async (slug) => {
  const res = await fetch(`${API_BASE}/api/independent-pages/${slug}`);
  if (!res.ok) throw new Error("Page not found");
  return res.json();
};

export const useIndependentPages = (slug) =>
  useQuery({
    queryKey: ["independent-pages", slug],
    queryFn: () => fetchIndependentPage(slug),
    enabled: !!slug,
  });
