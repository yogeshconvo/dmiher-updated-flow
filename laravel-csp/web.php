<?php

/**
 * SPA catch-all route.
 *
 * Add this to: routes/web.php
 *
 * This must be the LAST route so it catches all frontend paths
 * and lets React Router handle them.
 */

use App\Http\Controllers\SpaController;

// ... your existing API/web routes above ...

// Catch-all: serve React SPA for any route not matched above
Route::get('/{any?}', [SpaController::class, 'index'])
    ->where('any', '.*')
    ->name('spa');
