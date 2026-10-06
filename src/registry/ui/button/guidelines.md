# Button guidelines

Design guidelines for the flyingsalmon Button component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To run an action on the current page: save a trip, send an invite, open a dialog, delete a place.
- To submit a form, as the last control in its actions row.

## When not to use

- Use [Text link](https://flyingsalmon.superbrian.dev/components/text-link) to take the traveller to another page. A link navigates and a button acts, and browsers give links their own keyboard and context-menu behaviour.
- Use [Switch](https://flyingsalmon.superbrian.dev/components/switch) for a setting that is on or off, because the switch shows its state and a button does not.
- Use [Toggle group](https://flyingsalmon.superbrian.dev/components/toggle-group) to pick one option from a small set, because the group shows which option is chosen.
- Use [Dropdown menu](https://flyingsalmon.superbrian.dev/components/dropdown-menu) for more than two secondary actions on one item, so the row keeps one visible action and the rest wait in a menu.

## Do and don't

- **Do:** Give each view, card, dialog footer, and alert one default button. The alternative beside it is outline, and a quiet extra action is ghost.
  **Why:** The filled orange button is where the eye lands first. Two of them make the traveller choose before they act, and the step down to outline and ghost tells them which action matters.
- **Do:** Name the outcome in the label, such as "Replan the rest", and add the cost when the action spends something: "Rewrite 2 days · 1 credit".
  **Why:** The traveller knows what will happen and what it takes from them before they press, so nobody reads the surrounding copy to find out.
- **Do:** Put the outline Cancel on the left of a dialog or form footer and the one default action on the right.
  **Why:** The eye reads the row to its end and lands on the action that finishes the task. Cancel always sits in the same place, so leaving never needs reading.
- **Don't:** Show success or failure on the button.
  **Why:** The result belongs to the thing that changed: the trip updates, the field shows its error, or a notice links back when nothing is on screen.
- **Don't:** Grey out a button while its action runs.
  **Why:** The button shows its own busyness with a spinner beside its label, keeps focus, and ignores repeat presses. A greyed-out button drops focus mid-action and looks broken.
- **Don't:** Hide a button whose action cannot run yet. Leave it visible but disabled, with a line beside it that says what is missing.
  **Why:** The traveller sees where the task ends and learns what to do next, instead of hunting for a button that is not there.
- **Don't:** Show a destructive button before the traveller has asked to remove something.
  **Why:** Red belongs to the step that confirms a removal. As the first button on a view it shouts louder than the work and invites a slip.
