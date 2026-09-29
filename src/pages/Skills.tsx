import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JOURNEYS, SKILLS, TRACKS, readingById } from '../content';
import { useLocalizer } from '../content/localize';
import type { Skill, TrackId } from '../content/types';
import { href } from '../router';

const KINDS: Skill['kind'][] = ['Technical', 'Operation', 'Business', 'Records', 'Testing'];

export default function Skills({ track }: { track?: string }) {
  const { t } = useTranslation();
  const L = useLocalizer();
  const [tr, setTr] = useState<string>(TRACKS.some(x => x.id === track && x.status !== 'soon') ? track! : 'all');
  const [kind, setKind] = useState<string>('all');
  const [q, setQ] = useState('');
  const all = SKILLS.map(L.skill);
  const shown = all.filter(s => (tr === 'all' || s.track === tr) && (kind === 'all' || s.kind === kind) && (!q.trim() || (s.name + ' ' + s.does + ' ' + s.train.map(x => x.where).join(' ')).toLowerCase().includes(q.trim().toLowerCase())));
  const usedIn = (id: string, tid: TrackId) => (JOURNEYS[tid] ? L.journey(tid, JOURNEYS[tid]!).stages.filter((_, i) => JOURNEYS[tid]!.stages[i].skills.includes(id)).map(s => s.day) : []);
  return (
    <div>
      <p className="crumbs"><a href={href()}>{t('nav.home')}</a> / {t('skills.crumb')}</p>
      <h1>{t('skills.title')}</h1>
      <p className="lead">{t('skills.lead')}</p>
      <div className="box box-warn"><strong className="box-title">{t('skills.warnTitle')}</strong><p>{t('skills.warn')}</p></div>
      <div className="filters">
        <div className="filter-group" role="group" aria-label={t('skills.track')}>
          {[{ id: 'all', name: t('skills.all') }, ...TRACKS.filter(x => x.status !== 'soon').map(x => ({ id: x.id, name: L.track(x).short }))].map(x => <button key={x.id} className={tr === x.id ? 'pill on' : 'pill'} onClick={() => setTr(x.id)}>{x.name}</button>)}
        </div>
        <div className="filter-group" role="group" aria-label={t('skills.kindGroup')}>
          {['all', ...KINDS].map(k => <button key={k} className={kind === k ? 'pill on' : 'pill'} onClick={() => setKind(k)}>{k === 'all' ? t('skills.anyKind') : t(`skills.kind.${k}`)}</button>)}
        </div>
        <label className="search">{t('skills.search')}<input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={t('skills.placeholder')} /></label>
      </div>
      <p className="meta">{t('skills.count', { count: shown.length })}</p>
      <div className="skill-list">
        {shown.map(s => {
          const base = TRACKS.find(x => x.id === s.track)!;
          const days = usedIn(s.id, s.track);
          const rd = s.readingId ? readingById(s.readingId) : undefined;
          return (
            <details key={s.id} className={`skill hue-${base.hue}`}>
              <summary><span className="skill-name">{s.name}</span><span className="chip">{t(`skills.kind.${s.kind}`)}</span><span className="chip chip-track">{L.track(base).short}</span></summary>
              <div className="skill-body">
                <p>{s.does}</p>
                <h3>{t('skills.where')}</h3>
                <ul>{s.train.map(x => <li key={x.where}><strong>{x.where}</strong>{x.detail ? `: ${x.detail}` : ''}</li>)}</ul>
                <h3>{t('skills.who')}</h3>
                <p>{s.who}</p>
                {s.note && <div className="box box-warn"><strong className="box-title">{t('skills.note')}</strong><p>{s.note}</p></div>}
                {days.length > 0 && <p className="meta">{t('skills.neededIn', { days: days.join(', ') })}</p>}
                <p className="meta">{t('skills.page', { page: s.page })}{rd && <> · <a href={href('read', rd.id)}>{t('common.readMore', { title: L.reading(rd).title })}</a></>}</p>
              </div>
            </details>
          );
        })}
        {!shown.length && <p>{t('skills.none')}</p>}
      </div>
    </div>
  );
}
