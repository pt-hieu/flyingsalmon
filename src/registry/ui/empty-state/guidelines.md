# Empty state guidelines

Design guidelines for the flyingsalmon Empty state component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- When a page, a list, or a card is legitimately empty: no trips yet, no places saved, nobody invited.
- When a link leads to a page with nothing in it, such as an expired share link.

## When not to use

- Use [Skeleton](https://flyingsalmon.superbrian.dev/components/skeleton) when a region is still fetching. The placeholder holds the shape of what is coming.
- Use [Error state](https://flyingsalmon.superbrian.dev/components/error-state) when a region’s content failed to arrive. That is a failure, and it is announced.

## Do and don't

- **Do:** Title the block with a plain statement or a short question, and say in the description what the traveller can do next.
  **Why:** A resting state with no next step leaves the traveller to guess whether something broke.
- **Do:** Offer one action: filled when it starts something, outline when it only leads out.
  **Why:** One button is an obvious next step, and its fill tells the traveller whether it begins something or takes them back.
- **Do:** Give a friendly empty a sticker, and a dead end, such as a trip that does not exist, an icon.
  **Why:** The sticker invites the traveller to begin. The icon says plainly that there is nothing here to begin.
- **Do:** Keep a block inside a card quieter than one that fills a page.
  **Why:** The card already carries the heading weight, so the block inside it steps down.
- **Don't:** Use an empty state while content is loading.
  **Why:** A skeleton holds the shape of what is coming. The one exception is long work that runs in the background with nothing to draw yet: there, an empty state that says the traveller is free to leave tells the truth.
- **Don't:** Frame the block itself. Place it in a card when it needs a boundary.
  **Why:** On a page it is the page’s own message, and in a card it is the card’s. A frame of its own would compete with both.
