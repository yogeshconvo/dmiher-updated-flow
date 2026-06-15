import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { NonceProvider } from "./context/NonceContext";
import App from "./App";
import api from "./config/api";
import "@fontsource/oswald";
import "./styles/main.css";

const lc = (v) => (typeof v === "string" ? v.toLowerCase() : v);

async function prefetchForUrl(queryClient, url) {
  const base = import.meta.env.BASE_URL || "/";
  let path = url;
  if (base !== "/" && path.startsWith(base)) {
    path = "/" + path.slice(base.length);
  }
  path = path.split("?")[0].split("#")[0];
  const segments = path.split("/").filter(Boolean);

  const tryFetch = (queryKey, queryFn) =>
    queryClient.prefetchQuery({ queryKey, queryFn }).catch(() => {});

  if (segments.length === 0) {
    await tryFetch(["pages", "home"], async () => (await api.get(`/pages/home`)).data);
    return;
  }

  if (segments.length === 1) {
    const slug = lc(segments[0]);
    await tryFetch(["pages", slug], async () => (await api.get(`/pages/${slug}`)).data);
    return;
  }

  if (segments.length === 2 && segments[1] !== "programs" && segments[1] !== "departments") {
    const college = lc(segments[0]);
    const page = lc(segments[1]);
    await Promise.all([
      tryFetch(
        ["independent-pages", page],
        async () => (await api.get(`/independent-pages/${page}`)).data
      ),
      tryFetch(
        ["subpage", college, page],
        async () => (await api.get(`/micropage/${college}/${page}`)).data
      ),
    ]);
  }
}

export async function render(url) {
  const helmetContext = {};
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

  await prefetchForUrl(queryClient, url);

  const html = renderToString(
    <StrictMode>
      <NonceProvider>
        <HelmetProvider context={helmetContext}>
          <QueryClientProvider client={queryClient}>
            <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
              <App />
            </StaticRouter>
          </QueryClientProvider>
        </HelmetProvider>
      </NonceProvider>
    </StrictMode>
  );

  const { helmet } = helmetContext;
  const head = helmet
    ? [
        helmet.title?.toString() ?? "",
        helmet.meta?.toString() ?? "",
        helmet.link?.toString() ?? "",
        helmet.script?.toString() ?? "",
      ].join("")
    : "";

  const state = dehydrate(queryClient);

  return { html, head, state };
}
