/** Green skills courses. The eleven research papers, split by concept into short lessons.
 *  Every claim carries an evidence tag: [[reading-id|label]] links to the paper's brief in the sources library.
 *  English only for now. */
import type { Card } from './framework';
import { BIOGAS_COURSE, SOLAR_COURSE, WATER_RAIN_LESSON, EVIDENCE_CAPSTONE } from './courses-practical';

export type CourseLesson = {
  id: string;
  title: string;
  minutes: number;
  /** Sources library entries this lesson draws on. Every [[id|label]] tag must appear here. */
  readings: string[];
  cards: Card[];
};

export type CourseDef = {
  id: string;
  n: number;
  title: string;
  question: string;
  blurb: string;
  /** Framework stage this course feeds. */
  feeds: string;
  lessons: CourseLesson[];
};

const BASE: CourseDef[] = [
  {
    id: 'evidence', n: 0, title: 'Reading the evidence', feeds: 'filter',
    question: 'What do the studies agree on, and what has nobody studied for a Haryana village?',
    blurb: 'Start here. Four findings repeat across eleven studies, and each study has limits you should know before you use it.',
    lessons: [
      {
        id: 'ev-1', title: 'Four findings that repeat', minutes: 6, readings: ['solar-07a', 'biogas-08', 'solar-08', 'solar-10', 'solar-09', 'solar-13'],
        cards: [
          { kind: 'read', title: 'Cash, assets and connections', body: `Eleven studies and reports sit behind this site. Four findings show up again and again.\n\nFirst, **uptake follows cash, assets and connections.** In India’s national survey, biogas owners had more income, more cattle, electricity and a toilet [[biogas-08|India, 10,384 households, survey]]. In Kerala, homes without rooftop solar liked the idea but named cost, payback and information as the barriers [[solar-08|Kerala, 52 households, interviews]].\n\nSecond, **trained is not the same as employed.** The Suryamitra programme trained 48,157 people by FY20, yet placement fell and few earned much [[solar-10|India, programme data FY16 to FY20]].` },
          { kind: 'read', title: 'Repair, and who gets in', body: `Third, **repair and upkeep are the gap.** In Nairobi, solar jobs sat in sales and sealed kits shut out local repair technicians [[solar-09|Nairobi, about 30 interviews]].\n\nFourth, **who gets in matters as much as what is taught.** A review of close to 300 sources argues that women are held back less by missing skills than by social norms and missing openings such as credit, travel and family consent [[solar-13|global review, 24 interviews]].\n\nThese are patterns across different methods. The studies were not pooled, so treat each as a theme to test in your own village, not as a rule.` },
          { kind: 'choice', q: 'Four studies agree that uptake follows cash, assets and information. What does that suggest a village should check first?', options: ['Whether people are interested in clean energy', 'Who can pay, who has the assets, and who has a straight answer on cost', 'Which technology is newest'], answer: 1, why: 'In these studies interest was not the barrier. Money, information and neighbours were.' },
        ],
      },
      {
        id: 'ev-2', title: 'What a survey can and cannot tell you', minutes: 6, readings: ['solar-07a', 'solar-11', 'biogas-10'],
        cards: [
          { kind: 'read', title: 'Association is not cause', body: `Most of this evidence is a snapshot. A survey records what people said or owned on one day. It shows that two things go together, not that one causes the other.\n\nTake the survey of 251 farmers in north India [[solar-11|Haryana, UP and Delhi NCR, 251 farmers, questionnaire]]. Farmers who reported more community involvement also reported more use of renewables. That is a link. It does not prove that neighbours cause adoption. Better-off farmers may simply have both.\n\nThe same paper shows a second problem. Its text and its table give different numbers for the same link, 0.373 and 0.627. When a paper disagrees with itself, quote it with care or leave it out.` },
          { kind: 'read', title: 'Snapshots age and travel badly', body: `The Bibipur survey counted how one Haryana village used energy [[biogas-10|Bibipur, Jind, 2004, door-to-door survey]]. It is useful because it is Haryana. It is also one village, surveyed over twenty years ago, with no comparison.\n\nBefore you use a number from any study, ask four things: how many people, where, when, and what did it measure. A figure with no answer to those is a rumour with a citation.\n\nThe facilitator box in each source reading in the library lists these limits for that paper.` },
          { kind: 'choice', q: 'A survey finds farmers who reported more community involvement also used more solar. Which claim does it support?', options: ['Community groups cause farmers to adopt solar', 'The two went together in this sample', 'Every village should start a cooperative'], answer: 1, why: 'A single survey shows association. It cannot show which came first, or whether a third factor drives both.' },
        ],
      },
      {
        id: 'ev-3', title: 'What nobody has studied yet', minutes: 5, readings: ['solar-07a', 'biogas-10', 'solar-11'],
        cards: [
          { kind: 'read', title: 'Gaps that matter for a Haryana village', body: `The research is silent exactly where a village like Malai needs it.\n\n**Almost nothing is from Haryana.** Bibipur is a single village surveyed in 2004 [[biogas-10|Bibipur, Jind, 2004]]. The farmer survey covers Haryana, western Uttar Pradesh and Delhi NCR but reports no separate results [[solar-11|251 farmers, three areas pooled]].\n\n**No study tests solar on grid-fed tubewells**, the case in Malai. **No study follows the skills of a village biogas operator.** The adoption survey names the daily work but does not study who does it.\n\nSubsidy figures also differ between sources [[solar-07a|survey of eleven studies]]. Check with HAREDA or the DISCOM before anyone commits money.` },
          { kind: 'read', title: 'Turn the gaps into local questions', body: `A gap in the literature is a job for the village. Ask your own farmers how their pumps run and who fixes them. Count the households that cook on dung and firewood. Write down what a local technician charges.\n\nThis is what a baseline survey is for. It is the first output of the framework’s Contextualise stage, and it is how a village builds evidence the papers do not have.` },
          { kind: 'choice', q: 'The studies say nothing about solar on grid-fed tubewells. What should a village do?', options: ['Assume the findings on solar pumps apply anyway', 'Collect its own local facts and ask HAREDA or the DISCOM', 'Wait for a study to be published'], answer: 1, why: 'Where evidence is missing, local data and the people who run the schemes fill the gap.' },
        ],
      },
    ],
  },
  {
    id: 'uptake', n: 1, title: 'Who takes up green energy, and who is left out', feeds: 'contextualise',
    question: 'Why do some households and farmers adopt clean energy and others do not?',
    blurb: 'Cash, cattle, information and neighbours: what decided uptake in the studies, and what it means for a shared plant or pump.',
    lessons: [
      {
        id: 'up-1', title: 'Interest is not the barrier', minutes: 6, readings: ['solar-08', 'solar-11'],
        cards: [
          { kind: 'read', title: 'Most people like the idea', body: `Ask a household about rooftop solar and most say yes. In Kerala, researchers interviewed 52 households that had not installed it. Of the answers about first thoughts, 75% were moderately or very positive [[solar-08|Kerala, 52 households, interviews]].\n\nSo why had they not installed? The researchers counted mentions of each barrier: financial 55, information 41, technical 37, regulatory 19, social 9, psychological 8. Money came first, then not knowing enough.` },
          { kind: 'read', title: 'Cost, payback and the roof', body: `The authors conclude that high upfront cost and doubt about the return were the biggest deterrents. Households also lacked good information, and the authors say current ways of giving it are inadequate.\n\nThe roof was a barrier too: too little space, or poor orientation.\n\nFarmers named a similar set. A survey of 251 farmers listed four barriers: upfront cost, limited access to finance, too little technical knowledge, and maintenance and operating problems [[solar-11|251 farmers, questionnaire]]. Two of those four are about skills, not money.` },
          { kind: 'read', title: 'What this means for a scheme', body: `If interest is high and uptake is low, the gap sits between the two. A household has to get a full cost and a payback time in writing, have its roof checked, and find someone it trusts to install and service the system.\n\nThe Kerala study looked at home roofs, with a small, highly educated sample, and its authors warn against applying it to other regions. It did not test tubewell pumps. Treat it as a list of questions to ask, not a forecast.` },
          { kind: 'choice', q: 'Interest in rooftop solar is high in a village, but few households have installed it. Where do you look first?', options: ['Try to raise interest with more awareness drives', 'Cost, payback, the roof, and who gives a straight answer', 'Replace the scheme'], answer: 1, why: 'In the Kerala interviews, positive views were common. The barriers were cost, information and the roof.' },
        ],
      },
      {
        id: 'up-2', title: 'Assets decide who gets in', minutes: 6, readings: ['biogas-08'],
        cards: [
          { kind: 'read', title: 'Who owns a biogas plant', body: `Only 167 of 10,384 rural households in India’s national survey owned a biogas plant [[biogas-08|India Human Development Survey, 10,384 households]]. Owners looked different from non-owners.\n\nAverage monthly income was ₹10,912 for owners and ₹3,768 for non-owners. Owners had 5.36 cattle on average, non-owners 2.82. Electricity: 92.2% of owners and 68.5% of non-owners. A toilet with a tank: 60.7% and 26.7%.\n\nHouseholds from scheduled castes and tribes were 10.7% of owners and 27.7% of non-owners, and less likely to own a plant once other factors were counted.` },
          { kind: 'read', title: 'Labour and credit', body: `A plant needs feeding and cleaning every day. The paper found that families with many children and few adults were less likely to own one, and links this to labour [[biogas-08|same survey]].\n\nCredit is the other door. The paper quotes NABARD figures of ₹16,250 for the equipment of a small plant against a maximum subsidy of ₹15,000, and says banks hesitate to lend without collateral. Its authors recommend microfinance, insurance for the cattle of poor families, and community plants where households with no land or cows give labour instead of cash.\n\nThis is a snapshot from 2008 data. It shows who owns plants, not why, and Haryana is not reported separately.` },
          { kind: 'choice', q: 'A village plans a shared biogas plant. Which households does the national survey suggest are most likely to be left out?', options: ['Households with cattle, a toilet and steady power', 'Households with few cattle, little cash and no collateral', 'Households near the plant site'], answer: 1, why: 'Ownership followed cattle, cash and services. A community design that takes labour instead of cash is one way to open the door.' },
        ],
      },
      {
        id: 'up-3', title: 'Neighbours move farmers', minutes: 6, readings: ['solar-11'],
        cards: [
          { kind: 'read', title: 'The strongest link was the community', body: `Researchers asked 251 farmers in rural Haryana, western Uttar Pradesh and the Delhi NCR belt what goes with using renewable energy on the farm [[solar-11|251 farmers, questionnaire, structural model]].\n\nCommunity ties came out strongest. Farmers who reported more community involvement, peer influence and cooperative activity reported more use of renewables (link strength 0.430). Government support counted too: subsidies and incentives went with more adoption (0.307).\n\nFarmers who reported more adoption also reported higher productivity, and higher productivity went with better financial stability.` },
          { kind: 'read', title: 'What it does not prove', body: `These are what farmers agreed with on a five-point scale, not measured yields or income. The links are associations. The paper’s own numbers conflict in places, and its result on barriers is not usable, since it reports a positive link where its text says barriers hold adoption back [[solar-11|same survey]].\n\nStill, the direction is worth testing. Farmers in the study adopted more where neighbours shared what worked. A village with a cooperative or a farmers’ group already has that channel.` },
          { kind: 'choice', q: 'The farmer survey links community involvement to more solar use. What is the safest way to use that finding?', options: ['Claim that cooperatives cause adoption', 'Use existing farmer groups as a channel and test whether it works locally', 'Ignore it because it is only a survey'], answer: 1, why: 'The finding is an association from self-reported answers. It justifies a local trial, not a claim of cause.' },
        ],
      },
    ],
  },
  {
    id: 'skills', n: 2, title: 'Skills and jobs', feeds: 'contextualise',
    question: 'Who can actually do the work, and who gets the chance to learn it?',
    blurb: 'Trained is not employed. Repair is the missing trade. And a green skill is wider than a technical one.',
    lessons: [
      {
        id: 'sk-1', title: 'Trained is not employed', minutes: 6, readings: ['solar-10'],
        cards: [
          { kind: 'read', title: 'What Suryamitra promised', body: `India’s Suryamitra programme, started in 2015, trains people for solar installation and maintenance. The course is 600 hours, about three months, residential and free. By FY20 it had trained 48,157 people [[solar-10|India, programme data FY16 to FY20, 28 interviews]].\n\nTraining partners say 70 to 75% of graduates get a job offer. Government training data shows an average of 51% from FY16 to FY20, falling from 61% in FY16 to 31% in FY21.` },
          { kind: 'read', title: 'What happened to the graduates', body: `Only 18% of Suryamitras were on a company payroll. In FY16 about 70% earned under ₹10,000 a month. Only 4% were still in solar after three years [[solar-10|same report]].\n\nTraining and demand did not match. In FY20 Karnataka needed 1,019 workers and trained 711. Uttar Pradesh needed 67 and trained 1,831. One training partner’s kit supports up to 2 kW, while employers mostly hire for plants of a megawatt or more.\n\nThe database is poorly maintained on placements, by the authors’ own account, and the interview sample is small.` },
          { kind: 'read', title: 'Local work is the gap', body: `Many graduates left because the jobs were out of state, on contract and poorly paid. The authors recommend a stream for solar entrepreneurs, shorter or hybrid training, and job fairs with local companies [[solar-10|same report]].\n\nA certificate does not create work. Jobs depend on where solar is being built. A village that wants local technicians has to create the demand, through rooftops, pumps and service contracts, as well as the training.` },
          { kind: 'choice', q: 'A village sends six young people to a three-month solar course. What should it plan alongside?', options: ['Nothing, the certificate is enough', 'Where the local work will come from after they return', 'A second course'], answer: 1, why: 'Placement fell and many graduates left the sector. Training without local demand does not produce local jobs.' },
        ],
      },
      {
        id: 'sk-2', title: 'Repair is the missing trade', minutes: 6, readings: ['solar-09', 'solar-12', 'solar-08', 'solar-11'],
        cards: [
          { kind: 'read', title: 'Jobs in selling, not fixing', body: `In Kenya in 2017 to 2018, renewables and off-grid energy had 25,000 direct jobs. Sale and distribution made up 40%. Operation and maintenance made up 5% [[solar-09|Nairobi, about 30 interviews, census figures]].\n\nNairobi already had self-employed repairers, called fundis. Companies preferred to replace rather than repair, and placed little faith in their skills. Some kits were built to stay closed: company-specific screws, and circuit boards coated in paint so part numbers could not be read.` },
          { kind: 'read', title: 'The same gap shows up elsewhere', body: `A policy brief on Indian irrigation pumps names lower flow than diesel pumps, poor panels and no after-sales support as problems farmers reported [[solar-12|Bihar and UP, 26 interviews]]. The farmer survey lists maintenance among its four barriers [[solar-11|251 farmers]]. The Kerala study recommends training local technicians for installation and maintenance [[solar-08|Kerala, 52 households]].\n\nFour studies, four places, one gap. The Nairobi findings describe pay-as-you-go home kits and Kenyan rules, not Haryana, so use them as a question to ask vendors rather than a fact about them.` },
          { kind: 'read', title: 'What a buyer can ask', body: `Before a household or group buys, it can ask: can a local technician open it, and are spare parts available nearby? It should keep the bill, since warranties often fail when buyers cannot prove the purchase date [[solar-09|Nairobi study]].\n\nFor a village, the trade to grow is the local repairer who already fixes pumps and electronics, given the extra skills to service solar.` },
          { kind: 'choice', q: 'You are choosing a solar pump supplier for a village group. Which question protects you most?', options: ['Is it the cheapest?', 'Can a technician nearby open it, and are spare parts close?', 'Is it the newest model?'], answer: 1, why: 'Repair and after-sales support were the weak point in four different studies.' },
        ],
      },
      {
        id: 'sk-3', title: 'What counts as a green skill, and who gets in', minutes: 6, readings: ['solar-13'],
        cards: [
          { kind: 'read', title: 'Three kinds of green skill', body: `A review of close to 300 sources, with 24 interviews, argues that green skills are wider than technical skills [[solar-13|global review, 24 interviews]].\n\nThere are **specific skills** for green jobs, such as engineering. There are **life skills**, such as critical thinking. And there are **transformative skills**, such as reading how power works and acting together.\n\nCountries’ climate plans lean towards the technical kind. Only 24% of the plans the authors reviewed mention education for children and youth.` },
          { kind: 'read', title: 'Skills need openings', body: `Girls are 35% of students in STEM-related fields worldwide, though their results are as good as boys’ or better in most countries. In a survey the paper cites, women in renewable energy ranked lack of STEM skills as the lowest barrier. Social and cultural norms came first [[solar-13|same review]].\n\nSkills have to come with openings: policies, institutions, networks and norms. Discriminatory lending is the paper’s example of a block.\n\nGreen work is also wider than energy. Teachers and community health workers do work that is already low carbon, and mostly done by women.` },
          { kind: 'read', title: 'What this means for a solar course', body: `A solar course opens a door only if people can walk through it. Ask who hears about it, who can travel to it, who can get a loan afterwards and who the family lets take the work.\n\nThe paper does not discuss India, and it focuses on adolescent girls and national education policy. It does not test whether any training programme works. Use it for its questions.` },
          { kind: 'choice', q: 'Few women from a village sign up for a solar repair course. Which diagnosis fits the paper best?', options: ['They lack technical skills', 'Norms, travel, credit or family consent may be the barrier, so check those first', 'They are not interested in green work'], answer: 1, why: 'In the survey the paper cites, women ranked lack of skills as the lowest barrier and social norms as the highest.' },
        ],
      },
    ],
  },
  {
    id: 'health', n: 3, title: 'Cooking, energy and health', feeds: 'filter',
    question: 'What does a village burn, what does it cost the people who cook, and what would change it?',
    blurb: 'A Haryana village energy survey, a clinical study of cooking smoke, and why a gas connection is not the same as daily use.',
    lessons: [
      {
        id: 'he-1', title: 'What a village actually burns', minutes: 6, readings: ['biogas-10'],
        cards: [
          { kind: 'read', title: 'Bibipur in numbers', body: `Researchers surveyed Bibipur in Jind district in December 2004: 445 houses, 2,670 people and 2,225 animals [[biogas-10|Bibipur, Jind, 2004, door-to-door survey]].\n\nCooking used the most household energy, 52.51% of it. About 98% of households cooked on biomass: crop residue, cow dung and firewood. As shares of domestic energy, firewood was 20.21%, cow dung 19.5%, LPG 7.96% and biogas 2.98%.\n\nOn farms, irrigation took the largest share, 41.7%, followed by tilling at 35%.` },
          { kind: 'read', title: 'Efficiency and what families wanted', body: `The paper gives thermal efficiency as 9 to 10% for a chullah burning straw, 35% for biogas and 85% for LPG [[biogas-10|same survey]].\n\nViews on biogas were split: 35.8% of families liked it very much and 40.8% did not like it. Asked what they would choose if money were given, 42.5% said LPG and 50.5% said electricity. A plant has to compete with a fuel people already ask for.\n\nThe paper has inconsistencies, for example cooking is 52.1% in the abstract and 52.51% in the table. The data are over 20 years old and come from one village. Use it as a pattern, not as a figure for Malai.` },
          { kind: 'choice', q: 'Families in Bibipur said they wanted LPG and electricity first. What does that mean for a biogas plant?', options: ['Drop biogas', 'Design it to win against LPG on cost, convenience and reliability', 'Assume families will switch once it exists'], answer: 1, why: 'A plant competes with a fuel that people already prefer. The design has to answer why a family would use it daily.' },
        ],
      },
      {
        id: 'he-2', title: 'What smoke does', minutes: 6, readings: ['biogas-09'],
        cards: [
          { kind: 'read', title: 'Two groups of women in Mysuru', body: `Doctors in Mysuru compared women aged 40 and over who had never smoked and were the main cook at home. 903 rural women cooked only on wood. 441 periurban women cooked only on LPG. They used questionnaires, breathing tests and a breath test for airway inflammation [[biogas-09|Mysuru, 1,344 women, clinical measures]].` },
          { kind: 'read', title: 'What they found', body: `COPD, a long-term lung condition that narrows the airways, was found in 3.90% of wood users and 1.59% of LPG users. Cough: 44.5% against 30.2%. Chronic bronchitis: 2.55% against 0%. A high airway-inflammation reading: 20.3% against 8.1% [[biogas-09|same study]].\n\nMore years and hours at the stove went with more problems. The authors multiplied years of cooking by hours a day. Chronic bronchitis was linked to a score of 60 or more, and COPD to a score of 90 or more.` },
          { kind: 'read', title: 'Limits', body: `The study compared wood with LPG. It did not test biogas. The groups also differed in education and living standard: 80.7% of wood users had a low standard of living against 20.4% of LPG users, which the authors name as a limit. There were only 35 COPD cases among wood users. Exposure was estimated, not measured in the air [[biogas-09|same study]].\n\nThe pattern is clear and clinical, but it is from Karnataka and does not say what biogas would do in Haryana.` },
          { kind: 'choice', q: 'The Mysuru study compared wood and LPG. What can a biogas project claim from it?', options: ['Biogas cuts lung disease by the same amount', 'Long daily hours cooking on wood went with more lung problems, so replacing wood is a health case worth testing', 'Nothing relevant'], answer: 1, why: 'The study did not test biogas. It supports the concern about wood smoke, not a specific benefit from a plant.' },
        ],
      },
      {
        id: 'he-3', title: 'A connection is not daily use', minutes: 5, readings: ['biogas-09', 'biogas-10'],
        cards: [
          { kind: 'read', title: 'Having the stove is not using it', body: `The Mysuru paper reports that 20% of beneficiaries of India’s LPG programme do not use their connection, and that beneficiaries take on average three free refills a year [[biogas-09|Mysuru, 1,344 women, policy discussion]]. It treats fewer than eight cylinders a year as continued reliance on biomass.\n\nBibipur shows the other side: 98% of homes cooked on biomass while LPG was already a first choice for families [[biogas-10|Bibipur, 2004]]. Wanting a cleaner fuel and using it every day are different things. The gap is cost, refills and habit.\n\nBoth papers come with limits. The Mysuru figures describe a national scheme as reported in a clinical paper, and Bibipur is one village surveyed in 2004. Neither measured daily use in a Haryana household today, so a village has to count it for itself.` },
          { kind: 'read', title: 'What this means for a village project', body: `A clean-cooking project should count daily use, not connections or plants installed. Ask how many households cook on the clean fuel most days, who still uses the chullah and why, and what it costs each month.\n\nThat measure belongs in the framework’s Implement stage, as part of monitoring after installation.` },
          { kind: 'choice', q: 'A scheme reports 400 new connections. What is the better question?', options: ['How many more connections can we add?', 'How many of those households cook on the clean fuel most days?', 'Which village connected first?'], answer: 1, why: 'A connection is an input. Daily use is the outcome the health case depends on.' },
        ],
      },
    ],
  },
  {
    id: 'water', n: 4, title: 'Water, pumps and soil', feeds: 'solutioning',
    question: 'What happens to water and land when energy gets cheaper or cleaner?',
    blurb: 'Why a solar pump does not protect the water table, why water has many users and no owner, and how soil builds carbon over years.',
    lessons: [
      {
        id: 'wa-1', title: 'Cheap power, falling water', minutes: 6, readings: ['solar-12'],
        cards: [
          { kind: 'read', title: 'From diesel to electric to solar', body: `A policy brief on India’s irrigation pump market uses national data and 26 interviews with farmers and dealers in Bihar and Uttar Pradesh [[solar-12|Bihar and UP, 26 interviews, national data]].\n\nAbout 9 million diesel and 21 million electric pumps are in use. Diesel rose from ₹38.5 a litre in 2010 to ₹89 in 2024, and farmers moved to electric.\n\nElectric pumps drew down groundwater. The brief names Punjab, Haryana, Rajasthan, Andhra Pradesh and Uttar Pradesh. In the northwest, only 18 to 25% of wells are classed as safe for extraction.` },
          { kind: 'read', title: 'Solar does not fix this by itself', body: `Diesel pumps are not scrapped when a solar pump is sold. Farmers with solar pumps still use diesel pumps [[solar-12|same brief]].\n\nA solar pump has no running cost for water, so the brief says farmers have no reason to pump less. A 5 hp solar pump in Uttar Pradesh costs ₹2,73,137. The government pays ₹1,63,882 and the farmer ₹1,09,255, against an average farm household income of ₹8,000 a month.\n\nThe brief calls for metered tubewells and better local groundwater data.` },
          { kind: 'read', title: 'Check the subsidy before you quote it', body: `The brief says the PM-KUSUM subsidy is 60% with 30% from loans and 10% from the farmer, yet its own Uttar Pradesh example has the farmer paying 40%. Another reading on this site gives 30% each from the Centre and State [[solar-12|same brief]].\n\nNo interviews were held in Haryana. Confirm the current figures with HAREDA before committing money.` },
          { kind: 'choice', q: 'A village installs solar tubewell pumps. What does the brief suggest is still needed to protect the water table?', options: ['Nothing, solar is clean', 'Metering or another way to manage how much water is pumped', 'More diesel pumps as backup'], answer: 1, why: 'Zero running cost removes the incentive to pump less. Water use has to be managed separately.' },
        ],
      },
      {
        id: 'wa-2', title: 'Water has many users and no owner', minutes: 5, readings: ['water-02'],
        cards: [
          { kind: 'read', title: 'Water sits inside the economy', body: `The Global Water Partnership wrote a policy paper in 2012 arguing that water security and green growth depend on each other [[water-02|global policy paper, 2012, no original data]].\n\nIt cites an estimate that at current rates of use, demand will exceed supply by as much as 40% by 2030. Agriculture uses as much as 90% of water in some countries, so gains in farm water use help other sectors too. 84 of 133 countries in a UN survey have plans for Integrated Water Resources Management, which balances efficiency, fairness between users and protection of nature.` },
          { kind: 'read', title: 'The local question', body: `The paper has nothing on India, Haryana or groundwater pumping. Its figures are quoted from other reports and its authors say it is unclear whether water investment drives growth or the reverse [[water-02|same paper]].\n\nWhat carries over is the question. Water is used by many people and often no single body is in charge, which is why it is easily overused. For a village: who uses the water, who decides, and what skills would better management need? The paper lists skills among the needs of a green transition but names no trades or courses.` },
          { kind: 'choice', q: 'Why does the global water paper matter for a village tubewell, if it has no Indian data?', options: ['It does not matter', 'It frames the right question: who uses the water, and who decides', 'It proves groundwater will run out by 2030'], answer: 1, why: 'The paper is a policy argument. Its value is the whole-system question, not any local figure.' },
        ],
      },
      {
        id: 'wa-3', title: 'Soil carbon builds slowly', minutes: 6, readings: ['regen-01'],
        cards: [
          { kind: 'read', title: 'What the review found', body: `Soil organic carbon is the carbon held in soil as decaying plant and animal matter. More of it improves fertility, water retention and yield stability. A review gathered 147 Indian field studies, covering 1,020 comparisons between a regenerative practice and a plain control [[regen-01|India, 147 studies, meta-analysis]].\n\nOverall, soil carbon rose by about 17% over unchanged fields. Farmyard manure led among the common practices, followed by green manure, compost, crop residue retention and fertiliser management. Less tillage alone scored lower and needs organic inputs alongside it.` },
          { kind: 'read', title: 'Time and limits', body: `Gains were larger in long-running studies, with a fast start that slows later. No single practice works everywhere, and where water limits plant growth, manure and green manure worked especially well [[regen-01|same review]].\n\nResults varied a lot between studies, and the paper reports nothing for Haryana. It measured soil carbon, not yield or income. It did not test biogas slurry. The paper says smallholders often need returns quickly and recommends support during the transition.` },
          { kind: 'choice', q: 'A farmer group wants quick income from regenerative practices. What does the review suggest?', options: ['Expect soil carbon gains in one season', 'Plan support for the transition years, since gains build over time', 'Use zero tillage alone'], answer: 1, why: 'Gains accumulate over years, and less tillage alone was weak without organic inputs.' },
        ],
      },
    ],
  },
];

const pick = (id: string) => BASE.find(c => c.id === id)!;
const ORDER: CourseDef[] = [
  { ...pick('evidence'), lessons: [...pick('evidence').lessons, EVIDENCE_CAPSTONE] },
  BIOGAS_COURSE,
  SOLAR_COURSE,
  { ...pick('water'), lessons: [WATER_RAIN_LESSON, ...pick('water').lessons] },
  pick('uptake'),
  pick('skills'),
  pick('health'),
];
export const COURSES: CourseDef[] = ORDER.map((c, i) => ({ ...c, n: i }));

export const courseById = (id: string) => COURSES.find(c => c.id === id);
export const courseLessonById = (id: string) => COURSES.flatMap(c => c.lessons).find(l => l.id === id);
export const courseOf = (lessonId: string) => COURSES.find(c => c.lessons.some(l => l.id === lessonId));
