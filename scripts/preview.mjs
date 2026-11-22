#!/usr/bin/env node
// Builds standalone preview pages for blocks into .cache/preview/ (gitignored).
// The pages use the same setup a real project has: Tailwind CSS 4 compiled
// together with basecoat-css from node_modules, so no CDN is involved.
//
//   npm run preview                     every block
//   npm run preview -- login-01 hero    only blocks whose name matches
//
// Open the printed .html files in a browser. scripts/screenshot.mjs uses the same pages.
import { readFile, writeFile, readdir, mkdir, copyFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const outDir = join(root, '.cache', 'preview');
export const JS_MARKER = '<!-- Requires Basecoat JavaScript';

export async function findBlocks(filters = []) {
  const blocks = [];
  for (const category of await readdir(join(root, 'blocks'), { withFileTypes: true })) {
    if (!category.isDirectory()) continue;
    for (const block of await readdir(join(root, 'blocks', category.name), { withFileTypes: true })) {
      if (!block.isDirectory()) continue;
      if (filters.length && !filters.some((f) => block.name.includes(f))) continue;
      blocks.push({ name: block.name, dir: join(root, 'blocks', category.name, block.name) });
    }
  }
  return blocks.sort((a, b) => a.dir.localeCompare(b.dir));
}

function shell({ title, fragment, js }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — Basecoat Blocks</title>
  <link rel="stylesheet" href="styles.css">
${js ? '  <script src="basecoat.all.min.js" defer></script>\n' : ''}</head>
<body>
${fragment}
</body>
</html>
`;
}

async function buildCss() {
  const input = join(outDir, 'input.css');
  // Same two imports a Basecoat + Tailwind project uses; @source makes Tailwind scan every block
  // (and the gallery page template, which uses the same stylesheet).
  const sources = [join(root, 'blocks'), join(root, 'scripts', 'gallery.mjs')].map((p) => `@source "${relative(outDir, p)}";`).join('\n');
  await writeFile(input, `@import "tailwindcss";\n@import "basecoat-css";\n${sources}\n`);
  await promisify(execFile)(join(root, 'node_modules', '.bin', 'tailwindcss'), ['-i', input, '-o', join(outDir, 'styles.css'), '--minify'], { cwd: root });
}

export async function buildPreviews(filters = []) {
  await mkdir(outDir, { recursive: true });
  await buildCss();
  await copyFile(join(root, 'node_modules', 'basecoat-css', 'dist', 'js', 'all.min.js'), join(outDir, 'basecoat.all.min.js'));
  const blocks = await findBlocks(filters);
  for (const block of blocks) {
    const fragment = (await readFile(join(block.dir, 'block.html'), 'utf8')).trim();
    const h1 = (await readFile(join(block.dir, 'README.md'), 'utf8')).match(/^# (.+)$/m)[1];
    block.preview = join(outDir, `${block.name}.html`);
    await writeFile(block.preview, shell({ title: h1.split(' — ')[0].trim(), fragment, js: fragment.startsWith(JS_MARKER) }));
  }
  return blocks;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const blocks = await buildPreviews(process.argv.slice(2));
  if (!blocks.length) { console.error('No blocks match', process.argv.slice(2).join(' ')); process.exit(1); }
  for (const b of blocks) console.log(relative(root, b.preview));
}
