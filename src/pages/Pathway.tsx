import { useTranslation } from 'react-i18next';
import { JOURNEYS, trackById } from '../content';
import { useLocalizer } from '../content/localize';
import { href } from '../router';
import { saveNote, useProgress } from '../progress';
import { NotFound } from './Track';

export default function Pathway({ id }: { id: string }) {
  const { t } = useTranslation();
  const L = useLocalizer();
  const base = trackById(id);
  const raw = JOURNEYS[id as keyof typeof JOURNEYS];
  const p = useProgress();
  if (!base || !raw) return <NotFound />;
  const tr = L.track(base);
  const journey = L.journey(id, raw);
  const notes = p.notes[id] || {};
  return (
    <div className={`hue-${base.hue} pathway`}>
      <p className="crumbs no-print"><a href={href()}>{t('nav.home')}</a> / <a href={href('track', base.id)}>{tr.short}</a> / {t('pathway.crumb')}</p>
      <p className="eyebrow">{t('pathway.crumb')}</p>
      <h1>{t('pathway.title', { name: tr.short })}</h1>
      <p className="lead">{t('pathway.lead')}</p>
      <p className="no-print"><button className="btn btn-ghost" onClick={() => window.print()}>{t('pathway.print')}</button></p>
      <p className="fine no-print">{t('pathway.saved')}</p>
      <p><a className="btn" href={href('workspace')}>Carry these notes into a project draft →</a></p><ol className="pathway-steps">
        {journey.stages.slice(1).map((s, k) => {
          const n = k + 1;
          const note = notes[n] || { decided: '', who: '' };
          return (
            <li key={n} className="pathway-step">
              <p className="eyebrow">{s.day}</p>
              <h2>{s.title}</h2>
              <p>{s.state}</p>
              <ul>{s.ask.map(a => <li key={a}>{a}</li>)}</ul>
              <label>{t('pathway.decided')}
                <textarea rows={3} maxLength={2000} value={note.decided} onChange={e => saveNote(id, n, { ...note, decided: e.target.value })} />
              </label>
              <label>{t('pathway.who')}
                <textarea rows={2} maxLength={1000} value={note.who} onChange={e => saveNote(id, n, { ...note, who: e.target.value })} />
              </label>
              <p className="watch"><strong>{t('pathway.watch')}</strong> {s.watch}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
