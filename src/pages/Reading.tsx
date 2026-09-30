import { useTranslation } from 'react-i18next';
import { readingById, readingsFor, trackById } from '../content';
import { useLocalizer } from '../content/localize';
import { Markdown } from '../md';
import { go, href } from '../router';
import { markRead, useProgress } from '../progress';
import { PathToggle } from './Course';
import { NotFound } from './Track';

export default function ReadingPage({ id }: { id: string }) {
  const { t } = useTranslation();
  const L = useLocalizer();
  const en = readingById(id);
  const p = useProgress();
  if (!en) return <NotFound />;
  const r = L.reading(en);
  const tr = trackById(r.track)!;
  const list = readingsFor(r.track).map(L.reading);
  const i = list.findIndex(x => x.id === r.id);
  const next = list[i + 1];
  const prev = list[i - 1];
  const done = p.read.includes(r.id);
  const finish = () => { markRead(r.id); go(...(next ? ['read', next.id] : ['track', r.track])); };
  const page = r.source.replace(/^Directory p\.?\s*/, '');
  return (
    <article className={`reading hue-${tr.hue}`}>
      <p className="crumbs"><a href={href()}>{t('nav.home')}</a> / <a href={href('track', tr.id)}>{L.track(tr).short}</a> / {t('reading.crumb', { i: i + 1, n: list.length })}</p>
      <p className="eyebrow">{t(`reading.kind.${r.kind}`)} · {t('common.minutes', { count: r.minutes })}</p>
      <h1>{r.title}</h1>
      <p className="lead">{r.summary}</p>
      {r.body.includes(':::facilitator') && <PathToggle compact />}
      <div className="prose"><Markdown src={r.body} hide={p.path === 'learner' ? ['facilitator'] : []} /></div>
      {page && <p className="fine">{t('reading.source', { page })}</p>}
      <div className="pager">
        {prev ? <a className="btn btn-ghost" href={href('read', prev.id)}>← {prev.title}</a> : <span />}
        <button className="btn" onClick={finish}>{done ? t('reading.next') : t('reading.finished')} → {next ? next.title : t('reading.toTrack')}</button>
      </div>
    </article>
  );
}
