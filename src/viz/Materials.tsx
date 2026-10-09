/** Lightweight SVG materials: keep the diagrams crisp and selectable at any zoom. */
export function Materials({id}:{id:string}) {return <defs>
 <linearGradient id={`${id}-concrete`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#a9a99e"/><stop offset=".18" stopColor="#deded3"/><stop offset=".65" stopColor="#efeee4"/><stop offset="1" stopColor="#92998f"/></linearGradient>
 <linearGradient id={`${id}-metal`}><stop stopColor="#53666b"/><stop offset=".3" stopColor="#c6d2d0"/><stop offset=".5" stopColor="#eef2eb"/><stop offset=".72" stopColor="#8b9d9e"/><stop offset="1" stopColor="#415b62"/></linearGradient>
 <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#a5d0d4" stopOpacity=".85"/><stop offset=".2" stopColor="#72abba"/><stop offset="1" stopColor="#427f96"/></linearGradient>
 <linearGradient id={`${id}-earth`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#a38b64"/><stop offset=".15" stopColor="#c1ab83"/><stop offset=".65" stopColor="#ddd0b1"/><stop offset="1" stopColor="#b7b397"/></linearGradient>
 <linearGradient id={`${id}-slurry`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#a19465"/><stop offset="1" stopColor="#685e40"/></linearGradient>
 <linearGradient id={`${id}-air`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#dce8e9"/><stop offset="1" stopColor="#f6f3e8"/></linearGradient>
 <pattern id={`${id}-grain`} width="47" height="31" patternUnits="userSpaceOnUse"><path d="M4 8l4 1m16 10 5-1m8-15 3 2m-28 21 3 1" stroke="#786548" strokeOpacity=".2" strokeWidth="1.2"/><circle cx="34" cy="25" r="1.3" fill="#998460" fillOpacity=".3"/></pattern>
 </defs>}
export function EarthDetail({id,ground}:{id:string;ground:number}){return <g aria-hidden="true"><path d={`M0 ${ground+40}Q180 ${ground+25} 360 ${ground+43}T960 ${ground+30}`} fill="none" stroke="#9c8662" strokeOpacity=".28" strokeWidth="12"/><path d={`M0 ${ground+94}Q260 ${ground+120} 470 ${ground+97}T960 ${ground+109}`} fill="none" stroke="#eee4cb" strokeOpacity=".55" strokeWidth="18"/><rect y={ground} width="960" height={490-ground} fill={`url(#${id}-grain)`}/><path d={`M0 ${ground}H960`} stroke="#71805b" strokeWidth="4"/></g>}
