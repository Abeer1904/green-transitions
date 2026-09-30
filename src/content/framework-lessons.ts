/** Lessons for stages 2 to 6 of the Filter to Implement pathway.
 *  Drawn from the Local Just Energy Transition Playbook Framework, the Palwal governance papers, the Malai consultation,
 *  the PM Surya Ghar household analysis and the green skills readings. English only; Hindi falls back to English. */
import type { Lesson } from './framework';

const PLAY = 'Local Just Energy Transition Playbook Framework (working paper)';

export const MORE_GLOSSARY: Record<string, { term: string; def: string }> = {
  enabling: { term: 'Enabling environment', def: 'The five conditions that decide whether a place can adopt clean energy and keep it working: policy and regulation, finance, institutional capacity, the technical and service ecosystem, and social and distributive conditions.' },
  lnob: { term: 'LNOB', def: 'Leaving no one behind. The commitment to check who is excluded, who carries the risk and who decides, at every stage.' },
  ulb: { term: 'ULB', def: 'Urban local body: a municipal council, committee or corporation. In Palwal district there is one Municipal Council and two Municipal Committees.' },
  hareda: { term: 'HAREDA', def: 'Haryana Renewable Energy Development Agency, the state agency for renewable energy schemes.' },
  dhbvn: { term: 'DHBVN', def: 'Dakshin Haryana Bijli Vitran Nigam, the electricity distribution company for southern Haryana, including Palwal.' },
  dpr: { term: 'DPR', def: 'Detailed project report: the technical and financial report used to seek sanction and finance for a project.' },
  ppa: { term: 'PPA', def: 'Power purchase agreement: a contract that fixes who buys the electricity and at what price.' },
  cfa: { term: 'CFA', def: 'Central financial assistance: the central government subsidy, for example under PM Surya Ghar.' },
  capstack: { term: 'Capital stack', def: 'The mix of money that pays for a project: own contribution, scheme support, debt, equity, grants and revenue.' },
  raci: { term: 'RACI', def: 'A chart that names, for each task, who is Responsible, who is Accountable, who is Consulted and who is Informed.' },
  mrv: { term: 'MRV', def: 'Measurement, reporting and verification: how a project shows what it delivered.' },
};

