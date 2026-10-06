# Dropdown menu guidelines

Design guidelines for the flyingsalmon Dropdown menu component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For the actions on one item, gathered behind an overflow button: rename, duplicate, share, delete.
- For a short list of places to go from one trigger.

## When not to use

- Use [Switch](https://flyingsalmon.superbrian.dev/components/switch) for settings that stay on or off. A menu closes on every choice, so a toggle belongs on the page.
- Use [Select](https://flyingsalmon.superbrian.dev/components/select) to pick a value for a field. A menu runs an action and a select holds a value.
- Use [Button](https://flyingsalmon.superbrian.dev/components/button) for one action with no siblings. A menu with a single item is a button with extra steps.

## Do and don't

- **Do:** Show the result on the item the action changed.
  **Why:** The menu closes on select, so the traveller is looking at the item again. A duplicated trip appearing in the list is the confirmation. When the item has no visible home, a notice carries the result.
- **Do:** Open a confirmation dialog from a destructive item.
  **Why:** The menu offers the choice and the dialog asks for the decision, so one stray click cannot delete a trip.
- **Do:** Put an overflow trigger at the trailing edge of its row, as a ghost icon button, and open the menu aligned to its end.
  **Why:** The row reads first and its actions trail it. An end-aligned menu opens over the row rather than past the edge of the page.
- **Don't:** Show an overflow trigger on an item with no actions.
  **Why:** A trigger that opens nothing teaches the traveller to ignore every other one. Leave the trailing edge empty.
- **Do:** Give every item in a menu an icon, or none of them.
  **Why:** Mixed rows leave the labels ragged.
- **Do:** Head the list with a quiet label for context, such as the signed-in email above the account actions.
  **Why:** The traveller sees whose account the actions apply to before they choose. Muted text never looks like something to press.
- **Don't:** Add checkbox items, radio items, or a submenu.
  **Why:** The menu is for actions only. A choice that persists belongs on the page as a field.
