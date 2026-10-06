# Toggle group guidelines

Design guidelines for the flyingsalmon Toggle group component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To answer a question with chips that wrap, such as interests or a trip pace.
- When the traveller may choose several options, or may want to clear a single choice.

## When not to use

- Use [Radio group](https://flyingsalmon.superbrian.dev/components/radio-group) when exactly one option must always be chosen and a clear option is not wanted. A radio group cannot be emptied.
- Use [Tabs](https://flyingsalmon.superbrian.dev/components/tabs) to switch the panel underneath a heading. A toggle group answers a question; tabs navigate.
- Use [Badge](https://flyingsalmon.superbrian.dev/components/badge) for a read-only summary, such as the activity types of a trip or the values echoed back on a review screen. A chip the traveller cannot press is not a toggle.
- Use [Switch](https://flyingsalmon.superbrian.dev/components/switch) for a setting that is only on or off.

## Do and don't

- **Do:** State the cap in the label when there is one: "Pick up to 3 interests".
  **Why:** The group shows no counter. When the remaining chips dim at the cap, the label is the reason on screen.
- **Don't:** Hide the chips the traveller can no longer pick.
  **Why:** They dim in place, so the row keeps its shape and the traveller sees what they could swap in by unpressing another.
- **Do:** Keep each chip to a word or two, with a leading icon where it speeds the scan.
  **Why:** Chips wrap across lines, and short labels keep the rows even. An answer that needs a sentence belongs in a radio group.
- **Don't:** Let a "Decide for me" chip stay pressed beside other chips.
  **Why:** Handing the choice over and making it yourself cannot both be true. Pressing it clears the others, and pressing another clears it, so the row never contradicts itself.
