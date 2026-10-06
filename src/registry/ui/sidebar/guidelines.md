# Sidebar guidelines

Design guidelines for the flyingsalmon Sidebar component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- For the primary navigation of the app: a trip’s itinerary, places, budget, and travellers.
- As the app’s top bar. On a narrow screen the sidebar becomes the bar, so there is no separate header component to build.

## When not to use

- Use [Breadcrumb](https://flyingsalmon.superbrian.dev/components/breadcrumb) to climb back up through a hierarchy within one section, because a sidebar moves between sections.
- Use [Tabs](https://flyingsalmon.superbrian.dev/components/tabs) to switch between peer panels on one page, because those are views of the same content rather than places.
- Use [Drawer](https://flyingsalmon.superbrian.dev/components/drawer) for a drawer of actions or a panel that is not navigation.

## Do and don't

- **Do:** Keep the sidebar on screen across every page, so the current-page bar slides from item to item as the traveller moves.
  **Why:** The moving bar shows where the traveller went from where they were. A sidebar that redraws on each page draws the bar in place, and the app reads as separate pages.
- **Do:** Give every item an icon.
  **Why:** The rail shows icons alone, so an item without one has nothing to show there.
- **Do:** In the rail, drop names from the header and the footer and keep their icons.
  **Why:** The rail is one icon wide, so a name either clips or forces the column wider. Expanding the sidebar brings the names back.
- **Do:** Keep the top level to a handful of sections, and nest the traveller’s own things, such as their trips or days, under the section they belong to.
  **Why:** A short top level reads at a glance and fits the rail. A nest grows with the traveller’s content without pushing the sections apart.
- **Don't:** Make the traveller’s account a navigation item.
  **Why:** The nav lists places in the app; the account is the person using it. It goes in the footer as one item that opens a menu, in reach from every page.
- **Don't:** List a place the traveller can no longer use, such as a trip that has ended.
  **Why:** Leave it out rather than greying it. A dimmed item is a stop the traveller reads and cannot take.
