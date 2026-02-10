import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
    const app = express();

    // gzip compression
    app.use(compression());

    // Create Vite dev server in middleware mode
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom",
    });

    // Use Vite's middleware
    app.use(vite.middlewares);

    // 🔥 SSR handler
    app.use(async (req, res) => {
        try {
            const url = req.originalUrl;

            let template = fs.readFileSync(
                path.resolve(__dirname, "index.html"),
                "utf-8"
            );

            const transformed = await vite.transformIndexHtml(url, template);
            template =
                typeof transformed === "string"
                    ? transformed
                    : transformed.html;

            const { render } = await vite.ssrLoadModule(
                "/src/entry-server.jsx"
            );

            const { html, dehydratedState } = await render(url);

            const finalHtml = template
                .replace("<!--ssr-outlet-->", html)
                .replace(
                    "</body>",
                    `<script>
                  window.__REACT_QUERY_STATE__ = ${JSON.stringify(
                        dehydratedState
                    )}
                </script>
                </body>`
                );

            res
                .status(200)
                .set({ "Content-Type": "text/html" })
                .end(finalHtml);
        } catch (e) {
            vite.ssrFixStacktrace(e);
            console.error(e);
            res.status(500).end(e.message);
        }
    });


    app.listen(5173, () => {
        console.log("🚀 SSR server running at http://localhost:5173");
    });
}

createServer();
