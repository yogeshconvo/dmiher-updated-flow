import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:3000/subpages";

const fetchSubpages = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("API error");
    return res.json();
};

// 🔥 query factory (for SSR prefetch)
export const subpagesQuery = () => ({
    queryKey: ["subpages"],
    queryFn: fetchSubpages,
    staleTime: 5 * 60 * 1000,
});

export const useSubpages = () =>
    useQuery({
        ...subpagesQuery(),

        // ✅ SSR-safe options
        cacheTime: 30 * 60 * 1000,
        retry: 1,
    });
