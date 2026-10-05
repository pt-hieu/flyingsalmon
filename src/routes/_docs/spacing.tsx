import { createFileRoute } from '@tanstack/react-router'

import { GuidelineVerdict } from '@/components/doc-page'
import { FoundationPage } from '@/components/foundation-page'
import type { TokenRow } from '@/components/foundation-page'

export const Route = createFileRoute('/_docs/spacing')({
  component: SpacingPage,
})

function stepSample(barClassName: string) {
  return (
    <span
      aria-hidden
      className={`${barClassName} bg-indicator block h-4 rounded-sm`}
    />
  )
}

function heightSample(barClassName: string) {
  return (
    <span
      aria-hidden
      className={`${barClassName} bg-indicator block w-2 rounded-sm`}
    />
  )
}

const stepRows: TokenRow[] = [
  {
    sample: stepSample('w-0.5'),
    token: '0.5',
    value: '2px',
    job: 'The gap between a field’s icon buttons, the padding around a date picker segment.',
  },
  {
    sample: stepSample('w-0.75'),
    token: '0.75',
    value: '3px',
    job: 'The inset of an icon button inside a field box.',
  },
  {
    sample: stepSample('w-1'),
    token: '1',
    value: '4px',
    job: 'A title to its description, the error message under a field, menu padding, the gap between tabs.',
  },
  {
    sample: stepSample('w-1.5'),
    token: '1.5',
    value: '6px',
    job: 'The icon-to-label gap in a small button or chip.',
  },
  {
    sample: stepSample('w-2'),
    token: '2',
    value: '8px',
    job: 'The icon-to-label gap in a button, a checkbox or radio to its label, a label above its field, buttons in an actions row.',
  },
  {
    sample: stepSample('w-2.5'),
    token: '2.5',
    value: '10px',
    job: 'Inline padding of a small field and a tooltip.',
  },
  {
    sample: stepSample('w-3'),
    token: '3',
    value: '12px',
    job: 'Inline padding of a field and a small button, a label beside a date picker, stacked radio options, a small alert, a timeline marker to its content.',
  },
  {
    sample: stepSample('w-4'),
    token: '4',
    value: '16px',
    job: 'Inline padding of a button and a table cell, an alert, --card-spacing.',
  },
  {
    sample: stepSample('w-5'),
    token: '5',
    value: '20px',
    job: 'The gap between fields in a form.',
  },
  {
    sample: stepSample('w-6'),
    token: '6',
    value: '24px',
    job: '--dialog-spacing, --timeline-spacing, radio options laid out in a row.',
  },
]

const heightRows: TokenRow[] = [
  {
    sample: heightSample('h-10'),
    token: 'h-10',
    value: '40px',
    job: 'A table header row.',
  },
  {
    sample: heightSample('h-9'),
    token: 'h-9',
    value: '36px',
    job: 'Default size: button, icon button, field box, toggle group chip, tab.',
  },
  {
    sample: heightSample('h-8'),
    token: 'h-8',
    value: '32px',
    job: 'Small size: button, icon button, field box, chip, and a menu row.',
  },
  {
    sample: heightSample('h-5'),
    token: 'h-5',
    value: '20px',
    job: 'A badge, a checkbox, a radio.',
  },
]

const variableRows: TokenRow[] = [
  {
    sample: stepSample('w-4'),
    token: '--card-spacing',
    value: '--spacing(4)',
    job: 'Card padding on every edge and the gap between its slots, so the header, content, and footer line up with the border.',
  },
  {
    sample: stepSample('w-6'),
    token: '--dialog-spacing',
    value: '--spacing(6)',
    job: 'Dialog and drawer padding: the header, body, and footer insets, and where the close button sits.',
  },
  {
    sample: stepSample('w-6'),
    token: '--timeline-spacing',
    value: '--spacing(6)',
    job: 'The gap between timeline items. The connectors that bridge the gap read the same variable.',
  },
  {
    sample: stepSample('w-18'),
    token: '--bar-height',
    value: '--spacing(18)',
    job: 'The band the sidebar header and the first line of a page header share, so the wordmark, the page title, and the title’s actions sit on one centre line.',
  },
  {
    sample: stepSample('w-0'),
    token: '--page-header-inset',
    value: '--spacing(0)',
    job: 'The side padding of the pane a page header sits in. The header bleeds out by it and pads back in, so its bottom rule meets both edges of the pane.',
  },
  {
    sample: stepSample('w-0'),
    token: '--page-header-max-width',
    value: 'none',
    job: 'The widest a page header lets its title and actions run. The row centres inside the header while the bottom rule keeps the full width.',
  },
  {
    sample: stepSample('w-72'),
    token: '--sidebar-width',
    value: '--spacing(72)',
    job: 'The expanded sidebar column. It is set on the root, so a pane beside the sidebar can offset itself by the same width.',
  },
  {
    sample: stepSample('w-14'),
    token: '--sidebar-width-collapsed',
    value: '--spacing(14)',
    job: 'The collapsed rail: the content inset, an item’s padding, and its icon, so the icons stay put as the sidebar collapses.',
  },
]

