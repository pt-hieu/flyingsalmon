import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { SidebarDemo } from '@/examples/sidebar/demo'
import demoSource from '@/examples/sidebar/demo.tsx?raw'
import { SidebarGroups } from '@/examples/sidebar/groups'
import groupsSource from '@/examples/sidebar/groups.tsx?raw'
import { SidebarNestedItems } from '@/examples/sidebar/nested-items'
import nestedItemsSource from '@/examples/sidebar/nested-items.tsx?raw'
import { SidebarStartsCollapsed } from '@/examples/sidebar/starts-collapsed'
import startsCollapsedSource from '@/examples/sidebar/starts-collapsed.tsx?raw'
import usageSource from '@/examples/sidebar/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/sidebar')({
  component: SidebarPage,
})

function SidebarPage() {
  return (
    <DocPage
      title="Sidebar"
      lead="The app's navigation and top bar in one component: a column that collapses to an icon rail and becomes a sticky strip on a narrow screen."
      preview={{ source: demoSource, demo: <SidebarDemo /> }}
      installation="sidebar"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Groups"
            description="A group label names a cluster of items. In the rail the label becomes a rule, so the groups still read as groups and the items below never jump. Collapse the sidebar to see it."
            source={groupsSource}
          >
            <SidebarGroups />
          </Example>

          <Example
            caption="Nested items"
            description="A parent is a page like any other, and its chevron opens the list of children. Close the list while Alfama is current and the bar springs up to Days."
            source={nestedItemsSource}
          >
            <SidebarNestedItems />
          </Example>

          <Example
            caption="Starting collapsed"
            description="defaultCollapsed opens the sidebar as a rail. Each icon shows its label in a tooltip on hover and on focus."
            source={startsCollapsedSource}
          >
            <SidebarStartsCollapsed />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'For the primary navigation of the app: a trip’s itinerary, places, budget, and travellers.',
          'As the app’s top bar. On a narrow screen the sidebar becomes the bar, so there is no separate header component to build.',
        ],
        whenNotToUse: [
          {
            situation:
              'to climb back up through a hierarchy within one section, because a sidebar moves between sections.',
            alternative: { to: '/components/breadcrumb', label: 'Breadcrumb' },
          },
          {
            situation:
              'to switch between peer panels on one page, because those are views of the same content rather than places.',
            alternative: { to: '/components/tabs', label: 'Tabs' },
          },
          {
            situation:
              'for a drawer of actions or a panel that is not navigation.',
            alternative: { to: '/components/drawer', label: 'Drawer' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Keep the sidebar mounted across routes by putting it in a persistent layout route.',
            reason:
              'The current-page bar slides between items only if the sidebar stays mounted. A sidebar that remounts on every navigation still works; it draws the bar in place instead of moving it there.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Give SidebarNav an aria-label.',
            reason:
              'The label tells a screen reader the app nav from any other nav on the page.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Swap header or footer content that is too wide for the rail on useSidebar().layout.',
            reason:
              'Header and footer are slots and the app owns them, so the sidebar cannot reshape what it does not know. The demo drops the trip name in the rail.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Pass a plain string as the item label.',
            reason:
              'The rail tooltip needs a string. An item whose children are markup keeps its own visible text in the rail instead of gaining a tooltip.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Mark the current page with anything but aria-current="page".',
            reason:
              'The item reads its active state from that attribute, on itself or on the element asChild renders, so a router link that already sets it needs nothing else.',
          },
        ],
      }}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['Tab', 'Shift+Tab'],
                description:
                  'Moves through the trigger, the items, and the footer controls. A nest parent is one stop and its chevron toggle is the next.',
              },
              {
                keys: ['Enter', 'Space'],
                description:
                  'Activates the focused item, toggles a nest, or collapses and expands the sidebar from the trigger.',
              },
              {
                keys: ['Escape'],
                description:
                  'In the strip, closes the navigation menu and returns focus to the trigger.',
              },
            ]}
          />
          <p>
            There are no arrow keys: these are links in a landmark, not a menu.{' '}
            <code>SidebarNav</code> is a <code>nav</code> and requires an{' '}
            <code>aria-label</code>. The trigger carries{' '}
            <code>aria-expanded</code> and <code>aria-controls</code> pointed at
            the aside, and is named &ldquo;Collapse sidebar&rdquo; or
            &ldquo;Expand sidebar&rdquo;. In the strip it is named &ldquo;Open
            navigation&rdquo;, carries{' '}
            <code>aria-haspopup=&quot;dialog&quot;</code>, and its{' '}
            <code>aria-expanded</code> follows the menu, a modal dialog titled
            &ldquo;Navigation&rdquo; that traps focus and hands it back to the
            trigger when it closes.
          </p>
          <p>
            A rail item&rsquo;s accessible name never depends on its tooltip:
            the label stays in the DOM, clipped rather than removed, so a screen
            reader reads the same nav in either layout. A nest toggle carries{' '}
            <code>aria-expanded</code> and <code>aria-controls</code> pointed at
            its list. A focused item takes the same <code>--accent</code>{' '}
            background as a hovered one and draws no ring, so the pointer and
            the keyboard land on the same mark; the current page keeps its own,
            the bar and the <code>--foreground</code> label, so the two stay
            distinguishable.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="SidebarProvider"
            description={
              <>
                Holds the collapsed state and the layout. Also takes every{' '}
                <code>&lt;div&gt;</code> attribute; size the sidebar and the
                pane through <code>className</code>.
              </>
            }
            rows={[
              {
                name: 'collapsed',
                type: 'boolean',
                description: 'Controls the collapsed state.',
              },
              {
                name: 'defaultCollapsed',
                type: 'boolean',
                default: 'false',
                description: 'The initial collapsed state when uncontrolled.',
              },
              {
                name: 'onCollapsedChange',
                type: '(collapsed: boolean) => void',
                description: 'Called when the trigger collapses or expands.',
              },
            ]}
          />
          <PropsTable
            component="SidebarItem"
            description={
              <>
                A navigation item. Also takes every <code>&lt;button&gt;</code>{' '}
                attribute.
              </>
            }
            rows={[
              {
                name: 'icon',
                type: 'ReactNode',
                description: 'The icon before the label.',
              },
              {
                name: 'asChild',
                type: 'boolean',
                default: 'false',
                description:
                  'Renders its single child, such as your router’s link, with the item styling and the label slotted into it.',
              },
              {
                name: 'aria-current',
                type: '"page" | undefined',
                description: 'Marks the current page and draws the bar.',
              },
            ]}
          />
          <PropsTable
            component="SidebarNest"
            description="Wraps a parent SidebarItem and a SidebarNestItems list."
            rows={[
              {
                name: 'open',
                type: 'boolean',
                description: 'Controls whether the list is open.',
              },
              {
                name: 'defaultOpen',
                type: 'boolean',
                default: 'false',
                description: 'The initial state when uncontrolled.',
              },
              {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: 'Called when the toggle opens or closes the list.',
              },
            ]}
          />
          <PropsTable
            component="SidebarNav"
            rows={[
              {
                name: 'aria-label',
                type: 'string',
                required: true,
                description: 'Names the nav landmark.',
              },
            ]}
          />
          <PropsTable
            component="SidebarTrigger"
            description={
              <>
                An outline icon button that collapses and expands the sidebar,
                or opens the menu in the strip. Also takes every{' '}
                <code>Button</code> prop except <code>variant</code>,{' '}
                <code>size</code>, <code>loading</code>, and <code>icon</code>.
              </>
            }
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                required: true,
                description:
                  'The glyph. The registry ships no icons, so you pass yours.',
              },
            ]}
          />
          <p>
            <code>useSidebar()</code> returns <code>collapsed</code>,{' '}
            <code>setCollapsed</code>, and <code>layout</code>, which is a{' '}
            <code>SidebarLayout</code>: <code>Expanded</code>,{' '}
            <code>Collapsed</code>, or <code>Strip</code>. The remaining parts (
            <code>Sidebar</code>, <code>SidebarHeader</code>,{' '}
            <code>SidebarContent</code>, <code>SidebarFooter</code>,{' '}
            <code>SidebarGroup</code>, <code>SidebarGroupLabel</code>,{' '}
            <code>SidebarNestItems</code>) take only their element&rsquo;s
            props.
          </p>
        </>
      }
      notes={
        <>
          <p>
            <code>SidebarProvider</code> matches a 700px media query through{' '}
            <code>matchMedia</code>. One <code>collapsed</code> boolean and that
            one threshold resolve all three layouts: expanded is the full
            column, collapsed is the icon rail, and strip is forced under the
            threshold whatever <code>collapsed</code> says. CSS paints the
            three, and <code>useSidebar().layout</code> reports which is live.{' '}
            <code>matchMedia</code> reads <code>sidebarStripThreshold</code>;
            the class names spell the same number as <code>min-[700px]:</code>,
            because Tailwind scans class names as literals and cannot read a
            JavaScript constant. The server has no viewport, so{' '}
            <code>layout</code> resolves at hydration and the aside leaves its
            width to CSS until it does.
          </p>
          <p>
            Every icon sits on one axis, the centre line of the rail, in both
            layouts: the trigger and the avatar button are 36px controls inside
            a 10px inset, and each item&rsquo;s icon sits 20px in. A label too
            long for the column ends in an ellipsis, as the Sintra day does in
            the demo. Collapsing moves only the aside&rsquo;s width, and the
            labels fade as the narrowing edge cuts them short, so nothing in the
            column shifts. A group label keeps its row and becomes a rule: the
            text fades out and a 1px <code>--border</code> line fades in across
            the same slot.
          </p>
          <p>
            Under 700px the aside becomes one sticky <code>top-0</code> row,{' '}
            <code>--bar-height</code> tall, with <code>border-b</code> in place
            of <code>border-r</code>. Header content leads, footer content
            trails, and the trigger moves to the trailing end.{' '}
            <code>SidebarContent</code> moves into the registry drawer on the
            right edge, laid out as the expanded column, and the trigger opens
            it instead of collapsing the column. Choosing an item, Escape, the
            close button, and a press outside all close it. The strip pads its
            sides by <code>--page-header-inset</code>, at least 12px, so setting
            that variable on the provider lines the strip&rsquo;s content up
            with the page title below it. Narrow the window below 700px and the
            demo above becomes the strip with no change to its markup.
          </p>
          <p>
            Idle items are <code>--muted-foreground</code> at 36px. Hover steps
            the background to <code>--accent</code> on the item&rsquo;s own{' '}
            <code>rounded-md</code> box, and the active item is{' '}
            <code>--foreground</code> in medium with its icon and a 2px bar both
            in <code>--indicator</code>. The bar sits outside the box, on the
            aside&rsquo;s own left edge, and is one shared{' '}
            <code>motion.span</code> that slides between items on{' '}
            <code>springBounce</code>. <code>SidebarContent</code> scrolls
            without a scrollbar and nudges the active item fully into view when
            it sits half outside the visible area.
          </p>
          <p>
            A nest&rsquo;s children carry the parent&rsquo;s styling on the same
            icon axis with no indent; a 1px <code>--border</code> line runs
            under the chevron from the top of the first child to the bottom of
            the last, and children end 7px short of it so a hover fill never
            crosses it. In the rail the line goes: the parent and its children
            share one <code>--muted</code> block, and the parent&rsquo;s icon
            gives way to the chevron on hover, so the whole cell toggles the
            list. A nest whose child becomes current opens itself.
          </p>
          <p>
            <code>--sidebar-width</code> is 18rem and{' '}
            <code>--sidebar-width-collapsed</code> is 3.5rem. Both are theme
            tokens, so a pane beside the sidebar can read them, and an override
            sets the variable on the sidebar or an ancestor rather than passing
            a prop. The component adds no colour tokens of its own; it paints{' '}
            <code>--background</code>, <code>--border</code>,{' '}
            <code>--accent</code>, <code>--indicator</code>, and{' '}
            <code>--ring</code>. The width morph runs on{' '}
            <code>springSettle</code> because it displaces the pane beside it,
            labels fade on <code>--motion-fast</code>, and the switch into the
            strip is a breakpoint and does not animate.
          </p>
        </>
      }
      related={[
        {
          to: '/components/page-header',
          label: 'Page header',
          description: 'Names the page in the pane beside the sidebar.',
        },
        {
          to: '/components/breadcrumb',
          label: 'Breadcrumb',
          description: 'Moves up within one section.',
        },
        {
          to: '/components/drawer',
          label: 'Drawer',
          description: 'The menu the strip opens.',
        },
        {
          to: '/components/tooltip',
          label: 'Tooltip',
          description: 'The label an icon shows in the rail.',
        },
      ]}
    />
  )
}
