# Slider guidelines

Design guidelines for the flyingsalmon Slider component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To pick a level from a short run of steps, such as a pace or a budget band.
- When the steps have a meaning you can write in a sentence.

## When not to use

- Use [Number field](https://flyingsalmon.superbrian.dev/components/number-field) when the traveller knows the exact number to enter, such as a budget of $1,200. A slider makes them hunt for it.
- Use [Toggle group](https://flyingsalmon.superbrian.dev/components/toggle-group) for a few named options with no order, because a track implies one.
- Use [Date picker](https://flyingsalmon.superbrian.dev/components/date-picker) to pick a date.

## Do and don't

- **Do:** Keep to about seven steps, each a level the traveller could name.
  **Why:** A dot marks every step, so a long run turns the track into a dotted line with no meaning.
- **Do:** Say under the track what the current step means, with its consequence: "$150 a day per person for 7 days, before flights".
  **Why:** The description is the only place that says where the thumb is, and a figure the traveller can weigh turns a position into a decision.
- **Don't:** Mark the ends of the track with their own figures.
  **Why:** End labels make the traveller interpolate. The description already names the step the thumb is on.
- **Do:** Offer an exact entry beside the slider, one ghost button away, when the traveller may already know the figure.
  **Why:** The slider answers "roughly". A traveller who knows their number should type it, not hunt for it on a track.
