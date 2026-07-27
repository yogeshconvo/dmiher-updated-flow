import React from "react";
import { useParams } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm/DynamicForm";

/**
 * Section-registry adapter for the standalone Forms module.
 *
 * A `dynamic_application_form` section renders the dashboard form linked to its
 * CTA. The admin adds the section (no fields to fill) and the form to show is
 * the one whose slug matches the section's CTA key — i.e. the `:page` segment
 * of /{college}/{page}. An explicit `form_slug` in the section content still
 * wins if present (used by the older manually-linked sections).
 *
 * Definition + submission are handled by the Form API; nothing sensitive
 * (recipient emails) is ever exposed through the content API.
 */
export default function DynamicFormSection({ data }) {
  // /:college/:page → `page` is the CTA key the form is filed under.
  const { page } = useParams();

  const slug =
    data?.form_slug ||
    data?.header?.form_slug ||
    data?.slug ||
    data?.cta_key ||
    page ||
    "";

  if (!slug) return null;

  return <DynamicForm slug={slug} />;
}
