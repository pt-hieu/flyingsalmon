# Stepper guidelines

Design guidelines for the flyingsalmon Stepper component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To show where someone is in a sequence they are walking: question 2 of 4 while the AI plans a trip.
- When the count is known and every step weighs about the same, so ticks say more than a fraction would.

## When not to use

- Use [Progress](https://flyingsalmon.superbrian.dev/components/progress) for how far one operation has got, such as an upload. A bar of a machine working is a fraction, not a position.
- Use [Timeline](https://flyingsalmon.superbrian.dev/components/timeline) for a series of events that each carry their own content, because the stepper has no markers and no labels.
- Use [Tabs](https://flyingsalmon.superbrian.dev/components/tabs) to let the traveller jump between peer panels, because the stepper is never interactive.
- Use [Pagination](https://flyingsalmon.superbrian.dev/components/pagination) to move between the numbered pages of a list.

## Do and don't

- **Do:** Name the current step in words with the bar, under it or beside it.
  **Why:** The bar carries no words and paints the current step the same as the ones already done, so the name is what tells the traveller where they are.
- **Do:** Put the bar inside the card that explains the step, one bar per surface.
  **Why:** The card’s title says what is happening and the bar says how far along it is. Two bars on one surface make the traveller ask which one is theirs.
- **Don't:** Use the bar as a control for going back or skipping ahead.
  **Why:** It has no hover, no focus, and no tab stop. Back and Next buttons beside it move the traveller, or the app advances on its own.
- **Don't:** Fill part of a segment to show partial progress.
  **Why:** A step is either reached or not. Partial progress inside a step is a progress bar’s job.
- **Don't:** Colour the bar to show that a step failed.
  **Why:** The bar only ever shows position. A failure replaces the card around it with an error state and a retry, where the traveller is already looking.
