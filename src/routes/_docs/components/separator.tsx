import { createFileRoute } from '@tanstack/react-router'

import { DocPage, Example, PropsTable } from '@/components/doc-page'
import { SeparatorAnnounced } from '@/examples/separator/announced'
import announcedSource from '@/examples/separator/announced.tsx?raw'
import { SeparatorDemo } from '@/examples/separator/demo'
import demoSource from '@/examples/separator/demo.tsx?raw'
import { SeparatorSpacing } from '@/examples/separator/spacing'
import spacingSource from '@/examples/separator/spacing.tsx?raw'
import usageSource from '@/examples/separator/usage.tsx?raw'
import { SeparatorVertical } from '@/examples/separator/vertical'
import verticalSource from '@/examples/separator/vertical.tsx?raw'
import guidelines from '@/registry/ui/separator/guidelines.md?raw'

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
      guidelines={guidelines}
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
              <code>asChild</code> and <code>children</code>, so a labelled rule
              is a different shape you build in the app that needs it. There is
              no colour prop and no size; pass a colour through{' '}
              <code>className</code> if you must. The separator has no margin:
              space it with the parent&rsquo;s gap, so one number sets the
              rhythm for the rows and the rules between them.
            </>
          }
          rows={[
            {
              name: 'orientation',
              type: 'SeparatorOrientation',
              default: 'SeparatorOrientation.Horizontal',
              description:
                'Horizontal fills the width of its parent. Vertical stretches to the height of its flex or grid row; in a parent that is neither, pass a height through className.',
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
