# Page header guidelines

Design guidelines for the flyingsalmon Page header component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To name a page and hold the actions that act on all of it: the trips list with "Plan a new trip", a trip with "Share" and "Book stays".
- At the top of the pane, inside main, on every page that has a title.

## When not to use

- Use [Sidebar](https://flyingsalmon.superbrian.dev/components/sidebar) for the app's top bar and navigation. The sidebar is both, and the page header only names the page in the pane beside it.
- Use [Breadcrumb](https://flyingsalmon.superbrian.dev/components/breadcrumb) to show where the page sits in a hierarchy, because the header holds no trail.
- Use [Button](https://flyingsalmon.superbrian.dev/components/button) for the actions on one card or one row, because the header is for the whole page.

## Do and don't

- **Do:** Keep the header to the title and the actions on the whole page. Put the description, the status, and where the page came from below it, as muted text in the page body.
  **Why:** Every page then opens with the same heading, and the facts about one page read as its content rather than as chrome.
- **Do:** Give the header one primary action. A second action is a secondary button, and the rest go in a dropdown menu.
  **Why:** One filled orange button says what the page is for. A row of equal buttons makes the traveller choose before they have read the page.
- **Don't:** Repeat an empty page’s call to action in the header.
  **Why:** The empty state owns the one action on an empty page, where the traveller is already looking. Show the header action once the page has content.
- **Don't:** Resize the title for one page.
  **Why:** Every page title is the same size, so the app speaks in one voice. A page that needs more emphasis gets it from its content.
