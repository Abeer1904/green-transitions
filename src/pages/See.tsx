import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { JOURNEYS, readingById, skillById, trackById } from '../content';
import { useLocalizer } from '../content/localize';
import { dungKg, surya } from '../content/tools';
import { go, href } from '../router';
import { markSeen } from '../progress';
import BiogasScene from '../viz/BiogasScene';
import SolarScene from '../viz/SolarScene';
import { NotFound } from './Track';

/** Rule of thumb from the directory: a 2 m³ plant is typically fed ~50 kg dung/day, roughly 4–5 animals. */
function FeedstockCheck() {
  const { t } = useTranslation();
  const [animals, setAnimals] = useState(3);
  const kg = dungKg(animals);
  const tone = animals >= 4 ? 'good' : animals === 3 ? 'mid' : 'low';
  return (
    <section className="tool">
      <h2>{t('see.feed.title')}</h2>
      <p>{t('see.feed.prompt')}</p>
      <label className="slider">{t('see.feed.cattle')} <strong>{animals}</strong>
        <input type="range" min={1} max={10} value={animals} onChange={e => setAnimals(Number(e.target.value))} aria-valuetext={t('see.feed.unit', { n: animals })} />
      </label>
      <div className="meter" aria-hidden="true"><div className="meter-fill" style={{ width: `${Math.min(100, (kg / 50) * 100)}%` }} /></div>
      <p className="meter-caption"><Trans i18nKey="see.feed.caption" values={{ kg }} components={{ b: <strong /> }} /></p>
      <p className={`verdict verdict-${tone}`}>{t(`see.feed.${tone}`)}</p>
      <p className="fine">{t('see.feed.fine')}</p>
    </section>
  );
}

const inr = (n: number) => '₹' + n.toLocaleString('en-IN');
function SubsidyCalc() {
  const { t } = useTranslation();
  const [kw, setKw] = useState(2);
  const note = kw > 3 ? 'over' : kw === 3 ? 'cap' : 'base';
  return (
    <section className="tool">
      <h2>{t('see.sub.title')}</h2>
      <p>{t('see.sub.prompt')}</p>
      <label className="slider">{t('see.sub.size')} <strong>{t('see.sub.unit', { n: kw })}</strong>
        <input type="range" min={1} max={5} step={1} value={kw} onChange={e => setKw(Number(e.target.value))} aria-valuetext={t('see.sub.unit', { n: kw })} />
      </label>
      <div className="bars" aria-hidden="true">{[1, 2, 3, 4, 5].map(n => <div key={n} className={n === kw ? 'bar on' : 'bar'} style={{ height: `${(surya(n) / 78000) * 100}%` }}><span>{n}</span></div>)}</div>
      <p className="meter-caption"><Trans i18nKey="see.sub.caption" values={{ amount: inr(surya(kw)) }} components={{ b: <strong /> }} /></p>
      <p className={`verdict verdict-${kw > 3 ? 'mid' : 'good'}`}>{t(`see.sub.${note}`)}</p>
      <p className="fine">{t('see.sub.fine')}</p>
    </section>
  );
}

