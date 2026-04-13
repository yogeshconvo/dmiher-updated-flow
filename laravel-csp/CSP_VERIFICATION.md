# CSP Nonce Verification Guide

## 1. Check CSP Header in Network Tab

1. Open Chrome DevTools (F12)
2. Go to **Network** tab
3. Refresh the page
4. Click on the **first request** (the HTML document, e.g., `localhost` or your domain)
5. Under **Response Headers**, look for:
   ```
   content-security-policy: default-src 'self'; script-src 'self' 'nonce-abc123...' ...
   ```
6. The nonce value should be a Base64 string (32 characters)

## 2. Verify Nonce Changes Per Request

1. Note down the nonce from step 1
2. **Hard refresh** the page (Ctrl+Shift+R)
3. Check the CSP header again
4. The nonce value MUST be different from the previous one
5. Also check: `<meta name="csp-nonce">` in Elements tab — should match the header nonce

## 3. Verify No CSP Violations

1. Open **Console** tab in DevTools
2. Refresh the page
3. Look for red errors starting with:
   ```
   Refused to execute inline script because it violates the following
   Content Security Policy directive: "script-src ..."
   ```
4. If you see these, a script is missing its nonce attribute
5. **Zero CSP errors** = everything is correctly configured

## 4. Verify Inline Scripts Have Nonce

1. Open **Elements** tab
2. Search for `<script` (Ctrl+F in Elements tab)
3. Every inline `<script>` tag should have `nonce="..."` attribute
4. The nonce value should match the one in the CSP header

## 5. Verify Third-Party Scripts Load

Check these all load without CSP errors:
- [ ] Google Analytics (gtag.js)
- [ ] Google Tag Manager
- [ ] NoPaperForms widget
- [ ] Geta.ai chatbot (if used)
- [ ] YouTube iframes
- [ ] Google Maps iframes

## 6. Common Issues & Fixes

### "Refused to execute inline script"
- An inline `<script>` is missing `nonce="{{ $nonce }}"` in the Blade template
- A React component is using `document.createElement('script')` without setting nonce

### "Refused to load the script" (external)
- The script's domain is not in `script-src` in CspMiddleware.php
- Fix: Add the domain to the `script-src` directive

### "Refused to apply inline style"
- If using `style-src` with nonce only (no `'unsafe-inline'`), Tailwind's
  runtime styles need the nonce
- The current config uses `'nonce-{$nonce}'` for style-src which handles this

### "Refused to frame"
- An iframe's domain is not in `frame-src`
- Fix: Add the domain to the `frame-src` directive in CspMiddleware.php

## 7. Quick Test Commands

```bash
# Test CSP header is present
curl -I https://your-domain.com 2>/dev/null | grep -i content-security-policy

# Test nonce changes (run twice, compare)
curl -s https://your-domain.com | grep 'csp-nonce' | head -1
curl -s https://your-domain.com | grep 'csp-nonce' | head -1
```

## 8. Architecture Overview

```
Browser Request
    |
    v
Laravel CspMiddleware
    |-- Generates random nonce (base64, 24 bytes)
    |-- Shares $nonce with Blade views
    |-- Sets Content-Security-Policy header with nonce
    |
    v
index.blade.php
    |-- <meta name="csp-nonce" content="{{ $nonce }}">
    |-- <script nonce="{{ $nonce }}">  (GTM, GA inline scripts)
    |-- <script src="..." nonce="{{ $nonce }}">  (Vite bundles)
    |-- <link rel="stylesheet" nonce="{{ $nonce }}">  (Vite CSS)
    |
    v
React App Boots
    |-- NonceProvider reads nonce from <meta name="csp-nonce">
    |-- useNonce() hook available to any component
    |-- getNonce() available for dynamic script injection
    |
    v
Dynamic Scripts (e.g., NoPaperForms)
    |-- script.setAttribute("nonce", getNonce())
    |-- Browser checks nonce matches CSP header -> ALLOWED
```
