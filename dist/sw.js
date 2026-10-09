const BASE = self.registration.scope;
const PREFIX = 'gram-urja:' + BASE + ':';
const C = PREFIX + '1791524951907';
const url = path => new URL(path, BASE).href;
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(cache => cache.addAll([
    url('./'), url('index.html'), url('app.js'), url('app.css'), url('favicon.svg')
  ])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(PREFIX) && key !== C).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const request = e.request;
  if (request.method !== 'GET' || !request.url.startsWith(BASE)) return;
  e.respondWith((async () => {
    const cache = await caches.open(C);
    try {
      const response = await fetch(request);
      if (response.ok) {
        const copy = response.clone();
        e.waitUntil(cache.put(request, copy).catch(() => {}));
      }
      return response;
    } catch {
      const cached = await cache.match(request);
      if (cached) return cached;
      // Do not return app HTML in place of a missing script, image or embedded page.
      const pathname = new URL(request.url).pathname;
      if (request.mode === 'navigate' &&
          [new URL(BASE).pathname, new URL('index.html', BASE).pathname].includes(pathname)) {
        const shell = await cache.match(url('./'));
        if (shell) return shell;
      }
      return Response.error();
    }
  })());
});
