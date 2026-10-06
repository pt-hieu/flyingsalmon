import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { TimelineDemo } from '@/examples/timeline/demo'
import demoSource from '@/examples/timeline/demo.tsx?raw'
import { TimelineHorizontal } from '@/examples/timeline/horizontal'
import horizontalSource from '@/examples/timeline/horizontal.tsx?raw'
import { TimelineLinkedTitle } from '@/examples/timeline/linked-title'
import linkedTitleSource from '@/examples/timeline/linked-title.tsx?raw'
import { TimelineMarkerSizes } from '@/examples/timeline/marker-sizes'
import markerSizesSource from '@/examples/timeline/marker-sizes.tsx?raw'
import { TimelineMovingCurrentMarker } from '@/examples/timeline/moving-current-marker'
import movingCurrentMarkerSource from '@/examples/timeline/moving-current-marker.tsx?raw'
import { TimelineSpacing } from '@/examples/timeline/spacing'
import spacingSource from '@/examples/timeline/spacing.tsx?raw'
import { TimelineStrip } from '@/examples/timeline/strip'
import stripSource from '@/examples/timeline/strip.tsx?raw'
import usageSource from '@/examples/timeline/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/timeline')({
  component: TimelinePage,
})

function TimelinePage() {
  return (
    <DocPage
      title="Timeline"
      lead="A timeline places markers in a sequence, joins them with a connector, and puts content beside each one."
      preview={{ source: demoSource, demo: <TimelineDemo /> }}
      installation="timeline"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Marker sizes"
            description="A marker is a slot. Empty, it draws a neutral dot; with an icon, a bordered circle. Small markers suit the legs between places, and both sizes centre on the same line, so the connector stays straight."
            source={markerSizesSource}
          >
            <TimelineMarkerSizes />
          </Example>

          <Example
            caption="Linked title"
            description="Put an anchor in the title and it takes the underline, the colour, and the hover. Add the offset focus ring from the interaction lib to the anchor; the timeline itself stays free of that dependency."
            source={linkedTitleSource}
          >
            <TimelineLinkedTitle />
          </Example>

          <Example
            caption="Horizontal"
            description="Content sits below the marker and every item takes an equal share of the width, so markers stay evenly spaced however long the content runs."
            source={horizontalSource}
          >
            <TimelineHorizontal />
          </Example>

          <Example
            caption="Strip"
            description="A strip is a horizontal timeline whose items leave out TimelineContent. There is no separate component and no hidden-content mode."
            source={stripSource}
          >
            <TimelineStrip />
          </Example>

          <Example
            caption="Spacing"
            description="The gap between items comes from --timeline-spacing on the root, and the connectors that bridge the gaps follow it. Set it with className."
            source={spacingSource}
          >
            <TimelineSpacing />
          </Example>

          <Example
            caption="A moving current marker"
            description="The timeline owns no animation. To make the current marker travel between days, render a motion element with a shared layoutId inside the current item’s marker. Mount the timeline in the app shell, because the marker only travels when the one it leaves and the one it enters render together, and wrap it in a LayoutGroup with a unique id so two timelines on one page never trade markers. Press Next day."
            source={movingCurrentMarkerSource}
          >
            <TimelineMovingCurrentMarker />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To show a route or an itinerary: cities, legs between them, days of a trip.',
          'When each item has a title and a line of detail that belong beside its marker.',
        ],
        whenNotToUse: [
          {
            situation:
              'to show a position in a sequence of known length with no content beside it, because a stepper tracks progress.',
            alternative: { to: '/components/stepper', label: 'Stepper' },
          },
          {
            situation:
              'to compare the same fields across items, because columns line up what a rail cannot.',
            alternative: { to: '/components/table', label: 'Table' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Let the marker say what kind of stop it is, and give every stop of one kind the same marker: an icon for a leg, a dot for a place.',
            reason:
              'The traveller reads the rhythm of the route from its markers before reading a word.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Mark the current stop with a marker of your own, and let it travel to the next stop when the traveller moves on.',
            reason:
              'The rail gives every stop the same neutral mark, because done, current, and ahead are claims only your app can make. A marker that travels shows the move instead of redrawing the rail.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Put an action on each stop. The action the route leads to, such as approving it, sits below the whole timeline.',
            reason:
              'A route is read top to bottom and then acted on once. Buttons on every stop turn it into a list of chores.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Stretch a link over a whole item.',
            reason:
              'An item is never a hit target; only its title links. One linked title costs the keyboard user one stop, however many cities the rail holds.',
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
                  'Reaches one stop per linked title, in document order. Nothing else in the timeline is focusable.',
              },
              {
                keys: ['Enter'],
                description: 'Follows the focused link in a title.',
              },
            ]}
          />
          <p>
            The root is an <code>ol</code> and every item an <code>li</code>, so
            a screen reader announces the order and the count with no extra
            ARIA. The connector is hidden from assistive technology. Icons you
            put in a marker should be decorative too, because the title beside
            the marker already names the stop.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="Timeline"
            description={
              <>
                Also takes every <code>&lt;ol&gt;</code> attribute. Every part
                carries a <code>data-slot</code>, and the root exposes{' '}
                <code>data-orientation</code> for styling around it.
              </>
            }
            rows={[
              {
                name: 'orientation',
                type: 'TimelineOrientation',
                default: 'TimelineOrientation.Vertical',
                description:
                  'Vertical puts content beside the marker. Horizontal puts it below and shares the width equally.',
              },
            ]}
          />
          <PropsTable
            component="TimelineMarker"
            description={
              <>
                Also takes every <code>&lt;span&gt;</code> attribute. It draws
                the connector to the next item; the last item and an item with
                no marker have none. It has no status or active state: paint a
                current marker through its children.
              </>
            }
            rows={[
              {
                name: 'size',
                type: 'TimelineMarkerSize',
                default: 'TimelineMarkerSize.Default',
                description:
                  'Default or Small. Both centre on the same line, so a vertical rail can mix them. A horizontal timeline uses one size throughout: each connector spans from its own marker’s edge, so mixed sizes overshoot at one end.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                description:
                  'An icon or a custom mark. Empty, the marker draws a neutral dot.',
              },
            ]}
          />
          <p>
            <code>TimelineItem</code> takes the <code>&lt;li&gt;</code> props.{' '}
            <code>TimelineContent</code>, <code>TimelineTitle</code>, and{' '}
            <code>TimelineDescription</code> take the <code>&lt;div&gt;</code>{' '}
            props; title and description mirror the card’s typography.
          </p>
        </>
      }
      notes={
        <>
          <p>
            The default marker is a 24px box holding a 16px icon, or a 12px dot
            when empty. The small marker is a 16px box holding a 12px icon, or
            an 8px dot. The gap between a marker and its content is 12px. The
            gap between items is <code>--timeline-spacing</code>,{' '}
            <code>--spacing(6)</code> by default.
          </p>
          <p>
            The timeline never reads the sidebar context. A rail that follows
            the shell takes its orientation from you: read{' '}
            <code>useSidebar().layout</code> and pass the matching{' '}
            <code>TimelineOrientation</code> down.
          </p>
          <p>
            A moving marker uses a <code>motion.span</code> with a shared{' '}
            <code>layoutId</code> on the bounce spring, the same mechanism as
            the sidebar’s active bar.
          </p>
          <p>
            The empty marker’s dot is <code>--muted-foreground</code> on{' '}
            <code>--background</code> at 7.01:1, against the 3:1 a non-text
            graphic needs. An icon marker draws a 1px <code>--border</code>{' '}
            circle and puts the icon in <code>--foreground</code> at 17.20:1, so
            the icon carries the contrast and the circle carries nothing. The
            connector is 2px of <code>--border</code> at 1.28:1; it is
            decorative and exempt, because it says only what the markers and the
            content already say.
          </p>
          <p>
            The title is <code>--foreground</code> at 17.20:1 and the
            description <code>--muted-foreground</code> at 7.01:1. A link in the
            title stays <code>--foreground</code> in every state with a
            permanent underline: 1px <code>--muted-foreground</code> at rest,
            stepping to 1.5px <code>--foreground</code> on hover and press: the
            text link&rsquo;s weights in neutral colours instead of orange.
          </p>
        </>
      }
      related={[
        {
          to: '/components/stepper',
          label: 'Stepper',
          description:
            'Tracks progress through a sequence with no content beside it.',
        },
        {
          to: '/components/table',
          label: 'Table',
          description: 'Compares the same fields across many items.',
        },
        {
          to: '/components/text-link',
          label: 'Text link',
          description:
            'The link inside a sentence, whose underline weights a linked title shares.',
        },
        {
          to: '/motion',
          label: 'Motion',
          description: 'The bounce spring a moving marker uses.',
        },
      ]}
    />
  )
}
