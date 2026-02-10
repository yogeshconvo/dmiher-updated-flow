import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import App from "./App";
import { pagesQuery } from "./hooks/usePages";
import { micropageQuery } from "./hooks/useMicropage";
import { subpagesQuery } from "./hooks/useSubpages";
import { headerQuery, footerQuery } from "./hooks/useHeader";
import { homeNoticesQuery } from "./hooks/useHomeNotices";


export async function render(url) {
  const queryClient = new QueryClient();

  const segments = url.split("/").filter(Boolean);
  const pageSlug = segments[0] || "home";
  const microSlug = segments[1];

  // 🔥 HEADER + FOOTER PREFETCH 
  await queryClient.prefetchQuery(headerQuery());
  await queryClient.prefetchQuery(footerQuery());

  await queryClient.prefetchQuery(pagesQuery(pageSlug));
  await queryClient.prefetchQuery(subpagesQuery());
await queryClient.prefetchQuery(homeNoticesQuery());
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
