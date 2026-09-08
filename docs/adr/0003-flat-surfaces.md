# Flat surfaces: no shadows, no elevation

Status: accepted

Revised by the dropdown-menu spec (issue #52): an item inside a floating list has no border to step, so its highlight is a background step, and it draws neither a press ring nor a focus ring. Marked inline below.

Revised by the accordion spec (issue #87): a borderless row inside a stack draws an inset focus ring, and its hover feedback lives in the divider its item owns. Marked inline below.

Revised again by the accordion review (issue #103): a borderless row shows focus the way it shows hover — the item's divider steps to `--primary`, and the row's chevron steps with it, with no ring in either state. Marked inline below.

The card spec grilling (issue #9) proposed an elevated variant, which would have added the theme's first `--shadow-*` tokens. Brian rejected it and widened the call into a system rule.

## Decision

- **The system is flat.** No shadow tokens, no elevation scale, no depth cues — anywhere.
- **Surfaces separate by solid borders and background steps.** The card draws a 1px solid `--border` edge; dark mode lifts the surface color (`--card` sits above `--background`), not a shadow.
- **Interaction feedback lives in the border, not in depth.** No hover lifts, no shadow growth, no press-down translations. Hover steps the border color; press draws a tight solid ring (button spec #3, card spec #9).
- **The focus ring has two widths, set by where it draws.** A ring that stands off the element is 3px with a 2px offset (button #3, checkbox #6, switch #7). A ring that draws on the element's own boundary and replaces its border is 2px with no offset (input #4, textarea #5, card link #9). An offset ring floats clear of the shape and needs the extra weight; a boundary ring sits where a 1px border already read, so 2px is the step up. Both meet 3:1.
- **A borderless row inside a stack shows focus the way it shows hover** (accordion #87, revised #103). An accordion trigger spans its item's full width and owns no border; the divider belongs to the item. An offset ring would cover the neighbouring rows, a boundary ring has no border to replace, and an inset ring reads as a box drawn around a row that has no box — the one shape in a flat divider list. So the row draws no ring at all. Hover and keyboard focus paint the same two steps to `--primary`: the item's divider, and the row's own chevron. The chevron is what keeps the feedback inside the row when the panel is open and the divider has travelled below it. Both steps clear 3:1, the same pair the hover divider was already measured on, so the row stands where tabs stands: WCAG 2.4.7 asks for a visible focus indicator, not a ring. The row draws no press ring either, on the same ground as a menu item: it toggles on click and has nothing to hold.
- **A component may show focus without a ring** when its own state indicator moves with focus (tabs #55). Tabs drops the ring entirely. Under manual activation a 1px `--ring` bar marks the focused trigger. Under automatic activation focus always coincides with selection, so the 2px `--primary` active indicator, moving on every arrow key, is the focus feedback. WCAG 2.4.7 requires a visible focus indicator, not a ring; the bar still meets 3:1.
- **A borderless item inside a floating list steps its background, not its border** (dropdown-menu #52; select inherits through the shared `menu` rules). A menu item has no border of its own, so hover and keyboard focus merge into one highlighted state, painted as a solid step to `--accent` with `--accent-foreground`; a destructive item steps to `--error` with `--error-foreground`. It draws no press ring, because the item runs on pointer up and the list closes before a held state could show, and no focus ring, because the highlight moves with focus and is the focus indicator, the same ground tabs stands on. The list's own surface keeps its 1px border and surface step (ADR 0005); the item never gets either.
- **The press ring stays 2px** in every case, offset or not (button #3, card #9). It is tight by intent — it must read as a held state, not as focus.

## Rationale

- The mood is soft and minimal; shadows add visual weight and a second hierarchy mechanism the system does not need.
- One separation mechanism (border + surface step) keeps light and dark mode symmetric. Shadows barely read on dark backgrounds and would have forced a second dark-only mechanism.

## Flip condition

Floating components (dialog, dropdown, tooltip, select) were deleted from the repo pre-spec. If they return, they need separation from the page that a 1px border may not deliver. Amend this ADR then and name the flat mechanism — a stronger border step, a scrim, or a surface step. A translucent scrim also flips the edge case in ADR 0004. Answered: ADR 0005 names the mechanism for the surface (a surface step plus the border), and the borderless-item bullet above names it for the items inside that surface.
