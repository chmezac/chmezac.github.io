var cacheName = 'INFORMATICv3';
var filesToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/productos.html',
    '/ventas.html',
    "/js/app.js",
    "/js/app2.js",
    "/js/main.js",
    "/css/carrusel.css",  
    "/css/main.css",
    "/css/movil.css",
    "/img/seccion1.jpg", 
    "/img/seccion2.jpg", 
    "/img/seccion3.jpg",
    "/img/seccion4.jpg",
    "/img/carr1.jpg",
    "/img/carr2.jpg",
    "/img/carr3.jpg",
    "/img/carr4.jpg",
    "/img/fondo.jpg",
    "/img/fondo1.jpg",
    "/img/icon.png",
    "/img/imgbanner.gif",
    "/img/imgborde.png",
    "/img/logo.png",
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});