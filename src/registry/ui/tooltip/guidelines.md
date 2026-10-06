# Tooltip guidelines

Design guidelines for the flyingsalmon Tooltip component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To name an icon-only control: "Add a place", "Share the trip".
- To add a keyboard shortcut to a label.
- To clarify something with one short sentence that the page can do without.

## When not to use

- Use [Icon tooltip](https://flyingsalmon.superbrian.dev/components/icon-tooltip) for an icon that only explains itself and is not a control. Icon tooltip makes it focusable and names it.
- Use [Notice](https://flyingsalmon.superbrian.dev/components/notice) for a reason, a result, or an error. These must be seen, so they go on the page next to what they describe.
- Use [Dialog](https://flyingsalmon.superbrian.dev/components/dialog) for content with links, buttons, or images. A tooltip closes when the pointer leaves, so nothing inside it can be used.

## Do and don't

- **Do:** Keep it to one or two sentences the traveller does not need in order to act. If they must read it, put it on the page.
  **Why:** A tooltip is out of reach on touch, and a screen reader that never focuses the trigger never hears it.
- **Do:** Mark an inline term that carries a tooltip with a dotted underline and a help cursor.
  **Why:** Plain text gives no sign that it explains itself. The underline tells the traveller there is more to read.
- **Don't:** Hide why a control is disabled in a tooltip. Write the reason next to the control.
  **Why:** A disabled control cannot open a tooltip, and the reason is the one thing the traveller needs to move on.
- **Don't:** Put a tooltip on every row.
  **Why:** A few explained terms on a screen stand out. One on every row is noise nobody hovers.
