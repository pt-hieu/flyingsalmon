# Docs page template

Every component page is one `DocPage` from `src/components/doc-page`. The template fixes the section order and headings; the page supplies content. The three reference pages are `src/routes/_docs/components/button.tsx` (simple), `dialog.tsx` (composed parts, a notice-backed example), and `combobox.tsx` (a long example ladder). Copy their shape.

## Sections

Pass each section as a `DocPage` prop. The page renders them in this order and skips any you leave out.

| Prop            | Heading       | Content                                                                                                                                                                                                                                                      |
| --------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`, `lead` | —             | The component name and one sentence saying what it is for. Both required.                                                                                                                                                                                    |
| `preview`       | (none shown)  | `{ source, demo }`: the hero example, the component in its most typical hottrip use.                                                                                                                                                                         |
| `installation`  | Installation  | The registry item name, such as `"button"`. Required on every component page.                                                                                                                                                                                |
| `usage`         | Usage         | The `?raw` source of `usage.tsx`: the import and the smallest JSX that works.                                                                                                                                                                                |
| `examples`      | Examples      | A fragment of `Example` elements, one idea each.                                                                                                                                                                                                             |
| `guidelines`    | Guidelines    | `{ whenToUse, whenNotToUse, rules }`. `whenNotToUse` names the alternative component and renders as "Use {alternative} {situation}", so write the situation starting with "to", "for", or "when". Each rule is a `GuidelineVerdict`, a rule, and its reason. |
| `accessibility` | Accessibility | A `KeyboardTable`, then short paragraphs of focus and ARIA facts.                                                                                                                                                                                            |
| `api`           | API           | One `PropsTable` per exported component a consumer configures, and a sentence covering the parts that only take their element's props.                                                                                                                       |
| `notes`         | Notes         | Implementation detail, collapsed by default: pixel sizes, spacing arithmetic, motion presets and easing, Radix internals, measured contrast ratios.                                                                                                          |
| `related`       | Related       | `{ to, label, description }[]`: sibling components and foundation pages, each with one line on why you would go there.                                                                                                                                       |

The guide comes first and the spec second: the body tells a consumer when and how to use the component, and a number goes in Notes unless a consumer needs it to make a decision.

## Examples

One file per example at `src/examples/<component>/<example-name>.tsx`, in kebab case. Each file exports one component named `<Component><ExampleName>` in PascalCase (`src/examples/dialog/server-error.tsx` exports `DialogServerError`). The hero is `demo.tsx` and the usage snippet is `usage.tsx`.

The page imports each file twice, once to render and once as text:

```tsx
import { DialogLarge } from '@/examples/dialog/large'
import largeSource from '@/examples/dialog/large.tsx?raw'

;<Example caption="Large size" description="…" source={largeSource}>
  <DialogLarge />
</Example>
```

The Code tab shows that source with registry imports rewritten to consumer paths (`@/registry/ui/x` becomes `@/components/ui/x`, `@/registry/lib/x` becomes `@/lib/x`), so write an example file exactly as a hottrip developer would: import from `@/registry/ui/<component>`, use enum members, no comments, no docs-only wrappers. A stand-in for a server is a small named function at the bottom of the file (`waitForServer`, `fetchPlaces`). When the docs need a wrapper the consumer's app shell would provide, wrap the example in the page, not in the file: `NoticeFrame` supplies a `NoticeProvider` for any example that calls `useNotice`.

Demo content is hottrip: trips, places, travellers, with Brian Nguyen as the traveller. Dates go in `DatePicker`. Results follow the feedback rule: a dialog closes on submit and the changed item shows the result; a server error after closing becomes a notice whose link reopens the dialog with what was typed.

A floating component (dialog, drawer, menu, popover-based field) renders closed behind its trigger.

## Captions

The caption is a short noun phrase naming the one idea: "Loading", "Destructive confirm", "Chips from free text". The optional `description` is one or two sentences saying what to notice or try and why it matters. Order examples as a ladder from simple to composed: basic use, content, value, states, then the component in a form or a larger flow.

## Tables

`KeyboardTable` takes `rows: { keys: string[]; description }[]`. Each string in `keys` is one key, shown as its own key cap; write a combination as one string (`'Shift+Tab'`). Describe what the key does in this component, including when it does nothing.

`PropsTable` takes `component`, an optional `description`, and `rows: { name, type, default?, required?, description }[]`. Read the props from the component's source in `src/registry/ui/`, never from memory. Write types and defaults as a consumer writes them (`ButtonVariant.Default`, `"button"`). Mark a prop with no default that the consumer must pass as `required`.
