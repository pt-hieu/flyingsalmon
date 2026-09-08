# Combobox under the floating layer

Research for [#115](https://github.com/pt-hieu/flyingsalmon/issues/115), part of the batch-4 map [#113](https://github.com/pt-hieu/flyingsalmon/issues/113). Facts only; no decision. Everything below was read on **2026-09-09** from published npm tarballs, official documentation, and issue trackers. Versions are pinned throughout. Where a claim could not be verified it says so.

Method: each package was fetched with `npm pack <name>@<version>` and read from `package/dist/` in the tarball rather than from a secondary write-up. Documentation URLs are given where a doc statement is the source.

## Why the ticket exists

- **Radix has no combobox.** `@radix-ui/react-combobox` returns 404 on the npm registry. The only combobox-named artefacts in `radix-ui/primitives` are PR #61 (merged 2020-08-07, "Integrate style extraction for `Combobox`") and PR #109 (closed 2020-08-18, "Reset stories for `Combobox`"); no combobox package ever shipped. The `next` dist-tag `radix-ui@1.7.0-rc.1785512840124` lists 55 `@radix-ui/*` dependencies and none is a combobox, autocomplete or command package.
- **Popover was cut as a public component** by [#50](https://github.com/pt-hieu/flyingsalmon/issues/50) and recorded in ADR 0005. That cut was about shipping a `Popover` component from this registry. It was not a ban on the Radix package: see "The `@radix-ui/react-popover` question" below.

## The screens this serves

From hottrip's own repository (`pt-hieu/hottrip`), read 2026-09-09:

- **Intake Fixed Fields, origin and destination.** hottrip's `CONTEXT.md` defines **Destination** as "Where the Trip goes, as the Organiser states it. It may be as coarse as a country or a region, in which case the AI chooses the cities." A destination is a free-text statement, not a key from a fixed set. Strict selection makes the stated contract unrepresentable.
- **Place autocomplete.** hottrip ADR 0013 fixes that "the live API serves autocomplete only. Autocomplete is for account holders; **an anonymous Organiser sees the field with a sign-up prompt.** A result absent from both the Loaded Countries and the Snapshot is hidden … Autocomplete calls count toward Credits."
- **The attribution footer is a licence obligation, not decoration.** `docs/research/places/foursquare-terms.md` in hottrip quotes the Places API EULA Section 2.2: "**You must provide Foursquare with branded attribution (i.e., \"Powered by Foursquare\") on any page or screen within Your Service where Places Data may appear**", and the Usage Guidelines accept "visual credit (i.e., buttons, our developer logo, etc.) or contextual credit". Its build list item 3 is "Ship 'Powered by Foursquare' on every surface that renders live Places Data, starting with autocomplete." ADR 0013's consequences still record "Attribution placement for autocomplete … is a design question parked for a later pass."
- **Debounce is a billing control, not only a latency control**, because each autocomplete call spends Credits (hottrip ADR 0013, hottrip issue #10).

So both slots the ticket asks about are load-bearing: a footer that must appear whenever results appear, and a whole-panel replacement for anonymous users.

## The contract every candidate is measured against

ADR 0005, restated so the per-library sections can be scored rather than re-argued:

| Rule        | ADR 0005 wording                                                                                                                                                                                                                                                                                                                             |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Portal      | mount to `document.body`, always; no `container` prop. One exception, `exhibitionMode`, which renders inline with modality off                                                                                                                                                                                                               |
| Positioning | `side` and `align` are the only props. `sideOffset: 8`, `alignOffset: 0`, `avoidCollisions: true`, `collisionPadding: 8` fixed by the system. Flip first, then shift. No clamp, no `hideWhenDetached`                                                                                                                                        |
| Motion      | enter and exit are **CSS keyframe animations**; the library owns mount and unmount and waits for `animationend`. No `forceMount`, no `AnimatePresence`, no component-owned `open` state. Anchored content: enter 250ms on the bounce curve, exit 150ms on the settle curve, scaling from `0.96` about `var(--radix-popper-transform-origin)` |
| Dismiss     | Escape always closes and is never configurable (sole exception: dialog's `pending`). Outside click closes                                                                                                                                                                                                                                    |
| Stacking    | one `z-50` on every floating surface; no per-kind scale; equal z resolves by mount order                                                                                                                                                                                                                                                     |
| Width       | not in ADR 0005, but `select` already fixes it: `w-(--radix-select-trigger-width)` in `src/registry/ui/select/classnames.ts:73`                                                                                                                                                                                                              |

Two in-repo facts make the width and transform-origin rules concrete. `@radix-ui/react-select@2.3.7` (`dist/index.mjs:712-715`) defines its own variables as pure aliases:

```
"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)"
"--radix-select-content-available-height": "var(--radix-popper-available-height)"
"--radix-select-trigger-width": "var(--radix-popper-anchor-width)"
```

and `@radix-ui/react-popper@1.3.7` (`dist/index.mjs:153-156`) writes `--radix-popper-available-width`, `--radix-popper-available-height`, `--radix-popper-anchor-width` and `--radix-popper-anchor-height` onto the content element, plus `--radix-popper-transform-origin` on its wrapper (`dist/index.mjs:207`).

The `floating` registry item already carries the keyframes a candidate would have to be driven by: `--animate-floating-anchored-enter` at `250ms linear(0, 0.4188, 0.869, 1.0326, 1.04, 1.0153, 1.0011, 1)` and `--animate-floating-anchored-exit` at `150ms linear(...)`, with `@keyframes floating-anchored-enter/exit` scaling `0.96` ⇄ `1` (`registry.json`, item `floating`). A candidate that drives enter and exit from JavaScript cannot use them.

## The `@radix-ui/react-popover` question

The ticket asks, for each candidate, whether it depends on `@radix-ui/react-popover` and whether that is the cut component or merely a primitive. Three facts settle it.

1. **This repo already ships `@radix-ui/react-popover` to every consumer of every floating component.** The registry items declare the npm dependency `radix-ui` (`registry.json`, item `select`: `"dependencies": ["class-variance-authority", "radix-ui"]`). `radix-ui@1.6.7`'s own `package.json` lists **`"@radix-ui/react-popover": "1.1.23"`** among its 55 exact-pinned dependencies. Installing `@flyingsalmon/select` installs `@radix-ui/react-popover`. It has done so since batch 2 shipped.
2. **The cut was about the component, and #50 says so.** Its resolution reads: "Popover is cut from the design system, permanently. No spec will exist… The absorption premise was checked and does not hold. No Radix package depends on `@radix-ui/react-popover`." The first sentence is about this registry's public surface. The second is about Radix's `@radix-ui/*` package graph, which is what it was checked against; the unified `radix-ui` meta-package depends on all of them by construction.
3. **`@radix-ui/react-popover`'s content is a dialog, not a listbox.** From the tarball (`@radix-ui/react-popover@1.1.23`, `dist/index.mjs`): the trigger emits `"aria-haspopup": "dialog"` and `"aria-expanded": context.open` (lines 90-91) and the content emits `role: "dialog"` (line 245). A combobox needs `role="combobox"` on the input with `aria-expanded`, `aria-controls` pointing at a `role="listbox"`, and `aria-autocomplete`. Building a combobox out of Radix Popover means overriding the trigger's and content's roles rather than using them.

So "depends on `@radix-ui/react-popover`" is not by itself a disqualifier — the package is already installed — but "uses Radix Popover's `Trigger` and `Content` as the combobox's input and listbox" reintroduces the exact component #50 removed, with the wrong ARIA roles.

## Cross-cutting: a foreign floating layer inside this repo's Dialog

This repo's Dialog is Radix and modal (ADR 0005: "Modality is fixed per component kind… Dialog is modal"). Two mechanisms in Radix's modal path are hostile to any portal Radix does not own:

- **`document.body.style.pointerEvents = "none"`.** `@radix-ui/react-dismissable-layer@1.1.19` sets it when a layer mounts with `disableOutsidePointerEvents` (`dist/index.mjs:110-113`) and restores it on unmount. Every layer registered in the shared `context.layers` set gets `pointerEvents: "auto"` back on its own element (`dist/index.mjs:147`). `@radix-ui/react-dialog@1.1.23` passes `disableOutsidePointerEvents: context.open` (`dist/index.mjs:153`). A portal that is not a registered Radix layer stays at `pointer-events: none` and its items cannot be clicked.
- **`hideOthers()` from `aria-hidden`.** `@radix-ui/react-dialog@1.1.23` calls it on the dialog content (`dist/index.mjs:145`), so a foreign portal elsewhere in `<body>` becomes `aria-hidden` to assistive technology even while visible.

This is not theoretical. [radix-ui/primitives#3694](https://github.com/radix-ui/primitives/issues/3694), "Why does opening a Radix Dialog (or other Radix overlays) make Base UI Combobox/Autocomplete dropdowns unselectable?", was opened 2025-10-05 and **closed 2026-06-03 with no Radix-side fix**. Every reported workaround is consumer-side: force `style={{ pointerEvents: "auto" }}` onto the foreign positioner, and wrap the foreign list in `react-remove-scroll`'s `RemoveScroll` to restore scrolling. The companion Base UI thread is [mui/base-ui#2854](https://github.com/mui/base-ui/issues/2854).

Radix's escape handling has the same layer-stack shape: `DismissableLayer` only listens while `isHighestLayer` and calls `event.preventDefault()` before `onDismiss` (`dist/index.mjs:90-107`), so Escape unwinds innermost-first — but only among layers registered in that stack. A foreign layer is not in it, so Escape inside a foreign combobox and Escape on a Radix dialog are two independent stacks racing on one keydown.

Any candidate that brings its own floating engine inherits this. A hand-roll on Radix's own primitives does not, because it registers in the same `context.layers` set.

## Cross-cutting: `aria-activedescendant` across a portal

Portalling the listbox to `document.body` puts it outside the input's DOM subtree, which raises whether `aria-activedescendant` on the input may reference an option inside it. WAI-ARIA 1.2 §4.3.2 states "User agents are not expected to validate that the active descendant is a descendant of the container element", and describes the combobox case explicitly: an element may be owned "by an element that is controlled by an element with role of combobox, textbox or searchbox with an `aria-activedescendant` attribute" ([w3.org/TR/wai-aria-1.2/#aria-activedescendant](https://www.w3.org/TR/wai-aria-1.2/#aria-activedescendant)). The APG combobox pattern ([w3.org/WAI/ARIA/apg/patterns/combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)) requires `aria-controls` on the combobox referencing the popup, `aria-expanded`, `aria-autocomplete` in `none | list | both`, and `aria-selected="true"` on the chosen option, and notes that combobox has implicit `aria-haspopup="listbox"` so the attribute is only written for `grid`, `tree` or `dialog` popups. `aria-owns` was the ARIA 1.0 spelling of the relationship; `aria-controls` supersedes it.

The portal is therefore compatible with `aria-activedescendant` by spec, via `aria-controls`. Whether a given screen-reader build honours it across a portal was **not verified** — no candidate's documentation makes a testable claim about it, and this research ran no assistive technology.

## Cross-cutting: how the field family attaches

`src/registry/lib/field.tsx` gives three things, and a combobox is a field-family member by the `CONTEXT.md` definition (a component that owns a label and an error message):

- `useFieldIds({ id, error, describedBy })` returns `{ fieldId, errorMessageId, describedBy }` and merges a caller-supplied `aria-describedby` with the error message id.
- `fieldLabelVariants({ placement: FieldLabelPlacement.Above, error, disabled })` for the label.
- `<FieldErrorMessage id={errorMessageId}>`, which animates height and opacity on `springSettle` through `motion/react`.

`src/registry/ui/input/input.tsx` is the shape a combobox would follow, and it already solves two of the combobox's problems. Its `loading` prop swaps the end-slot content for a `Spinner` sized by `spinnerSizeByInputSize[size]` — the asynchronous busy indicator with no new vocabulary. Its `endAdornment` prop is a free slot in the same position. It writes `aria-invalid`, `aria-busy` and `aria-describedby` onto the native `<input>` directly.

Two attachment facts follow:

- `aria-describedby` (the error) and `aria-controls` (the listbox) are different attributes and coexist without conflict. A candidate that owns `aria-describedby` itself has a second mechanism competing with `useFieldIds`.
- The label works natively. `select.tsx:96-101` intercepts the label's click and calls `triggerRef.current?.focus()` by hand, because `htmlFor` does not focus a Radix `Select.Trigger` button. A combobox's control is a real `<input>`, so `htmlFor={fieldId}` works with no interception, as in `input.tsx:62`.

## Cross-cutting: where the ecosystem moved

shadcn/ui's changelog entry for July 2026 ("Base UI as the Default", `ui.shadcn.com/docs/changelog`) states "New projects now use Base UI by default. Radix is still fully supported", "Component pages open on the Base UI tab", `pnpm dlx shadcn init -b radix` keeps Radix, and "Radix is not being deprecated". Base UI documentation landed January 2026.

Two shadcn registry items read directly with `npx shadcn@latest view` on 2026-09-09:

- `@shadcn/combobox` → `"dependencies": ["cn", "@base-ui/react"]`, `"registryDependencies": ["button", "input-group"]`. Its source imports `Combobox as ComboboxPrimitive from "@base-ui/react"` and uses `Combobox.Root/Value/Trigger/Clear/Input/Portal/Positioner/Popup/List/Item/ItemIndicator/Group/GroupLabel/Collection/Empty/Separator/Chips/Chip/ChipRemove`, the CSS variables `--anchor-width`, `--available-width`, `--available-height`, `--transform-origin`, the attributes `data-open`/`data-closed`/`data-highlighted`/`data-empty`/`data-side`, and `className="isolate z-50"` on the positioner.
- `@shadcn/command` → `"dependencies": ["cn", "cmdk"]`, `"registryDependencies": ["dialog"]`, still `import { Command as CommandPrimitive } from "cmdk"`.

shadcn ships both, for different jobs: cmdk for the command palette, Base UI for the combobox.

---

## Candidate: cmdk

**Pinned: `cmdk@1.1.1`**, the `latest` dist-tag, published **2025-03-14T19:21:16Z** — 18 months before this reading. Only `dist/` is published (`package.json`: `"files": ["dist"]`); the readable source cited below is `cmdk/src/index.tsx` at the `v1.1.1` git tag, matched attribute-for-attribute against `dist/index.mjs`. There is no published CHANGELOG (open request: `dip/cmdk#397`). **The docs site is gone**: `cmdk.paco.me` returns `307` to `https://github.com/dip/cmdk`; the tarball README is the documentation. The repo moved: `pacocoursey/cmdk` `301`-redirects to `dip/cmdk`.

### ARIA

**ARIA 1.2 shape.** `role="combobox"` sits on the `<input>` itself, not on a wrapper, and the popup is referenced with `aria-controls`, not the ARIA 1.0 `aria-owns`. `src/index.tsx:805-816` emits, on the input: `cmdk-input=""`, `autoComplete="off"`, `autoCorrect="off"`, `spellCheck={false}`, `aria-autocomplete="list"`, `role="combobox"`, `aria-expanded={true}`, `aria-controls={context.listId}`, `aria-labelledby={context.labelId}`, `aria-activedescendant={selectedItemId}`, `id`, `type="text"`. `aria-haspopup` is absent, which is conformant — combobox has an implicit `aria-haspopup="listbox"`.

`List` is `role="listbox"` with `tabIndex={-1}`, `aria-label` defaulting to `"Suggestions"` and its own `aria-activedescendant` (`:863-868`). `Item` is `role="option"` with `aria-disabled`, `aria-selected`, `data-disabled`, `data-selected` (`:710-716`) and an imperatively set `data-value` (`:1038`). The `Command` root has **no role at all**, only `tabIndex={-1}` (`:574-578`).

**`aria-activedescendant`, not roving tabindex.** No item ever receives `tabIndex`; the store explicitly refocuses the input on every value change (`:243-249`).

Three defects, all reproduced in a jsdom probe against `cmdk@1.1.1` + `react@19.2.0`:

- **`aria-activedescendant` is absent on mount and goes stale after filtering.** In the probe it was `null` on pristine mount and after the first typed query, and after clearing the search it named a different option than the one carrying `aria-selected="true"` and the one Enter activated. It is correct only when the selection is moved by a direct key or pointer event. Open and unanswered: [`dip/cmdk#413`](https://github.com/dip/cmdk/issues/413) (2026-09-05, zero comments) and `#373` (2025-07-09). Mechanism, marked as **inference** from source: `selectedItemId` is only written inside a `schedule(7, …)` callback (`:251-254`), and `useScheduleLayoutEffect` replaces `fns.current` with a fresh `Map` immediately after its `forEach` (`:1050-1053`), so a nested schedule queued during the flush is discarded. Selection changes originating outside the flush survive; those originating inside it (mount `:306-313`, search change `:242`) do not.
- **`aria-expanded` is hardcoded `true`** (`:811`) and cannot be overridden. cmdk has no open/closed concept. `dip/cmdk#316` raised it and was closed 2024-10-18 without a change.
- **`role="listbox"` contains non-`option` children.** `Empty` is `role="presentation"`, `Loading` is `role="progressbar"`, `Separator` is `role="separator"`, `Group` is `role="presentation"` wrapping `role="group"`. `dip/cmdk#179` (open since 2023-09-04) reports axe flagging this, citing `dequelabs/axe-core#3938`.

None of these is patchable from outside — see the prop-spread order below.

### Async items

- **Loading is a marker, not a mechanism.** `Command.Loading` renders `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax` and an `aria-label` defaulting to `"Loading..."`, wrapping its children in `<div aria-hidden>` (`:909-928`). The shipped JSDoc (`dist/index.d.ts:216-217`) says "You should conditionally render this with `progress` while loading asynchronous items." The app owns the boolean. Because the visible text sits inside the `aria-hidden` wrapper, only the `aria-label` is announced.
- **Empty works, including with external filtering.** `Command.Empty` renders iff `state.filtered.count === 0` (`:900`), and with `shouldFilter={false}` `filterItems()` short-circuits to `count = allItems.current.size` (`:436-444`), so it shows exactly when zero items are mounted. Probe-confirmed. This contradicts the premise of open issue `dip/cmdk#365`. The count updates via `schedule(3/4, …)` on item mount and unmount, one layout-effect tick behind, so `Empty` can flash during a list swap. `Empty` and `Loading` have no interlock and can render together.
- **No debouncing whatsoever.** `grep -E "debounce|setTimeout|throttle"` over `src/index.tsx` returns nothing. The only timer-adjacent code is one `requestAnimationFrame` in the `ResizeObserver` writing `--cmdk-list-height` (`:844-853`).
- **The list can be fully app-controlled.** `shouldFilter={false}` disables both filtering (`:438`) and sorting (`:369-375`). The guard is `=== false`, so `undefined` means on. Items still register with the store, so `Empty`, keyboard nav and selection keep working; only ranking and hiding stop.
- **The built-in filter is synchronous and cannot be made async.** `defaultFilter` is `commandScore(value, search, keywords)` (`:42`), a fuzzy subsequence matcher shipped as a 920-byte chunk. `score()` uses the return as a number immediately (`:362-365`) inside a synchronous loop (`:451-457`) called from `setState('search', …)`, whose own comment reads "Filter synchronously before emitting back to children" (`:239`). A Promise-returning filter coerces to `NaN > 0` and hides everything. Async search means fetching in the app and re-rendering with `shouldFilter={false}`.
- **No virtualization.** README:436: "Virtualization? No. Good performance up to 2,000-3,000 items, though."

### Value model

**`Command`'s `value` is the highlight, not a form value, and it churns on hover.** Initial state is `value: props.value ?? props.defaultValue ?? ''` with the inline comment "Currently selected item value" (`:51-56`); `Item` derives `aria-selected`/`data-selected` from it (`:681`, `:714-716`); `onPointerMove` writes it (`:698-700`, `:717`), so hovering an item fires `onValueChange`. The commit event is separate: `Item.onSelect?.(value.current)` (`:695`), fired on click (`:718`) and on Enter through a synthetic `cmdk-item-select` DOM event (`:634-635`, listener at `:689`).

**Input text and selected value are separate stores with no linkage.** `state.search` and `state.value` are independent (`:51-56`). Nothing writes a selected item's text back into the input, and nothing constrains the input's text to a valid item. Free text is therefore unconstrained; there is no strict-selection mode and no commit-on-blur. Equally, "input shows the chosen label after selection" is app code.

**No clear affordance and no clear API.** `Command.Input` is a plain `<input>`; clearing is app state. Open feature request: `dip/cmdk#385` (2025-09-29). Clearing re-runs `filterItems()` and `schedule(1, selectFirstItem)` (`:238-242`) — the exact path where `aria-activedescendant` goes stale.

**No form integration at all.** `dist/index.d.ts` (412 lines) has no `name`, no hidden input, no `required`/`form`/validation surface. Its complete prop set is `label`, `shouldFilter`, `filter`, `defaultValue`, `value`, `onValueChange`, `loop`, `disablePointerSelection`, `vimBindings`, plus per-part `heading`, `keywords`, `forceMount`, `alwaysRender`, `progress`, `overlayClassName`, `contentClassName`, `container`.

Values are trimmed on every controlled update (README:92-94) and lowercased with whitespace normalised for scoring.

### Floating layer fit

**cmdk does no positioning and no anchored portalling.** `grep -E "zIndex|z-index|transition|animation"` over `dist/index.mjs` returns zero hits. The only inline styles it emits anywhere are the sr-only `<label>` block (`:1081-1091`) and the `--cmdk-list-height` custom property written by a `ResizeObserver` (`:845-849`). No z-index, no transitions, no keyframes, no `data-state` animation hooks. `Command.Dialog` (`:882-894`) is a thin wrapper over Radix Dialog — a centred modal, not an anchored layer.

**Dependencies, verbatim from `package/package.json:18-27`:**

```json
"peerDependencies": { "react": "^18 || ^19 || ^19.0.0-rc", "react-dom": "^18 || ^19 || ^19.0.0-rc" },
"dependencies": {
  "@radix-ui/react-compose-refs": "^1.1.1",
  "@radix-ui/react-dialog": "^1.1.6",
  "@radix-ui/react-id": "^1.1.0",
  "@radix-ui/react-primitive": "^2.0.2"
}
```

**cmdk does not depend on `@radix-ui/react-popover`, and does not depend on the `@radix-ui/react-popper` primitive either.** A clean install of `cmdk@1.1.1` was checked and `grep -iE 'popper|popover'` over `node_modules/@radix-ui/` returns nothing. What it does pull is `@radix-ui/react-dialog` — **a component**, the same one this registry's `dialog` is built on. The README's own combobox recipe (README:399-425) is "Use inside Popover. We recommend using the Radix UI popover component" — that is an _additional_ install cmdk tells you to make, and it is the cut component.

Because cmdk's ranges (`^1.1.6`, `^2.0.2`, `^1.1.1`) are satisfied by the exact versions `radix-ui@1.6.7` pins (`react-dialog@1.1.23`, `react-primitive@2.1.10`, `react-compose-refs@1.1.5`), adding cmdk here should dedupe to the same physical modules. _Inference from version arithmetic; a combined install was not run._

**Escape does nothing in cmdk.** Its only `onKeyDown` (`:579-639`) handles exactly `n`, `j`, `ArrowDown`, `p`, `k`, `ArrowUp`, `Home`, `End`, `Enter`. There is no `Escape` case; the probe confirmed `defaultPrevented === false`. Escape closing a `Command.Dialog` comes from Radix's dismissable layer. Two side effects of that key handler matter for a design system: **Ctrl+N/J/P/K move the selection by default** (`vimBindings` defaults `true`, `:593-612`), and **Home/End are consumed with `preventDefault()`** (`:617-628`) so they do not move the text caret inside the input (open: `dip/cmdk#379`).

### Slots

**Arbitrary children render, and a gated panel works.** cmdk never enumerates or validates its children; registration is opt-in from inside each `Item`/`Group` (`:672-676`). A probe replacing the entire list contents with a sign-up `<div><h3><button>` rendered fine, arrow keys found nothing and threw nothing (`getValidItems()` is `querySelectorAll('[cmdk-item=""]:not([aria-disabled="true"])')`, `:113-115`), and the button stayed Tab-reachable. The cost is semantic: that panel sits inside `role="listbox"`, which is invalid ARIA content — the same class of problem as `#179`.

**A footer inside the list gets physically reordered by cmdk's sorter.** This is the load-bearing finding for "Powered by Foursquare". `sort()` re-parents every valid item with `appendChild` (`:400-425`), which _moves_ DOM nodes to the end of their container. Any static node authored after the items therefore ends up before them once sorting runs. Probe output, footer authored last:

```
initial mount (search=""):  ITEM:Apple | ITEM:Banana | ITEM:Cherry | OTHER:Powered by Foursquare
after search="ch":          OTHER:Powered by Foursquare | ITEM:Cherry
after search="zzzz":        EMPTY:No results | OTHER:Powered by Foursquare
```

The footer jumped from last to first the moment the user typed. Two mitigations follow from the same code path: put the footer **outside** `Command.List` (sorting only touches the `[cmdk-list-sizer]` div, `:398`, `:871`), or set `shouldFilter={false}`, which returns early from `sort()`. Filtering itself is unaffected by arbitrary nodes — `filterItems()` iterates a `Set` of registered ids, not the DOM.

### Fit

- **React 19: supported.** Peer range allows `^19`; `"use client"` tops `dist/index.js` and `dist/index.mjs`; `grep` for `use(`, `useEffectEvent`, `useOptimistic`, `useActionState`, `useFormStatus` returns nothing. 1.1.0 (2025-03-14) dropped the `use-sync-external-store` shim for React's built-in, closing `#332`. The probe ran clean against `react@19.2.0` apart from the ARIA defects above. One unexercised footgun: the `asChild` path reads `(children as any).ref` in `cloneElement` (`:1076`), which React 19 turned into a normal prop — **not verified**, and no issue was found naming it.
- **Bundle size.** From the tarball: `dist/index.mjs` 11,328 bytes (4,365 gzip), the command-score chunk 920 bytes (535 gzip), whole package 81,852 bytes unpacked over 13 files. Bundlephobia for `cmdk@1.1.1`: `{"gzip":14922,"size":46012,"dependencyCount":4,"hasSideEffects":false}` — 46.0 kB min / 14.9 kB gzip including the Radix Dialog subtree. Since that subtree already ships here, the marginal cost is roughly cmdk's own ~12.2 kB min / ~4.9 kB gzip. `"sideEffects": false` is set and the ESM build is real, but `Dialog` is attached via `Object.assign(Command, {…})` (`:930-939`), which most bundlers will not shake; the named `CommandRoot`/`CommandList`/… exports (`:945-953`) avoid it. **Not verified** — no bundler was run.
- **Maintenance: effectively dormant.** Last publish 2025-03-14 (18 months). Last commit touching library code: 2025-03-14; the only later commits are a README edit (2025-10-29) and a website-styles fix. 52 open issues, 23 open PRs, docs site down, repo transferred to a company org. 172.5 M npm downloads last month. `dip/cmdk#410` ("Project dead?", 2026-07-10) has zero comments; so does `#413`, filed four days before this reading with a precise repro.
- **Field family.** cmdk injects a visually-hidden `<label>` as the first child of `Command`, always, even when `label` is undefined (`:641-649`) — a real layout participant, and the subject of open issue `#391`, "Hidden `<label>` inserted by cmdk breaks layout inside flex containers & popovers". A registry wrapper would carry two labels unless it suppresses one.

### Styling surface

cmdk addresses parts by **bare attributes**, not classes and not `data-*`: `cmdk-root`, `cmdk-label`, `cmdk-input`, `cmdk-list`, `cmdk-list-sizer`, `cmdk-item`, `cmdk-group`, `cmdk-group-heading`, `cmdk-group-items`, `cmdk-separator`, `cmdk-empty`, `cmdk-loading`, `cmdk-dialog`, `cmdk-overlay`. Tailwind needs arbitrary variants such as `[&[cmdk-item]]:…`.

Only three `data-*` attributes exist, all on `Item`: `data-selected`, `data-disabled`, `data-value`. **`data-selected` and `data-disabled` are always present, rendered as the literal string `"false"` when off** (probe-confirmed), so Tailwind's bare `data-selected:` and `data-disabled:` variants — which test presence — match every item. `data-[selected=true]:` is required. There is no `data-state`, `data-side`, `data-align`, `data-highlighted` or `data-slot`; none of the Radix or shadcn conventions this registry's `menu` rules are written against, and `menuItemHighlighted` keys on `data-highlighted:`.

**Props spread before cmdk's own attributes**, so later JSX wins and a consumer cannot override `role`, `aria-expanded`, `aria-autocomplete`, `aria-activedescendant`, `aria-controls`, `aria-labelledby`, `id`, `type` or `value` on `Input`; `role`, `id`, `aria-selected`, `aria-disabled`, `data-selected`, `data-disabled`, `onPointerMove` or `onClick` on `Item`; or `role`/`id`/`tabIndex` on `List`. `className`, `style` and custom `data-*` do get through. `onKeyDown` on `Command` is composed, not overwritten (`:580`), and cmdk bails when `e.defaultPrevented` (`:588`).

Three pieces of DOM cmdk owns and you cannot remove: the sr-only `<label>`; the extra `<div cmdk-list-sizer="">` wrapping `List`'s children (`:871`), which absorbs any `display: grid`/`flex` set on `[cmdk-list]`; and `Group`'s two nested divs (`:751-763`). `Group` does not unmount when filtered out — it gains a `hidden` attribute (`:754`).

**cmdk mutates the DOM imperatively**: `appendChild` reordering in `sort()`, `setAttribute('data-value', …)` in a layout effect on every render (`:1038`), and `scrollIntoView({block:'nearest'})` (`:493-503`). Its own README:450 says "Concurrent mode safe? Maybe… Uses risky approaches like manual DOM ordering." Reordering DOM behind React's back is the condition under which motion's `layout` prop and `AnimatePresence` fight the library. **Not verified** — no motion + cmdk reproduction was built.

---

## Candidate: Downshift

**Pinned: `downshift@9.4.0`**, published **2026-06-30T07:36:08Z**; 380 published versions. Source citations are line numbers in `package/dist/downshift.esm.mjs` (166,117 bytes), the ESM entry.

Dependencies, verbatim from the tarball `package.json`:

```json
"peerDependencies": { "react": ">=16.12.0" },
"dependencies": {
  "@babel/runtime": "^7.28.6",
  "compute-scroll-into-view": "^3.1.1",
  "prop-types": "^15.8.1",
  "react-is": "^18.2.0",
  "tslib": "^2.8.1"
},
"sideEffects": false
```

**No Radix package anywhere**, and `react-dom` is neither a dependency nor a peer. A GitHub code search over `repo:downshift-js/downshift` returns 0 results for `radix`, 0 for `popper`, 0 for `floating-ui`. `tslib` is declared and referenced by no shipped file — `grep -rl tslib package/` matches `package.json` only.

### ARIA

**WAI-ARIA 1.2, switched at v7.0.0 (2022-10-22).** The release notes read "BREAKING CHANGES: updates to useCombobox and useSelect to adhere to the 1.2 version of the ARIA Combobox pattern", and `src/hooks/MIGRATION_V7.md` states "the input wrapper element does not receive the combobox role attributes anymore… `getComboboxProps` has been removed. `getInputProps` additions: `role=combobox`, `aria-expanded=${isOpen}`. `getToggleButtonProps` additions: `aria-controls=${menuId}`, `aria-expanded=${isOpen}`." Two later refinements: v8.0.0 (2023-08-02) removed `InputFocus` and added `InputClick` because ARIA 1.2 recommends toggling on click, not focus; v9.0.0 (2024-03-20) removed the default `getA11yStatusMessage`, so there is no `aria-live` announcement unless the app supplies one.

`getInputProps` (`:3376-3388`) emits `aria-activedescendant` (`isOpen && highlightedIndex > -1 ? getItemId(highlightedIndex) : ''`), `aria-autocomplete="list"`, `aria-controls={menuId}`, `aria-expanded={isOpen}`, `aria-labelledby`, `autoComplete="off"`, `id`, `role="combobox"`, `value={inputValue}`. `getMenuProps` (`:3243-3248`) emits `id`, `role="listbox"`, `aria-label`/`aria-labelledby`, `onMouseLeave` — **no `onKeyDown`, no `tabIndex`**. `getItemProps` (`:3292-3300`) emits `aria-disabled`, `aria-selected`, `id`, `role="option"`. `getToggleButtonProps` (`:3315-3321`) emits `aria-controls`, `aria-expanded`, `id`, `tabIndex: -1` — **no `role`, no `aria-haspopup`, no accessible name**; the app supplies `aria-label`. `getLabelProps` (`:3218-3223`) emits `id` and `htmlFor` only.

Two behaviours worth naming:

- **`aria-controls` is unconditional** and `aria-activedescendant` is `''` rather than `undefined` when nothing is highlighted, so both attributes are always present in the DOM.
- **`aria-selected` tracks the highlighted index, not the selected item** (`index === highlightedIndex`), unlike `useSelect` which compares `item === selectedItem` (`:2752`). That matches the APG `combobox-autocomplete-list` example, but it means a menu with nothing highlighted has zero `aria-selected="true"` options even with an item selected — a visual checkmark has to come from the app's own comparison against `selectedItem`.

**`aria-activedescendant`, with no roving tabindex anywhere in `useCombobox`.** The only `tabIndex` it emits is the hardcoded `-1` on the toggle button; `getItemProps` and `getMenuProps` emit none. Focus is actively pinned: an effect refocuses the input whenever `isOpen` flips true and the active element is not the input (`:3136-3145`), and item `onMouseDown` calls `preventDefault()` (`:3289-3291`) so clicking an option never moves focus. (`useMultipleSelection`/`useTagGroup` do use roving tabindex at `:4166` — that is the tag list, not the combobox.)

**Attributes it never emits**: `aria-busy`, `aria-invalid`, `aria-required`, `aria-describedby`, `aria-multiselectable`, `aria-owns`. A grep for those returns exactly one hit, at `:4161`, inside `useTagGroup`.

Verified live against `react-dom/server@19.2.0`, menu open:

```html
<input
  aria-activedescendant="demo-item-1"
  aria-autocomplete="list"
  aria-controls="demo-menu"
  aria-expanded="true"
  aria-labelledby="demo-label"
  autocomplete="off"
  id="demo-input"
  role="combobox"
  value="Bravo"
/>
<button
  aria-controls="demo-menu"
  aria-expanded="true"
  id="demo-toggle-button"
  tabindex="-1"
>
  v
</button>
<ul id="demo-menu" role="listbox" aria-labelledby="demo-label">
  <li
    aria-disabled="false"
    aria-selected="false"
    id="demo-item-0"
    role="option"
  >
    Alpha
  </li>
  <li aria-disabled="false" aria-selected="true" id="demo-item-1" role="option">
    Bravo
  </li>
  <li
    aria-disabled="false"
    aria-selected="false"
    id="demo-item-2"
    role="option"
  >
    Charlie
  </li>
</ul>
```

### Async items

**Downshift never owns the items.** `items` is a required prop validated every render (`:2925-2933`) and is not copied into state. `UseComboboxState` is exactly four fields: `highlightedIndex`, `selectedItem`, `isOpen`, `inputValue`. Every reducer branch reads `props.items` — this render's array — never a cached copy (`:2937-3045`). The README explains why: "Opening the menu with an item already selected means the hook has to know in advance what items you plan to render and what is the position of that item in the list."

So the item list is app-controlled by construction, and so is everything around it:

- **Loading is entirely hand-rolled.** No `isLoading` prop, no `aria-busy`, and since v9 no default `getA11yStatusMessage`, so even a "3 results available" live-region announcement is the app's.
- **No debouncing for the query.** `debounce` exists in the bundle (`:130`) but its only call sites are `cleanupStatus` (`:151`), the legacy `Downshift.updateStatus` (`:1138`), `updateA11yStatus` (`:1769`, 200 ms, live-region only) and `useSelect`'s typeahead timer (`:2485`). Zero use in `useCombobox`.
- **Empty results degrade sanely but with one quirk.** `items: []` is legal; `getHighlightedIndexOnOpen` returns `-1` for an empty array (`:1985`). But `InputKeyDownArrowDown`/`ArrowUp` on a closed menu set `isOpen: props.items.length >= 0` (`:2957`, `:2975`), and `length >= 0` is always true — so arrow keys open the menu even with zero items. Either render a "no results" row inside the `role="listbox"` or suppress `isOpen` in `stateReducer`.

**`stateReducer` is the differentiator.** Default is identity (`:1837-1839`); the signature hands you `state`, downshift's computed `changes`, the merged `props` including `items`, and the action's own fields. There are 23 `stateChangeTypes`: `InputKeyDownArrowDown/ArrowUp/Escape/Home/End/PageUp/PageDown/Enter`, `InputChange`, `InputBlur`, `InputClick`, `MenuMouseLeave`, `ItemMouseMove`, `ItemClick`, `ToggleButtonClick`, `FunctionToggleMenu/OpenMenu/CloseMenu/SetHighlightedIndex/SelectItem/SetInputValue/Reset`, `ControlledPropUpdatedSelectedItem`.

**A trap in that enum: the values are strings in development and integers in production** (`:2873-2897`, `process.env.NODE_ENV !== "production" ? '__input_keydown_arrow_down__' : 0`). Never compare against a string literal; always `useCombobox.stateChangeTypes.X`. `downshiftCommonReducer` throws `new Error('Reducer called without proper action type.')` on an unrecognised type.

### Value model

`inputValue` and `selectedItem` are independent fields of one state object, coupled only where the reducer chooses. `InputChange` sets `inputValue` and **never touches `selectedItem`** (`:3016-3022`), so typing freely leaves the previous selection in place and produces a legal state where `inputValue !== itemToString(selectedItem)`. **Downshift never reconciles them, and there is no strict-selection mode.**

All four state fields are controllable, each with `initial*` and `default*` siblings, plus `onSelectedItemChange`, `onIsOpenChange`, `onHighlightedIndexChange`, `onInputValueChange` and `onStateChange`. A dev-only guard warns on flipping controlled to uncontrolled (`:355`, called at `:3100`).

**Controlled `selectedItem` overwrites the input text.** `useControlledReducer` (`:2900-2924`) watches the prop and, when `itemToKey(props.selectedItem)` differs from the previous, dispatches `ControlledPropUpdatedSelectedItem` with `inputValue: props.itemToString(props.selectedItem)`. Intercept that action in `stateReducer` if the input text must survive.

Blur has three distinct paths (`:3005-3011`, `:3352-3361`), and they matter:

1. **Tab away with something highlighted commits it.** `isBlurByTabChange` means a _browser-tab_ switch, not keyboard Tab, so a normal Tab-out dispatches `InputBlur` with `selectItem: true` and both `selectedItem` and `inputValue` snap to the highlighted item.
2. **Click outside does not commit.** The document-level tracker dispatches `InputBlur` with no `selectItem`, closing the menu and leaving the free text in place. The README confirms: "Blur(mouse click outside): It will close the menu without selecting any element, even if there is one highlighted."
3. **Blur with `highlightedIndex === -1`** closes and touches neither field.

**Clearing** has two mechanisms: `reset()` (`FunctionReset`) resets all four fields to their `default*` values; `selectItem(null)` sets `{selectedItem: null, inputValue: ''}` under the default `itemToString`, leaving `isOpen` and `highlightedIndex` alone. The README's own usage example uses `selectItem(null)` for its clear button. **Escape is overloaded**: with the menu open it closes; pressed again on a _closed_ combobox it clears both `selectedItem` and `inputValue` (`:2995-3002`).

`itemToString` must handle `null` — the README: "this callback _must_ include a null check: it is invoked with `null` whenever the user abandons input via `<Esc>`."

**No form integration.** `getInputProps` returns no `name`, `required`, `form`, `aria-invalid`, `aria-required` or `aria-describedby`, and no hidden input is created anywhere. The visible input carries display text, not the value, so a `name` on it posts the label. **Enter is swallowed while the menu is open** — `event.preventDefault()` at `:3183-3193` (with an IME guard on `event.which === 229`), so a form submit on Enter does not fire.

**Multi-select: `useMultipleSelection` is deprecated in 9.4.0**, replaced by `useTagGroup` (landed 9.2.0, 2026-01-30). `useTagGroup` is a separate hook you compose yourself; it does not integrate with `useCombobox` automatically.

### Floating layer fit

**Downshift does no positioning and no portalling.** The only style writing in the entire bundle is the visually-hidden block on the a11y status div. `react-dom` is not a dependency, so it literally cannot call `createPortal`. GitHub code search over the whole repo: 0 hits for `popper`, 0 for `floating-ui`, 0 for `radix`; the single `createPortal` hit is a test file for the legacy component.

> **Correction to the ticket's premise.** The ticket says "Downshift's own docs point at Popper/Floating UI for this." That could not be found anywhere in the current `master` docs, the `useCombobox` README, the 121 kB root README, or the docsite. The only Popper touchpoint located is closed user issue #1096 (2020-06-22, downshift 5.4.2), where a user hit the `getMenuProps` ref error while composing with `usePopper`. **Treat the claim as unsupported.**

Every line of the ADR 0005 contract is therefore the app's: portal, side/align, offsets, collision handling, presence gating, z-index, and trigger-width. Downshift's only DOM-global behaviour is `useMouseAndTouchTracker` (`:2042-2093`), which adds `mousedown`/`mouseup`/`touchstart`/`touchmove`/`touchend` listeners to `environment` (default `window`) and closes the menu when the target is outside `menuRef`, `toggleButtonRef` and `inputRef`. **Outside-click dismissal works through a portal**, because `targetWithinDownshift` (`:2029-2034`) tests DOM containment of the portalled menu node. There is no document-level `keydown` listener at all.

**Escape is `InputKeyDownEscape`, bound only to the input's `onKeyDown`** (`:3174-3182`). If focus is anywhere else — a focusable element in the panel, the toggle button, a portalled footer — **Escape does nothing**. The two focus-pinning effects make that unlikely in the default flow but do not guarantee it. And as noted, Escape on a closed combobox clears the value; making it dismiss-only means stripping that half in `stateReducer`.

**The mounted-menu constraint, and what actually breaks.** The README says "menus, for accessibility purposes, should always be rendered, regardless of whether you hide it or not. Otherwise, `getMenuProps` may throw error if you unmount and remount the menu", and its canonical snippet keeps the `<ul>` unconditional while gating only the `<li>`s on `isOpen`. Auditing every read of `menuRef.current` shows the runtime is more forgiving than that: `useScrollIntoView` (`:2158-2179`) guards on `itemElement && menuRef.current`, `targetWithinDownshift` guards on `contextNode &&`, and there is no unguarded dereference. The enforcement is `useGetterPropsCalledChecker` (`:2098-2148`), which is wrapped in `process.env.NODE_ENV !== 'production'` (`:2108`), runs **once on mount** (deps `[]`), and emits a `console.error` rather than throwing. `getMenuProps(props, {suppressRefError: true})` silences it.

**The real cost of unmounting the menu is an ARIA defect, not a crash**: the input emits `aria-controls="…-menu"` unconditionally (`:3379`), so unmounting the `<ul>` leaves a dangling IDREF.

**Pairing with Radix `Popper` + `Presence` composes cleanly**, because the two contribute disjoint things. Downshift contributes the state machine, all input keyboard handling, the ARIA wiring, SSR-safe ids via `React.useId` (`:1857-1880`), disabled-item skipping, scroll-into-view, outside-click and touch dismissal, and `stateReducer`. Radix contributes anchoring, flipping, shifting, `--radix-popper-anchor-width`, portalling, presence gating, z-index and layered dismissal. Mechanical fit points read from source:

- `getMenuProps({ref})` composes refs via `handleRefs`, which accepts callback refs and ref objects and returns `undefined` — compatible with React 19's cleanup-returning callback ref rules. `<Popper.Content {...getMenuProps({ref: popperRef})}>` works.
- Keep the `getMenuProps` element **outside** the `Presence` boundary (or `forceMount` it) so it never unmounts; `Presence` gates the animated wrapper, not the listbox.
- Item refs are cleared whenever `isOpen` goes false (`:3130-3134`), so items cannot be CSS-animated out — only the panel shell.
- **Downshift's focus-pinning effect fires on every `isOpen → true`** (`:3136-3145`). Pair it with `Popper.Content`, which does not steal focus; `Popover.Content`/`FocusScope` would fight it.
- Historical portal caveat: #1600, "Dropdown items are not selectable on mobile devices when rendering to a portal element" (downshift 9.0.4, `useSelect` touch path), is closed and the fix is visible — `useMouseAndTouchTracker` now takes `downshiftRefs` and depends on `getDownshiftElements` (`:2093`).

### Slots

Because the app renders every node, both slots are structurally free; the remaining constraints are precise.

**A footer inside the menu works mechanically and is invalid ARIA.** Downshift never enumerates the menu's children — items register only through `getItemProps`'s ref callback into a keyed map (`:3293-3297`) — and any descendant of the `getMenuProps` element counts as "inside" for outside-click dismissal. `src/__tests__/portal-support.js` demonstrates exactly this, rendering a non-item `<button data-testid="not-an-item">` inside a portalled menu and asserting state is not reset. The problem is `role="listbox"`'s owned-elements contract: arbitrary non-`option` content inside it is invalid ARIA.

Three placements, each with a different cost, and Downshift imposes none of them:

1. Footer **outside** the `getMenuProps` element, inside the positioned panel. ARIA-clean, but the footer is inside neither `menuRef` nor `inputRef`, so **clicking it closes the menu**. `onMouseDown` `preventDefault` does not stop it — the tracker fires on `mouseup` regardless. The reliable fix is intercepting `InputBlur` in `stateReducer`.
2. Footer **inside** the `<ul>`, accepting the ARIA violation, optionally with `role="presentation"`.
3. Move `getMenuProps` onto the outer panel `div` — the README permits it ("Typically, this will be a `<div>` or a `<ul>` that surrounds a `map` expression") — which puts the whole panel inside `menuRef` so clicks anywhere in it are inside, at the cost of the whole panel becoming `role="listbox"`.

**A gated panel is unconstrained.** `items: []` is valid; `getItemProps` is simply never called. The ARIA problem is again `role="listbox"` around a sign-up button. Rendering the gated panel without `getMenuProps` is legal, but then `aria-controls` dangles unless you either mount a hidden empty `<ul {...getMenuProps()}>` or override it with `getInputProps({'aria-controls': undefined})` — legal, because `rest` is spread last.

**`getItemProps({index})` contiguity is a hard constraint with a real throw.** `getItemAndIndex` throws `new Error('Pass either item or index to getItemProps!')` **in production, not just dev**, when neither is passed, when `items.indexOf(item) < 0`, or when `items[index] === undefined`. `item`-only lookup is `indexOf` — **strict reference equality, not `itemToKey`** — so a render that maps to fresh objects each pass throws. Pass `index`. Indices are indices into `props.items`, not render order, so grouping and reordering are fine as long as the index is true; a gap leaves a highlighted index with no DOM node, which makes `aria-activedescendant` a dangling IDREF and silently no-ops scroll-into-view. `getItemProps({disabled})` was removed and now logs a `console.warn` (`:3263-3265`); use the `isItemDisabled(item, index)` prop.

### Fit

- **React 19.** Peer range is `>=16.12.0` with no upper bound, so React 19 installs with no warning, but **React 19 is not in CI** — devDependencies pin React 18.3.1 throughout. A server render of a real `useCombobox` against `react@19.2.0` / `react-dom@19.2.0` was run for this research and produced the correct DOM with no warnings. Issue #1674 ("React 16/17 compatibility broken in v9.1.0+ due to static analysis of `React.useId()`") was opened 2026-02-05 and closed 2026-02-19; the fix is visible at `:1853-1856`. #1452 (Japanese IME with controlled `inputValue`) is still open from 2022. No open React 19-specific issue. 9.4.0's sole feature is "fix React Compiler compatibility (#1690)".
- **Bundle size, measured.** Bundlephobia for the whole package: `{"gzip":15189,"size":53816,"dependencyCount":5,"hasSideEffects":false}`. Tree-shaking is real but partial — bundling only `import {useCombobox} from 'downshift'` with esbuild (React external, minified, production define) gives **41.8 kB minified / 13.5 kB gzipped**, against 56.8 kB / 17.6 kB for the full barrel. What survives the shake, verified by grep: the production `prop-types` shim (kept alive because the top-level `propTypes$2` object is passed to `validatePropTypes$1` at `:3060`), `react-is`/`isForwardRef`, and the inlined `compute-scroll-into-view`. The legacy `Downshift` class does drop out. **There is no `./useCombobox` subpath** — everything comes through one barrel. Practical number: **~13.5 kB gzipped for `useCombobox` alone, before any positioning library.**
- **Maintenance: active, single-maintainer.** 12,307 stars, 57 open issues and PRs, `pushed_at: 2026-06-30`, not archived, MIT. Nine stable releases between January and June 2026, then a ~2.3-month gap to this reading. Every recent version was published by `silviuaavram`. Several PRs sit open for over a year (#1652 passive event listeners, 2025-06-02; #1647 Shadow DOM, 2025-05-13). Breaking majors at v7 (2022-10), v8 (2023-08) and v9 (2024-03), each with a migration guide, plus `useMultipleSelection` deprecated inside v9.x.
- **What it gives that the others do not**: `stateReducer`, a documented exhaustive action enum, and a per-event opt-out (`event.nativeEvent.preventDownshiftDefault = true`). Anything the default machine does can be vetoed without forking — non-circular navigation, keep-open-after-select, no-toggle-on-click, strict selection on blur, dismiss-only Escape.
- **What it gives that is easy to overlook**: scroll-into-view is built in (`useScrollIntoView`, `:2158-2179`, using `compute-scroll-into-view` with `{boundary: menuNode, block: 'nearest', scrollMode: 'if-needed'}`, suppressed for mouse-driven highlight and fully overridable); touch handling is built in; Home/End/PageUp/PageDown are handled; disabled items are skipped; wrap-around is hardcoded on (the `circularNavigation` prop was removed in v7, and `stateReducer` is the documented replacement).
- **Character typeahead does not exist in `useCombobox`.** `getItemIndexByCharacterKey` (`:2257`) has exactly one call site, at `:2344`, inside `useSelect`. For a combobox this is correct — characters go into the input.
- **Prop-getter merge semantics.** Non-handler props you pass are spread **last** and therefore override downshift's, including `role`, `aria-*`, `tabIndex` and `id`. Event handlers are destructured out first and re-merged through `callAllEventHandlers`, so handlers **compose** (yours first, then downshift's) rather than override. Passing `disabled` to `getInputProps` or `getToggleButtonProps` removes all downshift handlers from that element (`:3367`, `:3320`) and adds no `aria-disabled`.
- **The a11y status region is a global singleton.** If you supply `getA11yStatusMessage`, downshift appends a `<div id="a11y-status-message" role="status" aria-live="polite">` to `document.body`, debounced 200 ms. The id is fixed, so **two combobox instances on a page share one live region**, and unmounting either removes it.

---

## Candidate: a hand-rolled input plus listbox on Radix primitives

### What is available, and under what name

The repo declares one npm dependency for this, `radix-ui`, already shipped by dialog, dropdown-menu, select and tooltip. Version **1.6.7**, published 2026-07-24, peer `react: "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"`, `"sideEffects": false`.

Its top-level export (`dist/index.mjs`) is the 33 public components — `Popover` among them — and **does not include Popper, Presence, DismissableLayer, Collection or RovingFocus**. Those are reachable through an **undocumented subpath**, `radix-ui/internal`, which the exports map resolves through its `"./*"` entry. `dist/internal.mjs` re-exports, verbatim:

```
Arrow, Collection, Context, DismissableLayer, FocusGuards, FocusScope, Menu, Popper,
Presence, Primitive, RovingFocus, composeEventHandlers, composeRefs, useCallbackRef,
useComposedRefs, useControllableState, useControllableStateReducer, useEffectEvent,
useEscapeKeydown, useIsHydrated, useLayoutEffect, useSize
```

It is fully typed (`dist/internal.d.mts`) and has shipped since `radix-ui@1.1.0` (2025-01-22, the first release of the unified package); `radix-ui@1.0.0` and `1.0.1` (both 2022-12-21) contain no `dist/internal` files. The file exists on `main` as `packages/react/radix-ui/src/internal.ts`.

**It is undocumented, and the underlying packages disclaim public use in as many words.** `radix-ui.com/primitives/docs/overview/releases` never mentions `radix-ui/internal`, Popper or Presence as public API. The published README of `@radix-ui/react-popper@1.3.7` is two lines:

> `# react-popper`
> This is an internal utility, not intended for public usage.

`@radix-ui/react-presence@1.1.10`'s README is identical in form. [radix-ui/primitives#3749](https://github.com/radix-ui/primitives/issues/3749), "Public documentation for react-presence", opened 2025-11-12, has no maintainer reply as of 2026-09-09.

The alternative is depending on the three packages by name — `@radix-ui/react-popper@1.3.7`, `@radix-ui/react-presence@1.1.10`, `@radix-ui/react-dismissable-layer@1.1.19` — which is what shadcn's pre-`radix-ui` components did. That is three `dependencies` entries in `registry.json` instead of the one this repo uses everywhere else, and their versions would drift from whatever `radix-ui` pins.

### Dependency weight

Zero new npm packages. `radix-ui@1.6.7` is already a declared dependency of every floating registry item, and all three primitives are already installed transitively. Their own dependency lists, from the tarballs:

- `@radix-ui/react-popper@1.3.7`: `@floating-ui/react-dom ^2.0.0`, `@radix-ui/react-arrow`, `react-compose-refs`, `react-context`, `react-primitive`, `react-use-callback-ref`, `react-use-rect`, `react-use-layout-effect`, `@radix-ui/rect`, `react-use-size`.
- `@radix-ui/react-presence@1.1.10`: `@radix-ui/react-use-layout-effect` only.
- `@radix-ui/react-dismissable-layer@1.1.19`: `@radix-ui/primitive`, `react-compose-refs`, `react-primitive`, `react-use-callback-ref`, `react-use-effect-event`.

The floating engine is Floating UI through `@floating-ui/react-dom`, the same engine select and tooltip already run.

### ARIA

Nothing is provided, which is also why every role and state can be exactly the APG pattern: `role="combobox"` with `aria-expanded`, `aria-controls`, `aria-autocomplete="list"` and `aria-activedescendant` on the `<input>`; `role="listbox"` on the portalled panel; `role="option"` with `aria-selected` on each item. Focus stays in the input by construction, because nothing moves it.

### Async items, value model, slots

All three are unconstrained, because the component owns them. The app supplies items, the component renders what it is given, free text is whatever the input holds, and a footer or a whole replacement panel is another child with no sorter to reorder it and no owned-elements contract imposed by a library. There is no library rule to work around and no library behaviour to inherit. The cost is symmetrical: none of it is provided either.

### Floating layer fit

This is the candidate that fits by construction, because the four built floating components already fit through the same three primitives.

- **Portal.** `radix-ui`'s top-level `Portal` export (`@radix-ui/react-portal@1.1.17`) mounts to `document.body`. `exhibitionMode` is the same one-line branch select uses (`select.tsx:149-152`).
- **Positioning.** `Popper.Content` takes `side` (default `"bottom"`), `sideOffset` (0), `align` (`"center"`), `alignOffset` (0), `avoidCollisions` (true), `collisionPadding` (0), `sticky` (`"partial"`), `hideWhenDetached` (false), `updatePositionStrategy` (`"optimized"`) — `dist/index.mjs:95-105`. The ADR 0005 values are supplied at the call site exactly as `SelectPanel` supplies them.
- **Width.** `w-(--radix-popper-anchor-width)` on the content, the variable select aliases. One caveat from source: the wrapper `Popper.Content` renders carries inline `minWidth: "max-content"` (`dist/index.mjs:203`), so the wrapper is never narrower than its content even when the content is pinned to the anchor width. Select lives with this and truncates item text (`selectItemTextClassName = 'min-w-0 flex-1 truncate'`).
- **Stacking.** `Popper.Content` reads `window.getComputedStyle(content).zIndex` and copies it onto its wrapper (`dist/index.mjs:192-195, 205`), so a single `z-50` in the content class reaches the positioned wrapper. This is how `menuContent`'s `z-50` already works.
- **Enter and exit.** `Presence` is the mechanism ADR 0005 was written around. It runs a three-state machine (`mounted`, `unmountSuspended`, `unmounted`), reads `getComputedStyle(node).animationName`, and on `present: false` sends `ANIMATION_OUT` rather than `UNMOUNT` when an animation is running, then unmounts on `animationend` or `animationcancel` (`@radix-ui/react-presence@1.1.10`, `dist/index.mjs:29-115`). The `floating` item's keyframes drive it with no adaptation.
- **Dismiss.** `DismissableLayer` gives `onEscapeKeyDown`, `onPointerDownOutside`, `onFocusOutside`, `onInteractOutside` and `onDismiss`, and registers in the shared layer stack, so Escape unwinds innermost-first and pointer events survive inside a Radix modal dialog.

### The three things no primitive supplies

Read from source, not assumed:

1. **`DismissableLayer` treats the input as "outside".** The layer is the portalled listbox; the `<input>` is not inside its React tree. `useFocusOutside` fires on any document `focusin` whose target is outside that tree (`dist/index.mjs:318-337`), and `usePointerDownOutside` behaves the same for pointerdown. Clicking or refocusing the input while the panel is open therefore reaches `onDismiss` unless the handler prevents it. Radix's own components do not hit this because their trigger toggles `open` and focus moves _into_ the content; a combobox's focus never leaves the input.
2. **Highlight state and `aria-activedescendant` are entirely hand-written.** No roving-focus helper applies, because roving focus is the wrong model — focus must not move. `RovingFocus` is exported from `radix-ui/internal` and is not usable here. Arrow keys, Home/End, wrap-or-clamp at the ends, pointer-versus-keyboard arbitration over which item is highlighted, and resetting the highlight when the item list changes underneath are all component code.
3. **Scrolling the active option into view.** Nothing in Popper, Presence or DismissableLayer does it. `scrollIntoView({ block: "nearest" })` on highlight change is component code, and it has to not fight the pointer. (Downshift is the one candidate that ships this, via `compute-scroll-into-view`.)

There is no typeahead problem to solve, unlike select: the input _is_ the typeahead.

### Fit

React 19.2 is covered by `radix-ui@1.6.7`'s peer range. Bundle cost over what the repo already ships is the component's own source. The field family attaches through `useFieldIds` and `FieldErrorMessage` with no competing mechanism, and `htmlFor` works natively. The registry item would declare `dependencies: ["radix-ui"]` and the same `registryDependencies` list `select` already carries: `@flyingsalmon/field`, `@flyingsalmon/floating`, `@flyingsalmon/menu`, `@flyingsalmon/interaction`, `@flyingsalmon/spinner`.

### Not verified

Whether `shadcn build` rewrites or warns on a `radix-ui/internal` import was not tested; it rewrites `@/registry/...` paths and passes npm specifiers through, so no problem is expected, but no build was run. Whether the Radix team would treat a break in `radix-ui/internal` as a breaking change was not established — the subpath is undocumented and the underlying READMEs disclaim public use, but no maintainer statement either way was found.

---

## Candidate: Base UI Combobox

**The package named in the ticket no longer exists.** `@base-ui-components/react` is deprecated on npm, frozen at `1.0.0-rc.0` (last publish 2025-12-04), and `npm view @base-ui-components/react@1.0.0-rc.0 deprecated` returns `Package was renamed to @base-ui/react`. Any tooling resolving `@base-ui-components/react@latest` silently installs a nine-month-old release candidate.

**Pinned: `@base-ui/react@1.8.0`**, published **2026-09-04**, five days before this reading. The rename happened at `1.0.0` (2025-12-11), whose release note reads "Stable 🎉 35 unstyled UI components. New `@base-ui/react` npm package. New website." Twelve versions exist; eight minors since 1.0.0 at a roughly monthly cadence, 1.1.0 (2026-01-15) through 1.8.0. Maintainers are the MUI team: `atomiks`, `colmtuite`, `oliviertassinari`, `mnajdova`, `michaldudak`, `mj12albert`, `lukastyla`, `janpotoms`. MIT, SLSA provenance attested.

**Combobox is stable, not experimental.** It shipped in `@base-ui-components/react@1.0.0-beta.3` (2025-09-03, PR #2105) and has been in every release since. The only part flagged unstable in the whole package is `unstable-use-media-query`. Combobox changes across the 1.x line: `loopFocus` and a `placeholder` prop (1.1.0), a `useFilteredItems` hook (1.2.0), `InputGroup` and `Label` parts (1.3.0), a performance pass (1.6.0), a `createItems` collection API (1.8.0).

### Dependencies

Verbatim from the tarball `package.json`:

```json
"dependencies": {
  "@babel/runtime": "^7.29.7",
  "@base-ui/utils": "0.4.0",
  "@floating-ui/utils": "^0.2.12",
  "@floating-ui/react-dom": "^2.1.9",
  "use-sync-external-store": "^1.6.0"
},
"peerDependencies": { "react": "^17 || ^18 || ^19", "react-dom": "^17 || ^18 || ^19", "@types/react": "^17 || ^18 || ^19", "date-fns": "^4.0.0", "@date-fns/tz": "^1.2.0" },
"sideEffects": false
```

`date-fns` and `@date-fns/tz` are optional peers used only by a date-picker adapter. **No Radix package anywhere, so no dependency on `@radix-ui/react-popover` in any form.** rc.0 also carried `reselect` and `tabbable`; both are gone at 1.8.0.

Positioning is `@floating-ui/react-dom`, the same engine Radix's Popper runs. The interactions layer is a **vendored fork of `@floating-ui/react` shipped in-tree** at `floating-ui-react/` (936 kB unpacked), holding `useListNavigation`, `useDismiss`, `useClick`, `FloatingPortal` and `FloatingFocusManager`. It is source Base UI maintains, not a dependency. Base UI's about page states the lineage: "From the creators of Radix, Material UI, and Floating UI" — same people, no shared code.

### ARIA

`docs/react/overview/accessibility.md:23`: "Base UI components adhere to the WAI-ARIA Authoring Practices." The `loopFocus` prop doc links the combobox pattern by name. The emitted markup is the ARIA 1.2 shape.

`combobox/root/AriaCombobox.js:984-1011` puts on the input: `role: 'combobox'`, `aria-expanded`, `aria-haspopup` (`grid ? 'grid' : 'listbox'`), `aria-controls` (the list id, only while expanded), `aria-autocomplete` (from the root's `autoComplete` prop, default `'list'`, forced to `'none'` when read-only), plus `autoComplete: 'off'`, `spellCheck: 'false'`, `autoCorrect: 'off'`, `autoCapitalize: 'none'`. `ComboboxInput.js:163-175` adds `type: 'text'`, `aria-readonly`, `aria-labelledby`, `id`. The list is `role="listbox"` with `tabIndex: -1` and `aria-multiselectable` when multiple (`ComboboxList.js:76-80`). Items are `role="option"` with `aria-selected` when selectable (`ComboboxItem.js:124-131`); a disabled item gets `aria-disabled="true"` through `useFocusableWhenDisabled`. Positioner and Popup are `role="presentation"`; the Popup becomes `role="dialog"` when the input lives inside it.

**`aria-activedescendant`, and focus never leaves the input.** The root calls `useListNavigation(..., { virtual: true, ... })` (`AriaCombobox.js:1042-1052`) and the vendored hook emits ``aria-activedescendant: `${id}-${activeIndex}` `` (`floating-ui-react/hooks/useListNavigation.js:478-480`). Items set `tabIndex: undefined` with the source comment "Focusable items steal focus from the input upon mouseup", the popup's `onMouseDown` calls `store.context.inputRef.current?.focus()`, and `FloatingFocusManager` gets `initialFocus: false` whenever the input sits outside the popup. Roving tabindex is used only in the input-inside-popup pattern, where `Combobox.Trigger` becomes the combobox with `aria-haspopup: 'dialog'`.

### Async items

Two dedicated parts, both `<div role="status" aria-live="polite" aria-atomic>`: **`Combobox.Status`**, which always renders its children and is the loading slot, and **`Combobox.Empty`**, which renders its children only when `filteredItems.length === 0` and therefore requires the `items` prop. Both carry the same shipped warning: "This component's root element must remain mounted in the DOM to announce changes consistently across screen readers. Avoid hiding or removing the component itself with `display: none`, `hidden`, `aria-hidden`, or conditional rendering. Prefer updating or conditionally rendering its children instead."

**There is no `loading` prop, no spinner, and no debounce.** `grep -rl "loading\|debounce" combobox/` matches only an unrelated identifier in `createItems.js`. The docs put `aria-busy` on the Popup by hand and hand-roll the spinner as `<span aria-hidden className="… animate-spin …" />` inside `Combobox.Status`.

App-controlled filtering has three doors: **`filter={null}`** disables internal filtering (`filterProp === null` resolves to `() => true`), **`filteredItems`** supplies the list directly ("Use when you want to control filtering logic externally"), and `items` accepts a flat array, groups, or a `createItems()` collection. Supporting props: `limit` (default `-1`), `locale`, the exported `Combobox.useFilter` (`Intl.Collator`-backed, giving `contains`/`startsWith`/`endsWith`) and `useFilteredItems()`.

**Two first-party async examples exist**, "Async search (single)" and "Async search (multiple)". The single one uses `useTransition`, an `AbortController` ref, `filter={null}`, `onOpenChangeComplete` to reset results to the current selection on close, and an `onInputValueChange` that skips the fetch when the change came from a selection. That last part is a general mechanism: the handler's second argument carries a `reason` from the union `'trigger-press' | 'input-press' | 'outside-press' | 'item-press' | 'close-press' | 'escape-key' | 'list-navigation' | 'focus-out' | 'input-change' | 'input-clear' | 'clear-press' | 'chip-remove-press' | 'cancel-open' | 'none'`.

### Value model

Selection and input text are separate and independently controllable: `value`/`defaultValue`/`onValueChange` for the selection, `inputValue`/`defaultInputValue`/`onInputValueChange` for the text, `open`/`defaultOpen`/`onOpenChange` plus `onOpenChangeComplete` for the layer. Both run through `useControlled`. In single mode, when neither `inputValue` nor `defaultInputValue` is given, the text derives from the selected value's label on mount.

**Free text is not supported, and this is the decisive constraint for hottrip's Destination field.** The usage guidelines say so in two places. `docs/react/components/combobox.md:529-534`: "Combobox is a filterable Select: Use Combobox when the input is restricted to a set of predefined selectable items… Avoid for simple search widgets: **Combobox does not allow free-form text input.** For search widgets, consider using Autocomplete instead." And from the other side, `docs/react/components/autocomplete.md:359`: "Use Combobox instead of Autocomplete if the selection should be remembered and the input value cannot be custom. Unlike Combobox, Autocomplete's input can contain free-form text, as its suggestions only optionally autocomplete the text."

`Combobox` and `Autocomplete` are the same engine (`AriaCombobox`) at different `selectionMode` — `'single'`/`'multiple'` versus `'none'` — published as separate subpaths, `@base-ui/react/combobox` and `@base-ui/react/autocomplete`. There is also a first-party "Creatable" example that promotes an unmatched query into a real item through a `<Dialog>`, which is how Base UI expects free text to be handled: as item creation, not as an unconstrained value.

Clearing is a shipped part: `Combobox.Clear` renders a `<button>`, takes `disabled`, `keepMounted` (default `false`), `nativeButton` (default `true`), `render`, and emits `reason: 'clear-press'`. Its state maps to `data-popup-open`, `data-disabled`, `data-visible`, `data-starting-style`, `data-ending-style`.

Multiple selection is first-class — `multiple` flips `value` to an array, adds `aria-multiselectable`, and brings `Combobox.Chips` / `Chip` / `ChipRemove` with Backspace-removes-last-chip on an empty input.

**Form integration is complete.** Single mode renders one visually-hidden `<input name value disabled required readOnly tabIndex={-1} aria-hidden>` with an `onFocus` that bounces to the real input and an `onChange` that resolves **browser autofill** by matching the autofilled string against registered item values. Multiple mode renders one `<input type="hidden">` per selected value. Related props: `name`, `form`, `required`, `readOnly`, `disabled`, `inputRef` ("A ref to the hidden input element"), `itemToStringValue`, `formAutoComplete`, `submitOnItemClick` (default `false`, doing `flushSync` + `requestSubmit()`).

### Floating layer fit

This is the closest fit of any library candidate.

`Combobox.Portal` wraps the vendored `FloatingPortal`, whose container resolves to `containerProp ?? parentPortalNode ?? document.body` — **`document.body` by default**. Portal is an opt-in part rather than a root boolean, so "always portal" means "always render the part".

`Combobox.Positioner` defaults: `side` `'bottom'`, `align` `'center'`, `sideOffset` `0`, `alignOffset` `0`, `collisionPadding` `5`, `collisionBoundary` `'clipping-ancestors'`, `positionMethod` `'absolute'`, `sticky` `false`, `arrowPadding` `5`. The anchor defaults to `inputGroupElement ?? inputElement`. **There is no `avoidCollisions` boolean**; the equivalent is `collisionAvoidance={{ side, align, fallbackAxisSide }}`, which Combobox overrides to `{ fallbackAxisSide: 'none' }` with the unset fields resolving to `'flip'`. ADR 0005's "expose only `side` and `align`, fix the rest" is a wrapper that hardcodes `sideOffset={8} alignOffset={0} collisionPadding={8}` and forwards nothing else. `side` also accepts the logical values `'inline-start'`/`'inline-end'`.

CSS variables are set on the Positioner by a `size()` middleware (`internals/useAnchorPositioning.js:218-221`): `--available-width`, `--available-height`, `--anchor-width`, `--anchor-height`, plus `--transform-origin` from a separate middleware. Trigger-width panels are `width: var(--anchor-width)`, exactly what the docs' async example does. One caveat: the anchor is the `Combobox.InputGroup` when one is rendered, so `--anchor-width` is that wrapper's width.

**Base UI sets no `z-index` anywhere in its floating layer.** `grep -rn "zIndex" combobox/ internals/ floating-ui-react/ utils/` returns nothing; the only `zIndex` in the package is in `SliderThumb.js`. The library's stated approach is `isolation: isolate` on the app root. ADR 0005's single `z-50` is unopposed.

**Exit animation matches ADR 0005 directly.** The Popup carries `data-open`/`data-closed` and `data-starting-style`/`data-ending-style`. The animation handbook documents both paths and gives the keyframe form verbatim:

```css
.Popup[data-open] {
  animation: scaleIn 250ms ease-out;
}
.Popup[data-closed] {
  animation: scaleOut 250ms ease-in;
}
```

The waiting mechanism is `element.getAnimations()`, not an `animationend` listener (`utils/useAnimationsFinished.js`): `Promise.all(element.getAnimations().map(anim => anim.finished)).then(...)` followed by `ReactDOM.flushSync` so the browser never paints the intermediate state. `getAnimations()` covers CSS animations, CSS transitions and Web Animations API animations, a superset of what an `animationend` listener sees. There is an abort re-check, a `globalThis.BASE_UI_ANIMATIONS_DISABLED` test escape hatch, an `actionsRef` with `{ unmount }` for JS-driven animations, and `onOpenChangeComplete`. Base UI states a preference for transitions over keyframes because "a transition can be smoothly cancelled midway", but both are documented and supported.

Escape closes by default (`useDismiss` with `escapeKey: true`) and reports `reason: 'escape-key'`. Two refinements: on a closed combobox Escape clears the input and the selection, and when there are no items and no `<Combobox.Empty>` is rendered Escape is allowed to bubble so an enclosing popup can close.

### Slots

Both cases are unconstrained. `Combobox.Popup` is a plain `<div role="presentation">` rendering whatever children it is given, and the library's own anatomy already places `Combobox.Status`, `Combobox.Empty` and `Combobox.Arrow` as siblings of `Combobox.List` inside it. A "Powered by Foursquare" line is another sibling. Keyboard navigation is unaffected because the navigation model walks `store.state.listRef`, populated only by `Combobox.Item` registering through `useCompositeListItem`; non-item DOM is invisible to it.

The gated panel has three shapes in increasing order of correctness. Rendering the prompt as the Popup's only child works, but `aria-controls` becomes `undefined` while `aria-expanded` stays `"true"` because there is no list element to name. Keeping `<Combobox.List>` with zero items and putting the gate inside `<Combobox.Empty>` preserves every ARIA wiring. The heaviest form is the first-party **input-inside-popup** pattern, where the Popup becomes `role="dialog"`, `Combobox.Trigger` becomes the `role="combobox"` element, and the popup gets real focus management.

One focus caveat: the Popup is wrapped in `FloatingFocusManager` with `modal: !inputInsidePopup || modal`. With the input outside, `initialFocus` resolves to `false` so opening steals no focus, but a focusable footer link is still inside the manager's scope and Tab-reachable. Read from source, not observed.

### Fit

- **React 19.** Peer range `^17 || ^18 || ^19`. No React 19-only API is used — `grep` for `useActionState|useFormStatus|useOptimistic|React.use(` across `combobox/`, `internals/` and `floating-ui-react/` returns nothing; it uses the `use-sync-external-store` shim for React 17 compatibility. `'use client'` is present on 40 of 42 files in `combobox/` (the two without are type-only barrels). A CSP nonce provider ships at `@base-ui/react/csp-provider`, which matters because the positioner writes inline styles.
- **Bundle size, measured** with esbuild 0.25.10, React external, minified, production define: **141.7 kB minified / 51.2 kB gzipped** for `import { Combobox } from '@base-ui/react/combobox'`. The root barrel import measures 51,074 B gzipped, fractionally smaller than the subpath's 51,207 B — within noise, so shadcn's `import { Combobox as ComboboxPrimitive } from "@base-ui/react"` costs nothing extra. `sideEffects: false` plus an 80-entry `exports` map does the work. Reference points from the same harness: Base UI Popover 41.1 kB gzip, Radix Popover from `radix-ui@1.6.7` 23.9 kB gzip. Bundlephobia's 146.9 kB gzip figure measures the un-tree-shaken barrel and lists a `reselect` dependency 1.8.0 does not declare; treat it as an upper bound.
- **Cost of a second floating engine, quantified.** Radix's Popper depends on `@floating-ui/react-dom ^2.0.0` and Base UI on `^2.1.9`; in a real install they **dedupe to one `@floating-ui/react-dom@2.1.9` / `@floating-ui/dom@1.8.0`**. What duplicates is the interaction layer, not the geometry engine. Radix Popover and Base UI Combobox in one bundle measure 188.5 kB min / 66.8 kB gzip against a disjoint sum of 208.3 kB / 75.2 kB, so the shared Floating UI core is 19.8 kB min / ~8.4 kB gzip. **The marginal cost of adding Base UI Combobox to a bundle already shipping Radix is 121.9 kB min / 42.9 kB gzip.**
- **Field family.** Base UI wires this itself. Wrapping in `Field.Root` makes `ComboboxInput` call `validation.getValidationProps`, which adds `aria-invalid` when invalid and **merges** `aria-describedby` rather than replacing it (`LabelableProvider.js:60-66` splits any external value, pushes the message ids, and dedupes). The input also picks up `aria-labelledby` from the labelable context, and Field state surfaces as `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled`, `data-focused`. That is the same job `useFieldIds` and `FieldErrorMessage` do here, so the two mechanisms would need reconciling rather than layering. Note also that `<Combobox.Label>` labels the **Trigger**, not the input; when `<Combobox.Input>` is the control, use `<label>`, `<Field.Label>` or `aria-label`.
- **`render` is a stronger `asChild`.** Every rendering part takes `render?: ComponentRenderFn<Props, State> | React.ReactElement`, and `className`/`style` each accept a `(state) => …` callback. The docs carry a "Migrating from Radix UI" section mapping `asChild`/`Slot` to `render`/`useRender`. Button-like parts also take `nativeButton` so `useButton` knows what element it is decorating; getting it wrong warns in development.
- **The `data-*` surface matches this repo's conventions closely.** Item exposes `data-selected`, `data-highlighted`, `data-disabled`, so `menuItemHighlighted`'s `data-highlighted:` variant applies unchanged. Positioner and Popup expose `data-open`, `data-closed`, `data-side`, `data-align`, `data-anchor-hidden`, `data-empty`; Popup adds the two transition attributes. Generation is mechanical: each key of a part's `state` becomes `data-<key.toLowerCase()>`, empty string for `true`. `highlightItemOnHover` defaults `true`, and its doc notes that disabling it "allows CSS `:hover` to be differentiated from the `:focus` (`data-highlighted`) state".
- **Other capabilities in the box**: `inline` mode (list without the component's own popup), `virtualized` with a documented TanStack-style example, `grid` mode with `Combobox.Row`, `modal` (default `false`, rendering an internal backdrop with a cutout around the input and locking scroll), and `autoHighlight` (default `false`).

### Second source: shadcn ships this

`https://ui.shadcn.com/r/styles/new-york-v4/combobox.json` declares `"dependencies": ["cn", "@base-ui/react"]`, `"registryDependencies": ["button", "input-group"]`, and its source opens `import { Combobox as ComboboxPrimitive } from "@base-ui/react"`. It wraps `Root, Value, Trigger, Clear, Input, Portal, Positioner, Popup, List, Item, ItemIndicator, Group, GroupLabel, Collection, Empty, Separator, Chips, Chip, ChipRemove` — all present in `combobox/index.parts.d.ts` — and notably does **not** wrap `Combobox.Status`. The Positioner carries `className="isolate z-50"`; the Popup uses `w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin)` with `data-open:animate-in` / `data-closed:animate-out` and `data-[side=bottom]:slide-in-from-top-2`; the Item uses `data-highlighted:bg-accent`. The `render` prop appears five times, composing `InputGroupButton` and `InputGroupInput` into Base UI parts. Meanwhile `https://ui.shadcn.com/r/styles/new-york-v4/command.json` is still `["cn", "cmdk"]` with `registryDependencies: ["dialog"]`.

### Radix modal interop: a confirmed defect with no library-side fix

`mui/base-ui#2854`, "Stacking / z-index issue when using Base UI components inside Radix Dialog", opened 2025-09-28 against `@base-ui-components/react ^1.0.0-beta.3` + `@radix-ui/react-dialog ^1.1.15`, **closed 2025-10-16 as external with no fix, no milestone and no linked PR**, labelled `external dependency`. The thread carries the diagnosis. atomiks, 2025-10-01:

> "The main issue is Radix applies `pointer-events: none` to the entire body, so the combobox positioner/popup aren't interactive. **If you set `pointer-events: auto` on the `Positioner`/`Popup` elements, everything is fine in terms of pointer interactivity of the items** (provided each popup has the same `z-index`). That said, **I'm still not able to scroll the combobox popup** maybe because of Radix's scroll lock… In which case the portal container solution is the only thing that really works properly."

mnajdova closed it with "It's on Radix's side, we are closing the issue." The companion `radix-ui/primitives#3694` is likewise closed with no Radix-side fix; its comments are all consumer workarounds, the fullest being `pointer-events: auto` on the Positioner **plus** wrapping `Combobox.List` in `RemoveScroll` from `react-remove-scroll`.

Confirmed against the 1.8.0 source: **Base UI never sets `pointer-events: auto`.** The only lever is `usePositioner.js:22-27`, which sets `pointerEvents: 'none'` when the positioner is inert. A grep for `pointer-events|pointerEvents` over `combobox/`, `internals/`, `utils/` and `floating-ui-react/` finds five hits, all `'none'`, none of them a floating surface. This is the asymmetry the reporters identified: Radix's own Popper writes `pointer-events` on its floating content, which is why Radix Select inside a Radix Dialog works, and Base UI does not.

**Base UI documents no third-party modal interop at all.** Every Radix mention in the shipped docs is API migration (`use-render.md:323-343`) or credits (`about.md:15`). The only adjacent guidance is the `isolation: isolate` recommendation, which addresses stacking, not `pointer-events` or `aria-hidden`. The sanctioned escape hatch is `Combobox.Portal`'s `container` prop, which is what the maintainers pointed at, and which is exactly the rule ADR 0005 forecloses.

### Not verified

No browser was run; every behavioural claim is a source reading. The `aria-controls` consequence of omitting `Combobox.List` is inferred from `AriaCombobox.js:1002`, not observed. The full prop tables for `Chips`, `Chip`, `ChipRemove`, `Row`, `Group`, `GroupLabel`, `ItemIndicator`, `Separator`, `Label`, `InputGroup`, `Collection` and `createItems` were spot-checked rather than transcribed; they are in `docs/react/components/combobox.md:7189-8564` inside the tarball.

---

## Candidate: Ariakit Combobox

**Pinned: `@ariakit/react@0.4.39`**, published **2026-09-02**, seven days before this reading. 83 published versions since the first on 2022-10-08. It has been pre-1.0 for four years, and `latest` is the only dist-tag.

**`@ariakit/react-core` is dead.** `npm view @ariakit/react-core@latest` returns `0.4.26` with `DEPRECATED ⚠️ - This package has been split into smaller packages. Use @ariakit/react-components or @ariakit/react-utils depending on the APIs you need.` The last `@ariakit/react` release depending on it was 0.4.36; 0.4.38 moved to `@ariakit/react-components@0.5.0` and 0.4.39 to `0.6.0`. Any plan citing `@ariakit/react-core` describes a dead package.

Current tree, verbatim from the tarballs:

```
@ariakit/react@0.4.39
  dependencies: { "@ariakit/react-components": "0.6.0" }
  peerDependencies: { "react": "^17.0.0 || ^18.0.0 || ^19.0.0", "react-dom": same }
  type: "module", sideEffects: false

@ariakit/react-components@0.6.0
  dependencies: { "@ariakit/components": "0.1.12", "@ariakit/react-store": "0.1.10",
                  "@ariakit/react-utils": "0.2.5", "@ariakit/store": "0.1.9",
                  "@ariakit/utils": "0.2.0", "@floating-ui/dom": "^1.0.0" }
```

**No Radix dependency anywhere.** The full transitive set is `@ariakit/react-components`, `@ariakit/react-store`, `@ariakit/react-utils`, `@ariakit/utils`, `@ariakit/store`, `@ariakit/components`, `@floating-ui/dom`, `@floating-ui/core`, `@floating-ui/utils`, `use-sync-external-store`.

### ARIA

The docs page says "This component is based on the WAI-ARIA Combobox Pattern". **No version number is stated anywhere.** A grep of the combobox source for `WAI-ARIA`, `w3.org/WAI`, `aria-practices`, `APG` and `ARIA 1.` returns zero hits. The emitted markup is unambiguously the ARIA 1.2 shape — `role="combobox"` on the `<input>` itself, not on a wrapper — but that is a source reading, not a quoted claim. Any spec asserting "Ariakit documents ARIA 1.2 explicitly" overstates it.

`combobox.tsx:731-745` emits on the input: `role: "combobox"`, `aria-autocomplete` (from the `autoComplete` prop, default `"list"`, validated against the real attribute union), `aria-haspopup`, `aria-expanded`, `aria-controls`, `data-active-item`, `value`, `name` (single-select only), `form`, `disabled`. **`...props` is spread after the ARIA defaults**, so caller-supplied roles and ARIA attributes win, and `aria-describedby` passes through untouched.

`aria-haspopup` is computed from the **live role of the popup element**: `getPopupRole` (`@ariakit/utils` `dom.ts:375-384`) reads `element.getAttribute("role")` and returns it if it is one of `dialog | menu | listbox | tree | grid`, else falls back to `"listbox"`. That is what makes the slot story work, below.

`ComboboxList` emits `role: "listbox"`, `aria-multiselectable` (only for `listbox | tree | grid` roles with an array `selectedValue`), `aria-labelledby`, `data-combobox-list`, `hidden`, and an unconditional `tabIndex: -1` with the source comment "Keep DOM focus on the combobox control. Making the list a Tab stop would cause its focus redirect to restart sequential navigation." It also installs a defensive `onFocus` bouncing focus back to the composite.

Items get `role` from `getItemRoleByPopupRole` (`menu → menuitem`, `listbox → option`, `tree → treeitem`, default `option`) and default `children: value`.

**`aria-selected` is emitted conditionally** (`combobox-item.tsx:236-241`): only when `selectMode || multiSelectable` and `selected != null`. **In a plain single-value free-text combobox no option carries `aria-selected` at all.** That is deliberate under ARIA 1.2 — the active option is conveyed by `aria-activedescendant` and `aria-selected` is reserved for actual selection. A persistent checkmark needs `ComboboxItemCheck`/`ComboboxItemSelected` or an explicit `aria-selected`.

**Virtual focus is the default for combobox**, unlike the generic composite. `combobox-store.ts:90-94` sets `virtualFocus: defaultValue(props.virtualFocus, syncState?.virtualFocus, true)`. `composite.tsx:582-596` emits `aria-activedescendant` from `getEnabledItem(store, activeId)?.id`, and `composite.tsx:300-316` synthesises blur events against item elements so item-level handlers still fire. The roving-tabindex path is the `virtualFocus === false` branch and is switchable per store; Ariakit already forces it off in some circumstances, with a source comment at `select-item.tsx:165-170` naming iOS Safari.

### Async items

**There is no first-party async API at all.** A grep of `@ariakit/react-components@0.6.0` for `useDeferredValue`, `debounce`, `isLoading`, `aria-busy` and `loading` in the combobox family returns zero hits; the only `loading` matches are the substring inside `isDownloading`.

The complete export list of `@ariakit/react/combobox` is `Combobox, ComboboxAnchor, ComboboxCancel, ComboboxContext, ComboboxDisclosure, ComboboxDismiss, ComboboxGroup, ComboboxGroupLabel, ComboboxHeading, ComboboxInput, ComboboxInputValue, ComboboxItem, ComboboxItemCheck, ComboboxItemSelected, ComboboxItemValue, ComboboxLabel, ComboboxList, ComboboxPopover, ComboboxProvider, ComboboxRow, ComboboxSelect, ComboboxSelectArrow, ComboboxSelectedValue, ComboboxSelectLabel, ComboboxSeparator, ComboboxStore, ComboboxValue`. **There is no `ComboboxEmpty`, no `ComboboxLoading`, no `ComboboxSpinner`.** Loading and empty states are nodes you render inside `ComboboxPopover`; announcing them is your own live region.

There is a `useDeferredValue` in `@ariakit/react-utils` (`hooks.ts:204-221`), but it is an internal React 17 polyfill and is **not re-exported publicly** — `grep -c useDeferredValue` over the published `index.js` and `index.d.ts` returns `0`.

**Ariakit does no filtering.** The docs state it: "The Combobox component is agnostic to the filtering method you use", and the filtering example uses `match-sorter` plus React's own `startTransition`. There is no filtering code anywhere in the combobox source; `ComboboxList` renders `props.children` verbatim and items register themselves on mount. So a server-driven list is the default mode, not a special one.

Two props interact with an async list. `autoSelect` (default `false`) auto-activates the first enabled item as the value changes, which races a late-arriving list — 0.4.39's changelog logs exactly that fix, "Fixed `Combobox` with `autoSelect` keeping the previously active option highlighted for one frame after the filtered list changes". `showMinLength` (default `0`) gates opening on input length, giving "type three characters to search" without custom code.

### Value model

**The input-text field was renamed; `value` is now a deprecated alias for `inputValue`.** `combobox-store.ts:134-168` seeds both and keeps them in bidirectional sync, and `combobox-store.ts:461-488` defines `setValue` and `resetValue` as aliases for `setInputValue`/`resetInputValue`. The type doc at line 688 reads `@deprecated Use setInputValue`. Six `@deprecated` markers exist in that file. The current spelling is `{ inputValue, setInputValue, defaultInputValue, selectedValue, setSelectedValue, defaultSelectedValue }`.

`inputValue` is literally what is written to the DOM (`combobox.tsx:737`, `value: inputValue`); `selectedValue` is the committed choice. They are independent, so a user can type "app" while "Apple" is selected. Both default to `""`. **`multiSelectable = Array.isArray(selectedValue)`** — multi-select is switched on purely by making `selectedValue` an array.

**Free text by default, and there is no strict-selection flag.** Nothing forces `inputValue` to correspond to an item; enforcing that is app code. Two store options shape resets: `resetValueOnSelect` and `resetValueOnHide`, both defaulting to `false` for single-select and `true` for multi-select.

Item click semantics are three independent, per-event-overridable booleans (`combobox-item.tsx:79, 147-148, 164-189`): `setValueOnClick` writes the item's value into **`inputValue`** (defaults `true` for plain single-select); `selectValueOnClick` writes **`selectedValue`** (defaults `true` unconditionally, with array toggle semantics built in — clicking an already-selected value removes it); `hideOnClick` closes the popup (defaults `true` when the item has a value and the combobox is single-select).

**`ComboboxCancel` clears `inputValue` only.** `combobox-cancel.tsx:68-73` calls `store.move(null)` and `store.setInputValue("")`; clearing `selectedValue` is app code. It also hard-codes an English `aria-label="Clear input"` and renders `aria-controls` pointing at the input so focusing it does not close the popup. `hideWhenEmpty` is available.

**Hidden inputs are built into `Combobox` itself**, not into the separate `@ariakit/react/form` module. Single-select puts `name` on the visible `<input>`, so **the form submits `inputValue`, not `selectedValue`** — they coincide only because `setValueOnClick` defaults to `true`. Multi-select wraps the element and emits one `<input type="hidden" name value>` per selected value (`combobox.tsx:706-726`). `@ariakit/react/form` is a wholly separate form-state library on its own subpath; adopting it is not required.

### Floating layer fit

**The floating engine is `@floating-ui/dom@^1.0.0`, the same engine Radix runs.** In this repo `radix-ui@1.6.7` → `@radix-ui/react-popper@1.3.7` → `@floating-ui/react-dom@^2.0.0` → `@floating-ui/dom@^1.8.0`, and Ariakit resolves the same `1.8.0`. **The positioning core dedupes**; what duplicates is the React wrapper and store layer. Quantified below.

`ComboboxPopover` does not override `portal`; `usePopover` sets `portal = modal`, and `modal` defaults to `false`. **So `portal` defaults to `false` and must be passed explicitly.** When passed, the target is a `div` appended to `document.body`.

**`placement` is a single Floating UI string, and it is store state, not a component prop.** `combobox-store.ts:97-103` defaults it to `"bottom-start"` (the generic popover store default is `"bottom"`). There is no `side` and no `align`; a wrapper would compose `` `${side}-${align}` `` with `align: "center"` mapping to a bare side, and would set it on `useComboboxStore`/`ComboboxProvider` rather than on `<ComboboxPopover>`.

Defaults from `usePopover` (`popover.tsx:249-267`), against the ADR: `gutter` resolves to `0` with no arrow (ADR wants `sideOffset` 8); `shift` `0` matches `alignOffset` 0; `flip` `true` matches `avoidCollisions`; `overflowPadding` **`8`** matches `collisionPadding` 8; `slide` `true`; `overlap` `false`; `sameWidth` `false`; `fitViewport` `false`; `arrowPadding` `4`; `fixed` `false`; `preserveTabOrder` `true`; `hideOnEscape` `true`; `hideOnInteractOutside` `true`; `unmountOnHide` **`false`**. Naming trap: `shift` is the cross-axis offset (`alignmentAxis`), while Floating UI's `shift()` middleware is driven by `slide` and `overlap`. `flip` also accepts a space-delimited fallback placement list.

`sameWidth` gives trigger-width panels, but it sets `width` on the **wrapper**, not on your styled element (`popover.tsx:210-212`).

CSS variables, written onto the wrapper by the `size` middleware (`popover.tsx:198-209`) and inheriting down: `--popover-anchor-width`, `--popover-available-width`, `--popover-available-height`. Plus `--popover-overflow-padding` on the popover element (set even while hidden, marked public API in a source comment) and `--popover-transform-origin` (only when an arrow element exists). These are the direct analogues of the Radix variables select already uses; `max-height: var(--popover-available-height)` is the intended form.

**Ariakit always wraps popover content in an extra positioning `<div>`** (`popover.tsx:596-614`) carrying `position`, `top: 0`, `left: 0`, `width: "max-content"`, with your content element getting `position: "relative"`. z-index is **copied imperatively**: `popover.tsx:540-558` reads `getComputedStyle(contentElement).zIndex` and assigns it to the wrapper's inline style, re-checking across two `requestAnimationFrame`s, with the source comment "so users only need to set the z-index once". Ariakit itself sets no z-index value. So one authored `z-50` produces two z-indexed elements plus an undecorated portal `div` on `document.body`; whether that satisfies "exactly one `z-50`" depends on whether the ADR means one authored declaration or one element.

**Animation is the sharpest mismatch with ADR 0005. Ariakit does not listen for `animationend` or `transitionend`.** `disclosure-content.tsx:29-70` parses `getComputedStyle`'s `transitionProperty`/`transitionDuration`/`transitionDelay` and `animationName`/`animationDuration`/`animationDelay`, takes the longest timeline, and `disclosure-content.tsx:172-238` waits that many milliseconds **minus one frame** via `setTimeout` before `flushSync`ing the state change. Its own comment gives the reason: "Derive a timeout because transition and animation end events may never fire."

Three consequences. CSS keyframes are detected, so keyframe-only enter/exit is compatible in effect. But if the ADR's contract is literally "wait on `animationend`", Ariakit does not satisfy it and by design never will. And there is a hard ordering constraint: if the **enter** pass measures zero duration, the code sets `animated` to `false`, after which the element unmounts immediately on close and **the exit animation never plays**. The docs mirror this — `data-leave` "only occurs if an enter transition or animation was detected". An enter animation is mandatory to get an exit animation. The `animated` prop itself is deprecated ("Manually setting the `animated` prop is no longer necessary"); detection is automatic.

Attribute choice matters here. `disclosure-content.tsx:268-272` emits `data-open`, `data-enter`, `data-leave`. `data-enter` is applied after a **double `requestAnimationFrame`**, deliberately, so a transition's starting style paints first. The styling guide says `data-open` "is similar to data-enter, but it's applied synchronously" and is "handy for applying CSS animations", while "For CSS transitions, you should use data-enter". **For this repo's keyframes-only design system the correct selectors are `[data-open]` for enter and `[data-leave]` for exit**, not `[data-enter]`, even though Ariakit's own animated combobox example is transition-based and uses `[data-enter]`.

`unmountOnHide` defaults to `false`, so by default the popover stays in the DOM permanently, hidden by `display: none` plus the `hidden` attribute. `unmountOnHide` is available on `ComboboxPopover` (it inherits the full `DialogOptions` surface) for Radix-like unmount-on-close.

Escape dismisses by default. There is a combobox-specific addition: `resetOnEscape` (defaulting to the store's `selectOnMove`) restores `selectedValue` to its pre-movement value when Escape closes the popup.

### Slots

**`ComboboxPopover` is by default the listbox itself** — `combobox-popover.tsx:156-232` composes `useComboboxList` + `useCompositeTypeahead` + `usePopover` onto one element. A footer `<div>` dropped straight into it is a non-`option` child of `role="listbox"`, which is invalid.

The escape hatch is nested-list detection (`combobox-list.tsx:114-137`): a `MutationObserver` on `{subtree: true, childList: true}` tests `element.querySelector("[data-combobox-list]")`, and **when a `ComboboxList` is nested inside `ComboboxPopover` the popover drops its own `listbox` role**, falling back to `role="dialog"` from `useDialog`. Because `aria-haspopup` is computed live from the content element's role, the input's `aria-haspopup` flips to `"dialog"` — a legitimate ARIA combobox variant, not a bug. So the footer composition is valid:

```jsx
<ComboboxPopover portal sameWidth gutter={8}>
  {' '}
  {/* role="dialog" */}
  <ComboboxList>
    {' '}
    {/* role="listbox" */}
    {items.map((item) => (
      <ComboboxItem key={item} value={item} />
    ))}
  </ComboboxList>
  <footer>Powered by Foursquare</footer>
</ComboboxPopover>
```

This is deliberate, not incidental: 0.4.39's changelog records "Fixed `ComboboxPopover` rendering an invalid `listbox` role around a nested `ComboboxList` that carries a different popup role, and dropping its own role when an unrelated element with `role="listbox"` renders inside it." The `data-combobox-list` marker exists so an unrelated `role="listbox"` descendant does not confuse the detection. The cost is one observer callback plus a `querySelector` per items re-render.

A gated panel has two levels. Replace the list's children and keep `role="listbox"`, which is ARIA-invalid; or override the role — `ComboboxList`'s own doc says the `role` prop "can be overriden by any other valid combobox popup role (`listbox`, `menu`, `tree`, `grid` or `dialog`)", and the role is read from the live DOM attribute so it can flip at runtime, re-deriving item roles and `aria-haspopup` automatically. For an anonymous-user gate the cleanest form is to omit `ComboboxList` entirely when gated.

**Keyboard navigation tolerates arbitrary children.** Item registration is by explicit `ComboboxItem` mount into the collection store, never by DOM traversal, so non-item nodes are invisible to arrow keys. Two caveats: a focusable footer element is awkward under virtual focus, since `ComboboxList`'s `onFocus` actively bounces focus back to the composite, and clicking it triggers `hideOnInteractOutside` unless it carries `aria-controls` pointing at the combobox — the trick `ComboboxCancel` uses and `combobox-popover.tsx` reads back with `[aria-controls~="${id}"]`. Supported structural non-item children are `ComboboxHeading`, `ComboboxGroup`, `ComboboxGroupLabel`, `ComboboxSeparator` and `ComboboxRow`.

### Fit

- **React 19.** Peer range `^17.0.0 || ^18.0.0 || ^19.0.0`, with React 19 in peers since 0.4.7. Dev dependencies pin `react: 19.2.8` and `react-dom: 19.2.8`, so they build and test against 19.2.x. `"use client"` is the first line of every published entry point. No React 19-only API is required. Four React 19 fixes already landed, including "Fixed merged refs in React components and `Portal` to preserve React 19 callback ref cleanup functions". No open React 19 defect was found, though the issue tracker was searched by keyword only.
- **Bundle size, measured** with esbuild 0.25.0, React external, minified, production define: **124.4 kB minified / 43.9 kB gzipped** for a minimal `ComboboxProvider / Combobox / ComboboxPopover / ComboboxList / ComboboxItem` app importing from the root, and **43.7 kB gzipped** importing from `@ariakit/react/combobox`. **The subpath export buys essentially nothing**; `sideEffects: false` plus the exports map does the work, and two thirds of the library's whole-package 63.5 kB gzip shakes out. With `@floating-ui/*` externalised the figure drops to 36.8 kB gzip. Reference: Radix Popover in the same harness is 23.6 kB gzip full, 15.4 kB with Floating UI externalised.
- **Cost of a second floating engine.** Floating UI accounts for 43.9 − 36.8 = **7.1 kB gzip**, and Radix pulls the same `@floating-ui/dom@1.8.0`, so those bytes are shared under a normal hoisting resolver. **Adopting Ariakit for one combobox adds roughly 37 kB gzip of non-shared code** — store, composite, dialog, focus management, portal, disclosure. That is a one-time floor; a second Ariakit component would add far less.
- **Not 1.0, and every minor is a potential break.** Pre-1.0 for four years, `latest` the only dist-tag. 0.4.37 alone shipped three behavioural breaking changes, and 0.4.39 moved the modal fallback dismiss button in the DOM. The 0.4.x line has just churned its own topology: `react-core` → `react-components`, `value` → `inputValue`, `animated` deprecated.
- **Maintenance is active.** 19 releases in the ~7.7 months of 2026, about 2.5 per month, after a four-month gap in 2025. Maintainers `diegohaz`, `ariakit-bot`, `benrodrs`, `daniguardiola`; publishes via GitHub Actions OIDC. Open RFCs for new component families indicate active feature development.
- **`render` is a stronger `asChild`.** `@ariakit/react-utils` `system.tsx:48-70` accepts **either an element** (`render={<MyInput />}`, merged via `cloneElement`) **or a function** (`render={(props) => <MyInput {...props} />}`). The function form is what Radix's `asChild` lacks. `wrapElement` adds ancestors, and every component also exposes a `useXxx` hook returning a raw props object as a third composition seam.
- **Field family attaches cleanly.** `aria-describedby` is never touched anywhere in the combobox chain and lands on the `<input>` untouched, so `useFieldIds` output passes straight through. For the label, `ComboboxLabel` renders a real `<label>` with `htmlFor` wired to the input's live id and registers itself as `labelElement`, which `ComboboxList` then uses as the listbox's `aria-labelledby` — a free side benefit. Supplying your own `id` on `<Combobox>` also works, since `...props` is spread last, but then the listbox loses its accessible name unless you supply `aria-label` yourself.
- **The `data-*` vocabulary does not match Radix's.** Ariakit emits `data-active-item`, `data-focus-visible`, `data-active`, `data-open`, `data-enter`, `data-leave`, `data-user-value`, `data-autofill`. There is **no `data-highlighted`**, no `data-state="open|closed"`, no `data-side`, no `data-align`. This repo's `menuItemHighlighted` keys on `data-highlighted:` and would need a second selector vocabulary or a translating wrapper. Two attributes are explicitly not public API: `data-placing` (source comment says so) and `data-combobox-list`.

### Radix modal interop

Ariakit sets no `pointer-events: auto` anywhere. Every `pointerEvents` hit in the package is `'none'`, and none is on a popover surface: disabled focusables, decorative icons, the debug polygon, and `dialog/utils/disable-tree.ts:48`, which applies to elements **outside** an Ariakit modal. So an Ariakit popover portalled to `document.body` while a Radix modal Dialog is open inherits the body's `pointer-events: none` and is not clickable. That follows from the two source readings; no browser repro was run.

The `aria-hidden` half does **not** bite, incidentally. `aria-hidden@1.2.6`'s `applyAttributeToOthers` is a one-shot walk with no `MutationObserver`, so a portal div created after the dialog opened — the normal case, since the popover opens on user input — is never visited. That ordering is incidental, not a guarantee.

A third mechanism the ticket does not name: `@radix-ui/react-dialog@1.1.23` wraps its overlay in `react-remove-scroll` with `shards: [context.contentRef]`, and `react-remove-scroll@2.7.2` permits scrolling only inside the Lock's own subtree or a listed shard. A body-portalled Ariakit listbox is neither, so **wheel and touch scrolling inside it would be blocked** while the dialog is open. Not Ariakit-specific, and Radix's `Dialog.Content` exposes no way to add a shard.

For contrast, Ariakit's own modal approach never touches `document.body.style.pointerEvents`. `disable-tree.ts:26-53` walks the tree outside the dialog and marks each sibling `inert`, or, without `inert` support, per-element `aria-hidden` plus `pointer-events: none`. Being per-element rather than body-level, a node appended later is unaffected — the inverse failure mode from Radix's.

**Ariakit ships two Radix interop examples and neither covers a modal Dialog.** The Radix Popover example (non-modal) documents three workarounds: preventing `onOpenAutoFocus`'s default, preventing `onInteractOutside` when the target is the combobox or inside the listbox, and — verbatim — "We must explicitly set `role='listbox'` on the `ComboboxList` component, otherwise Radix will overwrite it with `role='dialog'`". The Radix Select example documents disabling Ariakit's virtual blur because "Ariakit's virtual blur can arrive after focus and close the Select, and `SelectContent` has no outside-interaction escape hatch". Neither page mentions `pointer-events`, `aria-hidden`, `body`, or scroll locking. A tracker search found no open issue about Ariakit popups inside a third-party modal.

The seam that would resolve all three at once is `Portal`'s `portalElement` prop (`portal.tsx:46-54`, accepting an element or a function), mounting the popover inside the Radix dialog content instead of `document.body` — which is the rule ADR 0005 forecloses.

---

## Candidate: React Aria ComboBox

**Pinned: `react-aria-components@1.21.1`**, which pins `react-aria@3.52.1` and `react-stately@3.50.0` exactly. Unpacked 6.29 MB over 1,431 files. Dependencies, verbatim:

```json
"dependencies": {
  "@internationalized/date": "^3.12.4",
  "@internationalized/string": "^3.2.10",
  "@react-types/shared": "^3.36.1",
  "@swc/helpers": "^0.5.0",
  "client-only": "^0.0.1",
  "react-aria": "3.52.1",
  "react-stately": "3.50.0"
},
"peerDependencies": { "react": "^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1", "react-dom": same }
```

**No Radix, no Floating UI, no Popper.** The full transitive tree with React 19 is 16 packages: `@internationalized/date`, `@internationalized/number`, `@internationalized/string`, `@react-types/shared`, `@swc/helpers`, `aria-hidden`, `client-only`, `clsx`, `react`, `react-aria`, `react-aria-components`, `react-dom`, `react-stately`, `scheduler`, `tslib`, `use-sync-external-store`. Positioning is Adobe's own `react-aria/src/overlays/calculatePosition.ts`, roughly 830 lines of hand-rolled rect math driven by `useOverlayPosition.ts`. `aria-hidden` is present but used only by an unrelated modal polyfill, not by the popover path, which uses Adobe's own `ariaHideOutside`.

### The granular hooks packages are shims

The premise that `@react-aria/combobox` is a lighter door is false at these versions. The entire published `src/index.ts` of `@react-aria/combobox@3.16.1` (published 2026-05-28) is:

```ts
export { useComboBox } from 'react-aria/useComboBox'
export type {
  AriaComboBoxProps,
  AriaComboBoxOptions,
  ComboBoxAria,
} from 'react-aria/useComboBox'
```

and `@react-stately/combobox@3.14.1` is the same shape onto `react-stately/useComboBoxState`. `@react-aria/combobox@3.15.0` (2026-03-04) still had 17 granular dependencies; `3.16.0` (2026-04-14) collapsed them to `{"react-aria": "^3.48.0", "@swc/helpers": "^0.5.0"}`. Verified by real install: `npm i @react-aria/combobox@3.16.1 @react-stately/combobox@3.14.1` adds 16 packages, and `npm i react-aria-components@1.21.1` adds 16 packages. The trees are identical modulo `client-only` and `react-aria-components`.

### ARIA

**No React Aria statement naming "ARIA 1.2" could be found.** The live docs at `react-aria.adobe.com/ComboBox` and `/ComboBox/useComboBox` carry no ARIA-version claim, and neither does an archived docs build whose Features list runs "Exposed to assistive technology as a ComboBox … Virtual focus management for ComboBox menu option navigation; VoiceOver announcement enhancements". A web search surfacing "ARIA 1.2 pattern since version 7" is **Downshift's** documentation; do not attribute it to Adobe. The emitted DOM is the ARIA 1.2 shape.

`react-aria/src/combobox/useComboBox.ts:520-541` returns on the input: `role: 'combobox'`, `aria-expanded` (from `useMenuTrigger({type: 'listbox'})`), `aria-controls` (`state.isOpen ? menuProps.id : undefined`), **`aria-autocomplete` hardcoded to `'list'`**, `aria-activedescendant`, `onTouchEnd`, `autoCorrect: 'off'`, `spellCheck: 'false'`, plus `autoComplete: 'off'` from the `useTextField` call. The `completionMode: 'suggest' | 'complete'` prop is **commented out** in both `useComboBox.ts:135` and `useComboBoxState.ts:106-110`, so **inline autocomplete (`aria-autocomplete="both"`) is not available in 1.21.1.**

`useListBox.ts:196` emits `role: 'listbox'` with `aria-multiselectable` only for multiple selection; `useOption.ts:121-123` emits `role: 'option'` and `aria-selected` when the selection mode is not `'none'`. `renderEmptyState` content and the loading row are both wrapped in `role="option"` to keep the listbox's owned-elements contract valid.

**Virtual focus, and DOM focus never leaves the input.** `useComboBox.ts:173-182` passes the collection keyboard handlers to the _input_ ref (`useSelectableCollection({ref: inputRef, disallowTypeAhead: true, isVirtualized: true})`), and `listBoxProps` carries `shouldUseVirtualFocus: true`. **No Adobe rationale for choosing this over roving focus was found** in any doc or blog post, but the source names the cost of it directly — `useComboBox.ts:395-397`:

> "VoiceOver has issues with announcing aria-activedescendant properly on change (especially on iOS). We use a live region announcer to announce focus changes manually. In addition, section titles are announced when navigating into a new section."

Lines 398-449 implement that compensation: `announce()` calls for focus changes, option-count changes and selection, all gated on `isAppleDevice()`. That is the one candidate that ships a documented mitigation for the `aria-activedescendant` weakness rather than just relying on it.

One behaviour to note for the in-dialog case: `useComboBox.ts:469-475` calls `ariaHideOutside([inputRef.current, popoverRef.current])` whenever the combobox is open. Inside a dialog that means the dialog's own title, other fields and submit button all become `aria-hidden="true"` for the duration. The walk skips ancestors of the targets, so the dialog element itself survives; its siblings of the input do not.

### Async items

**`useAsyncList` is the one first-party async collection in this whole survey.** Its `load` function receives `{signal: AbortSignal, cursor, filterText, loadingState}`, and the returned data exposes `isLoading`, `loadingState`, `filterText`, `setFilterText`, `reload()`, `loadMore()` plus the mutation actions. The abort signal is wired to superseded requests by the library.

**Debouncing does not exist.** `grep -rn "debounce"` over `packages/react-aria/src` and `packages/react-stately/src` returns zero hits; the only `setTimeout` is in a visual-viewport resize guard. Debouncing input to request is entirely the consumer's job.

Loading UI is a part, not a prop. **`ListBoxProps` has no loading prop at all.** The current export is **`ListBoxLoadMoreItem`** — stable, no `UNSTABLE_` prefix — with `isLoading`, `onLoadMore`, `scrollOffset`, `children` ("The load more spinner to render when loading additional items"). It is a real collection node created with `createLeafComponent`, so it must be a child of `ListBox`, not of `Popover`. It always renders an inert 1×1 sentinel div driving `onLoadMore` through an IntersectionObserver, and renders the spinner row only when `isLoading && children`, as `role="option"` with `tabIndex={-1}` and deliberately no `aria-posinset`/`aria-setsize` (source comment: "For now don't include aria-posinset and aria-setsize on loader since they aren't keyboard focusable"). There is no `ProgressBar` slot; nothing in `ComboBox.tsx` or `ListBox.tsx` provides a `ProgressBarContext`.

`renderEmptyState` renders inside `<div role="option" style={{display: 'contents'}}>`, and the listbox root gets `data-empty`.

Server-filtered lists work through one line, `useComboBoxState.ts:296-304`:

```ts
let filteredCollection = useMemo(
  () =>
    // No default filter if items are controlled.
    props.items != null || !defaultFilter
      ? collection
      : filterCollection(collection, inputValue, defaultFilter),
  [collection, inputValue, defaultFilter, props.items],
)
```

Passing **`items`** (controlled) disables client filtering entirely; passing `defaultItems` gets RAC's `useFilter({sensitivity: 'base'})` contains matcher.

**`allowsEmptyCollection` is close to mandatory for async work.** It defaults to `false` (`useComboBoxState.ts:190`), and without it the menu force-closes the moment the filtered collection hits zero (lines 421-425) — exactly the window between the user typing and the server responding. The `open()` guard carries an explicit comment about the controlled-items escape hatch. Also relevant: `useComboBoxState.ts:462-475` re-syncs `inputValue` from a selected item's `textValue` when items arrive late, but only when the field is unfocused and `inputValue` is uncontrolled, with the comment "This is to handle cases where a selectedKey is specified but the items aren't available (async loading)".

### Value model

`inputValue` (string) and the selection are separate and separately controlled. **The selection props were renamed in 1.21.1 and the old ones deprecated**, because ComboBox gained multi-select. `useComboBoxState.ts:73-99` marks `selectedKey`, `defaultSelectedKey` and `onSelectionChange` `@deprecated`; the current names come from `ValueBase` as **`value` / `defaultValue` / `onChange`** plus `selectionMode`, where `ValueType<'single'> = Key | null` and `ValueType<'multiple'> = readonly Key[]`. `ComboBoxState` still exposes the old members, each marked deprecated, and the fallbacks (`props.value ?? props.selectedKey`) keep old code working. A new `ComboBoxValue` component renders the selection as an `Intl.ListFormat`-joined string with a `placeholder` and `data-placeholder`.

**`allowsCustomValue` gives free text**, and flips the form value with it: `ComboBox.tsx:197-200` sets `formValue = 'text'` unconditionally when it is on, overriding the `formValue` prop, and the docs say so. It also changes `revert()` to `commitCustomValue()` and makes Escape propagate out of the combobox.

**There is no first-party clear button.** `grep -n "clear" ComboBox.tsx` finds only an unrelated `CLEAR_CONTEXTS`. `SearchField` has one; ComboBox routes `ButtonContext` to the **toggle** button instead (`ComboBox.tsx:314`). A clear button is hand-rolled against `ComboBoxStateContext`. Related trap: any plain `<Button>` dropped inside `<ComboBox>` silently picks up the toggle button's props from context and must pass `slot={null}` to opt out.

One built-in clearing behaviour: `useComboBoxState.ts:437-447` sets the value to `null` when the user empties the input, but only in single-select mode and only when `inputValue`/`value` are uncontrolled ("If controlled, this is the application developer's responsibility").

`menuTrigger` is `'focus' | 'input' | 'manual'`, **default `'input'`**. `onOpenChange` reports which action opened the menu.

**Form integration is complete but shape-shifting.** With `formValue === 'key'` (the default) `ComboBox.tsx:297-307` renders one `<input type="hidden" name form value>` per selected value, with a `null` placeholder when empty. With `formValue === 'text'` the `name` goes to `useComboBox` and lands on the visible input instead. So the submitted DOM differs depending on `allowsCustomValue`. `validationBehavior` resolves `props ?? form ?? 'native'`, so **native by default**: `useFormValidation` calls `setCustomValidity` on the input, auto-focuses the first invalid input on submit, and patches `form.reset`.

**`aria-describedby` merges rather than clobbers.** `react-aria/src/label/useField.ts:52-58` joins `[descriptionId, errorMessageId, props['aria-describedby']]`, with a source comment naming the reason: "Use aria-describedby for error message because aria-errormessage is unsupported using VoiceOver or NVDA. See adobe/react-spectrum#1346". The ids come from `useSlotId`, which returns `undefined` when no element with that id exists, so there are no dangling references. **This repo's `useFieldIds` output can be passed straight through as `aria-describedby` and both survive.** What does not coexist as cleanly is error-text ownership: `FieldError` reads `FieldErrorContext`, populated by RAC's own `useFormValidationState`, so an external error string cannot be handed to it directly — it needs `isInvalid` + `validate`, or the `Form`-level `validationErrors` prop.

### Floating layer fit

Portal is unavoidable and correct by default: `Overlay.tsx` uses `portalContainer = isSSR ? null : document.body` and **there is no render-inline mode**. Overrides are `UNSAFE_PortalProvider` or the `UNSTABLE_portalContainer` prop, the latter marked deprecated in 1.21.1. `exhibitionMode` has no equivalent.

**`placement` is one Floating-UI-style string**, from a 22-member union spanning `'bottom' | 'bottom start' | 'top end' | 'left top' | …`. Defaults: `placement` `'bottom'` generally but `'bottom start'` as ComboBox passes it; `offset` **`8`** in RAC's Popover (matching ADR 0005's `sideOffset`); `crossOffset` `0` (matching `alignOffset`); `shouldFlip` `true` (matching `avoidCollisions`); **`containerPadding` `12`, which does not match `collisionPadding: 8`** and must be set explicitly. Also `boundaryElement` `document.body`, `shouldUpdatePosition` `true`, `isKeyboardDismissDisabled` `false`.

CSS variables come from `Popover.tsx:325-332`: **`--trigger-width`**, measured from `props.triggerRef.current.getBoundingClientRect().width` under a `ResizeObserver`, with ComboBox pre-seeding it from an input-plus-button union width and pointing `triggerRef` at the `<Group>` if one is rendered; and `--trigger-anchor-point`, an `x y` pair usable directly as `transform-origin`, added for `adobe/react-spectrum#8119`. `data-placement` is also emitted. Trigger-width panels are `width: var(--trigger-width)` — supported, but as a variable, not enforced.

**This is the one candidate that writes an inline `z-index`, and it is not configurable.** `useOverlayPosition.ts:400-411` returns:

```ts
overlayProps: { style: { position: position ? 'absolute' : 'fixed', top: …, left: …,
  zIndex: 100000, // should match the z-index in ModalTrigger
  ...position?.position, maxHeight: position?.maxHeight ?? '100vh' } }
```

It merges into `popoverProps.style`, which is spread first, so a user `style` overrides it — but **a Tailwind `z-50` class will not**, because an inline style beats a class. ADR 0005's "exactly one `z-50`" requires passing `style={{zIndex: undefined}}` on every Popover. Worse for debugging, `useOverlayPosition.ts:300-310` mutates the node **outside React**: "Modify overlay styles directly so positioning happens immediately without the need of a second render", assigning `top`, `bottom`, `left`, `right` and `maxHeight` imperatively, with a further transient write in the measurement pass.

**The exit animation is the best fit of any candidate.** `Popover.tsx:173-196` keeps the element mounted with `data-exiting` while `useExitAnimation` runs a three-state machine, and `react-aria/src/utils/animation.ts:80-110` does the waiting:

```ts
let animations = ref.current.getAnimations()
if (animations.length === 0) {
  onEnd()
  return
}
Promise.allSettled(animations.map((a) => a.finished)).then(() => {
  if (!canceled) {
    flushSync(() => {
      onEnd()
    })
  }
})
```

That is the Web Animations API, so CSS keyframes and CSS transitions both work with no duration constant in JS — the CSS is the single source of timing. Zero running animations unmounts immediately with no artificial delay, and `isOpen` going true mid-exit resets cleanly. Under jsdom `getAnimations` is absent and it unmounts synchronously, so this repo's vitest + jsdom 30 setup will not hang on exit animations. `useEnterAnimation` is the mirror and cancels any transition that started before placement was computed, so the popover does not animate from its pre-positioned location. Emitted for styling: `data-trigger="ComboBox"`, `data-placement`, `data-entering`, `data-exiting`.

**Escape's propagation is conditional, which is a live defect surface for a combobox inside a modal.** Two handlers exist: `useOverlay.ts:128-139` dismisses unless `isKeyboardDismissDisabled`, and `useComboBox.ts:236-243` reverts and returns `shouldContinuePropagation` computed as `!state.selectionManager.isEmpty || state.inputValue === '' || props.allowsCustomValue`. So Escape always closes the combobox, but it also **bubbles** whenever something is selected, the input is empty, or `allowsCustomValue` is set — and a wrapping Radix Dialog then closes on the same keypress. It is swallowed only in the "typed a query, nothing selected, strict selection" state.

Two more structural notes: `Popover` injects two visually-hidden `DismissButton`s and, for a root popover, a `display: contents` wrapper div, so the portalled subtree is not just your panel; and the non-modal underlay div is not rendered for ComboBox, since ComboBox sets `isNonModal: true`.

### Slots

**A footer is supported, and RAC actively clears contexts for it.** `ComboBox.tsx:180-188` defines `CLEAR_CONTEXTS = [LabelContext, ButtonContext, InputContext, FieldInputContext, GroupContext, TextContext]` and passes it to `PopoverContext`; `Popover.tsx:299-307` wraps the popover's children in a `null` provider for each. So a `<Button>` or `<Text>` in the footer does not silently absorb the combobox's toggle-button or description props. `<Popover>` renders `{children}` with nothing constraining it to one `ListBox`.

Two constraints. Anything **inside** `<ListBox>` must be a collection node — `ListBoxItem`, `ListBoxSection`, `ListBoxLoadMoreItem`, `Collection` — because `ListBox` renders from the built collection, not from `props.children`; a plain `<div>` inside it does not render. And **a Tab-reachable footer link is effectively unreachable while the menu is open**: `useComboBox.ts:218-235` intercepts Tab to commit the selection and close the menu. A footer is fine as attribution; it is not fine as an interactive affordance.

A gated panel is possible but awkward. `ComboBox` does not require a `ListBox` child at the type level, but `aria-controls` still points at `menuProps.id`, so omitting the ListBox leaves the input with `role="combobox"`, `aria-expanded="true"` and a dangling IDREF. The menu usually will not open at all — `open()` requires `allowsEmptyCollection || filteredCollection.size > 0 || (displayAllItems && originalCollection.size > 0) || props.items`. The idiomatic route is `renderEmptyState`, which keeps ARIA valid, at the cost that the panel is semantically a listbox option, so an interactive sign-up button inside it is a role violation and Tab-unreachable per above.

**The collection builder renders every child twice.** `ComboBox.tsx:173-177` wraps everything in `CollectionBuilder`, and `CollectionBuilder.tsx:67-77` renders `props.content` once inside `<Hidden>` and once for real. `Hidden.tsx:65-77` renders into a real DOM `<template>` element under SSR ("In SSR, portals are not supported by React. Instead, always render into a `<template>` element, which the browser will never display to the user"). RAC's own components opt out via `createHideableComponent`; **an arbitrary user component does not.** A `<PoweredByFoursquare/>` footer mounts inside the `<template>`, runs its hooks and effects, fires its analytics and loads its `<img>`, once per collection rebuild — that is, on every keystroke that changes the collection. `Hidden.tsx:29-61` also monkey-patches `HTMLTemplateElement.prototype`'s `firstChild`, `appendChild`, `removeChild` and `insertBefore` globally on import. The mitigation is wrapping footer content in `createHideableComponent` yourself, or gating on `useIsHidden()`.

### Fit

- **React 19.** Peer range allows `^19.0.0-rc.1`; 19.2.0 installs clean with no peer warnings. No React 19-only API is required — it still ships a `use-sync-external-store` path for React 16/17, and `ListBox.tsx:788` has `{/* @ts-ignore - compatibility with React < 19 */}` around `inert={inertValue(true)}`, so React 19's native `inert` is detected, not required. **There is no `"use client"` directive anywhere in the package**; instead it uses `import 'client-only'`, with a source comment saying this "will cause a build time error if you try to import it from a React Server Component". A consumer wrapper must carry its own `"use client"`. Not an issue for this repo's Vite setup, but a real one for a registry whose consumers may be on Next.js App Router. One acknowledged fragility, `useComboBox.ts:553-557`: a modified `useSlotId` using `useEffect` instead of `useLayoutEffect` because "Triggering re-renders from useLayoutEffect breaks useComboBoxState's useEffect logic in React 18 … This results in onSelectionChange being called multiple times. TODO: refactor useComboBoxState to avoid this."
- **Bundle size, measured** with esbuild, React external, minified: **203.2 kB minified / 61.6 kB gzipped** for `react-aria-components/ComboBox` (ComboBox, Input, Label, Button, Popover, ListBox, ListBoxItem, FieldError, Text). The hooks-only route is 124.7 kB / **36.2 kB gzip**, and the whole barrel is 1,031.5 kB / 279.0 kB. **Importing from the root would be a serious mistake**; per-component subpath exports exist (`"./*"` in the export map plus a `ComboBox/package.json` shim) and do real work here, unlike Ariakit's. For calibration, 61.6 kB gzip for one component is about 2.6× the whole Radix Popover primitive (23.9 kB gzip). Bundlephobia rate-limited; these are esbuild measurements.
- **Two overlay engines and two focus stacks, quantified.** Package overlap between `radix-ui@1.6.7`'s 79-package tree and this 16-package tree is **five packages: `react`, `react-dom`, `scheduler`, `tslib`, `aria-hidden`** — and even `aria-hidden` is shared only as an install, not a code path. Everything else is duplicated capability: positioning (Floating UI versus Adobe's own `calculatePosition.ts`), portal, outside dismiss, focus trap and restore, screen-reader isolation (`hideOthers` versus `ariaHideOutside`), scroll lock (`react-remove-scroll` plus six helper packages versus `usePreventScroll`), roving focus, press and interaction handling, and collections. Each pair keeps **independent module-level global state**: Radix's body `pointer-events` style and `aria-hidden`'s WeakMaps against React Aria's `observerStack`, `refCountMap`, `preventScrollCount` and `visibleOverlays`. They do not know about each other. **This is the only candidate that duplicates the geometry engine too** — Base UI and Ariakit both dedupe onto Floating UI with Radix.
- **Styling.** RAC ships no CSS. Every component applies a `defaultClassName` such as `'react-aria-ComboBox'` only when no `className` is passed; `className`, `style` and `children` all accept render-prop functions receiving the component's state plus `defaultClassName`, and `composeRenderProps` is exported for the `cn(...)`-with-state idiom. The `data-*` surface is large and Radix-shaped in spirit: ComboBox root gets `data-focused`, `data-open`, `data-disabled`, `data-readonly`, `data-invalid`, `data-required`; ListBoxItem gets `data-selected`, `data-disabled`, `data-hovered`, `data-focused`, `data-focus-visible`, `data-pressed`; Popover gets `data-trigger`, `data-placement`, `data-entering`, `data-exiting`. **There is no `data-highlighted`** — the equivalent is `data-focused`/`data-focus-visible` — so `menuItemHighlighted` would not apply unchanged. The slot mechanism **throws** on an unknown slot name ("Invalid slot \"x\". Valid slot names are …") or when a multi-slot context is used with none chosen.
- **Extra DOM.** `Popover` injects two `DismissButton`s and a `display: contents` wrapper; `ListBox` wraps `renderEmptyState` in a `role="option"` `display: contents` div; `ListBoxLoadMoreItem` always emits an inert sentinel. None carry classes, but they are extra nodes in `> *` selectors and flex-gap layouts — the source itself warns, "For now onus is on the user for styling when using flex + gap (this would introduce a gap even though it doesn't take room)".

### Radix modal interop

**React Aria sets no `pointer-events` at all.** A grep for `pointerEvents|pointer-events` across `react-aria/src/overlays/`, `Popover.tsx` and `Modal.tsx` returns zero hits. Portalled to `document.body` with a Radix modal Dialog open, the popover inherits `pointer-events: none` and nothing counteracts it. React Aria does have a `data-react-aria-top-layer` marker its own machinery honours, but only `useToastRegion.ts:214` sets it; Popover does not, and Radix does not read it. Source-verified on both halves; no browser repro.

**The `aria-hidden` half is safe in both directions.** Radix's `hideOthers` is a one-shot walk with no MutationObserver, so a popover portalled after the dialog opened is never visited. And in the other direction, `ariaHideOutside.ts:147-153` early-returns on nodes already `aria-hidden` with a zero refcount ("If already aria-hidden, and the ref count is zero, then this element was already hidden and there's nothing for us to do") and never adds them to `hiddenNodes`, so React Aria will not clobber Radix's state on restore.

**Scroll locking gives no double lock but a probable dead scroll.** `usePopover.ts:125-127` is `usePreventScroll({isDisabled: isNonModal || !state.isOpen})` and ComboBox sets `isNonModal: true`, so React Aria never increments its own counter. But Radix's `RemoveScroll` is active with `shards: [contentRef]`, and a body-level portal is not in the shards. Whether wheel and touch scrolling inside the listbox is actually blocked was **not verified**.

**Focus is the one place virtual focus is a genuine interop advantage.** ComboBox's `isNonModal: true` makes `shouldContainFocus` false, so React Aria does not trap focus, and DOM focus never leaves the `<input>` inside the dialog, so Radix's focus scope has nothing to fight. Two `restoreFocus` stacks unwinding together is a plausible but unverified conflict.

**Documented instances in `adobe/react-spectrum`.** `#5799`, "react-aria focus management causes conflicts with other libraries", **open since 2024-02-05**: "I tried putting a `useColorArea` inside of a `radix-ui` `Popover`, and now it requires two clicks to close the Popover… I should have the option, when using `react-aria` components to not have the focus management change from other libraries." No fix. `#5643`, "React aria components are incompatible with Radix UI?", closed 2025-01-17, where devongovett writes "Probably because we don't pass through DOM events at the moment, only onPress. However another problem is that Radix will ignore any event that has preventDefault called, so if we passed it through it would need to run before our handlers", and a commenter adds "there are a lot more issues when using `rac` and `radix` together — e.g. ran into problems and edge cases, with different focus scope management / issues when scrolling events lost etc." Closed without an interop fix. **No issue naming Radix's body `pointer-events: none` against a React Aria portal was found.**

### Not verified

An explicit React Aria statement naming ARIA 1.2; a published Adobe rationale for virtual focus over roving focus; a `ProgressBar` slot; runtime confirmation of the click-dead popover inside a Radix modal; whether `react-remove-scroll` blocks scrolling in a non-shard body portal; Bundlephobia's own numbers, which rate-limited.

---

## The six against the contract

Every row is a fact established above, not a judgement. "Own" means the candidate provides it; "app" means the component author writes it.

|                                      | cmdk 1.1.1                                                              | Downshift 9.4.0                                                   | Base UI 1.8.0                        | Ariakit 0.4.39                                                          | React Aria 1.21.1                                                                   | Radix primitives                                     |
| ------------------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Depends on `@radix-ui/react-popover` | no (Radix **Dialog**; README tells you to add Popover)                  | no                                                                | no                                   | no                                                                      | no                                                                                  | no (Popper/Presence/DismissableLayer are primitives) |
| Floating engine                      | none                                                                    | none                                                              | Floating UI (dedupes with Radix)     | Floating UI (dedupes with Radix)                                        | Adobe's own (duplicates)                                                            | Floating UI (already here)                           |
| Positioning, portal, z-index         | app                                                                     | app                                                               | own                                  | own                                                                     | own, inline `z-index: 100000`                                                       | own                                                  |
| Exit animation                       | none                                                                    | none                                                              | `getAnimations()`                    | computed `setTimeout`, enter animation mandatory                        | `getAnimations()`                                                                   | `Presence` on `animationend`                         |
| `side` / `align` shape               | —                                                                       | —                                                                 | separate props                       | one `placement` string, on the store                                    | one `placement` string                                                              | separate props                                       |
| Trigger-width variable               | —                                                                       | —                                                                 | `--anchor-width`                     | `--popover-anchor-width`                                                | `--trigger-width`                                                                   | `--radix-popper-anchor-width`                        |
| Escape                               | not handled                                                             | input `onKeyDown` only, overloaded with clear                     | own, bubbles when the list is empty  | own                                                                     | own, bubbles conditionally                                                          | own, layer stack                                     |
| Free text                            | unconstrained                                                           | unconstrained                                                     | **not supported** (use Autocomplete) | unconstrained                                                           | `allowsCustomValue`                                                                 | app                                                  |
| Loading / empty parts                | `Loading` marker + `Empty`                                              | none                                                              | `Status` + `Empty`                   | none                                                                    | `ListBoxLoadMoreItem` + `renderEmptyState`                                          | none                                                 |
| Debounce                             | none                                                                    | none                                                              | none                                 | none                                                                    | none                                                                                | none                                                 |
| Async list source                    | `shouldFilter={false}`                                                  | `items` is always app-owned                                       | `filter={null}` / `filteredItems`    | no filtering at all                                                     | controlled `items`, plus `useAsyncList`                                             | app                                                  |
| Form value                           | none                                                                    | none                                                              | hidden inputs + autofill resolution  | `name` on the input (submits `inputValue`); hidden inputs when multiple | hidden inputs, shape flips with `allowsCustomValue`                                 | app                                                  |
| Footer in the panel                  | reordered by `sort()` unless outside the list or `shouldFilter={false}` | free, but placement trades ARIA validity against dismiss-on-click | free sibling of `List`               | free once `ComboboxList` is nested, popup becomes `role="dialog"`       | free, contexts cleared, but Tab-unreachable and double-rendered into a `<template>` | free                                                 |
| `data-highlighted`                   | no (`data-[selected=true]`)                                             | app                                                               | **yes**                              | no (`data-active-item`)                                                 | no (`data-focused`)                                                                 | app                                                  |
| Marginal gzip over what ships today  | ~4.9 kB                                                                 | ~13.5 kB                                                          | 42.9 kB                              | ~37 kB                                                                  | 61.6 kB (36.2 kB hooks-only)                                                        | 0                                                    |
| Last publish                         | 2025-03-14                                                              | 2026-06-30                                                        | 2026-09-04                           | 2026-09-02                                                              | current                                                                             | 2026-07-24                                           |
| Stability                            | dormant, docs site down                                                 | active, single maintainer                                         | stable 1.x                           | pre-1.0 for four years                                                  | stable                                                                              | stable                                               |
| Radix-modal `pointer-events`         | n/a (no layer)                                                          | n/a (no layer)                                                    | confirmed broken, closed as external | broken by the same mechanism                                            | broken by the same mechanism                                                        | native, works                                        |

Three cross-cutting facts apply to all five libraries and not to the hand-roll: none of them debounces, none of them can be portalled into a Radix modal without either a consumer-side `pointer-events: auto` patch or a `container` override that ADR 0005 forbids, and every one of them puts `aria-activedescendant` on an input pointing into a portalled listbox, which the ARIA 1.2 spec explicitly permits.
