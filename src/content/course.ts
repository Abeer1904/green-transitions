import type { TrackId } from './types';

/** The curriculum. Modules pair the research readings with the practical readings, scenarios and quizzes they connect to.
 *  English only for now: translation follows the Hindi plan in the README. */
export type Segment = { minutes: number; what: string };
export type Module = {
  id: string;
  n: string;
  title: string;
  blurb: string;
  objectives: string[];
  /** Practical readings already on the site. */
  practical: string[];
  /** Research readings (one per paper, plus the survey). */
  research: string[];
  scenarios: string[];
  /** Track quizzes that cover this module. */
  quizzes: TrackId[];
  openingQuestion: string;
  task: string;
  /** Facilitator session plan. Minutes add up to `sessionMinutes`. */
  sessionMinutes: number;
  session: Segment[];
  /** What to steer the group toward when discussing evidence. */
  evidenceNote: string;
};

export const COURSE_UI = {
  nav: 'Course',
  title: 'Green skills course',
  lead: 'Six modules that turn the research behind this site into a course. Each pairs research readings with the practical readings, scenarios and quizzes already here.',
  pathLabel: 'Reading as',
  learner: 'Learner',
  facilitator: 'Facilitator',
  learnerHint: 'Plain-language readings, questions for the group, quizzes.',
  facilitatorHint: 'Adds the evidence notes on each study, and a session plan for each module.',
  modules: 'Modules',
  objectives: 'By the end you can',
  step: { practical: 'Read: how it works', research: 'Read: what the research says', scenarios: 'Try: decide together', discuss: 'Discuss', check: 'Check' },
  opening: 'Opening question',
  task: 'Group task',
  session: 'Session plan',
  evidence: 'Working with the evidence',
  minutes: (n: number) => `${n} min`,
  hours: (n: number) => (n >= 60 ? `${Math.round(n / 6) / 10} hours` : `${n} min`),
  readingsDone: (d: number, n: number) => `${d} of ${n} readings done`,
  start: 'Start the course',
  open: 'Open module',
  prev: 'Previous module',
  next: 'Next module',
  back: 'All modules',
  quizFor: (name: string) => `Quiz: ${name}`,
  bandTitle: 'The green skills course',
  bandText: 'Six modules for learners and facilitators, built from the research readings and the practical tracks.',
  bandCta: 'Open the course',
};

