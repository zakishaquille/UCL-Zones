const CACHE_NAME = "uclzones-v8";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/team.html",
  "/pages/myfavorite.html",
  "/css/material-icons.css",
  "/css/materialize.min.css",
  "/css/style.scss",
  "/js/api.js",
  "/js/db.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/service-registry.js",
  "/vendor/idb-2.1.3/lib/idb.js",
  "/favicon.ico",
  "/images/icon-x64.png",
  "/images/icon-x192.png",
  "/images/icon-x512.png",
  "/images/jumbotron.jpg",
  "/fonts/MaterialIcons-Regular.eot",
  "/fonts/MaterialIcons-Regular.ttf",
  "/fonts/MaterialIcons-Regular.woff",
  "/fonts/MaterialIcons-Regular.woff2",
  "/fonts/poppins-regular.ttf",
  "/fonts/poppins-regular.woff",
  "/fonts/poppins-regular.woff2",
  "/fonts/poppins-medium.ttf",
  "/fonts/poppins-medium.woff",
  "/fonts/poppins-medium.woff2",
  "/fonts/poppins-bold.ttf",
  "/fonts/poppins-bold.woff",
  "/fonts/poppins-bold.woff2"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  var base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
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

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'There\'s new notification';
  }
  var options = {
    body: body,
    icon: 'images/icon-x64.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});