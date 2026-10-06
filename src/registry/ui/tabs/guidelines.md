# Tabs guidelines

Design guidelines for the flyingsalmon Tabs component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To switch between two to five views of the same thing, such as a trip’s itinerary, places, and travellers.
- When the traveller should see one view at a time and move between them without leaving the page.

## When not to use

- Use [Sidebar](https://flyingsalmon.superbrian.dev/components/sidebar) to move between pages. Tabs switch panels in place and do not change the address.
- Use [Toggle group](https://flyingsalmon.superbrian.dev/components/toggle-group) to answer a question or filter a list. A single-mode toggle group is the control for choosing, and it can return to empty.
- Use [Accordion](https://flyingsalmon.superbrian.dev/components/accordion) to reveal content under a heading while keeping the others visible, so several sections can be open together.

## Do and don't

- **Do:** Place the tab row directly under the heading of the thing it switches.
  **Why:** The tabs read as views of that one thing, and the panel opens right where the reader’s eye leaves the row.
- **Do:** Keep tab labels to one or two words.
  **Why:** The tabs sit in one row with no wrapping, so short labels keep every tab in view.
- **Don't:** Let a switch throw away what the traveller typed.
  **Why:** A switch changes the view, not the work. Coming back finds the half-typed note and the scroll position where they were left.
- **Don't:** Hide a tab whose view is unavailable. Leave it in the row, disabled.
  **Why:** A tab that disappears shifts the others. A disabled tab says the view exists but is unavailable.
- **Don't:** Put tabs inside a tab panel.
  **Why:** Two rows of tabs make the traveller track two places at once. Split the content across pages instead.
