import { useState } from 'react';
import { COURSES, courseById, courseOf, type CourseLesson } from '../content/courses';
import { UNITS } from '../content/framework';
import { readingById } from '../content';
import { Markdown } from '../md';
import { href } from '../router';
import { markLesson, useProgress } from '../progress';
import { ChoiceCard, MatchCard } from './Framework';
import { NotFound } from './Track';

const ALL = COURSES.flatMap(c => c.lessons);

function Hub() {
  const p = useProgress();
  const next = ALL.find(l => !p.lessons.includes(l.id));
  const done = ALL.filter(l => p.lessons.includes(l.id)).length;
  const sources = Array.from(new Set(ALL.flatMap(l => l.readings))).filter(id => readingById(id));
  return (
    <div className="hue-green">
      <p className="crumbs"><a href={href()}>Home</a> / Learn</p>
      <p className="eyebrow">Learn · green skills pathway</p>
      <h1>Learn the evidence and the skills</h1>
      <p className="lead">Five short courses, built from the research. Each lesson is about 300 words, takes five minutes and ends with a question. Every claim carries a tag that opens the source.</p>
      <p>{next && <a className="btn btn-big" href={href('learn', courseOf(next.id)!.id, next.id)}>{done ? 'Continue' : 'Start'}: {next.title} →</a>} <span className="meta">{done} of {ALL.length} lessons done</span></p>
      <div className="lc-list">
        {COURSES.map(c => {
          const d = c.lessons.filter(l => p.lessons.includes(l.id)).length;
          return (
            <a key={c.id} className="lc-card" href={href('learn', c.id)}>
              <span className="step-n">{c.n}</span>
              <div><h2>{c.title}</h2><p>{c.question}</p><p className="meta">{c.lessons.length} lessons · {c.lessons.reduce((s, l) => s + l.minutes, 0)} min{d ? ` · ${d} done` : ''}</p></div>
            </a>
          );
        })}
      </div>
      <h2 className="section-title">Skills and your own pathway</h2>
      <div className="journey-links">
        <a href={href('personal')}>My skills and CV builder →</a>
        <a href={href('skills')}>Skills directory →</a>
        <a href={href('practice')}>Guided practice →</a>
        <a href={href('visualise')}>See how technologies work →</a>
        <a href={href('library')}>Technology guides →</a>
        <a href={href('course')}>Facilitator session plans →</a>
      </div>
      <h2 className="section-title">Sources library</h2>
      <p className="meta">The full brief for each paper, with its method, strength of evidence and limits.</p>
      <ul className="lc-sources">{sources.map(id => <li key={id}><a href={href('read', id)}>{readingById(id)!.title}</a></li>)}</ul>
    </div>
  );
}

function CoursePage({ id }: { id: string }) {
  const c = courseById(id);
  const p = useProgress();
  if (!c) return <NotFound />;
  const stage = UNITS.find(u => u.id === c.feeds);
  return (
    <div className="hue-green">
      <p className="crumbs"><a href={href()}>Home</a> / <a href={href('learn')}>Learn</a> / {c.title}</p>
      <p className="eyebrow">Course {c.n}</p>
      <h1>{c.title}</h1>
      <p className="lead">{c.question}</p>
      <p>{c.blurb}</p>
      {stage && <p className="meta">Feeds the framework stage: <a href={href('framework', 'stage', stage.id)}>{stage.name}</a></p>}
      <ol className="lc-lessons">
        {c.lessons.map(l => (
          <li key={l.id}><a href={href('learn', c.id, l.id)}><strong>{l.title}</strong><span className="meta"> {l.minutes} min{p.lessons.includes(l.id) ? ' · done' : ''}</span></a></li>
        ))}
      </ol>
    </div>
  );
}

function Player({ courseId, l }: { courseId: string; l: CourseLesson }) {
  const c = courseById(courseId)!;
  const p = useProgress();
  const [i, setI] = useState(0);
  const [finished, setFinished] = useState(false);
  const card = l.cards[i];
  const last = i === l.cards.length - 1;
  const idx = c.lessons.indexOf(l);
  const next = c.lessons[idx + 1];
  const advance = () => {
    if (!last) { setI(i + 1); window.scrollTo({ top: 0 }); return; }
    markLesson(l.id); setFinished(true); window.scrollTo({ top: 0 });
  };
  if (finished) return (
    <article className="fw-lesson hue-green">
      <p className="eyebrow">{c.title} · lesson done</p>
      <h1>Lesson complete</h1>
      <p className="lead">{l.title}</p>
      <div className="box box-note"><strong className="box-title">Sources for this lesson</strong><ul>{l.readings.map(r => readingById(r) && <li key={r}><a href={href('read', r)}>{readingById(r)!.title}</a></li>)}</ul></div>
      <div className="pager">
        <a className="btn btn-ghost" href={href('learn', c.id)}>← {c.title}</a>
        {next ? <a className="btn" href={href('learn', c.id, next.id)}>Next lesson: {next.title} →</a> : <a className="btn" href={href('learn')}>All courses →</a>}
      </div>
    </article>
  );
  return (
    <article className="fw-lesson hue-green">
      <p className="crumbs"><a href={href()}>Home</a> / <a href={href('learn')}>Learn</a> / <a href={href('learn', c.id)}>{c.title}</a></p>
      <p className="eyebrow">{l.title}</p>
      <div className="fw-progress" role="progressbar" aria-valuemin={0} aria-valuemax={l.cards.length} aria-valuenow={i + 1} aria-label="Lesson progress"><span style={{ width: `${((i + 1) / l.cards.length) * 100}%` }} /></div>
      <p className="meta">{i + 1} of {l.cards.length}{p.lessons.includes(l.id) ? ' · done before' : ''}</p>
      {card.kind === 'read' && <><h1>{card.title}</h1><div className="prose"><Markdown src={card.body} /></div><button className="btn" onClick={advance}>{last ? 'Finish lesson →' : 'Continue →'}</button></>}
      {card.kind === 'play' && <><h1>{card.title}</h1><div className="prose box box-ask"><Markdown src={card.body} /></div><button className="btn" onClick={advance}>{last ? 'Finish lesson →' : 'Continue →'}</button></>}
      {card.kind === 'choice' && <ChoiceCard key={i} c={card} onDone={advance} />}
      {card.kind === 'match' && <MatchCard key={i} c={card} onDone={advance} />}
      <p className="fine">Tags like <span className="ev">Kerala, 52 households</span> open the source brief with its method and limits.</p>
    </article>
  );
}

export default function Learn({ parts }: { parts: string[] }) {
  const [course, lesson] = parts;
  if (!course) return <Hub />;
  if (!lesson) return <CoursePage id={course} />;
  const l = courseById(course)?.lessons.find(x => x.id === lesson);
  return l ? <Player key={l.id} courseId={course} l={l} /> : <NotFound />;
}
