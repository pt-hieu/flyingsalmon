# Avatar group guidelines

Design guidelines for the flyingsalmon Avatar group component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To show who is on a trip, a plan, or a row at a glance.
- When the roster can grow without a bound, because the group folds the overflow into one chip.

## When not to use

- Use [Avatar](https://flyingsalmon.superbrian.dev/components/avatar) to mark a single person, because the group adds overlap and a tooltip a lone mark does not need.
- Use [Badge](https://flyingsalmon.superbrian.dev/components/badge) for a count with no people behind it, such as places or days.
- Use [Table](https://flyingsalmon.superbrian.dev/components/table) when each person needs an action, such as removing a traveller, because nothing in the group is clickable.

## Do and don't

- **Do:** Show about four faces and let the chip carry the rest.
  **Why:** The group is a glance at who is going, never the full roster. Capping the faces ends every row at the same width, so a list of trips lines up.
- **Don't:** Leave the tooltip as the only place that says who is going.
  **Why:** Touch screens cannot open it, and the faces are a glance, not the record. Wherever the reader must know who is going, write the names as text.
