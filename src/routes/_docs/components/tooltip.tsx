import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { TooltipDemo } from '@/examples/tooltip/demo'
import demoSource from '@/examples/tooltip/demo.tsx?raw'
import { TooltipFocusableChild } from '@/examples/tooltip/focusable-child'
import focusableChildSource from '@/examples/tooltip/focusable-child.tsx?raw'
import { TooltipKeyboardShortcut } from '@/examples/tooltip/keyboard-shortcut'
import keyboardShortcutSource from '@/examples/tooltip/keyboard-shortcut.tsx?raw'
import { TooltipPlacement } from '@/examples/tooltip/placement'
import placementSource from '@/examples/tooltip/placement.tsx?raw'
import usageSource from '@/examples/tooltip/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/tooltip')({
  component: TooltipPage,
})

function TooltipPage() {
  return (
    <DocPage
      title="Tooltip"
      lead="A short text label anchored to its trigger that never takes focus."
      preview={{ source: demoSource, demo: <TooltipDemo /> }}
      installation="tooltip"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Placement"
            description={
              <>
                <code>side</code> picks the edge and <code>align</code> lines
                the tooltip up along it. A tooltip that would leave the viewport
                flips to the other side.
              </>
            }
            source={placementSource}
          >
            <TooltipPlacement />
          </Example>

          <Example
            caption="A keyboard shortcut"
            description="Type the shortcut into the string. The tooltip is the one place a hint for a key belongs, and the label stays plain text."
            source={keyboardShortcutSource}
          >
            <TooltipKeyboardShortcut />
          </Example>

          <Example
            caption="Any focusable child"
            description={
              <>
                A tooltip wraps any single element, not only a Button, as long
                as the element is focusable. An Avatar takes no focus of its
                own, so this one adds <code>tabIndex</code> at the call site.
              </>
            }
            source={focusableChildSource}
          >
            <TooltipFocusableChild />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To name an icon-only control: "Add a place", "Share the trip".',
          'To add a keyboard shortcut to a label.',
          'To clarify something with one short sentence that the page can do without.',
        ],
        whenNotToUse: [
          {
            situation:
              'for an icon that only explains itself and is not a control. Icon tooltip makes it focusable and names it.',
            alternative: {
              to: '/components/icon-tooltip',
              label: 'Icon tooltip',
            },
          },
          {
            situation:
              'for a reason, a result, or an error. These must be seen, so they go on the page next to what they describe.',
            alternative: { to: '/components/notice', label: 'Notice' },
          },
          {
            situation:
              'for content with links, buttons, or images. A tooltip closes when the pointer leaves, so nothing inside it can be used.',
            alternative: { to: '/components/dialog', label: 'Dialog' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Keep the content supplementary, so the page still works without it.',
            reason:
              'A tooltip is not reachable on touch, and a screen reader that never focuses the trigger never hears it.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Give an icon-only button an aria-label as well as a tooltip.',
            reason:
              'The tooltip describes the trigger. The trigger keeps its own accessible name.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Wrap a disabled button.',
            reason:
              'A disabled button fires no pointer or focus events, so the tooltip never opens. The reason a control is disabled is essential, so write it next to the control.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Wrap an element that cannot take focus.',
            reason:
              'The component injects no tabIndex, so a keyboard traveller would never see the tooltip.',
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
                  'Moves focus onto the trigger, which opens the tooltip. Tabbing away closes it.',
              },
              {
                keys: ['Escape'],
                description:
                  'Closes the tooltip. Inside a dialog, it closes the tooltip before the dialog.',
              },
            ]}
          />
          <p>
            The tooltip never takes focus and draws no ring of its own; the
            trigger keeps whichever ring it already has. The pointer can cross
            the gap from the trigger onto the tooltip without closing it, and
            any pointer press closes it.
          </p>
          <p>
            The tooltip sets <code>aria-describedby</code> on the trigger and
            renders a node with <code>role=&quot;tooltip&quot;</code>, so the
            trigger keeps its own name and the tooltip only describes it.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="Tooltip"
            rows={[
              {
                name: 'content',
                type: 'string',
                required: true,
                description: 'The label. Text only.',
              },
              {
                name: 'children',
                type: 'ReactElement',
                required: true,
                description: 'One focusable element that anchors the tooltip.',
              },
              {
                name: 'side',
                type: 'TooltipSide',
                default: 'TooltipSide.Top',
                description:
                  'Which edge of the trigger the tooltip opens from. It flips when there is no room.',
              },
              {
                name: 'align',
                type: 'TooltipAlign',
                default: 'TooltipAlign.Center',
                description: 'How the tooltip lines up along that edge.',
              },
              {
                name: 'open',
                type: 'boolean',
                description: 'The controlled open state.',
              },
              {
                name: 'defaultOpen',
                type: 'boolean',
                default: 'false',
                description: 'The initial open state when uncontrolled.',
              },
              {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: 'Called when the tooltip opens or closes.',
              },
            ]}
          />
          <PropsTable
            component="TooltipProvider"
            description="Mount it once at the app root. It fixes the open delay for every tooltip."
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                required: true,
                description: 'The app.',
              },
            ]}
          />
        </>
      }
      notes={
        <>
          <p>
            <code>TooltipProvider</code> fixes a 500ms open delay and a 300ms
            skip delay. Hover the first icon above and count to the open; move
            to the next within 300ms of the first closing and it opens at once.
            The skip window is short on purpose: a longer one makes the delay
            feel arbitrary, because a hover after any recent close, including
            one a scroll caused, would skip the count while an isolated hover
            would not.
          </p>
          <p>
            Radix&rsquo;s hoverable-content grace area tracks the pointer
            through a <code>document</code> listener that resolves a frame late.
            A flick fast enough to fire only two or three pointer events across
            a row can leave the first tooltip stranded and the second unopened
            until the pointer moves again. Hoverable content stays on
            regardless, because WCAG 2.1 SC 1.4.13 requires that a pointer can
            move onto the tooltip without it disappearing.
          </p>
          <p>
            Touch and long-press are not supported. The chip inverts to{' '}
            <code>bg-foreground text-background</code> with no border and no
            arrow: orange-50 text on neutral-950, 17.20:1. It enters and exits
            on the floating anchored pair, scaling from 0.96 with the Radix
            popper transform origin, so content that flips still grows from its
            trigger. It sits 8px from the trigger.
          </p>
        </>
      }
      related={[
        {
          to: '/components/icon-tooltip',
          label: 'Icon tooltip',
          description: 'A focusable icon named by its own tooltip.',
        },
        {
          to: '/components/button',
          label: 'Button',
          description: 'The usual trigger, with an aria-label when icon-only.',
        },
        {
          to: '/components/avatar-group',
          label: 'Avatar group',
          description: 'Names each traveller with a tooltip.',
        },
        {
          to: '/accessibility',
          label: 'Accessibility',
          description:
            'Focus, keyboard, and contrast rules for every component.',
        },
      ]}
    />
  )
}
