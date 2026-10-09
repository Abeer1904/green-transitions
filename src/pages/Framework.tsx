import { useMemo, useState } from 'react';
import { FRAME, GLOSSARY, LESSONS, ROLES, STAGES, STALLS, UNITS, lessonById, lessonsIn, type Card, type Lesson, type Role } from '../content/framework';
import { readingById } from '../content';
import { Markdown } from '../md';
import { go, href } from '../router';
import { markLesson, setRole, useProgress } from '../progress';
import { NotFound } from './Track';

const OFFSETS = [0, 34, 60, 34];
const first = <T,>(xs: T[]) => xs[0];

function RolePicker() {
  const p = useProgress();
  return (
    <div className="fw-roles no-print" role="group" aria-label="Your role">
      <span>I am a</span>
      {ROLES.map(r => <button key={r.id} className={p.role === r.id ? 'pill on' : 'pill'} aria-pressed={p.role === r.id} onClick={() => setRole(p.role === r.id ? '' : r.id)}>{r.name}</button>)}
      <p>{p.role ? ROLES.find(r => r.id === p.role)!.does : 'Pick a role and the path highlights the lessons you lead. Every lesson stays open to everyone, since the handoffs between roles are where projects stall.'}</p>
    </div>
  );
}

function Map() {
  return (
    <section className="fw-map" aria-labelledby="fw-map-h">
      <h2 id="fw-map-h">The map</h2>
      <p className="lead">Six stages, three tracks. The work moves left to right. Implement hands a learning record back to Filter, and any stage can return to an earlier one when the reason is recorded.</p>
      <div className="fw-map-scroll">
        <table>
          <thead>
            <tr><th scope="col"><span className="sr-only">Track</span></th>{UNITS.map(u => <th key={u.id} scope="col"><a href={href('framework', 'stage', u.id)}><span className="fw-map-n">{u.n}</span>{u.name}</a></th>)}</tr>
          </thead>
          <tbody>
            {ROLES.map(r => (
              <tr key={r.id}>
                <th scope="row">{r.name}</th>
                {UNITS.map(u => <td key={u.id}><span className={`chip-lead ${u.lead[r.id]}`}>{u.lead[r.id] === 'lead' ? 'Leads' : 'Supports'}</span></td>)}
              </tr>
            ))}
            <tr className="fw-map-out">
              <th scope="row">Output</th>
              {UNITS.map(u => <td key={u.id}>{u.output}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
      <h3>Where the work stalls</h3>
      <ul className="fw-stalls">
        {STALLS.map(s => <li key={s.between}><strong>{s.between}.</strong> {s.text}</li>)}
      </ul>
    </section>
  );
}

function Node({ l, i, state, mine }: { l: Lesson; i: number; state: 'done' | 'current' | 'later'; mine: boolean }) {
  return (
    <a className={`fw-node ${state}${mine ? ' mine' : ''}`} style={{ marginLeft: OFFSETS[i % OFFSETS.length] }} href={href('framework', 'lesson', l.id)}>
      <span className="fw-dot" aria-hidden="true">{state === 'done' ? '✓' : l.checkpoint ? '★' : i + 1}</span>
      <span className="fw-node-text">
        <strong>{l.title}</strong>
        <small>{l.minutes} min{l.checkpoint ? ' · checkpoint' : ''}{l.watch ? ' · watch point' : ''}{state === 'done' ? ' · done' : ''}</small>
      </span>
    </a>
  );
}

function PathScreen() {
  const p = useProgress();
  const nextId = LESSONS.find(l => !p.lessons.includes(l.id))?.id;
  const done = LESSONS.filter(l => p.lessons.includes(l.id)).length;
  return (
    <div className="hue-green">
      <p className="crumbs"><a href={href()}>Home</a> / Framework</p>
      <p className="eyebrow">Framework · for districts, local bodies and their partners</p>
      <h1>From a national goal to a local project</h1>
      <p className="lead">Climate commitments do not reach a village or a small city on their own. This path teaches the steps that carry them there: filter, contextualise, prioritise, design, fund and implement. It also teaches the words, the offices and the records each step needs.</p>
      <section className="fw-frame"><h2>{FRAME.question}</h2><Markdown src={FRAME.body} /></section>
      <RolePicker />
      {nextId && <p><a className="btn btn-big" href={href('framework', 'lesson', nextId)}>{done ? 'Continue' : 'Start'}: {lessonById(nextId)!.title} →</a> <span className="meta">{done} of {LESSONS.length} lessons done</span></p>}
      <Map />
      <h2 className="section-title">The pathway</h2>
      {UNITS.map(u => {
        const ls = lessonsIn(u.id);
        return (
          <section key={u.id} className={`fw-unit${u.status === 'soon' ? ' soon' : ''}`} aria-labelledby={`u-${u.id}`}>
            {u.stallBefore && <p className="fw-stall"><span aria-hidden="true">⚠</span> Where it stalls: {u.stallBefore.toLowerCase()}</p>}
            <header className="fw-unit-head">
              <span className="fw-unit-n">{u.n}</span>
              <div><h3 id={`u-${u.id}`}><a href={href('framework', 'stage', u.id)}>{u.name}</a></h3><p>{u.question}</p></div>
            </header>
            {u.status === 'live'
              ? <div className="fw-path">{ls.map((l, i) => <Node key={l.id} l={l} i={i} state={p.lessons.includes(l.id) ? 'done' : l.id === nextId ? 'current' : 'later'} mine={!!p.role && l.owners.includes(p.role as Role)} />)}</div>
              : <p className="fw-soon"><a href={href('framework', 'stage', u.id)}>Read the stage →</a> Lessons for this stage come next. Output: {u.output.toLowerCase()}.</p>}
          </section>
        );
      })}
      <p className="fw-loop"><span aria-hidden="true">↻</span> Implement hands its learning record back to Filter. The next problem starts the next round.</p>
      <p className="fine"><a href={href('framework', 'glossary')}>Glossary of terms used in the pathway →</a></p>
      <p className="fine">Written from the Filter to Implement working draft. Figures and examples are illustrative until checked locally. Project ideas from this pathway can be written up and offered to partners in the <a href={href('pipeline')}>Green Gram project pipeline</a>.</p>
    </div>
  );
}

function TermList({ ids }: { ids: string[] }) {
  return (
    <div className="fw-terms">
      <strong>Words in this card</strong>
      {ids.map(id => GLOSSARY[id] && <details key={id}><summary>{GLOSSARY[id].term}</summary><p>{GLOSSARY[id].def}</p></details>)}
    </div>
  );
}

export function ChoiceCard({ c, onDone }: { c: Extract<Card, { kind: 'choice' }>; onDone: () => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const right = picked === c.answer;
  return (
    <>
      <h2>{c.q}</h2>
      <div className="fw-options" role="group" aria-label="Answers">
        {c.options.map((o, i) => <button key={o} className={`fw-option${picked === i ? (right ? ' right' : ' wrong') : picked !== null && i === c.answer ? ' right' : ''}`} disabled={picked !== null} onClick={() => setPicked(i)}>{o}</button>)}
      </div>
      {picked !== null && <p className={`box ${right ? 'box-ask' : 'box-warn'}`} role="status"><strong className="box-title">{right ? 'That’s right.' : 'Not that one.'}</strong>{c.why}</p>}
      {picked !== null && <button className="btn" onClick={onDone}>Continue →</button>}
    </>
  );
}

export function MatchCard({ c, onDone }: { c: Extract<Card, { kind: 'match' }>; onDone: () => void }) {
  const rights = useMemo(() => [...c.pairs.map(p => p[1])].sort((a, b) => a.localeCompare(b)), [c]);
  const [sel, setSel] = useState<string[]>(() => c.pairs.map(() => ''));
  const [checked, setChecked] = useState(false);
  const ok = sel.map((s, i) => s === c.pairs[i][1]);
  const all = ok.every(Boolean);
  return (
    <>
      <h2>{c.q}</h2>
      <div className="fw-match">
        {c.pairs.map((p, i) => (
          <label key={p[0]} className={checked ? (ok[i] ? 'right' : 'wrong') : ''}>
            <span>{p[0]}</span>
            <select value={sel[i]} onChange={e => { const n = [...sel]; n[i] = e.target.value; setSel(n); setChecked(false); }}>
              <option value="">Choose…</option>
              {rights.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
        ))}
      </div>
      {!(all && checked) && <button className="btn" disabled={sel.some(s => !s)} onClick={() => setChecked(true)}>Check</button>}
      {checked && !all && <p className="box box-warn" role="status"><strong className="box-title">Not quite.</strong>The marked rows are off. Change them and check again.</p>}
      {all && checked && <><p className="box box-ask" role="status"><strong className="box-title">That’s right.</strong>{c.why}</p><button className="btn" onClick={onDone}>Continue →</button></>}
    </>
  );
}

function LessonPlayer({ l }: { l: Lesson }) {
  const p = useProgress();
  const [i, setI] = useState(0);
  const card = l.cards[i];
  const last = i === l.cards.length - 1;
  const u = UNITS.find(x => x.id === l.unit)!;
  const idx = LESSONS.indexOf(l);
  const next = LESSONS[idx + 1];
  const [finished, setFinished] = useState(false);
  const advance = () => {
    if (!last) { setI(i + 1); window.scrollTo({ top: 0 }); return; }
    markLesson(l.id);
    setFinished(true);
    window.scrollTo({ top: 0 });
  };
  if (finished) return (
    <article className="fw-lesson hue-green">
      <p className="eyebrow">{u.name} · lesson done</p>
      <h1>{l.checkpoint ? 'Checkpoint complete' : 'Lesson complete'}</h1>
      <p className="lead">{l.title}</p>
      {l.readings && l.readings.length > 0 && <div className="box box-note"><strong className="box-title">Go deeper</strong><ul>{l.readings.map(r => readingById(r) && <li key={r}><a href={href('read', r)}>{readingById(r)!.title}</a></li>)}</ul></div>}
      {l.checkpoint && <div className="box box-ask"><a className="btn" href={href('workspace',u.id)}>Write this stage’s output →</a><strong className="box-title">Unit output</strong>{u.output}. When the mandate is written, ideas that pass to preparation can be written up in the <a href={href('pipeline')}>Green Gram project pipeline</a>.</div>}
      <div className="pager">
        <a className="btn btn-ghost" href={href('framework')}>← The pathway</a>
        {next && next.unit === l.unit ? <a className="btn" href={href('framework', 'lesson', next.id)}>Next lesson: {next.title} →</a> : <a className="btn" href={href('framework')}>{l.checkpoint ? `${u.name} finished. Back to the pathway` : 'Back to the pathway'} →</a>}
      </div>
    </article>
  );
  return (
    <article className="fw-lesson hue-green">
      <p className="crumbs"><a href={href()}>Home</a> / <a href={href('framework')}>Framework</a> / {u.name}</p>
      <p className="eyebrow">{u.name} · {l.title}</p>
      <div className="fw-progress" role="progressbar" aria-valuemin={0} aria-valuemax={l.cards.length} aria-valuenow={i + 1} aria-label="Lesson progress"><span style={{ width: `${((i + 1) / l.cards.length) * 100}%` }} /></div>
      <p className="meta">{i + 1} of {l.cards.length}{p.lessons.includes(l.id) ? ' · done before' : ''}</p>
      {card.kind === 'read' && <><h1>{card.title}</h1><div className="prose"><Markdown src={card.body} /></div>{card.terms && <TermList ids={card.terms} />}{l.watch && i === 0 && <p className="box box-warn"><strong className="box-title">Watch for</strong>{l.watch}</p>}<button className="btn" onClick={advance}>{last ? 'Finish lesson →' : 'Continue →'}</button></>}
      {card.kind === 'play' && <><p className="eyebrow">Physical exercise</p><h1>{card.title}</h1><div className="prose box box-ask"><Markdown src={card.body} /></div><button className="btn" onClick={advance}>{last ? 'Finish checkpoint →' : 'Continue →'}</button></>}
      {card.kind === 'choice' && <ChoiceCard key={i} c={card} onDone={advance} />}
      {card.kind === 'match' && <MatchCard key={i} c={card} onDone={advance} />}
      <p className="fine">Source: {l.source}</p>
    </article>
  );
}

function GlossaryPage() {
  const rows = Object.values(GLOSSARY).sort((a, b) => a.term.localeCompare(b.term));
  return (
    <div className="hue-green">
      <p className="crumbs"><a href={href()}>Home</a> / <a href={href('framework')}>Framework</a> / Glossary</p>
      <h1>Glossary</h1>
      <p className="lead">Terms the pathway uses. Each is added as its lesson introduces it.</p>
      <dl className="fw-gloss">{rows.map(r => <div key={r.term}><dt>{r.term}</dt><dd>{r.def}</dd></div>)}</dl>
    </div>
  );
}

function StagePage({ id }: { id: string }) {
  const u = UNITS.find(x => x.id === id);
  const st = STAGES[id];
  if (!u || !st) return <NotFound />;
  const prev = UNITS[u.n - 2], next = UNITS[u.n];
  const ls = lessonsIn(u.id);
  const to = (t: string) => t === '@skills' ? href('skills') : t === '@pipeline' ? href('pipeline') : href('framework', ...t.split('/'));
  return (
    <article className="hue-green fw-stage">
      <p className="crumbs"><a href={href()}>Home</a> / <a href={href('framework')}>Framework</a> / {u.name}</p>
      <p className="eyebrow">Stage {u.n} of 6</p>
      <h1>{u.name}</h1>
      <p className="lead">{u.question}</p>
      <p>{st.intro}</p>
      <div className="fw-vars">
        {st.variables.map(v => (
          <section key={v.title} className="fw-var">
            <h2>{v.title}</h2>
            <p>{v.body}</p>
            {v.link && <p><a href={to(v.link.to)}>{v.link.label} →</a></p>}
          </section>
        ))}
      </div>
      {st.lens && <p className="box box-note"><strong className="box-title">Rights lens</strong>Ask this at every stage, not only here: who is left out, who carries the risk, and who decides.</p>}
      <p className="box box-ask"><strong className="box-title">Output of this stage</strong>{u.output}.</p>
      {u.stallBefore && <p className="box box-warn"><strong className="box-title">Where the work stalls</strong>{u.stallBefore}.</p>}
      {ls.length > 0 && <div className="fw-stage-lessons"><p><a className="btn" href={href('workspace',u.id)}>Work on this stage’s output →</a></p><h2>Lessons</h2><ul>{ls.map(l => <li key={l.id}><a href={href('framework', 'lesson', l.id)}>{l.title}</a> <small>{l.minutes} min</small></li>)}</ul></div>}
      <div className="pager">
        {prev ? <a className="btn btn-ghost" href={href('framework', 'stage', prev.id)}>← {prev.name}</a> : <a className="btn btn-ghost" href={href('framework')}>← The map</a>}
        {next ? <a className="btn" href={href('framework', 'stage', next.id)}>{next.name} →</a> : <a className="btn" href={href('framework')}>Back to the map →</a>}
      </div>
    </article>
  );
}

export default function Framework({ parts }: { parts: string[] }) {
  const [a, b] = parts;
  if (!a) return <PathScreen />;
  if (a === 'glossary') return <GlossaryPage />;
  if (a === 'stage' && b) return <StagePage id={b} />;
  if (a === 'lesson' && b) { const l = lessonById(b); return l ? <LessonPlayer key={b} l={l} /> : <NotFound />; }
  return <NotFound />;
}
void go; void first;
