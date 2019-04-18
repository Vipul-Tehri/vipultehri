const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    'main.js'
];

self.addEventListener('install', e => {
    console.log('service worker installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log("service worker caching files");
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', e => {
    console.log('service worker activated');

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != cacheName) {
                        console.log("cache deleteed")
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

self.addEventListener('sync', (event) => {
    console.log("sync------------")
    alert("sync")
    if (event.tag == 'outbox') {
        event.waitUntil(cacheAllHomePageApi());
    }
});


// self.addEventListener('fetch', e => {
//     console.log("fetching");
//     e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
// })

self.addEventListener('fetch', e => {
    console.log("fetching");
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
})


// var swReg = await navigator.serviceWorker.register('sw.js');
// swReg.sync.register('outbox').then(function () {
//     // registration succeeded
// }, function () {
//     // registration failed
// });





// self.addEventListener('fetch', function (e) {
//     const req = e.request;
//     const url = new URL(req.url);

//     if (url.origin === location.origin) {
//         e.respondWith(cacheFirst(req));
//     } else {
//         e.respondWith(networkFirst(req));
//     }
// });

// async function cacheFirst(req) {
//     return await caches.match(req) || fetch(req);
// }

// async function networkfirst(req) {

// }