# Alert guidelines

Design guidelines for the flyingsalmon Alert component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To report the result of a form submit, in the form’s result slot below the actions row.
- To show a warning or notice that belongs to a region of the page and should sit in the flow beside it.

## When not to use

- Use [Notice](https://flyingsalmon.superbrian.dev/components/notice) for a result with no visible home, such as the outcome of a dialog form that has already closed. A notice stays on screen and links back to its subject.
- Use [Error state](https://flyingsalmon.superbrian.dev/components/error-state) when a region failed to load. The region itself says so, with a retry.
- Use [Fields](https://flyingsalmon.superbrian.dev/fields) for the error on a single field. The field shows its own error beside its input.

## Do and don't

- **Do:** Place the alert where the traveller is already looking, and keep it until they have seen it.
  **Why:** A message that appears elsewhere or disappears on a timer is missed, and a missed failure looks like a success.
- **Do:** Pick the variant by what the traveller must do: error for a failure, warning for something to check, success and info for the rest.
  **Why:** The colour and icon tell the traveller whether to stop, check, or carry on before they read a word.
- **Do:** Write the title as what happened, in a sentence, and the description as what to do next or what was kept. Put the way forward inside the alert as a link or a button.
  **Why:** The traveller reads the fact, then finds the next step without leaving the message.
- **Do:** Show a standing condition, such as trips saved only in this browser, as a warning at the top of the page with its action inside.
  **Why:** It stays true until the traveller acts, so it sits where every visit starts.
- **Don't:** Let an alert vanish on a timer. It goes when the traveller closes it or the state it reports ends.
  **Why:** A message that removes itself cannot be read at the traveller’s pace.
- **Don't:** Stack several alerts for one result.
  **Why:** Several messages for one result make the traveller work out which one matters. Write one alert that says it. A separate condition, such as each day that clashes, gets its own.
