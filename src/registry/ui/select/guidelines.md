# Select guidelines

Design guidelines for the flyingsalmon Select component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To choose one value from a short, fixed list: a currency, a travel style, who can see a trip.
- When the options need groups, icons, or a disabled entry that stays visible.

## When not to use

- Use [Combobox](https://flyingsalmon.superbrian.dev/components/combobox) when the list is long enough that the traveller must search, or the options arrive from a server.
- Use [Radio group](https://flyingsalmon.superbrian.dev/components/radio-group) for two to five options that should all stay visible while the traveller decides.
- Use [Toggle group](https://flyingsalmon.superbrian.dev/components/toggle-group) when a short set of options changes a view or a filter rather than a field value.

## Do and don't

- **Do:** Write each item as a phrase that finishes the label’s decision, such as "Move to Day 3 · 12 Oct".
  **Why:** The label and the choice read as one sentence, and the trigger shows the same phrase once it is chosen, so the answer explains itself.
- **Don't:** Preselect an answer that changes the trip.
  **Why:** An empty trigger with an instruction such as "Choose where it goes" makes the choice deliberate. Left unanswered, the field fails on submit with a message that names the choice.
- **Do:** List an opt-out such as "Drop it" first, in plain text like every other item.
  **Why:** Leaving something out is a fair answer, not a warning. First place makes it easy to find without making it louder than the rest.
- **Do:** Keep a sold-out or unavailable option in the list, disabled.
  **Why:** The list keeps its shape, and the traveller sees the option exists instead of wondering where it went.
- **Don't:** Let an item’s icon say something its text does not.
  **Why:** The icon only decorates. The trigger shows the text alone once the item is chosen, so the words must carry the whole meaning.
