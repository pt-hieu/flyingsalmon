import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { ErrorStateDemo } from '@/examples/error-state/demo'
import demoSource from '@/examples/error-state/demo.tsx?raw'
import { ErrorStateRetry } from '@/examples/error-state/retry'
import retrySource from '@/examples/error-state/retry.tsx?raw'
import { ErrorStateSmallInACard } from '@/examples/error-state/small-in-a-card'
import smallInACardSource from '@/examples/error-state/small-in-a-card.tsx?raw'
import usageSource from '@/examples/error-state/usage.tsx?raw'
import guidelines from '@/registry/ui/error-state/guidelines.md?raw'

export const Route = createFileRoute('/_docs/components/error-state')({
  component: ErrorStatePage,
})

function ErrorStatePage() {
  return (
    <DocPage
      title="Error state"
      lead="An empty state for content that failed to arrive: it says what happened and what the traveller can do about it, and is announced when it appears."
      preview={{ source: demoSource, demo: <ErrorStateDemo /> }}
      installation="error-state"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Small in a card"
            description="Small is for one region among others. The icon replaces the sticker and the title steps down to a third-level heading, so the card stays in proportion."
            source={smallInACardSource}
          >
            <ErrorStateSmallInACard />
          </Example>

          <Example
            caption="Retry"
            description="Press Try again. The region shows a skeleton while it loads, then fails once more before it succeeds. The retry replaces the error where it stood, so the traveller never leaves the place they were looking."
            source={retrySource}
          >
            <ErrorStateRetry />
          </Example>
        </>
      }
      guidelines={guidelines}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['Tab'],
                description:
                  'Reaches the action buttons in order. Nothing else in the block takes focus.',
              },
            ]}
          />
          <p>
            The block is an <code>alert</code> labelled by its title, so it is
            announced when it appears, as when it replaces the content that
            failed, and a screen reader tells it apart from an empty state. The
            role cannot be changed. Everything else, from the heading level to
            the tab stops, is the empty state’s.
          </p>
        </>
      }
      api={
        <PropsTable
          component="ErrorState"
          description={
            <>
              Replaces <code>EmptyState</code> as the root and takes its props
              except <code>role</code>. Every other part is an empty-state part:{' '}
              <code>EmptyStateTitle</code>, <code>EmptyStateDescription</code>,{' '}
              <code>EmptyStateActions</code>, and the sticker or icon.
            </>
          }
          rows={[
            {
              name: 'size',
              type: 'EmptyStateSize',
              default: 'EmptyStateSize.Default',
              description:
                'Default for a page, Small for a block inside a card.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            The layout and colours are the empty state’s. The only difference in
            look is the sticker, which tilts right where an empty state tilts it
            left, and the only difference in behaviour is the{' '}
            <code>role="alert"</code> on the root.
          </p>
        </>
      }
      related={[
        {
          to: '/components/empty-state',
          label: 'Empty state',
          description:
            'The same block for a region that is legitimately empty.',
        },
        {
          to: '/components/alert',
          label: 'Alert',
          description: 'Where a form’s error appears.',
        },
        {
          to: '/components/notice',
          label: 'Notice',
          description: 'Where a result with no visible home appears.',
        },
        {
          to: '/principles',
          label: 'Principles',
          description: 'The feedback rule that ranks these homes.',
        },
      ]}
    />
  )
}
