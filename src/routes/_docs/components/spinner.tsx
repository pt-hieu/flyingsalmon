import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  PropsTable,
} from '@/components/doc-page'
import { SpinnerColour } from '@/examples/spinner/colour'
import colourSource from '@/examples/spinner/colour.tsx?raw'
import { SpinnerDemo } from '@/examples/spinner/demo'
import demoSource from '@/examples/spinner/demo.tsx?raw'
import { SpinnerInAButton } from '@/examples/spinner/in-a-button'
import inAButtonSource from '@/examples/spinner/in-a-button.tsx?raw'
import { SpinnerSizes } from '@/examples/spinner/sizes'
import sizesSource from '@/examples/spinner/sizes.tsx?raw'
import usageSource from '@/examples/spinner/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/spinner')({
  component: SpinnerPage,
})

function SpinnerPage() {
  return (
    <DocPage
      title="Spinner"
      lead="The loading mark for a running action, embedded in the button and standing alone for an inline working moment."
      preview={{ source: demoSource, demo: <SpinnerDemo /> }}
      installation="spinner"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Sizes"
            description="Default and small match the two button sizes. Standalone use takes the default."
            source={sizesSource}
          >
            <SpinnerSizes />
          </Example>

          <Example
            caption="Colour"
            description="The arc draws in the current text colour and has no track, so the spinner takes the colour of whatever contains it."
            source={colourSource}
          >
            <SpinnerColour />
          </Example>

          <Example
            caption="In a button"
            description="Press the button. A button’s loading prop places the spinner in its leading slot and keeps the label, so you rarely render a spinner for a button yourself."
            source={inAButtonSource}
          >
            <SpinnerInAButton />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'For an action that is running: a form submits, a setting saves, a check is under way.',
          'Inline beside the text that says what is being waited for.',
        ],
        whenNotToUse: [
          {
            situation:
              'for a region that is loading, such as a list, a card, or a page. The placeholder holds the shape of what is coming.',
            alternative: { to: '/components/skeleton', label: 'Skeleton' },
          },
          {
            situation:
              'for a long job with a known end, where the traveller wants to see how far along it is.',
            alternative: { to: '/components/progress', label: 'Progress' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Place a small spinner inline, directly before the words that say what is happening.',
            reason:
              'The spinner says something is running and only the words say what, so they belong together.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'On a long wait, pair the spinner with a written count, such as “3 of 7 days written”.',
            reason:
              'A count tells the traveller how far along the work is in their own terms, with no bar beside the heading.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Pick a spinner or a skeleton for a given wait, never both.',
            reason:
              'They answer different questions: a spinner says an action is running, a skeleton says a region is loading. Both together say it twice.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Replace a control the traveller just pressed with a spinner.',
            reason:
              'The control should show its own busyness and keep its place, as the loading button does.',
          },
        ],
      }}
      accessibility={
        <>
          <p>
            A standalone spinner has <code>role="status"</code> and reads out
            its <code>label</code>, which defaults to “Loading”. It never takes
            focus and has no tab stop.
          </p>
          <p>
            A component that announces its own busyness, such as the button,
            embeds the spinner as <code>aria-hidden</code> so the wait is
            announced once.
          </p>
        </>
      }
      api={
        <PropsTable
          component="Spinner"
          description={
            <>
              Also takes every <code>&lt;svg&gt;</code> attribute.
            </>
          }
          rows={[
            {
              name: 'size',
              type: 'SpinnerSize',
              default: 'SpinnerSize.Default',
              description: 'Default or Small.',
            },
            {
              name: 'label',
              type: 'string',
              default: '"Loading"',
              description:
                'What a screen reader reads for the standalone spinner. Name the work, such as “Checking availability”, when the spinner stands alone. When the text beside it already names the work, a short label such as “In progress” is enough.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            Default is 16px and small is 12px. The arc turns 360° every 800ms,
            linear and endless, on CSS keyframes. It has no enter or exit
            animation: it appears and disappears at once, and the loading
            spinner is exempt from the sub-200ms motion limit.
          </p>
        </>
      }
      related={[
        {
          to: '/components/button',
          label: 'Button',
          description: 'Shows this spinner in its leading slot while loading.',
        },
        {
          to: '/components/skeleton',
          label: 'Skeleton',
          description: 'The placeholder for a region that is loading.',
        },
        {
          to: '/components/progress',
          label: 'Progress',
          description: 'A bar for work with a known end.',
        },
        {
          to: '/motion',
          label: 'Motion',
          description: 'The motion language and the continuous indicators.',
        },
      ]}
    />
  )
}
