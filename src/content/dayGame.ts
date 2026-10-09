/** A Day in Navapur: daily activities, the energy source chosen for each, what it uses, and what follows for health and environment.
 *  One data list, so the same activities and sources can be printed as cards later.
 *  A line with `tag` is backed by a reading. A line with `check: true` is a pattern to check locally, not a finding. */
export type Tag = { id: string; label: string };
export type Line = { text: string; tag?: Tag; check?: boolean };
export type Source = {
  id: string; label: string;
  /** What the source is, for the end-of-day tally. */
  kind: 'biomass' | 'lpg' | 'biogas' | 'grid' | 'sun' | 'rain' | 'diesel' | 'body' | 'none';
  smoke?: boolean; pump?: boolean;
  use: Line; health: Line; env: Line;
};
export type Activity = { id: string; title: string; prompt: string; sources: Source[] };

const BIB: Tag = { id: 'biogas-10', label: 'Bibipur, Jind, 2004, survey' };
const MYS: Tag = { id: 'biogas-09', label: 'Mysuru, 1,344 women, clinical measures' };
const BG1: Tag = { id: 'biogas-01', label: 'Green Skill Directory, biogas' };
const S12: Tag = { id: 'solar-12', label: 'Bihar and UP, 26 interviews, national data' };
const S05: Tag = { id: 'solar-05', label: 'Green Skill Directory, solar schemes' };
const W03: Tag = { id: 'water-03', label: 'Green Skill Directory, water section' };
const W05: Tag = { id: 'water-05', label: 'Green Skill Directory, water section' };

