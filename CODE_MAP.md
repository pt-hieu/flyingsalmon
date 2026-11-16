# Code map

Where things live in this repo. Read it before searching for a file.

## Areas

- `src/registry/` is the single source of truth for every distributable file; `registry.json` composes it.
- `src/registry/ui/` holds one folder per registry component (42 components), such as `src/registry/ui/button/`.
- `src/registry/lib/` holds the modules shared between registry components: `actions-row.ts`, `field.tsx`, `interaction.ts`, `iso-date.ts`, `menu.ts`, `motion.ts`, `panel.ts`, and `use-controllable-state.ts`.
- `src/components/` holds docs-site-only chrome, never a copy of a registry component.
- `src/components/doc-page/` holds the docs page building blocks: `DocPage`, `FoundationPage`, the props and keyboard tables, `CodeBlock`, `Example`, and the `guidelines.md` parser.
- `src/components/docs-shell/` holds the docs layout shell, the error page, and the not-found page.
- `src/components/component-sidebar/` holds the docs sidebar of component links.
- `src/examples/` holds one folder per component of live demo snippets (`demo.tsx`, `usage.tsx`, and one file per idea) that docs pages show and render.
- `src/routes/` holds the TanStack Router file routes.
- `src/routes/_docs/` holds the docs pages inside the docs layout.
- `src/routes/_docs/components/` holds one docs page per registry component.
- `src/routes/frames/` holds routes outside the docs layout, embedded in a docs page as an iframe at a viewport width the page cannot have.
- `src/lib/utils.ts` holds the `cn()` helper.
- `src/test/` holds the test setup (`setup.ts`) and `render-with-router.tsx`.
- `src/styles.css` holds the theme tokens.
- `docs/adr/` holds the architecture decision records.
- `docs/agents/` holds the agent guides: `change-recipes.md`, `docs-page-template.md`, `domain.md`, and `issue-tracker.md`.
- `scripts/` holds the sticker drawing scripts.
- `public/` holds static assets served by the site.
- `.claude/` holds the Claude Code settings, the format-on-edit hook, and the `interface-review` skill.

## Entry points

- `src/router.tsx` creates the router from the generated route tree.
- `src/routes/__root.tsx` renders the HTML document.
- `src/routes/_docs/route.tsx` is the docs layout with the site header.
- `registry.json` lists every registry item and its files.
- `components.json` holds the shadcn aliases.
- `vite.config.ts` configures Vite, Tailwind, and the TanStack Start prerender that crawls links.
- `vitest.config.ts` configures the test runner (jsdom, `src/test/setup.ts`).
- `tsr.config.json` configures `tsr generate`, which writes the route tree.
- `tsconfig.json` configures the TypeScript compiler.
- `pnpm-workspace.yaml` holds the pnpm settings: the release-age delay and the build scripts allowed to run.
- `.oxlintrc.json` configures oxlint.
- `.oxfmtrc.json` configures the formatter.
- `wrangler.jsonc` configures the Cloudflare deploy.
- `package.json` holds the scripts: `dev`, `build`, `registry:build`, `stickers:draw`, `deploy`, `lint`, `format`, `test`, and `check`.

## Where to go for a task

- Add, rename, or remove a component, a component file, an enum member, or a theme token: `docs/agents/change-recipes.md` lists every file that moves with it.
- Add or edit a docs page: `docs/agents/docs-page-template.md` gives the page format.
- Add a component: the folder goes in `src/registry/ui/<name>/`, its item in `registry.json`, its entry in `src/components/component-catalog.ts`, its overview tile in `src/components/component-preview.tsx`, and its page in `src/routes/_docs/components/<name>.tsx`.
- Add a foundation page: the page goes in `src/routes/_docs/<name>.tsx` and its entry in `src/components/foundation-pages.ts`.
- Change a theme token: edit `src/styles.css` and the `theme` item of `registry.json` together.
- Debug a consumer's `shadcn add`, or edit a registry item's `css`, `cssVars`, or imports: `GOTCHAS.md`.
- Look up a domain term: `GLOSSARY.md`.
- Look up a design decision: `docs/adr/`.
- Change a sticker's art: edit its script in `scripts/` and run `pnpm stickers:draw`.

## Paths you can predict

- A registry component lives in `src/registry/ui/<kebab-name>/`; `CODING_STANDARDS.md` gives the files in the folder.
- A component's tests live in `src/registry/ui/<kebab-name>/__test__/`.
- A component's usage rules live in `src/registry/ui/<kebab-name>/guidelines.md`.
- A component's docs page lives at `src/routes/_docs/components/<kebab-name>.tsx`.
- A component's demos live in `src/examples/<kebab-name>/`.
- A docs-site chrome folder in `src/components/` follows the same folder layout as a registry component.
- A sticker's drawing script is `scripts/draw-<name>-sticker.ts`.
- An ADR is `docs/adr/<number>-<title>.md`.

## Places to skip

- `pnpm-lock.yaml` is written by pnpm from `package.json`; `.ignore` lists it.
- `src/components/house-sticker-art.ts` is written by `pnpm stickers:draw`; `.ignore` lists it.
- `src/components/route-sticker-art.ts` is written by `pnpm stickers:draw`; `.ignore` lists it.
- `src/components/snapped-pencil-sticker-art.ts` is written by `pnpm stickers:draw`; `.ignore` lists it.
- `src/routeTree.gen.ts` is written by `tsr generate` and is git-ignored.
- `public/r/` is written by `shadcn build` and is git-ignored.
- `dist/` is the build output and is git-ignored.
- `.design-sync/`, `.ds-sync/`, and `ds-bundle/` are design-sync tooling and output, and are git-ignored.
- `node_modules/`, `.wrangler/`, and `.tanstack/` are tool caches and are git-ignored.
