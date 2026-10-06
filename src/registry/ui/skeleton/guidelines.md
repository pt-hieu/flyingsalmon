# Skeleton guidelines

Design guidelines for the flyingsalmon Skeleton component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For a region whose shape is known and whose content has not arrived: a list, a card, a page on first load.

## When not to use

- Use [Spinner](https://flyingsalmon.superbrian.dev/components/spinner) for an action that is running, such as a form submitting. The control shows its own busyness.
- Use [Progress](https://flyingsalmon.superbrian.dev/components/progress) for a long job with a known end, where the traveller wants to see how far along it is.
- Use [Empty state](https://flyingsalmon.superbrian.dev/components/empty-state) when the region is legitimately empty. A skeleton says content is coming, and none is.

## Do and don't

- **Do:** Draw the real layout: the same cards, borders, grid, and number of sections, with lines that vary in width like text.
  **Why:** A placeholder that matches the real content lets it arrive without the page jumping.
- **Do:** Use a rectangle for an image or a bar, and text lines for words.
  **Why:** Each placeholder hints at what will fill it, so the traveller reads the page before it arrives.
- **Don't:** Swap a control the traveller just pressed for a skeleton.
  **Why:** The control should stay and show its own busyness. A skeleton in its place makes the action vanish. A wait gets a spinner or a skeleton, never both.
