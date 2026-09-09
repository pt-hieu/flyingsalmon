A shadcn registry that doubles as Brian's design system and public design portfolio.
Namespace: `@flyingsalmon`. Future home: `flyingsalmon.superbrian.dev`. First consumer: hottrip (an AI trip planner, not built yet — this registry dictates its stack).

## Coding conventions

Every coding rule, for the registry and the docs site alike, is in `CODING_STANDARDS.md`.

## Structure rules

- `src/registry/` is the single source of truth for everything distributable (components, theme). `registry.json` composes it.
- Docs pages import components from `@/registry/...` directly. Never copy a registry component into `src/components/` — that folder is for docs-site-only chrome (preview shells, navigation).
- One import alias: `@/` → `src/`. Do not introduce others.
- `components.json` aliases must stay consistent with actual import paths; `shadcn build` rewrites imports for consumers, not for this repo.

## Design system rules

- Mood: soft, minimal, playful.
- Type: Baloo 2 (`--font-heading`) for headings/display, Onest (`--font-sans`) for body and UI. Both OFL 1.1; keep license files with any bundled font.
- Color: indigo-lean blue accent (hue ~277 in OKLCH) over pure neutral grays (chroma 0). All colors in OKLCH. Light and dark mode both required for every component.
- Palette-only colors: every color is a step from the Tailwind OKLCH palette (neutral grays, indigo brand, red destructive) behind functional aliases. No color alpha anywhere in the repo, docs chrome included; element opacity for disabled states and motion is fine. See `docs/adr/0004-palette-only-colors.md`.
- Flat surfaces: no shadows, no elevation tokens. Surfaces separate by solid borders and background steps; interaction feedback lives in the border. See `docs/adr/0003-flat-surfaces.md`.
- Radius: 12px base via `--radius: 0.75rem`. Never hardcode radii; derive from the scale.
- Motion: small, springy, under 200ms (continuous indicators like spinner/skeleton exempt). Values, spring presets, and engine split are fixed in `docs/adr/0001-motion-language.md` — specs quote its names. Layout animation allowed via motion's `layout` prop. Do not worry about `prefers-reduced-motion`: no component implements it, no spec asks for it, and no review flags its absence.
- Accessibility: WCAG AA is a hard requirement — contrast, visible focus states, full keyboard paths.

## Feedback rule

The acting component shows its own busyness: buttons morph through a loading state; form fields show their own errors. Success and error results belong to the app. **Feedback appears where the user's attention already is and stays until they have seen it** (ADR 0008). Homes for a result, in order: the affected item (it appears, updates, or shows a failed state with retry); the acting surface (the form's result slot, below the actions row, via alert); a shell-owned persistent notice, only when there is no visible home. Anything that auto-dismisses, stacks, has no owner, or has no link back to its subject is banned — that is what "toast" meant, and the bottom-right corner fails on every count. The registry enforces this on its own components and documents the ranking as guidance; the docs principles page states it.

## Publishing

The repo and deploy stay private until Brian says otherwise. No registry versioning: ship-and-overwrite.

---

Issues live in this repo's GitHub Issues (`gh` CLI). See `docs/agents/issue-tracker.md`.
Single-context: one `CONTEXT.md` at the repo root plus `docs/adr/`. See `docs/agents/domain.md`.
