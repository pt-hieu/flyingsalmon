import { createFileRoute, Link } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { TabsAutomaticActivation } from '@/examples/tabs/automatic-activation'
import automaticActivationSource from '@/examples/tabs/automatic-activation.tsx?raw'
import { TabsDemo } from '@/examples/tabs/demo'
import demoSource from '@/examples/tabs/demo.tsx?raw'
import { TabsDisabledTrigger } from '@/examples/tabs/disabled-trigger'
import disabledTriggerSource from '@/examples/tabs/disabled-trigger.tsx?raw'
import { TabsKeepPanelState } from '@/examples/tabs/keep-panel-state'
import keepPanelStateSource from '@/examples/tabs/keep-panel-state.tsx?raw'
import { TabsManualActivation } from '@/examples/tabs/manual-activation'
import manualActivationSource from '@/examples/tabs/manual-activation.tsx?raw'
import usageSource from '@/examples/tabs/usage.tsx?raw'

import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/tabs')({
  component: TabsPage,
})

function TabsPage() {
  return (
    <DocPage
      title="Tabs"
      lead="Tabs switch between co-equal panels on one page: the tabs own the switch and your app owns the content."
      preview={{ source: demoSource, demo: <TabsDemo /> }}
      installation="tabs"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Automatic activation"
            description="The default. Focus the list and use the arrow keys: focus moves and the panel switches at once. That is safe because these panels are local content that does not fetch on mount."
            source={automaticActivationSource}
          >
            <TabsAutomaticActivation />
          </Example>

          <Example
            caption="Manual activation"
            description="Use it when a panel is expensive to mount. Arrow to another tab and a thin bar marks the focused one; press Enter or Space to open it."
            source={manualActivationSource}
          >
            <TabsManualActivation />
          </Example>

          <Example
            caption="Disabled tab"
            description="A disabled tab dims, takes no pointer events, and is skipped by the arrow keys."
            source={disabledTriggerSource}
          >
            <TabsDisabledTrigger />
          </Example>

          <Example
            caption="Keeping a panel's state"
            description="Type in the note, switch tabs, and come back. forceMount keeps that panel alive across switches; the other panel unmounts as usual."
            source={keepPanelStateSource}
          >
            <TabsKeepPanelState />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To switch between two to five views of the same thing, such as a trip’s itinerary, places, and travellers.',
          'When the traveller should see one view at a time and move between them without leaving the page.',
        ],
        whenNotToUse: [
          {
            situation:
              'to move between pages. Tabs switch panels in place and do not change the address.',
            alternative: { to: '/components/sidebar', label: 'Sidebar' },
          },
          {
            situation:
              'to answer a question or filter a list. A single-mode toggle group is the control for choosing, and it can return to empty.',
            alternative: {
              to: '/components/toggle-group',
              label: 'Toggle group',
            },
          },
          {
            situation:
              'to reveal content under a heading while keeping the others visible, so several sections can be open together.',
            alternative: { to: '/components/accordion', label: 'Accordion' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Keep tab labels to one or two words.',
            reason:
              'The tabs sit in one row with no wrapping, so short labels keep every tab in view.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Use forceMount on a panel that holds typed input or a scroll position.',
            reason:
              'Panels unmount when inactive, so without it the traveller loses a half-typed field on every switch.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Hide a tab to remove it. Disable it.',
            reason:
              'A tab that disappears shifts the others. A disabled tab says the view exists but is unavailable.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Put tabs inside a tab panel.',
            reason:
              'Two rows of tabs make the traveller track two places at once. Split the content across pages instead.',
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
                  'Moves focus onto the active tab, then into its panel. Disabled tabs are skipped.',
              },
              {
                keys: ['ArrowLeft', 'ArrowRight'],
                description:
                  'Moves focus between tabs. With automatic activation the panel switches too; with manual activation focus moves alone.',
              },
              {
                keys: ['Home', 'End'],
                description: 'Moves focus to the first or the last tab.',
              },
              {
                keys: ['Enter', 'Space'],
                description:
                  'Opens the focused tab under manual activation. Under automatic activation the tab is already open.',
              },
            ]}
          />
          <p>
            Tabs draw no focus ring. Their own indicator moves with focus
            instead: under automatic activation focus and selection coincide, so
            the moving bar under the active tab is the focus cue, and under
            manual activation a thin bar marks the focused tab while it differs
            from the active one. The{' '}
            <TextLink asChild>
              <Link to="/accessibility">accessibility page</Link>
            </TextLink>{' '}
            covers the rules every component follows.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="Tabs"
            description="Every other prop passes through to the Radix tabs root. There is no variant, size, or orientation: tabs are underlined, horizontal, and one size matching the default button."
            rows={[
              {
                name: 'value',
                type: 'string',
                description: 'The active tab when the app controls it.',
              },
              {
                name: 'defaultValue',
                type: 'string',
                description:
                  'The starting tab when the app does not control it.',
              },
              {
                name: 'onValueChange',
                type: '(value: string) => void',
                description: 'Called with the value of the newly active tab.',
              },
              {
                name: 'activationMode',
                type: 'TabsActivationMode',
                default: 'TabsActivationMode.Automatic',
                description:
                  'Automatic opens a tab as focus reaches it. Manual waits for Enter or Space.',
              },
            ]}
          />
          <PropsTable
            component="TabsTrigger"
            description="Also takes the Radix trigger's own props. TabsList and the other parts only take their element's props."
            rows={[
              {
                name: 'value',
                type: 'string',
                required: true,
                description:
                  'Ties the tab to the TabsContent with the same value.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Dims the tab and skips it in the arrow order.',
              },
            ]}
          />
          <PropsTable
            component="TabsContent"
            rows={[
              {
                name: 'value',
                type: 'string',
                required: true,
                description: 'The tab this panel belongs to.',
              },
              {
                name: 'forceMount',
                type: 'boolean',
                default: 'false',
                description:
                  'Keeps the panel in the DOM while inactive, hidden from the accessibility tree and the tab order, so its state survives a switch.',
              },
            ]}
          />
        </>
      }
      notes={
        <>
          <p>
            Tabs export four parts: <code>Tabs</code>, <code>TabsList</code>,{' '}
            <code>TabsTrigger</code>, and <code>TabsContent</code>. The sliding
            indicator lives inside <code>TabsTrigger</code> and is never
            exported, so a consumer cannot place it wrong.
          </p>
          <p>
            Inactive labels are <code>--muted-foreground</code> and the active
            label is <code>--foreground</code> over a 2px{' '}
            <code>--indicator</code> bar. Hover steps an inactive label to{' '}
            <code>--foreground</code> in CSS at <code>--motion-fast</code>, with
            no fill and no border change. A click moves the indicator at once,
            so a press ring would fire and be overtaken by the slide, and there
            is none. A disabled tab dims to half opacity.
          </p>
          <p>
            Measured contrast: the inactive label is 7.01:1 and the focus bar
            17.20:1, both clearing WCAG AA. The active bar in{' '}
            <code>--indicator</code> is 3.38:1, clearing the 3:1 non-text bar.
            The focus bar is 1px and uses <code>--ring</code>.
          </p>
          <p>
            Panels unmount when inactive and carry no animation. A force-mounted
            inactive panel is hidden from the accessibility tree and the tab
            order rather than removed from the DOM. Automatic activation can
            replay a switch on every arrow key across a long set of tabs, and
            animating that would read as flicker.
          </p>
          <p>
            The active indicator is one shared <code>motion.span</code> with a{' '}
            <code>layoutId</code>, rendered only inside the active tab and
            animated with <code>layout</code> on <code>springBounce</code>. The
            focus bar is a second, independent <code>layoutId</code> group on
            the same preset, so the two never interfere. The label colour
            crossfades separately in CSS at <code>--motion-fast</code>.
          </p>
        </>
      }
      related={[
        {
          to: '/components/toggle-group',
          label: 'Toggle group',
          description: 'The control for choosing, where tabs navigate.',
        },
        {
          to: '/components/accordion',
          label: 'Accordion',
          description:
            'Sections that open in place and can stay open together.',
        },
        {
          to: '/components/breadcrumb',
          label: 'Breadcrumb',
          description: 'Shows where the traveller is across pages.',
        },
        {
          to: '/motion',
          label: 'Motion',
          description: 'The spring presets behind the sliding indicator.',
        },
      ]}
    />
  )
}
