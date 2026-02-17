const CACHE_NAME = 'coach-alex-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/about.html',
    '/services.html',
    '/booking.html',
    '/testimonials.html',
    '/contact.html',
    '/transformations.html',
    '/index.css',
    '/main.js',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
