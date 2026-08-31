# Palette-only colors: two token layers, no color alpha

Status: accepted

Opacity modifiers (`ring-ring/50`, `oklch(1 0 0 / 10%)`) manufacture colors that belong to no agreed palette. The card spec grilling (issue #9) turned this into a system rule.

## Decision

- **Two token layers.** A palette layer holds the agreed color steps. A functional layer (`--border`, `--input`, `--ring`, `--success`, ...) aliases palette steps. Functional names are encouraged; off-palette values are not.
- **The palette is Tailwind's OKLCH palette, referenced by name.** Functional tokens alias Tailwind v4's built-in variables (`--primary: var(--color-indigo-600)`), never literal color values, so a step name is real code and cannot drift. Verified: Tailwind v4 emits every default-theme variable that author CSS references with `var()`.
- **Five functional ramps.** Grays come from `neutral` (chroma 0), the brand ramp is `indigo` (primary is indigo-600 exactly), destructive/error is `red`, success is `green`, warning is `amber` (fixed by the palette issue #15).
- **Eight decorative hues at step 400** — `orange`, `amber`, `green`, `teal`, `sky`, `indigo`, `purple`, `pink` — carry identity color (avatar #13 fallbacks and future components). Components use these steps directly; the avatar is a palette consumer, not an exception.
- **Every color operation picks a palette step.** Hover and press shades step the ramp (border-200 to border-300), never alpha, never `color-mix`.
- **Color alpha is banned repo-wide**, docs chrome included: no Tailwind `/N` color modifiers, no alpha channels in token values.
- **Element opacity stays allowed.** `disabled:opacity-50`, motion fades, and the pulse animations in ADR 0001 fade whole elements; they do not define colors.

## Consequences

- The three dark alpha tokens became solid neutral steps (#15): `--border` and `--sidebar-border` neutral-800, `--input` neutral-700.
- The focus ring in specs #3–#7 (`ring-ring/50`) became solid indigo-500 in both modes, measured ≥ 3.9:1 against background and card everywhere; correction comments posted on each issue. The button press ring (#3, "at higher opacity") became the `--primary` step per mode, written `ring-primary`.
- The status trio ships as tint pairs: `--success` green-100/green-800, `--warning` amber-100/amber-800, `--error` red-100/red-700 in light; step 950 backgrounds with step 300 text in dark. Error no longer reuses `--destructive` (correction on #8) — a tint cannot be derived from a solid without alpha.
- Off-palette values snap to the nearest step, never keep exceptions: `--accent` snapped to indigo-50 light / indigo-950 dark.
- `src/styles.css` (`outline-ring/50`) and the docs chrome (site header translucency, theme toggle ring) drop their alpha.

## Flip condition

A returning modal dialog needs a translucent scrim by nature. Amend this ADR then with that single sanctioned exception. See also the flip condition in ADR 0003.
