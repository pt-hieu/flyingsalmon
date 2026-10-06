# Spinner guidelines

Design guidelines for the flyingsalmon Spinner component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For an action that is running: a form submits, a setting saves, a check is under way.
- Inline beside the text that says what is being waited for.

## When not to use

- Use [Skeleton](https://flyingsalmon.superbrian.dev/components/skeleton) for a region that is loading, such as a list, a card, or a page. The placeholder holds the shape of what is coming.
- Use [Progress](https://flyingsalmon.superbrian.dev/components/progress) for a long job with a known end, where the traveller wants to see how far along it is.

## Do and don't

- **Do:** Place a small spinner inline, directly before the words that say what is happening.
  **Why:** The spinner says something is running and only the words say what, so they belong together.
- **Do:** On a long wait, pair the spinner with a written count, such as “3 of 7 days written”.
  **Why:** A count tells the traveller how far along the work is in their own terms, with no bar beside the heading.
- **Do:** Pick a spinner or a skeleton for a given wait, never both.
  **Why:** They answer different questions: a spinner says an action is running, a skeleton says a region is loading. Both together say it twice.
- **Don't:** Replace a control the traveller just pressed with a spinner.
  **Why:** The control should show its own busyness and keep its place, as the loading button does.
