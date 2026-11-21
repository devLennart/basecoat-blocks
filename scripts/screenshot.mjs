#!/usr/bin/env node
// Captures preview.png (light) and preview-dark.png (dark) for every block,
// and checks each preview for console errors, failed requests, and
// page-level horizontal overflow at a 390px mobile width. Pages come from
// scripts/preview.mjs (Tailwind + Basecoat compiled locally, no network needed).
//
//   npm run screenshots                 all blocks
//   npm run screenshots -- login-01 hero-01   only blocks whose name matches
//   npm run screenshots -- --no-dark    skip the dark variant
//   npm run screenshots -- --check      run the checks without writing PNGs
import { chromium } from 'playwright';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildPreviews, root } from './preview.mjs';

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const filters = args.filter((a) => !a.startsWith('--'));
const withDark = !flags.has('--no-dark');
const checkOnly = flags.has('--check');

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const SCALE = 1.25; // 1800 x 1125 PNGs, as committed so far

async function openPreview(browser, block, { viewport, dark }) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: SCALE,
    colorScheme: dark ? 'dark' : 'light',
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const problems = [];
  page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`));
  page.on('pageerror', (e) => problems.push(`page error: ${e.message}`));
  page.on('requestfailed', (r) => problems.push(`request failed: ${r.url()} (${r.failure()?.errorText})`));
  page.on('response', (r) => r.status() >= 400 && problems.push(`HTTP ${r.status()}: ${r.url()}`));
  await page.goto(pathToFileURL(block.preview).href, { waitUntil: 'networkidle' });
  if (dark) await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.evaluate(() => document.fonts.ready);
  return { context, page, problems };
}

const browser = await chromium.launch();
const blocks = await buildPreviews(filters);
if (!blocks.length) { console.error('No blocks match', filters.join(' ')); process.exit(1); }

let failures = 0;
async function run(block) {
  const rel = relative(root, block.dir);
  const issues = [];
  const variants = [{ dark: false, file: 'preview.png' }, ...(withDark ? [{ dark: true, file: 'preview-dark.png' }] : [])];

  for (const { dark, file } of variants) {
    const { context, page, problems } = await openPreview(browser, block, { viewport: DESKTOP, dark });
    if (!checkOnly) await page.screenshot({ path: join(block.dir, file) });
    issues.push(...problems);
    await context.close();
  }

  const mobile = await openPreview(browser, block, { viewport: MOBILE, dark: false });
  const overflow = await mobile.page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 0) issues.push(`horizontal overflow at ${MOBILE.width}px: ${overflow}px`);
  await mobile.context.close();

  const unique = [...new Set(issues)];
  failures += unique.length ? 1 : 0;
  console.log(`${unique.length ? '✗' : '✓'} ${rel}${checkOnly ? '' : `  → ${variants.map((v) => v.file).join(', ')}`}`);
  for (const issue of unique) console.log(`    ${issue}`);
}

const queue = [...blocks];
const CONCURRENCY = 4;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) await run(queue.shift());
}));

await browser.close();
console.log(`\n${blocks.length - failures}/${blocks.length} blocks clean`);
process.exit(failures ? 1 : 0);
