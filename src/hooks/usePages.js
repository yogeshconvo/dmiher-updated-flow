import { useQuery } from "@tanstack/react-query";

const fetchPages = async (slug) => {
    const finalSlug = slug || "home";

    const res = await fetch(
        `http://127.0.0.1:8000/api/pages/${finalSlug}`
    );

    if (!res.ok) throw new Error("API error");
    return res.json();
};

// 🔥 Query factory (used by server)
export const pagesQuery = (slug) => ({
    queryKey: ["pages", slug || "home"],
    queryFn: () => fetchPages(slug),
    staleTime: 5 * 60 * 1000,
});

// 🔥 Client hook
export const usePages = (slug) =>
    useQuery({
        ...pagesQuery(slug),
        cacheTime: 30 * 60 * 1000,
        retry: 1,
    });
