#!/usr/bin/env node
// Regenerates the generated parts of README.md (overview, screenshot catalog,
// component index) from the block and category READMEs.
//
//   npm run build
//
// - Title: the block README's H1 (text before " — ").
// - "needs Basecoat JS" badge: when block.html starts with JS_MARKER.
// - Catalog order: the order of the table rows in each category README.
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const BASECOAT_VERSION = '1.2.1';
const JS_MARKER = '<!-- Requires Basecoat JavaScript';
const CATEGORIES = ['authentication', 'sidebar', 'dashboard', 'application', 'marketing'];

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (...p) => readFile(join(root, ...p), 'utf8');

// "**Basecoat components:** A, B." or "## Basecoat components\n\nA, B."
function parseComponents(notes) {
  const m = notes.match(/\*\*Basecoat components:\*\*\s*(.+)/) ?? notes.match(/^## Basecoat components\s*\n+(.+)/m);
  if (!m) return [];
  return m[1].split(/\.(\s|$)/)[0].split(',').map((c) => c.replace(/\(.*?\)/g, '').trim()).filter(Boolean);
}

const anchor = (heading) => heading.toLowerCase().replace(/[^a-z0-9 -]/g, '').trim().replace(/ /g, '-');

async function loadCategory(category) {
  const readme = await read('blocks', category, 'README.md');
  const heading = readme.match(/^# (.+)$/m)[1];
  const names = [...readme.matchAll(/^\| \[([a-z0-9-]+)\]\(\1\/README\.md\)/gm)].map((m) => m[1]);
  const blocks = [];
  for (const name of names) {
    const dir = join('blocks', category, name);
    for (const file of ['block.html', 'README.md']) {
      if (!existsSync(join(root, dir, file))) throw new Error(`${dir}/${file} is missing`);
    }
    const notes = await read(dir, 'README.md');
    const h1 = notes.match(/^# (.+)$/m)[1];
    const fragment = (await read(dir, 'block.html')).trim();
    blocks.push({ name, dir, title: h1.split(' — ')[0].trim(), components: parseComponents(notes), js: fragment.startsWith(JS_MARKER), fragment });
  }
  return { category, heading, blocks };
}

const picture = (b) =>
  `<a href="${b.dir}/block.html"><picture><source media="(prefers-color-scheme: dark)" srcset="${b.dir}/preview-dark.png"><img src="${b.dir}/preview.png" alt="${b.title} preview"></picture></a>`;

function catalogSection({ category, heading, blocks }) {
  const rows = [];
  for (let i = 0; i < blocks.length; i += 2) {
    const pair = blocks.slice(i, i + 2);
    rows.push(
      `| ${pair.map((b) => `${b.title} · \`${b.name}\``).join(' | ')} |`,
      `| ${pair.map(() => '---').join(' | ')} |`,
      `| ${pair.map(picture).join(' | ')} |`,
      `| ${pair.map((b) => `<sub>${b.components.join(' · ')}${b.js ? ' · <b>needs Basecoat JS</b>' : ''}</sub><br>[Code](${b.dir}/block.html) · [Notes](${b.dir}/README.md)`).join(' | ')} |`,
      '',
    );
  }
  return `### ${heading}\n\n${blocks.length} ${blocks.length === 1 ? 'block' : 'blocks'} · [category notes](blocks/${category}/README.md) · [back to top](#basecoat-blocks)\n\n${rows.join('\n')}`;
}

function overview(categories, total) {
  const nav = categories.map(({ heading, blocks }) => `[${heading} (${blocks.length})](#${anchor(heading)})`).join(' · ');
  return `**${total} blocks** · Basecoat ${BASECOAT_VERSION} · plain HTML · light + dark\n\n**Jump to:** ${nav} · [Find by component](#find-by-component)`;
}

function componentIndex(categories) {
  const byComponent = new Map();
  for (const { blocks } of categories) {
    for (const b of blocks) {
      for (const c of b.components) {
        if (!byComponent.has(c)) byComponent.set(c, []);
        byComponent.get(c).push(`[\`${b.name}\`](${b.dir}/block.html)`);
      }
    }
  }
  const rows = [...byComponent].sort(([a], [b]) => a.localeCompare(b)).map(([c, list]) => `| ${c} | ${list.join(' ')} |`);
  return `Looking for a working example of one Basecoat component? Every block that uses it:\n\n| Component | Blocks |\n| --- | --- |\n${rows.join('\n')}\n`;
}

function replaceRegion(text, name, content) {
  const start = `<!-- ${name}:start -->`;
  const end = `<!-- ${name}:end -->`;
  if (!text.includes(start) || !text.includes(end)) throw new Error(`README.md needs ${name} markers`);
  return text.replace(new RegExp(`${start}[\\s\\S]*${end}`), `${start}\n${content}\n${end}`);
}

const categories = await Promise.all(CATEGORIES.map(loadCategory));
const count = categories.reduce((n, c) => n + c.blocks.length, 0);

const readmePath = join(root, 'README.md');
let readme = await readFile(readmePath, 'utf8');
readme = replaceRegion(readme, 'overview', overview(categories, count));
readme = replaceRegion(readme, 'catalog', categories.map(catalogSection).join('\n'));
readme = replaceRegion(readme, 'components', componentIndex(categories));
await writeFile(readmePath, readme);
console.log(`Rebuilt the README catalog: ${count} blocks (Basecoat ${BASECOAT_VERSION}).`);
