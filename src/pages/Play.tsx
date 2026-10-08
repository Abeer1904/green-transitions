import { SCENARIOS } from '../content';
import { href } from '../router';
import { useProgress } from '../progress';

const SOON = [
  { title: 'Enabling environment', line: 'Who has to do what, in which office, for a project to move. Played in a group with roles.' },
  { title: 'Bijli theft', line: 'Why electricity is lost and what a district can and cannot do about it.' },
];

export default function Play() {
  const p = useProgress();
  const found = (id: string) => Object.keys(p.ends).includes(id);
  return (
    <div className="hue-green">
      <p className="crumbs"><a href={href()}>Home</a> / Play</p>
      <p className="eyebrow">Play · the capacity-building tool</p>
      <h1>Practise the decision before you make it</h1>
      <p className="lead">Scenarios are how people build the skills the framework asks for. A group takes roles, meets a real constraint and decides together, before any money or land is committed. They run through every stage, from Filter to Implement.</p>
      <section className="learning-case"><h2>Navapur: a group workshop</h2><p>A facilitated story and workshop: people, peak, problems, solutions and an unexpected change.</p><a className="btn" href={href('navapur')}>How the workshop runs →</a></section><h2 className="section-title">Practise a specific decision</h2>
      <div className="lc-list">
        {SCENARIOS.map(s => (
          <a key={s.id} className="lc-card" href={href('try', s.id)}>
            <span className="step-n">▶</span>
            <div><h2>{s.title}</h2><p>{s.blurb}</p><p className="meta">{s.kind === 'skills' ? 'Skills choice' : 'Project decision'} · {s.minutes} min{found(s.id) ? ' · played' : ''}</p></div>
          </a>
        ))}
      </div>
      <h2 className="section-title">In design</h2>
      <div className="lc-list">
        {SOON.map(s => (
          <div key={s.title} className="lc-card soon">
            <span className="step-n">…</span>
            <div><h2>{s.title}</h2><p>{s.line}</p><p className="meta">Coming soon · digital version and a facilitator kit for a group in a room</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
