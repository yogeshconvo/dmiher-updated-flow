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
import "@fontsource/oswald/latin-400.css";
import "./styles/main.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
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

if (rootEl.innerHTML.trim()) {
  ReactDOM.hydrateRoot(rootEl, tree, {
    onRecoverableError(error) {
      if (import.meta.env.DEV) {
        console.warn("[hydration]", error);
      }
    },
  });
} else {
  ReactDOM.createRoot(rootEl).render(tree);
}

startTokenAutoRefresh();
