import { useQuery } from "@tanstack/react-query";

const fetchSubpage = async ({ queryKey }) => {
    const [, slug] = queryKey;

    const res = await fetch(
        `https://demos.convomax.com/dmiher_backend/api/pages/${slug}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch subpage");
    }

    return res.json();
};

export const useSubpage = (slug) =>
    useQuery({
        queryKey: ["subpage", slug],
        queryFn: fetchSubpage,
        enabled: !!slug,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });