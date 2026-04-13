<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

/**
 * SPA Controller — serves the React app through the Blade template.
 *
 * Copy to: app/Http/Controllers/SpaController.php
 *
 * It reads the Vite build manifest to find the hashed JS/CSS filenames,
 * then passes them to the Blade view along with the nonce.
 */
class SpaController extends Controller
{
    public function index(Request $request)
    {
        $nonce = $request->attributes->get('csp_nonce', '');

        // Read Vite's build manifest to get hashed asset filenames
        $manifestPath = public_path('build/.vite/manifest.json');
        $jsFiles = [];
        $cssFiles = [];

        if (File::exists($manifestPath)) {
            $manifest = json_decode(File::get($manifestPath), true);

            // The entry point in Vite manifest
            $entry = $manifest['src/main.jsx'] ?? $manifest['index.html'] ?? null;

            if ($entry) {
                // Main JS bundle
                if (!empty($entry['file'])) {
                    $jsFiles[] = '/build/' . $entry['file'];
                }

                // CSS files associated with the entry
                if (!empty($entry['css'])) {
                    foreach ($entry['css'] as $css) {
                        $cssFiles[] = '/build/' . $css;
                    }
                }
            }
        } else {
            // Fallback: scan the build/assets directory
            $assetsPath = public_path('build/assets');
            if (File::isDirectory($assetsPath)) {
                foreach (File::files($assetsPath) as $file) {
                    $name = $file->getFilename();
                    if (str_ends_with($name, '.js')) {
                        $jsFiles[] = '/build/assets/' . $name;
                    } elseif (str_ends_with($name, '.css')) {
                        $cssFiles[] = '/build/assets/' . $name;
                    }
                }
            }
        }

        return view('index', compact('nonce', 'jsFiles', 'cssFiles'));
    }
}
