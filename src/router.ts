import { useEffect, useState } from 'react';

export const parseHash = (h: string): string[] => h.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
export const href = (...parts: string[]) => '#/' + parts.map(encodeURIComponent).join('/');

export function useRoute(): string[] {
  const [parts, setParts] = useState(() => parseHash(location.hash));
  useEffect(() => {
    const onChange = () => { setParts(parseHash(location.hash)); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return parts;
}
export const go = (...parts: string[]) => { location.hash = href(...parts); };
