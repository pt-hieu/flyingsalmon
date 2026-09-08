# Research: calendar library

For issue [#114](https://github.com/pt-hieu/flyingsalmon/issues/114). Screen: Intake Fixed Fields, the exact-range shape of the dates field (hottrip issue #5 — "Dates accept two shapes: an exact range, or a duration plus a rough month"). Radix has no calendar, so batch 2's default does not answer this.

Facts only, no recommendation. Versions pinned 2026-09-09.

## Method and version pins

Claims come from the published package source unpacked from npm tarballs, from the ARIA Authoring Practices Guide, and from official docs. Bundle sizes are measured locally with esbuild (`--bundle --minify --format=esm`, `react` and `react-dom` external), gzipped; they are the module graph only, no React runtime, no CSS.

| Package                             | Version    | Role                                                                              |
| ----------------------------------- | ---------- | --------------------------------------------------------------------------------- |
| `react-day-picker`                  | **10.0.1** | candidate A. dist-tags: `latest 10.0.1`, `next 10.0.0-next.6`, `legacy-v8 8.10.2` |
| `@daypicker/react`                  | 10.0.1     | pure alias for the above; its `index.js` is `export * from "react-day-picker"`    |
| `react-aria-components`             | **1.21.1** | candidate B, components form                                                      |
| `react-aria`                        | 3.52.1     | where the calendar hooks actually live                                            |
| `react-stately`                     | 3.50.0     | where the calendar state actually lives                                           |
| `@react-aria/calendar`              | 3.10.1     | re-export shim over `react-aria`                                                  |
| `@react-stately/calendar`           | 3.10.1     | re-export shim over `react-stately`                                               |
| `@internationalized/date`           | 3.12.4     | React Aria's mandatory date type                                                  |
| `date-fns`                          | **4.4.0**  | candidate C, and a hard runtime dependency of candidate A                         |
| `@date-fns/tz`                      | 1.5.0      | hard runtime dependency of candidate A (pinned `^1.4.1`)                          |
| `temporal-polyfill`                 | 1.0.4      | candidate C, Temporal route                                                       |
| `@js-temporal/polyfill`             | 0.5.1      | candidate C, Temporal route, alpha                                                |
| `tailwindcss-react-aria-components` | 2.2.0      | optional variant shorthand for candidate B                                        |

Two structural facts invalidate most secondary writing on this topic.

**react-day-picker renamed in v10** (released 2026-05-08). `@daypicker/react` is the preferred name; `react-day-picker` stays as a compatibility alias with identical behaviour. Non-Gregorian calendars left the main package and ship as `@daypicker/persian`, `@daypicker/hijri`, and friends. Doc URLs moved: `/docs/selection-modes` and `/docs/customization` are redirect stubs, live pages are `/selections/*`, `/docs/grid-and-months`, `/docs/caption-and-nav-layouts`, `/docs/appearance`.

**React Aria consolidated its packages** in `react-aria@3.48.0` / `react-aria-components@1.17.0` (2026-04-14). `@react-aria/calendar@3.10.1`'s only dependencies are `@swc/helpers`, `react-aria`, and `react-stately`; its `src/index.ts` re-exports from `react-aria/useCalendar`. **There is no longer a granular hooks-only route** — importing `@react-aria/calendar` pulls the full monopackages. Any source counting 10–40 `@react-aria/*` packages predates that release. Measured: the hooks-only import graph is 33.3 kB gzipped against 38.5 kB for the full `RangeCalendar` component surface, so the hooks buy about 5 kB, not an order of magnitude.

**shadcn's calendar is unpinned.** `https://ui.shadcn.com/r/styles/new-york-v4/calendar.json` declares `"dependencies": ["cn", "react-day-picker@latest", "date-fns"]`. `@latest` resolves to 10.0.1 today; the docs page still documents `react-day-picker/persian`, removed in v10. Upstream tracking: shadcn-ui/ui#10441.

---

## 1. Range selection

### react-day-picker 10.0.1

Range mode is `mode="range"`, routed through `useRange` into `addToRange` — 78 lines of pure function, `dist/esm/utils/addToRange.js:15-92`, driven from `dist/esm/selection/useRange.js:18-53`.

**The default flow is not start-then-end.** With `min` unset the first click produces a complete zero-night range: `range = { from: date, to: min > 0 ? undefined : date }` (`addToRange.js:21`). Verified by running the published function:

| Action                                         | Result                     |
| ---------------------------------------------- | -------------------------- |
| click 8 into an empty selection                | `{from: 8, to: 8}`         |
| click 12                                       | `{from: 8, to: 12}`        |
| click 15, after `to`                           | `{from: 8, to: 15}`        |
| click 5, before `from`                         | `{from: 5, to: 15}`        |
| click 8 into an empty selection with `min={1}` | `{from: 8, to: undefined}` |

A start-then-end flow therefore requires `min={1}` or `resetOnSelect`; otherwise the calendar paints a filled single-day range after the first click.

`onSelect` is `(selected: DateRange | undefined, triggerDate: Date, modifiers: Modifiers, event) => void` (`types/props.d.ts:485`, `:626`). `DateRange` is `{ from: Date | undefined; to?: Date | undefined }` (`types/shared.d.ts:171-174`). Uncontrolled use works — the hook keeps internal state when `onSelect` is absent (`useRange.js:15-16, 48-50`).

**There is no hover preview.** `grep -rni "hover\|preview"` across `dist/esm` (excluding `locale/`) returns zero matches. The only hover surface is the pass-through pair `onDayMouseEnter` / `onDayMouseLeave` (`DayPicker.js:199-204`, wired at `:336`). A consumer wanting the in-progress range to preview under the pointer holds that state itself and feeds it back through the `modifiers` prop.

`range_start` / `range_middle` / `range_end` exist as built-in modifiers, but they are computed only from the **committed** selection and only when it is complete:

```js
modifiers[SelectionState.range_start] = Boolean(
  from && to && dateLib.isSameDay(date, from),
)
modifiers[SelectionState.range_end] = Boolean(
  from && to && dateLib.isSameDay(date, to),
)
modifiers[SelectionState.range_middle] = rangeIncludesDate(
  selectedValue,
  date,
  true,
  dateLib,
)
```

`DayPicker.js:319-326`. During an in-progress range the anchor day carries only `selected`, never `range_start` (`utils/rangeIncludesDate.js:16-30`).

**Range length limits exist and count nights**, via `differenceInCalendarDays(range.to, range.from)` (`addToRange.js:82-90`). `min` and `max` are declared on `PropsRange` (`types/props.d.ts:627-630`) and on `PropsRangeRequired` (`:585-588`). Their JSDoc says "the minimum number of days to include in the range", but the implementation and the docs both count **nights** — the difference between the two dates, so a `{from: 8, to: 12}` range is 4, not 5. Exceeding `max` or falling under `min` restarts the range at the clicked day: `range = { from: date, to: undefined }` (`addToRange.js:85, 88`). Verified: with `max={3}`, `{from: 8, to: 8}` then click 20 gives `{from: 20, to: undefined}`.

`excludeDisabled` (since 9.0.2, `props.d.ts:605-612`) does not trim a range containing a disabled date — it **resets** it to the clicked day (`useRange.js:41-47`).

Clearing has three routes: click the single day of a `{from: d, to: d}` range when `required` is falsy (`addToRange.js:48-55`); click the open anchor when `min > 0` (`addToRange.js:33-35`); or pass `selected={undefined}` in controlled mode. `resetOnSelect` (since 9.14, `props.d.ts:613-622`) adds a fourth.

Same date as start and end is allowed and is the default first-click result. The default stylesheet handles the double-modifier case with `.rdp-range_start.rdp-range_end { background: revert; }` (`src/style.css:337-339`).

### React Aria RangeCalendar (`react-aria-components` 1.21.1)

The full range state machine is built in. `RangeCalendarState` exposes `anchorDate`, `setAnchorDate`, `highlightedRange`, `highlightDate`, `isDragging`, `setDragging`, `clearSelection`, `commitSelection`, `focusNearestAvailableDate` (`react-stately/dist/types/src/calendar/types.d.ts`).

Flow is click-then-click **and** drag. First `selectDate` sets the anchor, second commits (`react-stately/dist/private/calendar/useRangeCalendarState.mjs:82-96`). Drag is explicit, not emergent: `useCalendarCell`'s `onPressStart` calls `state.setDragging(true)` and starts selection on pointer down, with a 200 ms delay on touch to disambiguate from scroll (`react-aria/dist/private/calendar/useCalendarCell.mjs:155-166`). Pressing an existing range's start or end re-anchors to the opposite end, so a boundary can be dragged rather than the range restarted (`:138-153`).

Value shape is `RangeValue<DateValue> | null` (`useRangeCalendarState.d.ts:4-5`).

**Hover preview is built in.** `highlightedRange` is derived live from anchor plus focused date:

```js
let highlightedRange = anchorDate
  ? makeRange(anchorDate, calendar.focusedDate)
  : value && makeRange(value.start, value.end)
```

`useRangeCalendarState.mjs:81`, with `highlightDate(date)` setting the focused date while anchored (`:127-129`). The cell wires pointer-enter to it, including during a touch drag (`useCalendarCell.mjs:272-275`). `isSelected` is computed off `highlightedRange`, so in-progress hover dates carry `data-selected` too (`useRangeCalendarState.mjs:130-132`). `isSelectionStart` / `isSelectionEnd` are computed in the components layer via `isSameDay` against `highlightedRange` (`react-aria-components/dist/private/Calendar.mjs:306-311`). Because the preview follows `focusedDate`, it works identically under the keyboard.

**There is no min or max range _length_ prop.** `CalendarPropsBase` carries only `minValue` and `maxValue` (`react-stately/dist/types/src/calendar/types.d.ts:9-11`); no `minRange`, `maxRange`, or `minDuration` exists anywhere in the type surface. The sanctioned mechanism is `isDateUnavailable(date, anchorDate)` — the second argument exists for exactly this and landed in RAC 1.18.0 ("Add `anchorDate` as an argument to `isDateUnavailable` in RangeCalendar to determine available dates based on the first date the user picks"). Signature at `useRangeCalendarState.d.ts:16`.

`allowsNonContiguousRanges` (`:10`) decides whether a range may span unavailable dates. When false, the state derives a hard available window around the anchor (`useRangeCalendarState.mjs:44-57`, `:177-189`). **Caveat:** `nextUnavailableDate` scans only ±`visibleDuration` from the anchor (`:181-183`), so with the default `{months: 1}` the clamp search window is one month.

`clearSelection()` sets anchor and value to null (`:138-141`). `value={null}` is accepted. Same-day start and end is allowed — `makeRange(d, d)` returns `{start: d, end: d}` (`:158-168`) and the announcement layer special-cases it (`react-aria/dist/private/calendar/utils.mjs:56-62`).

`commitBehavior` (`react-aria/dist/types/src/calendar/useRangeCalendar.d.ts:16`) is `'clear' | 'reset' | 'select'`, default `'select'`, and governs what happens when the pointer releases outside the calendar or focus leaves mid-selection (`useRangeCalendar.mjs:34-58`).

### Hand-rolled

**No specification covers range selection.** Neither APG date-picker example implements one. `w3c/aria-practices` ships `datepicker-dialog.js` (866 lines) and `combobox-datepicker.js` (898 lines), both single-date, single-month, English, with no disabled dates — grepping both for `aria-disabled` returns zero hits.

The APG single-date reference holds two date fields plus a message field (`datepicker-dialog.js:63-67`). A range grid needs at minimum six state variables:

| Variable                                            | Why it cannot be derived                                                  |
| --------------------------------------------------- | ------------------------------------------------------------------------- |
| `focusedDate`                                       | roving-tabindex cursor; moves on arrows without selecting                 |
| `anchorDate`                                        | not the same as `rangeStart` — the user may drag backwards                |
| `rangeStart` / `rangeEnd`                           | derived from anchor plus second pick, but must survive re-render          |
| `hoveredDate`                                       | pointer-only; must be null during keyboard use or it fights the cursor    |
| `selectionPhase` (`idle` / `anchored` / `complete`) | without it, a third click is undefined and the same-day case is ambiguous |
| `visibleMonth`                                      | decouples from `focusedDate` when scrolling without focus is allowed      |

Behaviours with no default answer: backwards drag needs normalisation (`Temporal.PlainDate.compare` returns -1/0/1) and a backwards-rendering preview; the same-day case has three defensible answers; keyboard preview must follow `focusedDate` while anchored and must be announced; min and max range length needs a day count (`PlainDate.since(other, {largestUnit: 'day'}).days`, or `differenceInCalendarDays`) enforced across three surfaces — blocking the pick, greying out-of-reach cells while anchored, and clamping the preview; clearing needs an affordance that is not Escape, because Escape is already bound to closing the dialog.

Cell state count: `range-start`, `range-end`, `range-middle`, `preview`, on top of `selected`, `today`, `outside-month`, `disabled`, `focused` — nine orthogonal states before hover and active.

---

## 2. Keyboard grid

### The bar: what the APG requires

From the APG date-picker dialog example (https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/), verbatim:

| Key               | Function                                                                         |
| ----------------- | -------------------------------------------------------------------------------- |
| Space, Enter      | "Select the date, close the dialog, and move focus to the 'Choose Date' button." |
| Up Arrow          | "Moves focus to the same day of the previous week."                              |
| Down Arrow        | "Moves focus to the same day of the next week."                                  |
| Right Arrow       | "Moves focus to the next day."                                                   |
| Left Arrow        | "Moves focus to the previous day."                                               |
| Home              | "Moves focus to the first day (e.g Sunday) of the current week."                 |
| End               | "Moves focus to the last day (e.g. Saturday) of the current week."               |
| Page Up           | "Changes the grid of dates to the previous month."                               |
| Shift + Page Up   | "Changes the grid of dates to the same month in the previous year."              |
| Page Down         | "Changes the grid of dates to the next month."                                   |
| Shift + Page Down | "Changes the grid of dates to the same month in the next year."                  |

Plus, at dialog level, Escape closes and returns focus to the trigger, and Tab / Shift+Tab cycle a focus trap.

Markup the APG example emits: `role="dialog" aria-modal="true"`, an `<h2 id aria-live="polite">` month-year heading, `<table role="grid" aria-labelledby>`, seven `<th scope="col" abbr>` weekday headers, and `<td tabindex="0|-1" role="gridcell" aria-selected="true" data-date="YYYY-MM-DD">` cells. **Two live regions, not one** — the heading and a separate keyboard-hint message div.

The generic grid pattern additionally offers `Control+Home` / `Control+End` and, for a multi-select grid, `Shift+Arrow` to extend selection. A range picker is a multi-select grid, so `Shift+Arrow` extension is the pattern-consistent binding, and neither APG example implements it.

### react-day-picker 10.0.1

Every key is in one object, `dist/esm/DayPicker.js:174-198`:

```js
const keyMap = {
  ArrowLeft: [
    e.shiftKey ? 'month' : 'day',
    props.dir === 'rtl' ? 'after' : 'before',
  ],
  ArrowRight: [
    e.shiftKey ? 'month' : 'day',
    props.dir === 'rtl' ? 'before' : 'after',
  ],
  ArrowDown: [e.shiftKey ? 'year' : 'week', 'after'],
  ArrowUp: [e.shiftKey ? 'year' : 'week', 'before'],
  PageUp: [e.shiftKey ? 'year' : 'month', 'before'],
  PageDown: [e.shiftKey ? 'year' : 'month', 'after'],
  Home: ['startOfWeek', 'before'],
  End: ['endOfWeek', 'after'],
}
```

Arrows are RTL-aware. Home and End move to start and end of **week**, matching the APG. Shift+Arrow moves by month or year — an extra beyond the APG, and it is not range extension. Enter and Space are not in the map because the day is a real `<button type="button">` (`components/DayButton.js:15`), so the browser fires `click` into `handleDayClick` (`DayPicker.js:156-165`). **Escape is not handled** — there is no popover logic in the library.

Movement skips disabled and hidden days by recursion capped at 365 attempts (`helpers/getNextFocus.js:21-36`), resolved through `helpers/getFocusableDate.js:17-43`.

Focus follows the day into a newly displayed month. `useFocus.moveFocus` calls `calendar.goToDay(nextFocus)` then `setFocused(nextFocus)` (`dist/esm/useFocus.js:27-41`), and the DOM move happens in an effect on the day button:

```js
React.useEffect(() => {
  if (modifiers.focused) ref.current?.focus()
}, [modifiers.focused])
```

`components/DayButton.js:10-15`. Roving tabindex is real — verified by render, one cell at `tabindex="0"` and 34 at `-1` (`DayPicker.js:336`, `isFocusTarget(day) ? 0 : -1`). Initial target priority is focused modifier, then last focused, then selected, then today, then first focusable (`helpers/calculateFocusTarget.js:2-69`), and it only auto-focuses under `autoFocus`.

ARIA emitted, verified by `renderToStaticMarkup`:

- Root `<div>` with **no role** unless you pass one (`role?: "application" | "dialog"`, `props.d.ts:349`).
- `<table role="grid" aria-multiselectable={mode is "multiple" or "range"} aria-label="September 2026">` (`DayPicker.js:301-302`).
- `<td role="gridcell" aria-selected>` — emitted only when true, never `"false"` (`:332`).
- Day `aria-label` on the button, from `format(date, "PPPP")` with `Today, ` prefix and `, selected` suffix (`labels/labelDayButton.js:17-24`).
- Week numbers as `<th scope="row" role="rowheader">` (`:308-310`).
- Caption is a live region: `role="status" aria-live="polite"` on the `CaptionLabel` under `captionLayout="label"` (`:293`), or a visually-hidden span under a dropdown caption (`:282-293`).
- **`<thead aria-hidden="true">`** (`components/Weekdays.js:9`). Weekday headers are `<th scope="col">` but carry **no `role="columnheader"`**, and the `aria-hidden` ancestor removes them from the accessibility tree anyway. This is a deviation from the ARIA grid pattern. The library compensates by putting the full weekday name into each day's `aria-label`.
- Nav buttons use `aria-disabled` plus `tabIndex={-1}` rather than `disabled` (`:269, 296`). Disabled days use real `disabled` unless focused, in which case `aria-disabled`, so a disabled-but-focused day stays reachable (`:332-336`).

Docs claim conformance: "DayPicker follows the ARIA Authoring Practices Guide for date pickers" (https://daypicker.dev/guides/accessibility).

### React Aria

All grid keys are declared in `react-aria/dist/private/calendar/useCalendarGrid.mjs`:

| Key                        | Handler                                                                  | Line               |
| -------------------------- | ------------------------------------------------------------------------ | ------------------ |
| `End`                      | `state.focusSectionEnd()`                                                | `:33-35`           |
| `Home`                     | `state.focusSectionStart()`                                              | `:36-38`           |
| `Escape`                   | `if ('setAnchorDate' in state) state.setAnchorDate(null); return false;` | `:39-43`           |
| `Enter`                    | `state.selectFocusedDate()`                                              | `:48-50`           |
| Space                      | `state.selectFocusedDate()`                                              | `:51-53`           |
| `PageUp`                   | `state.focusPreviousSection()`                                           | `:54-56`           |
| `Shift+PageUp`             | `state.focusPreviousSection(true)`                                       | `:57-59`           |
| `PageDown`                 | `state.focusNextSection()`                                               | `:60-62`           |
| `Shift+PageDown`           | `state.focusNextSection(true)`                                           | `:63-65`           |
| `ArrowLeft` / `ArrowRight` | RTL-aware next/previous day                                              | `:66-69`, `:73-76` |
| `ArrowUp` / `ArrowDown`    | previous/next row                                                        | `:70-72`, `:77-79` |

Arrows, Enter, Space and the Page keys register with `allowRepeats: true` (`:81`); Home, End and Escape do not.

**Escape has range-aware semantics.** Its handler returns `false`, and `createKeyboardShortcutHandler` maps a boolean return to `{shouldContinuePropagation: !result, shouldPreventDefault: result}` (`react-aria/dist/private/interactions/createKeyboardShortcutHandler.mjs:113-116`). So one Escape both cancels the in-progress range and keeps propagating without `preventDefault`, letting an enclosing popover close on the same press. The source carries a maintainer TODO questioning this (`useCalendarGrid.mjs:42`).

`Shift+PageUp` / `Shift+PageDown` move by the next larger unit — with months visible, a year (`react-stately/dist/private/calendar/useCalendarState.mjs:221-246`).

Focus management: roving tabindex with exactly one cell at `tabIndex=0` (`useCalendarCell.mjs:219-220`), restored imperatively in an effect and scrolled into view only when the interaction modality is not pointer (`:222-239`). `useCalendarState` keeps `focusedDate` and `startDate` in sync during render, clamping to min and max and re-aligning the visible page when focus leaves it (`useCalendarState.mjs:105-108`). If the prev or next button becomes disabled while focused, focus moves back into the grid (`useCalendarBase.mjs:69-80`).

ARIA emitted:

- Container `role="application"` with `aria-label` composed from your label plus the formatted visible range (`useCalendarBase.mjs:90-94`).
- `role="grid"` with `aria-readonly`, `aria-disabled`, `aria-multiselectable`, `aria-label`, and focus wiring (`useCalendarGrid.mjs:120-127`).
- Grid header `aria-hidden: true`, with the source comment "Column headers are hidden to screen readers … The day names are already included in the label of each cell" (`:128-132`). **No `role="columnheader"` and no `role="rowheader"` anywhere in the calendar source** — RAC renders a plain `<th>` (`react-aria-components/dist/private/Calendar.mjs:246-259`). Same deviation as react-day-picker, same compensation.
- Cell `<td role="gridcell">` with `aria-disabled`, `aria-selected`, `aria-invalid` (`useCalendarCell.mjs:250-255`); inner `<div role="button">` with `tabIndex`, `aria-disabled`, `aria-label`, `aria-invalid`, `aria-describedby` (`:256-271`).
- `aria-label` composed from message bundles in 44 locales (`react-aria/dist/private/intl/calendar/*.mjs`). English keys: `previous`, `next`, `selectedDateDescription`, `selectedRangeDescription`, `todayDate`, `todayDateSelected`, `dateSelected`, `startRangeSelectionPrompt` ("Click to start selecting date range"), `finishRangeSelectionPrompt`, `minimumDate` ("First available date"), `maximumDate`, `dateRange`. The range prompt is injected via `useDescription` when a range cell is focused (`useCalendarCell.mjs:111-117`).
- Two `announce()` calls: one when the visible range changes but only if focus is outside (`useCalendarBase.mjs:42-47`), one for the selected value with a 4 s polite announcement (`:50-55`). `LiveAnnouncer` creates a detached `<div role="log" aria-live>` with inline visually-hidden styles (`react-aria/dist/private/live-announcer/LiveAnnouncer.mjs:50-78`).
- RAC also renders a visually hidden `<h2>` carrying the calendar's label, and a visually hidden `<button>` after the children that advances a page so screen-reader users can continue past the last visible date (`Calendar.mjs:111-116`, `:181`). The visible `Heading` slot is forced to `aria-hidden: true, level: 2` (`:88-95`).

### Hand-rolled

This is where the cost sits. The APG's imperative implementation is:

```js
setFocusDay(flag) {
  if (typeof flag !== 'boolean') { flag = true; }
  for (let i = 0; i < this.days.length; i++) {
    const dayNode = this.days[i];
    const day = this.getDayFromDataDateAttribute(dayNode);
    dayNode.tabIndex = -1;
    if (this.isSameDay(day, this.focusDay)) {
      dayNode.tabIndex = 0;
      if (flag) { dayNode.focus(); }
    }
  }
}
```

`datepicker-dialog.js:257-273`. Translating that to React requires six distinct pieces:

1. **`tabIndex` derived, not stored** — `tabIndex={isSameDay(cellDate, focusedDate) ? 0 : -1}` on every cell. This half is free.
2. **An imperative `.focus()` after commit.** React will not move DOM focus. Either a ref-per-cell (`Map<string, HTMLElement>` keyed by ISO date, which leaks unless cleaned up in the ref callback) or a container ref plus `querySelector('[data-date="…"]')`.
3. **A `useEffect` keyed on `focusedDate`** that focuses only when focus is already inside the grid. Focus unconditionally and clicking "next month" steals focus back into the grid, so the button can never be pressed twice. The APG solves this with the boolean `flag`: eight call sites use `setFocusDay(false)` to update `tabindex` without focusing (lines 577, 586, 607, 632, 659, 668, 695, 704). In React that boolean becomes a ref, because it must not trigger a re-render.
4. **Focus restoration on month change.** `moveFocusToDay` re-renders then calls `setFocusDay()` (`:243-255`). In React the re-render is async relative to the handler, so `.focus()` must live in the effect after the new cells exist. If the target date does not exist in the new month (Jan 31 into February), clamping must happen before focusing, or focus lands nowhere, reverts to `<body>`, and silently drops the user out of the dialog.
5. **`aria-selected` toggling with omit semantics.** The APG uses `removeAttribute('aria-selected')` (`:227`). In React that is `aria-selected={isSelected || undefined}` — `aria-selected={false}` is **not** equivalent. On a `gridcell`, `"false"` means "selectable but not selected", which is a different announcement from "not part of a selection".
6. **A delayed live region.** `datepicker-dialog.js:478-489` wraps the write in a 200 ms `setTimeout` and guards it with `lastMessage` against re-announcing identical text. Both are load-bearing: an `aria-live` region mutated in the same tick as a focus move is announced unreliably. In React that becomes an effect with a timer and cleanup, and the guard becomes a ref.

The keydown switch in the APG implementation handles `Esc`, `Escape`, `' '`, `Enter`, `Tab`, `ArrowRight`, `ArrowLeft`, `ArrowDown`, `ArrowUp`, `PageUp`, `PageDown`, `Home`, `End` (`:721-800`). Six further switch blocks handle the six other focusable dialog controls (lines 496, 536, 568, 604, 650, 686) — the focus trap is hand-written per button, not generic.

Scale reference: 866 lines of vanilla JS for single-date, single-month, English, no disabled dates, no range.

---

## 3. Navigation

### react-day-picker 10.0.1

| Prop                             | Type                             | Line in `types/props.d.ts` | Behaviour                                                                                                                               |
| -------------------------------- | -------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultMonth`                   | `Date`                           | `:76`                      | uncontrolled initial month                                                                                                              |
| `month` / `onMonthChange`        | `Date` / `(month: Date) => void` | `:85`, `:429`              | controlled pair (`useCalendar.js:25-27`, `:89`)                                                                                         |
| `startMonth` / `endMonth`        | `Date`                           | `:99`, `:106`              | clamps navigation and forces `hidden` on out-of-range days                                                                              |
| `disableNavigation`              | `boolean`                        | `:134`                     | nav functions return `undefined`, dropdowns disable, keyboard cannot leave the grid                                                     |
| `hideNavigation`                 | `boolean`                        | `:127`                     | hides only                                                                                                                              |
| `pagedNavigation`                | `boolean`                        | `:112`                     | step by `numberOfMonths` instead of 1                                                                                                   |
| `numberOfMonths`                 | `number`, default 1              | `:92`                      | multi-month                                                                                                                             |
| `reverseMonths`                  | `boolean`                        | `:119`                     |                                                                                                                                         |
| `navLayout`                      | `"around" \| "after"`            | `:172`                     | since 9.7.0; undefined keeps the legacy absolutely-positioned nav, whose tab order does not match visual order under a dropdown caption |
| `showOutsideDays`                | `boolean`                        | `:194`                     | off by default                                                                                                                          |
| `fixedWeeks`                     | `boolean`                        | `:179`                     | always six rows                                                                                                                         |
| `hideWeekdays`, `showWeekNumber` | `boolean`                        | `:185`, `:201`             |                                                                                                                                         |

**`captionLayout` has exactly four values** in 10.0.1: `"label" | "dropdown" | "dropdown-months" | "dropdown-years"` (`props.d.ts:150`), default `"label"`. The dropdown is a real native `<select>` made invisible (`opacity: 0`, absolutely positioned over the label) with a visible `<span aria-hidden="true">` plus chevron on top (`components/Dropdown.js:15-19`, CSS at `src/style.css:173-189`). Month/year order follows the locale through `Intl.DateTimeFormat` (`classes/DateLib.js:506-536`).

**Trap:** enabling a year dropdown silently sets `startMonth` to `startOfYear(today − 100 years)` and `endMonth` to `endOfYear(today)` unless you pass them (`helpers/getNavMonth.js:11-24`) — a 101-option `<select>` by default. Confirmed by render.

Multi-month is `numberOfMonths={2}`, which renders two `<table role="grid">` elements inside one root. `data-multiple-months` appears on the root.

### React Aria

Previous and next come from `useCalendarBase` as `prevButtonProps` / `nextButtonProps`, wired to `state.focusPreviousPage()` / `focusNextPage()` with localised `aria-label`s and `isDisabled` derived from `isPreviousVisibleRangeInvalid()` / `isNextVisibleRangeInvalid()` (`useCalendarBase.mjs:95-106`). RAC delivers them through `ButtonContext` slots, so usage is `<Button slot="previous">` (`Calendar.mjs:76-85`).

Multi-month: `visibleDuration` is a `DateDuration`, default `{months: 1}` (`useCalendarState.d.ts:32`). Two months side by side is `visibleDuration={{months: 2}}` plus a second `<CalendarGrid offset={{months: 1}}/>`; `CalendarGridProps.offset` exists for exactly this (`react-aria-components/dist/types/src/Calendar.d.ts:199-204`), and `CalendarHeading` takes the same `offset`.

`pageBehavior` is `'single' | 'visible'`, default `'visible'` (`types.d.ts:6`, `:47-52`) — resolved as `pageBehavior === 'visible' ? visibleDuration : unitDuration(visibleDuration)` (`useCalendarState.mjs:152-158`). `focusedValue` / `defaultFocusedValue` / `onFocusChange` are all present (`types.d.ts:30-35`); default focus falls back to `defaultFocusedValue`, then the first selected value, then `today(timeZone)`, each constrained to min and max (`useCalendarState.mjs:55-66`). `selectionAlignment` is `'start' | 'center' | 'end'`, default `'center'`, and RangeCalendar auto-flips to `'start'` when the selection would not fit (`useRangeCalendarState.mjs:28-35`).

**Month and year dropdowns: the library ships the logic, you render the `<Select>`.** `CalendarMonthPicker` and `CalendarYearPicker` landed in RAC 1.18.0 and are pure render-prop wrappers with no DOM of their own (`Calendar.mjs:353-366`). The payload is `{ 'aria-label', value: Key, onChange: (key) => void, items: Array<{id, date, formatted}> }` (`react-aria/dist/types/src/calendar/useCalendarYearPicker.d.ts:21-31`). `useCalendarMonthPicker` respects non-Gregorian month counts via `calendar.getMonthsInYear`; `useCalendarYearPicker` defaults to `visibleYears: 20` and clamps to `state.minValue` / `maxValue`. Also new in 1.18.0: `CalendarHeading` (formats the month title with an `offset`) and `weeksInMonth`.

Open bug: [adobe/react-spectrum#10531](https://github.com/adobe/react-spectrum/issues/10531), "CalendarYearPicker omits the final year when both minValue and maxValue are set", filed 2026-08-28, still open.

### Hand-rolled

Month and year stepping is cheap arithmetic (`visibleMonth.add({months: 1})`, or `addMonths`). The cost is that stepping must also update the live region, re-render, clamp `focusedDate` into the new month, and **not** steal focus. Month-end clamping is free with Temporal — `PlainDate.from('2026-01-31').add({months: 1})` gives `2026-02-28`, because `add()` defaults to `'constrain'` overflow.

The APG example uses four nav buttons (`prev-year`, `prev-month`, `next-month`, `next-year`), each with its own `aria-label` and its own keydown handler for the focus trap.

A month or year dropdown is not in either APG example. Building one inside a `role="grid"` dialog means a second composite widget with its own keyboard contract, a year range bounded by min and max, and another live-region-plus-focus-clamp event on change — roughly the same order of work as the grid navigation itself.

Multi-month multiplies the hard parts: one `role="grid"` or N (arrows crossing from the right edge of month 1 into month 2 only work inside a single grid; N grids means N roving-tabindex scopes and Tab between them); `aria-labelledby` per grid; range highlighting spanning grids, so range state cannot live in per-month component state; and Home/End semantics become ambiguous.

---

## 4. Constraints

### react-day-picker 10.0.1

`Matcher = boolean | ((date: Date) => boolean) | Date | Date[] | DateRange | DateBefore | DateAfter | DateInterval | DayOfWeek` (`types/shared.d.ts:125`). `disabled` and `hidden` both take `Matcher | Matcher[]` (`props.d.ts:280, 287`). Evaluation at `utils/dateMatchModifiers.js:16-58` — note `DateInterval` (`{before, after}`) is **exclusive** at both ends and flips to a union when `before <= after` (`:40-46`), while `DateRange` (`{from, to}`) is inclusive (`:26-28`).

There is no `min` / `max` date pair. The idiom is `hidden={{ before: date }}` / `hidden={{ after: date }}` — v10 removed the `fromDate` / `toDate` props that used to mean this, and the upgrade guide names that replacement explicitly.

Custom `modifiers` are `Record<string, Matcher | Matcher[]>` (`props.d.ts:307`) and override built-ins (`createGetModifiers.js:88-89`), mapping to classes through `modifiersClassNames` and to inline styles through `modifiersStyles`.

`today?: Date` overrides "now" (`props.d.ts:294`), defaulting to `dateLib.today()` and matched with `isSameDay` (`createGetModifiers.js:41`).

Week and locale: `weekStartsOn?: 0..6` (`:403`), `firstWeekContainsDate?: 1 | 4` (`:409`), `ISOWeek` (`:226`), `broadcastCalendar` (`:218`, forces Monday), `locale` (`:376`), `dir` (`:328` — sets `dir` on root, flips arrow-key direction, flips chevrons and gradient direction in CSS), `numerals` across 17 numbering systems (`shared.d.ts:291`, via `Intl.NumberFormat` digit mapping), `timeZone` (IANA or offset, since 9.1.1, `:237`), and experimental `noonSafe` (9.13.0, `:248`).

`timeZone` works by rewriting **every** date-bearing prop through `TZDate` at the top of render (`DayPicker.js:35-85`): `today`, `month`, `defaultMonth`, `startMonth`, `endMonth`, `selected`, `disabled`, `hidden`, and each entry of `modifiers`.

**date-fns is a hard runtime dependency, not a peer.** `package.json` declares `dependencies: { "@date-fns/tz": "^1.4.1", "date-fns": "^4.1.0" }`. `classes/DateLib.js:2` is a single flat import of **31** date-fns functions, and `dist/esm/index.js:1` re-exports `TZDate` from `@date-fns/tz` unconditionally, so the timezone package is in the graph whether or not you set `timeZone`. `locale/en-US.js` imports `format` and `date-fns/locale`'s `enUS`, so the default English locale is always pulled in.

There **is** a `DateLib` abstraction — a class wrapping date-fns whose every method can be swapped through the experimental `dateLib?: Partial<typeof DateLib.prototype>` prop (`props.d.ts:454-461`, class at `classes/DateLib.js:15`). That is the mechanism behind the `@daypicker/hijri|persian|…` add-ons, and it is the door a Temporal adapter would come through. It does not remove the date-fns import: `DateLib.js` imports the 31 functions at module scope regardless.

**Temporal is not supported today.** The v10 upgrade guide says only that the scoped namespace "gives us room to support multiple calendars and future Temporal API integrations under dedicated namespaces". No Temporal reference exists in `dist/`.

### React Aria

`minValue`, `maxValue`, `isDisabled`, `isReadOnly`, `isInvalid`, `errorMessage`, `autoFocus` all on `CalendarPropsBase` (`react-stately/dist/types/src/calendar/types.d.ts:7-52`). `isDateUnavailable(date)` on Calendar, `(date, anchorDate)` on RangeCalendar. Unavailable cells stay focusable but unselectable, and the type doc requires **4.5:1 contrast** on them, citing WCAG (`react-aria-components/dist/types/src/Calendar.d.ts:161-171`).

Today: `isToday(date, state.timeZone)`, surfaced as `isToday` / `[data-today]` (`Calendar.mjs:294`, `:340`) and folded into the aria label as `todayDate` / `todayDateSelected`.

`firstDayOfWeek` is `'sun' | 'mon' | … | 'sat'` (`types.d.ts:53-56`), consumed by `startOfWeek`, `getDayOfWeek`, `getWeeksInMonth` and by the header day names. It landed in `react-aria-components@1.6.0`, published 2025-01-15.

Locale: `useLocale()` returns context **or a default**, so `I18nProvider` is optional (`react-aria/dist/private/i18n/I18nProvider.mjs:54-58`). The default is `window[Symbol.for('react-aria.i18n.locale')] || navigator.language || 'en-US'`. **SSR caveat, from the source comment:** "We cannot determine the browser's language on the server, so default to `en-US`. This will be updated after hydration" (`useDefaultLocale.mjs:52-60`) — a real hydration flash for non-English users unless you set an explicit `I18nProvider locale`. Related open issue: [#7474, "I18nProvider breaks client hydration in TanStack Start"](https://github.com/adobe/react-spectrum/issues/7474), which matters because this repo runs `@tanstack/react-start`.

Calendar systems: 13 ship in `@internationalized/date` (Gregorian, Japanese, Buddhist, Taiwan, Persian, Indian, three Islamic variants, Hebrew, two Ethiopic, Coptic). The display calendar never leaks into `onChange` — emitted values convert back to the original value's calendar, else Gregorian (`useRangeCalendarState.mjs:169-176`).

**JS `Date` is not accepted.** The value type is closed:

```ts
export type DateValue = CalendarDate | CalendarDateTime | ZonedDateTime
```

`react-stately/dist/types/src/calendar/types.d.ts:4`. There is no `Date` branch anywhere in `CalendarProps` or `RangeCalendarProps`; the state machinery calls `.compare()`, `.add()`, `.subtract()`, `.set()`, `.calendar` on values, so a `Date` throws. Interop is explicit and cheap but mandatory: in via `parseDate('2026-09-09')`, `today(getLocalTimeZone())`, `fromDate(jsDate, timeZone)`; out via `.toDate(timeZone)` or `.toString()` for ISO 8601. **Using `date-fns` alongside means a two-hop conversion at each boundary and two date libraries in the bundle.** There is no adapter package.

**Temporal is intent only.** `@internationalized/date@3.12.4`'s README: "The Temporal proposal will eventually address this in the language, and `@internationalized/date` is heavily inspired by it. We hope to back the objects in this package with it once it is implemented in browsers." The only tracking issue is [#10068](https://github.com/adobe/react-spectrum/issues/10068), open since 2026-05-14 with no maintainer reply, and scoped only to `DateFormatter.format` accepting Temporal — not to Temporal-backed objects. No Temporal mention in the 1.17 through 1.21 release notes.

### Hand-rolled: what `Intl` gives free

Verified against Node 26.8.1, V8 14.6, ICU 78.3.

**Free:**

- **Weekday names.** `new Intl.DateTimeFormat('en-US', {weekday: 'short', timeZone: 'UTC'})` over seven consecutive dates gives `Sun,Mon,Tue,Wed,Thu,Fri,Sat`; `fr-FR` gives `dim.,lun.,mar.,mer.,jeu.,ven.,sam.` Supported since Chrome 24 / Firefox 29 / Safari 10.
- **Month names.** Same mechanism with `{month: 'long'}`.
- **Full per-cell `aria-label` text.** `{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}`. Note the APG example instead hardcodes English arrays (`datepicker-dialog.js:13-35`) — that is the shortcut not to copy.
- **First day of week.** `Intl.Locale.prototype.getWeekInfo()`. Measured: `en-US` gives `{"firstDay": 7, "weekend": [6,7]}`; `en-GB`, `fr-FR`, `vi-VN` give `firstDay: 1`; `he-IL` gives `{"firstDay": 7, "weekend": [5,6]}`; `ar-EG` gives `{"firstDay": 6, "weekend": [5,6]}`.
  **Availability: Baseline "newly available" since July 2026.** Per `@mdn/browser-compat-data@8.1.0`: Chrome and Edge 130, Opera 115, Safari 17, Safari iOS 17, **Firefox 153**, Node 24.0.0, Deno 2.1. The non-standard accessor form `weekInfo` shipped much earlier (Chrome 99, Safari 15.4, Node 18). Firefox 153 is the gate.
  MDN documents a third property, `minimalDays`. The actual V8/ICU 78 return value is `{firstDay, weekend}` only, and the tc39 Intl Locale Info proposal defines the WeekInfo Record as exactly `[[FirstDay]]` and `[[Weekend]]`. **MDN is stale on this point.** Only matters for ISO week numbers.

**Not free:**

- **Disabled dates.** Pure application logic. No `Intl` involvement and no APG guidance — you author the predicate, the `aria-disabled` attribute, the arrow-key skip, and the click suppression.
- **min and max.** Comparison only (`Temporal.PlainDate.compare`, or `isBefore` / `isAfter`), but it feeds four consumers: cell disabled state, arrow-key clamping, PageUp/PageDown clamping, and nav-button disabled state.
- **"Today".** `Temporal.Now.plainDateISO()` gives the user's today in the user's zone, and it changes at local midnight. `Intl` gives nothing.
- **Leading-blank count from a week start.** See the three-numbering-conventions trap in section 6.

---

## 5. Styling

### react-day-picker 10.0.1

**The default CSS can be dropped entirely.** `style.css` is opt-in and never imported by JS — `package.json` lists it only under `exports["./style.css"]` and `"style"`, and a bundled `import { DayPicker }` contains zero `.css` references. `sideEffects: ["**/*.css"]` declares the JS side-effect-free. The docs say: "To use the included styles, add `@daypicker/react/style.css` to your HTML document."

If you did ship it, the file is 457 lines: ~35 CSS custom properties, a box-sizing reset, 44×44 day cells with 100%-radius buttons, button resets, the dropdown overlay trick, nav positioning, the range gradient, and the animation keyframes. **Zero `!important`.** Colors it would inject: `--rdp-accent-color: blue`, `--rdp-accent-background-color: #f0f0ff`, `--rdp-range_start-color: white`, `--rdp-range_end-color: white`, `outline: 5px auto Highlight`, and `transparent` inside two `linear-gradient`s — `transparent` being a zero-alpha color, which is the ADR 0004 collision if the file ever ships. Five opacity variables handle disabled, outside, weekday, week-number and nav-disabled states.

**The library draws no focus ring on days.** The only focus style anywhere is `.rdp-dropdown:focus-visible ~ .rdp-caption_label { outline: 5px auto Highlight; }` (`src/style.css:121-125`), for the caption dropdown. Day buttons and nav buttons fall back to the UA default outline, so the registry owns the ring.

**One inline `style` you cannot remove**, and it is not routed through the `styles` prop — the visually-hidden live-region span rendered only when `captionLayout` starts with `"dropdown"` (`DayPicker.js:282-292`). Verified by render: under the default `captionLayout="label"` the whole DOM contains **zero** `style=` attributes; under `captionLayout="dropdown"` it contains exactly one, the span above. It is colorless and visually hidden. There is a `nonce` prop specifically for CSP on it (`props.d.ts:350-354`). No CSS variable is emitted by the component — every `--rdp-*` lives in the optional stylesheet.

**Class slots: 33 total**, all overridable through `classNames`, which shallow-merges per key over `getDefaultClassNames()` (`DayPicker.js:113`). Supplying a key fully replaces the `rdp-*` string for that slot; without the stylesheet the defaults are inert.

- **`UI`, 24 slots** (`UI.js:7-68`): `root`, `chevron`, `day`, `day_button`, `caption_label`, `dropdowns`, `dropdown`, `dropdown_root`, `footer`, `month_grid`, `month_caption`, `months_dropdown`, `month`, `months`, `nav`, `button_next`, `button_previous`, `week`, `weeks`, `weekday`, `weekdays`, `week_number`, `week_number_header`, `years_dropdown`.
- **`DayFlag`, 5** (`:70-82`): `disabled`, `hidden`, `outside`, `focused`, `today`.
- **`SelectionState`, 4** (`:87-97`): `range_end`, `range_middle`, `range_start`, `selected`.
- **`Animation`, 8** (`:102-120`): the four `weeks_*` and four `caption_*` enter/exit slots.

Three DOM nodes have no class slot: the `<thead>` wrapper (only its inner `<tr>` takes `weekdays`), the fallback `<span>` rendered for the non-dropdown half of `dropdown-months` / `dropdown-years`, and the hidden live-region span. All three are reachable through the `components` prop instead — 26 slots (`shared.d.ts:21-72`), each a thin DOM wrapper, so total DOM replacement is available.

**`data-*` attributes emitted.** On the root (`helpers/getDataAttributes.js:10-24`): `data-mode`, `data-required`, `data-multiple-months`, `data-week-numbers`, `data-broadcast-calendar`, `data-nav-layout`. On each day `<td>` (`DayPicker.js:332`): `data-day` (ISO date), `data-month` (only when outside), `data-selected`, `data-disabled`, `data-hidden`, `data-outside`, `data-focused`, `data-today`. All boolean ones use `|| undefined`, so they are present-or-absent and render `="true"`, never `="false"`.

**There is no `data-range-start`, `data-range-middle`, or `data-range-end`.** Range state is exposed only as class names and through the `modifiers` object passed to a custom `DayButton`. This is exactly why shadcn's `CalendarDayButton` re-derives them by hand:

```tsx
data-range-start={modifiers.range_start}
data-range-end={modifiers.range_end}
data-range-middle={modifiers.range_middle}
data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
```

That shadcn wrapper also uses `ring-ring/50` (banned by ADR 0004), `shadow-xs` (banned by ADR 0003), and `has-focus:ring-[3px] has-focus:ring-ring/50` on the dropdown root — so it is a reference for the wiring, not for the classes.

Against the registry's rules: the component emits no color at all, no shadow, no elevation. The default stylesheet's selected state is already border-based (`--rdp-selected-border: 2px solid var(--rdp-accent-color)`), which is the mechanic ADR 0003 wants, but it lives in the droppable file and would be re-implemented.

### React Aria

**Truly unstyled — zero CSS ships.** `find . -name '*.css'` in the `react-aria-components@1.21.1` tarball returns **0 files**. There is no optional stylesheet to opt into. Docs: "React Aria does not include any styles by default." The `sideEffects: ["*.css"]` field is a guard, not a shipped asset. `grep -rIl '!important'` across `dist/private/*.mjs` returns nothing.

Two runtime side effects exist:

1. `usePress` prepends one `<style id="react-aria-pressable-style">` to `document.head` (`react-aria/dist/private/interactions/usePress.mjs:583-601`). Its entire content is `@layer { [data-react-aria-pressable] { touch-action: pan-x pan-y pinch-zoom; } }` — no color, and inside an anonymous `@layer`, so lowest cascade precedence. It also sets inline `userSelect: none` on the pressed element for the duration of a press.
2. Including a Calendar pulls `runAfterTransition`, which attaches `transitionrun` and `transitionend` listeners on `document.body` at module scope (`react-aria/dist/private/utils/runAfterTransition.mjs:63-68`). It observes your transitions; it creates none.

**No focus ring of its own.** `useFocusRing` returns `isFocusVisible` state only; painting it is yours.

**`CalendarCell` data attributes, the full set** (`react-aria-components/dist/private/Calendar.mjs:327-341`, one-to-one with the `@selector` annotations in `dist/types/src/Calendar.d.ts:92-184`):

| Attribute                    | Render prop             |
| ---------------------------- | ----------------------- |
| `data-focused`               | `isFocused`             |
| `data-focus-visible`         | `isFocusVisible`        |
| `data-hovered`               | `isHovered`             |
| `data-pressed`               | `isPressed`             |
| `data-selected`              | `isSelected`            |
| `data-selection-start`       | `isSelectionStart`      |
| `data-selection-end`         | `isSelectionEnd`        |
| `data-disabled`              | `isDisabled`            |
| `data-unavailable`           | `isUnavailable`         |
| `data-outside-month`         | `isOutsideMonth`        |
| `data-outside-visible-range` | `isOutsideVisibleRange` |
| `data-invalid`               | `isInvalid`             |
| `data-today`                 | `isToday`               |

Plus non-attribute render values `date: CalendarDate` and `formattedDate: string`. **The three range states ship as first-class attributes**, which is the difference from react-day-picker.

On the `Calendar` / `RangeCalendar` root only two: `data-disabled`, `data-invalid`. `CalendarGrid`, `CalendarGridHeader`, `CalendarGridBody`, `CalendarHeaderCell` and `CalendarHeading` emit **no** `data-*` and take a plain `className?: string` with no render function (`Calendar.d.ts:185-192`, `:218-225`, `:234-241`, `:248-255`, `:293-301`).

`className` and `style` accept functions of the render props on `Calendar`, `RangeCalendar` and `CalendarCell` (`Calendar.d.ts:271`). Default class names (`react-aria-Calendar`, `react-aria-CalendarCell`, …) apply only when you pass no `className`.

`tailwindcss-react-aria-components@2.2.0` (peer `tailwindcss ^4.0.0`) exists but is **not needed** — it only adds shorthand variants (`selected:` for `data-[selected]:`). Tailwind 4's native `data-[…]` variants cover every attribute above.

Against the registry's rules: nothing manufactures a color, an alpha, a shadow, or an elevation token. Interaction state arrives purely as boolean attributes, so border-only feedback is entirely expressible.

### Hand-rolled

Full control by construction. The APG example already uses `data-date="YYYY-MM-DD"` on every cell (`datepicker-dialog.js:230`), so the same data-attribute idiom for `data-selected`, `data-range-middle`, `data-outside`, `data-today` is natural. Motion's `layout` prop on a range highlight is only possible on DOM you own.

---

## 6. Fit

### Measured bundle cost

All figures esbuild, `--bundle --minify --format=esm`, `react` and `react-dom` external, gzipped. Module graph only.

| Import                                                                                                  |   Raw min |         Gzip |
| ------------------------------------------------------------------------------------------------------- | --------: | -----------: |
| `react-aria-components` 1.21.1 — `RangeCalendar` + grid parts + `Button` + `Heading`                    | 124,528 B | **38,544 B** |
| `react-aria-components` 1.21.1 — `Calendar` only, same parts                                            | 121,205 B |     37,501 B |
| `@react-aria/calendar` + `@react-stately/calendar` + `@internationalized/date` hooks                    | 108,187 B | **33,311 B** |
| `react-aria-components` — full `DatePicker` (DateInput, Segment, Popover, Dialog, Calendar)             | 250,740 B |     76,538 B |
| `react-day-picker` 10.0.1 — `DayPicker` + `getDefaultClassNames` (includes date-fns and `@date-fns/tz`) |  68,592 B | **20,474 B** |
| `date-fns` 4.4.0 — 13-function calendar-grid subset **including `format`**                              |  21,220 B |      6,138 B |
| `date-fns` 4.4.0 — same 12 functions **without `format`**                                               |   2,132 B |    **882 B** |
| `@internationalized/date` 3.12.4 — 8-function subset                                                    |  13,706 B |      4,506 B |
| `temporal-polyfill` 1.0.4 — full `Temporal` class API                                                   |  56,395 B |     19,768 B |
| `temporal-polyfill` 1.0.4 — `fns/PlainDate` subset, 14 calendar functions                               |  19,700 B |  **7,344 B** |
| `@js-temporal/polyfill` 0.5.1 — full                                                                    | 162,137 B |     46,860 B |
| `temporal-polyfill-lite` 0.4.3 — full                                                                   |  51,621 B |     18,342 B |
| Temporal native, no polyfill                                                                            |         — |      **0 B** |

Two facts fall out of that table.

**`format` is 92 % of date-fns's cost for a calendar grid.** `package/format.js:1` imports `defaultLocale`, and `package/_lib/defaultLocale.js` is one line re-exporting the full `en-US` locale. So `format` unconditionally pulls the locale plus the formatter and longFormatter token tables, tree-shaking or not. Adding `enUS` explicitly costs 2 more bytes because it was already there; adding `fr` costs ~1.4 kB gzip more. **If display strings come from `Intl.DateTimeFormat` instead, date-fns for a calendar grid costs 882 B gzipped.** Importing all 98 locales costs 129,695 B gzipped, so per-locale subpaths matter.

**The React Aria hooks buy about 5 kB over the components.** 33.3 kB against 38.5 kB. Since the April 2026 consolidation there is no lighter route into React Aria's calendar.

### Tree-shaking and module format

`react-day-picker` 10.0.1 is dual ESM/CJS (`"type": "module"`, `main` → `dist/cjs`, `module` → `dist/esm`, full conditional `exports` with `import`/`require` branches, subpaths `.`, `./locale`, `./locale/*`, `./style.css`, `./style.module.css`). `sideEffects: ["**/*.css"]`. Tree-shaking works: importing `addToRange` alone bundles to 9,563 B gzipped with zero `DayPicker` in the output — the 33 kB raw floor is `defaultDateLib` dragging in the date-fns set. `dist.unpackedSize` is 987.3 kB, dominated by 95 locale modules (760 kB) that live behind subpaths and shake out. **No `"use client"` directive anywhere in `dist/`** — a consumer's wrapper must carry it.

`react-aria-components` 1.21.1: dual ESM/CJS, `sideEffects: ["*.css"]`; `react-aria`, `react-stately` and `@internationalized/date` all declare `sideEffects: false`. Importing from the barrel and from the `react-aria-components/Calendar` subpath measure within 80 bytes of each other, so **the barrel tree-shakes cleanly** and subpaths are a build-speed optimisation, not a size one. Verified by grep on the bundled Calendar output: no `createPortal`, no `useOverlay`, no `FocusScope`, no `ariaHideOutside`. Note the barrel imports `"client-only"` (`dist/exports/index.mjs:69`), so it cannot be imported in a React Server Component; the per-component subpaths do not.

`react-aria-components` inlines **34 locales' calendar strings** by default — verified by grep of the bundled output. A `react-aria-components/i18n/*` subpath ships per-locale bundles for trimming.

Registry unpacked sizes: `react-aria-components` 6.59 MB, `react-aria` 15.6 MB, `react-stately` 5.90 MB, `@internationalized/date` 1.22 MB. On disk after a clean install: 9.9 MB, 37 MB, 9.7 MB, 1.5 MB.

Dependency counts: `react-day-picker` has **2** runtime dependencies (`date-fns`, `@date-fns/tz`). `react-aria-components` has **12** and **zero** `@react-aria/*` or `@react-stately/*` — verified by clean install, `ls node_modules/@react-aria` returns "No such file or directory": `react-aria`, `react-stately`, `@internationalized/date`, `@internationalized/number`, `@internationalized/string`, `@react-types/shared`, `@swc/helpers`, `tslib`, `aria-hidden`, `client-only`, `clsx`, `use-sync-external-store`.

### React 19

Both support it.

`react-day-picker` 10.0.1: `peerDependencies: { react: ">=16.8.0", "@types/react": ">=16.8.0" }` with `@types/react` marked optional (that optionality was added in 10.0.1, PR #2997). No React-19-specific code and no legacy hazards — grep for `forwardRef`, `use(`, `useSyncExternalStore`, `useId` across `dist/esm` returns zero matches. Refs are threaded as ordinary props.

`react-aria-components` 1.21.1: peer `^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1` on both `react` and `react-dom`, identical on `react-aria` and `react-stately`. A clean install with `react@19.2.0` / `react-dom@19.2.0` produces no peer warnings. Open React-19-adjacent issues ([#7875](https://github.com/adobe/react-spectrum/issues/7875), [#10485](https://github.com/adobe/react-spectrum/issues/10485), [#7543](https://github.com/adobe/react-spectrum/issues/7543)) — none touch Calendar.

A hand-rolled grid is indifferent to React 19: nothing in the requirement list touches `use()`, Actions, or Server Components. The hard parts — roving tabindex, imperative `.focus()`, live-region timing — are identical on 18 and 19.

### Library-owned animation

ADR 0001 gives motion to the registry. Where each candidate stands:

**react-day-picker owns a month-transition animation, gated behind one opt-in prop.** `animate?: boolean` (`props.d.ts:206-208`), and `useAnimation(rootElRef, Boolean(props.animate), …)` at `DayPicker.js:234-239`. With `animate` unset the hook returns at `useAnimation.js:36-45` before touching the DOM, every `data-animated-*` attribute is `undefined`, and the library performs no animation and writes no inline style.

Set it, and the library clones the previous root (`:57`), reinserts the old month into the DOM (`:168`), imperatively writes `style.isolation = "isolate"` (`:101`), `navEl.style.zIndex = "1"` (`:105`), `position` / `overflow` on the incoming month (`:113-114`), and `pointerEvents` / `position` / `overflow` / `aria-hidden` / `opacity: 0` on the outgoing one (`:146-153`). The motion itself comes from the eight `Animation` class slots, whose keyframes live in `style.css:345-457` (`rdp-slide_in_left/right`, `rdp-slide_out_left/right`, `rdp-fade_in`, `rdp-fade_out`) driven by `--rdp-animation_duration: 0.3s` and `--rdp-animation_timing: cubic-bezier(0.4, 0, 0.2, 1)`. The class slots are remappable through `classNames`; the imperative inline-style writes at `:101-153` are not. There is no `requestAnimationFrame`, no `setTimeout`, no WAAPI, no motion library — one `animationend` listener at `useAnimation.js:160` is the only hit across `dist/esm`. It deliberately skips animating when a day is focused, with the source comment "skip animation if a day is focused because it can cause issues to the animation and is better for a11y" (`:88-90`).

**React Aria owns no animation in the calendar path.** Grep of the bundled Calendar and RangeCalendar output for `animationName`, `getAnimations`, `animationend`, `keyframes` returns zero hits; `grep -c 'transition\|animation\|keyframes\|requestAnimationFrame' Calendar.mjs` returns **0**. The two `requestAnimationFrame` calls and one `transitionend` listener in the bundle are focus and press plumbing, not tweening. RAC's animation utilities (`useEnterAnimation`, `useExitAnimation`, `data-entering`, `data-exiting`) live only in `Modal.mjs`, `Popover.mjs`, `Tooltip.mjs`, `Tabs.mjs`, `SharedElementTransition.mjs`, and appear in a `DatePicker` bundle only because `Popover` is in that tree. Even there the mechanism is that RAC sets `data-entering` / `data-exiting` and waits on `element.getAnimations()` for CSS you wrote. Docs: "The library itself does not animate components automatically — animations are implemented through your styling."

**A hand-rolled grid owns nothing it does not write.**

### Overlap with the Radix floating layer (ADR 0005)

`react-aria-components@1.21.1` does ship a complete parallel floating layer: `Popover`, `Modal`, `ModalOverlay`, `Dialog`, `Tooltip`, `Select`, `Menu`, `ComboBox`, plus `PortalProvider`, `useOverlayPosition`, `calculatePosition`, `usePopover`, `useModalOverlay`, `usePreventScroll`, `ariaHideOutside`, `DismissButton`, `useCloseOnScroll`. `aria-hidden` is a direct dependency of `react-aria`. It also ships its own `FocusScope`, `useFocusRing`, `useFocusVisible`, and `usePress`.

**None of that is reachable from `Calendar` or `RangeCalendar`.** The Calendar bundle contains no portal, no overlay positioning, no `FocusScope` — `grep -rln FocusScope dist/private/*.mjs` lists only `Menu`, `GridList`, `ListBox`, `Tree`, `Table`. The Calendar's DOM surface is `div[role=application] > table[role=grid] > td[role=gridcell] > div[role=button]` plus context-fed button prop bags. Composing a RAC calendar inside a Radix popover imports none of RAC's overlay code. The 76.5 kB gzip `DatePicker` figure is what pulling RAC's own wrapper would cost, and the delta over the bare Calendar is Popover, Dialog and DateInput.

react-day-picker has no popover, portal, positioning, or dismissal logic at all: no `role="dialog"` unless you pass `role`, no focus trap, no Escape handling.

### Temporal's actual availability

Spec status is **Stage 4** (`tc39/proposal-temporal` README).

Shipping, per `@mdn/browser-compat-data@8.1.0` (identical data for `Temporal.PlainDate`, `.dayOfWeek`, `Temporal.PlainYearMonth`, `Temporal.Now.plainDateISO`):

| Engine                       | Version                                |
| ---------------------------- | -------------------------------------- |
| Chrome, Chrome Android, Edge | 144                                    |
| Opera                        | 128                                    |
| Firefox, Firefox Android     | 139                                    |
| **Safari**                   | **preview only** (webkit.org/b/223166) |
| **Safari iOS**               | **not supported**                      |
| Node.js                      | 26.0.0                                 |
| Deno                         | 2.7                                    |

MDN carries: "Limited availability — This feature is not Baseline because it does not work in some of the most widely-used browsers." **Safari is the blocker, and on iOS it is the only engine**, so "Temporal-native, no polyfill" means broken on every iPhone today.

A Node wrinkle worth knowing: Temporal in Node 26 requires a build-time opt-in (`--v8-enable-temporal-support`, and the build now needs a Rust toolchain — nodejs/node#63225). Measured on two Node 26.8.1 builds: the Homebrew build reports `typeof Temporal === "undefined"`, the official nodejs.org darwin-arm64 tarball reports `"object"`. Same version number, different answer, so CI and contributor machines can disagree.

### The hand-rolled risk list

1. **Accessibility bugs are silent.** Everything past the APG's 866-line single-date reference is unreviewed. The failure mode is not a crash; it is a screen-reader user who cannot tell what got selected, found months later.
2. **`aria-selected={false}` versus omitted.** On a `gridcell`, `false` means "selectable, not selected"; absent means "not part of a selection widget". React's natural `aria-selected={isSelected}` produces the wrong one. The APG uses `removeAttribute`.
3. **`aria-disabled` is uncharted.** Zero occurrences across both APG date-picker examples; the APG marks out-of-month cells with a class and blanks their text, a visual-only treatment with no ARIA. For genuinely unavailable dates you invent the announcement, the arrow-key skip, and whether disabled cells stay in the roving tabindex. (Note both libraries answer this: react-day-picker keeps a disabled-but-focused day reachable via `aria-disabled`; React Aria distinguishes disabled — not focusable — from unavailable — focusable, 4.5:1 contrast required.)
4. **Live-region timing.** The 200 ms `setTimeout` is not decoration. Get it wrong and month changes announce inconsistently across NVDA, JAWS and VoiceOver — a class of bug essentially untestable in CI.
5. **Three week-numbering conventions in one component.** `Temporal.PlainDate.prototype.dayOfWeek` is ISO, 1 = Monday through 7 = Sunday (verified: 2026-09-09, a Wednesday, gives 3; 2026-09-06, a Sunday, gives 7). `Date.prototype.getDay()` and date-fns `weekStartsOn` are 0 = Sunday through 6 = Saturday. `Intl.Locale.getWeekInfo().firstDay` is 1 = Monday through 7 = Sunday. For a Sunday-start grid the leading-blank count is `dayOfWeek % 7`, not `dayOfWeek` and not `dayOfWeek - 1`. Bridging `getWeekInfo` to date-fns is `weekStartsOn = firstDay % 7`. This shifts the whole grid by one column and shows up for only one of the two week-start settings.
6. **i18n.** Month and weekday names are free from `Intl`; locale-aware week start needs `getWeekInfo()`, Baseline only since July 2026 and gated on Firefox 153. RTL locales (`ar-EG` gives `firstDay: 6`) invert column order, which the APG example does not address.
7. **DST and time zones.** `Temporal.PlainDate` sidesteps this by construction — calendar-only, no instant, no zone. That is the strongest argument for Temporal over `Date`: a `Date`-based grid on a DST-transition day can produce a duplicate or missing cell, because `setDate(d.getDate() + 1)` (exactly what `datepicker-dialog.js:202` does) crosses a 23- or 25-hour day. The residual risk is the boundary — `Temporal.Now.plainDateISO()` depends on the ambient zone, and a range submitted to a server must serialise as a plain date string or a 2026-09-09 selection becomes 2026-09-08T22:00Z for a user at UTC+2. Note `date-fns` 4 answers this with the separate `@date-fns/tz` package, and `react-day-picker` rewrites every date prop through `TZDate` when `timeZone` is set.
8. **Testing burden.** Behaviours needing pins: 11 key bindings × (in-month / crosses month / hits a min-max boundary); disabled-cell skipping in all four arrow directions; focus landing on the right cell after every month change including the Jan-31-into-February clamp; focus **not** moving when nav buttons are used; `aria-selected` present on exactly one cell; the live region announcing after the month change; range normalisation on backwards selection; the same-day range; the leading-blank count under both week starts. Focus assertions need real DOM focus (`document.activeElement`), which rules out shallow rendering.

---

## Not verified

- **Runtime behaviour in a real browser** for either library: drag-select feel, hover-preview latency, screen-reader announcement ordering, and whether react-day-picker's `data-focused` survives long enough after arrow-key navigation for a `group-data-[focused=true]` ring to be visible. All keyboard and focus claims above are read from source, not exercised in a browser. No assistive-technology testing was performed, so the `<thead aria-hidden="true">` finding in both libraries is a source and DOM observation, not a measured NVDA or VoiceOver outcome.
- **react-day-picker's `useAnimation` end to end.** Read in full, not run.
- **Which `calendar.tsx` `shadcn add calendar` installs today.** The `new-york-v4` registry JSON was read; the docs page shows a newer locale-aware variant not present in that JSON, and the two were not reconciled.
- **First-release dates** for React Aria's `commitBehavior` and `visibleYears` — present in 3.52.1 and 1.21.1, not bisected. Likewise the release that introduced `selectionMode="multiple"` in `@react-stately/calendar`.
- **`tailwindcss-react-aria-components@2.2.0`'s variant list** — the package and its peer range are confirmed, its coverage of `data-today` and `data-outside-month` specifically is not.
- **Safari's exact Temporal status.** BCD records `"preview"` with no version. Whether a Safari stable release shipped Temporal between BCD 8.1.0 and today is unconfirmed; the tc39 README still lists JavaScriptCore with no shipping date.
- **`temporal-polyfill-lite@0.4.3`** is a release candidate per the tc39 README; only its full `import { Temporal }` entry was measured, not any `fns`-style subpath.
- **Bundle numbers are esbuild-specific.** Rollup, Vite and webpack differ, likely by single-digit percent, and the barrel-versus-subpath parity finding for `react-aria-components` may not hold on a bundler with weaker tree-shaking. All figures are module graph only — no React, no runtime, no CSS.
- **APG line counts** (866 and 898) are of `w3c/aria-practices` `main` as read today; the repo has no version tags to pin against.
- **The daypicker.dev changelog page in full.** The GitHub release bodies for v10.0.0 and v10.0.1 and the `/upgrading` guide were read; `https://daypicker.dev/changelog` was not.
