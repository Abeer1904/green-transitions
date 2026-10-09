import { build } from 'esbuild';
import { mkdir, writeFile, cp } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
// Static sections that ship as they are (the Green Gram Project Pipeline lives in public/pipeline).
await cp('public', 'dist', { recursive: true });
await build({ entryPoints: ['src/main.tsx'], bundle: true, format: 'esm', minify: true, outfile: 'dist/app.js', jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' } });
await writeFile('dist/index.html', `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#2f5d3a"><title>Gram Urja: village energy, from 0 to 1</title><meta name="description" content="Learn how a village can move to clean energy, and the skills that make it work. Readings, scenarios, quizzes and a 0 to 1 view for biogas and solar."><link rel="icon" href="./favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="./app.css"></head><body><div id="root"><p style="font:18px system-ui;padding:24px">Loading Gram Urja…</p></div><noscript>This site needs JavaScript to run.</noscript><script type="module" src="./app.js"></script></body></html>`);
await writeFile('dist/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2f5d3a"/><circle cx="10" cy="11" r="4" fill="#f2b632"/><path d="M6 25q10-14 20 0z" fill="#eaf0df"/></svg>');
// Scope-relative URLs support both repository Pages sites and custom domains.
const version = Date.now();
await writeFile('dist/sw.js', `const BASE = self.registration.scope;
const PREFIX = 'gram-urja:' + BASE + ':';
const C = PREFIX + '${version}';
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
`);
