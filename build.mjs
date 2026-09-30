import { build } from 'esbuild';
import { mkdir, writeFile, cp } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
// Static sections that ship as they are (the Green Gram Project Pipeline lives in public/pipeline).
await cp('public', 'dist', { recursive: true });
await build({ entryPoints: ['src/main.tsx'], bundle: true, format: 'esm', minify: true, outfile: 'dist/app.js', jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' } });
await writeFile('dist/index.html', `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#2f5d3a"><title>Gram Urja: village energy, from 0 to 1</title><meta name="description" content="Learn how a village can move to clean energy, and the skills that make it work. Readings, scenarios, quizzes and a 0 to 1 view for biogas and solar."><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/app.css"></head><body><div id="root"><p style="font:18px system-ui;padding:24px">Loading Gram Urja…</p></div><noscript>This site needs JavaScript to run.</noscript><script type="module" src="/app.js"></script></body></html>`);
await writeFile('dist/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2f5d3a"/><circle cx="10" cy="11" r="4" fill="#f2b632"/><path d="M6 25q10-14 20 0z" fill="#eaf0df"/></svg>');
// Offline: network first, fall back to what was cached on an earlier visit.
const version = Date.now();
await writeFile('dist/sw.js', `const C='gram-urja-${version}';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['/','/app.js','/app.css','/favicon.svg'])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request).then(m=>m||caches.match('/'))));});
`);
