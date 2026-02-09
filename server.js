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

    // 🔥 SSR handler
    app.use(async (req, res) => {
        try {
            const url = req.originalUrl;

            // 1️⃣ Read HTML template
            let template = fs.readFileSync(
                path.resolve(__dirname, "index.html"),
                ""
            );

            // 2️⃣ Apply Vite HTML transforms
            template = await vite.transformIndexHtml(url, template);

            // 3️⃣ Load server entry
            const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

            // 4️⃣ Render app + get dehydrated state
            const { html, dehydratedState } = await render(url);

            // 5️⃣ Inject HTML + React Query state
            const finalHtml = template
                .replace("<!--ssr-outlet-->", html)
                .replace(
                    "</body>",
                    `<script>
            window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)}
          </script></body>`
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