function SpacingPage() {
  return (
    <FoundationPage
      title="Spacing"
      principle="Every space is a step on Tailwind’s 4px scale, and the gap grows with the distance between ideas."
      introduction={
        <p>
          Components use a handful of steps, the same step for the same job
          everywhere, so two screens built apart still agree. Three surfaces
          expose their padding as a variable you can override, and one bar
          height lines the sidebar up with the page header.
        </p>
      }
      tokenSections={[
        {
          title: 'The scale',
          description: (
            <>
              One step is <code>--spacing</code>, 0.25rem. These are the steps
              the components use, with the job each one does.
            </>
          ),
          rows: stepRows,
        },
        {
          title: 'Control heights',
          description:
            'Controls come in two heights, so a button, a field, and a chip line up on one row at either size.',
          rows: heightRows,
        },
        {
          title: 'Surface variables',
          description: (
            <>
              Card, dialog, and timeline read their spacing from a variable
              instead of a prop. Every slot inside the surface uses the same
              variable, so overriding it on one instance moves every inset
              together:{' '}
              <code>className=&quot;[--card-spacing:--spacing(6)]&quot;</code>.
            </>
          ),
          rows: variableRows,
        },
      ]}
      sections={[
        {
          title: 'Closer means related',
          content: (
            <p>
              Inside a field, the label sits one step above the box and an error
              sits a step below it. Between fields in a form the gap is larger,
              and the actions row keeps its buttons close together. A title and
              its description sit tight; the slots of a card sit{' '}
              <code>--card-spacing</code> apart. A reader groups what is near,
              so the distances say what belongs together.
            </p>
          ),
        },
      ]}
      rules={[
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Write padding, gaps, margins, and sizes as scale steps: gap-2, --spacing(6).',
          reason: 'One scale means every part lines up with every other part.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Write a pixel value, such as gap-[10px].',
          reason:
            'A value off the scale lines up with nothing, and the next person has to guess its job.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Reuse the step a component already uses for the same job.',
          reason:
            'The same job at the same distance is what makes the system feel like one thing.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Override --card-spacing, --dialog-spacing, or --timeline-spacing on one instance when you need a different density.',
          reason:
            'Every slot reads the same variable, so the insets move together and stay aligned. There is no density prop to keep in sync.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Put a button, a field, and a chip of the same size on one row.',
          reason:
            'Default and small heights are shared across controls, so a row lines up without adjustment.',
        },
      ]}
      notes={
        <>
          <p>
            A control that sits inside another one, such as the icon button in a
            field box, is sized to leave a 3px inset inside the border.
          </p>
          <p>
            Inside a field the label sits 8px above the box and an error sits
            4px below it. Between fields in a form the gap is 20px, and the
            actions row keeps its buttons 8px apart. A title and its description
            sit 4px apart.
          </p>
          <p>
            The page header reads <code>--page-header-inset</code> from its
            pane, so a pane that pads itself 24px sets the variable to 24px and
            the header&rsquo;s rule still meets both edges.
          </p>
        </>
      }
      related={[
        {
          to: '/radius',
          label: 'Radius',
          description:
            'The corner scale that sits alongside the spacing scale.',
        },
        {
          to: '/components/card',
          label: 'Card',
          description: 'Exposes --card-spacing.',
        },
        {
          to: '/components/dialog',
          label: 'Dialog',
          description: 'Exposes --dialog-spacing.',
        },
      ]}
    />
  )
}
