import { useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { readingById, scenarioById, trackById } from '../content';
import { useLocalizer } from '../content/localize';
import { Inline } from '../md';
import { href } from '../router';
import { recordEnd, useProgress } from '../progress';
import { NotFound } from './Track';

export default function ScenarioPage({ id }: { id: string }) {
  const { t } = useTranslation();
  const L = useLocalizer();
  const en = scenarioById(id);
  const sc = useMemo(() => (en ? L.scenario(en) : undefined), [en, L.lang]);
  const p = useProgress();
  const [trail, setTrail] = useState<{ node: string; picked?: string }[]>(() => (en ? [{ node: en.start }] : []));
  useEffect(() => { if (en) setTrail([{ node: en.start }]); }, [en]);
  const cur = trail[trail.length - 1];
  const node = sc && cur ? sc.nodes[cur.node] : undefined;
  useEffect(() => { if (sc && node?.end && cur) recordEnd(sc.id, cur.node); }, [sc, node, cur]);
  if (!sc || !node || !cur) return <NotFound />;
  const base = trackById(sc.track)!;
  const ends = Object.values(sc.nodes).filter(n => n.end).length;
  const found = (p.ends[sc.id] || []).length;
  // The label chosen is stored as a node id path, so the recap re-renders in the current language.
  const pick = (to: string, idx: number) => setTrail(tr => [...tr.slice(0, -1), { ...tr[tr.length - 1], picked: String(idx) }, { node: to }]);
  const back = () => setTrail(tr => tr.length > 1 ? tr.slice(0, -1).map((s, n, a) => n === a.length - 1 ? { node: s.node } : s) : tr);
  const restart = () => setTrail([{ node: sc.start }]);
  const enEnd = en!.nodes[cur.node]?.end;
  const reading = enEnd?.readingId ? L.reading(readingById(enEnd.readingId)!) : undefined;
  const outcome = node.end?.outcome;
  return (
    <div className={`scenario hue-${base.hue}`}>
      <p className="crumbs"><a href={href()}>{t('nav.home')}</a> / <a href={href('track', base.id)}>{L.track(base).short}</a> / {t('scenario.crumb')}</p>
      <p className="eyebrow">{sc.kind === 'skills' ? t('scenario.eyebrowSkills') : t('scenario.eyebrowVillage')} · {t('scenario.found', { found, total: ends })}</p>
      <h1>{sc.title}</h1>
      <div className="story" aria-live="polite">
        {trail.slice(0, -1).map((s, n) => {
          const past = sc.nodes[s.node];
          const label = past.choices?.[Number(s.picked)]?.label ?? '';
          return (
            <div key={n} className="story-past">
              <p><Inline text={past.text} /></p>
              <p className="picked"><Trans i18nKey="scenario.youChose" values={{ label }} components={{ b: <strong /> }} /></p>
            </div>
          );
        })}
        <div className="story-now">
          <p className="situation"><Inline text={node.text} /></p>
          {node.fact && <div className="box box-note"><strong className="box-title">{t('scenario.directorySays')}</strong><p><Inline text={node.fact} /></p></div>}
          {node.choices && (
            <div className="choices" role="group" aria-label={t('scenario.whatDo')}>
              <p className="choices-q">{t('scenario.whatDo')}</p>
              {node.choices.map((c, idx) => <button key={c.to + idx} className="choice" onClick={() => pick(c.to, idx)}>{c.label}</button>)}
            </div>
          )}
          {node.end && outcome && (
            <div className={`ending ending-${outcome}`}>
              <p className="eyebrow">{t(`scenario.outcome.${outcome}`)}</p>
              <h2>{node.end.title}</h2>
              <p><strong>{t('scenario.takeThis')}</strong> {node.end.learn}</p>
              {reading && <p><a href={href('read', reading.id)}>{t('common.readMoreArrow', { title: reading.title })}</a></p>}
              <p className="ending-count">{t('scenario.count', { found, total: ends })}</p>
              <div className="pager"><button className="btn btn-ghost" onClick={back}>{t('scenario.oneBack')}</button><button className="btn" onClick={restart}>{t('scenario.again')}</button></div>
            </div>
          )}
        </div>
      </div>
      {!node.end && trail.length > 1 && <p><button className="link-btn" onClick={back}>{t('scenario.goBack')}</button></p>}
    </div>
  );
}
