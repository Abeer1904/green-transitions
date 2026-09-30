/** The Filter to Implement pathway: how a district takes a national or state climate goal to a local project.
 *  Written as short lessons. Source: the Filter to Implement report (28 September 2026 working draft), edited for the site.
 *  English only for now; Hindi falls back to English. */
import { MORE_GLOSSARY, MORE_LESSONS } from './framework-lessons';

export type Role = 'community' | 'project' | 'district';

export const ROLES: { id: Role; name: string; does: string }[] = [
  { id: 'community', name: 'Community sponsor', does: 'A village, ward or service-user group. Builds the account of the problem and tests who gains or is left out.' },
  { id: 'project', name: 'Project preparer', does: 'Turns a chosen opportunity into a technical, institutional and financial proposal.' },
  { id: 'district', name: 'District convenor', does: 'Supplies shared expertise, convenes the responsible offices and follows unresolved handoffs.' },
];

export type Card =
  | { kind: 'read'; title: string; body: string; terms?: string[] }
  | { kind: 'choice'; q: string; options: string[]; answer: number; why: string }
  | { kind: 'match'; q: string; pairs: [string, string][]; why: string }
  | { kind: 'play'; title: string; body: string };

export type Lesson = {
  id: string;
  unit: string;
  title: string;
  minutes: number;
  /** Roles that lead this lesson. Everyone can open every lesson. */
  owners: Role[];
  checkpoint?: boolean;
  /** Where this step tends to break. */
  watch?: string;
  /** Existing readings that go deeper. */
  readings?: string[];
  source: string;
  cards: Card[];
};

export type Unit = {
  id: string;
  n: number;
  name: string;
  question: string;
  output: string;
  status: 'live' | 'soon';
  /** A place the work often stalls between the previous stage and this one. */
  stallBefore?: string;
  /** Who leads and who supports at this stage (for the map). */
  lead: Record<Role, 'lead' | 'support'>;
};

export const UNITS: Unit[] = [
  { id: 'filter', n: 1, name: 'Filter', question: 'Which local problem belongs in the transition agenda, and why?', output: 'A service mandate linked to policy and local responsibility', status: 'live', lead: { community: 'lead', project: 'support', district: 'support' } },
  { id: 'contextualise', n: 2, name: 'Contextualise', question: 'What conditions and constraints shape the response?', output: 'A baseline and a map of actors, assets and uncertainties', status: 'live', lead: { community: 'support', project: 'lead', district: 'support' } },
  { id: 'prioritise', n: 3, name: 'Prioritise', question: 'Which opportunities should advance, wait or stop?', output: 'A justified portfolio with distributional effects recorded', status: 'live', lead: { community: 'lead', project: 'support', district: 'support' } },
  { id: 'solutioning', n: 4, name: 'Solutioning', question: 'Which service, ownership and delivery model merits development?', output: 'A concept with alternatives and a test plan', status: 'live', stallBefore: 'From interest to a feasibility study', lead: { community: 'support', project: 'lead', district: 'support' } },
  { id: 'fund', n: 5, name: 'Fund', question: 'Who pays, who bears risk and what makes the proposal viable?', output: 'A costed financing proposition and unresolved conditions', status: 'live', stallBefore: 'From a technical proposal to a financing decision', lead: { community: 'support', project: 'lead', district: 'support' } },
  { id: 'implement', n: 6, name: 'Implement', question: 'Who delivers, operates, monitors and responds to problems?', output: 'An authorised delivery plan and a learning record', status: 'live', stallBefore: 'From a sanctioned asset to the arrangements that operate it', lead: { community: 'support', project: 'lead', district: 'support' } },
];

const CORE_GLOSSARY: Record<string, { term: string; def: string }> = {
  ndc: { term: 'NDC', def: 'Nationally Determined Contribution: a country’s climate pledge under the UN climate convention. India’s updated 2030 NDC was submitted in 2022. The UNFCCC registry also records an NDC for 2031 to 2035, submitted in April 2026.' },
  napcc: { term: 'NAPCC', def: 'National Action Plan on Climate Change. It came before India’s NDCs.' },
  netzero: { term: 'Net zero 2070', def: 'India’s longer-term national objective. It is not a target that a village or district can be assigned a share of without an agreed method.' },
  sapcc: { term: 'SAPCC', def: 'State Action Plan on Climate Change. Haryana’s plan links sectors, vulnerabilities, departmental responsibilities and proposed actions.' },
  dpc: { term: 'District Planning Committee', def: 'A body under Article 243ZD of the Constitution that consolidates Panchayat and municipal plans into a district plan. Its composition and chair follow the constitutional provisions and state arrangements.' },
  dep: { term: 'District Environment Plan', def: 'A plan that came out of National Green Tribunal directions and Central Pollution Control Board guidance. It covers environmental management such as waste, water and pollution.' },
  mandate: { term: 'Mandate', def: 'In this framework, a one-page statement of the users, the problem, the service improvement wanted, the climate link and the responsible local body. It is permission to develop a concept, not permission to build.' },
  register: { term: 'Policy-to-place register', def: 'A record linking a local problem to the state priority, the planning instrument, the responsible authority and the funding route. A coordination aid. It creates no new legal mandate.' },
};

