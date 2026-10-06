# Pagination guidelines

Design guidelines for the flyingsalmon Pagination component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To page through one list or table whose page count is known, such as the places saved to a trip.
- When the traveller needs to land on a specific page and come back to it, in the URL or in state.

## When not to use

- Use [Stepper](https://flyingsalmon.superbrian.dev/components/stepper) for a position in a short sequence someone is walking, because stepper only shows where they are and never navigates.
- Use [Breadcrumb](https://flyingsalmon.superbrian.dev/components/breadcrumb) to climb the levels above the current page, because pagination moves across siblings and never up.
- Use [Tabs](https://flyingsalmon.superbrian.dev/components/tabs) to move between peer panels of content rather than pages of data.

## Do and don't

- **Do:** Right-align pagination under the list it pages, once per list.
  **Why:** It waits where the traveller finishes reading. A second copy above the list is one more thing to scan and nothing new to do.
- **Do:** Keep the page number in the address whenever the traveller can land on a page.
  **Why:** A page in the URL can be bookmarked, shared, opened in a new tab, and reloaded, so the traveller comes back to the page they left rather than to page 1.
- **Do:** Write a line such as "1 to 20 of 240" beside the list when the traveller needs the total.
  **Why:** Pagination shows where the traveller is, not how much there is. Only the app knows the size of its data.
- **Don't:** Show pagination on a list that fits on one page.
  **Why:** A row with one number offers a choice that is not there, so a one-page list simply ends.
- **Don't:** Page a short list that grouping or filtering would keep on one screen.
  **Why:** Trips split into upcoming and past stay in view together. A page break hides half of them behind a press.
