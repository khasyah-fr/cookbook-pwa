const CACHE_NAME = "firstpwa-v0.05";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/pricing.html",
    "/pages/recipes.html",
    "/pages/getintouch.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/sw-register.js",
    "/img/cook.jpeg",
    "/img/office.jpeg",
    "/img/book.jpeg",
    "/img/pasta.jpeg",
    "/icon512.png",
    "/icon256.png",
    "/icon128.png"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request, {cacheName: CACHE_NAME})
            .then(function(response) {
                if(response){
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                } 

                console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if(cacheName != CACHE_NAME){
                        console.log("Service Worker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});