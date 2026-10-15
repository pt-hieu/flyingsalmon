import { createFileRoute } from '@tanstack/react-router'

import {
  FoundationPage,
  GuidelineVerdict,
  TokenSample,
  docPageHead,
} from '@/components/doc-page'
import type { FoundationTableRow } from '@/components/doc-page'
import { cn } from '@/lib/utils'

const title = 'Radius'

const principle =
  'One base radius sets every corner, and each surface takes a step on the scale derived from it.'

export const Route = createFileRoute('/_docs/radius')({
  head: () => docPageHead(title, principle),
  component: RadiusPage,
})

const radiusSampleClassName = 'border-indicator bg-card size-10 border-2'

const radiusRows: FoundationTableRow[] = [
  {
    sample: <TokenSample className={cn(radiusSampleClassName, 'rounded-sm')} />,
    name: 'rounded-sm',
    detail: 'radius × 0.6 (7.2px)',
    job: 'Small marks: the checkbox, a date picker segment, a text link’s focus ring, a skeleton line.',
  },
  {
    sample: <TokenSample className={cn(radiusSampleClassName, 'rounded-md')} />,
    name: 'rounded-md',
    detail: 'radius × 0.8 (9.6px)',
    job: 'Controls: buttons, field boxes, tabs, the tooltip, a calendar day.',
  },
  {
    sample: <TokenSample className={cn(radiusSampleClassName, 'rounded-lg')} />,
    name: 'rounded-lg',
    detail: 'radius (12px)',
    job: 'Containers: cards, alerts, the date picker panel, a skeleton block.',
  },
  {
    sample: <TokenSample className={cn(radiusSampleClassName, 'rounded-xl')} />,
    name: 'rounded-xl',
    detail: 'radius × 1.4 (16.8px)',
    job: 'Floating surfaces that cover the page: dialogs and drawers.',
  },
  {
    sample: (
      <TokenSample className={cn(radiusSampleClassName, 'rounded-2xl')} />
    ),
    name: 'rounded-2xl',
    detail: 'radius × 1.8 (21.6px)',
    job: 'Reserved for larger surfaces in an app.',
  },
  {
    sample: (
      <TokenSample className={cn(radiusSampleClassName, 'rounded-3xl')} />
    ),
    name: 'rounded-3xl',
    detail: 'radius × 2.2 (26.4px)',
    job: 'Reserved for larger surfaces in an app.',
  },
  {
    sample: (
      <TokenSample className={cn(radiusSampleClassName, 'rounded-4xl')} />
    ),
    name: 'rounded-4xl',
    detail: 'radius × 2.6 (31.2px)',
    job: 'Reserved for larger surfaces in an app.',
  },
  {
    sample: (
      <TokenSample className={cn(radiusSampleClassName, 'rounded-full')} />
    ),
    name: 'rounded-full',
    detail: '9999px',
    job: 'Anything circular or pill-shaped: avatars, switches, radio dots, badges.',
  },
]

function RadiusPage() {
  return (
    <FoundationPage
      title={title}
      principle={principle}
      introduction={
        <p>
          The base is <code>--radius: 0.75rem</code>, 12px. A larger surface
          gets a larger radius, so a container and the controls inside it follow
          the same curve. Change the base once and every corner in the system
          moves with it.
        </p>
      }
      tables={[
        {
          title: 'Radius scale',
          rows: radiusRows,
        },
      ]}
      rules={[
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Pick the step by the size of the surface: sm for marks, md for controls, lg for containers, xl for floating surfaces.',
          reason:
            'The bigger the box, the bigger the curve it needs to look the same as its neighbours.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Round the inside of a nested surface one step less than the outside.',
          reason:
            'A control in a card then follows the card’s corner instead of fighting it.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Give two surfaces of the same kind different corners.',
          reason:
            'Two cards with different curves read as two different things, so the reader looks for a difference that is not there.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Make a shape fully round only when it is meant to be round, such as an avatar or a switch.',
          reason:
            'A circle says “person” or “toggle”. A fully rounded card says nothing and loses its edge.',
        },
      ]}
      notes={
        <>
          <p>
            The scale is defined in the theme as{' '}
            <code>--radius-sm: calc(var(--radius) * 0.6)</code>, and likewise
            for the other steps, so Tailwind&rsquo;s <code>rounded-*</code>{' '}
            utilities resolve to it.
          </p>
          <p>Pixel values in the table are for the default base of 12px.</p>
        </>
      }
      related={[
        {
          to: '/spacing',
          label: 'Spacing',
          description: 'The scale for padding and gaps.',
        },
        {
          to: '/principles',
          label: 'Principles',
          description: 'Flat surfaces, where the corner does the work.',
        },
        {
          to: '/components/card',
          label: 'Card',
          description: 'A container on the lg step.',
        },
      ]}
    />
  )
}
