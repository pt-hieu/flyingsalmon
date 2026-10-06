# Icon tooltip guidelines

Design guidelines for the flyingsalmon Icon tooltip component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To name a status icon that sits on its own: locked, tied to a date, a category.
- For an icon inside a row or card whose whole surface is a link.

## When not to use

- Use [Tooltip](https://flyingsalmon.superbrian.dev/components/tooltip) to label a button or any other control. The control is already focusable, so wrap it directly.
- Use [Badge](https://flyingsalmon.superbrian.dev/components/badge) for an icon beside text that already says the same thing. The icon is then decoration.

## Do and don't

- **Do:** Use it for a glyph that repeats across rows, such as a lock or an activity type, that would otherwise need a legend.
  **Why:** The traveller learns the glyph once by pointing at it, and the page carries no key.
- **Do:** Keep status and category icons small and muted, grouped at the edge of the row with its other details.
  **Why:** They are a quiet second read beside the content, not something to act on.
- **Don't:** Make the icon the only place a reason lives. The row already says why a day is locked; the icon repeats it.
  **Why:** Like any tooltip, it is out of reach on touch. It adds to what the page already says.
