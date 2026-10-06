# Text link guidelines

Design guidelines for the flyingsalmon Text link component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To navigate from inside a sentence or a line of copy: to another page, another site, or a place on the same page.

## When not to use

- Use [Button](https://flyingsalmon.superbrian.dev/components/button) to send, save, open, or retry. A link navigates and a button acts. For an action inside a sentence, such as "Didn’t get the code? Resend", place the button inline.
- Use [Breadcrumb](https://flyingsalmon.superbrian.dev/components/breadcrumb) for the levels of a trail, which read as links by position and draw no underline.
- Use [Sidebar](https://flyingsalmon.superbrian.dev/components/sidebar) for navigation items, which keep their own classes for the same reason.

## Do and don't

- **Do:** Put the way out of a problem as a link in the sentence that describes it, such as “Buy a credit pack” inside a warning.
  **Why:** The path forward sits next to the problem, where the reader’s attention already is.
- **Don't:** Write “click here” or “learn more” as the link text.
  **Why:** The words name where the traveller ends up or the next step, so the link still makes sense when read on its own.
- **Do:** Let the link take the size and weight of the sentence it sits in.
  **Why:** It is part of the sentence and breaks across lines with the text around it.
- **Do:** Keep the link in the foreground colour inside muted copy.
  **Why:** It stands one step stronger than the text around it, and that contrast is what marks it as a way to go.
- **Don't:** Disable a text link.
  **Why:** An anchor that cannot navigate is plain text, so render text.
- **Don't:** Put a text link inside a card or table link that already covers the surface.
  **Why:** The surface is the hit target, and an underline inside it competes with the title.
