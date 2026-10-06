# Dialog guidelines

Design guidelines for the flyingsalmon Dialog component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For a short form that creates or edits one thing: plan a trip, add a place, edit a traveller.
- To confirm an action that cannot be undone, such as deleting a trip.

## When not to use

- Use [Drawer](https://flyingsalmon.superbrian.dev/components/drawer) for content that accompanies the page, such as filters or the detail of a row. A drawer sits at the edge and leaves the page in view; a dialog stops it.
- Use [Notice](https://flyingsalmon.superbrian.dev/components/notice) to report a result. A dialog demands a decision; a result needs only to be seen.
- Use [Stepper](https://flyingsalmon.superbrian.dev/components/stepper) for a long task with several stages, which deserves a page of its own and a visible sense of progress.

## Do and don't

- **Do:** Close a form dialog on submit and show the result on the item that changed.
  **Why:** The new trip appearing in the list is the clearest success there is, and nobody waits for the server with a modal in their face.
- **Do:** If the save fails after the dialog has closed, keep the error on screen as a notice that reopens the dialog with what the traveller typed.
  **Why:** The dialog is gone, so the notice is the one home that stays until it is seen, and nothing typed is lost.
- **Don't:** Make the traveller wait inside a dialog for a plain save.
  **Why:** A dialog waits on the server only when the next screen depends on the answer, such as checking an invite code. Then the confirm button shows its own loading, and Cancel waits disabled until the answer arrives.
- **Do:** Show a field error under its field and keep the dialog open.
  **Why:** The traveller is still looking at the form, so the error belongs under the field they need to fix.
- **Do:** Show a blocker no field can fix, such as too few credits, as an error alert above the footer with a link out, and keep the confirm button disabled.
  **Why:** The traveller learns why they cannot go on where they are already looking, and the link is the way to fix it.
- **Do:** End on one outline Cancel beside one filled button that names the action: "Delete trip", not "OK".
  **Why:** One filled button marks the single way forward, and its label is the last thing read before the decision.
- **Don't:** Open a dialog from a dialog. Confirm a step inside it with an inline alert that carries its own buttons.
  **Why:** Two modals deep, the traveller loses track of which one they are answering. An inline confirmation stays inside the task they started.
