const CACHE_NAME = "uclzones-v1";
var urlsToCache = [
  // "/",
  "/manifest.json",
  // "/nav.html",
  // "/index.html",
  // "/css/material-icons.css",
  // "/css/materialize.min.css",
  // "/css/style.css",
  // "/js/materialize.min.js",
  // "/js/nav.js",
  // "/js/service-registry.js",
  // "/favicon.ico",
  // "/fonts/MaterialIcons-Regular.eot",
  // "/fonts/MaterialIcons-Regular.ttf",
  // "/fonts/MaterialIcons-Regular.woff",
  // "/fonts/MaterialIcons-Regular.woff2",
  // "/fonts/poppins-regular.ttf",
  // "/fonts/poppins-regular.woff",
  // "/fonts/poppins-regular.woff2",
  // "/fonts/poppins-medium.ttf",
  // "/fonts/poppins-medium.woff",
  // "/fonts/poppins-medium.woff2",
  // "/fonts/poppins-bold.ttf",
  // "/fonts/poppins-bold.woff",
  // "/fonts/poppins-bold.woff2"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {cacheName:CACHE_NAME})
    .then(function(response) {
      if (response) {
        return response;
      }

      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200) {
            return response;
          }

          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        }
      );
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Aktivasi service worker baru');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME && cacheName.startsWith("uclzones")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});