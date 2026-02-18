import { useQuery } from "@tanstack/react-query";

const fetchPages = async (slug) => {
    const finalSlug = slug || "home"; // ✅ default home

    const res = await fetch(
        `https://convomax.com/admin_dmiher/api/pages/${finalSlug}`
    );

    if (!res.ok) throw new Error("API error");

    return res.json();
};

export const usePages = (slug) =>
    useQuery({
        queryKey: ["pages", slug || "home"],
        queryFn: () => fetchPages(slug),

        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,

        refetchOnWindowFocus: true,
        retry: 1,
    });
