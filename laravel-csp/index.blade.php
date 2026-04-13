{{--
  ===========================================================================
  LARAVEL BLADE TEMPLATE FOR REACT + VITE + NONCE CSP
  ===========================================================================

  Copy this to: resources/views/index.blade.php

  The $nonce variable is injected by CspMiddleware (see CspMiddleware.php).
  Every inline <script> and <style> gets nonce="{{ $nonce }}".
  The CSP header itself is set by the middleware — NOT via <meta> tag.

  After `npm run build`, copy dist/assets/* to your Laravel public/assets/.
  ===========================================================================
--}}
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  {{-- Nonce exposed to React via <meta> tag --}}
  <meta name="csp-nonce" content="{{ $nonce }}" />

  {{-- Security headers --}}
  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />

  {{-- SEO defaults (overridden by react-helmet-async per page) --}}
  <title>DMIHER | Datta Meghe Institute of Higher Education and Research</title>
  <meta name="description" content="Official website of Datta Meghe Institute of Higher Education and Research (DMIHER) — Medical, Dental, Nursing, and Allied Health Sciences." />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="DMIHER" />

  {{-- Vite-built CSS --}}
  @foreach ($cssFiles as $css)
    <link rel="stylesheet" href="{{ $css }}" nonce="{{ $nonce }}" />
  @endforeach

  {{-- Google Tag Manager --}}
  <script nonce="{{ $nonce }}">
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    j.setAttribute('nonce','{{ $nonce }}');
    f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','{{ config("services.gtm.id", "GTM-XXXXXXX") }}');
  </script>

  {{-- Google Analytics (gtag.js) --}}
  <script async src="https://www.googletagmanager.com/gtag/js?id={{ config('services.ga.id', 'G-XXXXXXX') }}" nonce="{{ $nonce }}"></script>
  <script nonce="{{ $nonce }}">
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '{{ config("services.ga.id", "G-XXXXXXX") }}');
  </script>
</head>

<body>
  {{-- Google Tag Manager (noscript fallback) --}}
  <noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id={{ config('services.gtm.id', 'GTM-XXXXXXX') }}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
  </noscript>

  <div id="root"></div>

  {{-- Vite-built JS --}}
  @foreach ($jsFiles as $js)
    <script type="module" src="{{ $js }}" nonce="{{ $nonce }}"></script>
  @endforeach
</body>

</html>
