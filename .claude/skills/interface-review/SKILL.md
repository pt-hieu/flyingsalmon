---
name: interface-review
description: Use when reviewing a component before it ships, auditing a batch of registry files, or when the user asks to check UI quality.
---

# Interface review

Review these files for compliance: $ARGUMENTS

Read the files. Check them against the rules below. Report findings only. Do not fix anything unless asked.

Output concise but comprehensive — sacrifice grammar for brevity. High signal-to-noise.

## Scope

Arguments name the files. With no arguments, review the changed files:

```
git diff --name-only HEAD; git ls-files --others --exclude-standard
```

Keep only `.tsx` and `.css`. If the result is empty, say so and stop. Never scan the whole repo.

## Repo overrides

This checklist is distilled from Vercel's web interface guidelines. Where the two disagree, this repo wins.

- **Never flag a missing `prefers-reduced-motion` variant.** ADR 0001 defers that support on purpose. Do not add the rule back.
- **Never suggest a toast.** Toast is banned permanently (ADR 0002). Success and error go inline via the alert component.
- Source of truth for design rules: `CLAUDE.md`, `CONTEXT.md`, `docs/adr/`. If a finding contradicts an ADR, say so instead of asserting the rule.

## Rules

### Accessibility

- Icon-only buttons need `aria-label`
- Form controls need `<label>` or `aria-label`
- Interactive elements need keyboard handlers (`onKeyDown`/`onKeyUp`)
- `<button>` for actions, `<a>`/`<Link>` for navigation (not `<div onClick>`)
- Decorative icons need `aria-hidden="true"`
- Alert and inline validation need `aria-live="polite"`
- Use semantic HTML (`<button>`, `<a>`, `<label>`, `<table>`) before ARIA
- Headings hierarchical `<h1>`–`<h6>`; include skip link for main content
- `scroll-margin-top` on heading anchors

### Focus states

- Interactive elements need visible focus
- Repo pattern: `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`
- Never `outline-none` / `outline: none` without a focus replacement
- Use `:focus-visible` over `:focus` (avoid focus ring on click)
- Group focus with `:focus-within` for compound controls
- Sticky headers/footers/overlays must not cover the focused element

### Forms

- A field owns its own error — inline, next to the field (feedback rule, `CONTEXT.md`)
- Focus the first error on submit
- Inputs need `autocomplete` and meaningful `name`
- Use correct `type` (`email`, `tel`, `url`, `number`) and `inputmode`
- Never block paste (`onPaste` + `preventDefault`)
- Labels clickable (`htmlFor` or wrapping control)
- Disable spellcheck on emails, codes, usernames (`spellCheck={false}`)
- Checkboxes/radios: label + control share a single hit target (no dead zones)
- Submit button stays enabled until the request starts; spinner during the request
- Placeholders end with `…` and show an example pattern
- `autocomplete="off"` on non-auth fields to avoid password manager triggers

### Motion

- Durations come from `--motion-fast` (100ms) and `--motion-base` (150ms). Never raw numbers.
- Springs come from `src/registry/lib/motion.ts`: `spring-bounce` for morph and enter, `spring-settle` for exit
- CSS transitions for state feedback; `motion` for morph and enter/exit (ADR 0001)
- Every kind except continuous stays under 200ms
- Animate `transform`/`opacity` only (compositor-friendly). Layout animation goes through motion's `layout` prop.
- Never `transition: all` or `transition-all` — list properties explicitly
- Set correct `transform-origin`
- SVG: transforms on `<g>` wrapper with `transform-box: fill-box; transform-origin: center`
- Animations interruptible — respond to user input mid-animation

### Theme tokens

- Never hardcode a radius. Derive from `--radius` via `--radius-sm`…`--radius-4xl`.
- Never a raw hex or `rgb()`. Use the OKLCH theme tokens.
- Every component needs a light and a dark variant

### Typography

- `…` not `...`
- Curly quotes `“` `”` not straight `"`
- Non-breaking spaces: `10&nbsp;MB`, `⌘&nbsp;K`, brand names
- Loading states end with `…`: `"Loading…"`, `"Saving…"`
- `font-variant-numeric: tabular-nums` for number columns/comparisons
- `text-wrap: balance` or `text-pretty` on headings (prevents widows)

### Content handling

- Text containers handle long content: `truncate`, `line-clamp-*`, or `break-words`
- Flex children need `min-w-0` to allow text truncation
- Handle empty states — don't render broken UI for empty strings/arrays
- User content: anticipate short, average, and very long inputs

### Touch and overlays

- `touch-action: manipulation` (prevents double-tap zoom delay)
- `-webkit-tap-highlight-color` set intentionally
- `overscroll-behavior: contain` in dialog and any scrollable overlay
- Full-bleed overlays need `env(safe-area-inset-*)` for notches
- During drag: disable text selection, `inert` on dragged elements
- Drag/swipe/pinch gestures need a tap/click and keyboard alternative
- `autoFocus` sparingly — desktop only, single primary input

### Dark mode

- `color-scheme: dark` on `<html>` for dark themes (fixes scrollbar, inputs)
- `<meta name="theme-color">` matches page background
- Native `<select>`: explicit `background-color` and `color` (Windows dark mode)

### Hydration safety

- Inputs with `value` need `onChange` (or `defaultValue` for uncontrolled)
- Date/time rendering: guard against hydration mismatch (server vs client)
- `suppressHydrationWarning` only where truly needed

### Hover and interactive states

- Buttons and links need a `hover:` state
- Interactive states increase contrast: hover/active/focus more prominent than rest

### Content and copy (docs pages)

- Active voice: "Install the CLI" not "The CLI will be installed"
- Title Case for headings and buttons (Chicago style)
- Numerals for counts: "8 components" not "eight"
- Specific button labels: "Save API Key" not "Continue"
- Error messages include the fix, not just the problem
- Second person; avoid first person

### Anti-patterns (flag these)

- `transition: all` or `transition-all`
- `outline-none` without a `focus-visible` replacement
- `<div>` or `<span>` with a click handler (should be `<button>`)
- Form inputs without labels
- Icon buttons without `aria-label`
- `onPaste` with `preventDefault`
- `user-scalable=no` or `maximum-scale=1` disabling zoom
- `autoFocus` without clear justification
- Hardcoded radius, hex, or `rgb()` values
- Gesture-only action without a tap/click and keyboard alternative

## Out of scope

Images, list virtualization, `preconnect`, font preload, video over GIF, URL state and deep linking, and `Intl.*` i18n are deliberately dropped. This repo ships atomic components and a small docs site; those rules cannot fire here. Do not report them.

## Output format

Group by file. Use `file:line` format (clickable). Terse findings. No preamble.

```text
## src/registry/ui/button.tsx

src/registry/ui/button.tsx:8 - transition-all → list properties
src/registry/ui/button.tsx:42 - icon button missing aria-label

## src/registry/ui/dialog.tsx

src/registry/ui/dialog.tsx:12 - missing overscroll-behavior: contain
src/registry/ui/dialog.tsx:34 - "..." → "…"

## src/registry/ui/card.tsx

✓ pass
```

State the issue and the location. Skip the explanation unless the fix is non-obvious.