export const GLOSSARY = { ...CORE_GLOSSARY, ...MORE_GLOSSARY };

const PILOT = 'Filter to Implement report';

const CORE_LESSONS: Lesson[] = [
  {
    id: 'filter-1', unit: 'filter', title: 'From a national goal to a local problem', minutes: 5, owners: ['district'],
    readings: ['solar-07a'], source: `${PILOT}, section I; Haryana SAPCC; UNFCCC NDC registry`,
    cards: [
      { kind: 'read', title: 'Commitments do not reach places by themselves', body: 'India has made national climate commitments. Haryana has a state plan. A village needs something more specific: which service problem matters here, what can change, who can act, and how a change will be kept going.\n\nThat translation is where local work stalls. The research for this programme finds it is uneven. It does not show that one failure explains every stalled project.' },
      { kind: 'read', title: 'Know the instruments and their dates', body: 'National and state policy is a set of related instruments, not one document.\n\n- The **National Action Plan on Climate Change** came before India’s NDCs.\n- The **updated 2030 NDC** was submitted in 2022. A **2031 to 2035 NDC** was submitted in April 2026.\n- **Net zero by 2070** is the long-term national objective.\n- Haryana’s **State Action Plan** connects sectors, departments and actions.\n\nWrite the version and a review date beside any policy you cite. An earlier announcement does not stay current.', terms: ['napcc', 'ndc', 'netzero', 'sapcc'] },
      { kind: 'choice', q: 'A district officer wants a slide on India’s climate target. What should it carry?', options: ['The headline figure only', 'The instrument, its version and a review date', 'A share of the target for each village'], answer: 1, why: 'Local policy registers need a version and a review date. A district should not invent a numerical NDC share for each village without an agreed method.' },
      { kind: 'read', title: 'Two district bodies that get confused', body: '**District Environment Plans** come from the environmental compliance process built on National Green Tribunal directions and Central Pollution Control Board guidance.\n\n**District Planning Committees** come from Article 243ZD and consolidate Panchayat and municipal plans.\n\nA District Environment Committee chaired by a Deputy Commissioner is not the constitutional committee by default.\n\nThe reviewed Palwal plan covers waste, water and pollution. The extract available (pages 1 to 52 of 108) cannot show that energy is missing from the whole plan. It does raise a question: where is energy considered, and how does it connect to local plans and budgets?', terms: ['dpc', 'dep'] },
      { kind: 'choice', q: 'Which body consolidates Panchayat and municipal plans into a district plan?', options: ['District Environment Plan', 'District Planning Committee', 'Any committee the Deputy Commissioner chairs'], answer: 1, why: 'The District Planning Committee is set up under Article 243ZD. A District Environment Committee is a different body.' },
      { kind: 'read', title: 'Keep a policy-to-place register', body: 'Link each local problem to the state priority, the planning instrument, the responsible authority and the funding route.\n\nEach entry records: the local problem, the policy or scheme and its version, the relevant provision, what it means locally, the competent authority, eligibility questions and a verification date.\n\nThe register helps offices coordinate. It does not create a new legal mandate or replace the plans through which spending is approved.', terms: ['register'] },
    ],
  },
  {
    id: 'filter-2', unit: 'filter', title: 'Start with a service, not a technology', minutes: 5, owners: ['community'],
    watch: 'A proposal that names equipment before it names a user. Test: can you state the user, the problem and the improvement without naming any equipment?',
    readings: ['solar-12', 'biogas-09'], source: `${PILOT}, sections I and II (Filter); HSPCB, TERI and IGSD 2025 study`,
    cards: [
      { kind: 'read', title: 'Begin with the energy people already feel', body: 'Bills, outages, irrigation, heat, cooking, repairs and the performance of public facilities. These show both demand for change and the limits on adopting it.\n\nKnowing that solar exists is different from understanding an application, comparing a vendor offer or carrying the cost of a loan. Counting who is aware can mistake familiarity for the ability to act.' },
      { kind: 'choice', q: 'A meeting finds 200 people who say they know about rooftop solar. What has it shown?', options: ['People are ready to install', 'Awareness, not the ability to act', 'Demand for a bank loan'], answer: 1, why: 'One household may need information. Another may lack a roof it controls or affordable credit. Another may not trust after-sales service. A single awareness meeting will not address all of them.' },
      { kind: 'read', title: 'Write the problem before naming equipment', body: 'A useful mandate names the user, the present problem and the improvement sought.\n\nExamples: keep a health facility’s essential equipment operating during outages. Reduce the recurring cost of pumping water. Make efficient cooling affordable to a vulnerable group.\n\nEquipment comes later.', terms: ['mandate'] },
      { kind: 'choice', q: 'Which of these is a mandate?', options: ['Install a 2 MW solar plant', 'Keep the health centre’s essential equipment running through outages', 'Promote renewable energy'], answer: 1, why: 'It names the user, the problem and the improvement, and it names no equipment. The other two start from a technology or a slogan.' },
      { kind: 'read', title: 'Look past electricity', body: 'The 2025 Haryana Pollution Control Board, TERI and IGSD study reports, from a 2019 inventory, that industry and agriculture produce about 64 and 22 per cent of Haryana’s PM10, and transport about 75 per cent of NOx. These are historical state-level air-pollutant estimates. They are not a district greenhouse-gas inventory or a current baseline.\n\nThe study also discusses the higher exposure of women and children to biomass cooking smoke. So clean cooking belongs in the inquiry beside solar. The group still has to establish which fuels are used, what they cost, and whether a cleaner option would stay in daily use.' },
      { kind: 'choice', q: 'A solar pump replaces a diesel pump. What else should the group check?', options: ['Nothing. Diesel use falls, so the case is closed', 'Whether cheaper pumping increases pressure on groundwater', 'Only the price of the panels'], answer: 1, why: 'Cutting diesel and protecting groundwater are separate effects. A solar pump can reduce diesel use while increasing pressure on groundwater if pumping becomes cheaper and less constrained.' },
    ],
  },
  {
    id: 'filter-3', unit: 'filter', title: 'Whose problem counts', minutes: 5, owners: ['community', 'district'],
    watch: 'A public meeting that hears only the loudest voices, or a vote treated as consent.',
    readings: ['solar-13'], source: `${PILOT}, section II (Filter)`,
    cards: [
      { kind: 'read', title: 'Convene the people the service touches', body: 'Bring together elected representatives, the people who use the service, and the staff who run it.\n\nAdd those who are easy to miss: tenants, landless households, women with care responsibilities, informal workers, people with disabilities, and residents of underserved hamlets. The list should follow what the local inquiry finds.' },
      { kind: 'read', title: 'Record disagreement', body: 'Write down where people disagree. Offer private or small-group input where a public meeting keeps people quiet.\n\nFor a Panchayat, connect the problem to the local development planning process and a public asset. For a municipality, start with its services, spending and responsibilities. Note what needs another authority.' },
      { kind: 'choice', q: 'A workshop votes 40 to 12 for a solar plant on common land. What has that settled?', options: ['Community consent and the land question', 'It is an input. It does not establish statutory consent or settle land rights', 'Nothing was learned'], answer: 1, why: 'A community’s preference is an essential input. A workshop vote does not establish statutory consent or settle land rights.' },
      { kind: 'match', q: 'Match each person to what the mandate must hear from them.', pairs: [['A tenant', 'They may not control a roof'], ['The water operator', 'Repair delays and pumping bills'], ['The woman who cooks for the household', 'Fuel and smoke in her daily work'], ['A landless resident', 'Continued access to livelihood and a fair share of benefit']], why: 'The same scheme looks different from each position. The mandate should change after hearing them.' },
      { kind: 'read', title: 'Three questions for every stage', body: 'At every stage, ask:\n\n- Who is absent?\n- Who bears the risk?\n- What would make this decision reversible?\n\nThese give practical meaning to leaving no one behind. They also expose design flaws early enough to change them.' },
    ],
  },
  {
    id: 'filter-4', unit: 'filter', title: 'Write the one-page mandate', minutes: 8, owners: ['community', 'district'], checkpoint: true,
    source: `${PILOT}, section II (Filter), including the exercise “Whose problem is this”`,
    cards: [
      { kind: 'read', title: 'What goes on the page', body: 'The mandate is one page. It records:\n\n- the affected users\n- the baseline problem\n- the service outcome wanted\n- the climate connection\n- the relevant plan\n- the responsible local body\n- the constraints\n- the questions that need verifying', terms: ['mandate'] },
      { kind: 'read', title: 'What the mandate is, and is not', body: 'The local sponsor agrees to investigate it. It is permission to develop a concept. It is not permission to build.\n\nIt does not allocate a share of a national target to a village, and it does not settle land, finance or consent.' },
      { kind: 'choice', q: 'The mandate is agreed. What can the group do next?', options: ['Start construction', 'Develop a concept and check what is unverified', 'Apply for a loan'], answer: 1, why: 'A mandate lets the group investigate and develop a concept. Building and borrowing need rights, finance and approvals that come later.' },
      { kind: 'choice', q: 'Which rewrite of “install solar on the school” works as a mandate?', options: ['Install 30 kW of solar on the school', 'Cut the school’s daytime power cuts and electricity bill, checked against current bills', 'Make the school green'], answer: 1, why: 'It names the users, the problem and an improvement that can be checked. Equipment can follow once the problem is agreed.' },
      { kind: 'play', title: 'Playable exercise: Whose problem is this? (15 minutes)', body: '**For a group with a facilitator.**\n\nGive the group three fictional requests: subsidise household solar, reduce a water-pumping bill, and improve cooking conditions for households using smoky fuels.\n\nAssign four roles: a roof-owning household, a tenant, a water operator and a woman responsible for cooking. Each person explains the service problem and one concern about the proposed solution. The group picks one problem to investigate and rewrites it without naming a technology.\n\n**Reveal:** the preferred scheme cannot support one of the affected groups. The group can revise who counts as a beneficiary, investigate another route, or keep the proposal and explain the exclusion.\n\nThere is no score for reaching agreement. The question for the debrief: did the group change the problem after hearing a different experience?\n\n**Working alone:** write each role’s strongest objection before choosing a mandate.' },
    ],
  },
];

