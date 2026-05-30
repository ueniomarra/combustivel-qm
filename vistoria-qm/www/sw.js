/* Service Worker – Vistoria QM v1.0 */
const CACHE = 'vistoria-qm-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Passa APIs externas direto (com cache em segundo plano)
  if (
    url.hostname.includes('ibge.gov.br') ||
    url.hostname.includes('nominatim.openstreetmap.org') ||
    url.hostname.includes('gstatic.com') ||
    url.hostname.includes('firebase') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    e.respondWith(
      caches.open(CACHE).then(c =>
        fetch(e.request.clone())
          .then(r => { c.put(e.request, r.clone()); return r; })
          .catch(() => c.match(e.request))
      )
    );
    return;
  }

  // Cache-first para assets locais
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(r => {
        if (r && r.status === 200 && r.type !== 'opaque') {
          caches.open(CACHE).then(c => c.put(e.request, r.clone()));
        }
        return r;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
