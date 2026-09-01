# flyingsalmon

A shadcn registry that is Brian's design system and public design portfolio. Components ship from `src/registry/` under the `@flyingsalmon` namespace.

## Language

**Atomic component**:
A batch-1 primitive that renders inline only: no floating layer, not a composite widget. Anything floating (tooltip, select) or composite (dialog, tabs) is not atomic. A registry dependency on another atomic component is allowed (button embeds spinner; ADR 0002).
_Avoid_: widget, element, control

**Interactive component**:
An atomic component that takes focus and can be disabled: button, checkbox, input, switch, textarea. All five take their focus ring geometry and their disabled state from the `interaction` registry item, and each names its own ring color (ADR 0005). Badge, avatar and skeleton are not members and are never focusable. Card is not a member either — it paints its ring on a pseudo-element of a descendant link and restates the boundary width itself.
_Avoid_: control, form control, focusable

**Focus ring shape**:
Which of the two rings in ADR 0003 a component draws. An offset ring stands clear of the shape (button, checkbox, switch, theme toggle); a boundary ring draws on the element's own edge and replaces its border (input, textarea, card link). The shape picks the export — `offsetFocusRingGeometry` or `boundaryFocusRingGeometry` — and ADR 0003 owns the widths.
_Avoid_: ring style, ring variant, focus style

**Shared style rule**:
A rendering rule fixed by an ADR or this glossary and therefore centralised in `src/registry/lib/`, as distinct from a class string that merely repeats. Byte-identity is not the bar (ADR 0005). Today: the disabled state, the two focus ring geometries, the field label variants.
_Avoid_: shared class, style token, common style

**Batch**:
A shipping group of components specced and built together. Batch 1 holds the 11 atomic components (alert joined via ADR 0002; label absorbed into the field components via #4).
_Avoid_: milestone, phase, wave

**Field family**:
The components that own a label and an error message: input, textarea, checkbox. All three take their id linkage, their error message, and their label variants from the `field` registry item. Switch is not a member — it has a label but no error state, because a failed toggle is a result the app shows. That exclusion covers the label too: switch keeps its own label block, which transitions opacity rather than color (ADR 0005).
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
