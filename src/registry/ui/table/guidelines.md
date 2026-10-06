# Table guidelines

Design guidelines for the flyingsalmon Table component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To compare the same fields across many items: stops on a trip, travellers and their roles, bookings and their costs.
- When a reader scans down a column more than across a row.

## When not to use

- Use [Card](https://flyingsalmon.superbrian.dev/components/card) to show one item with several fields, because a card gives each item its own edge and room.
- Use [Timeline](https://flyingsalmon.superbrian.dev/components/timeline) to show events in order with content beside each, because a timeline joins them with a connector.
- Use [Form](https://flyingsalmon.superbrian.dev/components/form) to hold form fields in a grid, because a table announces a data relationship that fields do not have.

## Do and don't

- **Do:** Right-align numeric columns and leave labels left.
  **Why:** Aligned digits are what let a reader compare two amounts by place value.
- **Do:** Close a column of amounts with a Total row in the footer.
  **Why:** The sum lands under the last amount, where the eye arrives after reading down, and the footer’s heavier weight sets it apart from the rows it adds up.
- **Do:** In a before-and-after table, set the column that holds the outcome in medium weight.
  **Why:** The reader compares what is with what will be, and the column that will be true is the one to read.
- **Don't:** Label a column that holds only controls.
  **Why:** The button already names the action. A label above it repeats the words and sits far from them, because the controls are right-aligned.
- **Don't:** Let a row react to the pointer when nothing happens on click.
  **Why:** The hover step tells a reader the row leads somewhere. A background change that leads nowhere reads as an affordance that is not there.
