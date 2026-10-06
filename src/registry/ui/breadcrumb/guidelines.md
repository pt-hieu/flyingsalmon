# Breadcrumb guidelines

Design guidelines for the flyingsalmon Breadcrumb component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To show where a page sits in a hierarchy and let the traveller climb back up: Trips, then Kyoto in autumn, then Day 3.
- Above the title of any page at least two levels deep.

## When not to use

- Use [Sidebar](https://flyingsalmon.superbrian.dev/components/sidebar) to move between the sections of the app. A breadcrumb moves up within one section; the sidebar holds all of them.
- Use [Stepper](https://flyingsalmon.superbrian.dev/components/stepper) for a position in a sequence someone is walking through, because a hierarchy has no "next".
- Use [Pagination](https://flyingsalmon.superbrian.dev/components/pagination) to move between the numbered pages of a list, because a breadcrumb never lists siblings.

## Do and don't

- **Do:** Put the trail above the page title, in muted small text.
  **Why:** The title stays the loudest thing on the page and the trail reads as its address, quiet until the traveller wants to climb.
- **Don't:** Show a trail on a top-level page.
  **Why:** A trail of one says nothing the page title has not already said.
- **Don't:** Change the trail with the route the traveller took to the page.
  **Why:** The trail shows where the page lives. Arriving from search or a shared link shows the same trail, so each level always leads to the same parent.
- **Do:** Keep the trail on one line. From four levels, show the root, an ellipsis, the parent, and the current page.
  **Why:** A wrapped trail stops reading as one path. The hidden levels stay one press away in the ellipsis menu.
- **Do:** Let the current page truncate and keep every ancestor whole.
  **Why:** The traveller already knows the page they are on from its title; the ancestors are where they might go, so those stay readable.
- **Don't:** Make the current page a link.
  **Why:** There is nowhere to go from it. The trail ends in plain text where the traveller already is.
