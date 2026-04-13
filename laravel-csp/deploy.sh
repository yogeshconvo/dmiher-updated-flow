#!/bin/bash
# ===========================================================================
# Build & Deploy Script
# ===========================================================================
# Run from the React project root (dmiher-new-flow/).
# Adjust LARAVEL_PUBLIC to point to your Laravel project's public/ directory.
# ===========================================================================

set -e

LARAVEL_PUBLIC="../your-laravel-project/public"

echo "==> Building React + Vite..."
npm run build

echo "==> Copying build output to Laravel public/build/..."
rm -rf "$LARAVEL_PUBLIC/build"
mkdir -p "$LARAVEL_PUBLIC/build"
cp -r dist/* "$LARAVEL_PUBLIC/build/"

# Also copy the manifest for SpaController to read
if [ -f "dist/.vite/manifest.json" ]; then
  mkdir -p "$LARAVEL_PUBLIC/build/.vite"
  cp dist/.vite/manifest.json "$LARAVEL_PUBLIC/build/.vite/manifest.json"
fi

echo "==> Done! Assets deployed to $LARAVEL_PUBLIC/build/"
echo ""
echo "Checklist:"
echo "  1. Copy laravel-csp/index.blade.php     -> resources/views/index.blade.php"
echo "  2. Copy laravel-csp/CspMiddleware.php    -> app/Http/Middleware/CspMiddleware.php"
echo "  3. Copy laravel-csp/SpaController.php    -> app/Http/Controllers/SpaController.php"
echo "  4. Add catch-all route from laravel-csp/web.php to routes/web.php"
echo "  5. Register CspMiddleware in bootstrap/app.php or Kernel.php"
echo "  6. Add GA/GTM IDs to .env (GOOGLE_ANALYTICS_ID, GOOGLE_TAG_MANAGER_ID)"
echo "  7. Add 'ga' and 'gtm' entries to config/services.php"
