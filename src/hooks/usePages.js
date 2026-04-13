import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

const fetchPages = async (slug) => {
  const finalSlug = slug || "home";
  const { data } = await api.get(`/pages/${finalSlug}`);
  return data;
};

export const usePages = (slug) =>
  useQuery({
    queryKey: ["pages", slug || "home"],
    queryFn: () => fetchPages(slug),
  });
