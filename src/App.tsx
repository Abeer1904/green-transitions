import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TRACKS } from './content';
import { useLocalizer } from './content/localize';
import { LANGUAGES } from './i18n';
import { href, useRoute } from './router';
import Home from './pages/Home';
import Track, { NotFound } from './pages/Track';
import ReadingPage from './pages/Reading';
import See from './pages/See';
import ScenarioPage from './pages/Scenario';
import Quiz from './pages/Quiz';
import Skills from './pages/Skills';
import Pathway from './pages/Pathway';

function Page({ parts }: { parts: string[] }) {
  const [a, b] = parts;
  switch (a) {
    case undefined: return <Home />;
    case 'track': return b ? <Track id={b} /> : <NotFound />;
    case 'read': return b ? <ReadingPage id={b} /> : <NotFound />;
    case 'see': return b ? <See id={b} /> : <NotFound />;
    case 'try': return b ? <ScenarioPage id={b} /> : <NotFound />;
    case 'check': return b ? <Quiz id={b} /> : <NotFound />;
    case 'skills': return <Skills track={b} />;
    case 'pathway': return b ? <Pathway id={b} /> : <NotFound />;
    default: return <NotFound />;
  }
}

export default function App() {
  const { t, i18n } = useTranslation();
  const L = useLocalizer();
  const parts = useRoute();
  useEffect(() => { document.getElementById('main')?.focus({ preventScroll: true }); }, [parts.join('/')]);
  const active = parts[0] === 'skills' ? 'skills' : parts[1];
  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>
      <header className="top no-print">
        <a className="brand" href={href()}><svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#2f5d3a" /><circle cx="10" cy="11" r="4" fill="#f2b632" /><path d="M6 25 q10 -14 20 0z" fill="#eaf0df" /></svg><span>{t('brand')}</span></a>
        <nav aria-label={t('nav.main')}>
          {TRACKS.filter(x => x.status !== 'soon').map(x => <a key={x.id} href={href('track', x.id)} aria-current={active === x.id ? 'page' : undefined}>{L.track(x).short}</a>)}
          <a href={href('skills')} aria-current={active === 'skills' ? 'page' : undefined}>{t('nav.skills')}</a>
        </nav>
        <div className="lang" role="group" aria-label={t('language')}>
          {LANGUAGES.map(l => <button key={l.code} lang={l.code} className={i18n.resolvedLanguage === l.code ? 'pill on' : 'pill'} aria-pressed={i18n.resolvedLanguage === l.code} onClick={() => i18n.changeLanguage(l.code)}>{l.label}</button>)}
        </div>
      </header>
      <main id="main" tabIndex={-1}><Page parts={parts} /></main>
      <footer className="foot no-print"><p>{t('footer')}</p></footer>
    </>
  );
}
