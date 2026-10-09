import IllustratedSystem from '../viz/IllustratedSystem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SolarScene from '../viz/SolarScene';
import BiogasScene from '../viz/BiogasScene';
import BiogasExplorer from '../viz/BiogasExplorer';
import NextObservation from '../viz/NextObservation';
import SolarExplorer from '../viz/SolarExplorer';
import WaterScene from '../viz/WaterScene';
import WaterExplorer from '../viz/WaterExplorer';
import { href } from '../router';
import { NotFound } from './Track';

type Tech = { id: 'solar' | 'biogas' | 'water'; name: string; line: string; reads: string; source: { label: string; url?: string } };

const LIVE: Tech[] = [
  { id: 'solar', name: 'Solar-powered irrigation', line: 'How sunlight becomes water at a field: panels, controller, pump, tank and outlet.', reads: 'Panels convert sunlight to electricity, a controller manages power to a submersible pump, and water travels in a separate pipe to storage and the field.', source: { label: 'FAO / GACSA · Solar-powered irrigation', url: 'https://www.fao.org/fileadmin/user_upload/gacsa/docs/GACSA_Practice_brief_SolarIrrigation_v5.pdf' } },
  { id: 'biogas', name: 'Fixed-dome biogas plant', line: 'How dung becomes cooking gas and slurry: mixing tank, digester, gas line and outlet.', reads: 'Dung and water enter a sealed digester, microbes produce gas that collects above the slurry, gas travels through a valve to the stove, and displaced slurry leaves through the outlet.', source: { label: 'GTZ / ISAT · Biogas Digest, Volume II', url: 'https://energypedia.info/images/2/2c/Biogas_gate_volume_2.pdf' } },
  { id: 'water', name: 'Rain capture and recharge', line: 'How rain is caught, stored and sent underground: roof, filter, tank, recharge pit, johad and water table.', reads: 'Rain falls on a roof and passes a first-flush filter into a tank. When the tank is full, the overflow goes through a recharge pit to the ground, and a johad holds runoff so some of it seeps down to the water table.', source: { label: 'Green Skill Directory · Rainwater harvesting and watershed management' } },
];

const SOON = [
  { name: 'Rooftop solar, grid-connected', line: 'Panels, inverter, meters and the grid, and what happens in an outage.' },
  { name: 'Crop residue gasification', line: 'From stubble to fuel gas.' },
  { name: 'Soil carbon and regenerative practice', line: 'How manure, residues and cover build carbon over years.' },
];

const STAGES = [
  { key: 'plan', label: 'Planning', stage: 2 },
  { key: 'build', label: 'Installation', stage: 3 },
  { key: 'run', label: 'Operating', stage: 5 },
] as const;

function Hub() {
  const [activity,setActivity]=useState('all');
  return (
    <div className="hue-green">
      <p className="crumbs"><a href={href()}>Home</a> / Visualise</p>
      <p className="eyebrow">Visualise · how technologies work</p>
      <h1>Start with what energy makes possible</h1>
      <p className="lead">Choose an everyday activity. Explore its energy system, the people it depends on and the questions to investigate in your place.</p>
      <div className="place-switch" role="group" aria-label="Activity">{[['all','All available systems'],['solar','Irrigation'],['biogas','Cooking & organic waste'],['water','Rain & recharge']].map(([id,name])=><button className="pill" key={id} aria-pressed={activity===id} onClick={()=>setActivity(id)}>{name}</button>)}</div><div className="visual-atlas">
        {LIVE.filter(t=>activity==='all'||activity===t.id).map(t => (
          <a key={t.id} className="atlas-entry" href={href('visualise', t.id)}>
            <div className="atlas-preview"><img className="atlas-art" loading="lazy" src={`illustrations/${t.id}.png`} alt={`Illustrated ${t.name.toLowerCase()} installation`}/></div>
            <div className="atlas-caption"><p className="eyebrow">Interactive system · {t.id === 'solar' ? '01' : t.id === 'biogas' ? '02' : '03'}</p><h2>{t.name}</h2><p>{t.line}</p><span>Explore the system →</span></div>
          </a>
        ))}
      </div>
      <section className="learning-case"><h2>Investigate the whole activity</h2><p>Look beyond equipment: what energy is used, what emissions need assessing, whose time and work are affected, and who controls access?</p><a href={href('projects')}>Take these questions into a local project →</a></section><details className="learning-resources"><summary>Other systems planned</summary>
      <div className="lc-list">
        {SOON.map(t => (
          <div key={t.name} className="lc-card soon">
            <span className="step-n">…</span>
            <div><h2>{t.name}</h2><p>{t.line}</p></div>
          </div>
        ))}
      </div></details>
    </div>
  );
}

