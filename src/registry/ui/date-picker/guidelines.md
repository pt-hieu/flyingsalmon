# Date picker guidelines

Design guidelines for the flyingsalmon Date picker component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To pick a departure day or a trip range, where the traveller may type a date or browse a month.
- In any form that posts a date: the field writes ISO values into hidden native inputs, so a plain form submits them.

## When not to use

- Use [Calendar](https://flyingsalmon.superbrian.dev/components/calendar) when the calendar itself is the interface, on a page or in a card rather than behind a field.
- Use [Input](https://flyingsalmon.superbrian.dev/components/input) for a date nobody picks, such as a booking reference that happens to contain digits.
- Use [Number field](https://flyingsalmon.superbrian.dev/components/number-field) for a count of days rather than a position on the calendar.

## Do and don't

- **Do:** Use a range for a trip and a single day for moving one date.
  **Why:** A range picks both ends in one panel across two months, so the trip reads as a span. Moving one booking needs no second end to ignore.
- **Do:** Label the field with the question, such as "When" or "New date", never with the control’s name.
  **Why:** The segments already show it is a date. The label says what the date is for.
- **Don't:** Let the traveller pick a day the trip cannot use and refuse it on submit.
  **Why:** Bound the field from the trip itself, such as today onwards. Refused days are struck through in the grid and rejected as they are typed, so no error arrives after the traveller thinks they are done.
- **Don't:** Show an error while a date is still being typed.
  **Why:** A half-typed date is not wrong yet. The field stays silent until every segment is filled, and only then says whether the day is available.
