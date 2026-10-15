import { createFileRoute } from '@tanstack/react-router'

import {
  FoundationPage,
  GuidelineVerdict,
  TokenSample,
  docPageHead,
} from '@/components/doc-page'
import type { FoundationTableRow } from '@/components/doc-page'
import { cn } from '@/lib/utils'

const title = 'Spacing'

const principle =
  'Every space is a step on Tailwind’s 4px scale, and the gap grows with the distance between ideas.'

export const Route = createFileRoute('/_docs/spacing')({
  head: () => docPageHead(title, principle),
  component: SpacingPage,
})

const stepSampleClassName = 'bg-indicator h-4 rounded-sm'

const heightSampleClassName = 'bg-indicator w-2 rounded-sm'

const stepRows: FoundationTableRow[] = [
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-0.5')} />,
    name: '0.5',
    detail: '2px',
    job: 'The gap between a field’s icon buttons, the padding around a date picker segment.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-0.75')} />,
    name: '0.75',
    detail: '3px',
    job: 'The inset of an icon button inside a field box.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-1')} />,
    name: '1',
    detail: '4px',
    job: 'A title to its description, the error message under a field, menu padding, the gap between tabs.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-1.5')} />,
    name: '1.5',
    detail: '6px',
    job: 'The icon-to-label gap in a small button or chip.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-2')} />,
    name: '2',
    detail: '8px',
    job: 'The icon-to-label gap in a button, a checkbox or radio to its label, a label above its field, buttons in an actions row.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-2.5')} />,
    name: '2.5',
    detail: '10px',
    job: 'Inline padding of a small field and a tooltip.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-3')} />,
    name: '3',
    detail: '12px',
    job: 'Inline padding of a field and a small button, a label beside a date picker, stacked radio options, a small alert, a timeline marker to its content.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-4')} />,
    name: '4',
    detail: '16px',
    job: 'Inline padding of a button and a table cell, an alert, --card-spacing.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-5')} />,
    name: '5',
    detail: '20px',
    job: 'The gap between fields in a form.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-6')} />,
    name: '6',
    detail: '24px',
    job: '--dialog-spacing, --timeline-spacing, radio options laid out in a row.',
  },
]

const heightRows: FoundationTableRow[] = [
  {
    sample: <TokenSample className={cn(heightSampleClassName, 'h-10')} />,
    name: 'h-10',
    detail: '40px',
    job: 'A table header row.',
  },
  {
    sample: <TokenSample className={cn(heightSampleClassName, 'h-9')} />,
    name: 'h-9',
    detail: '36px',
    job: 'Default size: button, icon button, field box, toggle group chip, tab.',
  },
  {
    sample: <TokenSample className={cn(heightSampleClassName, 'h-8')} />,
    name: 'h-8',
    detail: '32px',
    job: 'Small size: button, icon button, field box, chip, and a menu row.',
  },
  {
    sample: <TokenSample className={cn(heightSampleClassName, 'h-5')} />,
    name: 'h-5',
    detail: '20px',
    job: 'A badge, a checkbox, a radio.',
  },
]

const variableRows: FoundationTableRow[] = [
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-4')} />,
    name: '--card-spacing',
    detail: '--spacing(4)',
    job: 'Card padding on every edge and the gap between its slots, so the header, content, and footer line up with the border.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-6')} />,
    name: '--dialog-spacing',
    detail: '--spacing(6)',
    job: 'Dialog and drawer padding: the header, body, and footer insets, and where the close button sits.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-6')} />,
    name: '--timeline-spacing',
    detail: '--spacing(6)',
    job: 'The gap between timeline items. The connectors that bridge the gap read the same variable.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-18')} />,
    name: '--bar-height',
    detail: '--spacing(18)',
    job: 'The band the sidebar header and the first line of a page header share, so the wordmark, the page title, and the title’s actions sit on one centre line.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-0')} />,
    name: '--page-header-inset',
    detail: '--spacing(0)',
    job: 'The side padding of the pane a page header sits in. The header bleeds out by it and pads back in, so its bottom rule meets both edges of the pane.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-0')} />,
    name: '--page-header-max-width',
    detail: 'none',
    job: 'The widest a page header lets its title and actions run. The row centres inside the header while the bottom rule keeps the full width.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-72')} />,
    name: '--sidebar-width',
    detail: '--spacing(72)',
    job: 'The expanded sidebar column. It is set on the root, so a pane beside the sidebar can offset itself by the same width.',
  },
  {
    sample: <TokenSample className={cn(stepSampleClassName, 'w-14')} />,
    name: '--sidebar-width-collapsed',
    detail: '--spacing(14)',
    job: 'The collapsed rail: the content inset, an item’s padding, and its icon, so the icons stay put as the sidebar collapses.',
  },
]

function SpacingPage() {
  return (
    <FoundationPage
      title={title}
      principle={principle}
      introduction={
        <p>
          Components use a handful of steps, the same step for the same job
          everywhere, so two screens built apart still agree. Three surfaces
          expose their padding as a variable you can override, and one bar
          height lines the sidebar up with the page header.
        </p>
      }
      tables={[
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
            'Controls come in two heights, so a button, a field, and a chip line up on one row at either size. A table header row and the small marks, a badge, a checkbox, and a radio, keep fixed heights of their own.',
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
          rule: 'Give the same job the same space on every screen: a label to its field, one field to the next.',
          reason:
            'Repeated distances are what make two screens built apart feel like one product.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Space two unrelated things as closely as two related ones.',
          reason:
            'Equal gaps hide the grouping, so the reader has to work out what goes with what.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Nudge one gap between steps to make something fit.',
          reason:
            'A space between steps lines up with nothing around it, and the eye reads it as a mistake.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Change a surface’s density as a whole: every edge and every gap between its parts together.',
          reason:
            'The content keeps lining up with the border, so a denser card still looks deliberate.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Put a button, a field, and a chip of the same size on one row.',
          reason:
            'Controls share their default and small heights, so a row lines up without adjustment.',
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
