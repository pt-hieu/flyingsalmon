# Sticker guidelines

Design guidelines for the flyingsalmon Sticker component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To mark a moment: a finished trip, a first visit, a page with nothing on it yet.
- Beside a title that says the same thing in words.

## When not to use

- Use [Badge](https://flyingsalmon.superbrian.dev/components/badge) to label a status or a count, because a badge is small, static, and states the state in words.
- Use [Empty state](https://flyingsalmon.superbrian.dev/components/empty-state) to tell the traveller a page is empty, with a sticker beside the message rather than in place of it.

## Do and don't

- **Do:** Keep a title beside the sticker that says what it says.
  **Why:** The art is decoration with a job. It never replaces the words.
- **Do:** Use one sticker per screen, tilted a few degrees.
  **Why:** The tilt makes it read as stuck on rather than laid out in the grid, and a second sticker would compete for the same moment.
- **Do:** Put a sticker beside the heading of a long wait, such as a trip being planned.
  **Why:** The spinner says work is under way and the sticker turns the wait into a moment, so the screen never reads as empty.
- **Don't:** Lay a sticker over text or controls.
  **Why:** A sticker may bleed off the edge of its panel, but it never hides a word or catches a press meant for a control.
- **Don't:** Use a sticker for a routine state the traveller sees on every visit.
  **Why:** Stickers are kept for moments. Seen every time, one stops reading as a moment and becomes wallpaper.
