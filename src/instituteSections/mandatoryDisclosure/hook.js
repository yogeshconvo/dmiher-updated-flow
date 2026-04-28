import { useQuery } from "@tanstack/react-query";
import api from "../../config/api";
import { mapMandatoryDisclosureData } from "./mapper";

// /**
//  * Fetch the college-scoped Mandatory Disclosure payload.
//  *
//  * Endpoints:
//  *   parent : `{API_BASE}/api/{college}/mandatory-disclosure`
//  *   nested : `{API_BASE}/api/{college}/mandatory-disclosure/{nestedPage}`
//  *
//  * @param {string} college    Institute slug (e.g. "jnmc").
//  * @param {string} [nestedPage] Optional nested page slug (e.g. "letter-of-permission-recognition").
//  */
const fetchMandatoryDisclosure = async (college, nestedPage) => {
  const path = nestedPage
    ? `/${college}/mandatory-disclosure/${nestedPage}`
    : `/${college}/mandatory-disclosure`;
  const { data } = await api.get(path);
  return data;
};

// /**
//  * React Query hook for a college's Mandatory Disclosures page
//  * (parent or any one-level nested page).
//  * Mirrors the shape of other hooks in /src/hooks (usePages, useIndependentPages).
//  *
//  * @param {string} college
//  * @param {string} [nestedPage]
//  * @returns {import("@tanstack/react-query").UseQueryResult<
//  *   { title: string, items: Array<{name: string, link: string, type: string}> }
//  * >}
//  */
export const useMandatoryDisclosure = (college, nestedPage) =>
  useQuery({
    queryKey: ["mandatory-disclosure", college, nestedPage || ""],
    queryFn: () => fetchMandatoryDisclosure(college, nestedPage),
    enabled: !!college,
    select: (raw) => mapMandatoryDisclosureData(raw, { college }),
  });

export default useMandatoryDisclosure;
