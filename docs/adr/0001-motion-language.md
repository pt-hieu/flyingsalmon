# Motion language: values, engines, and kinds

Status: accepted

Every batch-1 component spec must name its micro animation in a shared vocabulary. We fixed that vocabulary on top of the `motion` library (issue #2). The values below are the language; specs quote these names, never raw numbers.

## Decision

- **Four animation kinds**: state feedback (hover, press, focus, check), morph (a component reshapes itself), enter/exit, and continuous (spinner, skeleton). Kinds 1–3 stay under 200ms. Continuous is exempt — a spinner loops forever.
- **Two engines**: CSS transitions handle state feedback; `motion` handles morph and enter/exit. CSS is free and simple for color/opacity; springs matter for movement.
- **Durations**: `--motion-fast: 100ms` for color and opacity feedback, `--motion-base: 150ms` for morphs and enter/exit. Published as CSS variables so both engines share the same numbers.
- **Spring presets**: `spring-bounce` (visualDuration 150ms, bounce 0.3) for morphs and enters — the playful one. `spring-settle` (visualDuration 150ms, bounce 0) for exits — leaving elements must not wobble.
- **Properties**: prefer `transform`, `opacity`, and color. Layout animation is allowed via motion's `layout` prop, which turns size changes into transforms. This reverses the earlier "never animates layout" rule.
- **Continuous values**: spinner rotates once per 800ms, linear. Skeleton pulses on a 2s cycle, ease-in-out. Slower reads as broken, faster reads as alarming.
- **Home in code**: one registry item `motion` with a single file `src/registry/lib/motion.ts` exporting the spring presets and duration constants. The theme item carries the duration CSS variables. Components depend on the `motion` item. (Built in the build effort, not during planning.)

## Deferred

`prefers-reduced-motion` support is deliberately skipped for now. This reverses the earlier "always respects prefers-reduced-motion" rule; revisit before the registry goes public.
