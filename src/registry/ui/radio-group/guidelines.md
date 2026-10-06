# Radio group guidelines

Design guidelines for the flyingsalmon Radio group component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To pick exactly one option from two to five choices, where seeing every option helps the decision.
- For an answer a form collects and submits later, such as a room type or a cost split.

## When not to use

- Use [Toggle group](https://flyingsalmon.superbrian.dev/components/toggle-group) when the traveller must be able to clear the choice, because a radio group cannot be emptied once it holds a value.
- Use [Select](https://flyingsalmon.superbrian.dev/components/select) for more than about five options, where the list outgrows the form.

## Do and don't

- **Do:** Ask the question once, as the label above the options, and let each option be only an answer: "Who pays for dinners?"
  **Why:** The traveller reads the question once and then scans the answers. Repeating it in every option buries the difference between them.
- **Do:** Spell out the consequence when an option is a sentence: "Keep it booked: the rest of the day moves around it".
  **Why:** The traveller chooses an outcome they can see, not a label they have to decode.
- **Do:** Preselect the option most travellers want when any answer is harmless.
  **Why:** The default saves the click, and a traveller who wants something else sees every alternative beside it.
- **Don't:** Preselect an answer the traveller must choose deliberately.
  **Why:** A preselected answer gets accepted without being read. Leave the group empty, and a skipped group fails on submit with the message on the group itself.
- **Do:** Put a "Decide for me" option last.
  **Why:** The real answers come first, so the way out is there for the unsure without tempting everyone else.
- **Don't:** Offer a single option on its own.
  **Why:** One option offers no choice and cannot be unselected. A yes or no is a checkbox.
- **Don't:** Lay options in a row unless each label is a word or two.
  **Why:** Longer labels wrap unevenly across the row and the options stop lining up. A column of sentences reads top to bottom.
