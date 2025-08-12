const CACHE_NAME = 'my-data-selector-cache-v2';
const URLS_TO_CACHE = [
  '/',
  '/index.html',                // Or replace with your actual entry point
  '/data-selector.html',        // Main app page
  '/manifest.json',             // Web app manifest
  'https://fonts.googleapis.com/css2?family=Jost&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js' // CDN for Chart.js
];

// Install: Cache files
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Caching app assets...');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate: Remove old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch: Serve cached or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // Optional: Add offline fallback here
      });
    })
  );
});