export const MODULES: Module[] = [
  {
    id: 'start',
    n: '0',
    title: 'Start here: what the research says',
    blurb: 'A map of eleven studies: four findings that repeat, and what nobody has studied yet for a Haryana village.',
    objectives: [
      'Name the four findings that repeat across the research.',
      'Say what the research does not cover for a village like Malai.',
      'Choose which findings to test in your own village.',
    ],
    practical: [],
    research: ['solar-07a'],
    scenarios: [],
    quizzes: [],
    openingQuestion: 'What do you already believe about why some villages take up clean energy and others do not?',
    task: 'Write the four findings on a sheet. Next to each, note one thing in your village that supports it or goes against it.',
    sessionMinutes: 45,
    session: [
      { minutes: 10, what: 'Opening question. Collect answers without comment.' },
      { minutes: 15, what: 'Read the survey aloud in turns. Stop after each of the four findings.' },
      { minutes: 15, what: 'Group task: sheet of four findings against the village.' },
      { minutes: 5, what: 'Close: agree which two findings to follow through the course.' },
    ],
    evidenceNote: 'The survey mixes surveys, a meta-analysis, a conceptual review, policy papers and a programme report. Compare findings as themes. Do not add the numbers together.',
  },
  {
    id: 'uptake',
    n: '1',
    title: 'Who takes up green energy, and who is left out',
    blurb: 'Cash, cattle, information and neighbours: what decided uptake in the studies, and what that means for a shared plant or pump.',
    objectives: [
      'Name the money, asset and information barriers a household faces.',
      'Say who a shared plant or pump can leave out, and how to include them.',
      'Check a scheme figure with HAREDA or the DISCOM before quoting it.',
    ],
    practical: ['biogas-05', 'solar-05', 'solar-06'],
    research: ['biogas-08', 'solar-08', 'solar-11'],
    scenarios: ['malai-village-plant', 'malai-microgrid'],
    quizzes: ['biogas', 'solar'],
    openingQuestion: 'Who in your village could take up a plant or a solar system tomorrow, and who could not?',
    task: 'List the households in one ward. Mark cattle, a toilet, steady power and a usable roof. See who is missing from every column.',
    sessionMinutes: 90,
    session: [
      { minutes: 10, what: 'Opening question.' },
      { minutes: 20, what: 'Read the schemes and ownership readings in pairs. Note every figure to check.' },
      { minutes: 20, what: 'Read one research brief together, then its facilitator box. Ask how strong the evidence is.' },
      { minutes: 20, what: 'Try one scenario as a group decision. Record the ending reached.' },
      { minutes: 15, what: 'Group task: the ward list.' },
      { minutes: 5, what: 'Close: one household that could be included next.' },
    ],
    evidenceNote: 'The biogas study is a large national snapshot and shows who owns plants, not why. The Kerala study is small and highly educated. The farmer survey shows association only. Ask which of the three describes your village best.',
  },
  {
    id: 'skills',
    n: '2',
    title: 'Skills and jobs',
    blurb: 'Trained is not the same as employed. Repair, upkeep and who gets through the door.',
    objectives: [
      'Explain why a training certificate does not guarantee work.',
      'Name repair and upkeep roles a village can hold.',
      'Ask who can reach a course, and who is held back by more than skills.',
    ],
    practical: ['biogas-03', 'solar-03'],
    research: ['solar-10', 'solar-09', 'solar-13'],
    scenarios: ['three-people-one-plant', 'which-training'],
    quizzes: ['solar', 'biogas'],
    openingQuestion: 'Who from your village has trained for paid work, and did the training lead to a job?',
    task: 'Pick one role from the skills directory. Write who could train for it, where, and what would stop each person.',
    sessionMinutes: 90,
    session: [
      { minutes: 10, what: 'Opening question.' },
      { minutes: 20, what: 'Read the roles readings. Match each role to a person or gap in the village.' },
      { minutes: 20, what: 'Read the Suryamitra and framework briefs. Compare what is taught with what blocks people.' },
      { minutes: 20, what: 'Try the training scenario as a group decision.' },
      { minutes: 15, what: 'Group task: one role, who and what stops them.' },
      { minutes: 5, what: 'Close: one barrier the village could remove itself.' },
    ],
    evidenceNote: 'The Suryamitra counts are large but the placement data is incomplete by the authors\' own account. The Nairobi study is interview-based and concerns pay-as-you-go kits, not grid-fed pumps. The framework tests no programme. Use them to raise questions, not to answer them.',
  },
  {
    id: 'energy-health',
    n: '3',
    title: 'Cooking, energy and health',
    blurb: 'What one Haryana village used in 2004, what wood smoke did to women\'s lungs in Mysuru, and what a cleaner fuel has to compete with.',
    objectives: [
      'Compare the cooking fuels your village uses, and how often each is used.',
      'Say what the health study measured and what it did not test.',
      'Explain why a gas connection is not the same as daily use.',
    ],
    practical: ['biogas-01', 'biogas-02', 'biogas-04', 'biogas-06'],
    research: ['biogas-10', 'biogas-09'],
    scenarios: ['sunita-two-cows'],
    quizzes: ['biogas'],
    openingQuestion: 'Who cooks in your household, on what fuel, and for how many hours a day?',
    task: 'Draw a cooking-fuel map: for each household, the fuels used and which one is used every day.',
    sessionMinutes: 90,
    session: [
      { minutes: 10, what: 'Opening question.' },
      { minutes: 25, what: 'Read the biogas readings on kitchen, plant type and set-up.' },
      { minutes: 20, what: 'Read the Bibipur and Mysuru briefs. Keep the health content factual.' },
      { minutes: 15, what: 'Try the household scenario as a group decision.' },
      { minutes: 15, what: 'Group task: the cooking-fuel map.' },
      { minutes: 5, what: 'Close: which fuel would a family choose first, and why.' },
    ],
    evidenceNote: 'Bibipur is one village surveyed in 2004, and its own numbers conflict in places. The Mysuru study compared wood with LPG, not biogas. Neither is evidence about Malai. Do not give medical advice.',
  },
  {
    id: 'water-soil',
    n: '4',
    title: 'Water, pumps and soil',
    blurb: 'Why a solar pump does not protect the water table, and what builds soil carbon on a farm with cattle.',
    objectives: [
      'Explain why a solar pump alone does not protect groundwater.',
      'Name who uses water in the village and who decides how it is shared.',
      'Say which farm practices raise soil carbon, and how long they take.',
    ],
    practical: ['solar-02', 'solar-04', 'water-01'],
    research: ['solar-12', 'water-02', 'regen-01'],
    scenarios: ['ramesh-tubewell'],
    quizzes: ['solar', 'water'],
    openingQuestion: 'Has the water level in the village tubewells changed in your memory?',
    task: 'Sketch the village water users and who decides how water is shared. Then mark where the dung goes today.',
    sessionMinutes: 90,
    session: [
      { minutes: 10, what: 'Opening question.' },
      { minutes: 20, what: 'Read the pump and water readings.' },
      { minutes: 20, what: 'Read the pump brief and the soil carbon brief together. Compare what each measured.' },
      { minutes: 20, what: 'Try the tubewell scenario as a group decision.' },
      { minutes: 15, what: 'Group task: the water users sketch and the dung map.' },
      { minutes: 5, what: 'Close: one question about water the village cannot yet answer.' },
    ],
    evidenceNote: 'The pump brief has no Haryana interviews and its subsidy figures conflict with the schemes reading. The water paper is a global policy argument with no data of its own. The soil review reports no Haryana result and did not test biogas slurry.',
  },
  {
    id: 'capstone',
    n: '5',
    title: 'Capstone: our village\'s pathway',
    blurb: 'Turn what you learned into a plan: which findings apply here, what evidence the village still needs, and who does what.',
    objectives: [
      'Say which of the four findings hold in your village, with your own evidence.',
      'Fill in a pathway for one track.',
      'Name the first three actions and who owns each.',
    ],
    practical: [],
    research: ['solar-07a'],
    scenarios: [],
    quizzes: [],
    openingQuestion: 'Of everything in this course, what would change what the village does first?',
    task: 'Fill in the pathway for one track. In the notes, record which finding applies and what evidence you still need to collect.',
    sessionMinutes: 240,
    session: [
      { minutes: 30, what: 'Recap the four findings against what each module showed.' },
      { minutes: 60, what: 'Choose a track. Open its 0 to 1 view and read each stage aloud.' },
      { minutes: 90, what: 'Fill in the pathway stage by stage: decision, who, and evidence needed.' },
      { minutes: 45, what: 'Each group presents. Others ask where the evidence comes from.' },
      { minutes: 15, what: 'Close: three actions, one owner each. Print the pathway.' },
    ],
    evidenceNote: 'Mark every decision as backed by evidence from a study, from the directory, or from the village itself. Anything backed by none is the next thing to find out.',
  },
];

export const moduleById = (id: string): Module | undefined => MODULES.find(m => m.id === id);
