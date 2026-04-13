import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

const fetchSubpage = async (slug, page) => {
  const { data } = await api.get(`/micropage/${slug}/${page}`);
  return data;
};

export const useSubpage = (slug, page) =>
  useQuery({
    queryKey: ["subpage", slug, page],
    queryFn: () => fetchSubpage(slug, page),
    enabled: !!slug && !!page,
  });
