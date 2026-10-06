# Drawer guidelines

Design guidelines for the flyingsalmon Drawer component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For filters on a list, so the list stays in view and changes while the traveller adjusts them.
- For the detail of one selected row, with the table still beside it.
- For a short edit form where the item being edited should stay visible.

## When not to use

- Use [Dialog](https://flyingsalmon.superbrian.dev/components/dialog) to confirm an action or stop the page for a decision. A dialog sits in the centre and the page behind it stops mattering.
- Use [Sidebar](https://flyingsalmon.superbrian.dev/components/sidebar) to move between sections of the app. Navigation belongs to the sidebar at every width, including the strip it collapses to on a narrow screen.
- Use [Notice](https://flyingsalmon.superbrian.dev/components/notice) to show the result of an action. A result needs only to be seen, not answered.

## Do and don't

- **Do:** Close a form drawer on submit and show the result on the item that changed.
  **Why:** The item is still on screen beside the panel, so the updated trip is the clearest confirmation.
- **Do:** Show one selected thing at a time. Choosing another row swaps the drawer’s content.
  **Why:** The drawer is the detail of the current selection. A second panel would cover the list it belongs to.
- **Do:** Put previous and next buttons on the left of the footer and one primary action on the right.
  **Why:** The traveller walks the list day by day without closing the panel, and the single action sits where the eye finishes.
- **Don't:** Turn a detail drawer into an editor. Its action opens a dialog for a change that reshapes the trip.
  **Why:** Detail is for reading beside the list. A change with consequences needs the full stop of a dialog and its own confirm.
- **Don't:** Put the destructive confirmation of a trip in a drawer.
  **Why:** A confirmation demands a decision, and a drawer invites the traveller to keep working on the page behind it.
