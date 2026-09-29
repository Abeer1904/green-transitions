# Gram Urja: village energy, from 0 to 1

A learning site for villages thinking about an energy transition, with a focus on the **skills** that make it work. Content is adapted from the *Renewable Energy and Green Skills Directory for Mapping Renewable Energy Possibilities in Rural Haryana* (13 pages).

Each track (biogas, solar, and later water, gasification, regenerative agriculture) follows the same six steps:

| Step | What it is | Where it lives |
|---|---|---|
| Read | Short readings, stories, scripts | `content/readings/*.md` |
| See | The 0→1 view: an animated village scene plus stage-by-stage skills, questions and warnings, with a "try the numbers" tool | `src/content/journeys.ts`, `src/viz/` |
| Try | Decision-tree scenarios (project decisions and skills choices) | `src/content/scenarios.ts` |
| Check | Quizzes with reasons (multiple choice and matching) | `src/content/quizzes.ts` |
| Skills | The skills directory: what a role does, where to train, who can join | `src/content/skills.ts` |
| Plan | "Our pathway": group questions and notes for each step, printable | generated from the journey |

## Run

```
npm install
npm run dev      # builds, then serves dist/ at http://127.0.0.1:3013
npm test         # checks that every scenario branch, quiz answer and cross-link resolves
npm run build    # generate readings, type-check, bundle into dist/
```

Progress and pathway notes are kept in the browser (`localStorage`). Nothing is sent anywhere. The site is static and works offline after one visit (`dist/sw.js`).

## Languages

English and Hindi (हिन्दी) are included, with a language switch in the header. The choice is remembered in the browser and defaults to the browser's language. UI text uses [i18next](https://www.i18next.com/) (`react-i18next`). Translations are **overlays**: they carry only text, keyed by the same ids as the English content, so a translation can never change how an exercise works (branches, correct answers and order always come from English). Anything untranslated falls back to English, so a language can ship a piece at a time.

```
locales/<lang>/ui.json          interface text (i18next keys, with {{placeholders}} and <b> tags)
locales/<lang>/scenarios.json   scenario text by scenario id and node id
locales/<lang>/quizzes.json     questions by track, same order as English
locales/<lang>/skills.json      roles by skill id
locales/<lang>/journeys.json    0→1 stages by track, same order as English
locales/<lang>/tracks.json      track names and taglines
content/readings/<lang>/*.md    readings, same filenames as English
```

**To add a language** (e.g. Punjabi `pa`): copy `locales/hi/` to `locales/pa/`, translate, add `content/readings/pa/`, then add its imports and one entry in `src/i18n/locales.ts`. `npm test` checks every language folder against the English structure: matching keys and placeholders, node ids, choice counts, option counts, list lengths, and headings/tables/boxes in readings. Right-to-left languages can set `dir: 'rtl'` in the registry.

The Hindi is a first translation. It should be reviewed by a native speaker from the area and terminology tested with learners before wide use. Scheme and institution names are transliterated with the English in brackets on first use.

## Adding content

**A reading, story or script.** Drop a Markdown file in `content/readings/` and rebuild. No code changes. Add its translation as `content/readings/<lang>/<same filename>` (only `id`, `title` and `summary` are read from the translated front matter).

```
---
id: biogas-08            # unique
track: biogas            # biogas | solar | water | gasification | regen
kind: reading            # reading | story | script
order: 8                 # position within the track
minutes: 4
title: Your title
summary: One sentence shown under the title.
source: Directory p.5    # optional
---

## A heading

Plain paragraphs, **bold**, *italic*, lists, and tables.

> A quote or key idea.

:::ask
Talk about it together
- A question for the group
:::
```

Boxes are `:::ask`, `:::note` and `:::warn`. The first line inside a box is its title.

**A scenario.** Add an object to `SCENARIOS` in `src/content/scenarios.ts`. Each node has `text` and either `choices` (pointing at other node ids) or an `end` (outcome `strong`, `mixed` or `weak`, plus what to take away). `npm test` fails if a branch points nowhere, a node is unreachable, or a scenario has no strong ending.

**A quiz question, a skill, or a journey stage.** Add to the matching file in `src/content/`. Cross-references (reading ids, skill ids) are checked by `npm test`.

**A new track.** Set its status to `live` in `src/content/tracks.ts`, add readings with that `track`, and add entries to `journeys.ts`, `quizzes.ts`, `scenarios.ts` and `skills.ts` as they become available. A scene for the 0→1 view goes in `src/viz/`. Tracks without a journey still get readings, a quiz, skills and scenarios.

## Cautions about the content

- The directory is a starting point. Course names, durations, costs, subsidy rates and scheme rules are leads to check. The site says so wherever they appear.
- The directory has a few slips, flagged in the text: the safety-recorder training names a healthcare sector council; the solar site-survey cost is cut off ("₹5,000–₹10,00"); the household biogas plant cost looks low next to the community plant cost.
- The feedstock slider and subsidy calculator use only figures from the directory. The dung-per-animal figure is a rough rule worked out from "about 50 kg a day for 4–5 animals".
- Scenario characters and the villages in them are illustrative. Real places (Naya Gaon, Dhani Mahu, Dharnai, Dhundi) and the facts about them come from the directory.
- Water has one preview reading. Crop residue gasification and regenerative agriculture are named in the directory but not developed, so they appear as "coming soon".

## Next

- Review of the Hindi with local speakers, then audio for readings. More languages (Punjabi, Urdu, Haryanvi) follow the steps above.
- Stories and scripts using the `story` / `script` reading kinds.
- Facilitator notes for running a session with a group.
