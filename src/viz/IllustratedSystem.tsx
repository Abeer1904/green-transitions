import { useState } from 'react';
type Part = {name:string;x:number;y:number;description:string};
const PARTS:Record<string,Part[]>={
 solar:[
 {name:'Solar array',x:23,y:27,description:'The modules and mounting structure are shown in their field setting. Use the operating diagram to follow the electrical connection to the pump.'},
 {name:'Controller',x:46,y:30,description:'The controller is housed beside the borewell. Its condition and settings need trained inspection.'},
 {name:'Borewell and pump',x:48,y:79,description:'The ground is cut away to reveal the pump and rising main. The illustrated depth and groundwater position are not measurements.'},
 {name:'Water storage',x:70,y:14,description:'The elevated tank stores water. Its structure, capacity and delivery height depend on the site and demand.'},
 {name:'Irrigated field',x:88,y:44,description:'The field is the service destination. Water delivery also depends on distribution arrangements and crop needs.'}],
 biogas:[
 {name:'Mixing basin',x:15,y:32,description:'The basin is where material is prepared for feeding. The illustrated person is one example; responsibilities should be agreed locally.'},
 {name:'Digester cutaway',x:45,y:59,description:'The exposed section reveals the sealed dome and slurry below. Actual masonry, volumes and levels require a technical design.'},
 {name:'Gas line and cooking area',x:85,y:26,description:'Gas is conveyed to an appropriate appliance. This artwork omits some fittings; use the operating diagram to inspect the process.'},
 {name:'Compensation chamber',x:72,y:57,description:'This chamber accommodates displaced slurry. The animated diagram explains the different gas-storage and gas-use states.'},
 {name:'Slurry collection',x:87,y:58,description:'The separate collection area needs a plan for handling and use of digestate.'}],
 water:[
 {name:'Roof and gutter',x:26,y:17,description:'The roof is the collection surface. Gutters and downpipes route the runoff towards treatment and storage.'},
 {name:'Filter assembly',x:45,y:41,description:'The cutaway suggests filter material. It is not a filter specification or a complete first-flush design.'},
 {name:'Underground storage',x:41,y:72,description:'The front section is removed to reveal stored water. Real tanks require suitable covers, access and maintenance arrangements.'},
 {name:'Recharge pit',x:78,y:67,description:'The gravel-filled pit represents recharge into suitable ground. Local soil, groundwater and water quality must be assessed.'},
 {name:'Village pond',x:87,y:44,description:'An earthen pond sits in its landscape. Its relationship to runoff, land use and groundwater needs local investigation.'}]
};
export default function IllustratedSystem({id}:{id:'solar'|'biogas'|'water'}){const [selected,setSelected]=useState(0);const parts=PARTS[id];return <section className="illustrated-system"><div className="real-scene"><img src={`illustrations/${id}.png`} alt={`Illustrated rural ${id==='solar'?'solar irrigation installation':id==='biogas'?'biogas installation':'rainwater collection system'} with an underground cutaway`}/>{parts.map((p,i)=><button key={p.name} style={{left:p.x+'%',top:p.y+'%'}} aria-label={`Inspect ${p.name}`} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{i+1}</button>)}</div><div className="component-tabs" role="group" aria-label="Illustration components">{parts.map((p,i)=><button className="pill" key={p.name} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{i+1}. {p.name}</button>)}</div><div className="illustration-note" aria-live="polite"><h2>{parts[selected].name}</h2><p>{parts[selected].description}</p></div><p className="fine illustration-scope">AI-generated illustrative setting, not a photograph or installation design. Proportions, pipe routes and levels are approximate. Switch to “How it works” for controlled process states and flow explanations.</p></section>}
