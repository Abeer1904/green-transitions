/**
 * Language registry. To add a language (say Punjabi, `pa`):
 *   1. copy locales/hi/ to locales/pa/ and translate ui.json, scenarios.json, quizzes.json, skills.json, journeys.json, tracks.json
 *   2. translate the readings into content/readings/pa/ (same filenames as English)
 *   3. add the imports and one entry below
 * Anything not yet translated falls back to English, so a language can ship a piece at a time.
 */
import enUi from '../../locales/en/ui.json';
import hiUi from '../../locales/hi/ui.json';
import hiScenarios from '../../locales/hi/scenarios.json';
import hiQuizzes from '../../locales/hi/quizzes.json';
import hiSkills from '../../locales/hi/skills.json';
import hiJourneys from '../../locales/hi/journeys.json';
import hiTracks from '../../locales/hi/tracks.json';
import { READING_TEXT } from '../generated/readings-i18n';

export type Resource = Record<string, unknown>;
export const LANGUAGES: { code: string; label: string; dir?: 'rtl' }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
];
export const RESOURCES: Record<string, Record<string, Resource>> = {
  en: { ui: enUi },
  hi: { ui: hiUi, scenarios: hiScenarios, quizzes: hiQuizzes, skills: hiSkills, journeys: hiJourneys, tracks: hiTracks, readings: READING_TEXT.hi ?? {} },
};