export default function See({ id }: { id: string }) {
  const { t } = useTranslation();
  const L = useLocalizer();
  const base = trackById(id);
  const raw = JOURNEYS[id as keyof typeof JOURNEYS];
  const journey = raw ? L.journey(id, raw) : undefined;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focus, setFocus] = useState("all");
  const [showComponents, setShowComponents] = useState(false);
  const count = journey?.stages.length ?? 1;
  useEffect(() => { if (raw) markSeen(id); }, [id, raw]);
  useEffect(() => { setI(0); }, [id]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && (/INPUT|TEXTAREA|SELECT|BUTTON|SUMMARY/.test(e.target.tagName) || e.target.isContentEditable || e.target.closest('.scene-wrap'))) return;
      if (e.key === 'ArrowRight') setI(v => Math.min(v + 1, count - 1));
      if (e.key === 'ArrowLeft') setI(v => Math.max(v - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count]);
  if (!base || !journey) return <NotFound />;
  const tr = L.track(base);
  const s = journey.stages[i];
  const last = count - 1;
  const label = t('see.scene', { day: s.day, title: s.title, state: s.state });
  const enReading = raw!.stages[i].readingId ? readingById(raw!.stages[i].readingId!) : undefined;
  const reading = enReading ? L.reading(enReading) : undefined;
  const skillIds = raw!.stages[i].skills;
  return (
    <div className={`hue-${base.hue}`}>
      <p className="crumbs"><a href={href()}>{t('nav.home')}</a> / <a href={href('track', base.id)}>{tr.short}</a> / 0→1</p>
      <p className="eyebrow">{t('see.eyebrow')}</p>
      <h1>{t('see.title', { name: tr.short })}</h1>
      <p className="lead">{journey.intro}</p>

      <div className="stage-card">
        <div className="scene-tools">
          <div><p className="eyebrow">{t(i < 3 ? 'engineering.planning' : i === 3 ? 'engineering.construction' : 'engineering.operating')}</p><strong>{t(`engineering.${id}.title`)}</strong></div>
          <button className="pill" aria-pressed={paused} onClick={() => setPaused(p => !p)}>{t(paused ? 'sceneDetail.resume' : 'sceneDetail.pause')}</button>
        </div>
        <p className="diagram-scroll-hint">{t('engineering.scroll')}</p>
        <div className={`scene-wrap focus-${focus} ${paused ? 'scene-paused' : ''}`} tabIndex={0} role="region" aria-label={t(`engineering.${id}.title`)}>

          {id === 'biogas' ? <BiogasScene stage={i} label={label} /> : <SolarScene stage={i} label={label} />}
          
        </div>
        <div className="scene-explainer">
          <div className="scene-flow-controls" role="group" aria-label={t('sceneDetail.focus')}>
            <button className="pill" aria-pressed={focus === 'all'} onClick={() => setFocus('all')}>{t('sceneDetail.all')}</button>
            {['input', 'energy', 'output'].map((kind, n) => <button key={kind} className="pill" aria-pressed={focus === kind} onClick={() => setFocus(kind)}><span className={`flow-key flow-key-${id}-${kind}`}>{n + 1}</span>{t(`sceneDetail.${id}.${kind}`)}</button>)}
          </div>
          <p className="scene-flow-caption" aria-live="polite">{t(i < 4 ? `sceneDetail.${id}.before` : `sceneDetail.${id}.${focus}Detail`)}</p>
          <button className="link-btn" aria-expanded={showComponents} onClick={() => setShowComponents(v => !v)}>{t('engineering.components')} {showComponents ? '−' : '+'}</button>
          {showComponents && <ol className="component-notes">{(t(`engineering.${id}.notes`, { returnObjects: true }) as string[]).map(note => <li key={note}>{note}</li>)}</ol>}
          <details className="diagram-sources"><summary>{t('engineering.sources')}</summary><p>{t('engineering.scope')}</p><a href={id === 'biogas' ? 'https://energypedia.info/images/2/2c/Biogas_gate_volume_2.pdf' : 'https://www.fao.org/fileadmin/user_upload/gacsa/docs/GACSA_Practice_brief_SolarIrrigation_v5.pdf'} target="_blank" rel="noreferrer">{id === 'biogas' ? 'GTZ / ISAT · Biogas Digest, Volume II' : 'FAO / GACSA · Solar-powered irrigation'} ↗</a></details>
        </div>
        <div className="rail" role="group" aria-label={t('see.rail')}>
          <span className="rail-end">0</span>
          <div className="rail-track">
            {journey.stages.map((st, n) => (
              <button key={n} className={`rail-dot ${n === i ? 'current' : ''} ${n < i ? 'past' : ''}`} onClick={() => { setI(n); setFocus("all"); }} aria-current={n === i ? 'step' : undefined} aria-label={`${st.day}: ${st.title}`}>
                <span>{n}</span>
              </button>
            ))}
          </div>
          <span className="rail-end">1</span>
        </div>
        <div className="stage-body">
          <p className="eyebrow">{t('engineering.stage', { n: i + 1, total: count })}</p>
          <h2>{s.title}</h2>
          <p className="stage-state">{s.state}</p>
          <div className="cols">
            <div><h3>{t('see.people')}</h3><ul>{s.actions.map(a => <li key={a}>{a}</li>)}</ul></div>
            <div><h3>{t('see.skills')}</h3>
              {skillIds.length
                ? <ul className="chips">{skillIds.map(sid => { const k = skillById(sid); return k && <li key={sid}><a className="chip" href={href('skills', base.id)}>{L.skill(k).name}</a></li>; })}</ul>
                : <p className="meta">{t('see.noSkills')}</p>}
            </div>
          </div>
          <div className="box box-ask"><strong className="box-title">{t('see.ask')}</strong><ul>{s.ask.map(a => <li key={a}>{a}</li>)}</ul></div>
          <div className="box box-warn"><strong className="box-title">{t('see.watch')}</strong><p>{s.watch}</p></div>
          {reading && <p><a href={href('read', reading.id)}>{t('common.readMoreArrow', { title: reading.title })}</a></p>}
        </div>
        <div className="pager">
          <button className="btn btn-ghost" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}>{t('see.back')}</button>
          {i < last
            ? <button className="btn" onClick={() => setI(i + 1)}>{t('see.next', { title: journey.stages[i + 1].title })}</button>
            : <button className="btn" onClick={() => go('track', base.id)}>{t('see.done')}</button>}
        </div>
        {i === last && <div className="box box-note"><strong className="box-title">{t('see.oneMeans')}</strong><p>{journey.one}</p></div>}
      </div>

      {id === 'biogas' ? <FeedstockCheck /> : <SubsidyCalc />}

      <p className="next-links"><a className="btn btn-ghost" href={href('track', base.id)}>{t('see.backToTrack', { name: tr.short })}</a> <a className="btn" href={href('pathway', base.id)}>{t('see.plan')}</a></p>
    </div>
  );
}
