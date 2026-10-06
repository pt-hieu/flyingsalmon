# Progress guidelines

Design guidelines for the flyingsalmon Progress component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For a long job with a known end and nothing to attach it to, such as building a trip.
- For work that has started but has no computable fraction yet, as an indeterminate bar.

## When not to use

- Use [Spinner](https://flyingsalmon.superbrian.dev/components/spinner) for the busyness of a control the traveller just pressed. The control shows it itself.
- Use [Skeleton](https://flyingsalmon.superbrian.dev/components/skeleton) for a region whose content has not arrived yet, so the page holds its shape while it loads.
- Use [Stepper](https://flyingsalmon.superbrian.dev/components/stepper) for a position in a flow the traveller is walking, such as step 2 of 4.

## Do and don't

- **Do:** Say in words, next to the bar, what phase the work is in.
  **Why:** A bar shows how much, never what. Only the app knows what phase the work is in and how to word it.
- **Do:** When the work already has a heading on the page, write the count there, such as “3 of 7 days written”, and leave the bar out.
  **Why:** The heading is where the traveller is looking, and a bar beside it repeats the count.
- **Don't:** Fake a fraction.
  **Why:** A bar that jumps to 90 percent and waits misreports the work. Use the indeterminate bar until a real number exists.
- **Don't:** Show success or failure on the bar.
  **Why:** The bar only measures. The result appears where the traveller is looking: on the item that changed, or in the surface that acted.
