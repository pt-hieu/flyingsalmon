# The sidebar and the page header share one bar height

Status: accepted

Placed beside the sidebar, the page header's title sat 16px below the sidebar's wordmark. The sidebar header was 60px (`py-3` around a 36px trigger), the title's first line 45px or 75px depending on the header's width, and the pane's own top padding decided the rest. Nothing tied the two together, so every page shell would tune its padding by eye, and none of those numbers landed on the 4px scale.

## Decision

- **The theme owns `--bar-height`, `--spacing(18)` (72px).** It lives in the theme item with the other component variables (ADR 0009).
- **The sidebar header is exactly one bar tall** beside the content (700px and wider) and centers its contents in it. The horizontal strip under 700px keeps its own height.
- **The page title centers its first line in one bar.** It pads above and below by half of the bar height minus its own line height, `calc((var(--bar-height) - 1lh) / 2)`, so the band is right at either title size: 16px around a 40px line (`text-4xl`, `leading-10`), none around a 72px line (`text-6xl`, `leading-18`). Actions are at least one bar tall and center in it, so on the title's row they sit on its first line however many lines the title wraps to, and wrapped under it they take a band of their own.
- **The header's bottom rule closes its last band, with no padding of its own.** Measured on Bricolage Grotesque at weight 800, the capitals start 23.7px below the band's top and the baseline sits 24.5px above its bottom at `text-4xl`; 16.4px and 16px at `text-6xl`. The space above the title's capitals and below its baseline match without further padding.
- **A page header placed at the top of the pane, with no padding above it, lines up with the sidebar** by center line: wordmark, title, and actions.

## Rationale

- Center lines are the one alignment that holds at both title sizes and carries the actions with it. Cap lines depend on font metrics and break when either size changes; box tops leave text visibly off by the difference in heights.
- One value read by both components keeps them independent. Neither imports the other, and either can be used alone.
- The line heights are chosen so the derived padding stays on the 4px scale (16px and 0); the `calc` keeps the band correct if a consumer overrides the bar height.

## Consequences

- The sidebar header grows from 60px to 72px.
- A title line taller than the bar would need negative padding. A future title size must keep its line height at or under `--bar-height`.
- A page header used without a sidebar still pads its title into the band, so every page's title starts at the same depth.
