var CACHE_NAME = 'MisPerrisv2';
var filesToCache = [
    '/',
    '/index.html',
    '/entrar.html',
    '/registrar.html',
    '/unirme.html',
    "/js/app.js",
    "/js/main.js",
    "/js/index.js",
    "/js/PersistedConnectedRouter.js",
    "/css/carrusel.css", 
    "/css/f_movil.css", 
    "/css/formulario.css",
    "/css/list.css",
    "/css/login_m.css",
    "/css/login.css",
    "/css/main.css",
    "/css/movil.css",
    "/css/signup.css",
    "/css/signupm.css",
    "/css/usuario.css",
    "/css/usuariom.css",
    "/img/borderderecho32.png", 
    "/img/borderderecho33.png", 
    "/img/borderizquierdo42.png",
    "/img/borderizquierdo43.png",
    "/img/familia1.jpg",
    "/img/familia2.jpg",
    "/img/familia3.jpg",
    "/img/familia4.jpg",
    "/img/fondo3.jpg",
    "/img/galeria1.jpg",
    "/img/galeria2.jpg",
    "/img/galeria3.jpg",
    "/img/galeria4.jpg",
    "/img/galeria5.jpg",
    "/img/galeria6.jpg",
    "/img/lineasbanner2.png",
    "/img/logo1.png",
    "/img/logo2.png",
    "/img/new2.png",
    "/img/newborder.png",
    "/img/newborder2.png",
    "/img/newlogo.png",
    "/img/texto.png",
    "/img/textura4.jpg"
];


self.addEventListener( 'install', function( e ) {
  console.log( '[ServiceWorker] Install' );
  e.waitUntil(
      caches.open( CACHE_NAME ).then( function( cache ) {
          console.log( '[ServiceWorker] Caching app shell' );
          return cache.addAll( filesToCache );
      } )
  );
});

self.addEventListener( 'activate', function( e ) {
  console.log( '[ServiceWorker] Activate' );
  e.waitUntil(
    caches.keys( ).then( function( keyList ) {
      return Promise.all( keyList.map( function( key ) {
        if ( key !== CACHE_NAME ) {
          console.log('[ServiceWorker] Removing old cache', key );
          return caches.delete( key );
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



//iOS
// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});