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
    "style-src 'self' 'nonce-{$nonce}' 'unsafe-inline'",
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

// Resolve which prerendered file to serve for this URL.
// The SSG pass (scripts/prerender.mjs) writes fully-rendered HTML to
// dist/client/<route>/index.html for every entry in prerender-routes.js.
// For those routes we serve the prerendered file so crawlers get real content
// on first byte. For everything else (dynamic micropages, department subpages,
// mandatory-disclosure trees, etc.) we fall back to the SPA shell and let
// react-router handle the URL on the client.
$requestPath = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');
$requestPath = preg_replace('#^/dmiher-web/?#', '', $requestPath) ?? '';
$requestPath = trim($requestPath, '/');

// Whitelist path characters to defeat traversal. A slug is [A-Za-z0-9._-]
// separated by slashes; anything else falls back to the shell.
$safePath = preg_match('#^[A-Za-z0-9._/-]*$#', $requestPath) === 1
    ? $requestPath
    : '';

$shellPath = __DIR__ . '/index.html';
$prerenderedPath = $safePath === ''
    ? $shellPath
    : __DIR__ . '/' . $safePath . '/index.html';

$indexPath = is_file($prerenderedPath) ? $prerenderedPath : $shellPath;

if (!is_file($indexPath)) {
    http_response_code(500);
    echo 'SPA shell missing.';
    exit;
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
