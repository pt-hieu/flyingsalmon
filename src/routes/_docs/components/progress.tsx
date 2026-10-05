import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  PropsTable,
} from '@/components/doc-page'
import { ProgressCustomMax } from '@/examples/progress/custom-max'
import customMaxSource from '@/examples/progress/custom-max.tsx?raw'
import { ProgressDemo } from '@/examples/progress/demo'
import demoSource from '@/examples/progress/demo.tsx?raw'
import { ProgressDeterminate } from '@/examples/progress/determinate'
import determinateSource from '@/examples/progress/determinate.tsx?raw'
import { ProgressIndeterminate } from '@/examples/progress/indeterminate'
import indeterminateSource from '@/examples/progress/indeterminate.tsx?raw'
import { ProgressStates } from '@/examples/progress/states'
import statesSource from '@/examples/progress/states.tsx?raw'
import usageSource from '@/examples/progress/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/progress')({
  component: ProgressPage,
})

function ProgressPage() {
  return (
    <DocPage
      title="Progress"
      lead="A bar for an operation with a known end: it shows how far along the work is when the fraction is computable, and that the work is running when it is not."
      preview={{ source: demoSource, demo: <ProgressDemo /> }}
      installation="progress"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Determinate"
            description="Press Advance. Each new value retargets the spring from wherever the fill sits, so a stream of small steps reads as one continuous travel and never as jumps."
            source={determinateSource}
          >
            <ProgressDeterminate />
          </Example>

          <Example
            caption="Indeterminate"
            description="Omit value for work that has started but has no computable fraction yet, such as the wait before the first progress event. Switch to a number as soon as one exists."
            source={indeterminateSource}
          >
            <ProgressIndeterminate />
          </Example>

          <Example
            caption="Custom max"
            description="max lets you count in your own units. A trip that plans seven days counts to seven, and value is clamped to the range, so an off-by-one from a server never draws a bar past its end."
            source={customMaxSource}
          >
            <ProgressCustomMax />
          </Example>

          <Example
            caption="Empty, partial, and full"
            description="A full bar keeps the fill colour and does not turn green. The result of the work belongs to the app, in the place the traveller is already looking."
            source={statesSource}
          >
            <ProgressStates />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'For a long job with a known end and nothing to attach it to, such as building a trip.',
          'For work that has started but has no computable fraction yet, as an indeterminate bar.',
        ],
        whenNotToUse: [
          {
            situation:
              'for the busyness of a control the traveller just pressed. The control shows it itself.',
            alternative: { to: '/components/spinner', label: 'Spinner' },
          },
          {
            situation:
              'for a region whose content has not arrived yet, so the page holds its shape while it loads.',
            alternative: { to: '/components/skeleton', label: 'Skeleton' },
          },
          {
            situation:
              'for a position in a flow the traveller is walking, such as step 2 of 4.',
            alternative: { to: '/components/stepper', label: 'Stepper' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Write the phase label and the value yourself, beside the bar.',
            reason:
              'The bar takes a number and a maximum and draws. Only the app knows what phase the work is in and how to word it.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Name the work with label whenever more than one bar can be on screen.',
            reason:
              'The label is the bar’s accessible name. Without it every bar reads as “Loading”.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Fake a fraction.',
            reason:
              'A bar that jumps to 90 percent and waits misreports the work. Use the indeterminate bar until a real number exists.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Show success or failure on the bar.',
            reason:
              'The outcome belongs to the app. Read data-state to react when the work ends, and report the result where the traveller is looking.',
          },
        ],
      }}
      accessibility={
        <>
          <p>
            The bar is not interactive: it has no hover, press, or disabled
            state and takes no tab stop.
          </p>
          <p>
            It is a <code>progressbar</code> with <code>aria-valuemin</code> 0
            and <code>aria-valuemax</code> set to <code>max</code>. When
            determinate it carries <code>aria-valuenow</code> and a screen
            reader reads a percentage. When indeterminate it carries none, so no
            percentage is announced before one exists.
          </p>
          <p>
            <code>label</code> becomes the accessible name and defaults to
            “Loading”. The bar does not set <code>aria-busy</code>; put that on
            the region that is waiting.
          </p>
        </>
      }
      api={
        <PropsTable
          component="Progress"
          description={
            <>
              Also takes every <code>&lt;div&gt;</code> attribute.
            </>
          }
          rows={[
            {
              name: 'value',
              type: 'number',
              description:
                'The current amount, clamped to 0 through max. Omit it for an indeterminate bar.',
            },
            {
              name: 'max',
              type: 'number',
              default: '100',
              description: 'The amount at which the work is complete.',
            },
            {
              name: 'label',
              type: 'string',
              default: '"Loading"',
              description: 'The accessible name of the bar.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            The bar is 8px tall with a fully rounded track. The fill is scaled
            from its left edge on <code>springSettle</code>, which never
            overshoots because a fill past its value misreports the work. The
            indeterminate segment travels the track on a 2s cycle, the tempo
            skeleton pulses on.
          </p>
          <p>
            <code>data-state</code> is <code>indeterminate</code>,{' '}
            <code>loading</code>, or <code>complete</code> once{' '}
            <code>value</code> reaches <code>max</code>.
          </p>
          <p>
            Two tokens colour it: <code>--progress-track</code> for the groove
            and <code>--progress-fill</code>, which aliases{' '}
            <code>--indicator</code>. The fill is 2.65:1 against the track,
            under the 3:1 bar for non-text marks, and 3.38:1 against the page.
            The track is 1.28:1 against the page, so an empty bar is visible
            without a border.
          </p>
        </>
      }
      related={[
        {
          to: '/components/spinner',
          label: 'Spinner',
          description: 'A control’s own busyness, such as a loading button.',
        },
        {
          to: '/components/skeleton',
          label: 'Skeleton',
          description: 'A region that has not loaded yet.',
        },
        {
          to: '/components/stepper',
          label: 'Stepper',
          description: 'A position in a flow, not work being done.',
        },
        {
          to: '/accessibility',
          label: 'Accessibility',
          description: 'How the registry treats contrast and focus.',
        },
      ]}
    />
  )
}
