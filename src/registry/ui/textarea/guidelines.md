# Textarea guidelines

Design guidelines for the flyingsalmon Textarea component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For text that runs past one line: trip notes, a day-by-day itinerary, a message to the group.
- When the length is up to the traveller and you want the field to grow instead of scrolling inside a fixed box.

## When not to use

- Use [Input](https://flyingsalmon.superbrian.dev/components/input) for one line of text such as a trip name or an email address.
- Use [Combobox](https://flyingsalmon.superbrian.dev/components/combobox) when the traveller picks from options you control rather than writing freely.

## Do and don't

- **Do:** Make the empty field as tall as the answer you expect: two or three rows for a sentence, more for notes.
  **Why:** The empty height tells the traveller how much to write. A one-row field invites a one-word answer.
- **Do:** Write the placeholder as a full example answer, such as "We land late, so keep the first evening free."
  **Why:** A real sentence shows the kind and length of answer you want, and reads as an invitation rather than a blank to fill.
- **Do:** Word an error as what to write: "Tell us why you are leaving the plan, even in a few words."
  **Why:** The traveller fixes a free-text field by writing, so the message hands them the start of the answer.
- **Don't:** Offer a submit shortcut without a visible hint beside the submit button.
  **Why:** Enter always makes a new line here, so a shortcut is invisible unless the screen names it. A hidden key only helps people who already guess it exists.
- **Don't:** Lock the field while an autosave runs.
  **Why:** A spinner in the corner shows the save and the traveller keeps typing; the next save picks up the new text.
- **Don't:** Give the field a drag handle or a fixed height.
  **Why:** The height follows the content up to a cap and then the field scrolls, so a manual size would fight it.
