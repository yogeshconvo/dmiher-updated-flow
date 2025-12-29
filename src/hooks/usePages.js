import { useQuery } from "@tanstack/react-query";

const API_URL = "https://json-new-sever.onrender.com/page-data";

const fetchPages = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("API error");
    return res.json();
};

export const usePages = () =>
    useQuery({
        queryKey: ["pages"],
        queryFn: fetchPages,

        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,

        refetchOnMount: "always",
        refetchOnWindowFocus: true,

        retry: 1,
    });
