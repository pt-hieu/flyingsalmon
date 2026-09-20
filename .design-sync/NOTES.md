# design-sync notes

Durable notes for syncing this repo to claude.ai/design. Read this and
`config.json` before a re-sync.

## Why `prepare.mjs` exists

This repo has no library build. `dist/` is the Vite docs site, and the registry
ships components as source, so the converter had nothing to read for the `.d.ts`
API contract the design agent codes against. `.design-sync/prepare.mjs`
materializes a real library package under `.design-sync/.cache/pkg/` on every
build (`buildCmd`), producing:

- `entry.ts` re-exporting all 37 registry dirs, so all 166 exports reach the bundle.
- Real declarations from the repo's own `tsc --emitDeclarationOnly`, with `@/`
  path aliases rewritten to relative so ts-morph can resolve cross-file types.
- `types/index.d.ts`, a curated barrel naming **only the 37 component roots**
  plus their `<Root>Props`. The converter derives its component list from this
  barrel; without it every compound part (`CardHeader`, `TableCell`, …) became
  its own card — 114 components, 77 of them "preview not yet authored". Parts'
  props are relocated into each root's generated doc under `## Parts`.
- A source mirror at `.cache/srcmirror/<Root>/index.tsx`. The converter derives
  a component's picker group by dropping the path segment matching the
  component name lowercased; `avatar-group !== avatargroup`, so every
  hyphenated component was landing in a singleton group of its own. The mirror
  is a content **copy**, not a symlink, so the converter's source hash still
  tracks real edits.
- A Tailwind-compiled `styles.css` (~125 KB). See the safelist section below.
- The design ADRs copied to the package root as `guidelines/`.

## The safelist matters more than it looks

A rendered design receives `styles.css` with no build step, so any utility the
design agent writes that Tailwind never emitted silently does nothing.
`prepare.mjs` compiles a broad `@source inline(...)` safelist (~45 patterns:
flex/grid/gap/padding/margin/sizing/type/radius/border/position/z/overflow/
opacity/cursor/list/aspect, the functional color aliases, and `sm|md|lg|xl` +
`dark:` + `hover:` variants) plus `@source` over `src/registry`, `src/routes`
and `.design-sync/previews`. Arbitrary values used in previews (`h-[34rem]`)
compile because of that last `@source` — they will **not** be available to a
design unless they are also in the safelist or in scanned source.

## Card-mode overrides are required, not cosmetic

Nine components tripped `[GRID_OVERFLOW]`. Two distinct causes:

- **`fixed`/portal content** escapes its grid cell, and `.ds-cell` sets
  `overflow:hidden`, so it renders as an empty card. Fixed with
  `cardMode: "single"` + a `primaryStory`: NoticeProvider, Tooltip, Combobox,
  Select, Drawer, DropdownMenu (and Dialog, which also needs `viewport:
  "900x620"`).
- **Content wider than a grid cell**, which the product card crops. Fixed with
  `cardMode: "column"`: Calendar, Pagination, Sidebar.

`cardMode: "single"` shows only the primary story on the card. That costs the
human browsing the picker, not the design agent — the `.jsx` and `.prompt.md`
still carry every cell.

Do **not** assume an overlay needs an override. Drawer, DropdownMenu, Select
and Combobox were each verified to render their open panel fully inside a
default grid cell before the validator flagged them for the separate `fixed`
reason; Dialog's override does not generalize.

## Capture tooling: the fixed clock must stay off

`package-capture.mjs` sets `page.clock.setFixedTime()` once per browser. That
clock persists across same-page navigations and freezes motion's frame loop, so
**every story after the first** paints its enter animation's initial frame.
NoticeProvider captured as three blank PNGs because of it (`opacity: 0` at
screenshot time, DOM otherwise correct). `clock.install()` + `runFor()` does not
fix it; removing the fixed clock does.

