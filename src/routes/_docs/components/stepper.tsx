import { createFileRoute } from '@tanstack/react-router'

import { DocPage, Example, PropsTable } from '@/components/doc-page'
import { StepperDemo } from '@/examples/stepper/demo'
import demoSource from '@/examples/stepper/demo.tsx?raw'
import { StepperForwardAndBack } from '@/examples/stepper/forward-and-back'
import forwardAndBackSource from '@/examples/stepper/forward-and-back.tsx?raw'
import { StepperGrowingCount } from '@/examples/stepper/growing-count'
import growingCountSource from '@/examples/stepper/growing-count.tsx?raw'
import usageSource from '@/examples/stepper/usage.tsx?raw'
import guidelines from '@/registry/ui/stepper/guidelines.md?raw'

export const Route = createFileRoute('/_docs/components/stepper')({
  component: StepperPage,
})

function StepperPage() {
  return (
    <DocPage
      title="Stepper"
      lead="A display-only bar of equal segments, filled through the current one, for a position in a sequence whose length is known."
      preview={{ source: demoSource, demo: <StepperDemo /> }}
      installation="stepper"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Forward and back"
            description="Advancing fills the reached segment from its left edge with a spring that overshoots inside the segment. Going back un-fills it without a wobble."
            source={forwardAndBackSource}
          >
            <StepperForwardAndBack />
          </Example>

          <Example
            caption="A growing count"
            description="Ask a follow-up and the count grows while the bar is mounted. The new segment appears as upcoming with no enter animation."
            source={growingCountSource}
          >
            <StepperGrowingCount />
          </Example>
        </>
      }
      guidelines={guidelines}
      accessibility={
        <>
          <p>
            The bar is not interactive: nothing in it takes focus, so there is
            no keyboard path. It is a <code>list</code> named by{' '}
            <code>label</code>, which defaults to &ldquo;Progress&rdquo;. Each
            segment is a <code>listitem</code> named &ldquo;2 of 4&rdquo;, and
            the current one carries <code>aria-current=&quot;step&quot;</code>,
            so a screen reader reads &ldquo;2 of 4, current step&rdquo;. Give
            each bar a <code>label</code> that says what the steps are.
          </p>
        </>
      }
      api={
        <PropsTable
          component="Stepper"
          description={
            <>
              Draws segments only, with no text slots and no segment labels: map
              your own notion of a step onto <code>count</code> and{' '}
              <code>current</code>, and write the step&rsquo;s name yourself.
              Also takes every <code>&lt;div&gt;</code> attribute.
            </>
          }
          rows={[
            {
              name: 'count',
              type: 'number',
              required: true,
              description:
                'The number of segments. It may change while mounted.',
            },
            {
              name: 'current',
              type: 'number',
              required: true,
              description:
                'The current step, counting from 1. Values outside 1 to count are clamped.',
            },
            {
              name: 'label',
              type: 'string',
              default: '"Progress"',
              description: 'The accessible name of the list.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            Each segment carries <code>data-state</code>: <code>complete</code>,{' '}
            <code>current</code>, or <code>upcoming</code>. The current segment
            paints the same as a completed one, because a display-only bar has
            no reason to distinguish where you are from what you have done;{' '}
            <code>data-state=&quot;current&quot;</code> is the hook for an app
            that wants a third look. There are two paints: segments through{' '}
            <code>current</code> on <code>--progress-fill</code>, the rest on{' '}
            <code>--progress-track</code>. Both tokens come from the theme, so
            the stepper does not depend on the progress item.
          </p>
          <p>
            The fill measures 2.65:1 against the track, below the 3:1 bar for
            non-text marks. The track measures 1.28:1 against the page, enough
            to show how many segments are left.
          </p>
          <p>
            A segment that appears when <code>count</code> grows renders as
            upcoming with no enter animation, because a segment appearing is a
            change to the plan rather than movement through it. Filling uses{' '}
            <code>springBounce</code> and un-filling uses{' '}
            <code>springSettle</code>, both on a scale from the segment&rsquo;s
            left edge.
          </p>
          <p>
            Elsewhere &ldquo;stepper&rdquo; names the minus and plus pair beside
            a numeric input. In this registry that pair belongs to the number
            field and is called spin buttons, the name its ARIA role already
            uses; <code>stepper</code> is this bar.
          </p>
        </>
      }
      related={[
        {
          to: '/components/progress',
          label: 'Progress',
          description: 'A fraction of one operation with a known end.',
        },
        {
          to: '/components/timeline',
          label: 'Timeline',
          description:
            'Markers joined by connectors, each with its own content.',
        },
        {
          to: '/components/tabs',
          label: 'Tabs',
          description: 'Navigation between peer panels.',
        },
        {
          to: '/components/number-field',
          label: 'Number field',
          description: 'Where the minus and plus spin buttons live.',
        },
      ]}
    />
  )
}
