// Checks that every branch, quiz answer, cross-link and skill reference in the content resolves.
import { build } from 'esbuild';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';

const load = async entry => {
  const out = await build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'node', write: false });
  return import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));
};
const c = await load('src/content/index.ts');
const { surya, dungKg } = await load('src/content/tools.ts');
const { READINGS, SCENARIOS, QUIZZES, SKILLS, JOURNEYS, TRACKS } = c;
const readingIds = new Set(READINGS.map(r => r.id));
const skillIds = new Set(SKILLS.map(s => s.id));
const trackIds = new Set(TRACKS.map(t => t.id));
let problems = [];
const bad = m => problems.push(m);

for (const r of READINGS) if (!trackIds.has(r.track)) bad(`reading ${r.id}: unknown track ${r.track}`);
for (const s of SKILLS) { if (!trackIds.has(s.track)) bad(`skill ${s.id}: unknown track`); if (s.readingId && !readingIds.has(s.readingId)) bad(`skill ${s.id}: missing reading ${s.readingId}`); }

for (const sc of SCENARIOS) {
  if (!sc.nodes[sc.start]) bad(`scenario ${sc.id}: start node missing`);
  const reach = new Set(); const stack = [sc.start];
  while (stack.length) { const id = stack.pop(); if (reach.has(id)) continue; reach.add(id); const n = sc.nodes[id]; if (!n) { bad(`scenario ${sc.id}: node ${id} missing`); continue; } for (const ch of n.choices || []) { if (!sc.nodes[ch.to]) bad(`scenario ${sc.id}: ${id} -> ${ch.to} missing`); stack.push(ch.to); } }
  for (const [id, n] of Object.entries(sc.nodes)) {
    if (!reach.has(id)) bad(`scenario ${sc.id}: node ${id} unreachable`);
    if (!!n.choices === !!n.end) bad(`scenario ${sc.id}: node ${id} needs exactly one of choices or end`);
    if (n.end?.readingId && !readingIds.has(n.end.readingId)) bad(`scenario ${sc.id}: ${id} links to missing reading`);
  }
  const ends = Object.values(sc.nodes).filter(n => n.end).length;
  const outcomes = new Set(Object.values(sc.nodes).filter(n => n.end).map(n => n.end.outcome));
  if (ends < 3 || !outcomes.has('strong')) bad(`scenario ${sc.id}: needs at least 3 endings including a strong one`);
}
for (const [t, qs] of Object.entries(QUIZZES)) {
  if (!trackIds.has(t)) bad(`quiz ${t}: unknown track`);
  qs.forEach((q, i) => {
    if (q.readingId && !readingIds.has(q.readingId)) bad(`quiz ${t}#${i}: missing reading`);
    if (q.type === 'choice') { if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) bad(`quiz ${t}#${i}: answer out of range`); if (new Set(q.options).size !== q.options.length) bad(`quiz ${t}#${i}: duplicate options`); }
    else if (new Set(q.pairs.map(p => p[1])).size !== q.pairs.length) bad(`quiz ${t}#${i}: match answers must be distinct`);
  });
}
for (const [t, j] of Object.entries(JOURNEYS)) {
  if (j.stages.length < 3) bad(`journey ${t}: too short`);
  for (const s of j.stages) { for (const id of s.skills) if (!skillIds.has(id)) bad(`journey ${t}/${s.title}: unknown skill ${id}`); if (s.readingId && !readingIds.has(s.readingId)) bad(`journey ${t}/${s.title}: missing reading`); }
}
// Reading bodies: every ::: box that opens must close.
for (const r of READINGS) { const opens = (r.body.match(/^:::\w+/gm) || []).length; const closes = (r.body.match(/^:::\s*$/gm) || []).length; if (opens !== closes) bad(`reading ${r.id}: unbalanced ::: boxes`); }

