# Badge guidelines

Design guidelines for the flyingsalmon Badge component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To label the state of a thing: a trip is booked, a payment failed, a visa is expiring.
- To tag a category or show a small count beside a label.

## When not to use

- Use [Button](https://flyingsalmon.superbrian.dev/components/button) when the marker must do something on press, because a badge takes no focus and nothing inside it is interactive.
- Use [Notice](https://flyingsalmon.superbrian.dev/components/notice) to report the result of an action, because a result belongs on the item that changed or in a notice that links back to it.
- Use [Avatar](https://flyingsalmon.superbrian.dev/components/avatar) to mark a person, because a person has a face and a name.

## Do and don't

- **Don't:** Give the normal state a badge.
  **Why:** An exception reads at a glance only against plain rows. When every item wears a badge, none of them stands out.
- **Do:** Name the state in the label, such as Booked or Date clash.
  **Why:** Colour only reinforces the word. A reader who cannot tell orange from green still has to learn the state.
- **Do:** Keep the orange badge for what is live right now, such as today or a trip underway.
  **Why:** Orange is the loudest colour on the page, so it marks the one thing happening now. A finished state is green, a fact or an absence takes the outline, and quiet metadata takes the grey badge.
- **Do:** Paint a condition that already holds, such as a failed payment, in error red.
  **Why:** Error red reports a condition. Destructive red names an action a person can take, such as delete, and belongs to the destructive button.
- **Do:** Add an icon to a state that needs attention or is done, and leave neutral states as words.
  **Why:** The icon gives the states that matter a shape the eye catches before it reads, so a warning stands out from a row of quiet labels.
- **Don't:** Put more than one state badge on an item.
  **Why:** Each badge asks to be read, and a second state means the first is not the one that matters. Put the rest in the item’s details. Category tags are the exception and sit together as a quiet row.
