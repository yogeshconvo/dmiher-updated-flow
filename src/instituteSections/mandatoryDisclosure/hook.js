import { useQuery } from "@tanstack/react-query";
import api from "../../config/api";
import { mapMandatoryDisclosureData } from "./mapper";

// /**
//  * Fetch the college-scoped Mandatory Disclosure payload.
//  *
//  * Endpoints:
//  *   L1 : `{API_BASE}/api/{college}/mandatory-disclosure`
//  *   L2 : `{API_BASE}/api/{college}/mandatory-disclosure/{cardSlug}`
//  *   L3 : `{API_BASE}/api/{college}/mandatory-disclosure/{cardSlug}/{nestedSlug}`
//  *
//  * @param {string} college     Institute slug (e.g. "jnmc").
//  * @param {string} [nestedPage] Optional L2 card slug (e.g. "letter-of-permission-recognition").
//  * @param {string} [nestedSlug] Optional L3 nested slug (e.g. "radiology" / "nst").
//  */
const fetchMandatoryDisclosure = async (college, nestedPage, nestedSlug) => {
  let path = `/${college}/mandatory-disclosure`;
  if (nestedPage) path += `/${nestedPage}`;
  if (nestedPage && nestedSlug) path += `/${nestedSlug}`;
  const { data } = await api.get(path);
  return data;
};

// /**
//  * React Query hook for a college's Mandatory Disclosures page
//  * (L1 root, L2 card-dependent micro page, or L3 nested page).
//  *
//  * @param {string} college
//  * @param {string} [nestedPage]
//  * @param {string} [nestedSlug]
//  * @returns {import("@tanstack/react-query").UseQueryResult<
//  *   { title: string, layout: "simple_cards"|"tab_cards", items: Array, tabs?: Array }
//  * >}
//  */
export const useMandatoryDisclosure = (college, nestedPage, nestedSlug) =>
  useQuery({
    queryKey: [
      "mandatory-disclosure",
      college,
      nestedPage || "",
      nestedSlug || "",
    ],
    queryFn: () => fetchMandatoryDisclosure(college, nestedPage, nestedSlug),
    enabled: !!college,
    select: (raw) =>
      mapMandatoryDisclosureData(raw, {
        college,
        parentSlug: nestedPage || "",
      }),
  });

export default useMandatoryDisclosure;
