# Number field guidelines

Design guidelines for the flyingsalmon Number field component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For a quantity the traveller adjusts: travellers, nights, a budget.
- When the value is arithmetic input and the field must report a number, with bounds you can enforce.

## When not to use

- Use [Input](https://flyingsalmon.superbrian.dev/components/input) for a numeric string nothing does arithmetic on, such as a booking reference or a phone number.
- Use [Slider](https://flyingsalmon.superbrian.dev/components/slider) when the traveller sets an approximate value on a range and the exact figure does not matter.

## Do and don't

- **Do:** Give every quantity its unit: "$" before a budget, "people" after a group size.
  **Why:** The number reads as a phrase, so nobody wonders whether 4 means nights or travellers.
- **Do:** Bound the field by the real limits of what it counts, such as 2 to 30 people.
  **Why:** The field and its spin buttons refuse the impossible as the traveller enters it, so no error has to arrive afterwards.
- **Don't:** Stretch the field across the form column.
  **Why:** A quantity is a few digits. A field sized to its number reads as a count; a wide one looks like it wants a sentence.
- **Do:** Offer a slider beside the exact entry when "roughly" is a fair answer, and let the traveller swap between them.
  **Why:** A traveller who knows the figure types it, and one who does not can still answer without guessing a precise number.
- **Don't:** Lock the field while a background check runs.
  **Why:** A spinner takes the place of the spin buttons and the field stays typeable. Only the submit button locks a flow.
