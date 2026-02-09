import { useQuery } from "@tanstack/react-query";

const fetchMicropage = async ({ pageSlug, microSlug }) => {
    const res = await fetch(
        `http://127.0.0.1:8000/api/pages/${pageSlug}/micro-pages/${microSlug}`
    );

    if (!res.ok) throw new Error("Micropage not found");
    return res.json();
};

export const micropageQuery = (pageSlug, microSlug) => ({
    queryKey: ["micropage", pageSlug, microSlug],
    queryFn: () => fetchMicropage({ pageSlug, microSlug }),
    staleTime: 5 * 60 * 1000,
});

export const useMicropage = (pageSlug, microSlug) =>
    useQuery({
        ...micropageQuery(pageSlug, microSlug),
        enabled: !!pageSlug && !!microSlug,
    });
