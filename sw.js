const CACHE_NAME = 'trip26-v11';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './travelers.jpg.JPG',
  './rove.jpg.JPG',
  './camels.jpg.JPG',
  './burj.jpg.JPG',
  './IMG_8578.png',
  './IMG_8581.png',
  './IMG_8582.png',
  './IMG_8588.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => k !== CACHE_NAME && caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
