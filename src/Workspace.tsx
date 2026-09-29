"use client";

import { useEffect, useRef, useState } from "react";
import { createWorkspace, exportVillage, learningKey, OPPORTUNITY_MAP, parseWorkspace, recordLearning, ROLE_PATHWAYS, STAGES, SUPPORT, TRACKS, villageEvidence, type Exercise, type Scope, type Stage, type TrackId, type VillagePlan } from "./model";
import { DIRECTORY } from "./directory";
import styles from "./workspace.module.css";

function download(name: string, content: string, type = "application/json") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a"); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function GreenTransitions() {
  const [state, setState] = useState(createWorkspace);
  const [scope, setScope] = useState<Scope>("individual");
  const [track, setTrack] = useState<TrackId>("biogas");
  const [stage, setStage] = useState<Stage>("Learn");
  const [milestone, setMilestone] = useState(0);
  const [exercise, setExercise] = useState<Exercise>("decision");
  const [answer, setAnswer] = useState("");
  const [matches, setMatches] = useState(["", "", ""]);
  const [feedback, setFeedback] = useState("");
  const [note, setNote] = useState("");
  const [share, setShare] = useState(false);
  const [notice, setNotice] = useState("");
  const importRef = useRef<HTMLInputElement>(null);
  const content = TRACKS[track];
  const directory = DIRECTORY[track];
  const rolePathway = ROLE_PATHWAYS[state.role];
  const steps = OPPORTUNITY_MAP[track];
  const current = steps[milestone];
  const plan = state.village[track];
  const ownEvidence = state.evidence.filter(e => e.track === track && e.scope === "individual");
  const evidence = scope === "individual" ? ownEvidence : villageEvidence(state, track);
  const learned = state.learning.filter(k => k.startsWith(`${track}:${scope}:`));

  const toolState = useRef({ scope, track, stage, learningCount: learned.length, evidenceCount: evidence.length });
  useEffect(() => { toolState.current = { scope, track, stage, learningCount: learned.length, evidenceCount: evidence.length }; }, [scope, track, stage, learned.length, evidence.length]);
  useEffect(() => {
    type ModelContext = { registerTool: (tool: { name: string; description: string; inputSchema: object; annotations: object; execute: (input: unknown) => unknown }, options: { signal: AbortSignal }) => void | Promise<void> };
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context) return;
    const lifecycle = new AbortController();
    try { void Promise.resolve(context.registerTool({ name: "read_journey_summary", description: "Read the currently selected journey, track, stage and activity counts. Does not expose personal details, notes or support preferences.", inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: false }, execute: (input) => { if (!input || typeof input !== "object" || Array.isArray(input) || Object.keys(input).length) throw new Error("Expected an empty object."); return { ...toolState.current, readiness: "Not verified" }; } }, { signal: lifecycle.signal })).catch(() => {}); } catch { /* Optional browser capability. */ }
    return () => lifecycle.abort();
  }, []);

  function resetExercise() { setAnswer(""); setMatches(["", "", ""]); setFeedback(""); }
  function changeScope(next: Scope) { setScope(next); resetExercise(); setNote(""); setShare(false); setNotice(""); }
  function complete(kind: Exercise | "lesson") { setState(s => recordLearning(s, learningKey(track, scope, kind))); }
  function check() {
    if ((exercise !== "match" && !answer) || (exercise === "match" && matches.some(v => !v))) { setFeedback("Choose an answer for every item first."); return; }
    const correct = exercise === "match" ? matches.every((v, i) => v === String(i)) : answer === "1";
    if (correct) { complete(exercise); setFeedback(`Correct. ${exercise === "decision" ? (scope === "village" ? "A shared project needs an agreed service, technical assessment and clear ownership and operating arrangements. Learning alone does not establish readiness." : content.explanation) : exercise === "quiz" ? "Learning completion is not technical approval, practical assessment or certification." : "Each role has a distinct responsibility; a functioning project needs them to work together."} Added to your learning record.`); }
    else setFeedback(exercise === "match" ? "Review the role descriptions in Learn and try again. Construction, assessment, operation and coordination are different responsibilities." : "Try again. Establish the actual needs and evidence before making a claim about readiness.");
  }
  function addEvidence() {
    if (!note.trim()) { setNotice("Write an observation before adding evidence."); return; }
    setState(s => ({ ...s, evidence: [...s.evidence, { id: crypto.randomUUID(), track, scope, milestone, note: note.trim(), date: new Date().toISOString(), shared: scope === "individual" && share }] }));
    setNote(""); setShare(false); setNotice("Evidence added as self-reported. Review is still pending; no milestone has been approved.");
  }
  function updatePlan(key: keyof VillagePlan, value: string) { setState(s => ({ ...s, village: { ...s.village, [track]: { ...s.village[track], [key]: value } } })); }
  function exportCV() {
    const lines = [state.name || "My skills CV", "DRAFT — self-reported profile", `Aspiring role: ${state.role || "Not selected"}`, "", "EXISTING EXPERIENCE", state.experience || "Not recorded", "", "LEARNING RECORD", ...state.learning.filter(k => k.includes(":individual:")).map(k => k.replaceAll(":", " / ")), "", "FIELD EVIDENCE — REVIEW PENDING", ...state.evidence.filter(e => e.scope === "individual").map(e => `${TRACKS[e.track].short}: ${e.note}`), "", "VERIFIED PRACTICAL SKILLS", "None recorded. Digital exercises are not certification."];
    download("green-skills-cv.txt", lines.join("\n"), "text/plain;charset=utf-8");
  }

  return <div className={styles.workspace}>
    <header className={styles.header}>
      <div><div className={styles.eyebrow}>Gram Urja / Learning into action</div><h1>Gram Urja<span>.</span></h1><p>Understand what it takes to turn a local opportunity into a working service.</p></div>
      <div className={styles.location}><span>Malai, Haryana</span><small>Planning pilot · Biogas & solar</small></div>
    </header>
    <div className={styles.context}>
      <div className={styles.segment} aria-label="Journey level">{(["individual", "village"] as Scope[]).map(s => <button key={s} aria-pressed={scope === s} onClick={() => changeScope(s)}>{s === "individual" ? "Where I fit" : "Village view"}</button>)}</div>
      {scope === "individual" && <button onClick={() => setStage("Pathways")}>My learning pathway & CV</button>}
      <label className={styles.trackLabel}>Opportunity <select value={track} onChange={e => { setTrack(e.target.value as TrackId); resetExercise(); setNote(""); setShare(false); }}>{Object.entries(TRACKS).map(([id, t]) => <option key={id} value={id}>{t.title}</option>)}</select></label>
    </div>
    <section className={styles.map} aria-label="Technology opportunity map">
      <div className={styles.sectionHead}><div><span className={styles.eyebrow}>0 → 1 · Opportunity map</span><h2>{scope === "individual" ? "Find your place in making it work" : "See what it takes to make it work"}</h2></div><small>Explore the steps, people and skills</small></div>
      <div className={styles.timeline}>{steps.map((m, i) => <button key={m.title} aria-pressed={milestone === i} onClick={() => { setMilestone(i); setNotice(""); }}><span className={styles.dot}>{String(i + 1).padStart(2, "0")}</span><strong>{m.title}</strong><small>{i === 0 ? "Start with the need" : i === 5 ? "A working service" : "Explore requirements"}</small></button>)}</div>
      <div className={styles.milestone}><strong>{current[scope]}</strong><span>{current.gate}</span></div>
      <div className={styles.mapDetails}><div><h3>Skills involved</h3><p>{current.skills}</p></div><div><h3>People involved</h3><p>{current.people}</p></div><div><h3>What this step produces</h3><p>{current.output}</p></div></div>
    </section>
    <div className={styles.workHeading}><div><span className={styles.eyebrow}>{scope === "individual" ? "Resources to explore the map" : "Resources to explore the map"}</span><h2>{content.title}</h2></div><span className={styles.status}>{scope === "individual" ? `${learned.length}/4 learning activities recorded` : "Draft · Assessment pending"}</span></div>
    <div className={styles.tabs} role="group" aria-label="Learning stages">{STAGES.map((s, i) => <button key={s} aria-pressed={stage === s} onClick={() => { setStage(s); setNotice(""); }}><small>0{i + 1}</small>{{ Learn: "Understand", Test: "Try a decision", Build: "Field notes", Pathways: "Work & project routes" }[s]}</button>)}</div>
    <div className={styles.body}>
      <section className={styles.primaryPane}>
        {stage === "Learn" && <>
          <span className={styles.eyebrow}>Understand the opportunity</span><h2>{scope === "individual" ? "Start with what is already here." : "Start with the service people need."}</h2><p className={styles.lead}>{content.lesson}</p>
          <div className={styles.resource}><small>Resources to assess</small><strong>{content.resource}</strong></div>
          <details className={styles.directory}><summary>Explore the directory: technology, setup & business models</summary><h3>Technology options</h3><ul>{directory.options.map(t => <li key={t}>{t}</li>)}</ul><h3>What setup involves</h3><ol>{directory.setup.map(t => <li key={t}>{t}</li>)}</ol><h3>Ownership and livelihood models</h3><ul>{directory.models.map(t => <li key={t}>{t}</li>)}</ul><h3>Cases to investigate</h3><ul>{directory.cases.map(t => <li key={t}>{t}</li>)}</ul><small>Source: Green Skill directory, pages {directory.pages}. Case summaries are attributed to the directory, not independently verified.</small></details>
          <h3>People who make it work</h3><div className={styles.roles}>{content.roles.map((r, i) => <div key={r}><strong>{r}</strong><span>{content.tasks[i]}</span></div>)}</div>
          {scope === "village" && <p className={styles.callout}>Before choosing a project, include women, households with fewer resources and people who may carry extra unpaid work. Record who benefits, who pays and who decides.</p>}
          <button className={styles.action} onClick={() => { complete("lesson"); setStage("Test"); resetExercise(); }}>Record learning & practise a decision</button>
          <p className={styles.caption}>Content basis: Green Skill directory, pages {directory.pages}. Costs, schemes and training availability need current verification before use.</p>
        </>}
        {stage === "Test" && <>
          <span className={styles.eyebrow}>Practise judgement</span><h2>{scope === "individual" ? "Try the decision before the fieldwork." : "Work through a collective decision."}</h2>
          <div className={styles.exerciseTypes}>{(["decision", "quiz", "match"] as Exercise[]).map(e => <button key={e} aria-pressed={exercise === e} onClick={() => { setExercise(e); resetExercise(); }}>{e === "decision" ? "Decision" : e === "quiz" ? "Quiz" : "Match the following"}</button>)}</div>
          <fieldset className={styles.exercise}><legend>{exercise === "decision" ? (scope === "individual" ? content.question : content.villageQuestion) : exercise === "quiz" ? "What does completing this learning activity demonstrate?" : "Match each role with its responsibility."}</legend>
            {exercise === "match" ? content.roles.map((r, i) => <label className={styles.match} key={r}>{r}<select value={matches[i]} onChange={e => { setMatches(m => m.map((v, j) => j === i ? e.target.value : v)); setFeedback(""); }}><option value="">Choose a responsibility</option>{[2, 0, 1].map(j => <option key={j} value={j}>{content.tasks[j]}</option>)}</select></label>) : (exercise === "decision" ? (scope === "individual" ? content.choices : content.villageChoices) : ["The worker is certified and the project is approved", "A learning activity is complete; practical competence and site readiness still need assessment", "All village constraints have been resolved"]).map((a, i) => <label className={styles.answer} key={a}><input type="radio" name="answer" checked={answer === String(i)} onChange={() => { setAnswer(String(i)); setFeedback(""); }} value={i}/><span>{a}</span></label>)}
          </fieldset><button className={styles.action} onClick={check}>Check {exercise === "match" ? "matches" : "answer"}</button>{feedback && <p className={styles.callout} role="status">{feedback}</p>}
          <div className={styles.next}><span>Take learning into your context</span><button onClick={() => setStage("Build")}>Open field challenge</button></div>
        </>}
        {stage === "Build" && <>
          <span className={styles.eyebrow}>Field application</span><h2>{scope === "individual" ? "Build evidence from your own context." : "Build the village project record."}</h2>
          <p className={styles.lead}>{scope === "individual" ? content.field : content.villageField}</p>
          <div className={styles.field}><label>Milestone for this evidence<select value={milestone} onChange={e => setMilestone(Number(e.target.value))}>{steps.map((m, i) => <option key={m.title} value={i}>{m.title}</option>)}</select></label><label>Observation or evidence summary<textarea rows={4} maxLength={6000} value={note} onChange={e => setNote(e.target.value)} placeholder="What did you observe? What is still unknown? Use anonymous notes."/></label>
          {scope === "individual" && <label className={styles.check}><input type="checkbox" checked={share} onChange={e => setShare(e.target.checked)}/>Include this anonymous observation in the village draft. My CV and support preferences stay separate.</label>}
          <button className={styles.action} onClick={addEvidence}>Add evidence for review</button></div>
          {scope === "village" && <div className={styles.plan}><h3>Project planning record</h3>{([['priority','Priority service and intended beneficiaries'],['owner','Proposed owner and operating responsibilities'],['resources','Resources, technical assessment and funding gaps'],['participation','Women’s participation: decisions, paid roles and benefits'],['nextAction','Next action, responsible person and target date']] as [keyof VillagePlan, string][]).map(([key, label]) => <label key={key}>{label}<textarea maxLength={6000} rows={2} value={plan[key]} onChange={e => updatePlan(key, e.target.value)}/></label>)}</div>}
          <h3 className={styles.evidenceTitle}>Evidence register <small>({evidence.length})</small></h3>{!evidence.length && <p className={styles.empty}>No field evidence yet. Start with one observation.</p>}
          {evidence.map(e => <article key={e.id} className={styles.evidence}><div><strong>{OPPORTUNITY_MAP[e.track][e.milestone].title}</strong><small>Self-reported · Review pending{e.shared ? " · Shared with village draft" : ""}</small></div><p>{e.note}</p><div className={styles.row}>{e.scope === "individual" && <button onClick={() => setState(s => ({ ...s, evidence: s.evidence.map(v => v.id === e.id ? { ...v, shared: !v.shared } : v) }))}>{e.shared ? "Remove from village draft" : "Share with village draft"}</button>}<button onClick={() => setState(s => ({ ...s, evidence: s.evidence.filter(v => v.id !== e.id) }))}>Delete observation</button></div></article>)}
        </>}
        {stage === "Pathways" && scope === "individual" && <>
          <span className={styles.eyebrow}>A future in skilled work</span><h2>Your learning pathway & CV.</h2>
          <div className={styles.field}><label>Name for your CV<input maxLength={100} value={state.name} onChange={e => setState(s => ({ ...s, name: e.target.value }))}/></label><label>A role to explore<select value={content.careers.includes(state.role as never) ? state.role : ""} onChange={e => setState(s => ({ ...s, role: e.target.value }))}><option value="">Choose a role</option>{content.careers.map(c => <option key={c}>{c}</option>)}</select></label><label>Experience you already bring<textarea rows={3} maxLength={6000} placeholder="Farming, repairing, organising, bookkeeping…" value={state.experience} onChange={e => setState(s => ({ ...s, experience: e.target.value }))}/></label></div>
          <div className={styles.resource}><small>Your contribution</small><p>{rolePathway?.contribution || "Choose a role to see where you can contribute and what to learn."}</p></div>
          {rolePathway && <section className={styles.learningPath}><h3>A learning pathway for {state.role.toLowerCase()}</h3><ol><li><strong>Start with your experience</strong><p>Record what you already know. Review role and course entry requirements with a facilitator.</p></li><li><strong>Build understanding</strong><p>{rolePathway.learn}</p><button onClick={() => { const roleTrack = TRACKS.solar.careers.some(c => c === state.role) ? "solar" : "biogas"; setTrack(roleTrack); setStage("Learn"); resetExercise(); }}>Explore the foundations</button></li><li><strong>Practise and get feedback</strong><p>{rolePathway.practise}</p><button onClick={() => setStage("Build")}>Open a field challenge</button></li><li><strong>Demonstrate your skills</strong><p>{rolePathway.evidence}</p></li><li><strong>Prepare for work</strong><p>Use your CV to discuss training, supervised placements or service opportunities. Confirm requirements and terms with the provider.</p></li></ol><small>This is a suggested route to investigate, not an accredited course or guaranteed job.</small></section>}
          <details className={styles.directory}><summary>Training leads from the directory</summary><p>Use these as starting points to contact and verify. They are not confirmed course offers.</p>{directory.training.filter(t => !state.role || t.role === state.role).map(t => <div className={styles.trainingLead} key={t.role}><strong>{t.role}</strong><p>{t.lead}</p><small>Directory page {t.page} · Confirm entry requirements, dates, fees, location, practical assessment and certification.</small></div>)}<small>Household biogas and industrial CBG qualifications are not interchangeable. Match training to the actual work.</small></details>
          <div className={styles.cv}><div className={styles.eyebrow}>Skills CV · Draft</div><h3>{state.name || "Your name"}</h3><p>{state.role ? `Aspiring ${state.role.toLowerCase()}` : "Choose a role to explore"}</p><h4>Existing experience · Self-reported</h4><p>{state.experience || "No experience recorded yet."}</p><h4>Learning record</h4><ul>{state.learning.filter(k => k.includes(":individual:")).map(k => <li key={k}>{k.split(":")[0]} · {k.split(":")[2]} completed</li>)}</ul>{!state.learning.some(k => k.includes(":individual:")) && <p>No learning activities completed yet.</p>}<h4>Field evidence</h4><p>{state.evidence.filter(e => e.scope === "individual").length} observations · review pending</p><h4>Verified practical competence</h4><p>Not yet assessed. Digital learning is not a professional qualification.</p><button className={styles.action} onClick={exportCV}>Download draft CV</button></div>
          <details className={styles.support} open><summary>Women’s entry & participation support</summary><p>Explore any technical or enterprise role. Select support to discuss with a facilitator.</p>{SUPPORT.map(s => <label key={s.id} className={styles.check}><input type="checkbox" checked={state.support.includes(s.id)} onChange={e => setState(w => ({ ...w, support: e.target.checked ? [...w.support, s.id] : w.support.filter(v => v !== s.id) }))}/>{s.title}</label>)}{state.support.length > 0 && <ul>{SUPPORT.filter(s => state.support.includes(s.id)).map(s => <li key={s.id}>{s.action}</li>)}</ul>}<small>Private planning preferences. Support availability must be confirmed; these are not bookings.</small></details>
        </>}
        {stage === "Pathways" && scope === "village" && <>
          <span className={styles.eyebrow}>Collective outcome / Transition plan</span><h2>A plan the village can review.</h2><p className={styles.lead}>A working project needs technical assessment, accountable ownership and evidence of who benefits.</p>
          <dl className={styles.review}>{([['priority','Priority and beneficiaries'],['owner','Ownership and operations'],['resources','Resources and unresolved gaps'],['participation','Women’s participation'],['nextAction','Next decision']] as [keyof VillagePlan,string][]).map(([k,l]) => <div key={k}><dt>{l}</dt><dd>{plan[k] || "Not yet recorded"}</dd></div>)}</dl>
          <div className={styles.callout}><strong>{villageEvidence(state, track).length} observations available for review</strong><p>Technical approval, committed funding, commissioning and operating outcomes are not yet verified. Learning completion does not change these statuses.</p></div><div className={styles.row}><button className={styles.action} onClick={() => download(`malai-${track}-draft.json`, JSON.stringify(exportVillage(state, track), null, 2))}>Download village draft</button><button onClick={() => setStage("Build")}>Continue planning</button></div><p className={styles.caption}>The village export excludes the individual CV, private support preferences and unshared observations.</p>
        </>}
      </section>
      <aside className={styles.aside}><span className={styles.eyebrow}>The connection</span><h3>{scope === "individual" ? "Your work can help your village." : "Village projects create learning opportunities."}</h3><p>{scope === "individual" ? "A household observation can strengthen your portfolio and, with your permission, inform the village assessment." : "A project identifies the work needed. Residents can explore those roles, practise and contribute evidence."}</p><div className={styles.connection}><span>Individual skills & roles</span><span aria-hidden="true">↕</span><span>Shared field evidence</span><span aria-hidden="true">↕</span><span>Village project</span></div><button onClick={() => changeScope(scope === "individual" ? "village" : "individual")}>Explore {scope === "individual" ? "village" : "individual"} view</button><hr/><h4>What counts as progress?</h4><p>Learning is recorded here. Field evidence needs review. Real-world readiness needs separate assessment.</p><small>This is a map of requirements and possibilities, not a timed course. Steps can overlap or need revisiting.</small><hr/><h4>Next tracks</h4><p>Water & watersheds<br/>Crop residue gasification<br/>Regenerative agriculture</p><small>The PDF has partial water content (pages 12–13); gasification and regenerative agriculture are named without developed sections. These need completion before full pathways open.</small></aside>
    </div>
    {notice && <p className={styles.notice} role="status">{notice}</p>}
    <footer className={styles.footer}><div><strong>Your draft stays in this session.</strong><p>Download a private backup before leaving. Restore it to continue later. No shared village database or assessor workflow is connected yet.</p></div><div className={styles.row}><button onClick={() => download("green-transitions-private-backup.json", JSON.stringify(state, null, 2))}>Save private backup</button><button onClick={() => importRef.current?.click()}>Restore backup</button><input ref={importRef} type="file" accept="application/json,.json" hidden onChange={async e => { const file = e.target.files?.[0]; e.target.value = ""; if (!file) return; if (file.size > 2_000_000) { setNotice("Backup is too large. Maximum size: 2 MB."); return; } try { const restored = parseWorkspace(await file.text()); if (!window.confirm("Replace this session’s draft with the backup? Download your current draft first if you need it.")) return; setState(restored); resetExercise(); setNotice("Backup restored. All field evidence remains unverified."); } catch { setNotice("Could not restore this file. Choose a valid Green Transitions backup."); } }}/></div></footer>
  </div>;
}
