import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  PropsTable,
} from '@/components/doc-page'
import { SkeletonDemo } from '@/examples/skeleton/demo'
import demoSource from '@/examples/skeleton/demo.tsx?raw'
import { SkeletonLoadingRegion } from '@/examples/skeleton/loading-region'
import loadingRegionSource from '@/examples/skeleton/loading-region.tsx?raw'
import { SkeletonTextFollowsFont } from '@/examples/skeleton/text-follows-font'
import textFollowsFontSource from '@/examples/skeleton/text-follows-font.tsx?raw'
import usageSource from '@/examples/skeleton/usage.tsx?raw'
import { SkeletonVariants } from '@/examples/skeleton/variants'
import variantsSource from '@/examples/skeleton/variants.tsx?raw'

export const Route = createFileRoute('/_docs/components/skeleton')({
  component: SkeletonPage,
})

function SkeletonPage() {
  return (
    <DocPage
      title="Skeleton"
      lead="A pulsing placeholder that holds the shape of content that has not arrived yet."
      preview={{ source: demoSource, demo: <SkeletonDemo /> }}
      installation="skeleton"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Variants"
            description="Text is the default: one line tall and full width. Circle and rectangle carry no size of their own, so you give them one."
            source={variantsSource}
          >
            <SkeletonVariants />
          </Example>

          <Example
            caption="Text follows the font"
            description="A text block is one line tall in the surrounding font, so stacked lines scale with the type they stand in for."
            source={textFollowsFontSource}
          >
            <SkeletonTextFollowsFont />
          </Example>

          <Example
            caption="A loading region"
            description="Toggle the content. The skeleton matches the shape of the real content, and the container carries aria-busy while it waits. The content replaces it at once."
            source={loadingRegionSource}
          >
            <SkeletonLoadingRegion />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'For a region whose shape is known and whose content has not arrived: a list, a card, a page on first load.',
        ],
        whenNotToUse: [
          {
            situation:
              'for an action that is running, such as a form submitting. The control shows its own busyness.',
            alternative: { to: '/components/spinner', label: 'Spinner' },
          },
          {
            situation:
              'for a long job with a known end, where the traveller wants to see how far along it is.',
            alternative: { to: '/components/progress', label: 'Progress' },
          },
          {
            situation:
              'when the region is legitimately empty. A skeleton says content is coming, and none is.',
            alternative: {
              to: '/components/empty-state',
              label: 'Empty state',
            },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Size each block to match the content it replaces.',
            reason:
              'There are no size props, because a placeholder that differs from the real content makes the page jump when it arrives.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Put aria-busy on the container that will hold the real content.',
            reason:
              'The skeleton is hidden from screen readers, so the loading region owns the announcement.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Swap a control the traveller just pressed for a skeleton.',
            reason:
              'The control should stay and show its own busyness. A skeleton in its place makes the action vanish.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Show a skeleton and a spinner for the same wait.',
            reason:
              'Two indicators for one wait say it twice and compete for attention.',
          },
        ],
      }}
      accessibility={
        <p>
          The skeleton is always <code>aria-hidden</code> and never takes a tab
          stop, so a screen reader hears nothing from it. The region that is
          loading owns the announcement: put <code>aria-busy</code> on the
          container that will hold the real content.
        </p>
      }
      api={
        <PropsTable
          component="Skeleton"
          description={
            <>
              Also takes every <code>&lt;div&gt;</code> attribute except{' '}
              <code>children</code> and <code>aria-hidden</code>. Size it with{' '}
              <code>className</code>.
            </>
          }
          rows={[
            {
              name: 'variant',
              type: 'SkeletonVariant',
              default: 'SkeletonVariant.Text',
              description: 'Text, Circle, or Rectangle.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            Radii come from the radius scale: the base radius for rectangle, a
            tighter step for text, and full rounding for circle. Each block
            carries its shape as <code>data-variant</code>, so CSS or a test can
            target one shape.
          </p>
          <p>
            The block fades from full opacity to half and back on a 2s
            ease-in-out cycle, on CSS keyframes. It has no enter or exit
            animation: it appears at once and the content replaces it at once.
            The continuous pulse is exempt from the sub-200ms motion limit.
          </p>
        </>
      }
      related={[
        {
          to: '/components/spinner',
          label: 'Spinner',
          description: 'The mark for an action that is running.',
        },
        {
          to: '/components/progress',
          label: 'Progress',
          description: 'A bar for work with a known end.',
        },
        {
          to: '/components/empty-state',
          label: 'Empty state',
          description: 'What a region says when it is legitimately empty.',
        },
        {
          to: '/components/error-state',
          label: 'Error state',
          description: 'What a region says when its content failed to arrive.',
        },
      ]}
    />
  )
}