export const LESSONS: Lesson[] = [...CORE_LESSONS, ...MORE_LESSONS];

export const lessonById = (id: string) => LESSONS.find(l => l.id === id);
export const lessonsIn = (unit: string) => LESSONS.filter(l => l.unit === unit);

export const STALLS = [
  { between: 'Interest and a feasibility study', text: 'A project idea has support, but nobody is responsible for turning it into a scoped study.' },
  { between: 'A technical proposal and a financing decision', text: 'A concept exists, but the borrower, repayment source and timing are not settled.' },
  { between: 'A sanctioned asset and the arrangements that operate it', text: 'The asset is approved or built, but nobody owns operation, repair and complaints.' },
];

/** The framework as Abeer framed it, edited for the site. */
export const FRAME = {
  question: 'How do small cities, municipalities and district administrations, from the DC or DM downwards, create conditions for a just energy transition?',
  body: `They have to read the State Action Plan on Climate Change and the decarbonisation mandate alongside the NDCs and other commitments, then draw decarbonisation pathways from them.

**The gap is joining the systems up.** Smaller cities need a process that is easy to use and open to all. It should push them to think about, build and run infrastructure, business models and interventions. It has to start and seed work at village level too.

**The first part of the effort is the energy transition itself:** alternative sources, decentralisation, and less reliance on petrol, coal and other polluting fuels. That needs a process communities can start and carry forward.`,
};

