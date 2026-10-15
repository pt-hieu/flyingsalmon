# Form guidelines

Design guidelines for the flyingsalmon Form component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To lay out two or more fields with an actions row, on a page or in a card.
- In a dialog body, where the dialog owns the footer, closes on submit, and leaves the result to the changed item.

## When not to use

- Use [Input](https://flyingsalmon.superbrian.dev/components/input) for a single field with no submit step, such as a search box. Put the field on the page directly.

## Do and don't

- **Don't:** Lock the fields while the form submits.
  **Why:** Only the submit button shows busyness. The fields stay editable, so a typo can be fixed while the request runs.
- **Do:** Show a failure or success of the whole form below the actions row, and a failure of one field on that field.
  **Why:** The whole-form result appears under the button the traveller just pressed, so their attention is already there and the button never moves. A field failure points at exactly what to fix.
- **Do:** When the submit cannot run yet, say why in a muted line beside it in the actions row, such as "3 questions left".
  **Why:** The traveller reads the reason where they reached for the action, and knows what to answer next.
