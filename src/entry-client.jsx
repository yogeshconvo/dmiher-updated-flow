import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";

export async function render(url) {
    const queryClient = new QueryClient();

    const html = renderToString(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );

    return {
        html,
        dehydratedState: dehydrate(queryClient),
    };
}
