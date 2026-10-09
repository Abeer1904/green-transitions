import { useRef } from 'react';
import { href } from '../router';

/** Keep the original workshop and directory isolated while sharing app navigation and storage. */
export default function Experience({ kind, parts }: { kind: 'pipeline' | 'workshop'; parts: string[] }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const path = kind === 'pipeline' ? 'pipeline/index.html' : 'games/navapur/index.html';
  const title = kind === 'pipeline' ? 'Project directory and drafts' : 'Navapur story and workshop';
  const hash = parts.length ? '#' + parts.map(encodeURIComponent).join('/') : kind === 'pipeline' ? '#projects' : '';
  function connect() {
    const child = frame.current?.contentWindow;
    if (!child) return;
    child.addEventListener('hashchange', () => {
      const suffix = child.location.hash.replace(/^#/, '');
      // The frame already creates history entries; keep the outer shareable URL in sync.
      history.replaceState(null, '', href(kind) + (suffix ? '/' + suffix : ''));
    });
    child.document.addEventListener('click', event => {
      const anchor = (event.target as Element).closest?.('a');
      if (!anchor || anchor.target === '_blank' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const url = new URL(anchor.href);
      const root = new URL('./', location.href);
      if (url.origin === root.origin && (url.pathname === root.pathname || url.pathname === root.pathname + 'index.html')) {
        event.preventDefault();
        location.hash = url.hash || '#/';
      }
    });
  }
  return <section className="integrated-experience">
    <div className="experience-heading"><div><p className="crumbs"><a href={href(kind === 'pipeline' ? 'projects' : 'navapur')}>{kind === 'pipeline' ? 'Projects' : 'Navapur'}</a> / {title}</p><h1>{title}</h1></div><a href={path + hash} target="_blank" rel="noopener">Open full window ↗</a></div>
    <iframe ref={frame} src={path + hash} title={title} onLoad={connect} allow="fullscreen" />
  </section>;
}
