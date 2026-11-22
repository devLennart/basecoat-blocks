#!/usr/bin/env node
// Builds a local gallery for clicking through every block, then serves it.
// Uses the same preview pages as scripts/preview.mjs and the same catalog
// order and titles as scripts/build.mjs.
//
//   npm run gallery                   build and serve on http://localhost:4321
//   npm run gallery -- --port 5000    another port
//   npm run gallery -- --no-serve     only write .cache/preview/index.html
//
// In the gallery: pick a block in the sidebar (or the menu on narrow screens),
// switch Desktop / Tablet / Mobile width and light / dark, show or copy the
// block code, or open the standalone preview. Keys: j / k next / previous,
// c code / preview, / search.
// Rerun the command after editing a block.
import { writeFile, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { join, relative, extname, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildPreviews, outDir, root } from './preview.mjs';
import { CATEGORIES, loadCategory, BASECOAT_VERSION } from './build.mjs';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const icon = (paths, cls = 'size-4') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}" aria-hidden="true">${paths}</svg>`;
const ICONS = {
  logo: '<path d="M12 3 2 21h20L12 3Z"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  prev: '<path d="m15 18-6-6 6-6"/>',
  next: '<path d="m9 18 6-6-6-6"/>',
  desktop: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
  tablet: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M12 18h.01"/>',
  mobile: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
};

