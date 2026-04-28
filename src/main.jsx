import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const rootElement = document.getElementById("root");

const app = (
  <React.StrictMode>
    <NonceProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </NonceProvider>
  </React.StrictMode>
);

/**
 * SSG Strategy:
 *
 * The prerendered HTML serves two purposes:
 * 1. SEO — crawlers see full content without running JS
 * 2. Perceived performance — users see content before JS loads
 *
 * Once JS loads, React takes over with createRoot.
 * No hydrateRoot needed — avoids all hydration mismatch issues
 * while still delivering prerendered HTML for crawlers.
 */
ReactDOM.createRoot(rootElement).render(app);
