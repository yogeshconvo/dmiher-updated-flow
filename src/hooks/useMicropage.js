import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

const fetchMicroPage = async ({ pageslug, ctaKey }) => {
  const res = await fetch(`${API_BASE}/api/micropage/${pageslug}/${ctaKey}`);
  if (!res.ok) throw new Error(`Micro-page fetch failed: ${res.status}`);
  return res.json();
};

/**
 * useMicroPage
 *
 * Event-driven (mutation) hook — called on CTA click when has_micro_page === true.
 *
 * On success:
 *  1. Stores response in React Query cache under ["micropage", pageslug, ctaKey]
 *  2. Navigates to /{pageslug} passing ctaKey via router state (no URL pollution)
 *
 * PageView then reads the cache using ctaKey from router state and injects
 * microPage.sections into the existing section rendering flow.
 */
export const useMicroPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: fetchMicroPage,

    onSuccess: (data, { pageslug, ctaKey }) => {
      // Store under ["micropage", pageslug, ctaKey]
      // PageView will pick this up via useQueryClient().getQueryData(...)
      queryClient.setQueryData(["micropage", pageslug, ctaKey], data);

      // Navigate to the slug page — pass ctaKey via router state, no reload
      navigate(`/${pageslug}`, { state: { ctaKey } });
    },
  });
};
