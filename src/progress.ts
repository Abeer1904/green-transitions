import { useSyncExternalStore } from 'react';

/** Everything is stored only in this browser. Nothing is sent anywhere. */
export type PathwayNote = { decided: string; who: string };
export type Progress = {
  read: string[];
  /** scenario id -> ending node ids found */
  ends: Record<string, string[]>;
  /** track id -> best quiz score */
  quiz: Record<string, { best: number; total: number }>;
  seen: string[];
  /** track id -> notes by stage index */
  notes: Record<string, Record<string, PathwayNote>>;
  /** Which layer of the course to show. Learner hides the facilitator boxes. */
  path: 'learner' | 'facilitator';
  /** Framework pathway: lessons finished, and the role the person chose. */
  lessons: string[];
  role: '' | 'community' | 'project' | 'district';
};
const KEY = 'gram-urja:v2';
const empty = (): Progress => ({ read: [], ends: {}, quiz: {}, seen: [], notes: {}, path: 'learner', lessons: [], role: '' });

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw);
    return { ...empty(), ...p };
  } catch { return empty(); }
}
let state = load();
const listeners = new Set<() => void>();
function set(next: Progress) {
  state = next;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage may be blocked; keep working in memory */ }
  listeners.forEach(l => l());
}
const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };
export const useProgress = () => useSyncExternalStore(subscribe, () => state);

export const markRead = (id: string) => { if (!state.read.includes(id)) set({ ...state, read: [...state.read, id] }); };
export const markSeen = (id: string) => { if (!state.seen.includes(id)) set({ ...state, seen: [...state.seen, id] }); };
export const recordEnd = (scenario: string, node: string) => {
  const cur = state.ends[scenario] || [];
  if (!cur.includes(node)) set({ ...state, ends: { ...state.ends, [scenario]: [...cur, node] } });
};
export const recordQuiz = (track: string, score: number, total: number) => {
  const best = state.quiz[track];
  if (!best || score > best.best) set({ ...state, quiz: { ...state.quiz, [track]: { best: score, total } } });
};
export const saveNote = (track: string, stage: number, note: PathwayNote) =>
  set({ ...state, notes: { ...state.notes, [track]: { ...(state.notes[track] || {}), [stage]: note } } });
export const markLesson = (id: string) => { if (!state.lessons.includes(id)) set({ ...state, lessons: [...state.lessons, id] }); };
export const setRole = (role: Progress['role']) => set({ ...state, role });
export const setPath = (path: Progress['path']) => set({ ...state, path });
export const resetProgress = () => set(empty());
