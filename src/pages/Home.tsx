import { useState } from 'react';
import { href } from '../router';
import { UNITS } from '../content/framework';

const PLACES = {
 village: { name: 'Village', examples: ['Identify an unreliable water or energy service with its users.', 'Map pumps, roofs, water sources, local skills and who controls each asset.', 'Compare irrigation, household energy and public-service needs.', 'Compare a shared pump with other ways to improve water delivery.', 'Identify who pays for preparation, installation, operation and repairs.', 'Agree an operator, water-use arrangements, maintenance and review.'] },
 small: { name: 'Small city', examples: ['Ask which market, neighbourhood or public service needs attention.', 'Map public buildings, market waste, service teams and departmental responsibilities.', 'Compare projects against local demand, available capacity and who benefits.', 'Compare public-building solar or a market-waste service with alternatives.', 'Test budgets, service payments and the cost of keeping the asset working.', 'Assign the responsible office, service provider and complaints process.'] },
 medium: { name: 'Medium-sized city', examples: ['Identify a service problem across wards, with affected residents.', 'Map neighbourhood differences, infrastructure networks and institutional responsibilities.', 'Prioritise a portfolio of projects without overlooking underserved areas.', 'Compare delivery models and test how projects connect across departments.', 'Plan preparation funding, lifecycle costs and responsibilities across the portfolio.', 'Coordinate delivery and track service quality, inclusion and maintenance across wards.'] }
};
export default function Home() {
 const [place,setPlace]=useState<keyof typeof PLACES>('village'); const [stage,setStage]=useState(0); const u=UNITS[stage];
 return <>
 <section className="home-intro"><p className="eyebrow">Gram Urja · local transitions</p><h1>How does a village or a small or medium-sized city make a green transition?</h1><p className="lead">Start with a local need. Bring together people, skills and resources. Explore the six stages here, then build your own plan.</p></section>
 <section className="home-framework" aria-label="Explore the transition framework">
 <div className="place-switch" role="group" aria-label="Choose your setting">{Object.entries(PLACES).map(([id,p])=><button key={id} className="pill" aria-pressed={place===id} onClick={()=>setPlace(id as keyof typeof PLACES)}>{p.name}</button>)}</div>
 <div className="home-stage-nav" role="group" aria-label="Six framework stages">{UNITS.map((x,i)=><button key={x.id} aria-pressed={i===stage} aria-controls="home-stage-detail" onClick={()=>setStage(i)}><span>{x.n.toString().padStart(2,'0')}</span><strong>{x.name}</strong></button>)}</div>
 <div id="home-stage-detail" className="home-stage-detail" aria-live="polite"><div><p className="eyebrow">{PLACES[place].name} · stage {u.n} of 6</p><h2>{u.question}</h2><p>{PLACES[place].examples[stage]}</p><p className="fine">An illustrative starting point. Local evidence determines the route.</p></div><div><h3>One useful output</h3><p>{u.output}.</p><a className="btn" href={href('framework','stage',u.id)}>Start this stage →</a></div></div>
 <div className="home-stage-footer"><p>↻ Return to earlier stages when evidence changes. Learning from implementation starts the next round.</p><button className="link-btn" onClick={()=>setStage((stage+1)%6)}>{stage===5?'Return to Filter':'Explore '+UNITS[stage+1].name} →</button></div></section>
 <section className="home-next"><h2>Make the framework concrete</h2><div className="home-four">{[
 ['visualise','Explore a system','Follow energy and material flows through solar irrigation and biogas.'],
 ['personal','Build my skills','Find a role, practise, record evidence and build a CV.'],
 ['course','Learn together','Follow the course with learner and facilitator views.'],
 ['projects','Develop a project','Turn your evidence and decisions into a local preparation draft.']
 ].map(([id,title,line])=><a className="home-part" key={id} href={href(id)}><div><h3>{title} →</h3><p>{line}</p></div></a>)}</div></section>
 </>;
}
