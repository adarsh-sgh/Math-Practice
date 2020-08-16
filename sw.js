const { string } = require("mathjs");

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install;'+string(e));
});
var cachename="mathPractice-v0"
var contentToCache=[
    "/Math-Practice/",
    "/Math-Practice/index.html",
    "/Math-Practice/math.js",
    "/Math-Practice/math.css",
    "/Math-Practice/icon/icon-192x192.png",
    "/Math-Practice/manifest.webmanifest",
    "Math-Practice/tips.js"
]
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(contentToCache);
      })
    );
  });
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then((response) => {
                  return caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });