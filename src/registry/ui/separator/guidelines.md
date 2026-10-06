# Separator guidelines

Design guidelines for the flyingsalmon Separator component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- Between siblings that own no border of their own: rows in a list, groups in a toolbar, a panel's heading over its body.

## When not to use

- Use [Card](https://flyingsalmon.superbrian.dev/components/card) to box content, because a card draws its own edge and separates by it.
- Use [Table](https://flyingsalmon.superbrian.dev/components/table) to divide rows of data, because a table keeps a rule under every row already.

## Do and don't

- **Do:** Use rules to divide one surface into blocks, such as the questions on one card.
  **Why:** Whole surfaces already separate by their border and a background step. A rule is for the parts inside one surface, which share its edge.
- **Do:** Put a rule only between items, never before the first or after the last.
  **Why:** A rule divides two things. At either end it divides nothing and reads as a stray border.
- **Do:** Give the rule equal space above and below.
  **Why:** Centred, it belongs to neither neighbour, and the rows and the rules between them keep one rhythm.
- **Don't:** Place a separator beside something that already draws a border.
  **Why:** The boundary is already there, and a second line only doubles it.
- **Don't:** Put words in the rule, as in an “or” between a sign-in form and its other options.
  **Why:** A rule divides and says nothing. Write the “or” as text of its own.
