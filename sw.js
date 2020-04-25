const cacheKey = new Date().toISOString()

const cacheWhiteCol = [cacheKey]

const cacheFileCol = [
  './dist/index.html',
  './dist/bundle.js'
]

self.addEventListener('install',(ev)=> {
  ev.waitUntil(
    caches.open(cacheKey).then((cache)=> {
      
      return cache.addAll(cacheFileCol)
    })
  )
})

self.addEventListener('fetch',(ev)=> {
  ev.respondWith(
    caches.match(ev.request).then((response)=> {
      if(response) {

        return response
      }

      return fetch(ev.request)
    })
  )
})

self.addEventListener('activate',(ev)=> {
  ev.waitUntil(
    caches.keys().then((cacheNames)=> {

      return Promise.all(
        cacheNames.map((cacheName)=> {
          if(!cacheWhiteCol.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})