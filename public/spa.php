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

$indexPath = __DIR__ . '/index.html';
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
