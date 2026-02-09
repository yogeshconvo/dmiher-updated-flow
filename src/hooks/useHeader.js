import { useQuery } from "@tanstack/react-query";

const API_BASE = "http://127.0.0.1:8000";

/* ================= HEADER FETCH ================= */
const fetchHeader = async () => {
    const res = await fetch(`${API_BASE}/api/menus/Header`);
    if (!res.ok) throw new Error("Header API error");

    const json = await res.json();
    const menu = json?.menu || [];

    return {
        mainMenu: menu.filter(i => i.position === "Main"),
        topLinks: menu.filter(i => i.position === "Top"),
        logo: menu.find(i => i.position === "Logo") || null,
    };
};

/* ================= FOOTER FETCH ================= */
const fetchFooter = async () => {
    const res = await fetch(`${API_BASE}/api/menus/Footer`);
    if (!res.ok) throw new Error("Footer API error");

    const json = await res.json();
    const data = json?.data || {};

    const col1 = data.Footer?.COL1 || {};
    const col3 = data.Footer?.COL3 || {};

    return {
        logo: col1.items?.[0]?.image || null,
        address: col1.items?.[0]?.description?.split("\n") || [],
        contactTitle: col1.contact?.title || "",
        contactValue: col1.contact?.items?.[0]?.description || "",
        emailTitle: col1.email?.title || "",
        emailValue:
            col1.email?.items?.find(i => i.description)?.description || "",
        socials:
            col1.email?.items?.filter(i => i.icon && i.slug) || [],

        programs: data.Footer?.COL2?.programs || {},
        terms: data.Footer?.COL2?.["T&C"] || {},
        colleges: col3.college || {},
        otherLinks: col3.items || [],
        importantLinks: data.Footer?.COL4?.important_links || {},

        copyright:
            data.Bottom?.Bottom?.items?.[0]?.description || "",
    };
};

/* ================= QUERY FACTORIES (SSR) ================= */
export const headerQuery = () => ({
    queryKey: ["header"],
    queryFn: fetchHeader,
    staleTime: 10 * 60 * 1000,
});

export const footerQuery = () => ({
    queryKey: ["footer"],
    queryFn: fetchFooter,
    staleTime: 10 * 60 * 1000,
});

/* ================= COMBINED HOOK ================= */
export const useHeader = () => {
    const header = useQuery(headerQuery());
    const footer = useQuery(footerQuery());

    return {
        header: header.data,
        footer: footer.data,

        isLoading: header.isLoading || footer.isLoading,
        isError: header.isError || footer.isError,
    };
};
