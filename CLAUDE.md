# flyingsalmon

A shadcn registry that doubles as Brian's design system and public design portfolio.
Namespace: `@flyingsalmon`. Future home: `flyingsalmon.superbrian.dev`. First consumer: hottrip (an AI trip planner, not built yet — this registry dictates its stack).

## Coding conventions

Comments are banned!

## Structure rules

- `src/registry/` is the single source of truth for everything distributable (components, theme). `registry.json` composes it.
- Docs pages import components from `@/registry/...` directly. Never copy a registry component into `src/components/` — that folder is for docs-site-only chrome (preview shells, navigation).
- One import alias: `@/` → `src/`. Do not introduce others.
- `components.json` aliases must stay consistent with actual import paths; `shadcn build` rewrites imports for consumers, not for this repo.

## Design system rules

- Mood: soft, minimal, playful.
- Type: Baloo 2 (`--font-heading`) for headings/display, Onest (`--font-sans`) for body and UI. Both OFL 1.1; keep license files with any bundled font.
- Color: indigo-lean blue accent (hue ~277 in OKLCH) over pure neutral grays (chroma 0). All colors in OKLCH. Light and dark mode both required for every component.
- Radius: 12px base via `--radius: 0.75rem`. Never hardcode radii; derive from the scale.
- Motion: small, springy, under 200ms (continuous indicators like spinner/skeleton exempt). Values, spring presets, and engine split are fixed in `docs/adr/0001-motion-language.md` — specs quote its names. Layout animation allowed via motion's `layout` prop. `prefers-reduced-motion` support deferred for now.
- Accessibility: WCAG AA is a hard requirement — contrast, visible focus states, full keyboard paths.

## Feedback rule (defining constraint)

The acting component shows its own busyness: buttons morph through a loading state; form fields show their own errors. Success and error results belong to the app, shown inline via the alert/info component. **No toast. Ever.** Floating, unowned feedback stays outside this system — the docs principles page states this boundary. Revised from "no alert component" in `docs/adr/0002-feedback-rule-scope.md`.

## Publishing

The repo and deploy stay private until Brian says otherwise. No registry versioning: ship-and-overwrite.

## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues (`gh` CLI). See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `CONTEXT.md` at the repo root plus `docs/adr/`. See `docs/agents/domain.md`.
