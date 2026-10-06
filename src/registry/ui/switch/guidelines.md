# Switch guidelines

Design guidelines for the flyingsalmon Switch component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For a setting that takes effect the moment it flips, such as offline maps or link sharing.
- For an on or off state the traveller will want to see at a glance.

## When not to use

- Use [Checkbox](https://flyingsalmon.superbrian.dev/components/checkbox) for a yes or no that a form collects and submits later. A checkbox says the value waits for a submit.
- Use [Toggle group](https://flyingsalmon.superbrian.dev/components/toggle-group) to choose between two named options such as "Day" and "Night". A switch means on or off, not this or that.
- Use [Button](https://flyingsalmon.superbrian.dev/components/button) for an action that runs once and has no state to show.

## Do and don't

- **Do:** Label the switch with the setting, not the state: "Offline maps", not "Turn on offline maps".
  **Why:** The thumb already shows on or off, so a label that names the state can contradict it.
- **Do:** Put the switch on the row of the thing it changes, such as "For the whole group" beside a budget.
  **Why:** The traveller sees the setting and its effect together, and the figure beside it changes the moment the switch flips.
- **Do:** Move the thumb when a saved change lands, and leave it where it was if the change fails.
  **Why:** The switch never claims a state the server does not hold, so what the traveller sees is what is saved.
- **Don't:** Show a failed toggle as an error on the switch.
  **Why:** A failed toggle is an action result, not a field error. It appears on the setting’s row with a retry, where the traveller is already looking.
- **Don't:** Grey out a switch while its change applies.
  **Why:** The thumb pulses, focus stays put, and repeat presses are ignored. A greyed-out switch drops focus mid-action and looks unavailable.
