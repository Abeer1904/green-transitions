# Navapur facilitator experience

Open `index.html` directly in a browser, or serve this directory locally. Within the SMART app the path is `/games/navapur/index.html`. All scripts and images are local; no build, account or network connection is required when opening the folder's HTML file.

## Current workshop

The supplied first-draft script, preserved in `workshop-script.md`, supersedes the earlier seven-scene storyboard. Its eight sections are implemented in order, with the later user-requested subsection consolidation:

1. **Navapur:** seven complete chapters, one per click. The same town artwork and framing stay through chapters 1–4; chapter 5 uses drought, chapter 6 uses flood, and chapter 7 retains flood.
2. **Who are you?:** two screens: all roles, then motivations and table introductions together. Select the Motivation (2:00) or Introductions (4:00) timer without hiding the content. The facilitator supplies the spoken instructions. There is no separate politics screen in this draft.
3. **Peak:** phone, tyres, travel and clothes (3:00).
4. **What's the problem?:** one screen with individual problem (2:00), three problems (3:00), vote (3:00), and short/medium/long term (3:00). Click the relevant prompt or timer to change the countdown in place.
5. **Solutions:** one screen showing the peak solution question and all three approaches: Action/short term, Best Practice/medium term and Innovation/long term. The peak-solution timer remains 3:00. Talk, Write, Pass and Improve and their timed phases have been removed.
6. **Force majeure:** title, then only the facilitator's chosen shock. No random draw, alternate-event menu, score or additional replan timer is projected.
7. **Climate manifesto:** one manifesto and a shared ₹10 crore budget for the room (10:00).
8. **What we tried to do today:** the supplied summary in full.

Materials: sticky notes or paper, pens and printed solution sheets. All participant work happens on tables. No wall is required. A facilitator may record results in a separate spreadsheet; the experience does not collect responses or create a spreadsheet.

Overall timing remains provisional. The original draft is retained as a source record; the current screen consolidation and removal of the timed solution phases follow the later user revision.

## Controls

- Right / Left: next / previous beat. Chapter numbers jump within the story.
- Numbered section navigation jumps directly to a section. All solution approaches remain visible together.
- F: toggle full screen. Escape can exit browser fullscreen.
- T: start / pause current timer. R: reset it.
- Timers start manually, stop at zero and never advance the workshop automatically. Returning to a screen resets its timer.
- On the **Force majeure title**, choose **H** for heat, **M** for monsoon or **C** for cotton. Then press Right or click Reveal. Choice does not expose any event copy until the reveal. Heat is the default; set `selectedEvent` in `config.js` before the session if preferred (0 heat, 1 monsoon, 2 cotton).
- To change a revealed shock, go Back to the title, choose, then reveal again.

`Controls` opens an on-screen help dialog; consult it before projecting if you want the shock shortcuts kept private. No reload persistence: refreshing begins at chapter one. The section navigation can recover your place.

## Editing

All chapter prose, role lists, motivations, solution prompts, shocks, manifesto lines and summary paragraphs are in `config.js`. Keep the accompanying HTML, CSS, JS and three images together when copying the experience. `artwork-notes.md` records the generated illustration prompts.

The earlier pitches, project-cost rules, wall actions, investor/finance events, separate replan, agency diagrams and QR ending are not part of this script and have been removed from the active experience. Nothing is deployed by these local changes.
