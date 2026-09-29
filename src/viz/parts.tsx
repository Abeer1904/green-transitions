import type { ReactNode } from 'react';

/** Fades a group in once the journey reaches `from` (and out again after `until`). */
export function Show({ stage, from, until = 99, children }: { stage: number; from: number; until?: number; children: ReactNode }) {
  const on = stage >= from && stage <= until;
  return <g className={on ? 'sc-on' : 'sc-off'} aria-hidden={!on}>{children}</g>;
}

export function Person({ x, y, shirt = '#2c6f8a', scarf, scale = 1 }: { x: number; y: number; shirt?: string; scarf?: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="-30" r="7" fill="#8a5a3c" />
      {scarf && <path d="M-7 -33 q7 -9 14 0 v4 h-14z" fill={scarf} />}
      <path d="M-9 -20 h18 l4 22 h-26z" fill={shirt} />
      <rect x="-7" y="2" width="5" height="14" fill="#3a3a3a" />
      <rect x="2" y="2" width="5" height="14" fill="#3a3a3a" />
    </g>
  );
}

export function Cow({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <ellipse cx="0" cy="0" rx="22" ry="12" fill="#f3ead6" stroke="#8a7a5a" strokeWidth="1.5" />
      <ellipse cx="-6" cy="-3" rx="6" ry="4" fill="#7a5a3c" />
      <ellipse cx="14" cy="4" rx="5" ry="3.5" fill="#7a5a3c" />
      <rect x="-14" y="8" width="4" height="12" fill="#8a7a5a" />
      <rect x="8" y="8" width="4" height="12" fill="#8a7a5a" />
      <ellipse cx="-26" cy="-4" rx="9" ry="7" fill="#f3ead6" stroke="#8a7a5a" strokeWidth="1.5" />
      <circle cx="-29" cy="-6" r="1.3" fill="#26332b" />
      <path d="M-30 -10 l-3 -6 M-24 -10 l1 -7" stroke="#8a7a5a" strokeWidth="2" />
      <path d="M22 -3 q8 4 6 14" fill="none" stroke="#8a7a5a" strokeWidth="1.5" />
    </g>
  );
}

export function Coin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="13" fill="#e2a832" stroke="#a87614" strokeWidth="2" />
      <text textAnchor="middle" y="5" fontSize="15" fontWeight="700" fill="#5c3f08">₹</text>
    </g>
  );
}

export function Pill({ x, y, text, tone = '#2f5d3a' }: { x: number; y: number; text: string; tone?: string }) {
  const w = Array.from(text).length * 8.4 + 24;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y="-13" width={w} height="26" rx="13" fill={tone} />
      <text textAnchor="middle" y="5" fontSize="13" fontWeight="600" fill="#fffaf0">{text}</text>
    </g>
  );
}

export function Puffs({ x, y, color = '#8c8c8c' }: { x: number; y: number; color?: string }) {
  return (
    <g fill={color}>
      <circle className="puff p1" cx={x} cy={y} r="8" />
      <circle className="puff p2" cx={x + 8} cy={y - 16} r="11" />
      <circle className="puff p3" cx={x - 2} cy={y - 34} r="14" />
    </g>
  );
}

export function Sky({ ground = '#cdb47c' }: { ground?: string }) {
  return (
    <>
      <rect width="800" height="300" fill="#dcebf0" />
      <rect y="300" width="800" height="100" fill={ground} />
      <rect y="296" width="800" height="8" fill="#7a9a4a" />
    </>
  );
}

/** A continuous pipe/cable remains visible while direction markers move over it. */
export function ProcessFlow({ d, kind, color, active = true }: { d: string; kind: string; color: string; active?: boolean }) {
  return <g className={`process-flow process-${kind} ${active ? 'process-active' : ''}`} aria-hidden="true">
    <path d={d} fill="none" stroke="#fffaf0" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round" />
    <path d={d} fill="none" stroke={color} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
    {active && <path className="process-direction" d={d} fill="none" stroke="#fffaf0" strokeWidth="2.5" strokeDasharray="3 19" strokeLinecap="round" />}
  </g>;
}

export function ProcessMarker({ x, y, number, color }: { x: number; y: number; number: number; color: string }) {
  return <g aria-hidden="true" transform={`translate(${x} ${y})`}><circle r="14" fill="#fffaf0" stroke={color} strokeWidth="2"/><text textAnchor="middle" y="5" fontSize="15" fontWeight="700" fill={color}>{number}</text></g>;
}
