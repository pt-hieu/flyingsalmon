import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { PaginationCompact } from '@/examples/pagination/compact'
import compactSource from '@/examples/pagination/compact.tsx?raw'
import { PaginationCustomLabel } from '@/examples/pagination/custom-label'
import customLabelSource from '@/examples/pagination/custom-label.tsx?raw'
import { PaginationDemo } from '@/examples/pagination/demo'
import demoSource from '@/examples/pagination/demo.tsx?raw'
import { PaginationLinks } from '@/examples/pagination/links'
import linksSource from '@/examples/pagination/links.tsx?raw'
import { PaginationShortList } from '@/examples/pagination/short-list'
import shortListSource from '@/examples/pagination/short-list.tsx?raw'
import { PaginationUnderATable } from '@/examples/pagination/under-a-table'
import underATableSource from '@/examples/pagination/under-a-table.tsx?raw'
import usageSource from '@/examples/pagination/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/pagination')({
  component: PaginationPage,
  validateSearch: (search: Record<string, unknown>) => {
    const requestedPage = Number(search.linkPage)

    return {
      linkPage: Number.isInteger(requestedPage) ? requestedPage : undefined,
    }
  },
})

function PaginationPage() {
  return (
    <DocPage
      title="Pagination"
      lead="The control that moves between the numbered pages of one list or table whose page count is known."
      preview={{ source: demoSource, demo: <PaginationDemo /> }}
      installation="pagination"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Short list"
            description="Five pages fit in the seven slots, so every page shows and no ellipsis appears. The component decides from pageCount; there is nothing to configure."
            source={shortListSource}
          >
            <PaginationShortList />
          </Example>

          <Example
            caption="Compact"
            description="Where the row has no space for numbers (a toolbar, a card footer, a phone-width list) the numbers give way to the position. Previous and next keep their size."
            source={compactSource}
          >
            <PaginationCompact />
          </Example>

          <Example
            caption="Custom position text"
            description="formatPageLabel writes the compact text yourself, for another wording or another language."
            source={customLabelSource}
          >
            <PaginationCustomLabel />
          </Example>

          <Example
            caption="Links"
            description="Each item is a router link and the page it shows comes from this page's own URL. Move it and the address bar moves with it."
            source={linksSource}
          >
            <PaginationLinks />
          </Example>

          <Example
            caption="Under a table"
            description="Pagination is the control, not the data. It sits right-aligned under the table it pages; the slicing and the fetching stay in your app."
            source={underATableSource}
          >
            <PaginationUnderATable />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To page through one list or table whose page count is known, such as the places saved to a trip.',
          'When the traveller needs to land on a specific page and come back to it, in the URL or in state.',
        ],
        whenNotToUse: [
          {
            situation:
              'for a position in a short sequence someone is walking, because stepper only shows where they are and never navigates.',
            alternative: { to: '/components/stepper', label: 'Stepper' },
          },
          {
            situation:
              'to climb the levels above the current page, because pagination moves across siblings and never up.',
            alternative: { to: '/components/breadcrumb', label: 'Breadcrumb' },
          },
          {
            situation:
              'to move between peer panels of content rather than pages of data.',
            alternative: { to: '/components/tabs', label: 'Tabs' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Right-align pagination under the list it pages, once per list.',
            reason:
              'It waits where the traveller finishes reading. A second copy above the list is one more thing to scan and nothing new to do.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Keep the page number in the address whenever the traveller can land on a page.',
            reason:
              'A page in the URL can be bookmarked, shared, opened in a new tab, and reloaded, so the traveller comes back to the page they left rather than to page 1.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Write a line such as "1 to 20 of 240" beside the list when the traveller needs the total.',
            reason:
              'Pagination shows where the traveller is, not how much there is. Only the app knows the size of its data.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Show pagination on a list that fits on one page.',
            reason:
              'A row with one number offers a choice that is not there, so a one-page list simply ends.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Page a short list that grouping or filtering would keep on one screen.',
            reason:
              'Trips split into upcoming and past stay in view together. A page break hides half of them behind a press.',
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
                  'Moves through previous, the page items, and next. A disabled previous or next takes no focus.',
              },
              {
                keys: ['Enter', 'Space'],
                description:
                  'Activates the focused item. On the current page it changes nothing and focus stays put.',
              },
            ]}
          />
          <p>
            The root is a <code>nav</code> named &ldquo;Pagination&rdquo;;{' '}
            <code>aria-label</code> overrides the name. Each page item is named
            &ldquo;Page 5&rdquo; and the current one carries{' '}
            <code>aria-current=&quot;page&quot;</code>. Previous and next are
            named &ldquo;Previous page&rdquo; and &ldquo;Next page&rdquo;, the
            ellipsis is hidden from the accessibility tree, and the compact text
            is a polite live region, so a screen reader hears the new position
            without being interrupted.
          </p>
          <p>
            There are no arrow keys: pagination is a navigation region of
            independent controls, not a composite widget. Items are keyed by
            page number, so focus stays on the page you activated even when the
            window shifts around it and you can keep stepping without hunting
            for focus.
          </p>
        </>
      }
      api={
        <PropsTable
          component="Pagination"
          description={
            <>
              Controlled: the row count, the page size, and the fetching stay in
              your app, and so do &ldquo;Load more&rdquo;, infinite scroll, a
              page-size select, and a range line. Also takes every{' '}
              <code>&lt;nav&gt;</code> attribute except <code>children</code>.
            </>
          }
          rows={[
            {
              name: 'page',
              type: 'number',
              required: true,
              description: 'The current page, counting from 1.',
            },
            {
              name: 'pageCount',
              type: 'number',
              required: true,
              description:
                'The number of pages. A value of 1 or less renders nothing.',
            },
            {
              name: 'onPageChange',
              type: '(page: number) => void',
              description:
                'Called with the target page. It is not called for the current page.',
            },
            {
              name: 'compact',
              type: 'boolean',
              default: 'false',
              description:
                'Replaces the page numbers with the position text between previous and next. The component never measures its width and has no breakpoint, so you choose compact where the row has no room for numbers: a toolbar, a card footer, a phone-width list.',
            },
            {
              name: 'formatPageLabel',
              type: '(page: number, pageCount: number) => string',
              default: '"Page {page} of {pageCount}"',
              description: 'Writes the compact position text.',
            },
            {
              name: 'renderPageLink',
              type: '(page: number, children: ReactNode) => ReactNode',
              description:
                'Renders each page item and each enabled previous or next as the anchor you return. Pass it when the page lives in the URL. A disabled previous or next stays a plain span.',
            },
            {
              name: 'aria-label',
              type: 'string',
              default: '"Pagination"',
              description: 'The name of the nav landmark.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            Up to seven pages, every page shows. Above seven the row always
            holds seven slots, so its width never changes as the page moves and
            the numbers never shift under the pointer. The window carries one
            sibling on each side of the current page and one boundary page at
            each end, and neither is configurable. An ellipsis stands only for a
            run of at least two hidden pages, so a gap never hides a single page
            a number could show; it is plain text, not a menu and not a jump
            control.
          </p>
          <p>
            On twenty pages the window reads{' '}
            <code>1 2 3 [4] 5 &hellip; 20</code> for pages 1 to 4,{' '}
            <code>1 &hellip; 9 [10] 11 &hellip; 20</code> for pages 5 to 16, and{' '}
            <code>1 &hellip; 16 [17] 18 19 20</code> for pages 17 to 20. Through
            the middle range the current page sits in slot 4: the numbers change
            around a still bar, and the bar moves only near the two ends. That
            is the price of a row that keeps one width.
          </p>
          <p>
            Previous and next are icon-only and disabled at the ends rather than
            hidden, for the same reason: a row that loses a control changes
            width. There are no first and last buttons, because the boundary
            pages already go there. A disabled previous or next in link mode
            renders as a span, because an anchor cannot be disabled and a tab
            stop that goes nowhere is worse than none.
          </p>
          <p>
            An item rests at <code>--muted-foreground</code> and steps to{' '}
            <code>--foreground</code> on hover and press, colour only, at{' '}
            <code>--motion-fast</code>; there is no background step and no
            border. The current page takes <code>--foreground</code>, medium
            weight, and the bar. It stays a focusable button or link, so
            activating it leaves focus where the user put it. Focus shows as the
            offset ring in <code>--ring</code>.
          </p>
          <p>
            The bar is one <code>--indicator</code> element shared through a{' '}
            <code>layoutId</code> on <code>springBounce</code>, the marker tabs
            and sidebar use, inside a <code>LayoutGroup</code> of its own so two
            paginations on one page never trade bars. The numbers swap with no
            animation and the compact form animates nothing.
          </p>
          <p>
            Items at rest, the ellipsis, and the compact text measure 7.01:1 (
            <code>--muted-foreground</code> on <code>--background</code>); hover
            and the current page measure 17.20:1. The current-page bar is{' '}
            <code>--indicator</code> at 3.38:1, clearing the 3:1 bar for
            non-text marks.
          </p>
        </>
      }
      related={[
        {
          to: '/components/table',
          label: 'Table',
          description: 'The data most paginations sit under.',
        },
        {
          to: '/components/stepper',
          label: 'Stepper',
          description: 'A display-only position in a short sequence.',
        },
        {
          to: '/components/breadcrumb',
          label: 'Breadcrumb',
          description: 'The trail of ancestors above the current page.',
        },
        {
          to: '/components/tabs',
          label: 'Tabs',
          description: 'Peer panels of content rather than pages of data.',
        },
      ]}
    />
  )
}
