import { lazy } from "react";

const MuseumColleges = lazy(() => import("./MuseumColleges"));
const MuseumKeyOfficials = lazy(() => import("./MuseumKeyOfficials"));
const MuseumFAQs = lazy(() => import("./MuseumFAQs"));

export const SECTION_COMPONENTS = {
    museum_colleges:       MuseumColleges,
    museum_key_officials:  MuseumKeyOfficials,
    museum_faqs:           MuseumFAQs,
}
