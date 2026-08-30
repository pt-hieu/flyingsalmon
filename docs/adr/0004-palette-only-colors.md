# Palette-only colors: two token layers, no color alpha

Status: accepted

Opacity modifiers (`ring-ring/50`, `oklch(1 0 0 / 10%)`) manufacture colors that belong to no agreed palette. The card spec grilling (issue #9) turned this into a system rule.

## Decision

- **Two token layers.** A palette layer holds the agreed color steps. A functional layer (`--border`, `--input`, `--ring`, `--success`, ...) aliases palette steps. Functional names are encouraged; off-palette values are not.
- **The palette is Tailwind's OKLCH palette plus the brand ramp.** Grays come from `neutral` (chroma 0), the brand ramp is `indigo` (the current primary is indigo-600 exactly), destructive is `red`. The ramps for `--success`/`--warning` (badge spec #8) are fixed in the palette issue.
- **Every color operation picks a palette step.** Hover and press shades step the ramp (border-200 to border-300), never alpha, never `color-mix`.
- **Color alpha is banned repo-wide**, docs chrome included: no Tailwind `/N` color modifiers, no alpha channels in token values.
- **Element opacity stays allowed.** `disabled:opacity-50`, motion fades, and the pulse animations in ADR 0001 fade whole elements; they do not define colors.

## Consequences

- The three dark alpha tokens — `--border` `oklch(1 0 0 / 10%)`, `--input` 15%, `--sidebar-border` 10% — become solid neutral steps (palette issue).
- The focus ring in specs #3–#7 (`ring-ring/50`) becomes a solid palette step meeting 3:1; correction comments posted on each issue. The button press ring (#3, "at higher opacity") becomes a solid step.
- `src/styles.css` (`outline-ring/50`) and the docs chrome (site header translucency, theme toggle ring) drop their alpha.

## Flip condition

A returning modal dialog needs a translucent scrim by nature. Amend this ADR then with that single sanctioned exception. See also the flip condition in ADR 0003.
