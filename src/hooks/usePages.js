import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

const fetchPages = async (slug) => {
  const finalSlug = slug || "home";
  const { data } = await api.get(`/pages/${finalSlug}`);
  return data;
};

// `slug === null` means the caller is on a micropage/nested route and does NOT
// want the home page — so keep the query disabled instead of silently fetching
// "home" in the background (which caused the home page to flash during nav).
export const usePages = (slug) =>
  useQuery({
    queryKey: ["pages", slug || "home"],
    queryFn: () => fetchPages(slug),
    enabled: slug != null,
  });
