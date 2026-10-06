import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
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
      guidelines={{
        whenToUse: [
          'When a region that was meant to fill could not: the places did not load, the trip failed to plan.',
          'As the failed state of the affected item, with a retry where the traveller is already looking.',
        ],
        whenNotToUse: [
          {
            situation:
              'for a form’s error. It belongs to the acting surface, in the form’s result slot.',
            alternative: { to: '/components/alert', label: 'Alert' },
          },
          {
            situation:
              'for a result with no visible home, such as a dialog form that has closed.',
            alternative: { to: '/components/notice', label: 'Notice' },
          },
          {
            situation:
              'when the region is legitimately empty and nothing went wrong.',
            alternative: {
              to: '/components/empty-state',
              label: 'Empty state',
            },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Say what happened and what was kept, then offer a retry and a way back to the input.',
            reason:
              'The traveller needs to know nothing was lost before they will try again.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Make retry the filled action, and let it show its own loading while the block stays in place. When a retry costs credits, the button says how many.',
            reason:
              'The traveller sees the attempt running where they pressed, and knows the price before they pay it.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Add red, an error icon, or an alert inside the block. A failure looks like an empty state with its own sticker and title.',
            reason:
              'Plain words and a broken-thing sticker say something went wrong. Red on top turns a failure the traveller can recover from into an alarm.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Shrink a failed region to a banner. The block takes the place of the content that failed, at its size.',
            reason:
              'The traveller looks for the content where it belongs, and finds the failure and its retry there.',
          },
        ],
      }}
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
