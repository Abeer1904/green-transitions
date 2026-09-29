import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QUIZZES, readingById, trackById } from '../content';
import { useLocalizer } from '../content/localize';
import type { MatchQuestion, Question } from '../content/types';
import { href } from '../router';
import { recordQuiz } from '../progress';
import { NotFound } from './Track';

const shuffle = <T,>(a: T[]): T[] => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

function Match({ q, onDone }: { q: MatchQuestion; onDone: (ok: boolean) => void }) {
  const { t } = useTranslation();
  const options = useMemo(() => shuffle(q.pairs.map(p => p[1])), [q]);
  const [vals, setVals] = useState<string[]>(() => q.pairs.map(() => ''));
  const [checked, setChecked] = useState(false);
  const ok = vals.every((v, i) => v === q.pairs[i][1]);
  return (
    <>
      <div className="match">
        {q.pairs.map(([left, right], i) => (
          <label key={left} className={checked ? (vals[i] === right ? 'match-row right' : 'match-row wrong') : 'match-row'}>
            <span>{left}</span>
            <select value={vals[i]} disabled={checked} onChange={e => setVals(v => v.map((x, n) => n === i ? e.target.value : x))}>
              <option value="">{t('quiz.choose')}</option>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>
        ))}
      </div>
      {!checked
        ? <button className="btn" disabled={vals.some(v => !v)} onClick={() => setChecked(true)}>{t('quiz.checkMatches')}</button>
        : <>
            <p className={ok ? 'verdict verdict-good' : 'verdict verdict-mid'}>{ok ? t('quiz.allMatched') : t('quiz.pairsAre')}</p>
            {!ok && <ul>{q.pairs.map(([l, r]) => <li key={l}><strong>{l}</strong>: {r}</li>)}</ul>}
            <p>{q.why}</p>
            <button className="btn" onClick={() => onDone(ok)}>{t('quiz.continue')}</button>
          </>}
    </>
  );
}

export default function Quiz({ id }: { id: string }) {
  const { t } = useTranslation();
  const L = useLocalizer();
  const base = trackById(id);
  const raw: Question[] | undefined = QUIZZES[id as keyof typeof QUIZZES];
  const qs = useMemo(() => (raw ? L.quiz(id, raw) : undefined), [raw, id, L.lang]);
  const [n, setN] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const q: Question | undefined = qs?.[n];
  // Show answers in a fresh order each time so the position of the right answer can't be learned.
  const order = useMemo(() => (q && q.type === 'choice' ? shuffle(q.options.map((_, i) => i)) : []), [n, round, id]);
  if (!base || !qs) return <NotFound />;
  const tr = L.track(base);
  const finished = n >= qs.length;
  const next = (ok: boolean) => {
    const s = score + (ok ? 1 : 0);
    setScore(s); setPicked(null);
    if (n + 1 >= qs.length) recordQuiz(id, s, qs.length);
    setN(n + 1);
  };
  const again = () => { setN(0); setScore(0); setPicked(null); setRound(r => r + 1); };
  const enQ = raw![n];
  const reading = enQ?.readingId ? L.reading(readingById(enQ.readingId)!) : undefined;
  return (
    <div className={`hue-${base.hue}`}>
      <p className="crumbs"><a href={href()}>{t('nav.home')}</a> / <a href={href('track', base.id)}>{tr.short}</a> / {t('quiz.crumb')}</p>
      <h1>{t('quiz.title', { name: tr.short })}</h1>
      {!finished && q ? (
        <div className="quiz">
          <p className="eyebrow">{t('quiz.question', { n: n + 1, total: qs.length })}</p>
          <div className="progress-bar" aria-hidden="true"><div style={{ width: `${(n / qs.length) * 100}%` }} /></div>
          <h2 className="q">{q.q}</h2>
          {q.type === 'choice' ? (
            <>
              <div className="choices" role="group" aria-label={t('quiz.answers')}>
                {order.map(i => {
                  const o = q.options[i];
                  const state = picked === null ? '' : i === q.answer ? 'right' : i === picked ? 'wrong' : 'dim';
                  return <button key={o} className={`choice ${state}`} disabled={picked !== null} onClick={() => setPicked(i)}>{o}</button>;
                })}
              </div>
              {picked !== null && (
                <div aria-live="polite">
                  <p className={picked === q.answer ? 'verdict verdict-good' : 'verdict verdict-mid'}>{picked === q.answer ? t('quiz.yes') : t('quiz.notQuite')} {q.why}</p>
                  {reading && <p><a href={href('read', reading.id)}>{t('common.readMore', { title: reading.title })}</a></p>}
                  <button className="btn" onClick={() => next(picked === q.answer)}>{n + 1 >= qs.length ? t('quiz.seeResult') : t('quiz.nextQ')}</button>
                </div>
              )}
            </>
          ) : <Match key={`${round}-${n}`} q={q} onDone={next} />}
        </div>
      ) : (
        <div className="quiz-result">
          <p className="eyebrow">{t('quiz.done')}</p>
          <h2>{t('quiz.score', { score, total: qs.length })}</h2>
          <p className="lead">{score === qs.length ? t('quiz.resultAll') : score >= qs.length * 0.6 ? t('quiz.resultGood') : t('quiz.resultLow')}</p>
          <div className="cta-row">
            <button className="btn" onClick={again}>{t('quiz.again')}</button>
            <a className="btn btn-ghost" href={href('track', base.id)}>{t('quiz.back', { name: tr.short })}</a>
          </div>
        </div>
      )}
    </div>
  );
}
