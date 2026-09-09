# flyingsalmon

A shadcn registry that is Brian's design system and public design portfolio. Components ship from `src/registry/` under the `@flyingsalmon` namespace.

## Language

**Atomic component**:
A batch-1 primitive that renders inline only: no floating layer, not a composite widget. Anything floating (tooltip, select) or composite (dialog, tabs) is not atomic. A registry dependency on another atomic component is allowed (button embeds spinner; ADR 0002).
_Avoid_: widget, element, control

**Interactive component**:
An atomic component that takes focus and can be disabled: button, checkbox, input, switch, textarea. All five take their focus ring geometry and their disabled state from the `interaction` registry item, and each names its own ring color (ADR 0006). Badge, avatar and skeleton are not members and are never focusable. Card is not a member either — it paints its ring on a pseudo-element of a descendant link and restates the boundary width itself. Batch-2 components are composite, not atomic, so none of them is a member.
_Avoid_: control, form control, focusable

**Focus ring shape**:
Which focus feedback a component draws, per ADR 0003. An offset ring stands clear of the shape (button, checkbox, switch, theme toggle); a boundary ring draws on the element's own edge and replaces its border (input, textarea, card link); or no ring at all, when the component's own state indicator moves with focus (tabs). The first two pick the export — `offsetFocusRingGeometry` or `boundaryFocusRingGeometry`. The third takes neither and is not an omission. ADR 0003 owns all three.
_Avoid_: ring style, ring variant, focus style

