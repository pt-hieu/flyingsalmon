import { createFileRoute } from '@tanstack/react-router'

import { DocPage, Example, PropsTable } from '@/components/doc-page'
import { SkeletonDemo } from '@/examples/skeleton/demo'
import demoSource from '@/examples/skeleton/demo.tsx?raw'
import { SkeletonLoadingRegion } from '@/examples/skeleton/loading-region'
import loadingRegionSource from '@/examples/skeleton/loading-region.tsx?raw'
import { SkeletonTextFollowsFont } from '@/examples/skeleton/text-follows-font'
import textFollowsFontSource from '@/examples/skeleton/text-follows-font.tsx?raw'
import usageSource from '@/examples/skeleton/usage.tsx?raw'
import { SkeletonVariants } from '@/examples/skeleton/variants'
import variantsSource from '@/examples/skeleton/variants.tsx?raw'
import guidelines from '@/registry/ui/skeleton/guidelines.md?raw'

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
      guidelines={guidelines}
      accessibility={
        <p>
          The skeleton is always <code>aria-hidden</code> and never takes a tab
          stop, so a screen reader hears nothing from it. The region that is
          loading owns the announcement: put <code>aria-busy</code> on the
          container that will hold the real content, and an{' '}
          <code>aria-label</code> such as &ldquo;Loading trips&rdquo; that names
          what is coming, not on each block.
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
