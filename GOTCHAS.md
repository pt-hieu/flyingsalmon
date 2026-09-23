# Gotchas

How the shadcn CLI transforms a registry item when a consumer runs `shadcn add`.

- The CLI rewrites every `@/` import to the consumer's aliases and resolves a folder import to the `.tsx` file sharing the folder's name, not `index.ts`; relative imports pass through unchanged.
- The CLI writes `cssVars.theme` into `@theme inline`, `cssVars.light` into `:root`, and `cssVars.dark` into `.dark`.
- For every `cssVars` key the CLI adds `--color-<key>: var(--<key>)` to `@theme inline` when the value looks like a color and `--<key>: var(--<key>)` otherwise, so a `color-` key gains a `--color-color-` alias and a non-color value aliases itself.
- The `css` field places `@import` entries among existing imports, merges top-level selectors into existing rules, accepts `@apply` in `@layer base`, and cannot write declarations inside `@theme`.
- On Tailwind v4 the CLI adds `@custom-variant dark (&:is(.dark *))` after the last `@import` of any stylesheet that has no `@custom-variant` yet, before it applies the item; no item field prevents it.
- The CLI fails with a `proxyOf` error on an empty stylesheet; one that starts with `@import 'tailwindcss';` avoids it.
- Installing a UI item fetches `https://ui.shadcn.com/r/colors/<baseColor>.json` and needs network access; an item with no files installs offline.
