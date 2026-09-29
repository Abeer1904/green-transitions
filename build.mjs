import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await build({entryPoints:['src/main.tsx'],bundle:true,format:'esm',minify:true,outfile:'dist/app.js',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'}});
await writeFile('dist/index.html',`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#315b3e"><title>Gram Urja — Green Transitions</title><meta name="description" content="Learn, practise and build connected individual and village pathways into green livelihoods."><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/app.css"></head><body><div id="root"></div><script type="module" src="/app.js"></script></body></html>`);
await writeFile('dist/favicon.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#315b3e"/><path d="M8 24V14h6v10m4 0V8h6v16" fill="none" stroke="#eaf0df" stroke-width="3"/></svg>');
