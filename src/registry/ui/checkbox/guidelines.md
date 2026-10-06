# Checkbox guidelines

Design guidelines for the flyingsalmon Checkbox component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To record a yes or no that a form collects and submits later, such as accepting a policy.
- To pick any number of options from a short list, each one independent of the others.

## When not to use

- Use [Switch](https://flyingsalmon.superbrian.dev/components/switch) for a setting that takes effect the moment it flips. A switch shows that it applies at once and shows its own busyness.
- Use [Radio group](https://flyingsalmon.superbrian.dev/components/radio-group) when exactly one option must be chosen, because a checkbox cannot enforce a single answer.
- Use [Combobox](https://flyingsalmon.superbrian.dev/components/combobox) to pick several options from a long list, where a column of boxes is too tall to scan.

## Do and don't

- **Do:** Write the label so a tick reads as yes: "Tell travellers when the itinerary changes".
  **Why:** A ticked box then means agreement, and nobody has to work out what an unticked one means.
- **Don't:** Word a label in the negative, such as "Don’t send me updates".
  **Why:** A tick on a negative makes the traveller undo a double negative before they know what they agreed to.
- **Do:** Stack independent options in one column, each naming its own subject: "Repair Day 3 · 12 Oct: museum".
  **Why:** The list reads as a set of sentences, and each box stands on its own without a heading to decode it.
- **Do:** Put a "Decide for me" box directly under a question the traveller may hand over, and dim the field above while it is ticked.
  **Why:** The traveller sees what they gave away, and unticking brings their own answer back where they left it.
- **Do:** Show the mixed state only on a parent whose children differ.
  **Why:** It tells the traveller that some of the group is selected, and a click resolves it to all or none.
