
import { useQuery } from "@tanstack/react-query";

const fetchMicropage = async (slug) => {
    console.log("MICRO SLUG:", slug);

    const res = await fetch(
        `https://demos.convomax.com/dmiher_backend/api/independent-pages/${slug}`
    );

    if (!res.ok) {
        throw new Error("Micropage not found");
    }

    const data = await res.json();
    console.log("MICRO DATA:", data);

    return data;
};

export const useMicropage = (slug) =>
    useQuery({
        queryKey: ["micropage", slug],
        queryFn: () => fetchMicropage(slug),
        enabled: !!slug,
    });

