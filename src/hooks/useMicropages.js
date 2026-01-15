import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:3000/micropages";

const fetchPages = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("API error");
    return res.json();

};

export const useMicropages = () =>
    useQuery({
        queryKey: ["micropages"],
        queryFn: fetchPages,
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        retry: 1,
    });
