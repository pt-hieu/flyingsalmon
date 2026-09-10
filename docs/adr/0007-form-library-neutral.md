# Form stays library-neutral: the field family's props are the contract

Status: accepted

The batch-3 map (issue #81) decided that form is both a layout shell and a binding to one form-state library, and leaned toward TanStack Form. The form-and-field-family grilling (issue #83) reopened that decision: a design system is a UI stack, and form state is app logic. This ADR separates the two.

## Decision

- **Form is a layout shell only.** It gives fields their vertical rhythm, an actions row, and an optional slot where the app places the submit result. It ships no form-state binding and depends on no form-state library.
- **The field family's props are the contract any library drives.** Every member takes `label`, `error?: string`, `name`, `disabled`, and its own change callback: native `onChange` on input and textarea, Radix `onCheckedChange` on checkbox, Radix `onValueChange` on select and radio-group, and `onValueChange` carrying `number | null` on number-field, which reports a parsed number or nothing at all and never the formatted text. An app wires its library's per-field state onto those props, or drives them from plain React state. The registry does not know which.
- **`error?: string` stays the public contract.** A field takes exactly one message from the app. Fields never read error state from a form context, and no context-driven route ships beside the prop. Reducing a library's error shape to one string is app code.
- **No busyness on form.** The submit button's `loading` is the only busyness a submitting form shows (ADR 0002). Fields stay editable while the submit is in flight; form exposes no `pending`-like state. Dialog's `pending` blocks exits, which a form cannot do, so the name is not reused.
- **The result slot is a position, not a renderer.** Form fixes where the result appears; the app supplies the alert and its variant, because only the app knows what a successful submit means. Form-wide errors go through the same slot as an `error` alert. The `field` registry item therefore grows no form-wide error piece, and form lists no dependency on `alert`, which it never imports.
- **The registry names no schema library.** Standard Schema issue objects, plain strings, and a library's own error type all reduce to the one string the field takes, and that reduction is the app's.
- **The docs show a library-free submit.** The form docs page drives its example from plain React state and a fake handler, and names the props a library would wire. No form-state library enters the docs site as a dependency.

## Rationale

- The field family was already library-neutral. Every member takes its label, id linkage, and error message from the `field` item and exposes plain props for the rest. Binding form to one library would have introduced a second data path into every field for the sake of one consumer's stack.
- A binding is thin glue: a first-error pick, a change adapter per Radix control, and a subscription to the submitting flag. Glue that thin belongs in the app that chose the library, where it can follow that library's versions.
- A public design portfolio that dictates a form-state library narrows who can adopt it. The stack the registry does dictate is the rendering stack: Tailwind, Radix, motion.

## Consequences

- The map note "form is both a layout shell and a library binding" is amended to shell only, and its lean toward a library is withdrawn.
- The `form` entry in `registry.json` drops `@flyingsalmon/alert` from `registryDependencies` and its description no longer mentions a binding.
- Radio-group joins the field family under the same contract. Its label renders through `fieldLabelVariants`, and the Radix root carries `aria-labelledby`, `aria-describedby` from `useFieldIds`, and `aria-invalid` on error. No fieldset or legend.
- The form spec (issue #84) decides the slot position, the vertical rhythm, and whether the shell takes an app-driven `disabled`, all without a library.
- hottrip picks its own form-state library and writes its own binding against the props above. If that binding ever proves worth sharing, it ships as a separate registry item that depends on `form`, not as a change to `form`.

## Flip condition

If a second consumer of this registry arrives on the same form-state library as hottrip and both hand-write the same binding, ship that binding as its own registry item. `form` itself stays neutral even then.
