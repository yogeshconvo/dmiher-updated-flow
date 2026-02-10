import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
    const app = express();

    app.use(compression());

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom",
    });

    app.use(vite.middlewares);

    // ✅ SSR ONLY FOR HTML
    app.get("*", async (req, res) => {
        try {
            const url = req.originalUrl;

            let template = fs.readFileSync(
                path.resolve(__dirname, "index.html"),
                "utf-8"
            );

            template = await vite.transformIndexHtml(url, template);

            const { render } = await vite.ssrLoadModule(
                "/src/entry-server.jsx"
            );

            const { html, dehydratedState } = await render(url);

            const safeState = JSON.stringify(dehydratedState).replace(
                /</g,
                "\\u003c"
            );

            const finalHtml = template
                .replace("<!--ssr-outlet-->", html)
                .replace(
                    "</body>",
                    `<script>
            window.__REACT_QUERY_STATE__ = ${safeState}
          </script>
          </body>`
                );

            res
                .status(200)
                .set({
                    "Content-Type": "text/html",
                    "Cache-Control": "no-store",
                })
                .end(finalHtml);
        } catch (e) {
            vite.ssrFixStacktrace(e);
            console.error(e);
            res.status(500).end(e.message);
        }
    });

    app.listen(5174, () => {
        console.log("🚀 SSR server running at http://localhost:5174");
    });
}

createServer();
