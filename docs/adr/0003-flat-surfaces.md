# Flat surfaces: no shadows, no elevation

Status: accepted

The card spec grilling (issue #9) proposed an elevated variant, which would have added the theme's first `--shadow-*` tokens. Brian rejected it and widened the call into a system rule.

## Decision

- **The system is flat.** No shadow tokens, no elevation scale, no depth cues — anywhere.
- **Surfaces separate by solid borders and background steps.** The card draws a 1px solid `--border` edge; dark mode lifts the surface color (`--card` sits above `--background`), not a shadow.
- **Interaction feedback lives in the border, not in depth.** No hover lifts, no shadow growth, no press-down translations. Hover steps the border color; press draws a tight solid ring (button spec #3, card spec #9).

## Rationale

- The mood is soft and minimal; shadows add visual weight and a second hierarchy mechanism the system does not need.
- One separation mechanism (border + surface step) keeps light and dark mode symmetric. Shadows barely read on dark backgrounds and would have forced a second dark-only mechanism.

## Flip condition

Floating components (dialog, dropdown, tooltip, select) were deleted from the repo pre-spec. If they return, they need separation from the page that a 1px border may not deliver. Amend this ADR then and name the flat mechanism — a stronger border step, a scrim, or a surface step. A translucent scrim also flips the edge case in ADR 0004.
