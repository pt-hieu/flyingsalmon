# Combobox guidelines

Design guidelines for the flyingsalmon Combobox component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To choose from a list too long to scan, where typing is faster: a destination, a departure city.
- To collect several values as chips: interests, the travellers on a trip.
- When the right answer may not be on the list, with allowFreeText.

## When not to use

- Use [Select](https://flyingsalmon.superbrian.dev/components/select) for a short, fixed list such as a cabin class, where scanning beats typing.
- Use [Radio group](https://flyingsalmon.superbrian.dev/components/radio-group) for two to five options that should all stay visible while the traveller decides.
- Use [Input](https://flyingsalmon.superbrian.dev/components/input) for free text that needs no suggestions.

## Do and don't

- **Do:** When a search finds nothing, say so in the panel and say what to try next: "No city or country called Kyto. Check the spelling, or try the country."
  **Why:** A panel that never opens looks broken. The empty row shows the search ran and points the traveller at their next attempt.
- **Do:** Tell look-alike results apart with a muted region after each name, such as "Portland · Oregon".
  **Why:** Many places share a name. The region lets the traveller pick the right one at a glance, without opening a map.
- **Don't:** Give every item the same icon.
  **Why:** An icon earns its place by telling kinds apart, such as a city from a country. The same icon on every row is noise.
- **Do:** Once a field holds chips, change its placeholder to invite another, such as "Add another".
  **Why:** The chips show the answer so far, and the prompt says more is welcome, so a traveller with one destination knows the field takes several.
- **Don't:** Open the panel on focus.
  **Why:** Tabbing through a form would throw a panel over the next field. The panel opens on typing, the arrow keys, or the chevron.
