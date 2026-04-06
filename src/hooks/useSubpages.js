import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../config/api";

const fetchSubpage = async (slug, page) => {
  const res = await fetch(`${API_BASE}/api/micropage/${slug}/${page}`);
  if (!res.ok) throw new Error("Failed to fetch subpage");
  return res.json();
};

export const useSubpage = (slug, page) =>
  useQuery({
    queryKey: ["subpage", slug, page],
    queryFn: () => fetchSubpage(slug, page),
    enabled: !!slug && !!page,
  });
