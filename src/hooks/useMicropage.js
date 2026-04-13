import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

const fetchMicroPage = async ({ pageslug, ctaKey }) => {
  const { data } = await api.get(`/micropage/${pageslug}/${ctaKey}`);
  return data;
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