export const MORE_LESSONS: Lesson[] = [
  {
    id: 'ctx-1', unit: 'contextualise', title: 'Read the whole energy system', minutes: 6, owners: ['project', 'district'],
    watch: 'Talking about solar in the abstract before anyone has mapped what already exists.',
    readings: ['solar-08'], source: `${PLAY}, sections 3.3, 4.2 and 6; Enabling Ecosystem paper`,
    cards: [
      { kind: 'read', title: 'Map what exists before you propose anything', body: `Stop saying “solar” or “renewables” in the abstract. Map the system that is already there.\n\nThat means demand, assets, institutions, people, money, markets and the service ecosystem: loads, bills, pumps, public buildings, roofs, land, grid infrastructure, businesses, technicians, finance providers and the users most exposed to change.` },
      { kind: 'read', title: 'Five lenses', body: `Test every pathway against five conditions.\n\n- **Policy and regulation**\n- **Finance**\n- **Institutional capacity**\n- **The technical and service ecosystem**\n- **Social and distributive conditions**\n\nThis is a diagnostic that runs through all six stages. It is not a seventh stage.`, terms: ['enabling'] },
      { kind: 'read', title: 'Adoption is a sequence', body: `Interest has to survive information, feasibility, finance, approval, installation, connection and maintenance.\n\nA scheme can be complete on paper and still hard to navigate for a household, a farmer or a local institution. The same holds for a district: intent counts only if institutions can turn it, again and again, into working assets and services.` },
      { kind: 'choice', q: 'A household owns its roof and knows about the scheme. It has not applied. Where do you look first?', options: ['At its motivation', 'At the steps between interest and a working system: information, cost, approval, a trusted installer', 'At the size of the panel'], answer: 1, why: 'Wanting solar is not the same as being able to finance it, get it approved, find someone to install it and get it repaired. The gap is usually in the sequence, not the wish.' },
      { kind: 'read', title: 'Trust travels through people', body: `Advice in the field comes through family, Panchayat members, people who have already adopted, common service centres, local shops and officials. Fear of fraud and unreliable service sits beside cost and debt worry.\n\nA plan needs trusted intermediaries, not only posters. Whether a particular person can play that role is a question for the field.` },
    ],
  },
  {
    id: 'ctx-2', unit: 'contextualise', title: 'Same district, different asset', minutes: 6, owners: ['project', 'community'],
    readings: ['solar-06'], source: `${PLAY}, section 3.4; Malai field consultation, 18 September 2026; Rural JET framework, cases section`,
    cards: [
      { kind: 'read', title: 'Two villages, one district', body: `**Banchari** shows local ambition running ahead of the system. The Panchayat is interested in a larger solar project, willing to put in capital, and has land near the grid.\n\n**Malai** starts elsewhere. Its Sarpanch reported that about 13 acres of common land are already committed to a dispensary, a veterinary dispensary, a health centre and housing for households below the poverty line. Only 2 to 2.5 acres remain, earmarked for lease income and a proposed medical college.\n\nThese figures come from one consultation and were not measured.` },
      { kind: 'read', title: 'Context changes the pathway', body: `With land spoken for, Malai’s route turns to rooftops. The consultation reports about 2,000 households and about 100 rooftop systems, again as estimates. It points to household finance awareness, vendor links, a baseline survey and green skills.\n\nIt also notes that revenue villages above 5,000 people can compete for a model solar village grant under PM Surya Ghar, of up to ₹1 crore. Confirm the current guidelines before relying on that.\n\nRooftop is not better in itself. Malai’s land is committed, so the route follows the asset.` },
      { kind: 'match', q: 'Match each situation to the route it opens.', pairs: [['Land, will and grid closeness, as in Banchari', 'A larger project that still needs feasibility, a buyer and finance'], ['Land committed to public uses, as in Malai', 'Rooftops, household finance and skills'], ['Any asset that turns out blocked', 'Change direction and record why']], why: 'The same policy gives different priorities in different places. The pathway comes out of the local assets and limits.' },
      { kind: 'read', title: 'What the cases do not show', body: `Neither case shows a financial return, a jobs forecast or a proven emissions path. Malai’s account is one perspective, not agreement across the village. Land figures for Banchari differ between project papers.\n\nUse the cases to ask what a route still needs.` },
      { kind: 'choice', q: 'The Malai report says the Panchayat is somewhat willing to lease land to a developer. It also concludes that ground-mounted solar is unfeasible. What do you do?', options: ['Record land as available', 'Clarify the conflict before treating land as settled', 'Drop rooftop solar'], answer: 1, why: 'The report contradicts itself on this point. One meeting cannot settle a land question, so ask again.' },
    ],
  },
  {
    id: 'ctx-3', unit: 'contextualise', title: 'Who can do the work', minutes: 10, owners: ['district', 'project'], checkpoint: true,
    readings: ['solar-03', 'solar-10', 'solar-09'], source: `${PLAY}, sections 4.2 and 11; CEEW Suryamitra report; Nairobi solar repair study`,
    cards: [
      { kind: 'read', title: 'People and markets are part of the map', body: `The map should list technicians, installers, auditors, community mobilisers, project developers, banks, consultants, ESG professionals, vendors, enterprises and training institutions.\n\nThe district then sees both its energy assets and the people and markets that can build and sustain them. A missing capability is an intervention in its own right.` },
      { kind: 'read', title: 'Trained is not the same as employed', body: `The Suryamitra programme trained 48,157 people by FY20. Placement fell, few earned much and few were women. In Nairobi, solar work sat mostly in sales, and sealed kits shut out local repair technicians.\n\nA district that counts trainees has not counted workers.` },
      { kind: 'choice', q: 'A district lists 300 trained solar technicians. What should the map add?', options: ['Nothing. The number says enough', 'How many are employed, what they earn, and who repairs systems after installation', 'The number of panels sold'], answer: 1, why: 'Training numbers do not match the jobs that exist. Repair and upkeep are where the gaps show.' },
      { kind: 'play', title: 'Playable exercise: the energy walk and asset map (60 minutes)', body: `**For a group of six to ten with a facilitator.**\n\nWalk a ward or village. Note every load, roof, pump, public building, transformer, shop and workshop. Ask who fixes each one when it breaks.\n\nBack at the table, draw four lists on one sheet: loads, assets, institutions and people, money and markets. Mark every item as **local**, **needs district help**, or **needs outside authority**.\n\n**Reveal:** the facilitator holds back one fact until the group asks for it. For example, the only repair technician works for a vendor that no longer answers calls.\n\nThe debrief question: which item on your map has no owner?\n\n**Working alone:** draw the same map for your own street.` },
    ],
  },
  {
    id: 'pri-1', unit: 'prioritise', title: 'You cannot do everything', minutes: 6, owners: ['community', 'district'],
    source: `${PLAY}, section 4.3`,
    cards: [
      { kind: 'read', title: 'More ideas than capacity', body: `A local transition throws up more possible actions than a Panchayat or a municipal body can carry: household rooftops, public-building solar, irrigation, streetlighting, water systems, cooling, efficiency, productive-use energy, EV charging, project preparation.\n\nNone is free. None solves every problem.` },
      { kind: 'read', title: 'Seven screens', body: `Screen every option against seven questions.\n\n- Is there a real need?\n- What is the energy or decarbonisation value?\n- Is it feasible?\n- Is it just?\n- Does it create local value?\n- Is there a revenue or finance route?\n- Does the local body have the authority?\n\nNo single screen decides. A project with a large emissions cut stays on the shelf if nobody with authority can build it.` },
      { kind: 'choice', q: 'An option cuts emissions sharply. The Panchayat has no authority over the site. What does the screen tell you?', options: ['Advance it anyway', 'Route it to the body with authority, or wait', 'Stop the whole portfolio'], answer: 1, why: 'Authority is one screen among seven. Failing it means convergence or escalation, not the end of the idea.' },
      { kind: 'read', title: 'Advance, wait or stop', body: `Each option gets one of three outcomes, and the reason is written down. Options that wait go back to Contextualise for the missing evidence.\n\nAt district scale a portfolio normally holds ten to twenty opportunities. A village or a small city works from a shorter list.\n\nRank projects. Do not rank communities by readiness. The report warns against it: a readiness table rewards places that already have capacity.` },
    ],
  },
  {
    id: 'pri-2', unit: 'prioritise', title: 'Just transition is a question about who', minutes: 7, owners: ['community', 'district'],
    watch: 'A ranking that scores well and leaves the same people out.',
    readings: ['solar-13'], source: `${PLAY}, section 4.3; PM Surya Ghar household analysis, Palwal; Malai field consultation`,
    cards: [
      { kind: 'read', title: 'Seven questions for any intervention', body: `Who owns it? Who pays? Who carries the risk? Who gets cheaper or more reliable energy? Who works? Who earns? Where does the value stay, or get reinvested?\n\nThese make a just transition a practical question about distribution.`, terms: ['lnob'] },
      { kind: 'read', title: 'One scheme, three households', body: `Under PM Surya Ghar, a 2 kW system in Palwal returns different amounts to different households. In the project’s household analysis, a household with income up to ₹1.80 lakh gets about ₹1,10,000 in subsidy and breaks even in month 18. A household above ₹3 lakh gets ₹60,000 and breaks even in month 69.\n\nThe household that gains most is also the one for whom the early cash gap is hardest to cross. The Fund stage covers the numbers.` },
      { kind: 'match', q: 'Match each question to the person it exposes.', pairs: [['Who carries the risk?', 'A household that must pay a loan before the subsidy arrives'], ['Who is absent?', 'A tenant who does not control the roof'], ['Where does the value stay?', 'Local technicians who are hired and paid to repair'], ['Who decides?', 'Whoever sets the mandate and the priorities']], why: 'Each question points at someone a technology list would not mention.' },
      { kind: 'read', title: 'Who sets the priorities', body: `Priorities, projects and mandates are set by someone. Write down who, and how a resident can challenge the choice.\n\nMalai’s Sarpanch drew a clear line. The Panchayat already has its own channels to the district for routine schemes. Outside partners are welcome where they add something it lacks: non-state funds, capacity building, specialised skills. A partner has to work inside that line.` },
      { kind: 'choice', q: 'Who should build the shortlist?', options: ['The consultants, who have the skills', 'The local body, after hearing the people the service touches and recording disagreement', 'The scheme portal'], answer: 1, why: 'A shortlist that skips the people affected reproduces the gaps the framework is meant to close.' },
    ],
  },
  {
    id: 'pri-3', unit: 'prioritise', title: 'Build a portfolio: Transition Rummy', minutes: 10, owners: ['community', 'project', 'district'], checkpoint: true,
    source: `${PLAY}, sections 4.3 and 7`,
    cards: [
      { kind: 'read', title: 'Combinations, not lists', body: `A viable project needs seven things to line up: a **problem**, an **asset**, a **user**, an **institution**, a **scheme or finance source**, a **service provider** and a **benefit**.\n\nDrop one and the project fails. The game makes that visible.` },
      { kind: 'choice', q: 'A set has a problem (streetlight outages), an asset (municipal budget), a user and a benefit, but no service provider. What is it?', options: ['A viable project', 'An invalid set that names a missing condition', 'A finished portfolio'], answer: 1, why: 'An invalid set is useful. It tells the group what to find before the project can move.' },
      { kind: 'play', title: 'Playable exercise: Transition Rummy (45 minutes)', body: `**For a group with a facilitator.**\n\nBefore the session, write cards for the seven suits using items from the group’s own energy map. Deal a hand to each player. Players trade to build a valid set of seven. Invalid sets stay on the table with the missing suit named.\n\nThen apply the seven justice questions to every valid set.\n\n**Reveal:** the highest-emissions project fails the justice screen for one group. The group keeps it, changes it or drops it, and records why.\n\nThe output is a shortlist of opportunities: ten to twenty at district scale, fewer for a village or small city.\n\n**Working alone:** build three sets from your own map and name what is missing from each.` },
    ],
  },
  {
    id: 'sol-1', unit: 'solutioning', title: 'From technology to project', minutes: 7, owners: ['project'],
    readings: ['solar-06', 'solar-05'], source: `${PLAY}, section 4.4; Rural JET framework, solution design; IRENA 2020, community-ownership models`,
    cards: [
      { kind: 'read', title: '“We should do rooftop solar” is not a project', body: `Technology is one design variable. Ownership, operating responsibility, land, users, a buyer, maintenance, procurement, skills and benefit sharing matter as much.\n\nSolutioning moves from a technology to a project or an institutional model that could be developed.` },
      { kind: 'read', title: 'Who owns it changes who gains', body: `Panchayat-owned, cooperative, developer-led, household, public-service, productive-use and hybrid models put control, risk and value in different hands. The site’s solar track sets out six ways to run solar. IRENA’s 2020 brief on community-ownership models is a reference for cooperatives and similar structures.` },
      { kind: 'match', q: 'Match each model to what it puts in play.', pairs: [['Developer-led', 'The developer carries capital and technical risk. The village gets what the deal gives it'], ['Cooperative', 'Members own and govern. Governance and a finance record have to be built'], ['Public-service model', 'A public body owns the asset to serve a public need, such as a school or a water system'], ['Household', 'Each household carries the cost and keeps the saving']], why: 'The technology can be identical. The ownership decides who controls it and who gains.' },
      { kind: 'read', title: 'What does decentralised mean?', body: `Decentralisation can mean who owns, who decides, who does the service work, or who gets the benefits. A local service can still depend on outside engineering and on the electricity network.\n\nCompare demand reduction, efficiency and operating changes with supply options before choosing equipment.` },
      { kind: 'choice', q: 'A village wants a solar pump for every farmer. What comes before the equipment choice?', options: ['The panel brand', 'Comparing demand reduction, efficiency and supply options for the service', 'Collecting quotations'], answer: 1, why: 'Equipment is chosen last. A cheaper pump can also raise pressure on groundwater, so the service question comes first.' },
    ],
  },
  {
    id: 'sol-2', unit: 'solutioning', title: 'Banchari: what a project still needs', minutes: 7, owners: ['project', 'district'],
    watch: 'Land, will and a Panchayat contribution treated as if they made a bankable project.',
    source: `${PLAY}, sections 3.4 and 4.4; Rural JET framework, Banchari case; Palwal governance briefing`,
    cards: [
      { kind: 'read', title: 'Land and will are not a project', body: `Banchari’s Panchayat is interested in a larger solar project. It would put in capital, and land is close to the grid. That helps. It does not make a bankable project.\n\nWhat decides it: feasibility, a project vehicle, a buyer, a power purchase agreement, a detailed project report, finance, who operates it, and how benefits are shared.`, terms: ['dpr', 'ppa'] },
      { kind: 'read', title: 'The evidence boundary', body: `No completed feasibility or financing case exists for Banchari, and land figures differ between project papers. Use the case to ask what a project still needs. It does not prove an investment model.` },
      { kind: 'match', q: 'Match each missing item to the question it answers.', pairs: [['Feasibility study', 'Is the site and the technology sound?'], ['Buyer and PPA', 'Who takes the power, and at what price?'], ['Project vehicle', 'Which body owns, borrows and signs?'], ['O&M plan', 'Who keeps it running after commissioning?']], why: 'A lender will ask each of these. A gap in any one stalls the proposal.' },
      { kind: 'read', title: 'Where it stalls: interest to feasibility', body: `In Palwal, authority and delivery are spread across the district administration, urban local bodies, Panchayats, the state renewable agency, the electricity distribution company and line departments.\n\nWhen interest exists but no office owns the step to a scoped study, the idea waits. A district that names one owner for that step removes the most common stall.`, terms: ['ulb', 'hareda', 'dhbvn'] },
    ],
  },
  {
    id: 'sol-3', unit: 'solutioning', title: 'The planning canvas', minutes: 10, owners: ['project', 'community', 'district'], checkpoint: true,
    source: `${PLAY}, sections 4.4 and 11`,
    cards: [
      { kind: 'read', title: 'A project planning canvas', body: `Each project concept fills one canvas, in this order: problem; users and beneficiaries; asset and site; technical option; ownership; revenue or savings; approvals; partners; operation and maintenance; justice and benefit sharing; evidence still required; next development step.\n\nA blank cell names what is missing. It is not hidden.` },
      { kind: 'read', title: 'A district can run this for many places', body: `A project planning facility gives small places the preparation capacity they lack: a shared team, templates and a route to finance.\n\nThe district’s role is not to own every project. It convenes, aggregates, resolves hand-offs, provides or buys preparation support, and connects local bodies to finance and technical help. The Green Gram project pipeline, linked from the top of every page, applies the same idea as a working example.` },
      { kind: 'choice', q: 'A concept has a problem, users and a site but blank cells for the buyer and for operation. What is it?', options: ['Ready for finance', 'A concept that can enter pre-feasibility with two named gaps', 'A failed project'], answer: 1, why: 'The output of this stage is three to five concepts defined well enough to enter pre-feasibility and partner talks. Named gaps are part of that.' },
      { kind: 'play', title: 'Playable exercise: Build the pathway (40 minutes)', body: `**For teams of four to six with a facilitator.**\n\nGive every team the same opportunity, for example solar on public buildings. Each builds a different delivery model: one uses a developer, one a cooperative, one a public-service model, one a portfolio of smaller interventions. Fill the canvas. Then negotiate across teams.\n\n**Reveal:** no model is correct. Each team names the cost it pushed onto someone else.\n\n**Working alone:** fill the canvas twice for one idea, with two different owners.` },
    ],
  },
  {
    id: 'fund-1', unit: 'fund', title: 'Finance is part of the design', minutes: 6, owners: ['project'],
    readings: ['solar-04'], source: `${PLAY}, section 4.5`,
    cards: [
      { kind: 'read', title: 'Five questions before you ask for money', body: `What does it cost? What produces revenue or savings? What public value is created? Who carries which risks? Which form of capital fits?\n\nFinance is part of the design. It is not the last request.` },
      { kind: 'read', title: 'Four things that are not finance', body: `A household subsidy is not project finance. A Panchayat contribution does not unlock the balance. Municipal savings are not cash revenue. A productive-use asset needs a service or business model that pays.` },
      { kind: 'choice', q: 'A Panchayat offers a contribution from its own funds. Does that close the gap?', options: ['Yes. It unlocks the rest', 'No. It is one part of a capital stack, and the balance still needs a source and a buyer', 'Only if land is included'], answer: 1, why: 'A contribution shows commitment. Lenders and scheme managers still need a project vehicle, a revenue route and a buyer.' },
      { kind: 'read', title: 'Creditworthiness', body: `For a municipality, look at revenue streams, savings, procurement capability and credit standing. For a Panchayat, look at scheme convergence, land or equity contribution, cooperative or developer models, and how projects can be grouped.\n\nBanks, philanthropies or a local community fund can each lead. Each reads risk differently.`, terms: ['capstack'] },
    ],
  },
  {
    id: 'fund-2', unit: 'fund', title: 'A household ledger: what binds', minutes: 8, owners: ['project', 'community'],
    watch: 'A campaign about 25-year savings aimed at households that cannot cross the first two months.',
    readings: ['solar-05'], source: `PM Surya Ghar household financial analysis, Palwal (Civic Games Lab), checked there against published 2026 sources. Confirm current rules with the state renewable agency and the distribution company`,
    cards: [
      { kind: 'read', title: 'The model', body: `A 2 kW rooftop system on a domestic connection in Palwal.\n\n- Cost: ₹1,20,000.\n- Loan: 90 per cent, ₹1,08,000, at 7.25 per cent over 60 months.\n- Bill before solar: about ₹1,300 a month.\n- Central subsidy: ₹60,000 for 2 kW.\n- Haryana top-up by income band: up to ₹50,000, up to ₹20,000, or none.\n\nThese are from the project’s household analysis. Rules and rates change, so confirm them.`, terms: ['cfa'] },
      { kind: 'choice', q: 'In the model every household saves money over 25 years. What blocks adoption?', options: ['Long-run profit', 'Short-run cash: about ₹18,000 upfront and a two-month gap', 'The panels'], answer: 1, why: 'The analysis finds that profit is not the binding constraint. Short-run liquidity is.' },
      { kind: 'read', title: 'The two-month gap', body: `Before the subsidy arrives, the household pays the full instalment of about ₹2,301 a month against a previous bill of about ₹1,300. That is a gap of about ₹1,001 a month for two months.\n\nThe lowest-income household gains most over time. It breaks even by month 18. It is also the household that finds the gap hardest to cross.` },
      { kind: 'match', q: 'Match each income band to its breakeven month.', pairs: [['Income up to ₹1.80 lakh', 'Month 18'], ['₹1.80 to ₹3.00 lakh', 'Month 37'], ['Above ₹3.00 lakh', 'Month 69']], why: 'Over 25 years the net savings in the model are about ₹2.93 lakh, ₹2.57 lakh and ₹2.34 lakh. The lowest band breaks even fastest and has the least cash to start.' },
      { kind: 'read', title: 'Eligibility hides in conditions', body: `The state top-up asks for no default on an electricity bill, and consumption and sanctioned load within set bands, broadly up to 2,400 units a year and 2 kW. A household that misses either condition gets the central subsidy but not the top-up. It then lands in the third band’s outcome.` },
      { kind: 'choice', q: 'Which change targets the binding constraint?', options: ['A campaign on 25-year savings', 'A way to bridge the upfront cash and the two-month gap', 'More vendors'], answer: 1, why: 'The long-run case is already clear. The obstacle is cash in the first months.' },
    ],
  },
  {
    id: 'fund-3', unit: 'fund', title: 'Who pays for ₹100?', minutes: 10, owners: ['project', 'district', 'community'], checkpoint: true,
    source: `${PLAY}, sections 4.5 and 7`,
    cards: [
      { kind: 'read', title: 'The capital stack', body: `A project is funded from a mix: the local body’s own contribution, public scheme support, debt, developer equity, grants or blended capital, and revenue or offtake.\n\nEach source carries a different risk and arrives at a different time.`, terms: ['capstack'] },
      { kind: 'choice', q: 'A subsidy arrives six months late. Who carries the cost?', options: ['Nobody', 'Whoever bridged it: the household, the lender, the developer or the local body', 'The scheme'], answer: 1, why: 'Timing shifts risk to whoever holds the gap. The design should say who that is in advance.' },
      { kind: 'play', title: 'Playable exercise: Who pays for the transition? (40 minutes)', body: `**For teams with a facilitator.**\n\nGive each team a project and a notional ₹100 capital need. Teams assemble a mix from six sources using tokens.\n\nThen draw event cards: subsidy timing slips, interest rates rise, demand falls, cost goes up. After each card the team rebalances and says who bears the change.\n\n**Reveal:** no mix survives every card. The debrief question: which mix left the least able party holding the risk?\n\n**Working alone:** fill the table for your own project and rerun it with one event card.` },
      { kind: 'read', title: 'Return is more than money', body: `Record what a project returns beyond cash: bills saved, service reliability, jobs, skills that stay local, health, and who receives each. Put them beside the money figures so lenders and residents see the same page.` },
    ],
  },
  {
    id: 'impl-1', unit: 'implement', title: 'Installation is not the end', minutes: 6, owners: ['project', 'district'],
    readings: ['solar-09', 'solar-10'], source: `${PLAY}, sections 4.6 and 6; Enabling Ecosystem paper; Nairobi solar repair study`,
    cards: [
      { kind: 'read', title: 'What a project has to survive', body: `Approvals, procurement, hand-offs between institutions, contractor performance, community response, grid interaction, maintenance, and political or staff change.\n\nInstalling the asset is the middle of the story.` },
      { kind: 'read', title: 'Installers are not repairers', body: `In Nairobi, solar work sat mostly in sales, and sealed kits shut out local repair technicians. The enabling-ecosystem analysis separates installation capacity from maintenance capacity.\n\nDesign repair in from the start.` },
      { kind: 'choice', q: 'A village has 100 working systems. The vendor leaves. What did the design miss?', options: ['More panels', 'A local maintenance and accountability arrangement', 'A larger subsidy'], answer: 1, why: 'After-sales support and repair are named as weak points in several studies. They belong in the design of the project.' },
      { kind: 'read', title: 'Officials are transition actors too', body: `Engineers and officials asked to run unfamiliar programmes need clear roles, technical confidence and an escalation route. Caution in an office is a design problem to fix.` },
    ],
  },
  {
    id: 'impl-2', unit: 'implement', title: 'The orphaned plant', minutes: 7, owners: ['district', 'project'],
    watch: 'A project that appears on nobody’s dashboard.',
    source: `Governing the Peri-Urban Energy Transition (Palwal), section 5; The Future Municipal Committee paper. Status as reported in media in early 2025. Check the current position`,
    cards: [
      { kind: 'read', title: 'A 500 kW plant that belonged to no one', body: `A 500 kW grid-connected plant was proposed near Bahin village in Hathin tehsil to give farm feeders a steady daytime supply. As reported in early 2025, more than a year after the announcement, no civil work had started.\n\nAsked for its status, the distribution company’s senior engineer said he had no information. The Deputy Commissioner said he would inquire. No office held the project.` },
      { kind: 'read', title: 'The contrast', body: `In the same area, a philanthropic group put small solar systems on three government schools in a nearby village and opened a library, in 2018 and 2019.\n\nThe research reads the difference as institutional. It reads it as neither geographic nor technical.` },
      { kind: 'choice', q: 'What would have made the delay visible?', options: ['A larger plant', 'A standing public register with a dated entry for every energy project in the area', 'A new department'], answer: 1, why: 'A register turns an invisible delay into a dated line item and outlasts a transfer or an election cycle.' },
      { kind: 'read', title: 'What a small town can and cannot do', body: `A small municipal committee cannot run an energy department. It can keep a status register, gather demand, help citizens through schemes and convene neighbouring Panchayats.\n\nThe research proposes limiting the role to checklist tasks that survive staff turnover, since technical staff are few and often on contract.` },
    ],
  },
  {
    id: 'impl-3', unit: 'implement', title: 'When everything goes wrong, and what comes back', minutes: 10, owners: ['project', 'district', 'community'], checkpoint: true,
    source: `${PLAY}, sections 4.6, 7 and 11`,
    cards: [
      { kind: 'read', title: 'The implementation chain', body: `Write down who acts, who answers for it, who is consulted and who is told. Keep a risk register, an operation and maintenance plan, and a route for complaints.\n\nMonitor what matters: working assets, savings or revenue, service quality, participation, jobs, who gains and who does not, and how long projects take to move from idea to asset.`, terms: ['raci', 'mrv'] },
      { kind: 'choice', q: 'A community group objects after work begins. Where does the complaint go?', options: ['Nowhere. Work continues', 'To a named grievance route agreed before the project started', 'To the vendor alone'], answer: 1, why: 'A complaint route has to exist before the objection does. Otherwise the objection becomes a stall.' },
      { kind: 'play', title: 'Playable exercise: Everything goes wrong (45 minutes)', body: `**For teams with a facilitator.**\n\nRun a project through event cards: the subsidy is delayed, the vendor disappears, a transformer limit appears, a community group objects, an agreement stalls, a technician is unavailable, new local leadership changes priorities, a solar pump raises a groundwater concern.\n\nFor each card the team says who acts, what the escalation route is, and what should have been designed differently.\n\n**Reveal:** at least one card has no owner on the team’s chain.\n\n**Working alone:** draw your chain and mark an owner against each shock.` },
      { kind: 'read', title: 'Close the loop', body: `Do locally what can be done locally. Group what gains from scale. Escalate only what needs outside authority, technology or capital.\n\nThen feed what monitoring shows into the next round. A rooftop programme creates installers and repair work. Public-building solar gives a municipality procurement practice. Better preparation makes the next project easier to finance.\n\nToday’s solution creates tomorrow’s opportunity.` },
      { kind: 'choice', q: 'A local body finishes its first project. What is the next step?', options: ['Stop. The work is done', 'Return to Filter with the learning record and the next local problem', 'Repeat the same project'], answer: 1, why: 'The six stages form a loop. The learning record from Implement is the first input to the next Filter.' },
    ],
  },
];