function Detail({ tech }: { tech: Tech }) {
  const { t } = useTranslation();
  const id = tech.id;
  const [stageKey, setStageKey] = useState<(typeof STAGES)[number]['key']>('run');
  const [focus, setFocus] = useState('all');
  const [paused, setPaused] = useState(false);
  const [view,setView]=useState<'illustration'|'process'>('illustration');
  const [showComponents, setShowComponents] = useState(false);
  const stage = STAGES.find(s => s.key === stageKey)!.stage;
  const label = t(`engineering.${id}.title`);
  const operating = stageKey === 'run';
  return (
    <div className="hue-green">
      <p className="crumbs"><a href={href()}>Home</a> / <a href={href('visualise')}>Visualise</a> / {tech.name}</p>
      <p className="eyebrow">Visualise</p>
      <h1>{tech.name}</h1>
      <p className="lead">{tech.reads}</p>
      <div className="place-switch" role="group" aria-label="Visualisation view"><button className="pill" aria-pressed={view==='illustration'} onClick={()=>setView('illustration')}>In the landscape</button><button className="pill" aria-pressed={view==='process'} onClick={()=>setView('process')}>How it works · animated diagram</button></div>
      {view==='illustration' && <IllustratedSystem id={id}/>}
      <div className="stage-card" hidden={view!=='process'}>
        <div className="scene-tools">
          <div role="group" aria-label="Stage" className="viz-stages">
            {STAGES.map(s => <button key={s.key} className="pill" aria-pressed={stageKey === s.key} onClick={() => { setStageKey(s.key); setFocus('all'); }}>{s.label}</button>)}
          </div>
          <button className="pill" aria-pressed={paused} onClick={() => setPaused(p => !p)}>{t(paused ? 'sceneDetail.resume' : 'sceneDetail.pause')}</button>
        </div>
        {id === 'solar'
          ? <div className={`focus-${focus}`}><SolarExplorer stage={stage} paused={paused} label={label} /></div>
          : id === 'water'
          ? <div className={`focus-${focus}`}><WaterExplorer stage={stage} paused={paused} label={label}/></div>
          : <div className={`focus-${focus}`}><BiogasExplorer stage={stage} paused={paused} label={label}/></div>}

        <div className="scene-explainer">
          <div className="scene-flow-controls" role="group" aria-label={t('sceneDetail.focus')}>
            <button className="pill" aria-pressed={focus === 'all'} onClick={() => setFocus('all')}>{t('sceneDetail.all')}</button>
            {['input', 'energy', 'output'].map((kind, n) => <button key={kind} className="pill" aria-pressed={focus === kind} onClick={() => setFocus(kind)}><span aria-hidden="true" className={`flow-key flow-key-${id}-${kind}`}>↝</span>{t(`sceneDetail.${id}.${kind}`)}</button>)}
          </div>
          <p className="scene-flow-caption" aria-live="polite">{operating ? t(`sceneDetail.${id}.${focus}Detail`) : t(`sceneDetail.${id}.before`)}</p>
          <button className="link-btn" aria-expanded={showComponents} onClick={() => setShowComponents(v => !v)}>{t('engineering.components')} {showComponents ? '−' : '+'}</button>
          {showComponents && <ol className="component-notes">{(t(`engineering.${id}.notes`, { returnObjects: true }) as string[]).map(n => <li key={n}>{n}</li>)}</ol>}
          <details className="diagram-sources"><summary>{t('engineering.sources')}</summary><p>{t(`engineering.${id}.scope`, { defaultValue: t('engineering.scope') })}</p>{tech.source.url ? <a href={tech.source.url} target="_blank" rel="noreferrer">{tech.source.label} ↗</a> : <p>{tech.source.label}</p>}</details>
        </div>
      </div>
      <section className="system-questions"><h2>Who and what changes with this system?</h2><div className="tool-paths"><div><h3>Energy & emissions</h3><p>{id==='water'?'What water does the village use now, from where, and how much of it needs pumping? Record pump hours and fuel or electricity use before estimating any emissions change.':id==='solar'?'What currently powers irrigation? Record fuel or electricity use, water demand and the comparison needed before estimating any emissions change.':'What cooking fuel and waste handling would this replace? Investigate feedstock, gas losses and actual use before estimating an emissions change.'}</p></div><div><h3>Gender, work & access</h3><p>{id==='water'?'Who fetches water, and how far? Who owns the roofs, ponds and land the structures sit on? Who can train as a mason or tester, and who looks after upkeep?':id==='solar'?'Who owns the land, controls the pump and sets the water schedule? Who can attend training, and who is excluded from the service?':'Who collects feedstock and water, cooks and handles slurry? Whose time changes, who makes decisions and who can access training?'}</p></div><div><h3>Service & impact</h3><p>Which daily activity should improve? Agree with affected people what to observe, whose experience to include and when to review the result.</p></div><div><h3>People & capabilities</h3><p>Explore the roles needed to keep the service working, then identify existing skills and gaps.</p><a href={href('skills',id)}>Explore skills →</a></div></div><p className="fine">These are investigation prompts, not measured impacts. The diagrams show qualitative behaviour, not calculated emissions or engineering designs.</p></section><NextObservation id={id}/><h2 className="section-title">Reference and pathway</h2>
      <div className="journey-links">
        {id !== 'water' && <a href={href('see', id)}>From nothing to a working service, step by step →</a>}
        <a href={href('skills', id)}>Skills and training for this technology →</a>
        <a href={href('track', id)}>Readings →</a>
      </div>
    </div>
  );
}

export default function Visualise({ parts }: { parts: string[] }) {
  const [id] = parts;
  if (!id) return <Hub />;
  const tech = LIVE.find(x => x.id === id);
  return tech ? <Detail key={id} tech={tech} /> : <NotFound />;
}
