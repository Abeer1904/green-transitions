import { useState } from 'react';
import { ACTIVITIES, IDENTITIES, whoLine, type Line, type Source } from '../content/dayGame';
import { href } from '../router';

const KIND: Record<Source['kind'], string> = {
  biomass: 'Burned wood, dung or residue', lpg: 'LPG', biogas: 'Biogas', grid: 'Grid electricity', sun: 'Sun', rain: 'Rain', diesel: 'Diesel', body: 'Body effort', none: 'Went without',
};
type Seq = { who: string; act: string; src: string };

function Fact({ line }: { line: Line }) {
  return <>
    <p>{line.text}</p>
    {line.tag
      ? <p className="meta"><a href={href('read', line.tag.id)}>Evidence: {line.tag.label} →</a></p>
      : line.check ? <p className="meta">A pattern to check in your village, not a finding.</p> : null}
  </>;
}

const find = (q: Seq) => {
  const who = IDENTITIES.find(i => i.id === q.who)!;
  const act = ACTIVITIES.find(a => a.id === q.act)!;
  const src = act.sources.find(s => s.id === q.src)!;
  return { who, act, src };
};

export default function DayGame() {
  const [who, setWho] = useState('');
  const [act, setAct] = useState('');
  const [src, setSrc] = useState('');
  const [day, setDay] = useState<Seq[]>([]);
  const [done, setDone] = useState(false);

  const activity = ACTIVITIES.find(a => a.id === act);
  const source = activity?.sources.find(s => s.id === src);
  const identity = IDENTITIES.find(i => i.id === who);
  const complete = !!(identity && activity && source);
  const added = complete && day.some(d => d.who === who && d.act === act && d.src === src);
  const phase = !who ? 1 : !act ? 2 : !src ? 3 : 4;

  const add = () => { if (complete && !added) { setDay([...day, { who, act, src }]); setWho(''); setAct(''); setSrc(''); } };
  const crumbs = <p className="crumbs"><a href={href()}>Home</a> / <a href={href('play')}>Play</a> / A day in Navapur</p>;

  if (done) {
    const rows = day.map(find);
    const n = (f: (s: Source) => boolean) => rows.filter(r => f(r.src)).length;
    return (
      <div className="hue-green">
        {crumbs}
        <p className="eyebrow">A day in Navapur · your day</p>
        <h1>Your day, as sequences</h1>
        <p className="lead">Each line is a person, an activity and an energy source. Read down the list for who carries what, then across each line for what follows.</p>
        <div className="day-tally">
          <div><strong>{n(s => !!s.smoke)} of {rows.length}</strong><span>involve smoke in the home</span></div>
          <div><strong>{n(s => ['biomass', 'lpg', 'diesel'].includes(s.kind))} of {rows.length}</strong><span>burn a bought or gathered fuel</span></div>
          <div><strong>{n(s => !!s.pump)} of {rows.length}</strong><span>pull groundwater with a powered pump</span></div>
          <div><strong>{n(s => s.kind === 'body')} of {rows.length}</strong><span>run on body effort</span></div>
        </div>
        <p className="fine">These are counts of your sequences, not measured energy, health or emissions.</p>
        <div className="lc-list">
          {IDENTITIES.filter(i => rows.some(r => r.who.id === i.id)).map(i => (
            <div key={i.id} className="lc-card">
              <span className="step-n">▸</span>
              <div><h2>{i.label}</h2>
                {rows.filter(r => r.who.id === i.id).map((r, k) => <p key={k}><strong>{r.who.short} + {r.act.title} + {r.src.label}</strong><br />{r.src.health.text}</p>)}
              </div>
            </div>
          ))}
        </div>
        <section className="learning-case"><h2>Talk about it together</h2>
          <p>Who in your village is in each sequence, and for how many hours? Which one would you change first, and what would it cost? Which would the person in it change if they decided?</p>
          <p><a href={href('learn', 'health')}>Cooking, energy and health: the course →</a> · <a href={href('visualise')}>See how the systems work →</a> · <a href={href('framework')}>Take it to the framework →</a></p>
        </section>
        <button className="btn btn-ghost" onClick={() => { setDay([]); setDone(false); }}>Play again</button>
      </div>
    );
  }

  return (
    <div className="hue-green">
      {crumbs}
      <p className="eyebrow">A day in Navapur · build a sequence</p>
      <h1>Who, doing what, with which energy</h1>
      <p className="lead">Pick a person, an activity and an energy source. The sequence shows what it uses and what follows for health and the environment. Build as many as you like, then read your day.</p>

      <div className="day-bar" aria-live="polite">
        <span className={who ? 'on' : ''}>{identity?.short ?? 'Who'}</span><b>+</b>
        <span className={act ? 'on' : ''}>{activity?.title ?? 'Activity'}</span><b>+</b>
        <span className={src ? 'on' : ''}>{source?.label ?? 'Energy source'}</span>
      </div>

      <h2 className="day-step">1 · Who</h2>
      <div className="day-grid" role="group" aria-label="Who">
        {IDENTITIES.map(i => <button key={i.id} className="day-tile" aria-pressed={who === i.id} onClick={() => setWho(i.id)}>{i.label}</button>)}
      </div>

      {phase >= 2 && <>
        <h2 className="day-step">2 · Doing what</h2>
        <div className="day-grid" role="group" aria-label="Activity">
          {ACTIVITIES.map(a => <button key={a.id} className="day-tile" aria-pressed={act === a.id} onClick={() => { setAct(a.id); setSrc(''); }}>{a.title}</button>)}
        </div>
      </>}

      {phase >= 3 && activity && <>
        <h2 className="day-step">3 · With which energy</h2>
        <p className="meta">{activity.prompt}</p>
        <div className="day-grid" role="group" aria-label="Energy source">
          {activity.sources.map(s => <button key={s.id} className="day-tile" aria-pressed={src === s.id} onClick={() => setSrc(s.id)}>{s.label}</button>)}
        </div>
      </>}

      {complete && identity && activity && source && <>
        <h2 className="day-step">The sequence</h2>
        <ol className="day-steps" aria-live="polite">
          <li><p className="eyebrow">For {identity.label.toLowerCase()}</p><Fact line={whoLine(activity.id, identity.id)} /></li>
          <li><p className="eyebrow">What it uses</p><Fact line={source.use} /></li>
          <li><p className="eyebrow">Health</p><Fact line={source.health} /></li>
          <li><p className="eyebrow">Environment</p><Fact line={source.env} /></li>
        </ol>
        <button className="btn" disabled={added} onClick={add}>{added ? 'Added to your day' : 'Add to my day'}</button>
      </>}

      {day.length > 0 && <section className="day-tray">
        <h2>Your day so far</h2>
        <ul>{day.map((d, k) => { const r = find(d); return <li key={k}><span>{r.who.short} + {r.act.title} + {r.src.label}</span><button className="link-btn" onClick={() => setDay(day.filter((_, j) => j !== k))}>Remove</button></li>; })}</ul>
        <button className="btn" onClick={() => setDone(true)}>Read my day</button>
      </section>}
    </div>
  );
}
