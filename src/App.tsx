import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TRACKS } from './content';
import { useLocalizer } from './content/localize';
import { LANGUAGES } from './i18n';
import { href, useRoute } from './router';
import Home from './pages/Home';
import Personal from './pages/Personal';
import Workspace from './pages/Workspace';
import Practice from './pages/Practice';
import Track, { NotFound } from './pages/Track';
import ReadingPage from './pages/Reading';
import See from './pages/See';
import ScenarioPage from './pages/Scenario';
import Quiz from './pages/Quiz';
import Skills from './pages/Skills';
import Pathway from './pages/Pathway';
import Course from './pages/Course';
import Framework from './pages/Framework';
import Library from './pages/Library';
import Learn from './pages/Learn';
import Play from './pages/Play';
import Projects from './pages/Projects';
import Visualise from './pages/Visualise';

function Page({ parts }: { parts: string[] }) {
  const [a, b] = parts;
  switch (a) {
    case undefined: return <Home />;
    case 'library': return <Library />;
    case 'learn': return <Learn parts={parts.slice(1)} />;
    case 'visualise': return <Visualise parts={parts.slice(1)} />;
    case 'play': return <Play />;
    case 'projects': return <Projects />;
    case 'track': return b ? <Track id={b} /> : <NotFound />;
    case 'read': return b ? <ReadingPage id={b} /> : <NotFound />;
    case 'see': return b ? <See id={b} /> : <NotFound />;
    case 'try': return b ? <ScenarioPage id={b} /> : <NotFound />;
    case 'check': return b ? <Quiz id={b} /> : <NotFound />;
    case 'skills': return <Skills key={b} track={b} />;
    case 'personal': return <Personal />;
    case 'workspace': return <Workspace key={b} stage={b} />;
    case 'practice': return <Practice />;
    case 'course': return <Course id={b} />;
    case 'framework': return <Framework parts={parts.slice(1)} />;
    case 'pathway': return b ? <Pathway id={b} /> : <NotFound />;
    default: return <NotFound />;
  }
}

export default function App() {
  const { t, i18n } = useTranslation();
  const L = useLocalizer();
  const parts = useRoute();
  useEffect(() => { document.getElementById('main')?.focus({ preventScroll: true }); if(parts.length) try { localStorage.setItem('gram-urja:last-route', href(...parts)); } catch {} }, [parts.join('/')]);
  const active = parts[0] === 'skills' ? 'skills' : parts[0] === 'course' ? 'course' : parts[0] === 'framework' ? 'framework' : parts[1];
  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>
      <header className="top no-print">
        <a className="brand" href={href()}><svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#2f5d3a" /><circle cx="10" cy="11" r="4" fill="#f2b632" /><path d="M6 25 q10 -14 20 0z" fill="#eaf0df" /></svg><span>{t('brand')}</span></a>
        <nav aria-label={t('nav.main')}>
          <a href={href('framework')} aria-current={active === 'framework' ? 'page' : undefined}>Framework</a>
          <a href={href('learn')} aria-current={['learn','course','skills','personal','practice','library','track','see','read','check','pathway'].includes(parts[0]) ? 'page' : undefined}>Learn</a>
          <a href={href('visualise')} aria-current={parts[0] === 'visualise' ? 'page' : undefined}>Visualise</a>
          <a href={href('play')} aria-current={['play','try'].includes(parts[0]) ? 'page' : undefined}>Play</a>
          <a href={href('projects')} aria-current={['projects','workspace'].includes(parts[0]) ? 'page' : undefined}>Projects</a>
        </nav>
        <div className="lang" role="group" aria-label={t('language')}>
          {LANGUAGES.map(l => <button key={l.code} lang={l.code} className={i18n.resolvedLanguage === l.code ? 'pill on' : 'pill'} aria-pressed={i18n.resolvedLanguage === l.code} onClick={() => i18n.changeLanguage(l.code)}>{l.label}</button>)}
        </div>
      </header>
      <main id="main" tabIndex={-1}>{i18n.resolvedLanguage === 'hi' && ['personal','workspace','practice','framework','course','learn','play','projects','library','visualise'].includes(parts[0]) && <p className="hint" lang="hi">यह नया भाग अभी अंग्रेज़ी में है। हिन्दी अनुवाद की समीक्षा बाकी है।</p>}<Page parts={parts} /></main>
      <footer className="foot no-print"><p>{t('footer')}</p></footer>
    </>
  );
}
