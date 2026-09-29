import { useTranslation } from 'react-i18next';
import type { JourneyText, QuestionText, ReadingText, ScenarioText, SkillText, TrackText } from './overlay';
import type { Question, Reading, Scenario, Skill, Stage, Track } from './types';

type Journey = { intro: string; one: string; stages: Stage[] };

/**
 * Returns functions that overlay the current language's text onto the English content.
 * Structure (ids, branches, answers) is never taken from a translation.
 * Calling the hook also re-renders the component when the language changes.
 */
export function useLocalizer() {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || 'en';
  const bundle = <T,>(ns: string): T | undefined => (lang === 'en' ? undefined : (i18n.getResourceBundle(lang, ns) as T | undefined));

  return {
    lang,
    track: (t: Track): Track => ({ ...t, ...bundle<Record<string, TrackText>>('tracks')?.[t.id] }),
    skill: (s: Skill): Skill => {
      const o = bundle<Record<string, SkillText>>('skills')?.[s.id];
      return o ? { ...s, name: o.name, does: o.does, who: o.who, note: s.note ? o.note ?? s.note : undefined, train: s.train.map((x, i) => ({ where: o.train?.[i]?.where ?? x.where, detail: o.train?.[i]?.detail ?? x.detail })) } : s;
    },
    reading: (r: Reading): Reading => {
      const o = bundle<Record<string, ReadingText>>('readings')?.[r.id];
      return o ? { ...r, title: o.title, summary: o.summary, body: o.body } : r;
    },
    journey: (trackId: string, j: Journey): Journey => {
      const o = bundle<Record<string, JourneyText>>('journeys')?.[trackId];
      if (!o) return j;
      return {
        intro: o.intro ?? j.intro, one: o.one ?? j.one,
        stages: j.stages.map((s, i) => { const x = o.stages?.[i]; return x ? { ...s, day: x.day, title: x.title, state: x.state, actions: x.actions, ask: x.ask, watch: x.watch } : s; }),
      };
    },
    scenario: (sc: Scenario): Scenario => {
      const o = bundle<Record<string, ScenarioText>>('scenarios')?.[sc.id];
      if (!o) return sc;
      const nodes = Object.fromEntries(Object.entries(sc.nodes).map(([id, n]) => {
        const x = o.nodes?.[id];
        if (!x) return [id, n];
        return [id, {
          ...n,
          text: x.text ?? n.text,
          fact: n.fact ? x.fact ?? n.fact : undefined,
          choices: n.choices?.map((c, i) => ({ ...c, label: x.choices?.[i] ?? c.label })),
          end: n.end ? { ...n.end, title: x.end?.title ?? n.end.title, learn: x.end?.learn ?? n.end.learn } : undefined,
        }];
      }));
      return { ...sc, title: o.title ?? sc.title, blurb: o.blurb ?? sc.blurb, nodes };
    },
    quiz: (trackId: string, qs: Question[]): Question[] => {
      const o = bundle<Record<string, QuestionText[]>>('quizzes')?.[trackId];
      if (!o) return qs;
      return qs.map((q, i) => {
        const x = o[i];
        if (!x) return q;
        if (q.type === 'choice') return { ...q, q: x.q ?? q.q, why: x.why ?? q.why, options: q.options.map((op, k) => x.options?.[k] ?? op) };
        return { ...q, q: x.q ?? q.q, why: x.why ?? q.why, pairs: q.pairs.map((p, k) => [x.pairs?.[k]?.[0] ?? p[0], x.pairs?.[k]?.[1] ?? p[1]] as [string, string]) };
      });
    },
  };
}
