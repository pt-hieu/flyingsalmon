# Gotchas

## `shadcn add`

How the shadcn CLI transforms a registry item when a consumer runs `shadcn add`.

- The CLI rewrites every `@/` import to the consumer's aliases and resolves a folder import to the `.tsx` file sharing the folder's name, not `index.ts`; relative imports pass through unchanged.
- The CLI writes `cssVars.theme` into `@theme inline`, `cssVars.light` into `:root`, and `cssVars.dark` into `.dark`.
- For every `cssVars` key the CLI adds `--color-<key>: var(--<key>)` to `@theme inline` when the value looks like a color and `--<key>: var(--<key>)` otherwise, so a `color-` key gains a `--color-color-` alias and a non-color value aliases itself.
- The `css` field places `@import` entries among existing imports, merges top-level selectors into existing rules, accepts `@apply` in `@layer base`, and cannot write declarations inside `@theme`.
- On Tailwind v4 the CLI adds `@custom-variant dark (&:is(.dark *))` after the last `@import` of any stylesheet that has no `@custom-variant` yet, before it applies the item; no item field prevents it.
- The CLI fails with a `proxyOf` error on an empty stylesheet; one that starts with `@import 'tailwindcss';` avoids it.
- The CLI parses every file except a `registry:file` or `registry:item` as TSX to rewrite imports and class names, and compiles it to JavaScript for a project with `tsx: false`. A file that is not code, such as a component's `guidelines.md`, ships as `registry:file` with a target such as `@ui/button/guidelines.md`, which the CLI writes byte for byte under the consumer's `ui` alias.
- Installing a UI item fetches `https://ui.shadcn.com/r/colors/<baseColor>.json` and needs network access; an item with no files installs offline.

## `@shadcn/lint`

`bun run lint` runs `@shadcn/lint` against the theme.

- A dynamic value reaches a class through a CSS custom property set in `style`: `style={{ '--slider-fill-width': width }}` with `w-(--slider-fill-width)`.
- A new allow entry in `.oxlintrc.json` needs a spec or ADR behind the value, the same bar ADR 0006 sets for a shared class string.
- `no-unknown-classes` skips cva variant entries keyed by an enum member (shadcn-ui/lint#70), so a misspelled class there still passes.
