# Gram Urja: village energy, from 0 to 1

A learning site for villages thinking about an energy transition, with a focus on the **skills** that make it work. Content is adapted from the *Renewable Energy and Green Skills Directory for Mapping Renewable Energy Possibilities in Rural Haryana* (13 pages).

## Website structure

- **Home:** Navapur as the introduction, with direct entry into Gram Urja for returning visitors.
- **Navapur:** the original Civic Games Lab story and workshop at `games/navapur/index.html`, followed by optional reflection at `#/reflection`. Workshop notes save separately from project evidence in the browser workspace.
- **Gram Urja:** a practical hub at `#/gram-urja` connecting systems, courses, skills and local projects.
- **Framework:** Filter → Contextualise → Prioritise → Solutioning → Fund → Implement.
- **Learn:** the expanded course catalogue, plus six linked tasks in the fictional Neemgaon case at `#/learn/path`, with understanding checks and saved, self-reviewed outputs.
- **Visualise:** activity filters for irrigation and cooking/organic waste, interactive system sections, and investigation prompts on emissions, gender, access and impacts.
- **Play:** decision scenarios and practice.
- **Projects:** an overview of draft preparation across the six stages, connected to people, skills, resources and existing worksheets.
- **Personal pathway:** role selection, practice evidence and a CV draft at `#/personal`.

The 0→1 map describes service readiness, not a one-year course. Fictional lesson outputs remain separate from real project evidence and assessed practical competence.

## Illustration behaviour

SVG diagrams are maintained in `src/viz/`. Moving markers show flow direction, not measured rates. Arrowheads remain readable with motion paused. Solar separates electrical power, pumping and gravity delivery. Biogas shows qualitative gas-storage, gas-use and feeding states; it is not a construction or pressure model. References are available on each diagram page.

Use the pause control for still inspection. Reduced-motion preferences disable motion automatically. On narrow screens the drawing scrolls horizontally within its panel to preserve label size. Component controls remain outside the drawing.

## Before public release

The new foundation pathway and several newer pages are English-only; Hindi translations and terminology still need review. Technical drawings are educational schematics, not validated installation designs. Test learning tasks with intended learners and facilitators before treating completion as evidence of competence.

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

## Course

`#/course` is a six-module curriculum built from the research readings (`*-research-*.md`, plus the survey `solar-07a`) and the practical readings, scenarios and quizzes they connect to. It is defined in `src/content/course.ts`: each module has objectives, reading ids, scenario ids, quiz tracks, an opening question, a group task and a facilitator session plan. `npm test` fails if a module points at a missing reading, scenario or quiz, if a session plan does not add up to its stated minutes, or if a research reading is in no module.

Two paths through the same modules. **Learner** hides the facilitator boxes. **Facilitator** shows them, plus the session plan and evidence note. The choice is kept in the browser. In a reading, a facilitator box is written as `:::facilitator` (first line is its title) and is hidden on the learner path.

The course text is English only for now. Hindi for the research readings and the course page is still to do; until then it falls back to English (`PENDING_TRANSLATION` in `scripts/check-content.mjs`).

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

## Connected pathways (September 2026)

- `#/personal`: role selection, learning activity, self-reported or assessor-referenced evidence, text CV download and print/PDF view.
- `#/practice`: solar observation, decision, matching and preparation-sequence exercises.
- `#/workspace`: six framework worksheets; creates a new editable pipeline draft with worksheet outputs and existing village pathway notes. Existing drafts are preserved.
- Solar diagram: overview/enlargement, component hotspots and role links, illustrative sunlight/cloud/stopped conditions, pause and reduced-motion support.
- Maps use readiness stages rather than day ranges. Original directory reading IDs are retained so links and saved progress continue to work.
- New workspace state uses `gram-urja:workspace:v1`; existing learning state and pipeline state retain their own keys. Everything remains browser-local. Export creates a JSON backup; automatic restore/import is not implemented.
- New pathway interface text remains English, with a notice in Hindi mode. Field review and local-language review remain necessary; see `FIELD-REVIEW.md`.

## Navapur integration

The workshop is a local snapshot of the original Navapur experience. Story content, artwork and workshop controls are preserved. The integrated copy adds a return link and a closing link into Gram Urja; edits here do not change the separate source project. Keep `public/games/navapur/` together when updating it. New integration pages are currently English-only.
