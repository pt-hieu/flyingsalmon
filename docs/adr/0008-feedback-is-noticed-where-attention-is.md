# Feedback is noticed where attention already is

Status: accepted. Supersedes ADR 0002's placement and toast clauses; ADR 0002's split between the acting component and the app stands.

The inline-feedback grilling (issue #93) began as a placement question: where does the form's result alert go, and what may it displace? It ended by reopening the feedback rule itself. The rule said "inline via alert, no toast, ever". Its purpose was never the position. It was that a user must not miss the result of what they just did, and a toast in the bottom-right corner is missed. Inline placement was one way to honour that purpose, and the dialog form broke it: a dialog closes when its submit concludes, so there is no surface left to hold an inline alert, and no application can be obliged to give every page a slot for one.

## Decision

- **The invariant.** Feedback appears where the user's attention already is, and stays until they have seen it. No mechanism is prescribed. Anything that satisfies the invariant is allowed; anything that fails it is banned, whatever it is called.
- **The ban, restated as properties.** Feedback that auto-dismisses, stacks, has no owner, or has no link back to its subject is banned. Position is not the objection. A bottom-right toast fails on every property; a floating surface that has none of them is not a toast.
- **Ranking of homes for a result.** In order of preference:
  1. **The affected item.** Success is the item appearing or updating. Failure after an optimistic close is a failed state on the item, carrying the message and a retry. Words are only needed when the change is not visible.
  2. **The acting surface.** The form's result slot, for client-side cross-field validation and for page forms whose server is the validator (sign in, payment).
  3. **The notice.** A shell-owned, persistent surface for a result with no visible home: after navigation, for a closed dialog form, for a confirm-only action such as a copied link. A notice about an item that is on screen is a bug; the item state is the correct home.
- **Dialog forms are optimistic by default.** A dialog form closes on submit and leaves its result slot empty. Success shows on the affected item. A server-only error from a closed dialog becomes a notice whose link back reopens the dialog with the submitted data. Consumers do not hold the dialog open waiting for the server.
- **The form result slot sits below the actions row.** One position on every `Form`. The button the user just pressed never moves. On validation failure focus goes to the first invalid field; the app-supplied `Alert` announces itself through its own role, so the slot carries no live region and `Form` does no scroll or focus management.
- **Displacement rule.** Movement the user caused by acting on the surface is allowed: a field error growing under the field the user just left, a validation summary appearing on the click they just made. Movement the app causes unprompted, such as a server result arriving, must not displace content. Absolute positioning is not a loophole; it is the notice, with the notice's contract.
- **Notice contract.** A shell-owned provider. One notice at a time, persistent until dismissed or replaced. Anchored to the trigger when one exists, otherwise fixed top-centre. A live region mounted before content, polite for success and assertive for error. Focus never moves to it. Dismiss by button only; Escape stays with dialogs. Every notice carries a link back to its subject.
- **Enforcement.** The registry enforces only its own components' behaviour: no auto-dismiss prop exists, the notice provider holds one item, alert and field errors announce and settle. The ranking is documented as guidance. The registry cannot enforce where an application puts feedback, and the docs say so rather than pretending otherwise.

## Rationale

- The dialog case has no inline answer. Optimistic updates close the surface before the server replies, for success and for failure alike. Holding the dialog open reintroduces the wait the optimistic update removed.
- The changed item is the strongest signal. A new trip at the top of the list cannot be missed and needs no words. Most of hottrip's forms are short dialog forms whose result is an item.
- Below the actions row is the one position that never moves the button and is always beside the control the user pressed, on short and long forms alike. Above the fields is out of view on a long form and pushes the button on every form.
- A separate name for the notice keeps the ban honest. A public consumer reading "toast" assumes auto-dismiss and a stack, and the docs would spend their length saying "not that".
- A rule the registry cannot enforce is a wish. Labelling it guidance prepares the registry for public consumers who will not read this ADR.

## Consequences

- ADR 0001 gains a clause: anything whose animated dimension displaces siblings enters with `springSettle`. `Alert` and `FieldErrorMessage` change from `springBounce` to `springSettle` on enter.
- The feedback-rule wording in `CLAUDE.md` and `CONTEXT.md` changes; `CONTEXT.md` gains the terms **Notice** and **Result slot**.
- The alert, button, switch, input, and textarea docs pages drop "no toast" and the bounce enter.
- The form spec (#84) takes the slot placement and the empty-in-dialog rule from here.
- Notice and changed-item support (a fresh-item motion preset, a failed state with message and retry on card and table row) are next-batch candidates on the batch-3 map. Neither is enforced; both are optional registry items.
- The docs principles page, when written, states the invariant and the ranking, not a mechanism.
