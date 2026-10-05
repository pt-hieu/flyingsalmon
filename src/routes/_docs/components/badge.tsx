import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  PropsTable,
} from '@/components/doc-page'
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
      guidelines={{
        whenToUse: [
          'To label the state of a thing: a trip is booked, a payment failed, a visa is expiring.',
          'To tag a category or show a small count beside a label.',
        ],
        whenNotToUse: [
          {
            situation:
              'when the marker must do something on press, because a badge takes no focus and nothing inside it is interactive.',
            alternative: { to: '/components/button', label: 'Button' },
          },
          {
            situation:
              'to report the result of an action, because a result belongs on the item that changed or in a notice that links back to it.',
            alternative: { to: '/components/notice', label: 'Notice' },
          },
          {
            situation:
              'to mark a person, because a person has a face and a name.',
            alternative: { to: '/components/avatar', label: 'Avatar' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Pair a status colour with words that state the status.',
            reason:
              'Colour alone never carries a meaning: a reader who cannot tell orange from green still has to learn the state.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: (
              <>
                Use <code>error</code> for a state that already exists, such as
                a failed payment.
              </>
            ),
            reason:
              'Error red reports a condition. Destructive red names an action a person can take, such as delete, and belongs to the destructive button.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Put a link, a button, or any interactive element inside a badge.',
            reason:
              'The badge is a plain span with no focus and no role. Anything interactive in it is unreachable by keyboard.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Stack several badges on one row item.',
            reason:
              'Each one asks to be read. One badge states the state that matters; the rest belong in the item’s details.',
          },
        ],
      }}
      accessibility={
        <p>
          The badge renders a plain <code>span</code> with no role and no tab
          stop, so a screen reader reads its text inline with the surrounding
          content. A leading icon is decoration and is hidden, so the label is
          read once. Every variant meets WCAG AA contrast. When the badge is the
          only carrier of a meaning, state that meaning in the surrounding text
          as well.
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
                'Default, Secondary, Outline, Success, Warning, or Error.',
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
