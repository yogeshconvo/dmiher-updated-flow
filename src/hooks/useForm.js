import { useQuery, useMutation } from "@tanstack/react-query";
import { getForm, submitForm } from "../services/formApi";

/**
 * Fetch a dynamic form definition by slug.
 * Cache key ["form", slug] is intentionally distinct from ["micropage"/"subpage"]
 * so a form fetch can never collide with page/micropage cache entries.
 */
export const useFormDefinition = (slug) =>
  useQuery({
    queryKey: ["form", slug],
    queryFn: () => getForm(slug),
    enabled: !!slug,
  });

/** Submit a dynamic form's values (with honeypot). */
export const useSubmitForm = (slug) =>
  useMutation({
    mutationFn: ({ values, _hp }) => submitForm(slug, values, _hp),
  });
