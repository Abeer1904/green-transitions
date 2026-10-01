import { href } from '../router';
import { useProgress } from '../progress';
import { LESSONS } from '../content/framework';

const PARTS = [
  { to: () => href('framework'), n: '1', name: 'Framework', line: 'Six steps from a national goal to a funded, working local project.' },
  { to: () => href('learn'), n: '2', name: 'Learn', line: 'Short courses and a skills pathway, with a CV builder.' },
  { to: () => href('play'), n: '3', name: 'Play', line: 'Scenarios a group plays to practise hard decisions.' },
  { to: () => 'pipeline/index.html', n: '4', name: 'Projects', line: 'A directory where local projects meet partners.' },
];

export default function Home() {
  const p = useProgress();
  const started = LESSONS.some(l => p.lessons.includes(l.id));
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Gram Urja</p>
        <h1>From zero to one on your climate journey</h1>
        <p className="lead">How does a village or a small city take a national climate goal and make it local? Filter it, learn what it means, find solutions, turn them into projects, fund them and build them. This site walks you through each step.</p>
        <p><a className="btn btn-big" href={href('framework')}>{started ? 'Continue the framework' : 'Start with the framework'} →</a></p>
      </section>
      <section>
        <div className="home-four">
          {PARTS.map(x => <a key={x.name} className="home-part" href={x.to()}><span className="step-n">{x.n}</span><div><h2>{x.name}</h2><p>{x.line}</p></div></a>)}
        </div>
      </section>
    </>
  );
}
