import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import api from "../config/api";

/**
 * Fetches /api/programs/{slug} and normalizes the nested
 * `data.data.programs_subpage` payload.
 *
 * Kept separate from `useProgramsData` so existing callers are untouched.
 */
const fetchMedicinePrograms = async (slug) => {
  const { data } = await api.get(`/programs/${slug}`);
  return data;
};

export const useMedicineProgramsData = (slug) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["medicine-programs", slug],
    queryFn: () => fetchMedicinePrograms(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  const normalized = useMemo(() => {
    const subpage = data?.data?.data?.programs_subpage || {};
    return {
      institutes: Array.isArray(subpage.institutes) ? subpage.institutes : [],
      settings: subpage.settings || {},
    };
  }, [data]);

  return {
    institutes: normalized.institutes,
    settings: normalized.settings,
    loading: isLoading,
    error: error ? error.message || "Failed to load programs" : null,
  };
};

export default useMedicineProgramsData;
