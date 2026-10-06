# Docs page template

Every component page is one `DocPage` from `src/components/doc-page`. The template fixes the section order and headings; the page supplies content. The three reference pages are `src/routes/_docs/components/button.tsx` (simple), `dialog.tsx` (composed parts, a notice-backed example), and `combobox.tsx` (a long example ladder). Copy their shape.

## Sections

Pass each section as a `DocPage` prop. The page renders them in this order and skips any you leave out.

| Prop            | Heading       | Content                                                                                                                                                                                                                         |
| --------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`, `lead` | —             | The component name and one sentence saying what it is for. Both required.                                                                                                                                                       |
| `preview`       | (none shown)  | `{ source, demo }`: the hero example, the component in its most typical trip-planning use.                                                                                                                                      |
| `installation`  | Installation  | The registry item name, such as `"button"`. Required on every component page.                                                                                                                                                   |
| `usage`         | Usage         | The `?raw` source of `usage.tsx`: the import and the smallest JSX that works.                                                                                                                                                   |
| `examples`      | Examples      | A fragment of `Example` elements, one idea each.                                                                                                                                                                                |
| `guidelines`    | Guidelines    | The `?raw` text of the component's `src/registry/ui/<name>/guidelines.md`. The registry ships that file with the component, so the page and a consumer's project read the same copy. Its format is under Guidelines file below. |
| `accessibility` | Accessibility | A `KeyboardTable`, then short paragraphs of focus and ARIA facts.                                                                                                                                                               |
| `api`           | API           | One `PropsTable` per exported component a consumer configures, and a sentence covering the parts that only take their element's props.                                                                                          |
| `notes`         | Notes         | Implementation detail, collapsed by default: pixel sizes, spacing arithmetic, motion presets and easing, Radix internals, measured contrast ratios.                                                                             |
| `related`       | Related       | `{ to, label, description }[]`: sibling components and foundation pages, each with one line on why you would go there.                                                                                                          |

The guide comes first and the spec second: the body tells a consumer when and how to use the component, and a number goes in Notes unless a consumer needs it to make a decision.

## Guidelines file

`src/registry/ui/<name>/guidelines.md` holds the component's when to use, when not to use, and do and don't rules. `shadcn add` installs it beside the component, where a consumer's developers and coding agent read it, and the page renders its Guidelines section from it:

```tsx
import guidelines from '@/registry/ui/dialog/guidelines.md?raw'

;<DocPage title="Dialog" guidelines={guidelines} />
```

The file has this shape, and the page fails to render, naming the component, when it does not:

```md
# Dialog guidelines

Design guidelines for the flyingsalmon Dialog component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with `shadcn add @flyingsalmon/<name>`.

## When to use

- To confirm an action that cannot be undone, such as deleting a trip.

## When not to use

- Use [Drawer](https://flyingsalmon.superbrian.dev/components/drawer) for content that accompanies the page, such as filters or the detail of a row.

## Do and don't

- **Do:** Close a form dialog on submit and show the result on the item that changed.
  **Why:** The new trip appearing in the list is the clearest success there is.
- **Don't:** Open a dialog from a dialog.
  **Why:** Two modals deep, the traveller loses track of which one they are answering.
```

- The title is `# <title> guidelines`, where `<title>` is the page's `title` prop.
- The line after the title is the lead shown above, word for word with the component's `<title>`. It names the design system and the install command for a reader who meets the file in a consumer's project; the page does not render it.
- The three `##` sections come in this order, each a list of one or more items. Nothing else goes in the file.
- A when-not-to-use item is `Use [<Label>](<page URL>) <situation>`, and the page renders it as "Use {Label} {situation}", so start the situation with "to", "for", or "when". The label is the alternative component's name in sentence case; the URL is its page on `https://flyingsalmon.superbrian.dev`, which the docs site turns into an internal link.
- A rule is `**Do:**` or `**Don't:**` and the rule, then an indented `**Why:**` line with its reason. Order the rules as the page shows them; do and don't may interleave. Each rule is a design decision; an instruction for calling the API goes in the API table or Usage.
- Inline code in backticks renders as code, and a Markdown link to a page on the site renders as a link. Any other Markdown stays literal text, and a link off the site fails the page.
- An item may wrap onto indented continuation lines; the page joins them with a space.

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

The Code tab shows that source with registry imports rewritten to consumer paths (`@/registry/ui/x` becomes `@/components/ui/x`, `@/registry/lib/x` becomes `@/lib/x`), so write an example file exactly as a consumer's developer would: import from `@/registry/ui/<component>`, use enum members, no comments, no docs-only wrappers. A stand-in for a server is a small named function at the bottom of the file (`waitForServer`, `fetchPlaces`). When the docs need a wrapper the consumer's app shell would provide, wrap the example in the page, not in the file: `NoticeFrame` supplies a `NoticeProvider` for any example that calls `useNotice`.

Demo content is trips, places, and travellers, with Brian Nguyen as the traveller. No product is named: an email or link uses `example.com`. Dates go in `DatePicker`. Results follow the feedback rule: a dialog closes on submit and the changed item shows the result; a server error after closing becomes a notice whose link reopens the dialog with what was typed.

A floating component (dialog, drawer, menu, popover-based field) renders closed behind its trigger.

## Captions

The caption is a short noun phrase naming the one idea: "Loading", "Destructive confirm", "Chips from free text". The optional `description` is one or two sentences saying what to notice or try and why it matters. Order examples as a ladder from simple to composed: basic use, content, value, states, then the component in a form or a larger flow.

## Tables

`KeyboardTable` takes `rows: { keys: string[]; description }[]`. Each string in `keys` is one key, shown as its own key cap; write a combination as one string (`'Shift+Tab'`). Describe what the key does in this component, including when it does nothing.

`PropsTable` takes `component`, an optional `description`, and `rows: { name, type, default?, required?, description }[]`. Read the props from the component's source in `src/registry/ui/`, never from memory. Write types and defaults as a consumer writes them (`ButtonVariant.Default`, `"button"`). Mark a prop with no default that the consumer must pass as `required`.
