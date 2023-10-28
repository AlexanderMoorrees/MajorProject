const cacheName = "DefaultCompany-Major Project-0.1.0";
const contentToCache = [
<<<<<<< Updated upstream
    "Build/MP28_9.loader.js",
    "Build/MP28_9.framework.js",
    "Build/MP28_9.data",
    "Build/MP28_9.wasm",
=======
    "Build/MP28_10.loader.js",
    "Build/MP28_10.framework.js",
    "Build/MP28_10.data",
    "Build/MP28_10.wasm",
>>>>>>> Stashed changes
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
