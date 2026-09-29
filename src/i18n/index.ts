import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LANGUAGES, RESOURCES } from './locales';

const KEY = 'gram-urja:lang';
const supported = LANGUAGES.map(l => l.code);

function initialLanguage(): string {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && supported.includes(saved)) return saved;
  } catch { /* storage may be blocked */ }
  const guess = (navigator.languages?.length ? navigator.languages : [navigator.language]).map(l => l.slice(0, 2).toLowerCase()).find(l => supported.includes(l));
  return guess || 'en';
}

const resources = Object.fromEntries(Object.entries(RESOURCES).map(([lng, ns]) => [lng, ns]));
i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage(),
  fallbackLng: 'en',
  supportedLngs: supported,
  defaultNS: 'ui',
  ns: ['ui'],
  interpolation: { escapeValue: false },
  returnNull: false,
});

function applyLanguage(lng: string) {
  const meta = LANGUAGES.find(l => l.code === lng);
  document.documentElement.lang = lng;
  document.documentElement.dir = meta?.dir ?? 'ltr';
  document.title = i18n.t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('meta.description'));
}
applyLanguage(i18n.language);
i18n.on('languageChanged', lng => {
  applyLanguage(lng);
  try { localStorage.setItem(KEY, lng); } catch { /* keep working without it */ }
});

export default i18n;
export { LANGUAGES };
