import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { DropdownMenuDemo } from '@/examples/dropdown-menu/demo'
import demoSource from '@/examples/dropdown-menu/demo.tsx?raw'
import { DropdownMenuDisabledItem } from '@/examples/dropdown-menu/disabled-item'
import disabledItemSource from '@/examples/dropdown-menu/disabled-item.tsx?raw'
import { DropdownMenuGroups } from '@/examples/dropdown-menu/groups'
import groupsSource from '@/examples/dropdown-menu/groups.tsx?raw'
import { DropdownMenuNavigationItem } from '@/examples/dropdown-menu/navigation-item'
import navigationItemSource from '@/examples/dropdown-menu/navigation-item.tsx?raw'
import { DropdownMenuPlacement } from '@/examples/dropdown-menu/placement'
import placementSource from '@/examples/dropdown-menu/placement.tsx?raw'
import { DropdownMenuTripCardActions } from '@/examples/dropdown-menu/trip-card-actions'
import tripCardActionsSource from '@/examples/dropdown-menu/trip-card-actions.tsx?raw'
import usageSource from '@/examples/dropdown-menu/usage.tsx?raw'
import { DropdownMenuWithoutIcons } from '@/examples/dropdown-menu/without-icons'
import withoutIconsSource from '@/examples/dropdown-menu/without-icons.tsx?raw'

export const Route = createFileRoute('/_docs/components/dropdown-menu')({
  component: DropdownMenuPage,
})

