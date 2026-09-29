/**
 * Translations are overlays: they carry only text, keyed by the same ids as the English content.
 * Structure (ids, branches, correct answers, ordering) always comes from the English source, so a
 * translation can never change how an exercise works. Anything missing falls back to English.
 */
export type ScenarioText = {
  title: string;
  blurb: string;
  /** Same node ids as the English scenario. `choices` are labels in the same order as English. */
  nodes: Record<string, { text: string; fact?: string; choices?: string[]; end?: { title: string; learn: string } }>;
};
/** Same order and same length as the English quiz. `options` in the same order (answer index is unchanged). */
export type QuestionText = { q: string; options?: string[]; pairs?: [string, string][]; why: string };
export type SkillText = { name: string; does: string; train: { where: string; detail: string }[]; who: string; note?: string };
export type StageText = { day: string; title: string; state: string; actions: string[]; ask: string[]; watch: string };
export type JourneyText = { intro: string; one: string; stages: StageText[] };
export type TrackText = { name: string; short: string; tagline: string };
export type ReadingText = { id: string; title: string; summary: string; body: string };
