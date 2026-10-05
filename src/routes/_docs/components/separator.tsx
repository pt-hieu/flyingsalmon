import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  PropsTable,
} from '@/components/doc-page'
import { SeparatorAnnounced } from '@/examples/separator/announced'
import announcedSource from '@/examples/separator/announced.tsx?raw'
import { SeparatorDemo } from '@/examples/separator/demo'
import demoSource from '@/examples/separator/demo.tsx?raw'
import { SeparatorSpacing } from '@/examples/separator/spacing'
import spacingSource from '@/examples/separator/spacing.tsx?raw'
import usageSource from '@/examples/separator/usage.tsx?raw'
import { SeparatorVertical } from '@/examples/separator/vertical'
import verticalSource from '@/examples/separator/vertical.tsx?raw'

export const Route = createFileRoute('/_docs/components/separator')({
  component: SeparatorPage,
})

function SeparatorPage() {
  return (
    <DocPage
      title="Separator"
      lead="A separator is a one-pixel rule that divides content, announced only when the division carries meaning."
      preview={{ source: demoSource, demo: <SeparatorDemo /> }}
      installation="separator"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Vertical"
            description="Vertical stretches to the height of the flex or grid row it sits in, so a toolbar divider needs no explicit height."
            source={verticalSource}
          >
            <SeparatorVertical />
          </Example>

          <Example
            caption="Announced"
            description="Set decorative to false when the boundary carries meaning that no other markup states, such as between two form sections with no headings. It looks identical; only screen readers hear the difference."
            source={announcedSource}
          >
            <SeparatorAnnounced />
          </Example>

          <Example
            caption="Spacing from the parent"
            description="The separator has no margin. The parent’s gap sets the rhythm of the rows and the rules between them."
            source={spacingSource}
          >
            <SeparatorSpacing />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          "Between siblings that own no border of their own: rows in a list, groups in a toolbar, a panel's heading over its body.",
        ],
        whenNotToUse: [
          {
            situation:
              'to box content, because a card draws its own edge and separates by it.',
            alternative: { to: '/components/card', label: 'Card' },
          },
          {
            situation:
              'to divide rows of data, because a table keeps a rule under every row already.',
            alternative: { to: '/components/table', label: 'Table' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Place a separator beside something that already draws a border.',
            reason:
              'The boundary is already there, and a second line only doubles it.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Put text in the rule, as in an “or” between a sign-in form and its social buttons.',
            reason:
              'A labelled rule is a different DOM shape, and the props omit children so it cannot be faked. Build it in the app that needs it.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Space a separator with the parent’s gap, not its own margin.',
            reason:
              'One number sets the rhythm for the rows and the rules between them, and nothing has to be undone at the ends of a list.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: (
              <>
                Pass a height through <code>className</code> when a vertical
                separator sits in a parent that is neither flex nor grid.
              </>
            ),
            reason:
              'Vertical stretches to its row, so with no row it has no height to take.',
          },
        ],
      }}
      accessibility={
        <p>
          A separator is decorative by default and a screen reader hears
          nothing. With <code>decorative={'{false}'}</code> it exposes{' '}
          <code>role=&quot;separator&quot;</code>; a vertical one also carries{' '}
          <code>aria-orientation=&quot;vertical&quot;</code>, and a horizontal
          one sets nothing because ARIA already defaults to horizontal. The
          separator is never focusable and never enters the tab order.
        </p>
      }
      api={
        <PropsTable
          component="Separator"
          description={
            <>
              Takes the props of the Radix separator root except{' '}
              <code>asChild</code> and <code>children</code>. There is no colour
              prop and no size; pass a colour through <code>className</code> if
              you must.
            </>
          }
          rows={[
            {
              name: 'orientation',
              type: 'SeparatorOrientation',
              default: 'SeparatorOrientation.Horizontal',
              description:
                'Horizontal fills the width of its parent. Vertical stretches to the height of its flex or grid row.',
            },
            {
              name: 'decorative',
              type: 'boolean',
              default: 'true',
              description:
                'When true the separator is hidden from assistive technology. Set false to announce it.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            The line is 1px in both directions and paints <code>--border</code>,
            the step every other border in the system uses. The orientation is
            written out as <code>data-orientation</code>, which is a public CSS
            hook.
          </p>
        </>
      }
      related={[
        {
          to: '/components/card',
          label: 'Card',
          description: 'Draws its own edge instead of relying on rules.',
        },
        {
          to: '/components/table',
          label: 'Table',
          description: 'Separates its own rows with rules.',
        },
        {
          to: '/spacing',
          label: 'Spacing',
          description: 'The gap steps that set the rhythm around a rule.',
        },
        {
          to: '/colors',
          label: 'Colours',
          description: 'The border step the rule paints.',
        },
      ]}
    />
  )
}