export const ACTIVITIES: Activity[] = [
  {
    id: 'cook', title: 'Cook the meal', prompt: 'Morning and evening, for the whole family. What do you cook on?',
    sources: [
      { id: 'chulha', label: 'Chulha: wood, dung cakes or crop residue', kind: 'biomass', smoke: true,
        use: { text: 'Burns biomass. In Bibipur, cooking took 52.51% of household energy and about 98% of households cooked on biomass. A straw chullah turns about 9 to 10% of the fuel into useful heat.', tag: BIB },
        health: { text: 'Smoke stays in the kitchen and reaches women and young children most. In Mysuru, 3.90% of women cooking only on wood had COPD, against 1.59% on LPG. It is an association, and the two groups differed in living standard.', tag: MYS },
        env: { text: 'Wood, dung and residue are burned, and dung burned as a cake does not go back to the soil. The readings give no emissions figure, so check locally.', check: true } },
      { id: 'lpg', label: 'LPG cylinder', kind: 'lpg',
        use: { text: 'A bought cylinder. The Bibipur paper gives about 85% efficiency, and 42.5% of families said they would choose LPG if money were given.', tag: BIB },
        health: { text: 'The LPG group in Mysuru had less COPD (1.59%), though those women also had a higher standard of living. A connection is not daily use: 20% of programme beneficiaries do not use theirs, and under 8 cylinders a year means continued reliance on biomass.', tag: MYS },
        env: { text: 'A fossil fuel brought in from outside the village, with a monthly cost. The readings give no emissions figure, so check locally.', check: true } },
      { id: 'biogas', label: 'Biogas from a plant', kind: 'biogas',
        use: { text: 'Fed by daily dung and run by someone trained. The Bibipur paper gives about 35% efficiency, though the paper has inconsistencies.', tag: BIB },
        health: { text: 'Cooking with biogas removes chulha smoke, which is why the directory treats it as a health measure. The Mysuru study did not test biogas, so the size of the benefit is untested.', tag: BG1 },
        env: { text: 'Dung becomes gas and slurry. Slurry needs its own handling and arrangement with farmers, and crop benefits are not automatic.', check: true } },
    ],
  },
  {
    id: 'bathe', title: 'Heat water and bathe', prompt: 'A bath for the family. How is the water heated?',
    sources: [
      { id: 'fire', label: 'Fire under the water pot', kind: 'biomass', smoke: true,
        use: { text: 'Heating water takes a lot of fuel compared with most household tasks, and the fire runs for longer.', check: true },
        health: { text: 'The same smoke exposure as cooking, for more hours. In the Mysuru study, problems rose with more years and hours at the stove.', tag: MYS },
        env: { text: 'More wood or dung burned. Check how much your village uses for water heating.', check: true } },
      { id: 'lpg', label: 'LPG burner', kind: 'lpg',
        use: { text: 'Uses cylinder gas, so the more water is heated the sooner the cylinder runs out.', check: true },
        health: { text: 'No smoke from the fuel at the point of use. Whether the family can afford to use it daily is the question.', check: true },
        env: { text: 'A fossil fuel brought in from outside the village.', check: true } },
      { id: 'geyser', label: 'Electric geyser on the grid', kind: 'grid',
        use: { text: 'Grid electricity, a short run at a high load. It depends on supply hours and on the wiring coping.', check: true },
        health: { text: 'No smoke in the home. Outages and cost decide whether it is used.', check: true },
        env: { text: 'Depends on how the grid power is made and on losses on the way. Check locally.', check: true } },
      { id: 'cold', label: 'Cold bucket bath', kind: 'body',
        use: { text: 'Body effort to carry water. No fuel.', check: true },
        health: { text: 'No smoke. Whether people wash less in the cold months is a question to ask.', check: true },
        env: { text: 'No fuel burned. The water still has to be fetched.', check: true } },
    ],
  },
  {
    id: 'water', title: 'Draw water and fill the tank', prompt: 'Water for drinking, cooking and washing. Where does it come from?',
    sources: [
      { id: 'carry', label: 'Carry it from a hand pump or well', kind: 'body',
        use: { text: 'Human effort and time, no fuel. Who carries it and how far is a question to ask in your village.', check: true },
        health: { text: 'Heavy loads and long walks have a physical cost, and the time is not spent on other things. Check who bears it.', check: true },
        env: { text: 'No energy used. Hand pumping still draws on groundwater.', check: true } },
      { id: 'gridpump', label: 'Grid-powered pump to a tank', kind: 'grid', pump: true,
        use: { text: 'Grid electricity runs the pump. People still need reliable supply hours.', check: true },
        health: { text: 'Water close to home saves time. Quality still has to be tested by a trained tester, whatever the source.', tag: W03 },
        env: { text: 'Cheap power can draw water down faster than the ground refills. In the northwest only 18 to 25% of wells are classed as safe for extraction.', tag: S12 } },
      { id: 'solarpump', label: 'Solar pump to a tank', kind: 'sun', pump: true,
        use: { text: 'Sun runs the pump by day and water is stored in a tank for later. A solar pump has no running cost for water.', tag: S12 },
        health: { text: 'Water close to home saves time. Quality still has to be tested, whatever the source.', tag: W03 },
        env: { text: 'Solar power does not create groundwater. When pumping costs nothing, use can rise, so the water table still needs watching.', tag: S12 } },
      { id: 'rain', label: 'Rain from the roof into a tank', kind: 'rain',
        use: { text: 'No pump energy. With 500 mm of rain a year, a 100 m² roof yields about 40,000 litres, roughly drinking and cooking for 4 or 5 people.', tag: W05 },
        health: { text: 'The water has to pass a first-flush filter and be tested before anyone drinks it.', tag: W03 },
        env: { text: 'Takes pressure off groundwater, and overflow can recharge it. Annual rain is not daily water, so the tank must hold months of supply.', tag: W05 } },
    ],
  },
  {
    id: 'power', title: 'Power the evening: light, fan, phone', prompt: 'The lights, a fan and a charging phone. Where does the electricity come from?',
    sources: [
      { id: 'grid', label: 'Grid supply', kind: 'grid',
        use: { text: 'Small loads for most of these, but they stop when supply stops. Check the supply hours in your village.', check: true },
        health: { text: 'Light after dark for study and work, and a fan in the heat. No smoke from the bulb.', check: true },
        env: { text: 'Depends on how the grid power is made and on losses on the way. Check locally.', check: true } },
      { id: 'roof', label: 'Rooftop solar (PM Surya Ghar)', kind: 'sun',
        use: { text: 'Panels feed the home by day. Rooftop solar alone does not mean power in an outage. The subsidy is ₹30,000 per kW for the first 2 kW and ₹18,000 for the next kW, capped at ₹78,000.', tag: S05 },
        health: { text: 'Light and cooling, with the bill falling where export credit works. Check who in the village has a roof and the money for the share.', check: true },
        env: { text: 'Power made on the roof by day. Evening use depends on export credit or storage, so check how your household would use it.', check: true } },
      { id: 'none', label: 'Do without after dark', kind: 'none',
        use: { text: 'No energy used, and fewer hours for study, work and chores.', check: true },
        health: { text: 'Less time for study and work after dark. Check who loses the most hours.', check: true },
        env: { text: 'No energy used.', check: true } },
    ],
  },
  {
    id: 'field', title: 'Water the field', prompt: 'A crop is thirsty. How does the water reach it?',
    sources: [
      { id: 'diesel', label: 'Diesel pump', kind: 'diesel', pump: true,
        use: { text: 'Diesel is bought and burned at the pump. Solar pumps under PM KUSUM are meant to replace diesel where there is no grid supply.', tag: S05 },
        health: { text: 'Engine fumes and noise at the field. Check who runs the pump and for how long.', check: true },
        env: { text: 'A fossil fuel burned at the field, and groundwater drawn. Check how much your village uses.', check: true } },
      { id: 'gridtube', label: 'Grid tubewell', kind: 'grid', pump: true,
        use: { text: 'Grid electricity. In Bibipur, irrigation took the largest share of farm energy, 41.7%.', tag: BIB },
        health: { text: 'No direct health pathway shows in the readings. Ask about farm income, food and who controls the water schedule.', check: true },
        env: { text: 'Cheap power can draw water down faster than the ground refills. In the northwest only 18 to 25% of wells are classed as safe for extraction.', tag: S12 } },
      { id: 'solarfield', label: 'Solar pump', kind: 'sun', pump: true,
        use: { text: 'Sun runs the pump by day. The farmer pays a share and the rest is subsidy, and rules change, so confirm with HAREDA or the DISCOM.', tag: S05 },
        health: { text: 'No fuel fumes at the field. Ask who owns the pump and who gets water when it runs.', check: true },
        env: { text: 'Solar power does not create groundwater. A pump with no running cost can push water use up, so test the water table first.', tag: S12 } },
    ],
  },
];

