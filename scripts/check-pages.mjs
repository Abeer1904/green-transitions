import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile('dist/index.html', 'utf8');
const worker = await readFile('dist/sw.js', 'utf8');
for (const base of ['https://example.test/', 'https://example.test/green-transitions/']) {
  for (const [, asset] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    assert.ok(new URL(asset, base).href.startsWith(base), `Asset escapes site: ${asset}`);
  }
  const handlers = {};
  const stored = new Map();
  const deleted = [];
  const prefix = 'gram-urja:' + base + ':';
  let activeCache;
  let offline = false;
  let status = 200;
  const cache = {
    async addAll(urls) { for (const url of urls) { assert.ok(url.startsWith(base)); stored.set(url, new Response('cached ' + url)); } },
    async put(request, response) { stored.set(request.url, response); },
    async match(request) { return stored.get(typeof request === 'string' ? request : request.url)?.clone(); }
  };
  vm.runInNewContext(worker, {
    URL, Response,
    self: { registration: { scope: base }, addEventListener: (name, fn) => handlers[name] = fn, skipWaiting() {}, clients: { claim() {} } },
    caches: {
      async open(name) { activeCache = name; return cache; },
      async keys() { return [activeCache, prefix + 'old', 'unrelated-cache', 'gram-urja:https://example.test/another/:old']; },
      async delete(name) { deleted.push(name); }
    },
    async fetch() { if (offline) throw new Error('Offline'); return new Response('network', { status }); }
  });
  async function lifecycle(name) { let pending; handlers[name]({ waitUntil(p) { pending = p; } }); await pending; }
  await lifecycle('install');
  await lifecycle('activate');
  assert.deepEqual(deleted, [prefix + 'old']);
  async function request(url, mode = 'cors', method = 'GET') {
    let response; const pending = [];
    handlers.fetch({ request: { url, mode, method }, respondWith(p) { response = p; }, waitUntil(p) { pending.push(p); } });
    const result = await response; await Promise.all(pending); return result;
  }
  assert.equal(await request('https://other.test/app.js'), undefined);
  assert.equal(await request(base + 'app.js', 'cors', 'POST'), undefined);
  if (base.endsWith('/green-transitions/')) assert.equal(await request('https://example.test/other/app.js'), undefined);
  await request(base + 'pipeline/index.html', 'navigate');
  status = 404;
  assert.equal((await request(base + 'missing.js')).status, 404);
  assert.equal(stored.has(base + 'missing.js'), false);
  offline = true;
  assert.equal(await (await request(base + 'app.js')).text(), 'cached ' + base + 'app.js');
  assert.equal(await (await request(base + 'pipeline/index.html', 'navigate')).text(), 'network');
  assert.equal((await request(base + '?offline=1', 'navigate')).status, 200);
  assert.equal((await request(base + 'missing.js')).type, 'error');
  assert.equal((await request(base + 'games/navapur/index.html', 'navigate')).type, 'error');
}
console.log('PASS: root/subfolder asset paths, scoped cache cleanup, offline fallback, and uncached/error handling.');