function DropdownMenuPage() {
  return (
    <DocPage
      title="Dropdown menu"
      lead="A trigger opens a list of actions the traveller runs once: rename, duplicate, share, delete, or go somewhere."
      preview={{ source: demoSource, demo: <DropdownMenuDemo /> }}
      installation="dropdown-menu"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Without icons"
            description="An icon-free menu starts flush at the left edge, because the icon slot exists only on an item that gets an icon."
            source={withoutIconsSource}
          >
            <DropdownMenuWithoutIcons />
          </Example>

          <Example
            caption="Labelled groups"
            description={
              <>
                A group with a heading puts a <code>DropdownMenuLabel</code>{' '}
                first. A separator divides groups; the group itself has no
                visual of its own.
              </>
            }
            source={groupsSource}
          >
            <DropdownMenuGroups />
          </Example>

          <Example
            caption="A disabled item"
            description="The item stays in the list at half opacity and is skipped by the arrow keys, so the menu never shifts between opens."
            source={disabledItemSource}
          >
            <DropdownMenuDisabledItem />
          </Example>

          <Example
            caption="A navigation item"
            description={
              <>
                An action uses <code>onSelect</code>. An item that goes
                somewhere wraps your router&rsquo;s <code>Link</code> with{' '}
                <code>asChild</code>, so it has a real <code>href</code> and
                middle-click works.
              </>
            }
            source={navigationItemSource}
          >
            <DropdownMenuNavigationItem />
          </Example>

          <Example
            caption="Placement"
            description={
              <>
                <code>side</code> and <code>align</code> choose where the panel
                opens. Aligning to the end keeps a menu on the right edge of the
                page from running off it.
              </>
            }
            source={placementSource}
          >
            <DropdownMenuPlacement />
          </Example>

          <Example
            caption="Actions on a trip card"
            description="Duplicate adds a card straight away. Delete opens a confirmation, and the card disappears when it closes. Each result shows on the item that changed."
            source={tripCardActionsSource}
          >
            <DropdownMenuTripCardActions />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'For the actions on one item, gathered behind an overflow button: rename, duplicate, share, delete.',
          'For a short list of places to go from one trigger.',
        ],
        whenNotToUse: [
          {
            situation:
              'for settings that stay on or off. A menu closes on every choice, so a toggle belongs on the page.',
            alternative: { to: '/components/switch', label: 'Switch' },
          },
          {
            situation:
              'to pick a value for a field. A menu runs an action and a select holds a value.',
            alternative: { to: '/components/select', label: 'Select' },
          },
          {
            situation:
              'for one action with no siblings. A menu with a single item is a button with extra steps.',
            alternative: { to: '/components/button', label: 'Button' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Show the result on the item the action changed.',
            reason:
              'The menu closes on select, so the traveller is looking at the item again. A duplicated trip appearing in the list is the confirmation. When the item has no visible home, a notice carries the result.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Open a confirmation dialog from a destructive item.',
            reason:
              'The menu offers the choice and the dialog asks for the decision, so one stray click cannot delete a trip.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Give every item in a menu an icon, or none of them.',
            reason:
              'Mixing the two leaves the labels ragged, because only an item with an icon renders the slot.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Label the trigger when it is an icon button.',
            reason:
              'The ellipsis alone says nothing to a screen reader. Name what the menu acts on: "Actions for Kyoto in autumn".',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Add checkbox items, radio items, or a submenu.',
            reason:
              'The menu is for actions only. A choice that persists belongs on the page as a field.',
          },
        ],
      }}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['Enter', 'Space', 'ArrowDown'],
                description:
                  'On the trigger, opens the menu with the first item highlighted. A pointer click opens it with no item highlighted.',
              },
              {
                keys: ['ArrowUp', 'ArrowDown'],
                description:
                  'Moves the highlight. It stops at the first and last item rather than wrapping.',
              },
              {
                keys: ['Home', 'End'],
                description: 'Jumps to the first or last item.',
              },
              {
                keys: ['Enter', 'Space'],
                description: 'On an item, runs it and closes the menu.',
              },
              {
                keys: ['Escape'],
                description:
                  'Closes the menu and returns focus to the trigger.',
              },
            ]}
          />
          <p>
            Typing a letter jumps to the next item starting with it. Tab does
            nothing inside the menu, and disabled items are skipped. An outside
            click closes the menu and returns focus to the trigger, including
            after a link item navigates.
          </p>
          <p>
            The trigger exposes <code>aria-haspopup=&quot;menu&quot;</code> and{' '}
            <code>aria-expanded</code>. The highlight moves with focus and is
            the focus indicator, so an item draws no ring of its own.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="DropdownMenu"
            description="The root. It takes the Radix root's props except modal, which is always on."
            rows={[
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
                description: 'Called when the menu opens or closes.',
              },
            ]}
          />
          <PropsTable
            component="DropdownMenuTrigger"
            rows={[
              {
                name: 'children',
                type: 'ReactElement',
                required: true,
                description:
                  'One element, a registry Button, that opens the menu.',
              },
            ]}
          />
          <PropsTable
            component="DropdownMenuContent"
            description="The panel. Everything else about its positioning is fixed."
            rows={[
              {
                name: 'side',
                type: 'DropdownMenuSide',
                default: 'DropdownMenuSide.Bottom',
                description:
                  'Which edge of the trigger the panel opens from. It flips when there is no room.',
              },
              {
                name: 'align',
                type: 'DropdownMenuAlign',
                default: 'DropdownMenuAlign.Center',
                description: 'How the panel lines up along that edge.',
              },
            ]}
          />
          <PropsTable
            component="DropdownMenuItem"
            rows={[
              {
                name: 'variant',
                type: 'DropdownMenuItemVariant',
                default: 'DropdownMenuItemVariant.Default',
                description:
                  'Destructive marks an item that removes something.',
              },
              {
                name: 'icon',
                type: 'ReactNode',
                description:
                  'Fills the slot before the label. Give every item an icon or none.',
              },
              {
                name: 'onSelect',
                type: '(event: Event) => void',
                description: 'Runs the action. The menu closes after it.',
              },
              {
                name: 'asChild',
                type: 'boolean',
                default: 'false',
                description:
                  'Renders your element, such as a router Link, in place of the item.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description:
                  'Dims the item, skips it in the arrow path, and ignores selection.',
              },
            ]}
          />
          <p>
            <code>DropdownMenuGroup</code>, <code>DropdownMenuLabel</code>,{' '}
            <code>DropdownMenuSeparator</code>, and{' '}
            <code>DropdownMenuShortcut</code> take the props of the element they
            render. <code>DropdownMenuShortcut</code> only displays a hint at
            the trailing edge: the menu binds no key, so your app owns the
            shortcut.
          </p>
        </>
      }
      notes={
        <>
          <p>
            The trigger forces <code>asChild</code> and takes exactly one
            registry Button, the same rule as the dialog. With{' '}
            <code>asChild</code> on an item that has an icon, the item renders
            the slot and then its children inside Radix{' '}
            <code>Slot.Slottable</code>, so the icon lands inside the link
            beside its own text.
          </p>
          <p>
            Radix merges hover and keyboard focus into one{' '}
            <code>data-highlighted</code> state: a background step to{' '}
            <code>--accent</code>, or to <code>--error</code> for a destructive
            item. The highlight snaps with no transition, because a fade smears
            while arrowing quickly and native menus snap. The panel itself takes{' '}
            <code>outline-hidden</code> for the pointer-opened case, where Radix
            focuses the panel rather than an item.
          </p>
          <p>
            There is one size: a 32px item in a panel with 4px padding and a{' '}
            <code>min-w-32</code> floor. The panel caps its height to
            Radix&rsquo;s available-height variable and scrolls internally, so a
            long list never leaves the viewport. <code>loop</code> is off, so
            ArrowDown on the last item stays put, as in macOS menus.
          </p>
          <p>
            Enter scales from 0.96 with a fade over 250ms on the bounce curve,
            from the Radix popper transform origin so a flipped panel still
            grows from its trigger. Exit runs 350ms on the settle curve. The
            highlight carries no animation.
          </p>
        </>
      }
      related={[
        {
          to: '/components/dialog',
          label: 'Dialog',
          description: 'Confirms a destructive item before it runs.',
        },
        {
          to: '/components/select',
          label: 'Select',
          description:
            'Picks a value for a field instead of running an action.',
        },
        {
          to: '/components/button',
          label: 'Button',
          description: 'The trigger, and the home of a single action.',
        },
        {
          to: '/principles',
          label: 'Principles',
          description: 'Where a result belongs once the menu has closed.',
        },
      ]}
    />
  )
}
