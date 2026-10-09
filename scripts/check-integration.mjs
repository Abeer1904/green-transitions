import { readFile, readdir, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
// Verify the whole public tree ships unchanged, including both original experiences.
async function check(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const source = path.join(dir, entry.name);
    if (entry.isDirectory()) await check(source);
    else assert.deepEqual(await readFile(path.join('dist', path.relative('public', source))), await readFile(source), `Missing or stale build asset: ${source}`);
  }
}
await check('public');
for (const file of ['index.html','app.js','app.css','sw.js']) assert.ok((await stat(path.join('dist',file))).size);
for (const file of await readdir('src/pages')) {
  if (!file.endsWith('.tsx') || file === 'Experience.tsx') continue;
  const source = await readFile(path.join('src/pages',file),'utf8');
  assert.ok(!/(?:pipeline\/index\.html|games\/navapur\/index\.html)/.test(source), `Standalone link bypasses app navigation: ${file}`);
}
console.log('PASS: all public assets shipped and page links use integrated routes.');
