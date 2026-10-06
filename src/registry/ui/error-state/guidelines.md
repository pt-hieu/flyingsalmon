# Error state guidelines

Design guidelines for the flyingsalmon Error state component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- When a region that was meant to fill could not: the places did not load, the trip failed to plan.
- As the failed state of the affected item, with a retry where the traveller is already looking.

## When not to use

- Use [Alert](https://flyingsalmon.superbrian.dev/components/alert) for a form’s error. It belongs to the acting surface, in the form’s result slot.
- Use [Notice](https://flyingsalmon.superbrian.dev/components/notice) for a result with no visible home, such as a dialog form that has closed.
- Use [Empty state](https://flyingsalmon.superbrian.dev/components/empty-state) when the region is legitimately empty and nothing went wrong.

## Do and don't

- **Do:** Say what happened and what was kept, then offer a retry and a way back to the input.
  **Why:** The traveller needs to know nothing was lost before they will try again.
- **Do:** Make retry the filled action, and let it show its own loading while the block stays in place. When a retry costs credits, the button says how many.
  **Why:** The traveller sees the attempt running where they pressed, and knows the price before they pay it.
- **Don't:** Add red, an error icon, or an alert inside the block. A failure looks like an empty state with its own sticker and title.
  **Why:** Plain words and a broken-thing sticker say something went wrong. Red on top turns a failure the traveller can recover from into an alarm.
- **Don't:** Shrink a failed region to a banner. The block takes the place of the content that failed, at its size.
  **Why:** The traveller looks for the content where it belongs, and finds the failure and its retry there.
