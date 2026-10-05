A shadcn registry that doubles as Brian's design system and public design portfolio.
Namespace: `@flyingsalmon`. First consumer: hottrip, an AI trip planner in the sibling repo `../hottrip`; this registry dictates its stack.

## Coding conventions

Every coding rule, for the registry and the docs site alike, is in `CODING_STANDARDS.md`.

## Where to look

- Adding, renaming, or removing a component, a component file, an enum member, or a theme token: `docs/agents/change-recipes.md` lists every file that moves with it.
- Editing a registry item's `css`, `cssVars`, or imports, or debugging a consumer's `shadcn add`, or fixing a `@shadcn/lint` error: `GOTCHAS.md`.

## Structure rules

- `src/registry/` is the single source of truth for every distributable file, including a script a component ships, which lives in that component's folder. `registry.json` composes it. The theme is the exception: its tokens live in `src/styles.css` and in the `theme` item of `registry.json`.
- Docs pages import components from `@/registry/...` directly. Never copy a registry component into `src/components/` — that folder is for docs-site-only chrome (preview shells, navigation).
- One import alias: `@/` → `src/`. Do not introduce others.
- `components.json` aliases must stay consistent with actual import paths; `shadcn build` rewrites imports for consumers, not for this repo.

## Design system rules

- Mood: bold, warm, social.
- Type: Bricolage Grotesque (`--font-heading`) for headings/display, Onest (`--font-sans`) for body and UI. Both OFL 1.1; keep license files with any bundled font.
- Color: an orange primary (`orange-600`, hue ~41 in OKLCH, a fill under white text; marks take `--indicator` orange-600, orange text takes `--primary-text` orange-700) over an `orange-50` beige page, with white cards, popovers, and field boxes, orange borders, and neutral-gray text (chroma 0). All colors in OKLCH. Light mode only: no dark theme, no `dark:` variants.
- Palette-only colors: every color is a step from the Tailwind OKLCH palette (neutral grays, orange brand, red destructive) behind functional aliases. No color alpha anywhere in the repo, docs chrome included; element opacity for disabled states and motion is fine. See `docs/adr/0004-palette-only-colors.md`.
- Flat surfaces: no shadows, no elevation tokens. Surfaces separate by solid borders and background steps; interaction feedback lives in the border. See `docs/adr/0003-flat-surfaces.md`.
- Spacing: every padding, gap, margin, and size is a step on Tailwind's 4px scale (`gap-2`, `--spacing(6)`), never a pixel value. Card, dialog, and timeline expose their spacing as `--card-spacing`, `--dialog-spacing`, and `--timeline-spacing` instead of a density prop. The docs spacing page lists each step's job.
- Radius: 12px base via `--radius: 0.75rem`. Never hardcode radii; derive from the scale.
- Motion: small, springy, under 200ms (continuous indicators like spinner/skeleton exempt, and the sticker's boil and scroll-linked pop-in are documented exceptions). Values, spring presets, and engine split are fixed in `docs/adr/0001-motion-language.md` — specs quote its names. Layout animation allowed via motion's `layout` prop. Do not worry about `prefers-reduced-motion`: no component implements it, no spec asks for it, and no review flags its absence.
- Accessibility: visible focus states and full keyboard paths are hard requirements. Contrast is a soft one — WCAG AA is the default, and a component ships below it only where Brian has agreed to that specific case. Record the measured ratio and his agreement in the ADR that owns the color.

## Feedback rule

The acting component shows its own busyness: buttons morph through a loading state; form fields show their own errors. Success and error results belong to the app. **Feedback appears where the user's attention already is and stays until they have seen it** (ADR 0008). Homes for a result, in order: the affected item (it appears, updates, or shows a failed state with retry); the acting surface (the form's result slot, below the actions row, via alert); a shell-owned persistent notice, only when there is no visible home. Anything that auto-dismisses, stacks, has no owner, or has no link back to its subject is banned — that is what "toast" meant, and the bottom-right corner fails on every count. The registry enforces this on its own components and documents the ranking as guidance; the docs principles page states it.

## Publishing

The site and registry are public at `https://flyingsalmon.superbrian.dev`. No registry versioning: ship-and-overwrite.

---

Issues live in this repo's GitHub Issues (`gh` CLI). See `docs/agents/issue-tracker.md`.
Single-context: one `GLOSSARY.md` at the repo root plus `docs/adr/`. See `docs/agents/domain.md`.
