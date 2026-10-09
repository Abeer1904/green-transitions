import { href } from '../router';
import { UNITS } from '../content/framework';

const TOOLS = [
  ['visualise', '01', 'See how energy systems work', 'Follow solar irrigation and biogas systems. Explore their components, operating conditions and the people who use and maintain them.'],
  ['learn', '02', 'Learn about a topic', 'Follow a course, practise a decision or read the evidence behind a proposed solution.'],
  ['personal', '03', 'Find a role and build your skills', 'Find out what different roles involve, identify what you need to learn and record your experience in a CV.'],
  ['projects', '04', 'Develop a local project', 'Use the six-stage framework to define a problem, compare options and plan who will do what, with which resources.'],
];

const KIT: { title: string; line: string; links: [string, string][] }[] = [
  { title: 'Understand systems', line: 'Energy, everyday activities, emissions, gender and impacts, shown through diagrams you can explore.', links: [[href('visualise'), 'Visualisations'], [href('visualise', 'solar'), 'Solar irrigation'], [href('visualise', 'biogas'), 'Biogas plant']] },
  { title: 'Learn and build skills', line: 'Courses, practice, roles, learning pathways and a CV builder for the people doing the work.', links: [[href('learn'), 'Courses'], [href('practice'), 'Guided practice'], [href('personal'), 'Roles and CV'], [href('skills'), 'Skills directory']] },
  { title: 'Develop a local transition', line: 'The six-stage framework and the project worksheets that turn a local need into a plan.', links: [[href('framework'), 'The framework'], [href('projects'), 'Project worksheets']] },
  { title: 'Make it possible', line: 'Stakeholders, responsibilities, finance and schemes: who has to agree, who pays and what support exists.', links: [[href('framework', 'stage', 'fund'), 'Fund stage'], [href('workspace', 'fund'), 'Funding worksheet'], [href('learn', 'solar', 'sl-6'), 'Solar schemes']] },
];

export default function Home() {
  return <>
    <section className="home-goal">
      <p className="eyebrow">Gram Urja · our goal</p>
      <h1>From 0 to 1: make a local transition happen</h1>
      <p className="lead">What does it take to move from a local need to a working service? Explore the 0–1 journey for your village or city: how the system works, the people and skills it needs, and how an idea becomes a project. Find your own pathway as a learner, worker or community.</p>
    </section>

    <section className="navapur-opening home-navapur" aria-labelledby="h-navapur">
      <img src="games/navapur/town.png" alt="The illustrated town of Navapur from the workshop" loading="lazy" />
      <div className="navapur-opening-copy">
        <p className="eyebrow">01 · Start with a story</p>
        <h2 id="h-navapur">Enter Navapur, a story and integrated workshop</h2>
        <p>Meet the residents of a changing town. Together, name the problems, compare solutions and rethink your choices when an unexpected event changes the situation. A facilitator guides the group; bring pens and paper.</p>
        <a className="btn" href={href('workshop')}>Enter the story and workshop →</a>
        <a className="opening-skip" href={href('navapur')}>How the workshop runs, and the reflection →</a>
      </div>
    </section>

    <section className="home-section" aria-labelledby="h-tools">
      <p className="eyebrow">02 · Take it to your own place</p>
      <h2 id="h-tools">Four ways to work on it</h2>
      <p className="home-why">You have seen how a town decides. Now work out what it would take where you live.</p>
      <div className="tool-paths">{TOOLS.map(([id, n, title, text]) => <a className="tool-path" href={href(id)} key={id}><span className="eyebrow">{n}</span><h3>{title} →</h3><p>{text}</p></a>)}</div>
    </section>

    <section className="home-section" aria-labelledby="h-fw">
      <p className="eyebrow">03 · A framework to follow</p>
      <h2 id="h-fw">How villages and small cities move from a goal to a funded project</h2>
      <p className="home-why">Climate commitments do not reach a village on their own. Six stages carry them there, and each stage ends with something you can show.</p>
      <ol className="home-stages">{UNITS.map(u => <li key={u.id}><a href={href('framework', 'stage', u.id)}><span className="step-n">{u.n}</span><strong>{u.name}</strong></a></li>)}</ol>
      <p><a className="btn" href={href('framework')}>Explore the six-stage framework →</a></p>
    </section>

    <section className="home-section" aria-labelledby="h-kit">
      <p className="eyebrow">04 · Starter kit for organisations</p>
      <h2 id="h-kit">Working with communities through the process?</h2>
      <p className="home-why">Everything above is organised here by what you need to do, so a district office, NGO or funder can pick up the right tool for each part of the work.</p>
      <div className="kit-grid">{KIT.map(k => <div className="kit-card" key={k.title}><h3>{k.title}</h3><p>{k.line}</p><p className="kit-links">{k.links.map(([to, label]) => <a key={to} href={to}>{label} →</a>)}</p></div>)}</div>
      <p className="fine">Running sessions? Use the <a href={href('course')}>facilitator session plans</a>, the <a href={href('navapur')}>Navapur workshop guide</a> and the <a href={href('play')}>Play scenarios</a>.</p>
    </section>
  </>;
}