export type Identity = { id: string; label: string; short: string };
export const IDENTITIES: Identity[] = [
  { id: 'woman', label: 'A woman', short: 'Woman' },
  { id: 'man', label: 'A man', short: 'Man' },
  { id: 'child', label: 'A girl or boy', short: 'Child' },
  { id: 'elder', label: 'An older person', short: 'Elder' },
];

/** What the sequence means for this person. Only lines with a tag are findings. The rest are questions to ask locally. */
const BG1_WHO: Tag = BG1;
const WHO: Record<string, Record<string, Line>> = {
  cook: {
    woman: { text: 'The Mysuru study looked at women who were the main cook at home. Years and hours at the stove went with more lung problems.', tag: MYS },
    child: { text: 'Smoke from a chulha reaches women and young children most, because they spend the most time near the fire.', tag: BG1_WHO },
    man: { text: 'The readings study women as the main cook. If a man cooks in your household, ask whether that changes who sits near the smoke.', check: true },
    elder: { text: 'The readings give no figures for older people. Ask who is in the kitchen through the day and for how long.', check: true },
  },
  bathe: {
    woman: { text: 'Ask who heats the water and carries it, and how many extra hours that adds to the day.', check: true },
    man: { text: 'Ask who heats the water for the household, and whether it is the same person every day.', check: true },
    child: { text: 'Ask who bathes first and whether children are near the fire while the water heats.', check: true },
    elder: { text: 'Ask whether an older person can lift or carry hot water, and who helps.', check: true },
  },
  water: {
    woman: { text: 'Ask who fetches the water, how far, and how many trips a day.', check: true },
    man: { text: 'Ask whether men fetch water, and who decides when the pump or tank is used.', check: true },
    child: { text: 'Ask whether children carry water, and what time it takes from school or play.', check: true },
    elder: { text: 'Ask how an older person gets water if the pump is far or the supply is irregular.', check: true },
  },
  power: {
    woman: { text: 'Ask whose work depends on light and a fan after dark: cooking, sewing, study help.', check: true },
    man: { text: 'Ask whose work depends on power after dark, and who decides what is paid for.', check: true },
    child: { text: 'Ask whether a child can study after dark, and when the power goes.', check: true },
    elder: { text: 'Ask whether an older person depends on a fan or light for health or safety, and what happens in an outage.', check: true },
  },
  field: {
    woman: { text: 'Ask who owns the land, who controls the pump and who sets the water schedule. Training is a barrier in the global review: women ranked social norms as the highest barrier to renewable energy work.', tag: { id: 'solar-13', label: 'global review, 24 interviews' } },
    man: { text: 'Ask who sets the water schedule and whether neighbours who share the source are consulted.', check: true },
    child: { text: 'Ask whether children help at the field, and whether pump fumes or electrical risks are near them.', check: true },
    elder: { text: 'Ask who irrigates when an older farmer cannot, and who owns the pump.', check: true },
  },
};
export const whoLine = (activity: string, identity: string): Line => WHO[activity]?.[identity] ?? { text: 'Ask who does this in your household and for how long.', check: true };
