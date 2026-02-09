import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import "./styles/main.css";
import App from "./App";

const queryClient = new QueryClient();

hydrateRoot(
  document.getElementById("root"),
  <QueryClientProvider client={queryClient}>
    <HydrationBoundary state={window.__REACT_QUERY_STATE__}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HydrationBoundary>
  </QueryClientProvider>
);
