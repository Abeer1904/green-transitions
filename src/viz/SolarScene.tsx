import { useTranslation } from 'react-i18next';
import { ProcessFlow, ProcessMarker } from './parts';

/** One application: PV-powered submersible irrigation pump, without grid or battery. */
export default function SolarScene({ stage, label }: { stage: number; label: string }) {
  const { t } = useTranslation();
  const active = stage >= 4;
  const name = (key: string) => t(`engineering.solar.${key}`);
  return <svg viewBox="0 0 960 490" role="img" aria-label={label} className="scene technical-scene">
    <title>{label}</title><desc>{t('sceneDetail.solar.description')}</desc>
    <rect width="960" height="490" fill="#f8faf8"/>
    <path d="M0 268H960V490H0Z" fill="#ece9e1"/>
    <path d="M0 388Q240 371 475 388T960 388V490H0Z" fill="#d7e8ec"/>
    <path d="M0 268H960" stroke="#88958a" strokeWidth="2"/>
    <path d="M0 388Q240 371 475 388T960 388" stroke="#80a6b6" strokeWidth="2" strokeDasharray="7 6"/>
    <text x="26" y="366" className="diagram-small">{name('waterTable')}</text>
    <g opacity={stage < 3 ? .48 : 1} className="system-build">
      {/* Tilted modules on a steel mounting frame. */}
      <path d="M121 224V267M260 185V267M121 242H260" stroke="#70817b" strokeWidth="5"/>
      <path d="M73 214L251 156L294 202L116 260Z" fill="#254d61" stroke="#9fb9c3" strokeWidth="3"/>
      {[1,2,3,4,5].map(n=><path key={n} d={`M${73+n*29.7} ${214-n*9.67}l43 46`} stroke="#a0bbc6" strokeWidth="1"/>)}
      <path d="M87 229L265 171M102 245L280 187" stroke="#a0bbc6"/>
      <ProcessFlow kind="input" d="M127 65L181 154" color="#b99536" active={active}/>
      <path d="M87 78L126 143M172 55L211 120" stroke="#d5bc70" strokeWidth="2" strokeDasharray="6 8"/>
      <rect x="343" y="181" width="62" height="80" rx="4" fill="#dfe6df" stroke="#657b6e" strokeWidth="3"/>
      <rect x="353" y="194" width="42" height="22" rx="2" fill="#456456"/>
      <circle cx="360" cy="237" r="4" fill="#60866a"/><path d="M374 234h17M374 241h17" stroke="#657b6e"/>
      {/* Well casing, electrical cable and rising water main are distinct. */}
      <path d="M467 266V461H513V266" fill="#f5f8f6" stroke="#9ba99e" strokeWidth="3"/>
      <path d="M472 394V455M508 394V455" stroke="#758a8e" strokeWidth="3" strokeDasharray="3 5"/>
      <ProcessFlow kind="energy" d="M268 217H343" color="#b47629" active={active}/>
      <ProcessFlow kind="energy" d="M405 223H478V416" color="#b47629" active={active}/>
      <rect x="477" y="412" width="25" height="37" rx="3" fill="#506975" stroke="#334e59" strokeWidth="2"/>
      <path d="M481 441h17M481 435h17" stroke="#acbec3" strokeWidth="2"/>
      <ProcessFlow kind="output" d="M498 413V143H662V175" color="#337d9b" active={active}/>
      {/* Storage provides a hydraulic buffer; tank level controls are design-specific. */}
      <path d="M631 229V267M747 229V267M631 247H747" stroke="#70817b" strokeWidth="4"/>
      <rect x="620" y="164" width="140" height="65" rx="7" fill="#e0e8e5" stroke="#657b6e" strokeWidth="3"/>
      <path d="M627 195H753V222H627Z" fill="#89b3c2"/>
      <path d="M620 179H760M637 158H657" stroke="#657b6e" strokeWidth="3"/>
      <ProcessFlow kind="output" d="M754 215H800V254H913" color="#337d9b" active={active}/>
      {[832,868,904].map(x=><g key={x}><path d={`M${x} 254v10`} stroke="#337d9b" strokeWidth="3"/><path d={`M${x} 290v-13m0 6q-12 0-12-10m12 15q12-2 12-11`} fill="none" stroke="#6d8b66" strokeWidth="2"/></g>)}
    </g>
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
    <ProcessMarker x={156} y={112} number={1} color="#a48625"/>
    <ProcessMarker x={437} y={223} number={2} color="#b47629"/>
    <ProcessMarker x={577} y={143} number={3} color="#337d9b"/>
    <text x="26" y="468" className="diagram-small">{t('engineering.section')}</text>
  </svg>;
}
