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

ReactDOM.hydrateRoot(
  document.getElementById("root"),
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
