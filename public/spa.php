<?php
declare(strict_types=1);

// Per-request CSP nonce: 32 cryptographic random bytes (256-bit entropy,
// matching the SHA-256 strength used by the integrity attribute), hex-encoded
// to match the 64-char nonce format Laravel's ContentSecurityPolicy middleware emits.
$nonce = bin2hex(random_bytes(32));

// Same connect-src / img-src origins the SPA actually talks to.
$apiOrigin = 'https://admin.dmiher.edu.in';

$csp = implode('; ', [
    "default-src 'self'",
    "script-src 'self' 'nonce-{$nonce}' 'strict-dynamic'",
    // Per CSP spec, 'unsafe-inline' is ignored whenever a nonce or hash is
    // ALSO present in the same source list — so mixing them in style-src blocked
    // every React style={{...}} attribute in prod. React renders inline styles
    // heavily and can't nonce them individually, so we keep 'unsafe-inline'
    // here and drop the nonce (script-src still has the nonce; that's where
    // the strong protection matters).
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: {$apiOrigin} https:",
    "font-src 'self' data:",
    "connect-src 'self' {$apiOrigin}",
    "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://maps.google.com https://www.google.com https://widgets.in6.nopaperforms.com",
    "media-src 'self' https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
]);

// Enforce mode. spa.php stamps the same nonce into <meta name="csp-nonce">,
// the entry <script src="/dmiher-web/assets/...js"> and the entry <link
// href="/dmiher-web/assets/...css">, and 'strict-dynamic' lets those trusted
// scripts load their dependents (chunk splits, useScript-injected 3rd party)
// so nothing legitimate is blocked. Kept report-only historically while
// violations were being cleaned up; now enforcing so the securityheaders.com
// scan stops flagging Content-Security-Policy as missing.
header("Content-Security-Policy: {$csp}");
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Route-aware file selection.
//
// The SSG pass (scripts/prerender.mjs) writes:
//   - dist/client/index.html         → home page, fully rendered content
//   - dist/client/index.shell.html   → the empty Vite SPA shell (snapshot
//                                       taken BEFORE prerender overwrote
//                                       index.html)
//   - dist/client/<slug>/index.html  → each prerendered subroute (added
//                                       when prerender-routes.js is expanded)
//
// Priority:
//   1. Root URL  →  index.html (prerendered home content, SEO win)
//   2. Prerendered subroute (a matching /<slug>/index.html exists on disk)
//        →  that file (also SEO win)
//   3. Everything else (micropages, department pages, arbitrary client-side
//      routes)  →  index.shell.html (empty root, React renders fresh — no
//      hydration mismatch, no home content bleeding into wrong URL)
//
// The shell fallback is what fixed the "view-source shows home page on every
// URL and micropages timed out" outage from the earlier SSG attempt.
$requestPath = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');
$requestPath = preg_replace('#^/dmiher-web/?#', '', $requestPath) ?? '';
$requestPath = trim($requestPath, '/');

// Path-safe whitelist. Anything outside [A-Za-z0-9._/-] falls back to shell
// so a crafted URI can't traverse into arbitrary files on disk.
$safePath = preg_match('#^[A-Za-z0-9._/-]*$#', $requestPath) === 1
    ? $requestPath
    : '';

$shellPath = __DIR__ . '/index.shell.html';
$homePath  = __DIR__ . '/index.html';

if ($safePath === '') {
    // Root URL — serve prerendered home content.
    $indexPath = $homePath;
} elseif (is_file(__DIR__ . '/' . $safePath . '/index.html')) {
    // Prerendered subroute — serve its captured HTML.
    $indexPath = __DIR__ . '/' . $safePath . '/index.html';
} else {
    // Anything else — serve the empty shell so the SPA renders fresh.
    $indexPath = $shellPath;
}

// Defensive fallback: if the chosen file doesn't exist for any reason,
// fall back through shell → home so we never 500 with "SPA shell missing".
if (!is_file($indexPath)) {
    if (is_file($shellPath)) {
        $indexPath = $shellPath;
    } elseif (is_file($homePath)) {
        $indexPath = $homePath;
    } else {
        http_response_code(500);
        echo 'SPA shell missing.';
        exit;
    }
}

$html = file_get_contents($indexPath);

// Replace every literal __CSP_NONCE__ placeholder (currently in <meta name="csp-nonce">).
$html = str_replace('__CSP_NONCE__', $nonce, $html);

// Vite-built tags ship without nonce. Inject one onto the entry script and stylesheet.
// Matches:  <script ... src="/dmiher-web/assets/...js"></script>
//           <link   ... href="/dmiher-web/assets/...css">
$html = preg_replace(
    '/(<script[^>]*src="\/dmiher-web\/assets\/[^"]+\.js")/',
    '$1 nonce="' . $nonce . '"',
    $html
);
$html = preg_replace(
    '/(<link[^>]*href="\/dmiher-web\/assets\/[^"]+\.css")/',
    '$1 nonce="' . $nonce . '"',
    $html
);

echo $html;
