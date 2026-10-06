# Timeline guidelines

Design guidelines for the flyingsalmon Timeline component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To show a route or an itinerary: cities, legs between them, days of a trip.
- When each item has a title and a line of detail that belong beside its marker.

## When not to use

- Use [Stepper](https://flyingsalmon.superbrian.dev/components/stepper) to show a position in a sequence of known length with no content beside it, because a stepper tracks progress.
- Use [Table](https://flyingsalmon.superbrian.dev/components/table) to compare the same fields across items, because columns line up what a rail cannot.

## Do and don't

- **Do:** Let the marker say what kind of stop it is, and give every stop of one kind the same marker: an icon for a leg, a dot for a place.
  **Why:** The traveller reads the rhythm of the route from its markers before reading a word.
- **Do:** Mark the current stop with a marker of your own, and let it travel to the next stop when the traveller moves on.
  **Why:** The rail gives every stop the same neutral mark, because done, current, and ahead are claims only your app can make. A marker that travels shows the move instead of redrawing the rail.
- **Don't:** Put an action on each stop. The action the route leads to, such as approving it, sits below the whole timeline.
  **Why:** A route is read top to bottom and then acted on once. Buttons on every stop turn it into a list of chores.
- **Don't:** Stretch a link over a whole item.
  **Why:** An item is never a hit target; only its title links. One linked title costs the keyboard user one stop, however many cities the rail holds.
