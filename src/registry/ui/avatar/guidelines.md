# Avatar guidelines

Design guidelines for the flyingsalmon Avatar component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To mark one person: the signed-in traveller in the sidebar, an author on a comment, an assignee on a row.
- Beside the person’s name, or alone when the name appears elsewhere on the screen.

## When not to use

- Use [Avatar group](https://flyingsalmon.superbrian.dev/components/avatar-group) to show several people as one cluster, because it overlaps the faces and folds the rest into a count.
- Use [Badge](https://flyingsalmon.superbrian.dev/components/badge) for a status or a count, because an avatar is a person and never reads as a state.
- Use [Button](https://flyingsalmon.superbrian.dev/components/button) when a click must do something, by wrapping the avatar rather than using it bare.

## Do and don't

- **Do:** Give a person the same colour on every screen.
  **Why:** A person whose colour changes between pages reads as a different person.
- **Don't:** Colour an avatar when nobody on the screen needs telling apart.
  **Why:** Colour exists to separate people. One person beside their name needs none, and the neutral circle keeps the eye on the name.
- **Do:** Use the small avatar beside a name in navigation and list rows, and the default size where the person is the subject.
  **Why:** In a row the name identifies the person and the face is a glance, so it stays below the height of the text beside it.
- **Don't:** Use an orange or a status colour for a person.
  **Why:** Orange is the brand and the status hues report state, so the six group colours leave them out and an avatar never reads as an action or a warning.
