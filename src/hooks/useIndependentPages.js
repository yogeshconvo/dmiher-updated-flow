import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

const fetchIndependentPage = async (slug) => {
  const { data } = await api.get(`/independent-pages/${slug}`);
  return data;
};

export const useIndependentPages = (slug) =>
  useQuery({
    queryKey: ["independent-pages", slug],
    queryFn: () => fetchIndependentPage(slug),
    enabled: !!slug,
  });