// ---- Translations: every language folder under locales/ must mirror the English structure.
const { READING_TEXT } = await load('src/generated/readings-i18n.ts');
const readJson = async f => JSON.parse(await readFile(f, 'utf8'));
const flat = (o, pre = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, pre + k + '.') : [pre + k]));
const baseKey = k => k.replace(/_(one|other|zero|two|few|many)$/, '');
const hasLetters = s => /[A-Za-z\u0900-\u097F]/.test(s);
const langs = (await readdir('locales', { withFileTypes: true })).filter(d => d.isDirectory() && d.name !== 'en').map(d => d.name);
const enUi = await readJson('locales/en/ui.json');
for (const lang of langs) {
  const b = m => bad(`[${lang}] ${m}`);
  const load1 = async n => readJson(`locales/${lang}/${n}.json`).catch(() => null);
  const ui = await load1('ui');
  if (!ui) b('missing ui.json'); else {
    const a = new Set(flat(enUi).map(baseKey)), z = new Set(flat(ui).map(baseKey));
    for (const k of a) if (!z.has(k)) b(`ui: missing key ${k}`);
    for (const k of z) if (!a.has(k)) b(`ui: unknown key ${k}`);
    const tags = s => (s.match(/<\/?\w+>/g) || []).sort().join('');
    const flatEn = Object.fromEntries(flat(enUi).map(k => [k, k.split('.').reduce((o, x) => o[x], enUi)]));
    for (const k of flat(ui)) { const v = k.split('.').reduce((o, x) => o[x], ui); const e = flatEn[k]; if (typeof e === 'string' && typeof v === 'string') { if (tags(e) !== tags(v)) b(`ui: ${k} has different tags`); if ((e.match(/\{\{\w+\}\}/g) || []).sort().join() !== (v.match(/\{\{\w+\}\}/g) || []).sort().join() && !/_(one|other)$/.test(k)) b(`ui: ${k} has different placeholders`); } }
  }
  const sc = await load1('scenarios');
  if (sc) for (const s of SCENARIOS) {
    const o = sc[s.id]; if (!o) { b(`scenarios: ${s.id} not translated`); continue; }
    for (const [id, n] of Object.entries(s.nodes)) {
      const x = o.nodes?.[id]; if (!x) { b(`scenarios: ${s.id}/${id} missing`); continue; }
      if (!x.text) b(`scenarios: ${s.id}/${id} no text`);
      if (!!n.fact !== !!x.fact) b(`scenarios: ${s.id}/${id} fact mismatch`);
      if ((n.choices?.length ?? 0) !== (x.choices?.length ?? 0)) b(`scenarios: ${s.id}/${id} choices count`);
      if (!!n.end !== !!x.end) b(`scenarios: ${s.id}/${id} end mismatch`);
      if ((n.text.match(/\*\*/g) || []).length !== ((x.text || '').match(/\*\*/g) || []).length) b(`scenarios: ${s.id}/${id} bold markers differ`);
    }
    for (const id of Object.keys(o.nodes || {})) if (!s.nodes[id]) b(`scenarios: ${s.id}/${id} unknown node`);
  }
  const qz = await load1('quizzes');
  if (qz) for (const [t, qs] of Object.entries(QUIZZES)) {
    const o = qz[t]; if (!o || o.length !== qs.length) { b(`quizzes: ${t} length differs`); continue; }
    qs.forEach((q, i) => { const x = o[i]; if (q.type === 'choice' ? x.options?.length !== q.options.length : x.pairs?.length !== q.pairs.length) b(`quizzes: ${t}#${i} option/pair count`); if (!x.q || !x.why) b(`quizzes: ${t}#${i} missing text`); });
  }
  const sk = await load1('skills');
  if (sk) for (const k of SKILLS) { const x = sk[k.id]; if (!x) { b(`skills: ${k.id} not translated`); continue; } if (x.train?.length !== k.train.length) b(`skills: ${k.id} train count`); if (!!k.note !== !!x.note) b(`skills: ${k.id} note mismatch`); }
  const jn = await load1('journeys');
  if (jn) for (const [t, j] of Object.entries(JOURNEYS)) { const x = jn[t]; if (!x || x.stages?.length !== j.stages.length) { b(`journeys: ${t} stage count`); continue; } j.stages.forEach((st, i) => { const y = x.stages[i]; if (y.actions?.length !== st.actions.length || y.ask?.length !== st.ask.length) b(`journeys: ${t}#${i} list length`); }); }
  const tk = await load1('tracks');
  if (tk) for (const t of TRACKS) if (!tk[t.id]?.name || !tk[t.id]?.short || !tk[t.id]?.tagline) b(`tracks: ${t.id} incomplete`);
  const rt = READING_TEXT[lang] || {};
  for (const r of READINGS) {
    const x = rt[r.id]; if (!x) { b(`readings: ${r.id} not translated`); continue; }
    const count = (s, re) => (s.match(re) || []).length;
    for (const [name, re] of [['## headings', /^##+ /gm], ['::: markers', /^:::/gm], ['table rows', /^\|/gm], ['list items', /^(- |\d+\. )/gm], ['quotes', /^>/gm]]) if (count(r.body, re) !== count(x.body, re)) b(`readings: ${r.id} ${name} differ (${count(r.body, re)} vs ${count(x.body, re)})`);
    if (!x.title || !x.summary) b(`readings: ${r.id} missing title/summary`);
    if (lang === 'hi' && !/[\u0900-\u097F]/.test(x.body)) b(`readings: ${r.id} has no Devanagari`);
  }
}
assert.deepEqual(problems, [], '\n' + problems.join('\n'));

// Directory figures used by the tools.
assert.equal(surya(1), 30000); assert.equal(surya(2), 60000); assert.equal(surya(3), 78000); assert.equal(surya(4), 78000); assert.equal(surya(5), 78000);
assert.ok(dungKg(4) < 50 && dungKg(5) >= 50 - 6);

console.log(`Languages checked: en${langs.map(l => ', ' + l).join('')}`);
console.log(`PASS: ${READINGS.length} readings, ${SCENARIOS.length} scenarios, ${Object.values(QUIZZES).flat().length} questions, ${SKILLS.length} skills. All links resolve.`);
