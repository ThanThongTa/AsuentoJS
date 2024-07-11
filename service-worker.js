/* eslint-env serviceworker */
/* global self, caches */
// Set a name for the current cache
const cacheName = 'trefoil'

// Default files to always cache

const cacheFiles = [
  './',
  '/favicon.ico',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/img/icon-128x128.png',
  '/img/icon-144x144.png',
  '/img/icon-152x152.png',
  '/img/icon-192x192.png',
  '/img/icon-256x256.png',
  '/img/icon-512x512.png',
  '/js/app.js',
  '/libraries/p5.min.js',
  '/modules/db_read.js',
  '/modules/db_save.js',
  '/modules/db.js',
  '/modules/idb-src.min.js',
  '/modules/install.js',
  '/modules/knot.js',
  '/modules/lib.js',
  '/modules/main.js',
  '/modules/ui.js'
]

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Installed')
  // e.waitUntil Delays the event until the Promise is resolved
  e.waitUntil(
    // Open the cache
    caches.open(cacheName).then(function (cache) {
      // Add all the default files to the cache
      console.log('[ServiceWorker] Caching cacheFiles')
      return cache.addAll(cacheFiles)
    })
  ) // end e.waitUntil
})

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activated')
  e.waitUntil(
    // Get all the cache keys (cacheName)
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {
        // If a cached item is saved under a previous cacheName
        if (thisCacheName !== cacheName) {
          // Delete that cached file
          console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName)
          return caches.delete(thisCacheName)
        }
        return true
      }))
    })
  ) // end e.waitUntil
})

self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url)
  // e.respondWidth Responds to the fetch event
  e.respondWith(
    // Check in cache for the request being made
    caches.match(e.request)
      .then(function (response) {
        // If the request is in the cache
        if (response) {
          console.log('[ServiceWorker] Found in Cache', e.request.url, response)
          // Return the cached version
          return response
        }

        // If the request is NOT in the cache, fetch and cache
        const requestClone = e.request.clone()
        return fetch(requestClone)
          .then(function (response) {
            if (!response) {
              console.log('[ServiceWorker] No response from fetch ')
              return response
            }

            const responseClone = response.clone()

            //  Open the cache
            caches.open(cacheName).then(function (cache) {
              // Put the fetched response in the cache
              cache.put(e.request, responseClone)
              console.log('[ServiceWorker] New Data Cached', e.request.url)

              // Return the response
              return response
            }) // end caches.open
          })
          .catch(function (err) {
            console.log('[ServiceWorker] Error Fetching & Caching New Data', err)
          })
      }) // end caches.match(e.request)
  ) // end e.respondWith
})
