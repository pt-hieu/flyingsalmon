import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  PropsTable,
} from '@/components/doc-page'
import { PageHeaderBesideSidebar } from '@/examples/page-header/beside-sidebar'
import besideSidebarSource from '@/examples/page-header/beside-sidebar.tsx?raw'
import { PageHeaderContentWidth } from '@/examples/page-header/content-width'
import contentWidthSource from '@/examples/page-header/content-width.tsx?raw'
import { PageHeaderDemo } from '@/examples/page-header/demo'
import demoSource from '@/examples/page-header/demo.tsx?raw'
import { PageHeaderLongTitle } from '@/examples/page-header/long-title'
import longTitleSource from '@/examples/page-header/long-title.tsx?raw'
import { PageHeaderTitleOnly } from '@/examples/page-header/title-only'
import titleOnlySource from '@/examples/page-header/title-only.tsx?raw'
import usageSource from '@/examples/page-header/usage.tsx?raw'
import { PageHeaderWrapping } from '@/examples/page-header/wrapping'
import wrappingSource from '@/examples/page-header/wrapping.tsx?raw'

export const Route = createFileRoute('/_docs/components/page-header')({
  component: PageHeaderPage,
})

function PageHeaderPage() {
  return (
    <DocPage
      title="Page header"
      lead="A page's title and the actions that act on the whole page, nothing else, so every page gets the same heading."
      preview={{ source: demoSource, demo: <PageHeaderDemo /> }}
      installation="page-header"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Title only"
            description="The actions are optional. A page with nothing to do on the whole page renders the title and its rule."
            source={titleOnlySource}
          >
            <PageHeaderTitleOnly />
          </Example>

          <Example
            caption="Wrapping"
            description="The title and actions share one row for as long as they fit. In the narrow container the actions move under the title, left-aligned. The header follows its own width, not the viewport's."
            source={wrappingSource}
          >
            <PageHeaderWrapping />
          </Example>

          <Example
            caption="Long titles"
            description="A long title wraps with balanced lines and never truncates, because the title is the page's name. The actions stay centred on the title's first line."
            source={longTitleSource}
          >
            <PageHeaderLongTitle />
          </Example>

          <Example
            caption="Content width"
            description="On a wide screen the title and actions sit in a row no wider than the page body's column, and the bottom rule still runs the full width."
            source={contentWidthSource}
          >
            <PageHeaderContentWidth />
          </Example>

          <Example
            caption="Beside the sidebar"
            description="The sidebar names the app and the page header names the page. The wordmark, the title, and any actions sharing its row sit on one centre line. Collapse the sidebar and the wider pane lets the actions join the title's row."
            source={besideSidebarSource}
          >
            <PageHeaderBesideSidebar />
          </Example>

          <Example
            caption="Under the sidebar strip"
            description="Under a 700px viewport the sidebar becomes a strip across the top and the page header sits directly beneath it with the same markup. The frame is 384px wide, so it renders the strip the way a phone does."
            source={besideSidebarSource}
          >
            <iframe
              title="Page header under the sidebar strip"
              src="/frames/page-header-strip"
              className="border-border h-144 w-96 rounded-lg border"
            />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To name a page and hold the actions that act on all of it: the trips list with "Plan a new trip", a trip with "Share" and "Book stays".',
          'At the top of the pane, inside main, on every page that has a title.',
        ],
        whenNotToUse: [
          {
            situation:
              "for the app's top bar and navigation. The sidebar is both, and the page header only names the page in the pane beside it.",
            alternative: { to: '/components/sidebar', label: 'Sidebar' },
          },
          {
            situation:
              'to show where the page sits in a hierarchy, because the header holds no trail.',
            alternative: { to: '/components/breadcrumb', label: 'Breadcrumb' },
          },
          {
            situation:
              'for the actions on one card or one row, because the header is for the whole page.',
            alternative: { to: '/components/button', label: 'Button' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Keep the header to the title and the actions on the whole page. Put the description, the status, and where the page came from below it, as muted text in the page body.',
            reason:
              'Every page then opens with the same heading, and the facts about one page read as its content rather than as chrome.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Give the header one primary action. A second action is a secondary button, and the rest go in a dropdown menu.',
            reason:
              'One filled orange button says what the page is for. A row of equal buttons makes the traveller choose before they have read the page.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Repeat an empty page’s call to action in the header.',
            reason:
              'The empty state owns the one action on an empty page, where the traveller is already looking. Show the header action once the page has content.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Resize the title for one page.',
            reason:
              'Every page title is the same size, so the app speaks in one voice. A page that needs more emphasis gets it from its content.',
          },
        ],
      }}
      accessibility={
        <>
          <p>
            The header has no states and no keyboard path of its own. The title
            is the page&rsquo;s one <code>h1</code>, and Tab reaches the actions
            in the order you write them and nothing else. Nothing animates,
            including the actions wrapping: a layout change at a breakpoint is
            not feedback.
          </p>
          <p>
            Place <code>PageHeader</code> inside <code>main</code>. A{' '}
            <code>header</code> outside it becomes a banner landmark and
            competes with the app shell&rsquo;s own.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="PageHeader"
            description={
              <>
                Renders a <code>header</code> around one row. Takes every{' '}
                <code>&lt;header&gt;</code> attribute.
              </>
            }
            rows={[
              {
                name: '--page-header-max-width',
                type: 'CSS variable',
                default: 'none',
                description:
                  'Caps the row to the width of the page body’s column. Set it on the header or an ancestor.',
              },
              {
                name: '--page-header-inset',
                type: 'CSS variable',
                default: '0',
                description:
                  'The side padding of the pane the header sits in. The header bleeds out by that much and pads back in, so the rule meets both edges.',
              },
            ]}
          />
          <PropsTable
            component="PageHeaderTitle"
            description={
              <>
                The page&rsquo;s one <code>h1</code>. Takes every{' '}
                <code>&lt;h1&gt;</code> attribute and has no size prop.
              </>
            }
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                required: true,
                description: 'The page’s name.',
              },
            ]}
          />
          <p>
            <code>PageHeaderActions</code> takes every <code>&lt;div&gt;</code>{' '}
            attribute and holds the buttons that act on the whole page. It has
            no overflow menu: when the page has more actions than fit, pass a{' '}
            <code>DropdownMenu</code> as one of its children.
          </p>
        </>
      }
      notes={
        <>
          <p>
            The actions move under the title only when the title would otherwise
            get narrower than 256px. The header measures its own width: at{' '}
            <code>@3xl</code> (768px) and wider the title is{' '}
            <code>text-6xl</code>, narrower it is <code>text-4xl</code>. Several
            actions wrap among themselves at <code>gap-2</code>. A title uses{' '}
            <code>text-balance</code> and the actions stay centred on its first
            line, so they sit where the eye starts reading.
          </p>
          <p>
            <code>--page-header-max-width</code> defaults to <code>none</code>.
            The title size still follows the header&rsquo;s own width, not the
            row&rsquo;s. The content-width example caps its row at{' '}
            <code>--spacing(160)</code>.
          </p>
          <p>
            The sidebar and the page header both read the theme&rsquo;s{' '}
            <code>--bar-height</code>: the sidebar header is that tall and the
            title pads its first line to the same band. Put the header at the
            top of the pane with no padding above it and the centre line holds
            at both title sizes. Set <code>--page-header-inset</code> to the
            pane&rsquo;s side padding, as the sidebar example does with{' '}
            <code>[--page-header-inset:--spacing(6)]</code> on its provider
            beside the pane&rsquo;s <code>px-6</code>.
          </p>
          <p>
            Under a 700px viewport the sidebar strip pads its sides by{' '}
            <code>--page-header-inset</code>, so with the variable set on the
            sidebar&rsquo;s provider its content starts on the title&rsquo;s
            left edge and its trigger ends on the header&rsquo;s right one. The
            header then stacks between two rules: the strip&rsquo;s above the
            title&rsquo;s band, its own below the last band. In a phone-width
            pane the title takes the row and the actions wrap under it into
            their own band.
          </p>
          <p>
            The header adds no margin around itself unless it is inset; the
            page&rsquo;s layout gap places it. It closes with a 1px{' '}
            <code>--border</code> rule at the bottom of its last band. The
            title&rsquo;s band pads its line equally above and below, so the gap
            from the top of the header to the capitals matches the gap from the
            baseline to the rule: about 24px at <code>text-4xl</code> and 16px
            at <code>text-6xl</code>.
          </p>
          <p>
            The title is <code>--foreground</code>: 17.20:1 on{' '}
            <code>--background</code> and 18.25:1 on <code>--card</code>. The
            rule is decorative, because the title names the page without it.
          </p>
        </>
      }
      related={[
        {
          to: '/components/sidebar',
          label: 'Sidebar',
          description: 'The top bar and navigation beside the header.',
        },
        {
          to: '/components/breadcrumb',
          label: 'Breadcrumb',
          description: 'The trail of ancestors above a page title.',
        },
        {
          to: '/components/button',
          label: 'Button',
          description: 'The control the header’s actions are made of.',
        },
        {
          to: '/typography',
          label: 'Typography',
          description: 'The heading face the title is set in.',
        },
      ]}
    />
  )
}
