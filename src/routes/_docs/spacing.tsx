import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_docs/spacing')({
  component: SpacingPage,
})

interface SpacingStep {
  step: string
  pixels: number
  barClassName: string
  usage: string
}

const spacingSteps: SpacingStep[] = [
  {
    step: '0.5',
    pixels: 2,
    barClassName: 'w-0.5',
    usage:
      "The gap between a field's icon buttons, the padding around a date-picker segment.",
  },
  {
    step: '0.75',
    pixels: 3,
    barClassName: 'w-0.75',
    usage: 'The inset of an icon button inside a field box.',
  },
  {
    step: '1',
    pixels: 4,
    barClassName: 'w-1',
    usage:
      'A title to its description, the error message under a field, menu padding, the gap between tabs.',
  },
  {
    step: '1.5',
    pixels: 6,
    barClassName: 'w-1.5',
    usage: 'The icon-to-label gap in a small button or chip.',
  },
  {
    step: '2',
    pixels: 8,
    barClassName: 'w-2',
    usage:
      'The icon-to-label gap in a button, a checkbox or radio to its label, a label above its field, buttons in an actions row.',
  },
  {
    step: '2.5',
    pixels: 10,
    barClassName: 'w-2.5',
    usage: 'Inline padding of a small field and a tooltip.',
  },
  {
    step: '3',
    pixels: 12,
    barClassName: 'w-3',
    usage:
      'Inline padding of a field and a small button, a label beside a date-picker, stacked radio options, a small alert, a timeline marker to its content.',
  },
  {
    step: '4',
    pixels: 16,
    barClassName: 'w-4',
    usage:
      'Inline padding of a button and a table cell, an alert, --card-spacing.',
  },
  {
    step: '5',
    pixels: 20,
    barClassName: 'w-5',
    usage: 'The gap between fields in a form.',
  },
  {
    step: '6',
    pixels: 24,
    barClassName: 'w-6',
    usage:
      '--dialog-spacing, --timeline-spacing, radio options laid out in a row.',
  },
]

interface ControlHeight {
  height: string
  pixels: number
  barClassName: string
  usage: string
}

const controlHeights: ControlHeight[] = [
  {
    height: 'h-10',
    pixels: 40,
    barClassName: 'h-10',
    usage: 'A table header row.',
  },
  {
    height: 'h-9',
    pixels: 36,
    barClassName: 'h-9',
    usage: 'Default: button, icon button, field box, toggle-group chip, tab.',
  },
  {
    height: 'h-8',
    pixels: 32,
    barClassName: 'h-8',
    usage: 'Small: button, icon button, field box, chip; a menu row.',
  },
  {
    height: 'h-5',
    pixels: 20,
    barClassName: 'h-5',
    usage: 'A badge, a checkbox, a radio.',
  },
]

interface SpacingToken {
  name: string
  value: string
  usage: string
}

const spacingTokens: SpacingToken[] = [
  {
    name: '--card-spacing',
    value: '--spacing(4)',
    usage:
      'Card padding on every edge and the gap between its slots, so the header, content, and footer line up with the border.',
  },
  {
    name: '--dialog-spacing',
    value: '--spacing(6)',
    usage:
      'Dialog and drawer padding: the header, body, and footer insets, and where the close button sits.',
  },
  {
    name: '--timeline-spacing',
    value: '--spacing(6)',
    usage:
      'The gap between timeline items. The connectors that bridge the gap read the same variable.',
  },
  {
    name: '--bar-height',
    value: '--spacing(18)',
    usage:
      "The band the sidebar header and the page header's first line share, so the wordmark, the page title, and the title's actions sit on one center line.",
  },
  {
    name: '--page-header-inset',
    value: '--spacing(0)',
    usage:
      'The side padding of the pane a page header sits in. The header bleeds out by it and pads back in, so its bottom rule meets both edges of the pane.',
  },
  {
    name: '--page-header-max-width',
    value: 'none',
    usage:
      'The widest a page header lets its title and actions run. The row centers inside the header while the bottom rule keeps the full width.',
  },
  {
    name: '--sidebar-width',
    value: '--spacing(72)',
    usage:
      'The expanded sidebar column. It is set on the root, so a pane beside the sidebar can offset itself by the same width.',
  },
  {
    name: '--sidebar-width-collapsed',
    value: '--spacing(14)',
    usage:
      "The collapsed rail: the content inset, an item's padding, and its icon, so the icons stay put as the sidebar collapses.",
  },
]

function SpacingPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Spacing
        </h1>
        <p className="text-muted-foreground text-lg">
          Every space is a step on Tailwind&rsquo;s 4px scale. Components use a
          handful of those steps for the same jobs everywhere. Three surfaces
          expose their padding as a variable you can override, one bar height
          lines the sidebar up with the page header, and the page header reads
          its pane's padding to run its rule edge to edge.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">The scale</h2>
        <p className="text-muted-foreground">
          One step is <code>--spacing</code>, 0.25rem. Write padding, gaps,
          margins, and sizes as scale steps (<code>gap-2</code>,{' '}
          <code>--spacing(6)</code>), never as pixel values. The steps below are
          the ones the components use, with the job each one does; a new
          component reuses a step for the same job.
        </p>
        <ul className="border-border bg-card divide-border divide-y rounded-lg border">
          {spacingSteps.map((spacingStep) => (
            <li
              key={spacingStep.step}
              className="grid grid-cols-[--spacing(20)_--spacing(8)_1fr] items-center gap-4 p-4"
            >
              <p className="text-sm">
                <code className="font-medium">{spacingStep.step}</code>
                <span className="text-muted-foreground">
                  {' '}
                  · {spacingStep.pixels}px
                </span>
              </p>
              <span
                className={`${spacingStep.barClassName} bg-indicator h-6 rounded-sm`}
              />
              <p className="text-muted-foreground text-sm">
                {spacingStep.usage}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Control heights</h2>
        <p className="text-muted-foreground">
          Controls come in two heights, so a button, a field, and a chip line up
          on one row at either size. The default is 36px and the small size
          32px. A control that sits inside another one, such as the icon button
          in a field box, is sized to leave a 3px inset inside the border.
        </p>
        <ul className="border-border bg-card divide-border divide-y rounded-lg border">
          {controlHeights.map((controlHeight) => (
            <li
              key={controlHeight.height}
              className="grid grid-cols-[--spacing(20)_--spacing(10)_1fr] items-center gap-4 p-4"
            >
              <p className="text-sm">
                <code className="font-medium">{controlHeight.height}</code>
                <span className="text-muted-foreground">
                  {' '}
                  · {controlHeight.pixels}px
                </span>
              </p>
              <span
                className={`${controlHeight.barClassName} bg-indicator w-2 rounded-sm`}
              />
              <p className="text-muted-foreground text-sm">
                {controlHeight.usage}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Surface variables</h2>
        <p className="text-muted-foreground">
          Card, dialog, and timeline read their spacing from a variable instead
          of a prop, and the sidebar and page header share one bar height. Every
          slot inside the surface uses the same variable, so overriding it on
          one instance moves every inset together:{' '}
          <code>className=&quot;[--card-spacing:--spacing(6)]&quot;</code>.
          There is no density or size prop on these surfaces.
        </p>
        <ul className="border-border bg-card divide-border divide-y rounded-lg border">
          {spacingTokens.map((spacingToken) => (
            <li key={spacingToken.name} className="space-y-1 p-4">
              <p className="text-sm">
                <code className="font-medium">{spacingToken.name}</code>
                <span className="text-muted-foreground">
                  {' '}
                  · {spacingToken.value}
                </span>
              </p>
              <p className="text-muted-foreground text-sm">
                {spacingToken.usage}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Closer means related
        </h2>
        <p className="text-muted-foreground">
          The gap grows with the distance between ideas. Inside a field, the
          label sits 8px above the box and an error sits 4px below it. Between
          fields in a form the gap is 20px, and the actions row keeps its
          buttons 8px apart. A title and its description sit 4px apart; the
          slots of a card sit <code>--card-spacing</code> apart.
        </p>
      </section>
    </article>
  )
}
