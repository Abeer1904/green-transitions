import { useTranslation } from 'react-i18next';
import { ProcessFlow, ProcessMarker } from './parts';

/** Fixed-dome conceptual section. Pipe endpoints below the slurry level preserve the gas seal. */
export default function BiogasScene({ stage, label }: { stage: number; label: string }) {
  const { t } = useTranslation();
  const active = stage >= 4;
  const name = (key: string) => t(`engineering.biogas.${key}`);
  return <svg viewBox="0 0 960 490" role="img" aria-label={label} className="scene technical-scene">
    <title>{label}</title><desc>{t('sceneDetail.biogas.description')}</desc>
    <rect width="960" height="490" fill="#f8faf8"/>
    <path d="M0 224H960V490H0Z" fill="#ece9e1"/>
    <path d="M0 224H960" stroke="#88958a" strokeWidth="2"/>
    {[260,300,340,380,420,460].map(y=><path key={y} d={`M0 ${y}H960`} stroke="#dddcd2" strokeDasharray="3 12"/>)}
    <text x="26" y="212" className="diagram-small">{t('engineering.ground')}</text>
    <g opacity={stage < 3 ? .48 : 1} className="system-build">
      {/* Concrete inlet basin, liquid feed, underground digester masonry section. */}
      <path d="M78 162V221H184V162" fill="#d4cec0" stroke="#67776e" strokeWidth="4"/>
      <path d="M86 187H176V213H86Z" fill="#9b8667"/>
      <path d="M299 340V289C299 174 529 174 529 289V340Q414 452 299 340Z" fill="#c4bcae" stroke="#5b6e63" strokeWidth="3"/>
      <path d="M312 334V289C312 194 516 194 516 289V334Q414 430 312 334Z" fill="#e6d8a8"/>
      <path d="M312 287H516V334Q414 430 312 334Z" fill="#938166"/>
      <path d="M312 287H516" stroke="#715d44" strokeWidth="2"/>
      <rect x="395" y="179" width="38" height="24" fill="#c4bcae" stroke="#5b6e63" strokeWidth="3"/>
      <ProcessFlow kind="input" d="M176 208H215L320 327" color="#8a6543" active={active}/>
      {/* Outlet is connected below slurry surface; compensation chamber is open. */}
      <path d="M620 229V358H726V229" fill="#d4cec0" stroke="#67776e" strokeWidth="4"/>
      <path d="M628 280H718V350H628Z" fill="#938166"/>
      <ProcessFlow kind="output" d="M506 330H635" color="#507b59" active={active}/>
      <ProcessFlow kind="output" d="M718 282H761V348H799" color="#507b59" active={active}/>
      <path d="M785 315V390H912V315" fill="#d4cec0" stroke="#67776e" strokeWidth="4"/>
      <path d="M793 349H904V382H793Z" fill="#aaa17f"/>
      {/* Gas takeoff, shutoff valve and low-point condensate drain. */}
      <ProcessFlow kind="energy" d="M414 220V114H587V142H634V114H837V163" color="#b17b25" active={active}/>
      <path d="M504 106L524 122V106L504 122Z" fill="#f8faf8" stroke="#8b692f" strokeWidth="2"/>
      <path d="M611 142V167M602 160H620" stroke="#8b692f" strokeWidth="3"/>
      <rect x="802" y="167" width="74" height="14" rx="3" fill="#52675d"/>
      <path d="M805 161H873M818 156V166M860 156V166" stroke="#52675d" strokeWidth="3"/>
      {active && <path className="gas-flame" d="M831 158Q823 149 837 132Q833 148 844 145Q853 153 843 158Z" fill="#367ba0"/>}
      {active && <g className="digester-bubbles" fill="#d9c89e"><circle cx="359" cy="310" r="3"/><circle cx="403" cy="335" r="4"/><circle cx="471" cy="308" r="3"/></g>}
    </g>
    <g className="diagram-label" textAnchor="middle">
      <text x="131" y="136">{name('mixing')}</text>
      <text x="414" y="255">{name('gas')}</text>
      <text x="414" y="319" fill="white">{name('digester')}</text>
      <text x="673" y="208">{name('outlet')}</text>
      <text x="848" y="422">{name('slurry')}</text>
      <text x="837" y="208">{name('stove')}</text>
      <text x="514" y="85">{name('valve')}</text>
      <text x="618" y="187">{name('trap')}</text>
    </g>
    <ProcessMarker x={221} y={254} number={1} color="#8a6543"/>
    <ProcessMarker x={710} y={114} number={2} color="#b17b25"/>
    <ProcessMarker x={570} y={330} number={3} color="#507b59"/>
    <text x="26" y="468" className="diagram-small">{t('engineering.section')}</text>
  </svg>;
}
