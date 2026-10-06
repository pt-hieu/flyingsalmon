# Card guidelines

Design guidelines for the flyingsalmon Card component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To group a trip, a place, or a traveller with its description and actions on one surface.
- For a list of items that each lead somewhere, as an interactive card.

## When not to use

- Use [Accordion](https://flyingsalmon.superbrian.dev/components/accordion) to reveal secondary content under a heading. A card is always open.
- Use [Alert](https://flyingsalmon.superbrian.dev/components/alert) for a result or a warning about the page. A card has no status of its own.
- Use [Table](https://flyingsalmon.superbrian.dev/components/table) for tabular data with comparable columns.

## Do and don't

- **Don't:** Put a step’s actions inside the card that holds its fields.
  **Why:** The card holds the work and the actions finish it, so they sit directly under the card, outside its edge. The result they produce then appears below them, where the reader is already looking.
- **Do:** Mark the one card the reader is working on with an orange border, and leave every other card plain.
  **Why:** Emphasis lives in the border on a flat surface. One marked card points the eye; two compete and neither reads as current.
- **Do:** Give sibling cards in a grid the same slots in the same order.
  **Why:** The reader compares siblings by position. When the price sits in the same place on every card, the difference between them is the only thing that moves.
- **Do:** Set a large figure as the title, under a small label that says what it counts.
  **Why:** The reader learns what the number means before reading it, and the figure stays the largest thing on the card.
- **Do:** Keep the card on screen while its content is missing, and fill its slots with skeletons of the final shape.
  **Why:** The card itself never changes: the content shows its own busyness, and the layout does not jump when it arrives.
- **Don't:** Make a card react to the pointer when nothing happens on click.
  **Why:** Hover and press feedback promise an action. A dead target must not look almost clickable, which is also why a card has no disabled state.
- **Don't:** Lift a card off the page with a shadow or a fill.
  **Why:** Cards are flat. A solid border and the white surface separate them from the page, and the border alone carries emphasis.
