<?php

/**
 * Add these entries to: config/services.php
 *
 * Then set in your .env:
 *   GOOGLE_ANALYTICS_ID=G-XXXXXXX
 *   GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
 */

return [
    // ... existing services ...

    'ga' => [
        'id' => env('GOOGLE_ANALYTICS_ID', 'G-XXXXXXX'),
    ],

    'gtm' => [
        'id' => env('GOOGLE_TAG_MANAGER_ID', 'GTM-XXXXXXX'),
    ],
];
