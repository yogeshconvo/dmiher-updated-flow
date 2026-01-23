// import { useQuery } from "@tanstack/react-query";

// const API_URL = "http://localhost:3000/micropages";

// const fetchPages = async () => {
//     const res = await fetch(API_URL);
//     if (!res.ok) throw new Error("API error");
//     return res.json();

// };

// export const useMicropages = () =>
//     useQuery({
//         queryKey: ["micropages"],
//         queryFn: fetchPages,
//         staleTime: 5 * 60 * 1000,
//         cacheTime: 30 * 60 * 1000,
//         refetchOnMount: "always",
//         refetchOnWindowFocus: true,
//         retry: 1,
//     });
import { useQuery } from "@tanstack/react-query";

const fetchMicropage = async (pageSlug, microSlug) => {
    const res = await fetch(
        `http://127.0.0.1:8000/api/pages/${pageSlug}/micro-pages/${microSlug}`
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