`.ds-sync/` is gitignored and re-staged by the skill, so this patch does not
survive: **after staging, re-apply the guard** at `package-capture.mjs:102` so
the fixed clock only runs under `DS_FIXED_CLOCK=1`. Every date-bearing preview
here pins its own dates, so the clock buys this repo nothing.

## Preview authoring conventions

- Previews are static. Convert `useState` demos to `defaultValue` /
  `defaultOpen` / fixed-prop compositions. Controlled-only props (Combobox's
  `value`/`onValueChange`) take a literal plus a no-op callback.
- Pass `animateOpen={false}` on every `Alert`. It defaults to `true` and motion
  mounts it from `height: 0, opacity: 0`, so a static capture catches the tween
  and the alert renders invisible with correct JSX.
- Pin dates. Calendar/DatePicker previews use a fixed November 2026 so cards do
  not churn daily. Their props take plain ISO `YYYY-MM-DD` strings, **not**
  `@internationalized/date` objects — that package is only used inside the docs
  routes' own interactive demos.
- Wrap multi-element cells in a container with explicit layout; bare siblings
  collapse together.
- Use the exported enums (`ButtonVariant.Outline`), never the raw strings.

## Providers

`cfg.provider` mounts `TooltipProvider` around every preview, mirroring
`src/routes/__root.tsx`. `AvatarGroup` renders `Tooltip` internally and throws
without it. Keep provider plumbing out of preview files so the `.jsx` the design
agent imitates stays clean — `conventions.md` teaches the root-level wrap
instead.

## Known render warns

None. The final validate run is clean: 37/37 previews render, zero warnings.
Earlier `[RENDER_BLANK]` warns on Progress, Skeleton and Checkbox were real and
are gone now that those three have authored previews. A warn line on a re-sync
is therefore new and should be triaged, not carried.

## Known gaps

- **Sidebar `Strip` layout is not captured.** It keys off `matchMedia` against
  real `window.innerWidth` at 700px, not container width, and every export for
  a component renders in one browser context at a shared viewport. Capturing it
  needs its own card at a sub-700px viewport, which would squeeze Expanded and
  Collapsed. One state, deliberately skipped.
- **Continuous animations capture one frame.** Progress's indeterminate segment
  sits partway across its track and Switch's loading thumb is caught mid-pulse.
  Expected for a static shot of a looping animation, not a defect.
- **Avatar `src` images are not shown.** The docs' sample SVGs live under the
  docs site's `public/`, which the capture server does not serve. Cells use
  initials and fallbacks.
- **Two cards drift from the trip domain.** Accordion's FAQ cell and Checkbox's
  select-all cell carry the repo's own e-commerce/fruit example content. Faithful
  to the docs pages they were ported from; rewrite them if the portfolio wants
  one domain throughout.

## Re-sync risks

1. **Re-apply the `package-capture.mjs` clock guard** (see above) or
   NoticeProvider and any other post-mount motion enter animation will capture
   blank and read as a regression.
2. **`prepare.mjs` must run before every build.** It is wired as `buildCmd`, so
   a plain `package-build.mjs` invocation with the config is enough — but never
   point the converter at `src/` directly.
3. **A new registry component needs three edits in `prepare.mjs`**: add it to
   `GROUPS` (which fixes its picker section), and add a `ROOT_EXPORT_OVERRIDES`
   / `SOURCE_FILE_OVERRIDES` entry if its directory name and root export name
   differ the way `notice` / `NoticeProvider` do.
4. **A new design ADR is not shipped automatically.** `DESIGN_ADRS` in
   `prepare.mjs` lists the five design-domain ADRs by filename; implementation
   ADRs are deliberately excluded.
5. **`conventions.md` names tokens, enums and class suffixes literally.** It is
   stitched into `README.md` as `readmeHeader` and read by the design agent.
   Re-check its claims against `src/styles.css` and the emitted `types.d.ts`
   whenever the theme or an enum changes.
