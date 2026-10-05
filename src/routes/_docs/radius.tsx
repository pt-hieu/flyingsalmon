import { createFileRoute } from '@tanstack/react-router'

import { GuidelineVerdict } from '@/components/doc-page'
import { FoundationPage } from '@/components/foundation-page'
import type { TokenRow } from '@/components/foundation-page'

export const Route = createFileRoute('/_docs/radius')({
  component: RadiusPage,
})

function radiusSample(radiusClassName: string) {
  return (
    <span
      aria-hidden
      className={`${radiusClassName} border-indicator bg-card block size-10 border-2`}
    />
  )
}

const radiusRows: TokenRow[] = [
  {
    sample: radiusSample('rounded-sm'),
    token: 'rounded-sm',
    value: 'radius × 0.6 (7.2px)',
    job: 'Small marks: the checkbox, a date picker segment, a text link’s focus ring, a skeleton line.',
  },
  {
    sample: radiusSample('rounded-md'),
    token: 'rounded-md',
    value: 'radius × 0.8 (9.6px)',
    job: 'Controls: buttons, field boxes, tabs, the tooltip, a calendar day.',
  },
  {
    sample: radiusSample('rounded-lg'),
    token: 'rounded-lg',
    value: 'radius (12px)',
    job: 'Containers: cards, alerts, the date picker popover, a skeleton block.',
  },
  {
    sample: radiusSample('rounded-xl'),
    token: 'rounded-xl',
    value: 'radius × 1.4 (16.8px)',
    job: 'Floating surfaces that cover the page: dialogs and drawers.',
  },
  {
    sample: radiusSample('rounded-2xl'),
    token: 'rounded-2xl',
    value: 'radius × 1.8 (21.6px)',
    job: 'Reserved for larger surfaces in an app.',
  },
  {
    sample: radiusSample('rounded-3xl'),
    token: 'rounded-3xl',
    value: 'radius × 2.2 (26.4px)',
    job: 'Reserved for larger surfaces in an app.',
  },
  {
    sample: radiusSample('rounded-4xl'),
    token: 'rounded-4xl',
    value: 'radius × 2.6 (31.2px)',
    job: 'Reserved for larger surfaces in an app.',
  },
  {
    sample: radiusSample('rounded-full'),
    token: 'rounded-full',
    value: '9999px',
    job: 'Anything circular or pill-shaped: avatars, switches, radio dots, badges.',
  },
]

function RadiusPage() {
  return (
    <FoundationPage
      title="Radius"
      principle="One base radius sets every corner, and each surface takes a step on the scale derived from it."
      introduction={
        <p>
          The base is <code>--radius: 0.75rem</code>, 12px. A larger surface
          gets a larger radius, so a container and the controls inside it follow
          the same curve. Change the base once and every corner in the system
          moves with it.
        </p>
      }
      tokenSections={[
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
          rule: 'Hardcode a radius, such as rounded-[10px] or a pixel value.',
          reason:
            'A fixed value ignores the base, so it stays behind when the base changes.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Reserve rounded-full for shapes that are meant to be round.',
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
