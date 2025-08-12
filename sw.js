self.addEventListener('install', (e) => {
  console.log("Service Worker installed");
});

self.addEventListener('fetch', (e) => {
  // Optional: Add caching logic
});
self.addEventListener('activate', (e) => {
  console.log("Service Worker activated");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'v1') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
      console.log("Old caches cleared");
    });