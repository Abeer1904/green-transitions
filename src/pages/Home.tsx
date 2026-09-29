import { Trans, useTranslation } from 'react-i18next';
import { JOURNEYS, SCENARIOS, SKILLS, TRACKS, readingsFor } from '../content';
import { useLocalizer } from '../content/localize';
import { href } from '../router';
import { useProgress } from '../progress';

const STEPS = ['read', 'see', 'try', 'check', 'skills', 'plan'] as const;

export default function Home() {
  const { t } = useTranslation();
  const L = useLocalizer();
  const p = useProgress();
  const live = TRACKS.filter(x => x.status === 'live');
  return (
    <>
      <section className="hero">
        <p className="eyebrow">{t('home.eyebrow')}</p>
        <h1><Trans i18nKey="home.title" components={{ zero: <span className="zero" />, one: <span className="one" /> }} /></h1>
        <p className="lead"><Trans i18nKey="home.lead" components={{ b: <strong /> }} /></p>
        <div className="cta-row">
          {live.map(x => <a key={x.id} className={`btn btn-big hue-${x.hue}`} href={href('track', x.id)}>{t('home.startWith', { name: L.track(x).short })}</a>)}
        </div>
      </section>

      <section>
        <h2 className="section-title">{t('home.chooseTrack')}</h2>
        <div className="grid">
          {TRACKS.map(x => {
            const rs = readingsFor(x.id);
            const read = rs.filter(r => p.read.includes(r.id)).length;
            const lt = L.track(x);
            const inner = (
              <>
                <span className={`chip hue-${x.hue}`}>{t(`home.status.${x.status}`)}</span>
                <h3>{lt.name}</h3>
                <p>{lt.tagline}</p>
                {x.status !== 'soon' && <p className="meta">{t('home.readingCount', { count: rs.length })}{read ? ` · ${t('home.doneCount', { count: read })}` : ''}{JOURNEYS[x.id] ? ` · ${t('home.view01')}` : ''}</p>}
              </>
            );
            return x.status === 'soon'
              ? <div key={x.id} className={`card track-card soon hue-${x.hue}`}>{inner}</div>
              : <a key={x.id} className={`card track-card hue-${x.hue}`} href={href('track', x.id)}>{inner}</a>;
          })}
        </div>
      </section>

      <section>
        <h2 className="section-title">{t('home.howTitle')}</h2>
        <ol className="steps">
          {STEPS.map((s, i) => <li key={s}><span className="step-n">{i + 1}</span><div><strong>{t(`home.steps.${s}.title`)}</strong><p>{t(`home.steps.${s}.text`)}</p></div></li>)}
        </ol>
        <p className="hint">{t('home.hint')}</p>
      </section>

      <section className="band">
        <div>
          <h2>{t('home.skillsBandTitle')}</h2>
          <p>{t('home.skillsBandText', { count: SKILLS.length })}</p>
          <a className="btn" href={href('skills')}>{t('home.browseSkills')}</a>
        </div>
        <div>
          <h2>{t('home.scenariosTitle', { count: SCENARIOS.length })}</h2>
          <p>{t('home.scenariosText')}</p>
        </div>
      </section>

      <p className="fine"><Trans i18nKey="home.fine" components={{ i: <em /> }} /></p>
    </>
  );
}
