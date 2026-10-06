import { createFileRoute } from '@tanstack/react-router'

import { DocPage, Example, PropsTable } from '@/components/doc-page'
import { BadgeCount } from '@/examples/badge/count'
import countSource from '@/examples/badge/count.tsx?raw'
import { BadgeDemo } from '@/examples/badge/demo'
import demoSource from '@/examples/badge/demo.tsx?raw'
import { BadgeInALineOfText } from '@/examples/badge/in-a-line-of-text'
import inALineOfTextSource from '@/examples/badge/in-a-line-of-text.tsx?raw'
import { BadgeInATableRow } from '@/examples/badge/in-a-table-row'
import inATableRowSource from '@/examples/badge/in-a-table-row.tsx?raw'
import usageSource from '@/examples/badge/usage.tsx?raw'
import { BadgeVariants } from '@/examples/badge/variants'
import variantsSource from '@/examples/badge/variants.tsx?raw'
import { BadgeWithIcon } from '@/examples/badge/with-icon'
import withIconSource from '@/examples/badge/with-icon.tsx?raw'
import guidelines from '@/registry/ui/badge/guidelines.md?raw'

export const Route = createFileRoute('/_docs/components/badge')({
  component: BadgePage,
})

function BadgePage() {
  return (
    <DocPage
      title="Badge"
      lead="A badge is a static marker for a status, a category, or a small count."
      preview={{ source: demoSource, demo: <BadgeDemo /> }}
      installation="badge"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Variants"
            description="Default and secondary fill, and outline draws a border only. Success, warning, and error are the status trio: a tinted fill behind coloured text."
            source={variantsSource}
          >
            <BadgeVariants />
          </Example>

          <Example
            caption="Leading icon"
            description="The icon prop takes one icon before the label. Pass it bare: the badge sizes it, spaces it, and hides it from screen readers. There is no trailing slot."
            source={withIconSource}
          >
            <BadgeWithIcon />
          </Example>

          <Example
            caption="Count"
            description="A small number reads as a badge beside a label. Keep it to a count the traveller would glance at, not a figure they would compare."
            source={countSource}
          >
            <BadgeCount />
          </Example>

          <Example
            caption="In a table row"
            description="The badge keeps one height, so it sits in a cell without changing the row’s rhythm."
            source={inATableRowSource}
          >
            <BadgeInATableRow />
          </Example>

          <Example
            caption="In a line of text"
            description="The badge sits inline after the words it qualifies."
            source={inALineOfTextSource}
          >
            <BadgeInALineOfText />
          </Example>
        </>
      }
      guidelines={guidelines}
      accessibility={
        <p>
          The badge renders a plain <code>span</code> with no role and no tab
          stop, so a screen reader reads its text inline with the surrounding
          content. A leading icon is decoration and is hidden, so the label is
          read once. A link or a button inside a badge is unreachable by
          keyboard, so a badge holds only its label and icon. Every variant
          meets WCAG AA contrast. When the badge is the only carrier of a
          meaning, state that meaning in the surrounding text as well.
        </p>
      }
      api={
        <PropsTable
          component="Badge"
          description={
            <>
              Also takes every <code>&lt;span&gt;</code> attribute except{' '}
              <code>tabIndex</code>.
            </>
          }
          rows={[
            {
              name: 'variant',
              type: 'BadgeVariant',
              default: 'BadgeVariant.Default',
              description:
                'Default, Secondary, Outline, Success, Warning, or Error. Error marks a condition that already holds, never an action.',
            },
            {
              name: 'icon',
              type: 'ReactNode',
              description:
                'One leading icon. The badge owns its size and hides it from screen readers.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            One size: 20px tall at <code>text-xs</code>, in a full pill, with a
            12px icon and a 4px gap to the label. A badge lives inside a line of
            text or a table cell, so a second size would break the rhythm it
            sits in.
          </p>
          <p>
            The error variant paints from the <code>--error</code> tint pair and
            never from <code>--destructive</code>. A badge has no motion: it has
            one state and never changes it in place. An app that mounts a badge
            as the result of a change animates the mount.
          </p>
        </>
      }
      related={[
        {
          to: '/components/avatar',
          label: 'Avatar',
          description: 'The mark for a person rather than a state.',
        },
        {
          to: '/components/table',
          label: 'Table',
          description: 'Where a status column puts one badge per row.',
        },
        {
          to: '/components/notice',
          label: 'Notice',
          description: 'Where a result with no visible home goes.',
        },
        {
          to: '/colors',
          label: 'Colours',
          description: 'The status tints a badge draws from.',
        },
      ]}
    />
  )
}
