# flyingsalmon

A shadcn registry that is Brian's design system and public design portfolio. Components ship from `src/registry/` under the `@flyingsalmon` namespace.

## Language

**Atomic component**:
A batch-1 primitive that renders inline only: no floating layer, not a composite widget. Anything floating (tooltip, select) or composite (dialog, tabs) is not atomic. A registry dependency on another atomic component is allowed (button embeds spinner; ADR 0002).
_Avoid_: widget, element, control

**Batch**:
A shipping group of components specced and built together. Batch 1 holds the 11 atomic components (alert joined via ADR 0002; label absorbed into the field components via #4).
_Avoid_: milestone, phase, wave

**Field family**:
The components that own a label and an error message: input, textarea, checkbox. All three take their id linkage and their error message from the `field` registry item. Switch is not a member — it has a label but no error state, because a failed toggle is a result the app shows.
_Avoid_: form controls, inputs

**Motion language**:
The shared animation vocabulary — animation kinds, duration scale, spring presets — built on the `motion` library. Every component spec quotes its names. Fixed in ADR 0001.
_Avoid_: animation system, transitions

**Animation kind**:
One of the four classes in the motion language: state feedback (hover/press/focus/check), morph (a component reshapes itself), enter/exit, and continuous (spinner, skeleton). All kinds except continuous stay under 200ms.
_Avoid_: animation type, category

**Feedback rule**:
The defining constraint, revised in ADR 0002: the acting component shows its own busyness — the button morphs through loading, fields show their own errors. The app shows success and error inline via alert. Toast is banned permanently.
_Avoid_: notification policy

**Spec checklist**:
The fixed sections every component spec fills: purpose, variants, sizes, states, keyboard path, contrast, micro animation.
_Avoid_: template, rubric
