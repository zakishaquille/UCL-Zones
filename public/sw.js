importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: "/", revision: '1' },
  { url: "/manifest.json", revision: '1' },
  { url: "/nav.html", revision: '1' },
  { url: "/index.html", revision: '1' },
  { url: "/pages/home.html", revision: '1' },
  { url: "/pages/team.html", revision: '1' },
  { url: "/pages/myfavorite.html", revision: '1' },
  { url: "/css/material-icons.css", revision: '1' },
  { url: "/css/materialize.min.css", revision: '1' },
  { url: "/css/style.css", revision: '1' },
  { url: "/js/api.js", revision: '1' },
  { url: "/js/db.js", revision: '1' },
  { url: "/js/materialize.min.js", revision: '1' },
  { url: "/js/nav.js", revision: '1' },
  { url: "/js/service-registry.js", revision: '1' },
  { url: "/vendor/idb-2.1.3/lib/idb.js", revision: '1' },
  { url: "/favicon.ico", revision: '1' },
  { url: "/images/icon-x64.png", revision: '1' },
  { url: "/images/icon-x192.png", revision: '1' },
  { url: "/images/icon-x512.png", revision: '1' },
  { url: "/images/jumbotron.jpg", revision: '1' },
  { url: "/fonts/MaterialIcons-Regular.eot", revision: '1' },
  { url: "/fonts/MaterialIcons-Regular.ttf", revision: '1' },
  { url: "/fonts/MaterialIcons-Regular.woff", revision: '1' },
  { url: "/fonts/MaterialIcons-Regular.woff2", revision: '1' },
  { url: "/fonts/poppins-regular.ttf", revision: '1' },
  { url: "/fonts/poppins-regular.woff", revision: '1' },
  { url: "/fonts/poppins-regular.woff2", revision: '1' },
  { url: "/fonts/poppins-medium.ttf", revision: '1' },
  { url: "/fonts/poppins-medium.woff", revision: '1' },
  { url: "/fonts/poppins-medium.woff2", revision: '1' },
  { url: "/fonts/poppins-bold.ttf", revision: '1' },
  { url: "/fonts/poppins-bold.woff", revision: '1' },
  { url: "/fonts/poppins-bold.woff2", revision: '1' }
]);

workbox.routing.registerRoute(
  /^https:\/\/api.football-data.org\/v2/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-data'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/storage.googleapis.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-api-storage',
  })
);

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