import { useQuery } from "@tanstack/react-query";

const API_URL = "http://127.0.0.1:8000/api/home-notices";

/* ================= FETCH ================= */
const fetchHomeNotices = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Home notices fetch failed");
    return res.json();
};

/* ================= QUERY ================= */
export const homeNoticesQuery = () => ({
    queryKey: ["home-notices"],
    queryFn: fetchHomeNotices,
    staleTime: 10 * 60 * 1000,
});

/* ================= COMBINED HOOK ================= */
export const useHomeNotices = () => {
    const query = useQuery(homeNoticesQuery());

    const bulletinSection = query.data?.find(
        item => item.section_id === "home_BULLETIN_section"
    );

    const announcementSection = query.data?.find(
        item => item.section_id === "home_ANNOUNCEMENTS_section"
    );

    return {
        bulletin: bulletinSection?.data || null,
        announcements: announcementSection?.data || null,

        isLoading: query.isLoading,
        isError: query.isError,
    };
};
