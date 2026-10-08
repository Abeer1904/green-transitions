import { useState } from 'react';
import WaterScene, { type WaterMode } from './WaterScene';
import { href } from '../router';
import { updateWorkspace } from '../workspace';

const PARTS = [
  { name: 'Roof and gutter', role: 'wat-mason', body: 'The roof is the catchment. Its area, slope and surface decide how much rain reaches the pipe. A rough or dusty roof loses more. Gutters and secure downpipes carry the water to one point.' },
  { name: 'First-flush filter', role: 'wat-tester', body: 'The first rain of a shower washes dust and droppings off the roof. A first-flush chamber and filter keep that out of the tank. Someone has to clean it, and the water should be tested before anyone drinks it.' },
  { name: 'Underground tank', role: 'wat-mason', body: 'A tank has to hold months of supply, because rain comes in a few monsoon weeks. Tank size matters as much as roof size. A tap or hand pump takes water out when it is needed.' },
  { name: 'Recharge pit', role: 'wat-mason', body: 'When the tank is full, the overflow goes to a pit filled with gravel that filters it and lets it sink into the ground. The directory says MGNREGS workers build these. It names no training course for the role.' },
  { name: 'Johad', role: 'wat-pond', body: 'A johad is a traditional dam or pond that captures monsoon runoff for a village. Some of the water seeps down to the aquifer. It needs a supervisor to oversee restoration and a rota to keep it clean.' },
  { name: 'Water table', role: 'wat-tester', body: 'The water table is the top of the groundwater. It rises slowly after the monsoon and falls through the dry months. One monsoon will not show a clear change, so levels have to be recorded for more than a year.' },
];
const STATES: Record<WaterMode, string> = {
  rain: 'Rain is falling: roof water passes the filter into the tank, runoff fills the johad, and some water seeps down to the water table.',
  full: 'The tank is full: the overflow goes through the recharge pit to the ground, the johad is high, and the water table is at its highest.',
  dry: 'Dry season: nothing is coming in, people draw on the tank, the johad is low and the water table has fallen.',
};

export default function WaterExplorer({ stage, paused, label }: { stage: number; paused: boolean; label: string }) {
  const [mode, setMode] = useState<WaterMode>('rain');
  const [part, setPart] = useState(2);
  const [zoom, setZoom] = useState(false);
  const p = PARTS[part];
  return <>
    <div className="solar-controls">
      <label>Explore a season<select disabled={stage < 4} value={mode} onChange={e => setMode(e.target.value as WaterMode)}><option value="rain">Rain falling</option><option value="full">Tank full, overflow recharging</option><option value="dry">Dry season, using stored water</option></select></label>
      <button className="pill" aria-pressed={zoom} onClick={() => setZoom(!zoom)}>{zoom ? 'Show whole system' : 'Enlarge diagram'}</button>
    </div>
    <p className="diagram-help">Choose a component below to inspect it. On a small screen, swipe the diagram sideways.</p>
    <div tabIndex={0} role="region" aria-label="Rain capture diagram, horizontally scrollable" className={`solar-overview ${zoom ? 'enlarged' : ''} ${paused ? 'scene-paused' : ''}`}><div className="solar-canvas"><WaterScene stage={stage} label={label} mode={mode} selected={part}/></div></div>
    <div className="component-tabs" role="group" aria-label="Rain capture components">{PARTS.map((x, i) => <button key={x.name} className="pill" aria-pressed={part === i} onClick={() => setPart(i)}>{i + 1}. {x.name}</button>)}</div>
    <section className="component-inspector" aria-live="polite">
      <div><p className="eyebrow">Component</p><h2>{p.name}</h2><p>{p.body}</p><a href={href('personal')} onClick={() => updateWorkspace({ role: p.role })}>Explore the related role →</a></div>
      <div><h3>What changes?</h3><p>{stage < 3 ? 'Map the water with residents, assess the roof and site with a technical partner, and agree who will look after each structure. Dashed equipment shows a proposal.' : stage === 3 ? 'Check slopes, joints, the filter and the tank cover with a trained mason before the first rain. No water is shown.' : STATES[mode]}</p><p className="fine">Qualitative snapshots, not dimensions or measured levels. The drawing does not specify a design. Roof yield depends on roof area, rainfall and losses.</p></div>
    </section>
  </>;
}
