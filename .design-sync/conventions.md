# Flying Salmon

Brian's design system: soft, minimal, playful. Every component below is the real
shipped component — compose them, don't restyle them.

## Import shape

Every export — components, compound parts, and the variant enums — lives on the
one bundle namespace. A component's parts are separate exports, not properties:

```jsx
const { Card, CardHeader, CardTitle, CardContent, Button, ButtonVariant } =
  window.FlyingSalmon
```

## Variants are enums, never strings

A closed set of values is a TypeScript enum exported beside its component.
Pass the member, not the string:

```jsx
<Button variant={ButtonVariant.Outline} size={ButtonSize.Small}>
  Save trip
</Button>
```

`variant="outline"` is wrong even though the underlying value is `"outline"`.
Each component's `.d.ts` names the enum it takes.

## Color: functional aliases only

Use the aliases, never a raw palette step and never a hex value:
`--background` / `--foreground`, `--card` / `--card-foreground`,
`--popover` / `--popover-foreground`, `--primary` / `--primary-foreground`,
`--secondary` / `--secondary-foreground`, `--muted` / `--muted-foreground`,
`--accent` / `--accent-foreground`, `--error` / `--error-foreground`,
`--success` / `--success-foreground`, `--warning` / `--warning-foreground`,
`--border`, `--input`, `--ring`, `--indicator`, `--skeleton`.
In Tailwind these are the class suffixes: `bg-card`, `text-muted-foreground`,
`border-border`.

**No color alpha anywhere** — no `bg-primary/50`, no `rgba()`. An alpha color
lands outside the palette. Opacity on a whole element (a disabled control, a
motion fade) is fine.

## Flat surfaces

No shadows, no elevation, ever — there are no shadow tokens to reach for.
Surfaces separate by a solid 1px `--border` edge and a background step.
Interaction feedback
lives in the border or in a background step, never in a lift or a press-down.

## Radius

`--radius` is 0.75rem (12px) and the scale derives from it: `rounded-sm`,
`rounded-md`, `rounded-lg`, `rounded-xl`. Never hardcode a pixel radius.

## Type

`--font-heading` (Baloo 2) for headings and display; `--font-sans` (Onest) for
body and UI. In Tailwind: `font-heading` and the default sans.

## Motion

Small and springy, under 200ms. `--motion-fast` (100ms) for color and opacity
feedback, `--motion-base` (150ms) for morphs and enter/exit. Continuous
indicators (spinner, skeleton, indeterminate progress) are exempt and already
carry their own `animate-*` utility — don't substitute Tailwind's
`animate-spin` or `animate-pulse`.

## Feedback belongs where attention already is

The acting component shows its own busyness: a button morphs through
`loading`, a field renders its own `error`. The **result** of an action belongs
to the app, and it appears where the user is already looking, staying until
they have seen it:

1. On the affected item — it appears, updates, or shows a failed state with retry.
2. On the acting surface — the form's result slot, below the actions row, as an `Alert`.
3. In a shell-owned persistent notice (`NoticeProvider`), only when neither of the above has a home.

Anything that auto-dismisses, stacks, has no owner, or has no link back to its
subject is banned. **Do not build a toast**, and never put a result in the
bottom-right corner.

## Providers at the app root

Wrap the app once, at its root, not per component:

```jsx
<TooltipProvider>{app}</TooltipProvider>
```

`Tooltip` needs it, and so does anything that renders a tooltip internally —
`AvatarGroup` does. Without it those components throw at render. The provider
also fixes the shared open delay (500ms) and skip delay (300ms), so a
per-component wrap would break that grouping even where it renders.
`SidebarProvider` already includes a `TooltipProvider`, so a sidebar shell
needs no second one.

## Accessibility

Visible focus states and a full keyboard path are hard requirements. The
components already implement both — don't remove a focus style, and don't
replace a real control with a styled `div`.
