# Motion language: values, engines, and kinds

Status: accepted

Revised by ADR 0009: the theme item, not the component's item, carries each `animate-*` utility. Marked inline below.

Every batch-1 component spec must name its micro animation in a shared vocabulary. We fixed that vocabulary on top of the `motion` library (issue #2). The values below are the language; specs quote these names, never raw numbers.

## Decision

- **Four animation kinds**: state feedback (hover, press, focus, check), morph (a component reshapes itself), enter/exit, and continuous (spinner, skeleton). Kinds 1–3 stay under 200ms. Continuous is exempt — a spinner loops forever.
- **Three engines**: CSS transitions handle state feedback; `motion` handles morph and enter/exit; CSS keyframes handle continuous, through a custom `animate-*` utility **the theme item carries (ADR 0009)** — never Tailwind's built-in `animate-spin` or `animate-pulse`, whose durations are wrong (issue #11). CSS is free and simple for color/opacity and for a loop that never stops; springs matter for movement.
- **Durations**: `--motion-fast: 100ms` for color and opacity feedback, `--motion-base: 150ms` for morphs and enter/exit. Published as CSS variables so every engine shares the same numbers.
- **Spring presets**: `spring-bounce` (visualDuration 150ms, bounce 0.3) for morphs and enters — the playful one. `spring-settle` (visualDuration 150ms, bounce 0) for exits — leaving elements must not wobble.
- **Bounce stays in its own box** (amended by ADR 0008, issue #93): `spring-bounce` is for transforms that stay inside the element's own bounds — scale, translate, a thumb travelling, a check drawing in. Anything whose animated dimension displaces siblings enters on `spring-settle`, because a bounce on a height change makes the content below overshoot and come back, which reads as a glitch rather than play. Alert and the field error message enter on `spring-settle` for this reason. The progress fill is the other exception (issue #156): its `scaleX` stays inside its own bounds, but it animates on `spring-settle` because a fill that overshoots its value misreports how much work is done.
- **Properties**: prefer `transform`, `opacity`, and color. Layout animation is allowed via motion's `layout` prop, which turns size changes into transforms. This reverses the earlier "never animates layout" rule.
- **Continuous values**: spinner rotates once per 800ms, linear. Skeleton pulses on a 2s cycle, ease-in-out. Switch loading pulses the thumb (scale plus opacity) on an 800ms cycle, matched to the spinner's tempo (issue #7). The indeterminate progress segment travels the track on a 2s cycle, ease-in-out, matched to the skeleton's tempo (issue #156). Slower reads as broken, faster reads as alarming.
- **Home in code**: one registry item `motion` with a single file `src/registry/lib/motion.ts` exporting the spring presets and duration constants. The theme item carries the duration CSS variables. Components depend on the `motion` item. (Built in the build effort, not during planning.)

## Deferred

`prefers-reduced-motion` support is deliberately skipped for now. This reverses the earlier "always respects prefers-reduced-motion" rule; revisit before the registry goes public.
