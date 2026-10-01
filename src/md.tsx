import { Fragment, type ReactNode } from 'react';
import { href } from './router';

/** A deliberately small Markdown subset for readings: headings, paragraphs, lists, tables,
 *  quotes, **bold**, *italic*, and ::: boxes (ask / note / warn) whose first line is the title. */
export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[\[([\w-]+)\|(.+?)\]\]|\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(m[1] !== undefined ? <a key={i++} className="ev" href={href('read', m[1])}>{m[2]}</a> : m[3] !== undefined ? <strong key={i++}>{m[3]}</strong> : <em key={i++}>{m[4]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out.map((n, k) => <Fragment key={k}>{n}</Fragment>)}</>;
}

const cells = (line: string) => line.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());

export function Markdown({ src, hide = [] }: { src: string; hide?: string[] }) {
  const lines = src.split('\n');
  const blocks: ReactNode[] = [];
  let i = 0, k = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const box = line.match(/^:::(\w+)\s*$/);
    if (box) {
      const inner: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') inner.push(lines[i++]);
      i++;
      const [title, ...rest] = inner;
      if (hide.includes(box[1])) continue;
      blocks.push(<aside key={k++} className={`box box-${box[1]}`}><strong className="box-title">{title}</strong><Markdown src={rest.join('\n')} hide={hide} /></aside>);
      continue;
    }
    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) { blocks.push(h[1] === '##' ? <h2 key={k++}><Inline text={h[2]} /></h2> : <h3 key={k++}><Inline text={h[2]} /></h3>); i++; continue; }
    if (line.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) { if (!/^\|[\s|:-]+\|$/.test(lines[i])) rows.push(cells(lines[i])); i++; }
      const [head, ...body] = rows;
      blocks.push(<div key={k++} className="table-wrap"><table><thead><tr>{head.map((c, j) => <th key={j}><Inline text={c} /></th>)}</tr></thead><tbody>{body.map((r, j) => <tr key={j}>{r.map((c, n) => <td key={n}><Inline text={c} /></td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    if (line.startsWith('>')) {
      const q: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) q.push(lines[i++].replace(/^>\s?/, ''));
      blocks.push(<blockquote key={k++}><Inline text={q.join(' ')} /></blockquote>);
      continue;
    }
    const ul = /^-\s+/, ol = /^\d+\.\s+/;
    if (ul.test(line) || ol.test(line)) {
      const ordered = ol.test(line), re = ordered ? ol : ul, items: string[] = [];
      while (i < lines.length && re.test(lines[i])) items.push(lines[i++].replace(re, ''));
      const li = items.map((t, j) => <li key={j}><Inline text={t} /></li>);
      blocks.push(ordered ? <ol key={k++}>{li}</ol> : <ul key={k++}>{li}</ul>);
      continue;
    }
    const p: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(:::|#{2,3}\s|\||>|-\s|\d+\.\s)/.test(lines[i])) p.push(lines[i++]);
    blocks.push(<p key={k++}><Inline text={p.join(' ')} /></p>);
  }
  return <>{blocks}</>;
}