export type Variable = { title: string; body: string; link?: { label: string; to: string } };
export type Stage = { intro: string; variables: Variable[]; lens?: boolean };

export const STAGES: Record<string, Stage> = {
  filter: {
    intro: 'Three things are fixed before the work starts. Each one narrows a global idea until it means something in a village or a ward.',
    variables: [
      { title: 'Localise the goal', body: 'What does a just energy transition look like here? What is possible, what is viable, and what is there appetite for? Global ideas and standards have to be hyper-localised. A lofty goal has to find local meaning.' },
      { title: 'From scheme to vision', body: 'National scheme architecture, state mandates and state priorities have to become visions and goals on the ground. Someone has to do that translation, in a document a local body can act on.', link: { label: 'Lesson: from a national goal to a local problem', to: 'lesson/filter-1' } },
      { title: 'From vision to action', body: 'A vision becomes awareness and action points. Local leaders, municipalities, panchayats, business and community then build a pathway together, around what they themselves see.', link: { label: 'Lesson: whose problem counts', to: 'lesson/filter-3' } },
      { title: 'Local or external', body: 'Some services a place can create for itself. Others need outside agents. Narrowing and decentralising the grid, and services around it, is the core of decentralisation. Ask the question here. Contextualise maps the answer.' },
    ],
  },
  contextualise: {
    intro: 'Contextualise and Prioritise are worked together. This stage takes stock of what a place has: services, people and resources.',
    variables: [
      { title: 'Services: local or external', body: 'List the services that can be created locally and those that need external agents. Decide where the grid and its services can be narrowed and decentralised.', link: { label: 'Lesson: read the whole energy system', to: 'lesson/ctx-1' } },
      { title: 'Manpower', body: 'A district needs local decision-makers and a workforce whose job is decarbonisation: thinking about local needs, seeding ideas, thinking about growth. It also needs local ESG professionals and consultants who work with local business, panchayats and municipalities. What do these jobs pay, and how does a district build this out?', link: { label: 'Lesson: who can do the work', to: 'lesson/ctx-3' } },
      { title: 'Resources and a transitions marketplace', body: 'Map what exists, what is available and what can be created. Build a marketplace for transitions. Work out where the revenue comes from.', link: { label: 'A working example: the Green Gram project pipeline', to: '@pipeline' } },
    ],
  },
  prioritise: {
    intro: 'Prioritising is a rights question as much as a planning one. The order of projects decides who benefits first.',
    lens: true,
    variables: [
      { title: 'Stakeholders and vulnerability', body: 'How do people think about leaving no one behind (LNOB) and about vulnerability? The softer ideas count here: behaviour change, community work, and disadvantaged communities.', link: { label: 'Lesson: whose problem counts', to: 'lesson/filter-3' } },
      { title: 'Who sets the priorities', body: 'Who sets the priorities, the projects and even the mandates? Make that visible before any ranking is done.', link: { label: 'Lesson: build a portfolio', to: 'lesson/pri-3' } },
    ],
  },
  solutioning: {
    intro: 'Solutions start very small. These are the four things a city needs to fix first.',
    variables: [
      { title: 'Creditworthiness', body: 'Of the district, the municipalities and the panchayats. It decides access to finance. Can banks, philanthropies or a local community fund lead the transition?', link: { label: 'Lesson: finance is part of the design', to: 'lesson/fund-1' } },
      { title: 'Project planning facilities', body: 'Develop climate projects across the district, its villages and its cities, to arrive at ideas, projects and structures.', link: { label: 'Lesson: the planning canvas', to: 'lesson/sol-3' } },
      { title: 'Vocabulary and capacity', body: 'Climate, sustainable development and green skills each carry words that officials and residents have to share before they can plan together.', link: { label: 'Glossary', to: 'glossary' } },
      { title: 'Visioning, ideation and building', body: 'A place needs room to imagine, test ideas and build them, not only to receive them.' },
    ],
  },
  fund: {
    intro: 'Funding is where small cities stall. Two questions come first: what is the return, and how are costs and risks shared.',
    variables: [
      { title: 'Return on investment', body: 'What frameworks let a place judge green energy projects and their value to communities? Return here is more than money.', link: { label: 'Lesson: a household ledger', to: 'lesson/fund-2' } },
      { title: 'Costs, partnerships and credit', body: 'Break costs up and count the positives. Build partnerships that seed community finance. Work with philanthropy, banks and debt. Understand creditworthiness and NPAs, and how a small city builds up a case for itself.', link: { label: 'Lesson: who pays for ₹100?', to: 'lesson/fund-3' } },
    ],
  },
  implement: {
    intro: 'Delivery depends on who is in the room and how they will know it is working.',
    variables: [
      { title: 'NGO partnerships', body: 'Who partners with the district to deliver, and on what terms?', link: { label: 'Lesson: installation is not the end', to: 'lesson/impl-1' } },
      { title: 'MRV and monitoring', body: 'Measurement, reporting and verification, and monitoring of implementation. Someone has to own the record.', link: { label: 'Lesson: the orphaned plant', to: 'lesson/impl-2' } },
      { title: 'Capacity and local skills', body: 'What the district and its partners can do themselves, and what skills the work builds locally.', link: { label: 'Green skills directory', to: '@skills' } },
    ],
  },
};
