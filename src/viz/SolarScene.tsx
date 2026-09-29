import { useTranslation } from 'react-i18next';
import { Person, Pill, Puffs, ProcessFlow, ProcessMarker, Show, Sky } from './parts';

function Panels({ x, y, n, tilt = false }: { x: number; y: number; n: number; tilt?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${i * 34} 0)`}>
          <polygon points={tilt ? '0,0 30,0 26,-16 -4,-16' : '0,0 30,0 30,-10 0,-10'} fill="#274c8a" stroke="#dcebf0" strokeWidth="1.5" />
          <path d={tilt ? 'M13 0 l-4 -16 M22 0 l-4 -16' : 'M10 0 v-10 M20 0 v-10'} stroke="#8fb4e8" strokeWidth="1" />
        </g>
      ))}
      {tilt && <path d={`M4 0 v18 M${n * 34 - 8} 0 v18`} stroke="#5d6b62" strokeWidth="3" />}
    </g>
  );
}

/** Solar 0→1. Stage 0 = today (12-hour supply, diesel). Stage 6 = review of a working service. */
export default function SolarScene({ stage, label }: { stage: number; label: string }) {
  const { t } = useTranslation();
  const solarPump = false; // Pump installation does not establish sustainable water access or crop outcomes.
  return (
    <svg viewBox="0 0 800 400" role="img" aria-label={label} className="scene">
      <title>{label}</title><desc>{t("sceneDetail.solar.description")}</desc><Sky ground="#c9b688" />
      {/* sun */}
      <g>
        <circle cx="90" cy="68" r="30" fill="#f2b632" />
        {Array.from({ length: 12 }, (_, i) => <path key={i} d="M90 22 v-12" transform={`rotate(${i * 30} 90 68)`} stroke="#f2b632" strokeWidth="4" strokeLinecap="round" />)}
      </g>

      {/* fields, greener once water is reliable */}
      <rect x="600" y="306" width="190" height="84" fill={solarPump ? '#93b256' : '#d3c48a'} className="field" />
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M610 ${318 + i * 15} h170`} stroke={solarPump ? '#4f7a2a' : '#b6a565'} strokeWidth="5" strokeDasharray={solarPump ? '0' : '10 8'} />)}

      {/* house */}
      <g>
        <rect x="50" y="222" width="150" height="78" fill="#ecd6a8" />
        <polygon points="40,224 125,166 210,224" fill="#a4472b" />
        <rect x="88" y="252" width="30" height="48" fill="#6b4a2a" />
        <rect x="140" y="246" width="38" height="32" fill="#dcebf0" stroke="#6b4a2a" strokeWidth="3" />
      </g>
      {/* rooftop panels once households apply */}
      <Show stage={stage} from={5}>
        <g transform="rotate(-36 125 195)"><Panels x={102} y={183} n={2} /></g>
      </Show>

      {/* grid pole and lines */}
      <g>
        <rect x="330" y="150" width="8" height="150" fill="#6b4a2a" />
        <path d="M312 168 h44 M318 186 h32" stroke="#6b4a2a" strokeWidth="5" />
        <path d="M312 168 q-80 24 -150 60 M356 168 q80 30 110 90" fill="none" stroke="#3a3a3a" strokeWidth="2" />
      </g>
      <Show stage={stage} from={0} until={3}><Pill x={334} y={132} text={t('scene.power12')} tone="#a4472b" /></Show>

      {/* pump house and well: always there */}
      <g>
        <rect x="470" y="262" width="60" height="38" fill="#c9c2b0" stroke="#7a7466" strokeWidth="3" />
        <polygon points="464,264 500,240 536,264" fill="#7a7466" />
        <rect x="492" y="280" width="16" height="20" fill="#5d5648" />
        <rect x="480" y="304" width="40" height="72" fill="#7a5a3a" opacity="0.35" />
        <rect x="482" y="340" width="36" height="34" fill="#3d8fb5" opacity="0.7" />
      </g>
      {/* diesel until the solar pump runs */}
      <Show stage={stage} from={0} until={3}>
        <rect x="545" y="278" width="34" height="22" fill="#7a7a7a" stroke="#4a4a4a" strokeWidth="2" />
        <rect x="555" y="268" width="8" height="10" fill="#4a4a4a" />
        <Puffs x={560} y={262} color="#6c6c6c" />
      </Show>

      {/* stage 1: tests and map */}
      <Show stage={stage} from={1} until={1}>
        <g transform="translate(430 330)">
          <path d="M0 -20 h12 l-2 6 q6 6 0 26 h-10 q-6 -20 0 -26z" fill="#d7e9ef" stroke="#2c6f8a" strokeWidth="2.5" />
          <path d="M-2 -2 h14 q1 12 -2 14 h-10 q-3 -2 -2 -14z" fill="#3d8fb5" />
        </g>
        <Pill x={430} y={296} text={t('scene.waterTest')} tone="#2c6f8a" />
        <Pill x={110} y={112} text={t('scene.sunTest')} tone="#c98a12" />
        {[[120, 214], [500, 226], [690, 296]].map(([px, py], i) => (
          <g key={i} transform={`translate(${px} ${py})`}><path d="M0 0 q-9 -10 0 -22 q9 12 0 22z" fill="#a4472b" /><circle cy="-15" r="3" fill="#fffaf0" /></g>
        ))}
      </Show>
      {/* stage 2: meet the scheme people, pick a site */}
      <Show stage={stage} from={2} until={2}>
        <Person x={620} y={336} shirt="#2f5d3a" />
        <Person x={650} y={340} shirt="#a4472b" />
        <Person x={680} y={336} shirt="#2c6f8a" />
        <Person x={712} y={340} shirt="#274c8a" scarf="#274c8a" />
        <rect x="545" y="310" width="160" height="60" fill="none" stroke="#2f5d3a" strokeWidth="3" strokeDasharray="9 7" />
        <Pill x={620} y={296} text={t('scene.pickSite')} tone="#2f5d3a" />
      </Show>
      {/* stage 3: demo pump and trainees */}
      <Show stage={stage} from={3} until={3}>
        <Panels x={596} y={272} n={2} tilt />
        <Person x={470} y={344} shirt="#2c6f8a" />
        <Person x={440} y={348} shirt="#2c6f8a" />
        <Person x={410} y={344} shirt="#c98a12" />
        <Pill x={440} y={306} text={t('scene.trainDemo')} tone="#a4472b" />
      </Show>
      {/* stage 4+: community pump, water, tariff */}
      <Show stage={stage} from={4}>
        <Panels x={548} y={240} n={5} tilt />
        {/* Energy powers the motor; water travels through a separate pipe. */}
        <rect x="553" y="264" width="24" height="34" rx="3" fill="#eceddf" stroke="#657266" strokeWidth="2" />
        <rect x="558" y="269" width="14" height="9" fill="#395c51" />
        <ProcessFlow kind="input" d="M118 84 L605 212" color="#c39222" />
        <ProcessFlow kind="energy" d="M595 240 V254 H565 V280 H524" color="#bd6b23" />
        <ProcessFlow kind="output" d="M500 354 V310 H585 V324 H668" color="#287da1" />
        <ProcessMarker x={419} y={163} number={1} color="#a77817" />
        <ProcessMarker x={563} y={248} number={2} color="#bd6b23" />
        <ProcessMarker x={631} y={324} number={3} color="#287da1" />
        <Person x={470} y={344} shirt="#2c6f8a" />
        <rect x="486" y="326" width="18" height="14" fill="#fffaf0" stroke="#5d6b62" strokeWidth="2" />
        
      </Show>
      {/* stage 5: second batch and more homes */}
      <Show stage={stage} from={5}>
        <Person x={410} y={346} shirt="#c0577a" scarf="#c0577a" />
        <Person x={380} y={350} shirt="#2f5d3a" />
      </Show>
      {/* stage 6: review */}
      <Show stage={stage} from={6}>
        <rect x="266" y="318" width="8" height="70" fill="#6b4a2a" />
        <polygon points="274,320 330,332 274,346" fill="#2f5d3a" />
        <path d="M286 332 l6 6 l12 -12" fill="none" stroke="#fffaf0" strokeWidth="3" />
        <Pill x={296} y={306} text={t('scene.stillWorking')} tone="#2f5d3a" />
      </Show>
    </svg>
  );
}
