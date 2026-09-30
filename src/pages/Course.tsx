import { useTranslation } from 'react-i18next';
import { MODULES, moduleById, COURSE_UI as U } from '../content/course';
import { QUIZZES, SCENARIOS, readingById, trackById } from '../content';
import { useLocalizer } from '../content/localize';
import { href } from '../router';
import { setPath, useProgress } from '../progress';
import { NotFound } from './Track';

export function PathToggle({ compact = false }: { compact?: boolean }) {
  const p = useProgress();
  return (
    <div className="path-toggle no-print" role="group" aria-label={U.pathLabel}>
      <span>{U.pathLabel}</span>
      {(['learner', 'facilitator'] as const).map(k => <button key={k} className={p.path === k ? 'pill on' : 'pill'} aria-pressed={p.path === k} onClick={() => setPath(k)}>{U[k]}</button>)}
      {!compact && <p>{p.path === 'learner' ? U.learnerHint : U.facilitatorHint}</p>}
    </div>
  );
}

export default function Course({ id }: { id?: string }) {
  const { t } = useTranslation();
  const L = useLocalizer();
  const p = useProgress();
  const fac = p.path === 'facilitator';
  const readingIds = (m: (typeof MODULES)[number]) => [...m.practical, ...m.research];

  if (!id) return (
    <>
      <p className="crumbs"><a href={href()}>{t('nav.home')}</a> / {U.nav}</p>
      <h1>{U.title}</h1>
      <p className="lead">{U.lead}</p>
      <PathToggle />
      <h2 className="section-title">{U.modules}</h2>
      <ol className="mod-list">
        {MODULES.map(m => {
          const ids = readingIds(m);
          const done = ids.filter(r => p.read.includes(r)).length;
          const mins = ids.reduce((s, r) => s + (readingById(r)?.minutes ?? 0), 0);
          return (
            <li key={m.id}>
              <a className="card" href={href('course', m.id)}>
                <span className="mod-n">{m.n}</span>
                <span>
                  <h3>{m.title}</h3>
                  <p>{m.blurb}</p>
                  <p className="meta">{fac ? U.hours(m.sessionMinutes) : U.hours(mins)}{ids.length ? ` · ${U.readingsDone(done, ids.length)}` : ''}</p>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </>
  );

  const m = moduleById(id);
  if (!m) return <NotFound />;
  const i = MODULES.indexOf(m);
  const prev = MODULES[i - 1], next = MODULES[i + 1];
  const list = (ids: string[]) => ids.map(r => readingById(r)).filter(<T,>(x: T | undefined): x is T => !!x).map(L.reading);
  const scenarios = SCENARIOS.filter(s => m.scenarios.includes(s.id)).map(L.scenario);
  const Readings = ({ ids }: { ids: string[] }) => (
    <ul className="reading-list">
      {list(ids).map(r => <li key={r.id}><a href={href('read', r.id)}>{p.read.includes(r.id) ? '✓ ' : ''}{r.title}</a><span className="meta"> · {t('common.minutes', { count: r.minutes })}</span></li>)}
    </ul>
  );
  return (
    <article>
      <p className="crumbs"><a href={href()}>{t('nav.home')}</a> / <a href={href('course')}>{U.nav}</a> / {m.n}</p>
      <p className="eyebrow">{U.nav} · {fac ? U.hours(m.sessionMinutes) : U.hours(readingIds(m).reduce((s, r) => s + (readingById(r)?.minutes ?? 0), 0))}</p>
      <h1>{m.title}</h1>
      <p className="lead">{m.blurb}</p>
      <PathToggle />

      <aside className="box box-ask"><strong className="box-title">{U.objectives}</strong>
        <ul>{m.objectives.map(o => <li key={o}>{o}</li>)}</ul>
      </aside>

      <div className="mod-steps">
        {m.practical.length > 0 && <section className="mod-step"><h2>{U.step.practical}</h2><Readings ids={m.practical} /></section>}
        {m.research.length > 0 && <section className="mod-step"><h2>{U.step.research}</h2><Readings ids={m.research} /></section>}
        {scenarios.length > 0 && <section className="mod-step"><h2>{U.step.scenarios}</h2>
          <ul className="reading-list">{scenarios.map(s => <li key={s.id}><a href={href('try', s.id)}>{s.title}</a><span className="meta"> · {t('common.minutes', { count: s.minutes })} · {s.blurb}</span></li>)}</ul></section>}
        <section className="mod-step"><h2>{U.step.discuss}</h2>
          <p><strong>{U.opening}.</strong> {m.openingQuestion}</p>
          <p><strong>{U.task}.</strong> {m.task}</p>
        </section>
        {m.quizzes.length > 0 && <section className="mod-step"><h2>{U.step.check}</h2>
          <ul className="reading-list">{m.quizzes.filter(q => QUIZZES[q]).map(q => <li key={q}><a href={href('check', q)}>{U.quizFor(L.track(trackById(q)!).short)}</a></li>)}</ul></section>}
        {m.id === 'capstone' && <section className="mod-step"><h2>Plan</h2><p><a className="btn" href={href('workspace')}>Develop our project worksheets →</a></p>
          <ul className="reading-list">{['biogas', 'solar'].map(k => <li key={k}><a href={href('pathway', k)}>{L.track(trackById(k as 'biogas')!).short}: our pathway</a></li>)}</ul></section>}
      </div>

      {fac && <>
        <aside className="box box-facilitator"><strong className="box-title">{U.session} · {U.hours(m.sessionMinutes)}</strong>
          <table className="session-table"><tbody>{m.session.map(s => <tr key={s.what}><td>{U.minutes(s.minutes)}</td><td>{s.what}</td></tr>)}</tbody></table>
        </aside>
        <aside className="box box-facilitator"><strong className="box-title">{U.evidence}</strong><p>{m.evidenceNote}</p></aside>
      </>}

      <div className="pager">
        {prev ? <a className="btn btn-ghost" href={href('course', prev.id)}>← {prev.title}</a> : <a className="btn btn-ghost" href={href('course')}>← {U.back}</a>}
        {next ? <a className="btn" href={href('course', next.id)}>{next.title} →</a> : <a className="btn" href={href('course')}>{U.back} →</a>}
      </div>
    </article>
  );
}
