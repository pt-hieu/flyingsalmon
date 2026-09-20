import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { Pagination } from '@/registry/ui/pagination'

export const Route = createFileRoute('/components/pagination')({
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
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Pagination
        </h1>
        <p className="text-muted-foreground text-lg">
          The control that moves between the numbered pages of one list or table
          whose page count is known. It navigates, which stepper never does, and
          it moves between pages of data rather than by a carousel page.
          &ldquo;Load more&rdquo;, infinite scroll, the page-size select, and
          the &ldquo;1 to 20 of 240&rdquo; range line all stay with the app.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">One component</h2>
        <p className="text-muted-foreground">
          <code>Pagination</code> is controlled and takes three props:{' '}
          <code>page</code>, counting from 1, <code>pageCount</code>, and{' '}
          <code>onPageChange</code>. There are no parts to assemble &mdash; the
          window is arithmetic the component owns, and the indicator bar needs
          one owner to slide between items. A <code>pageCount</code> of 1 or
          less renders nothing, so a one-page list needs no guard around it.
        </p>
        <ModePreview>
          <ControlledExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">The window</h2>
        <p className="text-muted-foreground">
          Up to seven pages, every page shows. Above seven the row always holds
          seven slots, so its width never changes as the page moves and the
          numbers never shift under the pointer. The window carries one sibling
          on each side of the current page and one boundary page at each end,
          neither of them configurable. An ellipsis stands only for a run of at
          least two hidden pages, so a gap never hides a single page a number
          could show; it is plain text with no states, not a menu and not a jump
          control.
        </p>
        <p className="text-muted-foreground">
          On a list of twenty pages that gives{' '}
          <code>1 2 3 [4] 5 &hellip; 20</code> for pages 1 to 4,{' '}
          <code>1 &hellip; 9 [10] 11 &hellip; 20</code> for pages 5 to 16, and{' '}
          <code>1 &hellip; 16 [17] 18 19 20</code> for pages 17 to 20.{' '}
          <strong className="text-foreground">
            Through the middle range the current page sits in slot 4
          </strong>{' '}
          &mdash; the numbers change around a still bar, and the bar moves only
          near the two ends. That is the price of a row that keeps one width.
        </p>
        <p className="text-muted-foreground">
          Previous and next are icon-only and disabled at the ends rather than
          hidden, for the same reason: a row that loses a control is a row that
          changes width. There are no first and last buttons, because the
          boundary pages already go there.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Short lists</h2>
        <p className="text-muted-foreground">
          Five pages fit in the seven slots, so every page shows and no ellipsis
          appears. Nothing to configure: the same component decides from{' '}
          <code>pageCount</code>.
        </p>
        <ModePreview>
          <FewPagesExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Compact</h2>
        <p className="text-muted-foreground">
          Pass <code>compact</code> where the row has no space for numbers: a
          toolbar, a card footer, a phone-width list. Previous and next keep
          their size and the numbers give way to the position,{' '}
          <code>Page 3 of 12</code>. Pass <code>formatPageLabel</code> to write
          that text yourself, for another language or another wording. The
          component never measures width and has no breakpoint behaviour, so the
          form is the consumer&rsquo;s choice.
        </p>
        <ModePreview>
          <CompactExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Links</h2>
        <p className="text-muted-foreground">
          URL-driven paging passes <code>renderPageLink(page, children)</code>.
          The page items and an enabled previous or next then render as the
          anchor it returns &mdash; a plain <code>&lt;a&gt;</code> or a
          router&rsquo;s link &mdash; and pagination applies its own classes,{' '}
          <code>aria-current</code>, and <code>aria-label</code> onto that
          anchor. There is no separate link part to place. A disabled previous
          or next renders as a plain span that takes no focus, because an{' '}
          <code>&lt;a&gt;</code> cannot be disabled and a tab stop that goes
          nowhere is worse than none.
        </p>
        <p className="text-muted-foreground">
          The demo below is the real thing: each item is a router link, and the
          page it shows comes from this page&rsquo;s own URL. Move it and the
          address bar moves with it.
        </p>
        <ModePreview>
          <LinkExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Composed under a table
        </h2>
        <p className="text-muted-foreground">
          Pagination is the control, not the data. Put it under the table it
          pages, right-aligned, and keep the row count, the page size, and the
          fetching in the app &mdash; the{' '}
          <Link to="/components/table" className="text-foreground underline">
            table page
          </Link>{' '}
          shows the composition.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">States and motion</h2>
        <p className="text-muted-foreground">
          An item rests at <code>--muted-foreground</code> and steps to{' '}
          <code>--foreground</code> on hover and press, colour only, at{' '}
          <code>--motion-fast</code>. There is no background step and no border:
          the same rule the tabs trigger follows. The current page takes{' '}
          <code>--foreground</code>, medium weight, and the bar. It stays a
          focusable button or link so that activating it leaves focus where the
          user put it, and activating it changes nothing else.
        </p>
        <p className="text-muted-foreground">
          The bar is one <code>--indicator</code> element shared through a{' '}
          <code>layoutId</code> on <code>spring-bounce</code>, the marker tabs
          and sidebar already use, inside a <code>LayoutGroup</code> of its own
          so two paginations on one page never trade bars. The numbers swap with
          no animation, and the compact form animates nothing.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The root is a <code>nav</code> named &ldquo;Pagination&rdquo;, which{' '}
          <code>aria-label</code> overrides, holding a list of items. Each page
          item is named &ldquo;Page 5&rdquo; and the current one carries{' '}
          <code>aria-current=&quot;page&quot;</code>; previous and next are
          named &ldquo;Previous page&rdquo; and &ldquo;Next page&rdquo;; the
          ellipsis is hidden from the accessibility tree; the compact text is a
          polite live region, so a screen reader hears the new position without
          being interrupted.
        </p>
        <p className="text-muted-foreground">
          Tab moves through previous, the items, and next, and Enter or Space
          activates. There are no arrow keys: pagination is a navigation region
          of independent controls, not a composite widget, and APG defines no
          arrow-key pattern for it. Items are keyed by page number, so{' '}
          <strong className="text-foreground">
            focus stays on the page you activated even when the window shifts
            around it
          </strong>{' '}
          and you can keep stepping without hunting for focus. Focus shows as
          the offset ring in <code>--ring</code>.
        </p>
        <p className="text-muted-foreground">
          Items at rest, the ellipsis, and the compact text are{' '}
          <code>--muted-foreground</code> on <code>--background</code>, measured
          at 4.73:1 in light mode and 7.63:1 in dark; hover and the current page
          are <code>--foreground</code>. Every pair clears WCAG AA in both
          modes.
        </p>
      </section>
    </article>
  )
}

function ControlledExample() {
  const [page, setPage] = useState(8)

  return <Pagination page={page} pageCount={20} onPageChange={setPage} />
}

function FewPagesExample() {
  const [page, setPage] = useState(1)

  return <Pagination page={page} pageCount={5} onPageChange={setPage} />
}

function CompactExample() {
  const [page, setPage] = useState(3)

  return (
    <Pagination page={page} pageCount={12} onPageChange={setPage} compact />
  )
}

function LinkExample() {
  const { linkPage } = Route.useSearch()

  return (
    <Pagination
      page={linkPage ?? 1}
      pageCount={12}
      renderPageLink={(targetPage, children) => (
        <Link
          to="/components/pagination"
          search={{ linkPage: targetPage }}
          resetScroll={false}
        >
          {children}
        </Link>
      )}
    />
  )
}
