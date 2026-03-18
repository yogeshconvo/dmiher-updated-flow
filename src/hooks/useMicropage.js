
import { useQuery } from "@tanstack/react-query";

const fetchMicropage = async (pageSlug, microSlug) => {
    const res = await fetch(
        `https://demos.convomax.com/dmiher_backend/${pageSlug}/micro-pages/${microSlug}`
    );


    if (!res.ok) throw new Error("Micropage not found");
    return res.json();
};

export const useMicropage = (pageSlug, microSlug) =>
    useQuery({
        queryKey: ["micropage", pageSlug, microSlug],
        queryFn: () => fetchMicropage(pageSlug, microSlug),
        enabled: !!pageSlug && !!microSlug,
        staleTime: 5 * 60 * 1000,
    });
