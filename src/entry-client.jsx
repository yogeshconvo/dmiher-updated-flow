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
import "@fontsource/oswald";
import "./styles/main.css";

startTokenAutoRefresh();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const dehydratedState = window.__REACT_QUERY_STATE__;

const rootEl = document.getElementById("root");

// Only hydrate when the server sent pre-rendered content that matches the
// current URL — i.e. #root has real children the client can reuse. When the
// server sent the empty SPA shell (spa.php serves index.shell.html for any
// URL that wasn't prerendered), rootEl has no element children (just an HTML
// comment placeholder) and hydration would guarantee a mismatch (#418) on
// every non-prerendered URL, remounting the whole tree and briefly wiping
// <main> — which is exactly what was making our SSG prerender pass flaky
// AND what was throwing hydration errors on live micropages/department
// routes. createRoot() on the shell renders fresh with no attempted DOM
// reuse, so both cases work cleanly.
const hasPrerenderedContent = rootEl && rootEl.children.length > 0;

const tree = (
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

if (hasPrerenderedContent) {
  ReactDOM.hydrateRoot(rootEl, tree);
} else {
  ReactDOM.createRoot(rootEl).render(tree);
}
