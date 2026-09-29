import { useTranslation } from 'react-i18next';
import { Cow, Person, Pill, Puffs, ProcessFlow, ProcessMarker, Show, Sky } from './parts';

/** Biogas 0→1. Stage 0 = today (smoke, dung, no plant). Stage 6 = review of a working plant. */
export default function BiogasScene({ stage, label }: { stage: number; label: string }) {
  const { t } = useTranslation();
  const cropsGreen = false; // Slurry use does not guarantee immediate crop improvement.
  return (
    <svg viewBox="0 0 800 400" role="img" aria-label={label} className="scene">
      <title>{label}</title><desc>{t("sceneDetail.biogas.description")}</desc><Sky />
      {/* fields: sparse at first, lush once slurry is used */}
      <g>
        <rect x="610" y="306" width="180" height="84" fill={cropsGreen ? '#93b256' : '#d3c48a'} className="field" />
        {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M620 ${318 + i * 15} h160`} stroke={cropsGreen ? '#4f7a2a' : '#b6a565'} strokeWidth="5" strokeDasharray={cropsGreen ? '0' : '10 8'} />)}
      </g>

      {/* house */}
      <g>
        <rect x="50" y="222" width="150" height="78" fill="#ecd6a8" />
        <polygon points="40,224 125,166 210,224" fill="#a4472b" />
        <rect x="88" y="252" width="30" height="48" fill="#6b4a2a" />
        <rect x="140" y="246" width="38" height="32" fill="#dcebf0" stroke="#6b4a2a" strokeWidth="3" />
        <rect x="160" y="182" width="16" height="30" fill="#8a3a22" />
      </g>
      {/* chulha smoke until gas reaches the kitchen */}
      <Show stage={stage} from={0} until={3}><Puffs x={168} y={172} /></Show>
      {/* gas flame in the window once plant runs */}
      <Show stage={stage} from={4}>
        <path className="gas-flame" d="M159 274 q-6 -12 0 -22 q3 8 8 4 q5 8 -2 18z" fill="#5598d4" />
        <path d="M160 274 q-3 -6 0 -12 q3 4 5 2 q2 6 -1 10z" fill="#3a7fd0" />
      </Show>

      {/* cattle and dung */}
      <g>
        <rect x="250" y="246" width="150" height="54" fill="#e2c88c" />
        <polygon points="240,248 325,206 410,248" fill="#8b6b4a" />
        <Cow x={290} y={280} />
        <Cow x={352} y={284} flip />
        <ellipse cx="420" cy="298" rx="22" ry="9" fill="#6b4a2a" />
        <ellipse cx="428" cy="292" rx="12" ry="6" fill="#7a5a3a" />
      </g>

      {/* stage 1: survey */}
      <Show stage={stage} from={1} until={1}>
        <Person x={330} y={310} shirt="#c0577a" scarf="#c0577a" />
        <rect x="343" y="288" width="16" height="20" fill="#fffaf0" stroke="#5d6b62" strokeWidth="2" />
        <path d="M346 294 h10 M346 299 h10 M346 304 h6" stroke="#5d6b62" strokeWidth="1.5" />
        <Pill x={420} y={252} text={t('scene.countDung')} />
      </Show>
      {/* stage 2: a group meets, site chosen */}
      <Show stage={stage} from={2} until={2}>
        <Person x={470} y={330} shirt="#c0577a" scarf="#c0577a" />
        <Person x={500} y={335} shirt="#2f5d3a" scarf="#e2a832" />
        <Person x={530} y={330} shirt="#c0577a" scarf="#c0577a" />
        <Person x={560} y={335} shirt="#a4472b" />
        <ellipse cx="515" cy="300" rx="70" ry="30" fill="none" stroke="#2f5d3a" strokeWidth="3" strokeDasharray="8 7" />
        <Pill x={515} y={252} text={t('scene.agreeSite')} />
      </Show>

      {/* digester dome: appears once built */}
      <Show stage={stage} from={3}>
        <path d="M440 300 a75 75 0 0 1 150 0z" fill="#9a7a56" stroke="#5d4630" strokeWidth="3" />
        <path d="M440 300 a75 75 0 0 1 150 0" fill="none" stroke="#c9ad82" strokeWidth="6" strokeDasharray="14 9" />
        <rect x="503" y="216" width="24" height="22" rx="4" fill="#7c5f3e" stroke="#5d4630" strokeWidth="3" />
        {/* inlet from the cattle shed */}
        <path d="M420 298 H452 V310" fill="none" stroke="#6b4a2a" strokeWidth="6" />
        {/* outlet pit */}
        <rect x="586" y="292" width="24" height="16" fill="#6b4a2a" />
      </Show>
      {/* stage 3: builders and trainees on site */}
      <Show stage={stage} from={3} until={3}>
        <Person x={470} y={338} shirt="#c98a12" />
        <Person x={500} y={342} shirt="#2c6f8a" />
        <Person x={530} y={338} shirt="#2c6f8a" />
        <Pill x={515} y={200} text={t('scene.buildTrain')} tone="#a4472b" />
      </Show>
      {/* gas pipe to the house and slurry to the field */}
      <Show stage={stage} from={4}>
        {/* Schematic cutaway: inlet, contained digester, gas take-off and slurry outlet. */}
        <path d="M455 300 H585 V342 Q520 372 455 342 Z" fill="#d1aa71" stroke="#5d4630" strokeWidth="3" />
        <path d="M460 320 Q480 313 500 320 T540 320 T580 320 V338 Q520 365 460 338 Z" fill="#8b6940" />
        <g className="digester-bubbles" fill="#edd9a7"><circle cx="489" cy="328" r="3"/><circle cx="520" cy="337" r="4"/><circle cx="550" cy="325" r="3"/></g>
        <ProcessFlow kind="input" d="M419 298 H451 V321" color="#996038" />
        <ProcessFlow kind="energy" d="M515 218 V151 H224 V278 H173" color="#ba6b17" />
        <ProcessFlow kind="output" d="M583 331 H623 V345 H681" color="#568646" />
        <ProcessMarker x={424} y={276} number={1} color="#996038" />
        <ProcessMarker x={350} y={151} number={2} color="#ba6b17" />
        <ProcessMarker x={645} y={345} number={3} color="#568646" />
        <Person x={550} y={376} shirt="#2c6f8a" />
        
      </Show>
      <Show stage={stage} from={4} until={4}><Pill x={515} y={200} text={t('scene.gasSlurry')} tone="#2f5d3a" /></Show>
      {/* stage 5: growth */}
      <Show stage={stage} from={5}>
        <g>
          <rect x="690" y="240" width="42" height="34" fill="#ecd6a8" />
          <polygon points="684,242 711,218 738,242" fill="#a4472b" />
          <rect x="705" y="254" width="12" height="20" fill="#6b4a2a" />
          <ProcessFlow kind="energy" d="M515 151 H748 V258 H732" color="#ba6b17" />
        </g>
        <Person x={590} y={377} shirt="#2f5d3a" />
        <Person x={620} y={380} shirt="#c0577a" scarf="#c0577a" />
        <rect x="425" y="316" width="34" height="18" fill="#7a5a3a" />
        <rect x="430" y="308" width="24" height="8" fill="#5d4630" />
      </Show>
      <Show stage={stage} from={5} until={5}><Pill x={442} y={352} text={t('scene.briquettes')} tone="#c98a12" /></Show>
      {/* stage 6: records and review */}
      <Show stage={stage} from={6}>
        <rect x="270" y="326" width="46" height="34" rx="3" fill="#fffaf0" stroke="#5d6b62" strokeWidth="2.5" />
        <path d="M278 336 h30 M278 344 h30 M278 352 h18" stroke="#5d6b62" strokeWidth="2" />
        <circle cx="322" cy="330" r="12" fill="#2f5d3a" />
        <path d="M316 330 l4 5 l8 -10" fill="none" stroke="#fffaf0" strokeWidth="3" />
        <Pill x={293} y={318} text={t('scene.holdingUp')} tone="#2f5d3a" />
      </Show>
    </svg>
  );
}
