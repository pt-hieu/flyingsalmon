import { createFileRoute } from '@tanstack/react-router'

import {
  FoundationPage,
  GuidelineVerdict,
  docPageHead,
} from '@/components/doc-page'
import type { FoundationTableRow } from '@/components/doc-page'

const title = 'Typography'

const principle =
  'Two families do two jobs: Bricolage Grotesque announces, and Onest does the work.'

export const Route = createFileRoute('/_docs/typography')({
  head: () => docPageHead(title, principle),
  component: TypographyPage,
})

const fontRows: FoundationTableRow[] = [
  {
    sample: <span className="font-heading text-2xl font-bold">Aa</span>,
    name: '--font-heading',
    detail: 'Bricolage Grotesque Variable',
    job: 'Headings and display text: page titles, card titles, dialog titles, empty state titles.',
  },
  {
    sample: <span className="font-sans text-2xl">Aa</span>,
    name: '--font-sans',
    detail: 'Onest Variable',
    job: 'Body text and every piece of UI: labels, fields, buttons, descriptions, table cells.',
  },
]

const scaleRows: FoundationTableRow[] = [
  {
    sample: (
      <span className="font-heading text-4xl leading-10 font-extrabold tracking-tight">
        Lisbon
      </span>
    ),
    name: 'text-4xl, font-extrabold',
    detail: 'heading, tight tracking',
    job: 'The page header title, at every header width.',
  },
  {
    sample: (
      <span className="font-heading text-lg font-semibold">Trip to Lisbon</span>
    ),
    name: 'text-lg, font-semibold',
    detail: 'heading',
    job: 'Dialog, drawer, and sidebar titles, and the default empty state title.',
  },
  {
    sample: (
      <span className="font-heading text-base font-semibold">Day one</span>
    ),
    name: 'text-base, font-semibold',
    detail: 'heading',
    job: 'Accordion triggers, timeline titles, and the small empty state title.',
  },
  {
    sample: (
      <span className="font-heading text-sm font-semibold">October 2026</span>
    ),
    name: 'text-sm, font-semibold',
    detail: 'heading',
    job: 'The calendar heading.',
  },
  {
    sample: <span className="text-sm font-medium">Departure city</span>,
    name: 'text-sm, font-medium',
    detail: 'sans',
    job: 'Field labels, buttons, tabs, and menu rows.',
  },
  {
    sample: <span className="text-sm">Brian Nguyen</span>,
    name: 'text-sm',
    detail: 'sans',
    job: 'Body text inside components: field values, descriptions, table cells, alerts.',
  },
  {
    sample: <span className="text-xs font-medium">3 travellers</span>,
    name: 'text-xs, font-medium',
    detail: 'sans',
    job: 'Badges, captions, and the sidebar category labels.',
  },
]

function TypographyPage() {
  return (
    <FoundationPage
      title={title}
      principle={principle}
      introduction={
        <p>
          Bricolage Grotesque has the warmth and a little of the swagger the
          system is after, so it carries every heading. Onest is plain and
          legible at small sizes, so it carries everything a person reads in the
          interface. Headings pick up the heading family from the base layer, so
          an <code>h1</code> to <code>h6</code> needs no class.
        </p>
      }
      tables={[
        {
          title: 'Families',
          rows: fontRows,
        },
        {
          title: 'Type scale in use',
          description:
            'Components use a short scale. Headings get weight and tracking; body text stays regular and small.',
          rows: scaleRows,
        },
      ]}
      rules={[
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Set display text and titles in Bricolage Grotesque, and everything else in Onest.',
          reason:
            'The contrast between the two families is what makes a title read as a title without a bigger size.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Use weight to rank text at the same size: semibold for a title, medium for a label, regular for a value.',
          reason:
            'A small scale stays calm, and weight gives hierarchy without adding another size to learn.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Set body text or a field label in the heading family.',
          reason:
            'Bricolage Grotesque is tuned for display. At small sizes it loses to Onest on legibility.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Add a third family.',
          reason:
            'Two families already cover announcing and working. A third dilutes both.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Use equal-width digits for figures that line up or change in place, such as dates and prices.',
          reason:
            'Equal-width digits keep a column straight and stop a changing value from jittering.',
        },
      ]}
      notes={
        <>
          <p>
            Both families are variable fonts installed from Fontsource, so the
            theme imports them and consumers receive the font files through the
            package, not through a font service. Both are licensed under the SIL
            Open Font License 1.1, which allows use, bundling, and
            redistribution with the licence file kept alongside the font.
            Fontsource ships that licence file in each package.
          </p>
          <p>
            <code>--font-heading</code> falls back to <code>--font-sans</code>,
            and <code>--font-sans</code> falls back to the system sans-serif.
          </p>
        </>
      }
      related={[
        {
          to: '/principles',
          label: 'Principles',
          description: 'The mood the type pairing serves.',
        },
        {
          to: '/components/page-header',
          label: 'Page header',
          description: 'The largest type in the system.',
        },
        {
          to: '/spacing',
          label: 'Spacing',
          description: 'The scale that sets the space around type.',
        },
      ]}
    />
  )
}
