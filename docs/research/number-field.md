# Research: the `number-field` primitive

Ticket [#116](https://github.com/pt-hieu/flyingsalmon/issues/116). Facts only, no decision. Read against published package source and primary specifications on 2026-09-09.

Radix has no number field, so batch 4 has to pick one. This compares **Base UI `NumberField`**, **React Aria `NumberField`**, and **a hand-rolled `<input>` with stepper buttons**, then records what the field family and the built input already provide.

## Versions pinned

| Package                      | `latest`              | Note                                                                                  |
| ---------------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| `@base-ui/react`             | **1.8.0**             | published 2026-09-04; stable since 1.0.0 on 2025-12-11                                |
| `@base-ui-components/react`  | 1.0.0-rc.0            | **deprecated**: "Package was renamed to @base-ui/react". Frozen, published 2025-12-04 |
| `react-aria-components`      | **1.21.1**            | published 2026-09-04                                                                  |
| `react-aria`                 | **3.52.1**            | holds the real `useNumberField` source                                                |
| `react-stately`              | 3.50.0                | holds the real `useNumberFieldState` source                                           |
| `@react-aria/numberfield`    | 3.13.1                | a three-line re-export shim, see below                                                |
| `@react-stately/numberfield` | 3.12.1                | shim                                                                                  |
| `@internationalized/number`  | 3.6.8                 | Adobe's formatter and parser                                                          |
| `radix-ui` (installed here)  | 1.6.7                 | no number field, confirmed                                                            |
| `jsdom` (installed here)     | 30.0.1                |                                                                                       |
| Node (local)                 | 26.8.1, full ICU 78.3 |                                                                                       |

`radix-ui@1.6.7` exports `AccessibleIcon, Accordion, AlertDialog, AspectRatio, Avatar, Checkbox, Collapsible, ContextMenu, Dialog, Direction, DropdownMenu, Form, HoverCard, Label, Menubar, NavigationMenu, Popover, Portal, Progress, RadioGroup, ScrollArea, Select, Separator, Slider, Slot, Switch, Tabs, Toast, Toggle, ToggleGroup, Toolbar, Tooltip, VisuallyHidden`, plus `unstable_OneTimePasswordField` and `unstable_PasswordToggleField`. No number field and no spinbutton, under any prefix. `Slider` and `Progress` are numeric but neither is a text-entry field.

## The finding that reframes the ticket

**Neither library implements `role="spinbutton"`. Both render `<input type="text">` and both deliberately suppress the spinbutton ARIA.** The ticket's first bullet assumes a choice between spinbutton implementations; there is none on offer.

Base UI never sets the attributes. Grepping the whole `number-field` tree in `@base-ui/react@1.8.0` for `spinbutton|aria-valuenow|aria-valuetext|aria-valuemin|aria-valuemax` returns zero hits. The visible input's complete prop object is a literal at `number-field/input/NumberFieldInput.tsx:111-127`:

```
id, required, disabled, readOnly, inputMode,
value: inputValue,
type: 'text',
autoComplete: 'off',
autoCorrect: 'off',
spellCheck: 'false',
'aria-roledescription': 'Number field',
'aria-invalid': !disabled && invalid ? true : undefined,
'aria-labelledby': labelId,
suppressHydrationWarning: true,
```

React Aria goes further: it _computes_ the spinbutton props and then strips them. `useSpinButton` returns `role: 'spinbutton'` with `aria-valuenow`, `aria-valuetext`, `aria-valuemin`, `aria-valuemax` (`react-aria@3.52.1`, `packages/react-aria/src/spinbutton/useSpinButton.ts:242-247`, shipped at `dist/private/spinbutton/useSpinButton.mjs:183-187`). `useNumberField` then merges them to `null`, with the reason in a source comment (`packages/react-aria/src/numberfield/useNumberField.ts:330-346`, shipped at `dist/private/numberfield/useNumberField.mjs:218-223`):

```js
let inputProps = mergeProps(spinButtonProps, focusProps, textFieldProps, {
  // override the spinbutton role, we can't focus a spin button with VO
  role: null,
  // ignore aria-roledescription on iOS so that required state will announce when it is present
  'aria-roledescription': !isIOS()
    ? stringFormatter.format('numberField')
    : null,
  'aria-valuemax': null,
  'aria-valuemin': null,
  'aria-valuenow': null,
  'aria-valuetext': null,
  autoCorrect: 'off',
  spellCheck: 'false',
})
```

Both therefore land on the same accessible object: a **textbox** carrying `aria-roledescription="Number field"`, whose announced value is the formatted text sitting in the field. Both also reject `type="number"`; React Aria's comment is `// Can't use type="number" because then we can't have things like $ in the field.` (`useNumberField.ts:299`).

The two differ in what replaces the spinbutton. React Aria adds an **assertive live-region announcement** on every value change while focused (`useSpinButton.ts:145-155`): it announces `textValue`, or the localized string `"Empty"` when the value is `NaN`, and swaps U+002D hyphen-minus for U+2212 so VoiceOver says "minus". Base UI adds nothing; the value is announced only by the ordinary textbox value-change path.

**Consequence for both: `min` and `max` never reach assistive technology on the visible input.** Both park them on a hidden input instead. Base UI has an open, unresolved accessibility issue for exactly this: [mui/base-ui#4226](https://github.com/mui/base-ui/issues/4226), filed 2026-02-27, labelled `accessibility`, no maintainer response, still open in 1.8.0. Its reporter proposes the spinbutton role and notes that `aria-roledescription` is an untranslated English string.

A hand-roll is the only one of the three where the ARIA is yours to write, and therefore the only one that can expose the spinbutton pattern.

## What the standards say

### The `spinbutton` role

The WAI-ARIA APG spinbutton pattern is at https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/. Its keyboard table is the source the ticket's second bullet is measured against:

| Key        | Required behavior                     |
| ---------- | ------------------------------------- |
| Up Arrow   | increase by one step                  |
| Down Arrow | decrease by one step                  |
| Page Up    | _optional_: increase by a larger step |
| Page Down  | _optional_: decrease by a larger step |
| Home       | set to minimum                        |
| End        | set to maximum                        |

Page Up and Page Down are explicitly optional; Home and End are not. Neither library implements Page Up or Page Down at all, and both make Home and End conditional on the bound being supplied.

The APG also notes "Focus remains on the text field during operation", and warns: "Be sure that JavaScript does not interfere with browser-provided text editing functions by capturing key events for the keys used to perform them."

**The attribute requirements were relaxed in ARIA 1.2, and that matters here.** ARIA 1.1 said "Authors MUST set the `aria-valuenow` attribute" and gave the role a Required States and Properties row listing `aria-valuemax`, `aria-valuemin`, `aria-valuenow`, with an implicit `aria-valuenow` of 0. ARIA 1.2 and 1.3 **removed that required row and the implicit 0**, downgrading to a conditional SHOULD: "Authors SHOULD set the `aria-valuenow` attribute when the spinbutton has a value. Authors SHOULD set the `aria-valuemin` attribute when there is a minimum value, and the `aria-valuemax` attribute when there is a maximum value." All four value attributes are now listed under **Supported**, not Required.

So an empty field may legitimately omit `aria-valuenow`. https://www.w3.org/TR/wai-aria-1.2/#aria-valuenow: "If the current value is not known … the author SHOULD NOT set the `aria-valuenow` attribute. If the `aria-valuenow` attribute is absent, no information is implied about the current value." The same section adds: "For elements with role `slider` and `spinbutton`, assistive technologies SHOULD render the actual value to users."

`aria-valuetext` **replaces** `aria-valuenow` in the announcement: "If `aria-valuetext` is specified, assistive technologies render that instead of the value of `aria-valuenow`."

ARIA 1.2 explicitly blesses the hand-rolled shape: "Alternatively, authors MAY apply the `spinbutton` role to a text input and create sibling buttons to support the increment and decrement functions", and "the increment and decrement button elements are NOT included in the primary navigation ring, e.g., the Tab ring in HTML."

ARIA in HTML (https://www.w3.org/TR/html-aria/) confirms the override. For `input type=text` the implicit role is `textbox` and the allowed roles are "`combobox`, `searchbox` or `spinbutton`". For `input type=number` the implicit role is already `spinbutton` and "No role other than `spinbutton`, which is NOT RECOMMENDED."

### The APG's own example is the hand-rolled shape

The [Quantity Spin Button Example](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/examples/quantity-spinbutton/) is exactly what this ticket calls the hand-roll:

```html
<button type="button" title="Remove adult" aria-controls="adults" tabindex="-1">
  <span aria-hidden="true">&minus;</span>
</button>
<input
  id="adults"
  aria-errormessage="error-adults"
  role="spinbutton"
  type="text"
  size="4"
  inputmode="numeric"
  autocomplete="off"
  spellcheck="false"
  aria-valuemin="1"
  aria-valuemax="8"
  aria-valuenow="1"
  value="1"
/>
<button type="button" title="Add adult" aria-controls="adults" tabindex="-1">
  <span aria-hidden="true">&plus;</span>
</button>
```

Its documented rules, several of which cut against both libraries:

- Buttons sit **outside** the spinbutton element and adjacent to it "so they can be accessed by users of touch-based and voice-based assistive technologies".
- `tabindex="-1"` "Removes the increment and decrement buttons from the page Tab sequence **while keeping them focusable**". Both libraries do this too.
- Accessible names come from `title` on each button, with the glyph wrapped in `aria-hidden`.
- At a bound the button gets **`aria-disabled="true"`, not `disabled`**, so it stays focusable. Base UI and React Aria both use real `disabled` instead.
- Visible min/max help text is "purposefully **not** associated using `aria-describedby` since the same information is already programmatically defined" by `aria-valuemin`/`aria-valuemax`.
- Button presses announce through an `<output>` element (implicit `role="status"`, implicit `aria-live="polite"`), emptied after roughly 1–2 seconds.
- Keyboard: Up, Down, Home, End, and standard text editing keys. **No Page Up or Page Down**, and no `aria-valuetext`.
- Errors use `aria-invalid="true"` plus `aria-errormessage`.

Note the last point against the field family: `field.tsx` wires errors through `aria-describedby`, not `aria-errormessage`.

### Announcing a visible unit

Four mechanisms, and the specs constrain each differently:

- **`aria-valuetext`** — replaces the number outright, so "5 people" is one utterance. But the spec narrows its purpose: "Authors SHOULD only set the `aria-valuetext` attribute **when the rendered value cannot be meaningfully represented as a number**." A count of people is meaningfully a number, so a unit suffix sits outside the stated purpose; the APG uses it only for ordinals and month names. Authors must also keep `aria-valuenow` in sync.
- **`aria-describedby`** — "a label should be concise, where a description is intended to provide more verbose information". **No ARIA or ARIA-AAM text specifies when a description is spoken**, and nothing requires re-announcement when the referenced text changes. Only live regions carry that requirement, so this is static context, not a mechanism for announcing a changing value.
- **`aria-roledescription`** — "Defines a human-readable, author-localized description **for the role**". It replaces the words "spin button", not the value, and cannot carry a unit tied to the number. Both libraries already spend it on "Number field".
- **Unit in the accessible name** — spec-blessed, since the pattern requires a label anyway. Cost: heard once at focus, not on each step.
- **A live region** — the APG example's own answer for button presses, via `<output>`. Not a spec requirement; example guidance.

### `Intl` cannot carry hottrip's units

Verified locally on Node 26.8.1 with full ICU 78.3. `Intl.NumberFormat` with `style: 'unit'` accepts only the ECMA-402 **sanctioned single unit identifiers**, 45 of them:

```
acre, bit, byte, celsius, centimeter, day, degree, fahrenheit, fluid-ounce,
foot, gallon, gigabit, gigabyte, gram, hectare, hour, inch, kilobit, kilobyte,
kilogram, kilometer, liter, megabit, megabyte, meter, microsecond, mile,
mile-scandinavian, milliliter, millimeter, millisecond, minute, month,
nanosecond, ounce, percent, petabyte, pound, second, stone, terabit,
terabyte, week, yard, year
```

`person`, `people`, `night`, `nights`, `trip` all throw `RangeError: Invalid unit argument for Intl.NumberFormat() '<unit>'` — a runtime throw, not a silent fallback.

This matters because hottrip's `number` widget carries an **arbitrary AI-authored `unit` string** (hottrip issue #5 fixes the schema: `kind: "number"` with required `unit`, `min`, `max`, where `min`/`max` are integers and the unit is free text such as "people" or "days of hiking"). Both libraries route every unit through `Intl.NumberFormatOptions`, so **neither can render or announce hottrip's units through its formatter**. Passing one crashes.

There is also **no `Intl` number parser**. `Intl.NumberParser` does not exist (confirmed: `typeof Intl.NumberParser === 'undefined'`); a locale-aware parser has to be built from `Intl.NumberFormat.prototype.formatToParts`, which is exactly what both libraries do. Note also that ES2023 changed `useGrouping`'s resolved default to the string `"auto"`, not `true`.

### `<input type="number">` and why all three candidates avoid it

From https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number).

**Bad input is indistinguishable from empty.** The value sanitization algorithm is "If the value of the element is not a valid floating-point number, then set it to the empty string instead", and separately "While the user interface describes input that the user agent cannot convert to a valid floating-point number, the control is suffering from bad input." So `input.value` returns `''` for garbage the user typed, the raw glyphs live only in the user agent's own UI, and `validity.badInput` is the **only** signal distinguishing "empty" from "typed nonsense". `valueAsNumber` returns `NaN` in both cases.

**The accepted character set is ASCII-only.** A valid floating-point number is an optional `-`, ASCII digits with at most one `.`, and an optional `e`/`E` exponent with its own optional sign. A **leading `+` is not valid** — the parsing rules tolerate it but sanitization tests validity, so `+5` becomes `''`. **A comma is never valid** in the value or in submission.

**Locale display is explicitly unspecified.** The spec separates display from submission: "a user agent designed for the French market might display the value with apostrophes between thousands and commas before the decimals, and allow the user to enter a value in that manner, internally converting it to the submission format". Whether Chrome or Firefox actually accept a comma decimal in de-DE is therefore a user agent decision the spec declines to make. `value` and the submitted string are always ASCII with `.`.

**Step base precedence** is `min`, then the initial `value` content attribute, then a type default, then zero. `stepMismatch` fires when the value minus the step base is not an integral multiple of the step. `stepUp(n)` **throws `InvalidStateError` when `step="any"`**, and when the current value is off-grid it snaps to the nearest on-grid value in the travel direction and ignores `n` for that call. Its clamping is to "the smallest value that … is an integral multiple of the allowed value step, and that is more than or equal to that minimum" — the nearest **on-step** value inside the bound, not the bound itself.

**`maxlength`, `minlength` and `pattern` do not apply**, and neither do `selectionStart`, `selectionEnd`, `selectionDirection`, `setRangeText()` or `setSelectionRange()`. `select()` does apply. So caret management is impossible on a native number input — verified locally: `selectionStart` returns `null`.

**The accessibility mapping is conditional.** HTML-AAM (https://www.w3.org/TR/html-aam-1.0/) maps `input type=number` to `spinbutton`, but for MSAA/IAccessible2 and ATK/AT-SPI it says "If implemented as a spin button, use WAI-ARIA mapping for `spinbutton`. If implemented as a text input, use WAI-ARIA mapping for `textbox`." Only UIA and AX map unconditionally. A user agent that renders no spinner exposes a textbox on Windows and Linux.

**Hiding the native spinner is unspecified.** `::-webkit-inner-spin-button` is non-standard; MDN's banner says "This feature is not standardized… we do not recommend using non-standard features in production". `appearance: textfield` **is** a standard keyword but sits in the `<compat-special>` group, and CSS UI 4 says those values "all have the same effect as `auto`", carving out only `type=search`. MDN: "Depending on the browser, the spinner may be visually removed… The `appearance` property has no effect on the functionality: while there may no longer be a spinner to click on, the up and down cursor keys will still increment and decrement the value." Blink meters `appearance` with use-counters but does not deprecate it and emits no console warning.

MDN's own guidance is blunt: "With `<input type="number">`, there is a risk of users accidentally incrementing a number when they're trying to do something else. Additionally, if users try to enter something that's not a number, there's no explicit feedback about what they're doing wrong", and it recommends `inputmode="numeric"` with a `pattern` instead when the spinner is not wanted.

### The wheel behavior is a browser bug, and React makes it unblockable

**It is not in any specification.** The WHATWG issue asking for it to be specified, [whatwg/html#10911](https://github.com/whatwg/html/issues/10911), was opened 2025-01-13 by Mozilla and **closed WONTFIX on 2026-08-24**: "Now that this has been removed from WebKit and didn't yield any complaints I'm closing this as WONTFIX."

Its origin, per Mozilla in that thread: "this was a bug in Chromium and WebKit which they both inadvertently introduced as part of hardware-accelerated scrolling (where they were using which-areas-of-the-page-have-wheel-listeners as a switch for whether wheel events would have any effect at all)."

Current state per engine:

- **WebKit removed it.** [WebKit/WebKit#39382](https://github.com/WebKit/WebKit/pull/39382), merged 2025-01-23: "This behavior does not match Apple platform behavior and is confusing to end users. Web developers also frequently seek to disable it or inadvertently enable it." Shipped in **Safari 18.4**.
- **Firefox never ships it** — implemented, then disabled, because "we realized it might be a footgun as users might accidentally submitted a form with the wrong amount".
- **Chromium still has it in `main`.** `TextFieldInputType::ShouldSpinButtonRespondToWheelEvents()` returns true when the element is focused, and `UpdateWheelEventRegistration` now registers Blink's own handler as `kWheelEventBlocking`, so the old accidental author-listener opt-in no longer gates it.

**React's `onWheel` cannot block it.** Verified in `packages/react-dom-bindings/src/events/DOMPluginEventSystem.js`, React attaches `touchstart`, `touchmove` and `wheel` as **passive** at the root, with the comment "Browsers introduced an intervention, making these events passive by default on document. React doesn't bind them to document anymore, but changing this now would undo the performance wins from the change." So `event.preventDefault()` inside `onWheel` is a no-op in every React app. [facebook/react#32156](https://github.com/facebook/react/issues/32156) reported this in 2025 and was closed by the stale bot in June 2025 with no fix.

The only working blocks are a manually attached `addEventListener('wheel', handler, { passive: false })` in an effect — which is exactly what both Base UI and React Aria do, each with a source comment saying why — or calling `blur()` from a passive listener.

### `inputmode` and mobile keyboards

Spec definitions (https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute): `numeric` is "capable of numeric input. This keyword is useful for PIN entry"; `decimal` is "capable of fractional numeric input. Numeric keys and the format separator for the locale should be shown". When unspecified, "Contextual information such as the `input` `type` or `pattern` attributes should be used" — the hook the `pattern="[0-9]*"` hack hangs on.

**iOS**, from WebKit `main`, `Source/WebKit/UIProcess/ios/WKContentViewInteraction.mm`:

| Markup                            | UIKit keyboard                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `type="number"`, no `inputmode`   | `UIKeyboardTypeNumbersAndPunctuation` — the **full symbols keyboard**, not a keypad |
| `inputmode="numeric"`             | `UIKeyboardTypeNumberPad` — digits only                                             |
| `inputmode="decimal"`             | `UIKeyboardTypeDecimalPad` — digits plus a decimal point                            |
| `type="tel"` or `inputmode="tel"` | `UIKeyboardTypePhonePad`                                                            |

That first row is the reason `inputmode` is worth setting even on a native number input. Apple's own documentation for `numberPad` ("prominently features the numbers 0 through 9") and `decimalPad` ("numbers and a decimal point") **documents no minus key** for either, and MDN says only "Devices may or may not show a minus key". This is what both libraries' iOS branches are working around.

**`pattern="[0-9]*"` is inert whenever `inputmode` is set.** WebKit `main` still special-cases the exact literal strings `\d*` and `[0-9]*` in `WebPage.cpp`, mapping them to `InputType::NumberPad`, but that `elementType` is only consulted in the `InputMode::None`/`Unspecified` branch. `inputmode` shipped in Safari iOS 12.2, so the hack is a fallback path for pages that set no `inputmode`, not a current requirement. Note it matches only those two literal strings — an equivalent regex does not trigger it.

**Android**, from Chromium `main`, `content/.../input/ImeUtils.java`:

| Markup                          | Android `EditorInfo.inputType`                  |
| ------------------------------- | ----------------------------------------------- |
| `type="number"`, no `inputmode` | `TYPE_CLASS_NUMBER \| TYPE_NUMBER_FLAG_DECIMAL` |
| `inputmode="numeric"`           | `TYPE_CLASS_NUMBER` alone                       |
| `inputmode="decimal"`           | `TYPE_CLASS_NUMBER \| TYPE_NUMBER_FLAG_DECIMAL` |
| `inputmode="tel"`               | `TYPE_CLASS_PHONE`                              |

**`TYPE_NUMBER_FLAG_SIGNED` appears nowhere in that file** — Chromium never asks Android for a signed keypad, so no minus key is requested for either mode. Chromium reads no `pattern` in this path; the `[0-9]*` hack has never applied to Android.

`enterkeyhint` takes `enter`, `done`, `go`, `next`, `previous`, `search`, `send`. Supported from Chrome 77, Firefox 94, Safari 13.1.

### Form posting

The form data set algorithm (https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-the-form-data-set) skips any field whose `name` is absent or empty, and otherwise creates "an entry with _name_ and the value of the _field_ element" — **the `value` string verbatim**, with no numeric coercion and no locale normalization.

So a controlled React input displaying `new Intl.NumberFormat('de-DE').format(1234.5)` posts the literal string `"1.234,5"`. `Number("1.234,5")` is `NaN`, and naive en-US server parsing yields `1.234`. That is a silent wrong-value hazard, not a parse error — and it is precisely why all three candidates separate display from submission. React 19's `<form action={fn}>` receives the same `FormData` built by the same algorithm, so it changes nothing.

The standard fix is two elements: a visible **unnamed** input carrying the formatted text, plus a sibling hidden input carrying `name` and the raw ASCII value. Both libraries ship exactly this, differing only in whether the hidden input is `type="number"` (Base UI, so native validation participates) or `type="hidden"` (React Aria, so it does not).

`0.1 + 0.2 === 0.30000000000000004` locally, which is why every candidate carries its own float-correction step.

## Base UI `NumberField` — `@base-ui/react@1.8.0`

### Package identity

The package was renamed at 1.0.0. `@base-ui-components/react` is deprecated on npm with the message "Package was renamed to @base-ui/react" and is frozen at `1.0.0-rc.0`. Anything written against the old name describes a dead package; the docs at https://base-ui.com/react/components/number-field describe 1.8.0 and list props (`allowOutOfRange`, `form`) that the old rc does not have.

Base UI is a stable 1.x with roughly monthly minors: 1.0.0 (2025-12-11), 1.1.0, 1.2.0 (2026-02-12), 1.3.0, 1.4.0, 1.4.1, 1.5.0, 1.6.0, 1.7.0 (2026-08-04), 1.8.0 (2026-09-04).

### Anatomy

Seven parts, from `number-field/index.parts.ts:1-7`:

| Part                          | Default DOM                                 |
| ----------------------------- | ------------------------------------------- |
| `NumberField.Root`            | `<div>`, plus the hidden input as a sibling |
| `NumberField.Group`           | `<div role="group">`                        |
| `NumberField.Input`           | `<input type="text">`                       |
| `NumberField.Increment`       | `<button>`                                  |
| `NumberField.Decrement`       | `<button>`                                  |
| `NumberField.ScrubArea`       | `<span role="presentation">`                |
| `NumberField.ScrubAreaCursor` | `<span role="presentation">`                |

Element substitution is the **`render`** prop, not `asChild` — Base UI has no `asChild`. It takes a `ReactElement` or `(props, state) => ReactElement`; `className` and `style` also accept function forms receiving `state`. `ScrubArea` and `ScrubAreaCursor` are fully optional.

### ARIA

Covered above. The stepper buttons get, from `root/useNumberFieldStepperButton.ts:120-129`:

```
disabled,
'aria-label': isIncrement ? 'Increase' : 'Decrease',
'aria-controls': id,
tabIndex: -1,
style: SELECT_NONE_STYLE,
```

The labels are hardcoded English, overridable by passing your own `aria-label`. `tabIndex: -1` carries a source comment explaining that keyboard users step with the input's arrow keys, and that `aria-hidden` is deliberately withheld so touch screen readers can still reach the buttons. The buttons are natively `disabled` at their bound.

### Keyboard

| Key                 | Behavior                                  |
| ------------------- | ----------------------------------------- |
| Arrow Up / Down     | ±`step`, default `1`                      |
| Shift + Arrow       | ±`largeStep`, default `10`                |
| Alt/Option + Arrow  | ±`smallStep`, default `0.1`               |
| Home                | value to `min`, **only if `min != null`** |
| End                 | value to `max`, **only if `max != null`** |
| Page Up / Page Down | **not handled**                           |

Page Up and Page Down carry an explicit source comment at `input/NumberFieldInput.tsx:358`: "Let the browser handle multi-character keys we don't act on (PageUp, Insert, F-keys, …)".

Modifier resolution checks `altKey` before `shiftKey`, so Alt wins when both are held (`root/NumberFieldRoot.tsx:203-211`). The rc's JSDoc said "meta key" while the code checked `altKey`; 1.8.0 corrected the doc.

Auto-repeat applies to **pointer press-and-hold on the buttons only**, not to held arrow keys, which rely on native key repeat. Constants in `number-field/utils/constants.ts`: one immediate tick, then `START_AUTO_CHANGE_DELAY = 400`ms, then `CHANGE_VALUE_TICK_DELAY = 60`ms. Not configurable; open enhancement [#2102](https://github.com/mui/base-ui/issues/2102).

### Wheel and scrub

Wheel is **opt-in and off by default**: `allowWheelScrub`, default `false`. It registers a native non-passive `wheel` listener (React's synthetic `onWheel` cannot be `preventDefault`ed), requires the input to be the active element, and bails on `ctrlKey` to preserve pinch-zoom. 1.8.0 also ignores horizontal wheel events.

`ScrubArea` is a click-and-drag surface using the **Pointer Lock API** on `document.body`, skipped on touch and on WebKit to avoid layout shifts, with a virtual cursor that teleports across viewport edges. Omitting it costs nothing.

### Value model

- Controlled `value` is **`number | null`**, not a string. **Empty is `null`** — never `''`, never `NaN`.
- `onValueChange(value, eventDetails)` takes two arguments. `eventDetails` carries `.reason`, `.event`, `.isCanceled`, and a `.cancel()` method, so **a change is cancelable**. Reasons: `input-change`, `input-clear`, `input-blur`, `input-paste`, `keyboard`, `increment-press`, `decrement-press`, `wheel`, `scrub`, `none`.
- A separate `onValueCommitted(value, eventDetails)` fires on blur after typing and on pointer release after scrub or button press.
- **Clamping** runs on every change through `toValidatedNumber`, except that 1.8.0's `allowOutOfRange` (added 1.2.0, default `false`) lets direct text entry escape clamping so native range validation can fire; arrows, buttons, wheel and scrub still clamp.
- **Step snapping is opt-in**: `snapOnStep`, default `false`. The anchor is `min` when a real `min` is given, otherwise `0`. Non-alt stepping snaps directionally (floor or ceil in the direction of travel); alt/`smallStep` snaps to nearest. With snapping off the value still passes through `removeFloatingPointErrors`.
- **Unparseable text leaves the display and the value divergent.** `onKeyDown` blocks disallowed characters, but text arriving by paste, drop, IME or autofill can pass the allowlist and still fail `parseNumber`, in which case the display updates and the value does not. On blur, a `null` parse causes an early return, so the stale text is never normalized. This is live bug [mui/base-ui#5424](https://github.com/mui/base-ui/issues/5424), filed 2026-08-06, labelled `type: bug`, open: `parseNumber('1.2.3')` returns `12.3`, so the input can show one number while the form posts another.

### Formatting and locale

`Intl.NumberFormat` behind a module-level cache. `format?: Intl.NumberFormatOptions` passes straight through — **there is no function formatter, no `renderValue`, no `parseValue`.**

**Formatting cannot be switched off, only ungrouped.** With `format` undefined the value still goes through `Intl.NumberFormat(locale, undefined)`, so `1234` renders `1,234` in en-US. `format={{ useGrouping: false }}` yields a bare number. There is no "off".

Locale comes from an optional `locale?: Intl.LocalesArgument` prop; omitted, `Intl` falls back to the runtime default. **There is no locale provider.** Root and Input both set `suppressHydrationWarning` because a server/client locale mismatch is knowingly tolerated — meaning first paint can show a differently formatted number than hydration, silently, unless you pass `locale` explicitly.

Parsing is thorough: group and decimal marks derived from `formatToParts`, bidi control characters stripped, Unicode minus and plus variants normalized, trailing accounting signs handled (`5-` → `-5`), and Arabic-Indic, Persian, Han and fullwidth numerals converted to ASCII.

`style: 'percent'` divides typed input by 100, so the underlying value is the fraction (`'12%'` → `0.12`); `style: 'unit', unit: 'percent'` does not divide (`'12%'` → `12`). `style: 'currency'` strips the symbol and keeps the plain number. `notation: 'compact'` is not round-trippable and its suffixes are excluded from the typeable set by design.

### Form posting

A hidden native input, rendered by Root as a sibling (`root/NumberFieldRoot.tsx:516-534`):

```jsx
<input
  {...validation.getInputValidationProps({
    onChange(event) {
      /* autofill */
    },
  })}
  ref={hiddenInputRef}
  type="number"
  form={form}
  name={name}
  value={value ?? ''}
  min={min}
  max={max}
  step={stepProp}
  disabled={disabled}
  readOnly={readOnly}
  required={required}
  aria-hidden
  tabIndex={-1}
  style={name ? visuallyHiddenInput : visuallyHidden}
  suppressHydrationWarning
/>
```

- Type is **`number`**, not `hidden`, chosen so native constraint validation participates (`rangeUnderflow`, `rangeOverflow`, `stepMismatch`, `valueMissing`). Changelog rc.0: "Ensure hidden input participates in form validation (#3374)".
- It posts the **raw number**, never the formatted string. Changelog beta.0: "Exclude number formatting from form value (#1957)".
- **Empty posts the empty string.**
- **`name` is on the hidden input only**; the visible input never receives it.
- Its `onChange` reads `event.currentTarget.valueAsNumber` to absorb browser autofill, mapping `NaN` to `null`.

### Mobile

`inputMode` is state on Root initialized to `'numeric'`, with one iOS-only branch (`root/NumberFieldRoot.tsx:321-336`):

```ts
function setDynamicInputModeForIOS() {
  if (!isIOS) {
    return
  }
  let computedInputMode = 'text'
  if (minWithDefault >= 0) {
    computedInputMode = 'decimal'
  }
  setInputMode(computedInputMode)
}
```

`minWithDefault` is `min ?? Number.MIN_SAFE_INTEGER`, so **an iOS field with no `min` prop gets `inputMode="text"`** — a full alphabetic keyboard. The comments give the reason: the iOS numeric keypad has no minus key, and its `'numeric'` mode has no decimal key.

| Platform        | no `min` (or `min < 0`) | `min >= 0` |
| --------------- | ----------------------- | ---------- |
| iOS             | `text`                  | `decimal`  |
| everything else | `numeric`               | `numeric`  |

It is **not** conditional on `step` or `format`, so a `step={0.1}` field on Android gets `inputMode="numeric"`, which surfaces no decimal key. There is **no `pattern` attribute**. `autoComplete` is hardcoded `'off'`, spread before `elementProps` so a caller can override it.

### Fit

- **React 19: yes.** Peers `react: "^17 || ^18 || ^19"`, `react-dom` the same, `@types/react` optional. `date-fns` and `@date-fns/tz` are peers but marked `optional: true` in `peerDependenciesMeta` and exist for the date components.
- `dependencies`: `@babel/runtime`, `@floating-ui/react-dom`, `@floating-ui/utils`, `use-sync-external-store`, `@base-ui/utils@0.4.0`. The last is a regular dependency, auto-installed.
- **One package, 80 subpath exports.** You cannot install only number-field, but you can import only it: `@base-ui/react/number-field` resolves to a dedicated dual ESM/CJS entry.
- **Bundle, measured** with esbuild, minified, React external, entry `export { NumberField } from '@base-ui/react/number-field'`: **33,348 B minified, 13,412 B gzipped.** The package unpacks to ~9.6 MB but `sideEffects: false` plus per-subpath entries mean none of it comes along — the output contains zero occurrences of `computePosition`, `autoUpdate`, `tabbable` or `date-fns`.
- Ships **`'use client'`** on every client component in both builds.
- Cross-module coupling inside Base UI: `internals/field-root-context`, `field/useField`, `internals/form-context`, `internals/labelable-provider`, `use-button`, `internals/useRenderElement`, `utils/formatNumber`, `utils/clamp`, and a three-line `stopEvent` helper from the vendored `floating-ui-react/utils` — not the positioning engine.

### `Field.Root` is optional

`NumberFieldRoot` calls `useFieldRootContext()` with the default `optional = true`, so standalone it reads a no-op stub. Nothing throws and nothing warns.

Standalone you lose: the six field-derived data attributes (`data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled`, `data-focused`), and `aria-labelledby` on the input, which resolves to `undefined` because `labelId` comes from a context only `Field.Label` populates.

You keep: the `id` prop lands on the **visible** input, so your own `<label htmlFor>` associates correctly and native accessible-name computation takes over; and `name`/`required`/`disabled`/`min`/`max`/`step` still reach the hidden input, so submission and native validation are unaffected. You must pass `aria-invalid` yourself, since without `Field.Root` the internal `invalid` is always false.

### Styling hooks

Every part exposes the same ten attributes: `data-disabled`, `data-readonly`, `data-required`, `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled`, `data-focused`, `data-scrubbing`. Six of them are documented "(when wrapped in `Field.Root`)"; standalone only `disabled`, `readonly`, `required` and `scrubbing` are reliable. `value` and `inputValue` are deliberately mapped to `null` in `utils/stateAttributesMapping.ts` so raw numbers do not leak into the DOM, but both remain available through the function forms of `className`, `style` and `render`.

Built-in inline styles: the visible input has **none**. The buttons carry `user-select: none`, `ScrubArea` carries `touch-action: none`, the cursor is positioned by transform, and the hidden input carries the visually-hidden object. No colors, borders or sizing anywhere.

### Arbitrary units

**Base UI offers nothing.** The parts list is closed at seven — no `Prefix`, `Suffix`, `Adornment` or `Unit`. `format` is typed `Intl.NumberFormatOptions` and passed unmodified. There is no `unit` prop.

The only mechanism is a sibling element you render yourself inside `NumberField.Group`, which renders arbitrary children. **That is visual only**: there is no `aria-valuetext` to inject it into, and the announced value is the `Intl`-formatted string, which an arbitrary unit cannot enter. Reaching a screen reader means hand-wiring `aria-describedby`, folding the unit into the label, or running your own live region — reimplementing `aria-valuetext` by hand.

One further wrinkle: the input's typeable-character allowlist is derived from what the _formatter_ emits (`getAllowedNonNumericKeys`), so a hand-rendered suffix is invisible to that logic and its characters are blocked from the input. Usually desirable, but it means the value text and the adjacent unit are two unrelated things that can drift apart under RTL or wrapping.

### Open issues

Nine total. Two describe live defects: **#5424** (display and posted value diverge, above) and **#4226** (min/max invisible to assistive technology, above). The rest are enhancements: #3350 format-as-you-type, #3730 `onEdgeReached`, #2710 don't focus input on button click, #2102 configurable repeat delay, #1814 export the stepper button hook, #2152 equation evaluation, #414 scientific notation.

No NumberField breaking changes across 1.0 → 1.8; every changelog entry for the component in that range is a bug fix except `allowOutOfRange`, which is additive.

## React Aria `NumberField` — `react-aria@3.52.1` / `react-aria-components@1.21.1`

### The granular packages no longer exist

`@react-aria/numberfield@3.13.1` ships `src/`, and `src/index.ts` is three lines:

```ts
export { useNumberField } from 'react-aria/useNumberField'
```

Its entire `dependencies` block is `{"@swc/helpers": "^0.5.0", "react-aria": "^3.48.0"}`. The same holds for `@react-stately/numberfield`, `@react-aria/spinbutton` and `@react-stately/utils`. This landed in "feat: Consolidate packages to improve tree shaking and reduce dependencies (#9774)", 2026-03-20, published as `@react-aria/numberfield@3.13.0`. For contrast, `3.12.0` had eleven real dependencies.

Measured installs: `@react-aria/numberfield` + `@react-stately/numberfield` pulls **58 MB** of `node_modules`; `react-aria-components` pulls **68 MB**. **There is no longer a "granular is lighter" option.**

### Anatomy

| Part                        | Element                                       | Context                          |
| --------------------------- | --------------------------------------------- | -------------------------------- |
| `<NumberField>`             | `div`, default class `react-aria-NumberField` | root                             |
| `<Label>`                   | `label`                                       | `LabelContext`                   |
| `<Group>`                   | `div role="group"`                            | `GroupContext`                   |
| `<Input>`                   | `input type="text"`                           | `InputContext`                   |
| `<Button slot="increment">` | `button`                                      | `ButtonContext` slot `increment` |
| `<Button slot="decrement">` | `button`                                      | `ButtonContext` slot `decrement` |
| `<Text slot="description">` | `div`/`span`                                  | `TextContext`                    |
| `<FieldError>`              |                                               | `FieldErrorContext`              |

The hooks path (`useNumberFieldState` + `useNumberField`) requires you to supply `useLocale()` for the required `locale` option, call `useButton()` on both button prop bags (they are `AriaButtonProps`, not DOM props), render every element including the hidden input, add all data attributes, and add `'use client'`.

### ARIA

Covered above. Stepper labels default to `"Increase {fieldLabel}"` / `"Decrease {fieldLabel}"` from a **34-locale** message bundle at `packages/react-aria/intl/numberfield/*.json`; `en-US.json` is `{"decrease": "Decrease {fieldLabel}", "increase": "Increase {fieldLabel}", "numberField": "Number field"}`. The JSDoc on `incrementAriaLabel`/`decrementAriaLabel` says "Increment"/"Decrement" and is wrong; the code uses the `increase`/`decrease` keys.

Buttons are `excludeFromTabOrder: true, preventFocusOnPress: true, allowFocusWhenDisabled: true`, which resolves to `tabIndex = -1`. They are **not** `aria-hidden`. Both carry `aria-controls={inputId}`. The group gets `role="group"` with `aria-disabled` and `aria-invalid`.

A `formatOptions` unit reaches the **live-region announcement** but not `aria-valuetext`, which is nulled. `@internationalized/number` carries a Safari polyfill limited to `degree` narrow; any other unit on a browser without native `Intl` unit support throws `Unsupported unit ${unit} with unitDisplay = ${unitDisplay}`. All evergreen browsers support units natively.

### Keyboard

From `useSpinButton.ts:75-130`:

| Key                 | Action                                                  |
| ------------------- | ------------------------------------------------------- |
| Arrow Up / Down     | `increment()` / `decrement()`                           |
| Page Up / Page Down | `onIncrementPage` if provided, **else plain increment** |
| Home                | `decrementToMin`                                        |
| End                 | `incrementToMax`                                        |

**There is no large step.** `useNumberField.ts:168-180` never passes `onIncrementPage`/`onDecrementPage`, so Page Up and Page Down move exactly one `step`. There is no multiplier prop.

Home and End act only if the bound exists. Note an asymmetry: `incrementToMax` snaps `maxValue` to the step, `decrementToMin` does not snap `minValue`.

**Enter commits without preventing default**, so an Enter inside a form still submits:

```ts
shortcuts: {
  Enter: () => {
    flushSync(() => {
      commit()
    })
    commitValidation()
    return { shouldPreventDefault: false }
  }
}
```

**Escape does nothing.** No handler exists in `useNumberField`, `useSpinButton`, `useTextField` or `useFormattedTextField`, and `<input type="text">` has no native revert. Typed-but-uncommitted text survives Escape.

Auto-repeat (`useSpinButton.ts:165-239`): mouse press steps immediately then waits **400ms**; touch press does not step immediately and waits **600ms**; both then repeat every **60ms**, guarded against passing the bound. A touch that slid off is treated as a scroll, not a tap. Keyboard repeat is native.

### Wheel

```ts
let onWheel = useCallback(
  (e) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
      return
    }
    if (e.deltaY > 0) {
      increment()
    } else if (e.deltaY < 0) {
      decrement()
    }
  },
  [decrement, increment],
)
let scrollingDisabled =
  isWheelDisabled || isDisabled || isReadOnly || !focusWithin
```

- **On by default**, requiring focus within the field (input or a stepper button). Hover alone does nothing. Disabled by the **`isWheelDisabled`** prop.
- A diagonal guard ignores the event when |ΔX| ≥ |ΔY|.
- `deltaY > 0` **increments** — inverted relative to most native `type="number"` implementations.
- `useScrollWheel` registers non-passively and calls `preventDefault()` and `stopPropagation()` **unconditionally** whenever attached and `ctrlKey` is false. So while the field has focus-within, **the page cannot be wheel-scrolled over the input**, including the diagonal events the handler then ignores. Ctrl+wheel zoom is let through.

### Value model

- `value` is a **`number`**. **Empty is `NaN`.** `defaultValue = NaN`; `null` is coerced to `NaN`; clearing the field fires `onChange(NaN)`.
- That is consequential for a caller: `NaN !== NaN`, so equality checks, `JSON.stringify` and a Zod `z.number()` all need explicit handling. Open issue [#6971 "Use `null` instead of `Number.NaN`"](https://github.com/adobe/react-spectrum/issues/6971), open since 2024-08-28.
- Two states: `inputValue: string` and `numberValue`, but the `numberValue` returned to consumers is **`parsedValue`, derived from `inputValue`**, so it tracks live typing rather than the last commit.
- `commit()` is called from blur, Enter, and full-selection paste.
- **Clamping** happens in `commit` only when `commitBehavior === 'snap'`, which is the default. Under `commitBehavior: 'validate'` nothing is clamped; instead a detached `document.createElement('input')` with `type='number'` and the min/max/step is read for browser-native `rangeOverflow`/`rangeUnderflow`/`stepMismatch` messages. `commitBehavior` arrived in `react-aria@3.48.0` (PR #9679, merged 2026-03-17).
- **Step anchor is `minValue` when present, else 0.** `clampStep` is `step` if given, else `1`, except `style: 'percent'` with no step, which gives **`0.01`**.
- `increment`/`decrement` are not naive `+= step`: `safeNextStep` snaps first and stops there if snapping already moved the value in the travel direction. From empty, increment starts at `minValue` and decrement at `maxValue`, falling back to `0`.
- **Unparseable text at blur reverts** to the formatted previous value. Empty text becomes `NaN` with an empty input. No error is raised.
- The committed number is round-tripped through the formatter (`numberParser.parse(format(clampedValue))`), so `maximumFractionDigits` silently truncates precision.

`snapValueToStep` (`react-stately/src/utils/number.ts:43-73`) rounds half-away-from-zero. Its overflow branch **floors to the last valid step boundary**, so `max` is only reachable if it sits on a step. Float safety comes from `roundToStepPrecision`, which derives precision from `step.toString()`, applied twice; separately `handleDecimalOperation` scales both operands to integers before adding, so `0.1 + 0.2` gives `0.3`.

### Formatting and locale

`formatOptions?: Intl.NumberFormatOptions`, documented as "This also affects what characters are allowed to be typed by the user". Compared shallowly by key and value across renders, so an inline object literal does not thrash.

`NumberParser` accepts, per locale, grouping separators, the locale decimal mark, the locale minus sign, and literals such as currency symbols and unit words. **Non-Latin numerals are supported**: `NUMBERING_SYSTEMS = ['latn', 'arab', 'hanidec', 'deva', 'beng', 'fullwide']`, tried in turn until one accepts the string. The output is then re-formatted in the **detected** system, so typing an Arabic-Indic digit into an en-US field makes the field render Arabic-Indic. Locale-specific fixups exist for `arab` (comma and U+060C as decimal), Swiss apostrophes, and `fr-FR` plain space or NBSP for the U+202F group separator.

**Turning grouping off changes what the parser accepts:**

```ts
let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping
if (
  !isGroupSymbolAllowed &&
  this.symbols.group &&
  fullySanitizedValue.includes(this.symbols.group)
) {
  return NaN
}
```

So with `formatOptions={{useGrouping: false}}` a user pasting `1,000` gets `NaN`, and blur reverts to the previous value. The same gate rejects the comma as they type it.

Locale comes from `useLocale()` in the RAC path. **`I18nProvider` is not required** — `useLocale` falls back to the browser locale. The hooks path has no default and requires you to pass `locale` yourself.

`style: 'percent'` divides by 100, done as string surgery rather than arithmetic with the source comment "javascript is bad at dividing by 100 and maintaining the same significant figures". It also flips `clampStep` to `0.01`. `currencySign: 'accounting'` parentheses are re-negated on parse, and a separate formatter with `currencySign: undefined` builds the screen-reader text so accounting parentheses announce as a minus.

### Form posting

RAC renders a hidden input, **only when `name` is set** (`react-aria-components/src/NumberField.tsx:193-201`):

```jsx
{
  props.name && (
    <input
      type="hidden"
      name={props.name}
      form={props.form}
      value={isNaN(state.numberValue) ? '' : state.numberValue}
      disabled={props.isDisabled || undefined}
    />
  )
}
```

- Type is **`hidden`** — the opposite of Base UI's choice, so it does not participate in native constraint validation.
- Posts the **raw number**; empty posts `""`. Because `state.numberValue` is `parsedValue`, it tracks live typing rather than the last commit.
- Disabled fields are omitted from submission by the browser.
- The **hooks path produces no hidden input at all**: `useNumberField.ts:283-285` explicitly sets `name: undefined, form: undefined` on the visible input. On that path form posting is entirely yours.
- **Form reset is handled**: `useFormReset(inputRef, state.defaultNumberValue, state.setNumberValue)`. To stop browser reset clobbering the text, the visible input is given a deliberately unparseable `defaultValue: '!'`, with the comment "an invalid value so that form reset is ignored in onChange above".

`validationBehavior` defaults to **`'native'`** in RAC 1.x, with precedence prop → `<Form validationBehavior>` → `'native'`. Under `'native'` the element gets `required` and `aria-required` is dropped, and `setCustomValidity` blocks submission. Caveat: the native-validation path returns early unless `commitBehavior === 'validate'`, and `commitBehavior` defaults to `'snap'` — so **with defaults, min/max/step are enforced by clamping on blur, not by constraint validation.**

### Mobile

Exact source, `useNumberField.ts:206-230`:

```ts
let hasDecimals = (intlOptions.maximumFractionDigits ?? 0) > 0
let hasNegative =
  state.minValue === undefined || isNaN(state.minValue) || state.minValue < 0
let inputMode = 'numeric'
if (isIPhone()) {
  if (hasNegative) {
    inputMode = 'text'
  } else if (hasDecimals) {
    inputMode = 'decimal'
  }
} else if (isAndroid()) {
  if (hasNegative) {
    inputMode = 'numeric'
  } else if (hasDecimals) {
    inputMode = 'decimal'
  }
}
```

`hasNegative` is true **by default** — no `minValue` means negatives are allowed.

| Platform             | no `minValue` (or `min < 0`) | `min >= 0`, fraction digits > 0 | `min >= 0`, integers |
| -------------------- | ---------------------------- | ------------------------------- | -------------------- |
| iPhone               | `text`                       | `decimal`                       | `numeric`            |
| iPad, desktop, other | `numeric`                    | `numeric`                       | `numeric`            |
| Android              | `numeric`                    | `decimal`                       | `numeric`            |

Per the source comments: iPhone has no minus sign in either numeric mode, hence the QWERTY fallback; iPad always has both minus and decimal in `numeric`; Android `numeric` has both, Android `decimal` has no minus. `hasDecimals` follows `formatOptions`, so `style: 'currency', currency: 'USD'` resolves to two fraction digits and yields `decimal` on iPhone with `minValue: 0`.

`type: 'text'`, `autoComplete: 'off'` hardcoded and set after the caller's props (so not overridable), `autoCorrect: 'off'`, `spellCheck: 'false'`. **No `pattern`** and **no `enterKeyHint`** — `AriaNumberFieldProps` does not extend `TextInputDOMProps`, so neither is a typed prop. RAC adds only `{name, form}`. `placeholder` is `Omit`ted by RAC.

Related open issue: [#5731 "NumberField opens numeric keyboard with , instead of . on some iPhone regions"](https://github.com/adobe/react-spectrum/issues/5731), 2024-01-22.

### Fit

- **React 19: yes.** Every package in the chain declares `react: "^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1"`, which `^19.0.0-rc.1` satisfies for 19.x stable. React 19 RC compatibility arrived in `react-aria-components@1.3.0`, 2024-07-22.
- **Bundle, measured** with esbuild, minified, React external:

| Entry                                                | Minified | Gzipped  |
| ---------------------------------------------------- | -------- | -------- |
| `react-aria-components/NumberField` (7 parts)        | 81,359 B | 27,084 B |
| `react-aria-components` barrel, same 7 named imports | 81,359 B | 26,901 B |
| Hooks only, nothing rendered                         | 57,860 B | 19,524 B |

The barrel and the subpath tree-shake identically under esbuild. RAC's ~23 KB premium over the bare hooks buys every part plus the hidden input, render props and data attributes.

- **`'use client'`: no.** Zero files in the RAC 1.21.1 tarball carry the directive. Each export entry instead does `import 'client-only'`, with the comment "Mark as a client only package. This will cause a build time error if you try to import it from a React Server Component". **A registry wrapper must add its own `'use client'`**; RAC will not create the boundary, only fail the build if you forget.
- `sideEffects` is `["*.css"]` for RAC, but **no `.css` file exists anywhere in the tarball**.
- Unpacked: `react-aria` 15.6 MB, `react-aria-components` 6.6 MB, `react-stately` 5.9 MB. The four shim packages are ~18 KB each and that number is meaningless, since each pulls the monolith.

### Styling

`className` and `style` accept render-prop functions receiving `{isDisabled, isInvalid, isReadOnly, isRequired, state, defaultClassName}`. Data attributes actually emitted:

| Part          | Attributes                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| `NumberField` | `data-disabled`, `data-readonly`, `data-required`, `data-invalid`                                           |
| `Group`       | `data-focus-within`, `data-hovered`, `data-focus-visible`, `data-disabled`, `data-invalid`, `data-readonly` |
| `Input`       | `data-focused`, `data-disabled`, `data-hovered`, `data-focus-visible`, `data-invalid`                       |
| `Button`      | `data-disabled`, `data-pressed`, `data-hovered`, `data-focused`, `data-pending`, `data-focus-visible`       |

All are `x || undefined`, so absent rather than `="false"`. `Group` has no `data-focused` (it uses `data-focus-within`) and `Input` has no `data-pressed`. **`Group` is where an invalid or focus ring belongs**, since it wraps the input and both buttons.

**Default CSS: none.** RAC ships zero stylesheets. The only default is a class name string (`react-aria-NumberField`, `react-aria-Group`, …) applied when `className` is absent; passing `className` replaces rather than merges it, so a Tailwind wrapper has nothing to fight. Buttons are distinguished in CSS by `[slot="increment"]` / `[slot="decrement"]`.

### Open issues

Ten with NumberField in the title. Most relevant to a wrapper: **#10044** (disabled state conflicts with the `flushSync` inside the blur handler), **#6971** (`NaN` rather than `null`), **#5731** (iPhone decimal separator by region), **#6156** and **#1879** (no live formatting as you type), **#9059** (decrement converts negative to positive), **#2806** (unit cannot be deleted for some unit displays).

The package consolidation (#9774) is the notable recent change: not a semver-major on `@react-aria/numberfield` (3.12 → 3.13) and the public API is unchanged, but the dependency graph inverted.

## Hand-rolled: `<input>` plus stepper buttons

No version to pin. The reference implementation is the APG Quantity Spin Button Example quoted above, which is `<input type="text" role="spinbutton" inputmode="numeric">` with sibling `tabindex="-1"` buttons.

### What it uniquely buys

- **The full spinbutton pattern.** `role="spinbutton"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` when wanted. Neither library will give you this; both strip it.
- **`aria-valuetext` for the unit.** "5 people" as one utterance is reachable only here, and only here can `min`/`max` be exposed to assistive technology. Against that, the spec narrows `aria-valuetext` to cases where the value "cannot be meaningfully represented as a number", which a count of people can.
- **`aria-errormessage`** to match the APG example, or the existing `aria-describedby` wiring from `field.tsx` — a free choice rather than a library's.
- **`aria-disabled` rather than `disabled`** on the bound buttons, keeping them focusable for touch and voice assistive technology, which is what the APG example does and neither library does.
- **No new runtime dependency.** This would be the only candidate that adds none.
- **Arbitrary units cost the same as under either library**, since both already force a hand-rendered sibling.

### What it must implement

Each item below is work the libraries have already done. Citations are to the specification or the reference implementation that fixes the behavior.

**Float-safe stepping.** The HTML spec defines stepping as exact arithmetic against the step base with no tolerance, which IEEE-754 doubles cannot honor: a naive `value + step` produces a `stepMismatch` immediately and drifts further on each press. **Both reference implementations avoid doubles entirely** — Blink uses its own arbitrary-precision `blink::Decimal` type for `ApplyStep`, `StepSnappedMaximum`, `ParseToNumberOrNaN` and `ClampValue`; jsdom depends on `decimal.js` and implements `_stepAlign` as `new Decimal(v).minus(stepBase).toNearest(step, …).add(stepBase)`. Snapping after each addition is what prevents drift, but performing the snap in doubles reintroduces the error it removes. A hand-roll needs integer arithmetic scaled by the step's decimal exponent, or a decimal library. React Aria's answer is `roundToStepPrecision` plus `handleDecimalOperation`; Base UI's is `removeFloatingPointErrors`.

**Clamping, split by source.** The spec clamps inside `stepUp`/`stepDown` but **does not clamp typed input at all** — out-of-range typing produces `rangeUnderflow`/`rangeOverflow`, not a corrected value. The APG example follows the same split: its `setValue(raw, fromInput)` clamps only when `fromInput` is false, so buttons and keys clamp while typing sets `aria-invalid` and reveals the error message. This is the same distinction Base UI later added as `allowOutOfRange`.

**Home and End conditionally.** The APG makes both conditional on the bound existing, and with no bound they must fall through to the browser's caret-to-start/end behavior — which the pattern's own warning about not capturing text-editing keys requires.

**Page Up and Page Down.** Optional in the APG, with no multiplier specified. The APG date example uses ×5; the quantity example omits them. Neither library implements them.

**Auto-repeat on button hold.** **No APG or ARIA guidance exists** — neither pattern nor either example implements press-and-hold. The only primary source is Blink, whose `SpinButtonElement::StartRepeatingTimer` uses the scrollbar autoscroll delays: **250ms initial, then one step every 50ms**. Compare Base UI's 400/60 and React Aria's 400 mouse, 600 touch, then 60.

**IME and composition.** UI Events (https://www.w3.org/TR/uievents/#events-composition-events) says `keydown` and `keyup` still fire during composition with `isComposing` set to `true`, and "If a `keydown` event is canceled then any Composition Events that would have fired as a result of that `keydown` SHOULD not be dispatched." So a spinbutton that calls `preventDefault()` on Arrow, Home or End must guard on `isComposing` or it breaks Japanese and Chinese input. A second hazard is the controlled round trip: rewriting `element.value` from state on every `input` event destroys an in-progress composition. Notably, React's `ReactDOMInput.js` already carries a guard for this — but **only for `type === 'number'`**, with the comment "We explicitly want to coerce to number here if possible, so that other spellings of the same number (e.g. '0.0' mid-edit) aren't clobbered while the user types." A hand-rolled `type="text"` field takes the plain string-comparison branch, so the mid-edit clobber and the composition clobber are both its own problem.

**Locale-aware parsing.** `Intl.NumberFormat.prototype.formatToParts` is the only standard tool: it yields typed parts (`integer`, `group`, `decimal`, `fraction`, `minusSign`, `currency`, `unit`, `literal`) from which separators can be discovered and stripped. **There is no `Intl` parser and no proposal for one at any stage** — the ECMA-402 proposal index lists nothing at Stage 0 through 3, and both historical requests were closed: [tc39/ecma402#1](https://github.com/tc39/ecma402/issues/1) "Parsing APIs" closed 2015-11-06 by consensus, and [#147](https://github.com/tc39/ecma402/issues/147) closed 2017-08-10 as a duplicate. This is the single largest piece of work the libraries have already done — Base UI's `utils/parse.ts` and Adobe's `NumberParser` both run to hundreds of lines covering numbering systems, bidi control characters, accounting signs and per-locale separator quirks.

**Also:** paste filtering (unspecified anywhere; the APG says only that implementations "prevent input of any other characters"), text selection on focus, and a non-passive wheel listener attached by hand if wheel stepping is wanted at all.

### Testing a hand-roll is easier, not harder

This cuts in the hand-roll's favor and is worth stating plainly. Verified against `@testing-library/user-event` v14 source:

- **user-event does not emulate stepping.** Its `keydownBehavior` map handles `ArrowUp` and `ArrowDown` **only for `input[type=radio]`**; `Home` and `End` only move the caret. So `await user.keyboard('{ArrowUp}')` on a native `<input type="number">` in jsdom **does nothing**. On a hand-rolled field it works, because your own `keydown` handler runs.
- **user-event does emulate the browser's character filter for `type=number`**, dropping characters via an `isValidNumberInput` check, so typing `1,5` yields `15`. A `type="text"` field has no such filter and every keystroke reaches your handler — which is what all three candidates render anyway.
- **There is no wheel utility** in user-event v14; wheel must be tested by dispatching a `WheelEvent` manually, and jsdom applies no default action either way.
- jsdom has no layout and no hit-testing, so no browser-supplied interaction can be exercised at all — only code you wrote. That is a point against every candidate equally, but it means a hand-roll's behavior is the _only_ behavior that is testable here.

## Side by side

|                                               | Base UI 1.8.0                                          | React Aria 3.52.1 / RAC 1.21.1                                                                                | Hand-rolled                                |
| --------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Input `type`                                  | `text`                                                 | `text`                                                                                                        | yours; APG uses `text`                     |
| `role="spinbutton"`                           | no                                                     | computed then stripped                                                                                        | yes, if you write it                       |
| `aria-valuenow` / `min` / `max` / `valuetext` | none                                                   | all nulled                                                                                                    | yours                                      |
| `aria-roledescription`                        | `"Number field"`, hardcoded English, overridable       | `"Number field"`, 34 locales, dropped on iOS                                                                  | yours                                      |
| Value announced by                            | textbox value text                                     | assertive live region, `"Empty"` when unset                                                                   | yours                                      |
| Stepper names                                 | `"Increase"` / `"Decrease"`, hardcoded English         | `"Increase {label}"` / `"Decrease {label}"`, 34 locales                                                       | yours                                      |
| Steppers in tab order                         | no, `tabIndex: -1`                                     | no, `excludeFromTabOrder`                                                                                     | APG says no                                |
| Stepper at bound                              | native `disabled`                                      | native `disabled`                                                                                             | APG says `aria-disabled`                   |
| Arrow step                                    | `step`, default 1                                      | `step`, default 1                                                                                             | yours                                      |
| Large step                                    | Shift, `largeStep` default 10                          | **none**                                                                                                      | optional per APG                           |
| Small step                                    | Alt, `smallStep` default 0.1                           | none                                                                                                          | yours                                      |
| Page Up / Page Down                           | **not handled**                                        | falls through to one step                                                                                     | optional per APG                           |
| Home / End                                    | only if `min` / `max` set                              | only if `min` / `max` set                                                                                     | APG: conditional                           |
| Auto-repeat                                   | 400ms then 60ms                                        | 400ms mouse / 600ms touch, then 60ms                                                                          | none specified; Blink uses 250ms then 50ms |
| Wheel                                         | **opt-in**, `allowWheelScrub` default `false`          | **on by default**, `isWheelDisabled` to turn off                                                              | yours                                      |
| Wheel blocks page scroll                      | only while acting                                      | **unconditionally while focus is within**                                                                     | yours                                      |
| Scrub / drag                                  | yes, Pointer Lock, optional part                       | no                                                                                                            | no                                         |
| Value type                                    | `number \| null`                                       | `number`                                                                                                      | yours                                      |
| Empty                                         | `null`                                                 | **`NaN`**                                                                                                     | yours                                      |
| Change callback                               | `onValueChange(value, eventDetails)`, cancelable       | `onChange(value)`                                                                                             | yours                                      |
| Commit callback                               | `onValueCommitted`                                     | `commit()` on blur / Enter / paste                                                                            | yours                                      |
| Clamp timing                                  | every change, unless `allowOutOfRange`                 | on commit, when `commitBehavior: 'snap'` (default)                                                            | spec clamps steps, not typing              |
| Step snapping                                 | opt-in, `snapOnStep` default `false`                   | always under `'snap'`                                                                                         | yours                                      |
| Step anchor                                   | `min`, else 0                                          | `min`, else 0                                                                                                 | spec: `min`, else initial `value`, else 0  |
| Bad text at blur                              | **left in place, value diverges** (#5424)              | reverts to formatted previous value                                                                           | yours                                      |
| Formatting off                                | grouping only, `useGrouping: false`                    | grouping only; parser then **rejects** grouped input                                                          | yours                                      |
| Locale source                                 | `locale` prop, else runtime default; **no provider**   | `useLocale()`, `I18nProvider` optional                                                                        | yours                                      |
| SSR locale mismatch                           | `suppressHydrationWarning`, silent                     | not flagged in source                                                                                         | yours                                      |
| Hidden input                                  | `type="number"`, always                                | `type="hidden"`, **only when `name` set**; none at all on the hooks path                                      | yours                                      |
| Posts                                         | raw number; `""` when empty                            | raw number; `""` when empty                                                                                   | yours                                      |
| Native constraint validation                  | yes, participates                                      | only under `commitBehavior: 'validate'`                                                                       | yours                                      |
| Form reset                                    | via hidden input                                       | `useFormReset`, with a `defaultValue: '!'` trick                                                              | yours                                      |
| `inputMode`                                   | `numeric`; iOS `decimal` when `min >= 0`, else `text`  | `numeric`; iPhone `text` when negatives allowed, `decimal` when fractional; Android `decimal` when fractional | yours                                      |
| `pattern`                                     | none                                                   | none, not a typed prop                                                                                        | yours                                      |
| Arbitrary unit                                | **no mechanism**; sibling element, visual only         | **no mechanism**; sibling element, visual only                                                                | `aria-valuetext` available                 |
| React 19                                      | `^17 \|\| ^18 \|\| ^19`                                | `^16.8 \|\| ^17 \|\| ^18 \|\| ^19.0.0-rc.1`                                                                   | n/a                                        |
| `'use client'`                                | shipped                                                | **not shipped**; uses `client-only`, wrapper must add it                                                      | n/a                                        |
| Bundle, min+gzip                              | **13.4 KB**                                            | **27.1 KB** RAC, 19.5 KB hooks with nothing rendered                                                          | 0 plus your code                           |
| Default CSS                                   | none                                                   | none                                                                                                          | none                                       |
| Granular install                              | one package, `./number-field` subpath                  | one monolith; granular packages are shims                                                                     | n/a                                        |
| Live bugs                                     | #5424 display/post divergence, #4226 min/max invisible | #10044 `flushSync` on blur vs disabled, #6971 `NaN`                                                           | yours                                      |

## Fit against this repo

### The field family contract

`src/registry/lib/field.tsx` gives every member three things, and a number field would attach the same way input does today:

- **`useFieldIds({ id, error, describedBy })`** returns `{ fieldId, errorMessageId, describedBy }`. It generates an id with `useId()` when the caller supplies none, derives `errorMessageId` as `` `${fieldId}-error` ``, and merges any caller `aria-describedby` with the error id.
- **`fieldLabelVariants({ placement, error, disabled })`** — `placement` is required with no default (ADR 0006). Input passes `FieldLabelPlacement.Above`.
- **`FieldErrorMessage`** takes `id: string` and `children?: string` — **one string, nothing else** — and animates height and opacity on `springSettle`.

ADR 0007 fixes the contract every member exposes: `label`, `error?: string`, `name`, `disabled`, and its own change callback. That last part is where the candidates differ most from the built members. Input and textarea take the native `onChange`; checkbox, select and radio-group take a Radix callback. A number field introduces a **fourth** shape, and the three candidates disagree on what it is:

| Candidate   | Change callback                                      | Empty              |
| ----------- | ---------------------------------------------------- | ------------------ |
| Base UI     | `onValueChange(value: number \| null, eventDetails)` | `null`             |
| React Aria  | `onChange(value: number)`                            | `NaN`              |
| Hand-rolled | whatever we define                                   | whatever we define |

React Aria's `NaN` is the one to interrogate: it fails `===` against itself, so any app-side form binding must special-case it, and ADR 0007 puts that binding in the app.

### Input's sizes and adornment slot

From `src/registry/ui/input/classnames.ts` and `src/registry/ui/input/types.ts`:

- Two sizes only. `InputSize.Default` is `h-9 px-3 text-sm`; `InputSize.Small` is `h-8 px-2.5 text-sm`.
- The end slot is `pointer-events-none absolute flex items-center [&_button]:pointer-events-auto`, positioned `right-3` at default and `right-2.5` at small. **Buttons inside it already receive pointer events**, so a stepper pair could physically live there.
- Padding grows through compound variants when a slot is present: `pr-9` at default, `pr-8` at small. Those are sized for **one** icon or spinner. A two-button stepper needs more, so either the compound variants grow or a number field defines its own.
- `loading` **replaces** `endAdornment` rather than sitting beside it. A number field whose steppers lived in the end slot would lose its steppers whenever `loading` was true.
- `InputType.Number = 'number'` already exists in the enum, yet input's `registry.json` description says "Text-like types only" and no docs page demonstrates it. That tension is live regardless of what this ticket decides.
- `Input` spreads `...props` onto the native `<input>` and `Omit`s `size` and `type` from `React.ComponentProps<'input'>`. It exposes no way to inject markup between the border and the input, so a number field cannot reuse the `Input` component itself — only its class strings.

### The focus ring problem

This is the sharpest fit constraint, and it is an ADR 0003 question rather than a library one.

Input takes `boundaryFocusRingGeometry` from `src/registry/lib/interaction.ts` — `focus-visible:border-background focus-visible:ring-2 focus-visible:outline-hidden` — a 2px ring drawn **on the input's own edge, replacing its border**. It names its own color with `focus-visible:ring-ring`, and `invalidBoundaryFocusRingGeometry` restores the blanking in the invalid case.

A number field with visible stepper buttons has a bordered box containing the text input, which takes focus, and the buttons, which both libraries deliberately keep out of the tab order (`tabIndex: -1`). So the box is one visual unit with one focus target. Two shapes are available and ADR 0003 defines neither:

1. **The ring stays on the input** and the buttons sit outside the bordered box. This reuses `boundaryFocusRingGeometry` unchanged, but the result reads as an input plus adjacent controls rather than one field.
2. **The ring moves to the group**, which is what both libraries are built for — Base UI's `NumberField.Group` and RAC's `<Group>` both exist to carry it, and RAC emits `data-focus-within` on `Group` for exactly this. Painting a ring on a wrapper when focus is on a descendant needs `focus-within`, and ADR 0003 currently names only two geometries plus the no-ring case. This would be a third.

ADR 0006 also says a component that takes a ring export and names no ring color renders ring width with no visible ring, silently, so whichever shape wins has to name its color explicitly.

Neither library forces the answer. Both leave the input free of built-in styles, so either shape is reachable.

### hottrip's actual requirements

From hottrip issue #5 (closed, settled) and the batch-4 map:

- **Fixed Fields**: group size (integer) and budget per person (currency, includes flights).
- **Generated `number` widget**: required `unit` (free-text string), `min` and `max` (both **integers**). The schema carries no `step`. hottrip's code "repairs rather than rejects", swapping an inverted `min`/`max`.
- **Duration** — the flexible half of dates, an integer count of days or nights.

Two consequences fall straight out:

1. Every hottrip number is an **integer with `min >= 0`**. That lands on the good branch of both libraries' `inputMode` logic — Base UI gives `decimal` on iOS and `numeric` elsewhere; React Aria gives `numeric` everywhere, since `hasDecimals` is false for integers.
2. The **`unit` is arbitrary free text** and cannot go through `Intl`. `"people"` and `"nights"` throw `RangeError`. Neither library has an adornment slot or a formatter escape hatch, so the unit must be rendered as a sibling element and announced by hand — the same amount of work under all three candidates.

Note also that budget is currency while group size and duration are bare counts, so one component has to cover both a `style: 'currency'` case and a plain integer case, or the currency treatment has to be an adornment too.

### Registry shape

A new component follows `CODING_STANDARDS.md`: a folder under `src/registry/ui/number-field/` with `index.ts`, `number-field.tsx`, `classnames.ts`, `types.ts`, enums rather than string unions, and no code comments. Its `registry.json` entry carries `@flyingsalmon/field` and `@flyingsalmon/interaction` in `registryDependencies`, namespaced per ADR 0006, plus a new `dependencies` entry for whichever library wins — the first non-Radix, non-motion runtime dependency the registry would push onto consumers.

## Adjacent primitives, for completeness

Not asked about in the ticket, recorded so a spec review is not blindsided.

- **Ark UI** — `@ark-ui/react@5.39.1` (unpacked 3.3 MB, the whole component set) with `NumberInput`, built on `@zag-js/number-input@1.43.3` (115 KB), which itself depends on **`@internationalized/number@3.6.7`** — Adobe's formatter and parser. So Ark and React Aria share a formatting core. Zag's docs claim compliance with the WAI-ARIA spinbutton pattern; parts are `root`, `label`, `scrubber`, `control`, `input`, `increment-trigger`, `decrement-trigger`, `value-text`.
- **`react-number-format@5.4.5`** (244 KB, no runtime dependencies) — a formatting and masking input only. No stepper buttons, no spinbutton ARIA. Not a competitor for stepper behavior, only for display formatting.
- **shadcn/ui's own registry ships no number input.** Open feature requests [#4385](https://github.com/shadcn-ui/ui/issues/4385) and [#4482](https://github.com/shadcn-ui/ui/issues/4482) are unresolved. shadcn/vue has a `number-field`; that is a separate community port and does not apply here.
- **`@headlessui/react@2.2.10`** has no number field. Its form primitives are `Input`, `Select`, `Textarea`, `Label`, `Description`, `Fieldset`, `Legend`, and its `Input` is a thin unstyled wrapper with no numeric logic.
- **`@mui/base@5.0.0-beta.70`** is deprecated ("This package has been replaced by @base-ui/react"). Its old `NumberInput` became Base UI's `NumberField`. The lineage is `@mui/base` → `@base-ui-components/react` → `@base-ui/react`, and only the last is live.

Base UI 1.8.0 also exports `./combobox` and `./autocomplete` subpaths, which is directly relevant to sibling research ticket #115.

## Testing surface

Verified locally with this repo's installed jsdom 30.0.1 and Node 26.8.1:

- `stepUp()` and `stepDown(n)` are implemented and behave per spec.
- `valueAsNumber` works and is `NaN` for an empty input.
- Assigning a non-numeric string to a `type="number"` input sanitizes `value` to `""`. This is the DOM setter path, not the user-typing path — in a real browser, typing "abc" leaves `value === ''` **and** `validity.badInput === true`, whereas jsdom reports `badInput: false` because the bad input never existed.
- `selectionStart` returns `null` on `type="number"`, matching the specification's "does not apply".
- Full ICU is present, so locale behavior is testable: `de-DE` formats `1234.5` as `1.234,5`. Node's official binaries are built `full-icu` by default, so this holds in CI too.

jsdom implements the step algorithm faithfully — including the `InvalidStateError` throws, the `min > max` early return, the step-alignment snap and the on-step clamping — and does its arithmetic with `decimal.js` rather than doubles. What it lacks is layout and hit-testing, so **no browser-supplied interaction is exercisable at all**: no spinner UI, no default action for wheel, no default action for arrow keys on a number input. Only code the component itself wrote can be tested.

Since both libraries render `type="text"` with no `aria-value*`, a test asserting the spinbutton contract fails against either. Tests have to pin what the standards allow to be observed: the announced text, the posted form value, and the keyboard outcomes the component's own handlers produce.

## Not verified

- No browser or screen-reader run anywhere in this document. Every ARIA, keyboard, wheel and mobile-keyboard claim is read from source or specification, not observed. In particular, no device confirmed that iOS or Android render the keyboards the `inputMode` tables predict, and no assistive technology confirmed how either library's textbox-plus-`aria-roledescription` is actually announced.
- React Aria's wheel direction (`deltaY > 0` increments) is source-only; the sign also depends on the operating system's natural-scrolling setting.
- Base UI's wheel listener is registered without an explicit `{ passive: false }`. The default for non-`window` targets should make `preventDefault()` work, but this was not tested in a browser.
- Bundle figures are esbuild measurements with React external, not real-world numbers from this repo's Vite build.
- Base UI publishes no explicit semver or API-stability statement; https://base-ui.com/react/overview/releases notes only that canary releases may contain breaking changes. The "no NumberField breaking changes since 1.0" claim is derived from the changelog and a source diff, so it may miss a change that left no API trace.
- The exact `react-aria-components` release that first carried the package consolidation and `commitBehavior` was not pinned; only the `react-aria@3.48.0` side was.
- **Chromium's current shipping status for the wheel behavior.** Chromium `main` still steps a focused number input on wheel, per the source quoted above. There is a secondary claim that the behavior regressed in Chrome 147–148 and was fixed in Chrome 150, but https://issues.chromium.org/issues/40859979 requires sign-in and could not be opened, so neither the fix version nor whether Blink intends to remove the behavior outright is confirmed. Treat "Chrome no longer does this" as unverified.
- Whether `inputmode="decimal"` renders a **locale-appropriate** separator in practice on iOS or Android. The spec says it "should", MDN says "typically `.` or `,`", and Apple's `decimalPad` documentation says only "numbers and a decimal point". No device test was run in a non-`.` locale.
- Whether a minus sign is reachable on iOS `numberPad` or `decimalPad`. Apple documents none and MDN says "Devices may or may not show a minus key". Chromium never passes `TYPE_NUMBER_FLAG_SIGNED`, verified in source, but what Gboard renders given `TYPE_CLASS_NUMBER` was not tested.
- Whether Chrome or Firefox actually accept a comma decimal separator in `type="number"` under de-DE or fr-FR. The specification explicitly leaves this to the user agent and gives a French example of one that would. No browser was tested.
- Whether a controlled `type="text"` numeric field actually breaks Japanese or Chinese IME input in a real browser. The specification mechanism and React's number-only clobber guard are both verified in source; the resulting breakage was not reproduced.
- Which of the unit-announcement mechanisms NVDA, JAWS or VoiceOver actually speak, and when. ARIA specifies what assistive technology SHOULD render for `aria-valuetext` and specifies nothing about description timing. No assistive technology was tested.
