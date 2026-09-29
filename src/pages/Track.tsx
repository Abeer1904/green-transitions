import { Trans, useTranslation } from 'react-i18next';
import { JOURNEYS, QUIZZES, SCENARIOS, SKILLS, readingsFor, trackById } from '../content';
import { useLocalizer } from '../content/localize';
import { href } from '../router';
import { useProgress } from '../progress';

export default function Track({ id }: { id: string }) {
  const { t } = useTranslation();
  const L = useLocalizer();
  const base = trackById(id);
  const p = useProgress();
  if (!base) return <NotFound />;
  const tr = L.track(base);
  const readings = readingsFor(base.id).map(L.reading);
  const journey = JOURNEYS[base.id];
  const scenarios = SCENARIOS.filter(s => s.track === base.id).map(L.scenario);
  const quiz = QUIZZES[base.id];
  const skills = SKILLS.filter(s => s.track === base.id);
  const read = readings.filter(r => p.read.includes(r.id)).length;
  const notes = Object.values(p.notes[base.id] || {}).filter(n => n.decided || n.who).length;
  const crumbs = <p className="crumbs"><a href={href()}>{t('nav.home')}</a> / {tr.short}</p>;

  if (base.status === 'soon') return (
    <>
      <p className="crumbs"><a href={href()}>{t('nav.home')}</a></p>
      <h1>{tr.name}</h1>
      <p className="lead">{tr.tagline}</p>
      <p className="box box-note">{t('track.soonNote')}</p>
    </>
  );

  return (
    <div className={`hue-${base.hue}`}>
      {crumbs}
      <h1>{tr.name}</h1>
      <p className="lead">{tr.tagline}</p>
      {base.status === 'preview' && <p className="box box-note"><Trans i18nKey="track.preview" components={{ b: <strong /> }} /></p>}

      <ol className="path">
        <li>
          <span className="step-n">1</span>
          <div><h2>{t('track.readTitle')}</h2><p>{t('track.readDesc', { count: readings.length, done: read })}</p>
            <ul className="reading-list">
              {readings.map(r => <li key={r.id}><a href={href('read', r.id)}>{p.read.includes(r.id) ? '✓ ' : ''}{r.title}</a><span className="meta"> · {t('common.minutes', { count: r.minutes })}{r.kind !== 'reading' ? ` · ${t(`reading.kind.${r.kind}`)}` : ''}</span></li>)}
            </ul>
          </div>
        </li>
        {journey && <li>
          <span className="step-n">2</span>
          <div><h2>{t('track.seeTitle')}</h2><p>{L.journey(base.id, journey).intro}</p><a className="btn" href={href('see', base.id)}>{p.seen.includes(base.id) ? t('track.openAgain') : t('track.open01')}</a></div>
        </li>}
        {scenarios.length > 0 && <li>
          <span className="step-n">3</span>
          <div><h2>{t('track.tryTitle')}</h2><p>{t('track.tryDesc')}</p>
            <div className="grid">
              {scenarios.map(s => {
                const total = Object.values(s.nodes).filter(n => n.end).length;
                const found = (p.ends[s.id] || []).length;
                return <a key={s.id} className="card" href={href('try', s.id)}><span className="chip">{s.kind === 'skills' ? t('track.chipSkills') : t('track.chipVillage')}</span><h3>{s.title}</h3><p>{s.blurb}</p><p className="meta">{t('track.endingsFound', { minutes: s.minutes, found, total })}</p></a>;
              })}
            </div>
          </div>
        </li>}
        {quiz && <li>
          <span className="step-n">4</span>
          <div><h2>{t('track.checkTitle')}</h2><p>{t('track.checkDesc', { count: quiz.length })} {p.quiz[base.id] ? t('track.best', { best: p.quiz[base.id].best, total: p.quiz[base.id].total }) : ''}</p><a className="btn" href={href('check', base.id)}>{t('track.takeQuiz')}</a></div>
        </li>}
        <li>
          <span className="step-n">5</span>
          <div><h2>{t('track.skillsTitle')}</h2><p>{t('track.skillsDesc', { count: skills.length })}</p><a className="btn" href={href('skills', base.id)}>{t('track.seeSkills', { name: tr.short })}</a></div>
        </li>
        {journey && <li>
          <span className="step-n">6</span>
          <div><h2>{t('track.pathTitle')}</h2><p>{t('track.pathDesc')} {notes ? t('track.pathFilled', { count: notes }) : ''}</p><a className="btn" href={href('pathway', base.id)}>{t('track.planBtn')}</a></div>
        </li>}
      </ol>
    </div>
  );
}

export function NotFound() {
  const { t } = useTranslation();
  return <><h1>{t('common.notFound')}</h1><p><a href={href()}>{t('common.backToStart')}</a></p></>;
}
