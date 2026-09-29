export type TrackId = 'biogas' | 'solar' | 'water' | 'gasification' | 'regen';
export type TrackStatus = 'live' | 'preview' | 'soon';

export type Track = {
  id: TrackId;
  name: string;
  short: string;
  status: TrackStatus;
  tagline: string;
  /** Directory pages this track draws on. */
  pages: string;
  hue: 'green' | 'ochre' | 'blue' | 'clay' | 'moss';
};

/** A reading, a story or a script. Written as Markdown in content/readings/. */
export type Reading = {
  id: string;
  track: TrackId;
  kind: 'reading' | 'story' | 'script';
  order: number;
  minutes: number;
  title: string;
  summary: string;
  source: string;
  body: string;
};

/** One stop on the 0→1 journey. */
export type Stage = {
  day: string;
  title: string;
  /** What is true at this point. */
  state: string;
  /** What people do. */
  actions: string[];
  /** Skill ids from skills.ts that matter here. */
  skills: string[];
  /** Questions for a village conversation. */
  ask: string[];
  /** What tends to go wrong. */
  watch: string;
  /** Reading that covers this stage. */
  readingId?: string;
};

export type Choice = { label: string; to: string };
export type ScenarioEnd = {
  outcome: 'strong' | 'mixed' | 'weak';
  title: string;
  /** What to take away. */
  learn: string;
  readingId?: string;
};
export type ScenarioNode = {
  text: string;
  /** "What the directory says" shown alongside the situation. */
  fact?: string;
  choices?: Choice[];
  end?: ScenarioEnd;
};
export type Scenario = {
  id: string;
  track: TrackId;
  kind: 'project' | 'skills';
  title: string;
  blurb: string;
  minutes: number;
  start: string;
  nodes: Record<string, ScenarioNode>;
};

export type ChoiceQuestion = { type: 'choice'; q: string; options: string[]; answer: number; why: string; readingId?: string };
export type MatchQuestion = { type: 'match'; q: string; pairs: [string, string][]; why: string; readingId?: string };
export type Question = ChoiceQuestion | MatchQuestion;

export type Skill = {
  id: string;
  track: TrackId;
  name: string;
  kind: 'Technical' | 'Operation' | 'Business' | 'Records' | 'Testing';
  does: string;
  train: { where: string; detail: string }[];
  who: string;
  note?: string;
  page: string;
  readingId?: string;
};
