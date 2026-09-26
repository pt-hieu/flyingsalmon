# The theme item owns all registry CSS

Status: accepted

The shadcn CLI 4.19.0 rewrites a consumer's Tailwind CSS file whenever an installed item, or any item it pulls in through `registryDependencies`, carries a `css` or `cssVars` key. The rewrite runs even when every rule it merges is already in the file. It re-serialises the whole file through PostCSS, which re-indents nested blocks and trims the trailing newline, and for Tailwind v4 it inserts `@custom-variant dark (&:is(.dark *));` whenever the file has no `@custom-variant`. That last step is hard-coded in the CLI; no registry content triggers or prevents it. Spinner carried CSS, button depends on spinner, and most components depend on button, so nearly every install rewrote hottrip's `styles.css` and brought back a dark variant this light-only system does not have.

## Decision

- **Only the `theme` item carries `css` and `cssVars`.** Every component keyframe, every `--animate-*` utility, and every component spacing variable (`--card-spacing`, `--dialog-spacing`, `--timeline-spacing`, `--table-header-border`) lives in the theme item in `registry.json`. Components ship files and dependencies, never CSS.
- **There is no `floating` item.** It carried nothing but CSS, so its keyframes and `--animate-floating-*` utilities live in the theme, and the floating components list no CSS dependency.
- **No component lists `@flyingsalmon/theme` in `registryDependencies`.** A dependency on the theme would pull its CSS into that component's install and restore the rewrite. The theme is the first install in a consumer, before any component, because every component reads its color, radius, and motion tokens.

## Rationale

- A component install or update now leaves the consumer's CSS file untouched. The file changes only when the consumer installs or updates the theme, which is a deliberate step and the one install expected to touch global CSS.
- The cost is that a component's keyframes arrive with the theme rather than with the component. That costs a consumer nothing: a component installed without the theme already renders without its colors and radius.

## Consequences

- **ADR 0001's rule that each continuous animation's `animate-*` utility is carried by the component's registry item is replaced by this ADR.** The utilities are still custom and still never Tailwind's built-in `animate-spin` or `animate-pulse`.
- **ADR 0005's CSS-only `floating` item is replaced by this ADR.** The keyframe pairs and their durations and easings are unchanged.
- A theme install still inserts the dark custom variant into a Tailwind v4 consumer that has none. The consumer deletes it once per theme install.
- A new component that needs a keyframe or a CSS variable adds it to the theme item, not to its own item.
