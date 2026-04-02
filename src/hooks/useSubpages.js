import { useQuery } from "@tanstack/react-query";

const fetchSubpage = async ({ queryKey }) => {
    const [, slug, page] = queryKey;

    const res = await fetch(
        // `http://127.0.0.1:8000/api/pages/${slug}`
        `http://127.0.0.1:8000/api/micropage/${pageslug}/${ctake}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch subpage");
    }

    return res.json();
};

export const useSubpage = (slug, page) =>
    useQuery({
        queryKey: ["subpage", slug, page],
        queryFn: () => fetchSubpage({ queryKey: ["subpage", slug, page] }),
        enabled: !!slug && !!page,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });