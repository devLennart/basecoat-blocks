# Contributing to Basecoat Blocks

Thanks for helping make copy-and-paste HTML useful to more people. This is an independent community project, not affiliated with Basecoat.

## Propose a block

Open a GitHub issue describing the UI problem, its category, and the responsive and keyboard behaviors it needs. Use a sequential name such as `login-04` or `sidebar-04`, not a descriptive nickname. Prefer an original, useful pattern over a near-duplicate of an existing block. Brand every block as the fictional **Acme Inc.** (product name "Acme", the shared triangle logo SVG, `@example.com` addresses), so the catalog reads as one product.

## Submit a block

Create `blocks/<category>/<name>/` with:

- `block.html` — the copyable, self-contained UI fragment. No document shell, asset imports, application framework, or preview-only dependencies. If the fragment needs Basecoat JavaScript, make its first line `<!-- Requires Basecoat JavaScript (all.min.js). -->`; previews then load it and the catalog shows a **needs Basecoat JS** badge.
- `preview.png` and `preview-dark.png` — generated with `npm run screenshots -- <name>` (see [Build and screenshots](#build-and-screenshots)). Do not capture them by hand. Avoid stock imagery that needs attribution or network access.
- `README.md` — title, purpose, screenshot, used components, usage and integration notes, and brief design rationale. Its H1 (`# Title — name`) becomes the catalog title.

Add a row to the category README table (its order is the catalog order), then run `npm run build` and `npm run screenshots -- <name>`. Never edit the catalog in the root README by hand. There is no website, registry, or CLI, and no package install is needed to use a block; `package.json` holds only the preview, build and screenshot tooling.

Use documented Basecoat classes and `data-variant` / `data-size` attributes for components, and Tailwind CSS 4 utilities for layout, spacing and type, like the examples in the Basecoat docs. Do not add `<style>` blocks or custom class names. Prefer Basecoat's semantic color utilities (`bg-muted`, `text-muted-foreground`, `border`, `bg-primary` …) over raw colors so blocks follow the theme and dark mode; Basecoat's dark variant is `html.dark`, so avoid `dark:` overrides unless a token cannot express the change. Avoid restyling Basecoat components, nonessential JavaScript, remote images, framework adapters, and external icon libraries. Use semantic landmarks, associated labels, native controls, visible focus, sensible heading order, and a usable narrow layout. Do not imply a static demo has a working backend: document where to provide routes, form actions, and data. Mark the current page with `aria-current="page"` in navigation examples.

Before submitting, open each preview (`npm run preview -- <name>`, or `npm run gallery`) at desktop and mobile widths, check keyboard navigation, inspect browser console and network failures, and run `npm run screenshots -- <name>` until it reports the block clean. Ensure the fragment works when pasted into a page that already loads the same Basecoat version. Keep every prose string in English.

## Build and screenshots

`block.html` is the only file you edit. Previews are not committed: `npm run preview` compiles Tailwind CSS 4 together with `basecoat-css` from `node_modules` (the same two `@import`s a real project uses) and writes one standalone page per block to `.cache/preview/`. `npm run build` rebuilds the generated parts of the root README: the overview line, the screenshot catalog with components and JS badges, and the component index. Screenshots are captured by a script, not by hand. It needs Node 20+; no network connection is required after `npm install`:

```sh
npm install
npm run screenshots:install       # one-time Chromium download
npm run preview -- login-02       # standalone pages in .cache/preview/
npm run gallery                   # click through every block at http://localhost:4321
npm run build                     # README catalog
npm run screenshots               # every block → preview.png + preview-dark.png
npm run screenshots -- login-02   # only blocks whose name matches
npm run screenshots -- --check    # run the checks without writing PNGs
```

`npm run gallery` builds the same preview pages plus a gallery page and serves them locally: pick a block in the sidebar (catalog order, searchable by name or component), switch between desktop, tablet (768 px) and mobile (390 px) width and light or dark, show or copy the block code, or open the standalone preview. Keys: `j` / `k` next / previous, `c` code / preview, `/` search. Rerun it after editing a block; `-- --port 5000` picks another port, `-- --no-serve` only writes `.cache/preview/index.html`.

Each preview is captured at 1440 × 900 (1.25× device scale) in light and dark (`class="dark"` on `<html>`). The run also fails a block on console errors, failed requests, or page-level horizontal overflow at 390 px. The npm install is dev tooling only; using a block still needs no install.

## License

Contributions are accepted under the [MIT License](LICENSE).
