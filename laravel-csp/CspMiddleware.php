<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * CSP Middleware — generates a fresh nonce per request and sets the
 * Content-Security-Policy HTTP header.
 *
 * Copy to: app/Http/Middleware/CspMiddleware.php
 *
 * Register in bootstrap/app.php (Laravel 11+):
 *   ->withMiddleware(function (Middleware $middleware) {
 *       $middleware->web(append: [
 *           \App\Http\Middleware\CspMiddleware::class,
 *       ]);
 *   })
 *
 * Or in app/Http/Kernel.php (Laravel 10):
 *   protected $middlewareGroups = [
 *       'web' => [
 *           // ... existing middleware
 *           \App\Http\Middleware\CspMiddleware::class,
 *       ],
 *   ];
 */
class CspMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Generate a cryptographically random nonce (base64, 24 bytes)
        $nonce = base64_encode(random_bytes(24));

        // Share nonce with all Blade views
        view()->share('nonce', $nonce);

        // Store on request so the controller can also access it
        $request->attributes->set('csp_nonce', $nonce);

        $response = $next($request);

        // Build CSP header
        $csp = implode('; ', [
            "default-src 'self'",

            // Scripts: own bundle + nonce for inline + trusted third parties
            "script-src 'self' 'nonce-{$nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://widgets.in6.nopaperforms.com https://static.getaai.com",

            // Styles: own CSS + nonce for any inline styles (replaces unsafe-inline)
            "style-src 'self' 'nonce-{$nonce}' https://fonts.googleapis.com",

            // Images: allow HTTPS + data URIs + your API
            "img-src 'self' https: data: " . config('app.api_base', 'https://api.dmiher.edu.in'),

            // Fonts
            "font-src 'self' https://fonts.gstatic.com data:",

            // API connections
            "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://api.web3forms.com https://static.getaai.com " . config('app.api_base', 'https://api.dmiher.edu.in'),

            // Iframes: YouTube, Google Maps, Google Docs, GTM
            "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com https://docs.google.com https://drive.google.com https://www.googletagmanager.com",

            // Prevent your site from being iframed (clickjacking protection)
            "frame-ancestors 'self'",

            // Forms can only submit to self and trusted endpoints
            "form-action 'self' https://api.web3forms.com",

            // Block object/embed/applet
            "object-src 'none'",

            // Restrict base URI to self
            "base-uri 'self'",
        ]);

        $response->headers->set('Content-Security-Policy', $csp);
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-XSS-Protection', '0'); // Modern browsers use CSP

        return $response;
    }
}