**Shared style rule**:
A rendering rule fixed by an ADR or this glossary and therefore centralised in `src/registry/lib/`, as distinct from a class string that merely repeats. Byte-identity is not the bar (ADR 0006). Today: the disabled state, the two focus ring geometries, the field label variants. The menu item rules join in a third module, `menu`, when dropdown-menu builds (#52).
_Avoid_: shared class, style token, common style

**Batch**:
A shipping group of components specced and built together. Batch 1 holds the 11 atomic components (alert joined via ADR 0002; label absorbed into the field components via #4). Batch 2 holds the 5 floating and composite components: dialog, dropdown-menu, select, tooltip, tabs. Popover was cut permanently by #50. Batch 3 holds the 6 form and data components: form, radio-group, table, accordion, avatar-group, separator. Batch 4 holds the 13 components hottrip's screens need and the registry lacks — calendar, date-picker, combobox, number-field, toggle-group, progress, notice, changed-item, empty-state, sidebar, header, carousel, timeline — plus a button amendment; its roster gate is that a named hottrip screen needs the component.
_Avoid_: milestone, phase, wave

**Floating component**:
A component that renders on a layer above the page flow, positioned against an anchor: dialog, dropdown-menu, select, tooltip. Every floating component shares one portal, positioning, dismiss, and enter/exit contract. Tabs is not floating.
_Avoid_: overlay, portal component, popup

**Pending**:
The dialog state that marks an operation running inside the dialog, set by the app through the `pending` prop. While pending, Escape, outside click, and the close button do nothing and the close button renders disabled. The dialog shows no busyness of its own beyond that; the acting button inside carries the spinner (feedback rule). An operation that runs outside the dialog does not set it. The only exception to "Escape always closes" in ADR 0005.
_Avoid_: busy, loading, locked, submitting

**Exhibition mode**:
A floating component rendered inline for documentation through the `exhibitionMode` prop: no portal, no focus trap, no scroll lock, positioned inside its nearest `relative` ancestor. It exists so the docs `ModePreview` can show two open copies side by side, one per color mode. Never used in an app. Fixed in ADR 0005.
_Avoid_: preview mode, static mode, inline mode, demo mode

**Highlighted**:
The one state of a menu item under the pointer or holding keyboard focus. Radix merges hover and focus into `data-highlighted`, and the item paints it as a solid background step to `--accent` with `--accent-foreground`, a destructive item to `--error` with `--error-foreground`, with no ring and no transition. A menu item has no separate hover, focus, or press state; the highlight is its focus indicator (ADR 0003). Applies to dropdown-menu and, through the shared `menu` rules, to select.
_Avoid_: hovered, focused item, active item, selected

**Composite component**:
A component built from several parts that only make sense together, exposed as a named group rather than a single element: tabs is the batch-2 example, and every floating component is also composite. An atomic component is never composite.
_Avoid_: compound component, widget

**Field family**:
The components that own a label and an error message: input, textarea, checkbox, select from batch 2, and radio-group from batch 3. All of them take their id linkage, their error message, and their label variants from the `field` registry item. Their props are the contract any form-state library drives; the registry binds to none (ADR 0007). Switch is not a member — it has a label but no error state, because a failed toggle is a result the app shows. That exclusion covers the label too: switch keeps its own label block, which transitions opacity rather than color (ADR 0006).
_Avoid_: form controls, inputs

**Motion language**:
The shared animation vocabulary — animation kinds, duration scale, spring presets — built on the `motion` library. Every component spec quotes its names. Fixed in ADR 0001.
_Avoid_: animation system, transitions

**Animation kind**:
One of the four classes in the motion language: state feedback (hover/press/focus/check), morph (a component reshapes itself), enter/exit, and continuous (spinner, skeleton). All kinds except continuous stay under 200ms.
_Avoid_: animation type, category

**Feedback rule**:
The defining constraint, revised in ADR 0002 and ADR 0008: the acting component shows its own busyness — the button morphs through loading, fields show their own errors. Results belong to the app and must appear where the user's attention already is, staying until seen. Homes in order: the affected item, the acting surface's result slot, the notice. Feedback that auto-dismisses, stacks, has no owner, or has no link back to its subject is banned, which is what the old "no toast" meant. Enforced on registry components, guidance for apps.
_Avoid_: notification policy, no toast

**Result slot**:
The optional position on `Form`, below the actions row, where the app places its submit result as an alert (ADR 0007, ADR 0008). A position, not a renderer: `Form` imports nothing from alert and adds no live region, because the alert announces itself. Holds client-side cross-field validation and server errors on page forms; stays empty on a dialog form, which closes on submit and shows its result on the affected item or through a notice.
_Avoid_: form alert, error summary, message area

**Notice**:
The shell-owned surface for a result with no visible home: after navigation, from a closed dialog form, for a confirm-only action. One at a time, persistent until dismissed or replaced, anchored to its trigger or fixed top-centre, announced from a live region mounted before content, never takes focus, always links back to its subject (ADR 0008). Not a toast: it auto-dismisses nothing, stacks nothing, and is owned. A next-batch candidate, not built.
_Avoid_: toast, snackbar, notification, banner

**Range**:
A calendar selection with an inclusive start day and end day, carried as two ISO `YYYY-MM-DD` strings with `start` never after `end`. Calendar's range mode emits one on commit; date-picker posts it as two hidden native inputs. A one-day range is a start equal to its end.
_Avoid_: period, span, date range, from/to

**Anchor**:
The first pick of an in-progress range in calendar. While an anchor stands, the pointer or the keyboard cursor previews the range from it, painted the same as a committed range. Escape, or focus leaving the grid, clears the anchor and restores the last committed value; the app never sees a half-selection.
_Avoid_: start date, first click, pending selection

**Unavailable day**:
A calendar day outside `min` / `max` or refused by `isDateDisabled`. It stays focusable and reachable by arrow keys, is not selectable, and renders as muted, struck-through text at 4.5:1 because it is reachable. Distinct from the whole calendar being disabled, which removes the grid from the tab order.
_Avoid_: disabled date, blocked date, excluded day

**Spec checklist**:
The fixed sections every component spec fills: purpose, variants, sizes, states, keyboard path, contrast, micro animation.
_Avoid_: template, rubric
