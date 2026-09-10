# Palette-only colors: two token layers, no color alpha

Status: accepted

Opacity modifiers (`ring-ring/50`, `oklch(1 0 0 / 10%)`) manufacture colors that belong to no agreed palette. The card spec grilling (issue #9) turned this into a system rule.

## Decision

- **Two token layers.** A palette layer holds the agreed color steps. A functional layer (`--border`, `--input`, `--ring`, `--success`, ...) aliases palette steps. Functional names are encouraged; off-palette values are not.
- **The palette is Tailwind's OKLCH palette, referenced by name.** Functional tokens alias Tailwind v4's built-in variables (`--primary: var(--color-indigo-400)`), never literal color values, so a step name is real code and cannot drift. Verified: Tailwind v4 emits every default-theme variable that author CSS references with `var()`.
- **Five functional ramps.** Grays come from `neutral` (chroma 0), the brand ramp is `indigo` (primary is indigo-400 exactly), destructive/error is `red`, success is `green`, warning is `amber` (fixed by the palette issue #15).
- **Eight decorative hues at step 400** — `orange`, `amber`, `green`, `teal`, `sky`, `indigo`, `purple`, `pink` — carry identity color (avatar #13 fallbacks and future components). Components use these steps directly; the avatar is a palette consumer, not an exception.
- **Every color operation picks a palette step.** Hover and press shades step the ramp (border-200 to border-300), never alpha, never `color-mix`.
- **Color alpha is banned repo-wide**, docs chrome included: no Tailwind `/N` color modifiers, no alpha channels in token values.
- **Element opacity stays allowed.** `disabled:opacity-50`, motion fades, and the pulse animations in ADR 0001 fade whole elements; they do not define colors.

## Consequences

- The three dark alpha tokens became solid neutral steps (#15): `--border` and `--sidebar-border` neutral-800, `--input` neutral-700.
- The focus ring takes `--ring`: neutral-950 in light, neutral-50 in dark. It clears 3:1 against every neutral surface in both modes by a wide margin — weakest is 14.49:1 on neutral-200 light and 9.59:1 on neutral-700 dark. A press ring may take its variant's own hue instead, but the focus ring stays on `--ring`, because the 2px offset puts the ring against the page background rather than against the fill.
- Those correction comments also restated the ring as 3px. The width was never this ADR's to set, and 3px holds only for the offset rings in #3, #6, and #7. The field ring in #4 and #5 ships 2px with no offset and is correct as shipped (#33). ADR 0003 owns the two widths.
- The status trio ships as tint pairs: `--success` green-100/green-800, `--warning` amber-100/amber-800, `--error` red-100/red-700 in light; step 950 backgrounds with step 300 text in dark. Error no longer reuses `--destructive` (correction on #8) — a tint cannot be derived from a solid without alpha.
- Button's amber variant (#131) is a palette consumer like avatar: amber-400 fill with neutral-950 text in both modes, hover amber-300, press ring amber-400, referenced directly with no functional alias. Its focus ring stays on `--ring`: amber-400 is 1.74:1 against white and cannot carry a focus indicator in light mode.
- Off-palette values snap to the nearest step, never keep exceptions: `--accent` snapped to neutral-200 light / neutral-700 dark.
- State indicators take `--indicator` / `--indicator-foreground` (#136): indigo-500 with white in light, indigo-400 with neutral-950 in dark. `--primary` is indigo-400 in both modes, which clears 3:1 only on white in light (3.12; 2.86 on neutral-100, 2.48 on neutral-200), so a checked fill, a selected day, a tab bar, or a focus divider drawn in `--primary` fails on a muted or secondary panel. `--indicator` clears 3:1 on all four neutral surfaces per mode, weakest 3.63 on neutral-200 light and 3.30 on neutral-800 dark, and its foreground clears 4.5:1 for text on the fill in both modes. Consumers: checkbox and radio checked fills, hover borders, and marks; the switch track and thumb; the tabs active bar; the calendar selected fill, its text, and the today dot; the accordion hover and focus divider and chevron; the rules an interactive table row turns on focus, and the header rule they match. Hover on an indicator-filled surface steps to indigo-400 light / indigo-300 dark. Fills that carry text (button, badge) and hover-only borders (card) stay on `--primary`: the text supplies the contrast, and hover feedback has no floor. A border that only echoes a boundary already carried by semantics (the table header divider) is decorative under ADR 0003 and has no floor of its own; it takes `--indicator` only to match the focus rules in the same component.
- `src/styles.css` (`outline-ring/50`) and the docs chrome (site header translucency, theme toggle ring) drop their alpha.

## Flip condition

A returning modal dialog needs a translucent scrim by nature. Amend this ADR then with that single sanctioned exception. See also the flip condition in ADR 0003.
