import { useSyncExternalStore } from 'react';
export type Evidence = { id: string; role: string; title: string; detail: string; kind: 'Practice / self-reported' | 'Assessed practical work'; assessor: string; date: string };
export type Output = { text: string; owner: string; evidence: string; next: string };
export type FoundationEntry = { visited:boolean; checked:boolean; complete:boolean; answers:number[]; fields:Record<string,string> };
type Workspace = { foundation: Record<string,FoundationEntry>; name: string; place: string; experience: string; support: string; role: string; evidence: Evidence[]; outputs: Record<string, Output>; exercises: string[] };
const KEY = 'gram-urja:workspace:v1';
const blank: Workspace = { foundation: {}, name: '', place: '', experience: '', support: '', role: 'sol-operator', evidence: [], outputs: {}, exercises: [] };
let state: Workspace = blank;
try { const saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && Array.isArray(saved.evidence) && saved.outputs && Array.isArray(saved.exercises)) state = { ...blank, ...saved }; } catch {}
let storageOK = true;
const listeners = new Set<() => void>();
export function updateWorkspace(patch: Partial<Workspace>) { state = { ...state, ...patch }; try { localStorage.setItem(KEY, JSON.stringify(state)); storageOK = true; } catch { storageOK = false; } listeners.forEach(f => f()); }
export function useWorkspace() { const data = useSyncExternalStore(f => { listeners.add(f); return () => { listeners.delete(f); }; }, () => state); return { ...data, storageOK }; }
export function completeExercise(id: string) { if (!state.exercises.includes(id)) updateWorkspace({ exercises: [...state.exercises, id] }); }
export function downloadText(name: string, text: string, type = 'text/plain') { const url = URL.createObjectURL(new Blob([text], { type })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
export function backupWorkspace() { const keys = [KEY, 'gram-urja:v2', 'green-gram-commons-v2']; downloadText('gram-urja-backup.json', JSON.stringify({ format: 'gram-urja-backup-v1', savedAt: new Date().toISOString(), data: Object.fromEntries(keys.map(k => [k, localStorage.getItem(k)])) }, null, 2), 'application/json'); }
