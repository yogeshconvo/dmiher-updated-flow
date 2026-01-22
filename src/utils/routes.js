export const ROUTES = {
    page: (pageSlug) => `/${pageSlug}`,

    microPage: (pageSlug, microSlug) =>
        `/${pageSlug}/micro-pages/${microSlug}`,
};