function page(categories) {
  const blocks = categories.flatMap((c) => c.blocks.map((b) => ({ ...b, category: c.heading })));
  const data = blocks.map(({ name, title, category, components, js, fragment }) => ({ name, title, category, components, js, code: fragment }));
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  const nav = categories
    .map(
      ({ heading, blocks: list }) => `
      <section data-category class="flex flex-col gap-0.5">
        <h2 class="px-2 pt-4 pb-1 text-xs font-medium text-muted-foreground">${esc(heading)} <span class="tabular-nums">· ${list.length}</span></h2>
        ${list
          .map(
            (b) => `<a href="#${b.name}" data-block="${b.name}" data-search="${esc(`${b.name} ${b.title} ${b.components.join(' ')}`.toLowerCase())}" class="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground aria-[current=page]:bg-accent aria-[current=page]:font-medium aria-[current=page]:text-accent-foreground"><span class="min-w-0 truncate">${esc(b.title)}</span><span class="shrink-0 font-mono text-xs text-muted-foreground">${b.name}</span></a>`,
          )
          .join('\n        ')}
      </section>`,
    )
    .join('');

  const options = categories
    .map(({ heading, blocks: list }) => `<optgroup label="${esc(heading)}">${list.map((b) => `<option value="${b.name}">${esc(b.title)} · ${b.name}</option>`).join('')}</optgroup>`)
    .join('');

  const viewportBtn = (id, label) =>
    `<button type="button" class="btn" data-size="icon-sm" data-variant="ghost" data-viewport="${id}" aria-label="${label}" title="${label}">${icon(ICONS[id])}</button>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Basecoat Blocks — Gallery</title>
  <link rel="stylesheet" href="styles.css">
  <script>
    try { const t = localStorage.getItem('gallery-theme'); if (t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark'); } catch {}
  </script>
</head>
<body class="h-dvh overflow-hidden bg-background text-foreground">
<div class="flex h-full">
  <aside class="hidden w-72 shrink-0 flex-col border-e md:flex">
    <div class="flex items-center gap-2 border-b px-4 py-3">
      <span class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">${icon(ICONS.logo, 'size-4')}</span>
      <div class="grid leading-tight">
        <span class="text-sm font-semibold">Basecoat Blocks</span>
        <span class="text-xs text-muted-foreground">${blocks.length} blocks · Basecoat ${BASECOAT_VERSION}</span>
      </div>
    </div>
    <div class="px-3 pt-3">
      <div class="relative">
        <span class="pointer-events-none absolute start-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">${icon(ICONS.search)}</span>
        <label for="search" class="sr-only">Search blocks</label>
        <input id="search" type="search" class="input ps-8" placeholder="Search blocks or components" autocomplete="off">
      </div>
    </div>
    <nav aria-label="Blocks" class="flex-1 overflow-y-auto px-2 pb-4">${nav}
      <p id="no-results" class="hidden px-2 pt-4 text-sm text-muted-foreground">No blocks match.</p>
    </nav>
    <p class="border-t px-4 py-2 text-xs text-muted-foreground"><kbd class="kbd">j</kbd> <kbd class="kbd">k</kbd> browse · <kbd class="kbd">c</kbd> code · <kbd class="kbd">/</kbd> search</p>
  </aside>

  <main class="flex min-w-0 flex-1 flex-col">
    <header class="flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-2.5">
      <div class="min-w-0 basis-full md:basis-auto md:flex-1">
        <label for="picker" class="sr-only">Block</label>
        <select id="picker" class="select w-full md:hidden">${options}</select>
        <div class="hidden min-w-0 items-center gap-2 md:flex">
          <h1 id="title" class="truncate text-sm font-semibold"></h1>
          <span id="name" class="badge" data-variant="outline"></span>
          <span id="js" class="badge hidden" data-variant="secondary">needs Basecoat JS</span>
          <span id="components" class="hidden truncate text-xs text-muted-foreground lg:inline"></span>
        </div>
      </div>
      <div class="ms-auto flex items-center gap-1">
        <button type="button" id="prev" class="btn" data-size="icon-sm" data-variant="ghost" aria-label="Previous block" title="Previous block (k)">${icon(ICONS.prev)}</button>
        <button type="button" id="next" class="btn" data-size="icon-sm" data-variant="ghost" aria-label="Next block" title="Next block (j)">${icon(ICONS.next)}</button>
        <span class="mx-1 h-5 w-px bg-border"></span>
        <div class="hidden items-center gap-1 sm:flex" role="group" aria-label="Preview width">
          ${viewportBtn('desktop', 'Desktop width')}
          ${viewportBtn('tablet', 'Tablet width (768px)')}
          ${viewportBtn('mobile', 'Mobile width (390px)')}
        </div>
        <button type="button" id="theme" class="btn" data-size="icon-sm" data-variant="ghost" aria-label="Toggle dark mode" title="Toggle dark mode">
          <span class="dark:hidden">${icon(ICONS.moon)}</span><span class="hidden dark:inline">${icon(ICONS.sun)}</span>
        </button>
        <span class="mx-1 h-5 w-px bg-border"></span>
        <button type="button" id="code-toggle" class="btn" data-size="sm" data-variant="ghost" aria-pressed="false" title="Show code (c)">${icon(ICONS.code)}<span>Code</span></button>
        <button type="button" id="copy" class="btn" data-size="sm" data-variant="outline">${icon(ICONS.copy)}<span id="copy-label">Copy code</span></button>
        <a id="open" class="btn" data-size="icon-sm" data-variant="ghost" target="_blank" rel="noopener" aria-label="Open standalone preview" title="Open standalone preview">${icon(ICONS.external)}</a>
      </div>
    </header>
    <div id="stage" class="flex flex-1 justify-center overflow-auto bg-muted/50">
      <iframe id="frame" title="Block preview" class="h-full w-full bg-background transition-[width] duration-200"></iframe>
    </div>
    <div id="code-view" class="hidden flex-1 overflow-auto bg-muted/50">
      <pre class="p-4 font-mono text-[13px] leading-relaxed"><code id="code"></code></pre>
    </div>
  </main>
</div>

<script type="application/json" id="blocks">${json}</script>
<script>
(() => {
  const blocks = JSON.parse(document.getElementById('blocks').textContent);
  const $ = (id) => document.getElementById(id);
  const frame = $('frame'), stage = $('stage'), search = $('search');
  const links = [...document.querySelectorAll('[data-block]')];
  const WIDTHS = { desktop: null, tablet: 768, mobile: 390 };
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
  let current = 0;
  let viewport = store.get('gallery-viewport') in WIDTHS ? store.get('gallery-viewport') : 'desktop';

  const isDark = () => document.documentElement.classList.contains('dark');
  function syncFrameTheme() {
    // Works when served over http (same origin); file:// pages cannot reach into the iframe.
    try { frame.contentDocument.documentElement.classList.toggle('dark', isDark()); } catch {}
  }

  function show(index, { push = true } = {}) {
    current = (index + blocks.length) % blocks.length;
    const b = blocks[current];
    document.title = b.title + ' — Basecoat Blocks';
    $('title').textContent = b.title;
    $('name').textContent = b.name;
    $('js').classList.toggle('hidden', !b.js);
    $('components').textContent = b.components.join(' · ');
    $('picker').value = b.name;
    $('open').href = b.name + '.html';
    frame.src = b.name + '.html';
    $('code').textContent = b.code;
    for (const a of links) {
      const on = a.dataset.block === b.name;
      if (on) { a.setAttribute('aria-current', 'page'); a.scrollIntoView({ block: 'nearest' }); }
      else a.removeAttribute('aria-current');
    }
    if (push && location.hash !== '#' + b.name) history.replaceState(null, '', '#' + b.name);
  }

  function setViewport(id) {
    viewport = id;
    store.set('gallery-viewport', id);
    const w = WIDTHS[id];
    frame.style.width = w ? w + 'px' : '100%';
    frame.classList.toggle('border-x', !!w);
    for (const btn of document.querySelectorAll('[data-viewport]')) {
      const on = btn.dataset.viewport === id;
      btn.dataset.variant = on ? 'secondary' : 'ghost';
      btn.setAttribute('aria-pressed', on);
    }
  }

  let showCode = false;
  function setCodeView(on) {
    showCode = on;
    store.set('gallery-code', on ? '1' : '0');
    stage.classList.toggle('hidden', on);
    $('code-view').classList.toggle('hidden', !on);
    const btn = $('code-toggle');
    btn.dataset.variant = on ? 'secondary' : 'ghost';
    btn.setAttribute('aria-pressed', on);
    btn.title = on ? 'Show preview (c)' : 'Show code (c)';
  }

  const fromHash = () => {
    const i = blocks.findIndex((b) => b.name === location.hash.slice(1));
    return i < 0 ? 0 : i;
  };

  frame.addEventListener('load', syncFrameTheme);
  window.addEventListener('hashchange', () => show(fromHash(), { push: false }));
  $('prev').addEventListener('click', () => show(current - 1));
  $('next').addEventListener('click', () => show(current + 1));
  $('picker').addEventListener('change', (e) => show(blocks.findIndex((b) => b.name === e.target.value)));
  for (const btn of document.querySelectorAll('[data-viewport]')) btn.addEventListener('click', () => setViewport(btn.dataset.viewport));
  $('theme').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    store.set('gallery-theme', isDark() ? 'dark' : 'light');
    syncFrameTheme();
  });
  $('code-toggle').addEventListener('click', () => setCodeView(!showCode));
  $('copy').addEventListener('click', async () => {
    const label = $('copy-label');
    try { await navigator.clipboard.writeText(blocks[current].code + '\\n'); label.textContent = 'Copied'; }
    catch { label.textContent = 'Copy failed'; }
    setTimeout(() => (label.textContent = 'Copy code'), 1500);
  });

  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    for (const a of links) {
      const hit = !q || a.dataset.search.includes(q);
      a.classList.toggle('hidden', !hit);
      shown += hit;
    }
    for (const s of document.querySelectorAll('[data-category]')) s.classList.toggle('hidden', !s.querySelector('[data-block]:not(.hidden)'));
    $('no-results').classList.toggle('hidden', shown > 0);
  });
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { const first = links.find((a) => !a.classList.contains('hidden')); if (first) location.hash = first.dataset.block; }
    if (e.key === 'Escape') { search.value = ''; search.dispatchEvent(new Event('input')); search.blur(); }
  });

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest('input, select, textarea')) return;
    if (e.key === 'j') show(current + 1);
    else if (e.key === 'k') show(current - 1);
    else if (e.key === 'c') setCodeView(!showCode);
    else if (e.key === '/') { e.preventDefault(); search.focus(); }
  });

  setViewport(viewport);
  setCodeView(store.get('gallery-code') === '1');
  show(fromHash());
})();
</script>
</body>
</html>
`;
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml' };

function serve(port) {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = normalize(join(outDir, path === '/' ? 'index.html' : path));
    if (!file.startsWith(outDir + sep)) { res.writeHead(403).end(); return; }
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store' }).end(body);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
    }
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') { console.log(`Port ${port} is busy, trying ${port + 1}…`); serve(port + 1); }
    else throw err;
  });
  server.listen(port, '127.0.0.1', () => console.log(`Gallery: http://localhost:${port}/  (Ctrl+C to stop)`));
}

const args = process.argv.slice(2);
const portArg = args.indexOf('--port');
const port = Number(portArg >= 0 ? args[portArg + 1] : process.env.PORT) || 4321;

await buildPreviews();
const categories = await Promise.all(CATEGORIES.map(loadCategory));
const index = join(outDir, 'index.html');
await writeFile(index, page(categories));
console.log(`Built ${relative(root, index)} (${categories.reduce((n, c) => n + c.blocks.length, 0)} blocks).`);
if (!args.includes('--no-serve')) serve(port);
