# flyingsalmon

A shadcn registry that is Brian's design system and public design portfolio. Components ship from `src/registry/` under the `@flyingsalmon` namespace.

## Language

**Atomic component**:
A batch-1 primitive that renders inline only: no floating layer, not a composite widget. Anything floating (tooltip, select) or composite (dialog, tabs) is not atomic. A registry dependency on another atomic component is allowed (button embeds spinner; ADR 0002).
_Avoid_: widget, element, control

**Interactive component**:
An atomic component that takes focus and can be disabled: button, checkbox, input, switch, textarea. All five take their focus ring geometry and their disabled state from the `interaction` registry item, and each names its own ring color (ADR 0006). Badge, avatar and skeleton are not members and are never focusable. Card is not a member either — it paints its ring on a pseudo-element of a descendant link and restates the boundary width itself. Batch-2 components are composite, not atomic, so none of them is a member.
_Avoid_: control, form control, focusable

**Focus ring shape**:
Which focus feedback a component draws, per ADR 0003. An offset ring stands clear of the shape (button, checkbox, switch, theme toggle); a boundary ring draws on the element's own edge and replaces its border, on the element's own focus (input, textarea, card link) or on `focus-within` when the focus target is an inner element and the box owning the border is what the user reads as the control (date-picker, number-field); or no ring at all, when the component's own state indicator moves with focus (tabs). A ring picks its export by that answer — `offsetFocusRingGeometry`, `boundaryFocusRingGeometry`, or `boundaryFocusWithinRingGeometry`. The ringless shape takes none of them and is not an omission. ADR 0003 owns every shape named here.
_Avoid_: ring style, ring variant, focus style

