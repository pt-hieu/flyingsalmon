# Accordion guidelines

Design guidelines for the flyingsalmon Accordion component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For secondary information that helps some readers: an FAQ, the detail behind a booking, a packing list.
- When the page should stay clean without the extra content and the panels can stay in document flow.
- For a single collapsible region: a one-item accordion covers it, so there is no separate collapsible.

## When not to use

- Use [Tabs](https://flyingsalmon.superbrian.dev/components/tabs) to switch between co-equal views of the same subject. Tabs swap the content in place, an accordion reveals more of it.
- Use [Card](https://flyingsalmon.superbrian.dev/components/card) for content every reader needs. Hiding it behind a click costs them a step.
- Use [Dialog](https://flyingsalmon.superbrian.dev/components/dialog) for content that stops the page or needs an answer.

## Do and don't

- **Do:** Keep a result inside the panel that produced it.
  **Why:** The traveller is looking at that panel, so the result below the actions row is where it will be seen, and it stays until they have.
- **Do:** Write each trigger as the item’s name, with a muted line that sums up what the panel holds.
  **Why:** A closed accordion is the table of contents. When every trigger reads on its own, the closed stack is a recap the reader scans without opening anything.
- **Do:** Start every item closed unless the reader needs it on arrival.
  **Why:** The accordion holds what helps some readers, so the page opens on what every reader needs.
- **Do:** Put a recap of what is settled above the step it leads to, outside that step’s card.
  **Why:** Earlier answers stay one press away while the current question stays the focus of the screen.
- **Don't:** Give a trigger any job but opening its panel.
  **Why:** A row that opens and also acts makes every press a guess. The controls live in the panel, where the reader has chosen to look.
- **Don't:** Box the stack or add a fill to open panels.
  **Why:** The accordion is a flush divider list, and an open panel is the page continued, not a new surface.
