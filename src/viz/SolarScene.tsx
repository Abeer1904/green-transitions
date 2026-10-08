import { useTranslation } from 'react-i18next';
import { ProcessFlow } from './parts';

/** One application: PV-powered submersible irrigation pump, without grid or battery. */
export default function SolarScene({ stage, label, condition = 'sun', selected }: { stage: number; label: string; condition?: string; selected?: string }) {
  const { t } = useTranslation();
  const operating = stage >= 4;
  const active = operating && ['sun','cloud'].includes(condition);
  const delivery = operating && condition === 'deliver';
  const tankY = condition === 'full' ? 181 : condition === 'deliver' ? 205 : 195;
  const name = (key: string) => t(`engineering.solar.${key}`);
  return <svg viewBox="0 0 960 490" role="img" aria-label={label} className="scene technical-scene">
    <title>{label}</title><desc>{t('sceneDetail.solar.description')}</desc>
    <defs><linearGradient id="solar-sky" x2="0" y2="1"><stop stopColor="#e6eef0"/><stop offset="1" stopColor="#faf7e9"/></linearGradient><linearGradient id="solar-earth" x2="0" y2="1"><stop stopColor="#b7ab86"/><stop offset="1" stopColor="#e5dcc5"/></linearGradient><linearGradient id="solar-panel" x2="1" y2="1"><stop stopColor="#173b53"/><stop offset=".55" stopColor="#467b91"/><stop offset="1" stopColor="#15364c"/></linearGradient><pattern id="solar-soil" width="39" height="24" patternUnits="userSpaceOnUse"><path d="M3 5h7m14 11h5" stroke="#8c806a" strokeOpacity=".22"/></pattern></defs>
    <rect width="960" height="490" fill="url(#solar-sky)"/>
    <circle cx="150" cy="68" r="28" fill="#ead48c" opacity=".65"/>
    <path d="M0 241Q100 210 220 238T440 230T680 240T960 215V269H0Z" fill="#ccd5ba"/>
    <g fill="#f5f5ef" opacity={condition==='cloud'?.95:.45} className="solar-cloud"><ellipse cx="280" cy="75" rx="66" ry="20"/><ellipse cx="270" cy="59" rx="31" ry="24"/><ellipse cx="310" cy="65" rx="30" ry="17"/></g>
    <path d="M0 268H960V490H0Z" fill="url(#solar-earth)"/>
    <path d="M0 268H960V490H0Z" fill="url(#solar-soil)"/>
    <path d="M0 388Q240 371 475 388T960 388V490H0Z" fill="#d7e8ec"/>
    <path d="M0 268H960" stroke="#88958a" strokeWidth="2"/>
    <path d="M0 388Q240 371 475 388T960 388" fill="none" stroke="#80a6b6" strokeWidth="2" strokeDasharray="7 6"/>
    <text x="26" y="366" className="diagram-small">{name('waterTable')}</text>
    <g opacity={stage < 3 ? .48 : 1} className={`system-build ${stage<3 ? 'proposed-equipment' : ''}`}>
      <ellipse cx="191" cy="267" rx="128" ry="8" fill="#4b5847" opacity=".12"/>
      <path d="M112 264h22v8h-22m139-8h22v8h-22" fill="#a4a59b"/>
      {/* Tilted modules on a steel mounting frame. */}
      <path d="M121 224V267M260 185V267M121 242H260" stroke="#70817b" strokeWidth="5"/>
      <path d="M73 214L251 156L294 202L116 260Z" fill="url(#solar-panel)" stroke="#9fb9c3" strokeWidth="3"/>
      {[1,2,3,4,5].map(n=><path key={n} d={`M${73+n*29.7} ${214-n*9.67}l43 46`} stroke="#a0bbc6" strokeWidth="1"/>)}
      <path d="M87 229L265 171M102 245L280 187" stroke="#a0bbc6"/>
      <ProcessFlow kind="input" d="M127 65L181 154" color="#b99536" active={false}/>
      <path d="M87 78L126 143M172 55L211 120" stroke="#d5bc70" strokeWidth="2" strokeDasharray="6 8"/>
      <rect x="343" y="181" width="62" height="80" rx="4" fill="#dfe6df" stroke="#657b6e" strokeWidth="3"/>
      <rect x="353" y="194" width="42" height="22" rx="2" fill="#456456"/>
      <circle cx="360" cy="237" r="4" fill={active ? "#318454" : "#8c9690"}/><path d="M374 234h17M374 241h17" stroke="#657b6e"/>
      {/* Well casing, electrical cable and rising water main are distinct. */}
      <path d="M467 266V461H513V266" fill="#f5f8f6" stroke="#9ba99e" strokeWidth="3"/>
      {active && <><path d="M468 406H512" stroke="#337d9b" strokeWidth="2"/><path d="M513 406H684" stroke="#337d9b" strokeDasharray="3 4"/><text x="695" y="410" className="diagram-small">Pumping level (illustrative)</text></>}
      <path d="M472 394V455M508 394V455" stroke="#758a8e" strokeWidth="3" strokeDasharray="3 5"/>
      <ProcessFlow kind="energy" d="M268 217H343" color="#b47629" active={active}/>
      <ProcessFlow kind="energy" d="M405 223H478V416" color="#b47629" active={active}/>
      <rect x="477" y="412" width="25" height="37" rx="3" fill="#506975" stroke="#334e59" strokeWidth="2"/>
      <path d="M481 441h17M481 435h17" stroke="#acbec3" strokeWidth="2"/>
      <ProcessFlow kind="output" d="M498 413V143H662V175" color="#337d9b" active={active}/>
      {/* Storage provides a hydraulic buffer; tank level controls are design-specific. */}
      <path d="M631 229V267M747 229V267M631 247H747" stroke="#70817b" strokeWidth="4"/>
      <rect x="620" y="164" width="140" height="65" rx="7" fill="#e0e8e5" stroke="#657b6e" strokeWidth="3"/>
      <rect className="liquid-level" x="627" y={tankY} width="126" height={222-tankY} fill="#89b3c2"/>
      <path d="M620 179H760M637 158H657" stroke="#657b6e" strokeWidth="3"/>
      <ProcessFlow kind="output" d="M754 215H800V254H913" color="#337d9b" active={delivery}/>
      {[832,868,904].map(x=><g key={x}><path d={`M${x} 254v10`} stroke="#337d9b" strokeWidth="3"/><path d={`M${x} 290v-13m0 6q-12 0-12-10m12 15q12-2 12-11`} fill="none" stroke="#6d8b66" strokeWidth="2"/></g>)}
    </g>
    <g className="field-operator" transform="translate(570 217)"><ellipse cy="51" rx="18" ry="4" fill="#637357" opacity=".18"/><path d="M-6 29l-5 22m16-22 9 22" stroke="#43574d" strokeWidth="6"/><path d="M-9 13h19l-2 20H-7Z" fill="#a56c48"/><circle cy="4" r="7" fill="#af805c"/><path d="M-9 0h18l-4-7H-5Z" fill="#d4b760"/><path d="M-8 16l-12 12m29-11 11 9" stroke="#af805c" strokeWidth="5"/><rect x="16" y="20" width="11" height="15" rx="1" fill="#f2ecd7"/></g>
    {selected && <g className="component-selection" aria-hidden="true">{Object.entries({array:[64,150,237,119],controller:[334,173,81,94],pump:[460,393,60,66],tank:[613,154,155,81],field:[812,243,112,58]}).filter(([id])=>id===selected).map(([id,b])=><rect key={id} x={b[0]} y={b[1]} width={b[2]} height={b[3]} rx="9"/>)}</g>}
    <g className="diagram-label" textAnchor="middle">
      <text x="155" y="42">{name('sun')}</text>
      <text x="181" y="304">{name('array')}</text>
      <text x="375" y="160">{name('controller')}</text>
      <text x="689" y="123">{name('tank')}</text>
      <text x="866" y="325">{name('irrigation')}</text>
      <text x="589" y="446">{name('pump')}</text>
      <text x="565" y="323">{name('main')}</text>
    </g>
    <path d="M509 431H536M505 317H524" stroke="#84978c"/>
    <text x="26" y="468" className="diagram-small">{t('engineering.section')}</text>
  </svg>;
}
