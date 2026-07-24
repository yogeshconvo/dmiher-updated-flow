import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { NonceProvider } from "./context/NonceContext";
import App from "./App";
import { startTokenAutoRefresh } from "./utils/auth";
// Latin subset only — the bare "@fontsource/oswald" import also pulls
// latin-ext / cyrillic / vietnamese subset files that this English-language
// site never renders. Same visible weight (400), fewer font requests.
import "@fontsource/oswald/latin-400.css";
import "./styles/main.css";

startTokenAutoRefresh();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      // Custom retry policy: retry ONLY on 5xx (or a genuine network
      // failure with no response). Retrying a 4xx is almost always
      // counterproductive:
      //   - 429 Too Many Requests → retrying immediately just piles onto
      //     the rate-limit window and makes the throttle fire again. Live
      //     users were seeing every failed request re-fired ~1 second
      //     later, doubling the 429 spam in the console.
      //   - 404 Not Found (e.g. the still-unimplemented /api/site/settings)
      //     → retrying wastes an API call and console line.
      //   - 401 Unauthorized → the axios interceptor in config/api.js
      //     already handles the token refresh + one-shot replay. React
      //     Query re-running the same query on top of that would race
      //     with the interceptor.
      retry: (failureCount, error) => {
        const status = error?.response?.status;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 1;
      },
    },
  },
});

const dehydratedState = window.__REACT_QUERY_STATE__;

const rootEl = document.getElementById("root");

// Always createRoot() — never hydrateRoot(). We ship prerendered HTML for
// SEO (crawlers see the full page on first byte), but hydration on that
// prerendered HTML kept throwing React error #418: the captured DOM includes
// Swiper autoplay state, Helmet-inserted head tags in a specific order,
// image-load layout offsets, and other time-dependent details that the
// client's fresh render never reproduces byte-for-byte. Each mismatch
// triggered a full remount, which:
//   - blanked the DOM briefly (bad UX)
//   - re-ran every React Query fetch (which was hammering
//     admin.dmiher.edu.in until it returned 429 Too Many Requests on
//     /api/pages/*, /api/menus/Header, /api/menus/Footer, etc.)
//
// Using createRoot everywhere means React replaces the prerendered DOM with
// its own render on mount — one clean fetch pass, no error #418, no 429
// cascade. The prerendered HTML still delivers the SEO win because Google
// and other crawlers read the initial HTML before executing JS.
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <NonceProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <App />
            </BrowserRouter>
          </HydrationBoundary>
        </QueryClientProvider>
      </HelmetProvider>
    </NonceProvider>
  </React.StrictMode>
);
