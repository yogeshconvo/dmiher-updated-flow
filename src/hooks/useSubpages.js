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

// Nested page — dependent on its parent micro page, so it resolves only via
// the full /{college}/{micro-page}/{nested-page} chain
// (GET /api/micropage/{college}/{page}/{nested}).
const fetchNested = async (college, page, nested) => {
  const { data } = await api.get(`/micropage/${college}/${page}/${nested}`);
  return data;
};

export const useNestedPage = (college, page, nested) =>
  useQuery({
    queryKey: ["nested", college, page, nested],
    queryFn: () => fetchNested(college, page, nested),
    enabled: !!college && !!page && !!nested,
  });
