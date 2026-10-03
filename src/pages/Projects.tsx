import { href } from '../router';

export default function Projects() {
  return (
    <div className="hue-green">
      <p className="crumbs"><a href={href()}>Home</a> / Projects</p>
      <p className="eyebrow">Projects · from a plan to a funded project</p>
      <h1>Turn a local need into a project</h1>
      <p className="lead">This is where the framework ends up. Work through the stages, write each stage’s output in your workspace, then prepare a project draft. The directory is a demonstration: drafts and support offers stay in your browser and are not sent to partners.</p>
      <div className="lc-list">
        <a className="lc-card" href={href('workspace')}>
          <span className="step-n">1</span>
          <div><h2>My workspace</h2><p>Write the output of each framework stage: the problem, the evidence, the owners and the next step. Turn it into a project draft.</p></div>
        </a>
        <a className="lc-card" href="pipeline/index.html">
          <span className="step-n">2</span>
          <div><h2>Project directory (Green Gram)</h2><p>Browse projects, see what each one still needs, and prepare your own draft and identify the support you would need.</p></div>
        </a>
        <a className="lc-card" href={href('framework')}>
          <span className="step-n">3</span>
          <div><h2>The framework</h2><p>Filter, Contextualise, Prioritise, Solutioning, Fund, Implement. Start here if you have not yet defined the local problem.</p></div>
        </a>
      </div>
    </div>
  );
}
