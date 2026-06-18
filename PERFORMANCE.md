# Path to GTmetrix A+ / 95+ Performance

## ✅ Done (frontend code — already in this repo)

- **Code-split the 4.5 MB monolithic bundle** → the homepage now loads ~187 KB
  gzipped JS instead of 1.36 MB (≈86% less). 152 small chunks; sections load
  on demand via `React.lazy`.
- **Removed Lucide (146 KB gz) and react-icons (924 KB gz) from the home
  critical path** — they now load only on the routes that use them.
- **Hero image** marked `fetchPriority="high"` + `decoding="async"`; non-active
  slides deferred.
- **Content images** (`SafeImage`) now `loading="lazy"` + `decoding="async"`.
- **`<link rel="preconnect">`** to the CMS asset origin so the cross-origin
  hero image starts its handshake early.

The JavaScript — the dominant problem that took the grade from E to C — is done.
The remaining points to reach **A / 95+** are **not frontend JS**; they are the
three items below.

---

## 1. Pre-render the HTML (the biggest remaining LCP win)

The site is **client-rendered**: the HTML ships empty and the hero only appears
after JS downloads, runs, calls the API, and renders. That gates LCP no matter
how small the JS is. Pre-rendering bakes the HTML at build time so the hero is in
the initial response.

The project **already supports it** — `npm run build:ssg` (`vite build` +
`scripts/prerender.mjs`, which uses Puppeteer to snapshot each route in
`src/prerender-routes.js`).

**To enable it, change `.gitlab-ci.yml` build job:**

```yaml
build:
  stage: build
  image: node:20-alpine
  variables:
    PUPPETEER_SKIP_DOWNLOAD: "true"
    PUPPETEER_EXECUTABLE_PATH: "/usr/bin/chromium-browser"
  before_script:
    - apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont
  script:
    - npm ci --legacy-peer-deps
    - npm run build:ssg            # <-- was: npm run build
  artifacts:
    paths: [dist/]
```

**Caveats to weigh first:**
- **Staleness:** homepage HTML is frozen at build time → re-deploy when key
  homepage content changes (or schedule a nightly pipeline).
- **Backend reachability:** the prerender hits the live API at build time, so the
  CI runner must reach `VITE_API_BASE` and that variable must be set.
- **Hydration:** the app uses `hydrateRoot`; verify the prerendered markup
  matches after enabling (test the deployed result before trusting it).

---

## 2. Server: compression + cache headers (the biggest Structure win)

GTmetrix Structure heavily penalizes **missing text compression** and **short
cache lifetimes**. These are set on whatever serves `/dmiher-web/`
(Laravel / Apache / nginx) — not in this repo.

- **Enable Brotli (preferred) or gzip** for HTML, JS, CSS, SVG, JSON, fonts.
- **Cache the content-hashed assets for a year** (safe — the filename changes
  when the content changes): `Cache-Control: public, max-age=31536000, immutable`
  for `/dmiher-web/assets/*`.
- **Do NOT long-cache `index.html`**: `Cache-Control: no-cache`.

**Apache (`.htaccess` in the `dmiher-web` dir — merge, don't blindly overwrite an
existing one):**

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml application/wasm
</IfModule>
<IfModule mod_headers.c>
  <FilesMatch "\.(js|css|woff2?|svg|png|jpe?g|webp|avif)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
```

**nginx:**

```nginx
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;
# brotli on; brotli_types ...;   # if ngx_brotli is available
location /dmiher-web/assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
location = /dmiher-web/index.html { add_header Cache-Control "no-cache"; }
```

---

## 3. CMS images: modern formats + compression + dimensions

The LCP hero and content images come from the CMS (`admin.dmiher.edu.in`) as
JPEG/PNG. This is a major LCP + Structure drag.

- **Serve WebP/AVIF** (with JPEG fallback) — typically 25–50% smaller.
- **Compress + cap dimensions** — hero ideally < ~150 KB, ≤ 1920 px wide.
- **Send intrinsic width/height** (or an aspect ratio) so there's no layout
  shift. The frontend already lazy-loads non-hero images and prioritizes the
  hero; the encoding/sizing must happen at upload or via an image CDN.

---

## 4. Optional: CSS

One ~737 KB (80 KB gzip) render-blocking stylesheet. Lower priority — it gzips
well — but it could later be trimmed (drop unused custom CSS) or have critical
CSS inlined if the audit still flags render-blocking.

---

## Realistic expectation

Frontend JS is optimized about as far as it goes. **Reaching A / 95+ requires
#1 (LCP via pre-render) plus #2 (compression + caching) plus #3 (image formats).**
#2 and #3 live on the server and the CMS, outside this repo; #1 needs the
CI/deploy change above and an accepted staleness tradeoff.
