import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import "./styles/main.css";
import App from "./App";
import { pagesQuery } from "./hooks/usePages";
import { micropageQuery } from "./hooks/useMicropage";
import { subpagesQuery } from "./hooks/useSubpages";
import { headerQuery, footerQuery } from "./hooks/useHeader";


export async function render(url) {
  // ✅ NEW QueryClient PER REQUEST
  const queryClient = new QueryClient();

  // 🔥 URL parsing
  const segments = url.split("/").filter(Boolean);
  const pageSlug = segments[0] || "home";
  const microSlug = segments[1];
await queryClient.prefetchQuery(headerQuery());
await queryClient.prefetchQuery(footerQuery());

  // ✅ Prefetch queries
  await queryClient.prefetchQuery(pagesQuery(pageSlug));
  await queryClient.prefetchQuery(subpagesQuery());

  if (microSlug) {
    await queryClient.prefetchQuery(
      micropageQuery(pageSlug, microSlug)
    );
  }

  const dehydratedState = dehydrate(queryClient);

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <MemoryRouter initialEntries={[url]}>
          <App />
        </MemoryRouter>
      </HydrationBoundary>
    </QueryClientProvider>
  );

  return { html, dehydratedState };
}
