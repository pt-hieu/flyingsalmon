# Calendar guidelines

Design guidelines for the flyingsalmon Calendar component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- When the calendar is the interface itself: a page or a card where the traveller scans a month to choose a day.
- To show two months side by side so a trip that crosses a month end is visible at once.

## When not to use

- Use [Date picker](https://flyingsalmon.superbrian.dev/components/date-picker) when a date belongs in a form. It adds the label, the typed segments, the error, and the hidden inputs around this grid.

## Do and don't

- **Do:** Strike through the days the traveller cannot pick, and keep them in the grid.
  **Why:** The month keeps its shape, so the weekdays still line up, and the traveller sees the day exists but is taken.
- **Do:** Show two months side by side when a trip can cross a month end.
  **Why:** Both ends of the trip stay in view. Paging away from the start day to find the end loses the traveller’s place.
- **Don't:** Put a failure message on the grid.
  **Why:** The grid carries no label and no message. A failed date shows on the field or card that hosts the calendar, where the traveller reads the question.
- **Don't:** Fix a date in a read-only calendar without saying why.
  **Why:** A grid that ignores presses looks broken. A line beside it turns the refusal into information.