**Shared style rule**:
A rendering rule fixed by an ADR or this glossary and therefore centralised in `src/registry/lib/`, as distinct from a class string that merely repeats. Byte-identity is not the bar (ADR 0006). Today: the disabled state, the three focus ring geometries, the field label variants. The menu item rules join in a third module, `menu`, when dropdown-menu builds (#52).
_Avoid_: shared class, style token, common style

**Batch**:
A shipping group of components specced and built together. Batch 1 holds the 11 atomic components (alert joined via ADR 0002; label absorbed into the field components via #4). Batch 2 holds the 5 floating and composite components: dialog, dropdown-menu, select, tooltip, tabs. Popover was cut permanently by #50. Batch 3 holds the 6 form and data components: form, radio-group, table, accordion, avatar-group, separator. Batch 4 holds the 12 components hottrip's screens need and the registry lacks — calendar, date-picker, combobox, number-field, toggle-group, progress, stepper, notice, empty-state, sidebar, carousel, timeline — plus the button's amber variant; header (#128) and changed-item (#125) are cut. Its roster gate is that a named hottrip screen needs the component. Batch 5 holds 4 components: drawer, breadcrumb, pagination, text link. Its roster gate is portfolio completeness: a visitor to a design system would expect the component and no standing ban covers it.
_Avoid_: milestone, phase, wave

**Floating component**:
A component that renders on a layer above the page flow, positioned against an anchor or the viewport: dialog, drawer, dropdown-menu, select, tooltip. Every floating component shares one portal, positioning, dismiss, and enter/exit contract. Tabs is not floating.
_Avoid_: overlay, portal component, popup

**Pending**:
The state of a dialog or a drawer that marks an operation running inside it, set by the app through the `pending` prop. While pending, Escape, outside click, and the close button do nothing and the close button renders disabled. The surface shows no busyness of its own beyond that; the acting button inside carries the spinner (feedback rule). An operation that runs outside the surface does not set it. The only exception to "Escape always closes" in ADR 0005.
_Avoid_: busy, loading, locked, submitting

**Drawer**:
A modal panel anchored to the right edge of the viewport for secondary content that accompanies the page still visible beside it: filters for a list, the detail of a selected row. A dialog interrupts and sits centred; a drawer accompanies and sits at the edge. Never used for app navigation, which is the sidebar's at every width, and never for a confirm.
_Avoid_: sheet, side panel, slide-over, off-canvas

**Breadcrumb**:
A single-line trail of the current page's ancestors in a hierarchy, each a link back up, ending in the current page as plain text. It shows location: never the pages a user visited, which is history, and never position in a sequence, which is stepper. Sidebar moves between sections; breadcrumb moves up within one. A trail has at least two levels, and one that does not fit collapses its middle levels into an ellipsis menu rather than wrapping.
_Avoid_: path, crumbs, navigation trail, location bar

**Pagination**:
The control that moves between the numbered pages of one list or table whose page count is known: previous, a window of page numbers, next. Pages count from 1, and a list of one page has no pagination. The window is the run of page numbers on show: the first page, the last page, the current page and its neighbours, with an ellipsis standing for every run of at least two hidden pages, so the control keeps one width as the current page moves. It navigates, which stepper never does; it moves between pages of data, not by a carousel page; and "load more", infinite scroll, the page-size choice, and the "1 to 20 of 240" range line all stay with the app.
_Avoid_: pager, paginator, page navigation, page indicator

**Text link**:
An anchor inside a sentence or a line of UI copy that navigates: to another page, another site, or a place on the same page. It takes its size and weight from the text around it and is marked by an underline that never leaves. A link navigates and a button acts, so an action inside a sentence is a button placed inline, never a text link. Breadcrumb's levels, sidebar's items, menu items, and pagination's page numbers are navigation items that read as links by position, and none of them is a text link.
_Avoid_: link (alone, for the component), hyperlink, inline link, anchor (calendar's **Anchor** is the first pick of a range)

**Highlighted**:
The one state of a menu item under the pointer or holding keyboard focus. Radix merges hover and focus into `data-highlighted`, and the item paints it as a solid background step to `--accent` with `--accent-foreground`, a destructive item to `--error` with `--error-foreground`, with no ring and no transition. A menu item has no separate hover, focus, or press state; the highlight is its focus indicator (ADR 0003). Applies to dropdown-menu and, through the shared `menu` rules, to select.
_Avoid_: hovered, focused item, active item, selected

**Composite component**:
A component built from several parts that only make sense together, exposed as a named group rather than a single element: tabs is the batch-2 example, and every floating component is also composite. An atomic component is never composite.
_Avoid_: compound component, widget

**Field family**:
The components that own a label and an error message: input, textarea, checkbox, select from batch 2, radio-group from batch 3, and date-picker, combobox, number-field and toggle-group from batch 4. All of them take their id linkage, their error message, and their label variants from the `field` registry item. Their props are the contract any form-state library drives; the registry binds to none (ADR 0007). Switch is not a member — it has a label but no error state, because a failed toggle is a result the app shows. That exclusion covers the label too: switch keeps its own label block, which transitions opacity rather than color (ADR 0006).
_Avoid_: form controls, inputs

**Field description**:
Helper text in muted type directly under a boxed field — input, textarea, number-field, select, combobox, date-picker — passed as `description` and rendered by the `field` item's `FieldDescription`. It joins the control's `aria-describedby` after the error message, so a screen reader hears the error first and the description second, and it sits above the error so an arriving error never moves it. Not an error and not feedback: it says what the field means, and it stays while the field shows an error. Slider renders its description with the same `FieldDescription`, but the thumb takes it as `aria-valuetext` rather than through `aria-describedby`, because it names the current step.
_Avoid_: hint

**Motion language**:
The shared animation vocabulary — animation kinds, duration scale, spring presets — built on the `motion` library. Every component spec quotes its names. Fixed in ADR 0001.
_Avoid_: animation system, transitions

**Animation kind**:
One of the four classes in the motion language: state feedback (hover/press/focus/check), morph (a component reshapes itself), enter/exit, and continuous (spinner, skeleton). All kinds except continuous stay under 200ms.
_Avoid_: animation type, category

**Feedback rule**:
The defining constraint, revised in ADR 0002 and ADR 0008: the acting component shows its own busyness — the button morphs through loading, fields show their own errors. Results belong to the app and must appear where the user's attention already is, staying until seen. Homes in order: the affected item, the acting surface's result slot, the notice. Feedback that auto-dismisses, stacks, has no owner, or has no link back to its subject is banned, which is what the old "no toast" meant. Enforced on registry components, guidance for apps.
_Avoid_: notification policy, no toast

**Result slot**:
The optional position on `Form`, below the actions row, where the app places its submit result as an alert (ADR 0007, ADR 0008). A position, not a renderer: `Form` imports nothing from alert and adds no live region, because the alert announces itself. Holds client-side cross-field validation and server errors on page forms; stays empty on a dialog form, which closes on submit and shows its result on the affected item or through a notice.
_Avoid_: form alert, error summary, message area

**Notice**:
The shell-owned surface for a result with no visible home: after navigation, from a closed dialog form, for a confirm-only action. One at a time, persistent until dismissed or replaced, fixed top-centre, announced from a live region mounted before content, never takes focus, always links back to its subject (ADR 0008). Not a toast: it auto-dismisses nothing, stacks nothing, and is owned. An anchored mode is deferred (#145); the fixed one builds in batch 4.
_Avoid_: toast, snackbar, notification, banner

**Range**:
A calendar selection with an inclusive start day and end day, carried as two ISO `YYYY-MM-DD` strings with `start` never after `end`. Calendar's range mode emits one on commit; date-picker posts it as two hidden native inputs. A one-day range is a start equal to its end.
_Avoid_: period, span, date range, from/to

**Anchor**:
The first pick of an in-progress range in calendar. While an anchor stands, the pointer or the keyboard cursor previews the range from it, painted the same as a committed range. Escape, or focus leaving the grid, clears the anchor and restores the last committed value; the app never sees a half-selection.
_Avoid_: start date, first click, pending selection

**Unavailable day**:
A calendar day outside `min` / `max` or refused by `isDateDisabled`. It stays focusable and reachable by arrow keys, is not selectable, and renders as muted, struck-through text at 4.5:1 because it is reachable. Distinct from the whole calendar being disabled, which removes the grid from the tab order.
_Avoid_: disabled date, blocked date, excluded day

**Toggle-group**:
A field-family control made of chips that toggle, in single or multiple mode, wrapping across rows. It exists beside checkbox and radio-group because single mode can return to empty, and multiple mode is one group with one tab stop and a `max`. A chip that does not toggle is a badge. Not a segmented control: no shared track, no tabs shape.
_Avoid_: chip group, segmented, choice chips, pill selector

**Required**:
A field-family prop saying the field must hold a value. The control blocks the action that would empty it, sets `aria-required` where its role allows, and the `field` registry item renders a visible marker in the label. Reaching a value from an initial empty is the user's action; a submit while still empty is the app's validation error through `error`. Toggle-group set the meaning; later fields copy it.
_Avoid_: mandatory, non-optional, must-fill

**Stepper**:
A display-only indicator of position in a sequence with a known count: a horizontal bar of equal segments, filled through the current one, that reads as ticks rather than a fraction. Progress is a fraction of one operation with a known end; timeline is a layout of markers joined by connectors and carries no item states; tabs navigate between peer panels. Stepper has no markers, no connectors, no fraction, and no navigation. The count may grow while mounted. Segment labels and the position text belong to the app.
_Avoid_: wizard, steps bar, page indicator, dots

**Slider**:
A control that picks one value from a range of steps by moving a thumb along a track, with a dot for every step and a description of the current step below it. The description is the thumb's value text, so the step is announced by its meaning. Stepper only shows a position and carousel only scrolls; a slider sets a value. It takes the field label variants but has no error state, so it is not a field family member.
_Avoid_: range, range input, scale, dial

**Empty state**:
A resting no-content state: a title, an optional description, and optional actions saying why a region holds nothing and what the user can do about it. Not feedback and not loading — an error after an action goes to the acting surface's alert or to a notice (ADR 0008), and a region still fetching shows a skeleton. A dead share link qualifies: the user landed on a page with nothing in it, they did not act and fail.
_Avoid_: blank state, zero state, placeholder, no-data

**Page header**:
A page's title and the actions that act on the whole page, nothing else. Where the page came from, its description, its status, and any dimming for a superseded page belong to the page body or the app. Not the app's top bar, which the sidebar covers (#128).
_Avoid_: hero, masthead, title bar, page heading

**Bar height**:
The one band height the sidebar header and the page header's first line share, so the wordmark, the page title, and the title's actions sit on one center line (ADR 0010).
_Avoid_: header height, toolbar height

**Sticker**:
Hand-drawn art that marks a moment, such as the end of a trip or a page with nothing on it yet, drawn as a die-cut sticker whose lines boil. Its art is generated by a rough.js drawing script, never written by hand: three frames of paths named by role (`roof`, `door`), which a role-to-class map colours from the theme. One image with a short label; it decorates beside words that say the same thing and never replaces them. hottrip's doodles, tied to its Anchors, are not stickers.
_Avoid_: illustration, doodle, decal, artwork

**Die-cut edge**:
The cut around a sticker's drawing: the art's `cut` silhouette stroked thick three times, a `--border` layer offset below, a `--border` line, and a `--card` edge, which merge into one outline with no shadow.
_Avoid_: outline, border, stroke, shadow

**Line boil**:
A sticker's continuous motion: its frames take turns every 150ms so the hand-drawn lines jitter like a cartoon's. Changes which frame is visible and moves nothing (ADR 0001).
_Avoid_: wobble, jitter, shake

**Carousel**:
A horizontally scroll-snapping region of items on native CSS scroll-snap. Many items can be visible at once and the user free-scrolls with trackpad, touch, or scrollbar; the browser settles on an item start. Not a slideshow: one item per viewport is the special case where the item width equals the viewport. Horizontal only.
_Avoid_: slider, slideshow, gallery, reel

**Current item**:
The carousel item whose start edge is nearest the scroll position at rest, computed on `scrollend` and reported through `onCurrentChange`. Distinct from visible, which every item intersecting the viewport carries: several items are visible at once and exactly one is the current item. Plain "current page" keeps its web meaning: the routed page being viewed.
_Avoid_: active, selected, index, current (unqualified)

**Carousel page**:
One scroller width of carousel movement: the step previous and next take, and the step PageUp and PageDown take. Not one item — a carousel page moves however many items fit, which is one only when the item fills the viewport. Plain "page" keeps its web meaning: a routed page of the app.
_Avoid_: slide, screen, step, page (unqualified)

**Marker**:
The node that stands for one item in a sequence component. A slot: it renders a default neutral dot when empty, or a bordered circle around a consumer-supplied icon. Two sizes, default and sm. Painted to clear 3:1 on its own.
_Avoid_: dot, bullet, node, point

**Connector**:
The line joining consecutive markers. The item draws it implicitly, a consumer never places one, and it stops at the first and last marker. Decorative and exempt under WCAG 1.4.11, because it carries nothing the marker and the content do not already carry; painted `--border`.
_Avoid_: line, rail, track, spine

**Chip**:
A selected item rendered as a focusable pill before the caret in a multiple-mode combobox. It wears `badgeVariants` on a span rather than rendering `Badge`, because badge is never focusable and a chip takes focus so ArrowLeft reaches it and Backspace removes it. Toggle-group's chips are its own toggling controls and are not this.
_Avoid_: tag, token, pill, badge

**Segment**:
One editable unit of a typed date — month, day, or year — that React Aria renders as a spin button carrying its own `mm`, `dd`, or `yyyy` placeholder in the locale's order. Digits type it, ArrowUp and ArrowDown step it, Backspace clears it. Segments are what take focus inside date-picker's box, which is why the box draws its ring on `focus-within` (ADR 0003). Stepper's segments are display-only ticks and are not these.
_Avoid_: part, slot, cell, field

**Rejected entry**:
A typed date that is complete but refused: outside `min` or `max`, turned down by `isDateDisabled`, or a range end before its start. Date-picker paints the invalid ring, sets `aria-invalid`, and renders `unavailableMessage` or `rangeOrderMessage`, but never calls `onChange` and posts nothing. Distinct from an incomplete entry, which is silent in every way, and from `error`, which is the app's own message and wins over both. A year is not complete until all four digits are typed, so no entry is rejected while it is still being written.
_Avoid_: invalid date, bad input, validation error

**Group color**:
One of six hues — sky, pink, teal, fuchsia, cyan, blue — that ties the elements belonging to one item in a set together and tells that item apart from its neighbors: a Trip's Stays, a chart's series, a person's avatar. A consumer picks it by hue name through the `--group-<hue>` aliases. It carries no meaning of its own, so it never stands in for a status or the accent, and it never works alone: the item always carries a text label too. ADR 0004 owns the hues, their aliases, and the recommended order.
_Avoid_: category color, series color, identity color, decorative hue

**Spec checklist**:
The fixed sections every component spec fills: purpose, variants, sizes, states, keyboard path, contrast, micro animation.
_Avoid_: template, rubric
