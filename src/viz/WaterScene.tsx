import { Materials, EarthDetail } from './Materials';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { ProcessFlow } from './parts';

export type WaterMode = 'rain' | 'full' | 'dry';

/** Conceptual section: roof, first-flush filter, underground tank, recharge pit, johad and the water table.
 *  Levels are qualitative. The drawing is not to scale and is not a design. */
export default function WaterScene({ stage, label, mode = 'rain', selected }: { stage: number; label: string; mode?: WaterMode; selected?: number }) {
  const { t } = useTranslation();
  const uid = useId().replace(/:/g, '');
  const active = stage >= 4;
  const m: WaterMode = active ? mode : 'rain';
  const tank = m === 'full' ? 272 : m === 'rain' ? 322 : 350;
  const johad = m === 'full' ? 242 : m === 'rain' ? 266 : 292;
  const table = m === 'full' ? 410 : m === 'rain' ? 424 : 446;
  const wet = active && m !== 'dry';
  const name = (key: string) => t(`engineering.water.${key}`);
  const drops = [40, 88, 136, 184, 232, 280, 328, 376, 424, 472, 520, 568, 616, 664, 712, 760, 808, 856, 904];
  return <svg viewBox="0 0 960 490" role="img" aria-label={label} className="scene technical-scene">
    <Materials id="rain"/><title>{label}</title><desc>{t('sceneDetail.water.description')}</desc>
    <defs>
      <pattern id={`${uid}g`} width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#d9d2c0"/><circle cx="4" cy="4" r="2" fill="#a79d87"/><circle cx="11" cy="10" r="2.2" fill="#b9af98"/></pattern>
      <clipPath id={`${uid}b`}><path d="M690 224Q700 322 795 322Q890 322 900 224Z"/></clipPath>
    </defs>
    <rect width="960" height="490" fill="url(#rain-air)"/>
    <path d="M0 224H960V490H0Z" fill="url(#rain-earth)"/>
    <rect className="liquid-level" x="0" y={table} width="960" height={490 - table} fill="#cfe3ee"/>
    <path className="liquid-level-line" d={`M0 ${table}H960`} stroke="#4b86a8" strokeWidth="2" strokeDasharray="10 6"/>
    <path d="M0 224H960" stroke="#88958a" strokeWidth="2"/>
    {[262, 300, 340, 380].map(y => <path key={y} d={`M0 ${y}H960`} stroke="#dddcd2" strokeDasharray="3 12"/>)}
    <EarthDetail id="rain" ground={224}/><text x="26" y="246" className="diagram-small">{t('engineering.ground')}</text>
    {wet && <g className="water-cloud" fill="#dfe6ea" stroke="#9fb0b8" strokeWidth="2"><path d="M96 58Q92 34 120 34Q132 14 160 24Q184 12 200 34Q226 34 220 58Z"/><path d="M700 58Q696 34 724 34Q736 14 764 24Q788 12 804 34Q830 34 824 58Z"/></g>}
    {wet && <g className="rain-drops" stroke="#3a7ca5" strokeWidth="3" strokeLinecap="round" aria-hidden="true">{drops.map((x, i) => <path key={x} d={`M${x} ${66 + (i % 3) * 14}l-4 13`}/>)}</g>}
    <g opacity={stage < 3 ? .48 : 1} className={`system-build ${stage < 3 ? 'proposed-equipment' : ''}`}>
      {/* House, roof and gutter */}
      <rect x="80" y="130" width="160" height="94" fill="#e3d9c3" stroke="#67776e" strokeWidth="3"/>
      <path d="M240 130l19-9v103h-19" fill="#b7a886"/><path d="M84 137H236" stroke="#f9f0d6" strokeWidth="3"/><rect x="116" y="164" width="30" height="60" fill="#b89c72"/><rect x="176" y="156" width="36" height="30" fill="#cfe3ee" stroke="#67776e" strokeWidth="2"/>
      <path d="M52 132L160 74L272 132Z" fill="#a8604a" stroke="#67776e" strokeWidth="3"/>
      <path d="M52 132v7h220v-7" fill="#794c3c"/>{[0,1,2,3,4,5,6,7].map(i=><path key={i} d={`M${65+i*25} 132L160 79`} stroke="#cf9777" strokeWidth="1" opacity=".6"/>)}<path d="M97 108h128m-102-14h74m-136 32h198" stroke="#764d40" strokeWidth="1.5" opacity=".65"/><path d="M180 157v28m14-28v28m-17-14h34" stroke="#eee6d1" strokeWidth="2"/>
      <path d="M268 130H292V160" fill="none" stroke="#67776e" strokeWidth="5" strokeLinecap="round"/>
      <ProcessFlow kind="input" d="M262 129H292V152" color="#3a7ca5" active={wet}/>
      {/* First-flush chamber and filter */}
      <rect x="270" y="160" width="44" height="64" fill={`url(#${uid}g)`} stroke="#5b6e63" strokeWidth="3"/>
      <path d="M270 170H314" stroke="#5b6e63" strokeWidth="2"/>
      <ProcessFlow kind="input" d="M292 224V268" color="#3a7ca5" active={wet}/>
      {/* Underground storage tank and tap */}
      <rect x="262" y="262" width="208" height="112" fill="url(#rain-concrete)" stroke="#5b6e63" strokeWidth="4"/>
      <rect x="270" y="268" width="192" height="98" fill="url(#rain-air)"/>
      <rect className="liquid-level" x="270" y={tank} width="192" height={366 - tank} fill="url(#rain-water)"/>
      <rect x="276" y="250" width="44" height="14" fill="#c4bcae" stroke="#5b6e63" strokeWidth="3"/>
      <ProcessFlow kind="energy" d="M430 300V198H458" color="#2f6b4f" active={active && m === 'dry'}/>
      <path d="M458 190V206H470" fill="none" stroke="#5b6e63" strokeWidth="5" strokeLinecap="round"/>
      {active && m === 'dry' && <path className="tap-drip" d="M470 214Q466 222 470 226Q474 222 470 214Z" fill="#3a7ca5"/>}
      {/* Overflow to the recharge pit, then down to the water table */}
      <ProcessFlow kind="output" d="M470 318H524" color="#3a7ca5" active={active && m === 'full'}/>
      <rect x="520" y="224" width="100" height="160" fill={`url(#${uid}g)`} stroke="#5b6e63" strokeWidth="4"/>
      <path d="M516 224H624" stroke="#5b6e63" strokeWidth="6"/>
      <ProcessFlow kind="output" d="M570 384V420" color="#3a7ca5" active={active && m === 'full'}/>
      {/* Johad: bund, bowl, runoff in, seepage down */}
      <path d="M686 224Q704 329 795 329Q885 329 904 224" fill="none" stroke="#a28d68" strokeWidth="10"/><path d="M900 224Q910 214 940 214H960V224Z" fill="#b6a98e"/>
      <path d="M690 224Q700 322 795 322Q890 322 900 224Z" fill="url(#rain-concrete)" stroke="#5b6e63" strokeWidth="3"/>
      <g clipPath={`url(#${uid}b)`}><rect className="liquid-level" x="680" y={johad} width="230" height={330 - johad} fill="url(#rain-water)"/></g>
      <ProcessFlow kind="input" d="M950 207H910L876 238" color="#3a7ca5" active={wet}/>
      <ProcessFlow kind="output" d="M795 322V414" color="#3a7ca5" active={wet}/>
    </g>
    {selected !== undefined && <g className="component-selection" aria-hidden="true">{[[44, 66, 236, 70], [262, 150, 62, 80], [254, 244, 224, 136], [512, 216, 116, 172], [682, 200, 228, 130], [10, table - 8, 940, 490 - table - 6]].filter((_, i) => i === selected).map(b => <rect key={selected} x={b[0]} y={b[1]} width={b[2]} height={b[3]} rx="9"/>)}</g>}
    <g className="diagram-label" textAnchor="middle">
      <text x="160" y="122" fill="white">{name('roof')}</text>
      <text x="324" y="190" textAnchor="start">{name('filter').split(' ').slice(0,1).join(' ')}</text><text x="324" y="208" textAnchor="start">{name('filter').split(' ').slice(1).join(' ')}</text>
      <text x="338" y="296">{name('tank')}</text>
      <text x="482" y="176">{name('tap')}</text>
      <text x="570" y="206">{name('pit')}</text>
      <text x="795" y="206">{name('johad')}</text>
      <text x="480" y="474">{name('table')}</text>
    </g>
    <text x="26" y="468" className="diagram-small">{t('engineering.section')}</text>
  </svg>;
}
