# Notice guidelines

Design guidelines for the flyingsalmon Notice component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For the result of a dialog form after it has closed and the item it changed is not on screen.
- For a confirm-only action with nothing to update, such as a copied link.
- For a result that arrives after the traveller has navigated away from where they acted.

## When not to use

- Use [the feedback rule](https://flyingsalmon.superbrian.dev/principles) when the affected item is on screen. The item appears, updates, or shows a failed state with a retry, and that is the result.
- Use [Alert](https://flyingsalmon.superbrian.dev/components/alert) for the result of a form that is still on screen. It goes in the form’s result slot, below the actions row.
- Use [Error state](https://flyingsalmon.superbrian.dev/components/error-state) when a region failed to load. The region says so itself, with a retry.

## Do and don't

- **Do:** Give every notice a subject: a link to the item it is about, or a button that reopens the dialog with what the traveller typed.
  **Why:** A message with no way back to its subject cannot be acted on, and the traveller has to hunt for what it meant.
- **Do:** Leave the notice on screen until the traveller follows its subject or dismisses it.
  **Why:** It carries a result with no other home, so it stays until it is seen. A timer would take it from someone who looked away. That is what separates it from a toast.
- **Don't:** Stack notices. A new result replaces the one showing.
  **Why:** One notice at a time keeps each result tied to the action that caused it. A pile has no order and no owner.
- **Don't:** Show a notice about an item the traveller can already see.
  **Why:** The item’s own state is the right home. A notice beside it says the same thing in a second place.
