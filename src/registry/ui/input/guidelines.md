# Input guidelines

Design guidelines for the flyingsalmon Input component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For one line of free text: a trip name, an email address, a phone number, a booking link.
- For a value the traveller types rather than picks, where any text is acceptable input.

## When not to use

- Use [Number field](https://flyingsalmon.superbrian.dev/components/number-field) when the value is a quantity. It formats for the page’s locale, clamps to its bounds, and reports a number instead of a string.
- Use [Textarea](https://flyingsalmon.superbrian.dev/components/textarea) for notes that run past one line, because it grows with what the traveller types.
- Use [Combobox](https://flyingsalmon.superbrian.dev/components/combobox) when the traveller picks a place, a person, or any value from a list you control.
- Use [Date picker](https://flyingsalmon.superbrian.dev/components/date-picker) for a calendar day or a range of days, so the segments and the grid refuse impossible dates.

## Do and don't

- **Do:** Give every input a visible label above it, and use the placeholder for an example answer such as linh@example.com.
  **Why:** The label asks the question and stays put. A placeholder disappears as soon as the traveller types, so it only ever shows the shape of a good answer.
- **Do:** Show a failed check on the field that caused it, and clear it the moment the traveller edits.
  **Why:** The border, the label, and the message sit next to the text that caused the failure. Clearing on the first keystroke shows the field is listening, not scolding.
- **Don't:** Lock the field while it checks a value.
  **Why:** A spinner in the end slot shows the check and the field stays editable, so a typo can be fixed while it runs. Only the submit button locks a flow.
- **Do:** Put the copy action for a read-only value inside the field, as a ghost icon button, and confirm the copy in a muted line under the field.
  **Why:** The action sits next to the value it acts on, and the confirmation appears where the traveller is already looking.
- **Don't:** Stretch a field across the whole column when its answer is short.
  **Why:** The width tells the traveller how long an answer you expect. A postcode in a full-width field looks like it wants a paragraph.
