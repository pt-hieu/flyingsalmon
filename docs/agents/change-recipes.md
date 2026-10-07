# Change recipes

The files that move together when the registry changes. `bun run check` catches the step marked _checked_; only a search or a reviewer finds the rest.

## Add a component

1. `src/registry/ui/<name>/`, laid out as `CODING_STANDARDS.md` describes.
2. A `registry:ui` item in `registry.json` listing every file in the folder outside `__test__`. `guidelines.md` is a `registry:file` with the target `@ui/<name>/guidelines.md`, so `shadcn add` copies it unchanged into the consumer's folder for the component; a `registry:ui` file goes through the CLI's code transforms.
3. An entry in `src/components/component-catalog.ts`, and its overview tile in `src/components/component-preview.tsx`. _Checked_ by the type check: `previewByRoute` is typed over every catalog route.
4. A docs page at `src/routes/_docs/components/<name>.tsx`.
5. The component's root export in a group of `GROUPS` in `.design-sync/prepare.mjs`, and a preview at `.design-sync/previews/<Name>.tsx`.
6. A `GLOSSARY.md` term when the component names a concept the glossary lacks.

## Rename or remove a component, a component file, or an enum member

Search the whole repo, dot folders included: `.design-sync/previews/*.tsx` imports components and enum members by name, the root type check skips dot folders, and `.design-sync/prepare.mjs` type-checks the previews only when it runs. Removing an item also removes its stale build output under `public/r/`. Renaming or removing a component also updates the links to its page in other components' `guidelines.md` and, on a title change, its own `# <Title> guidelines` and lead lines. _Checked_ by `src/components/doc-page/__test__/parse-guidelines.test.tsx`, which parses every `guidelines.md` against its catalog title and fails on a link to a page the site does not have.

## Add or change a theme token

1. `src/styles.css`: a color or alias in `:root`, a size, font, motion, or animation in `@theme inline`.
2. The same token and value in the `theme` item of `registry.json`, under `cssVars.light` or `cssVars.theme` to match.
3. A spacing-shaped token (`--card-spacing`, `--bar-height`) also gets a row in `spacingTokens` in `src/routes/_docs/spacing.tsx`.
4. A palette or color change also sweeps the ADR that owns the color, the docs pages that name it, and `.design-sync/previews`.

## Edit `registry.json`

Edit it as text. A JSON round-trip (`json.dump`, `JSON.stringify`) escapes non-ASCII characters and reflows every short array, so the diff touches hundreds of unrelated lines.

## Docs site layout

- `src/routes/__root.tsx` renders the HTML document; `src/routes/_docs/route.tsx` is the docs layout with the site header.
- `src/routes/frames/` holds routes outside the docs layout, embedded in a docs page as an iframe to demo a component at a viewport width the page cannot have (`page-header-strip`).
- Every route prerenders by crawling links (`vite.config.ts`); a link with a search param is skipped.
