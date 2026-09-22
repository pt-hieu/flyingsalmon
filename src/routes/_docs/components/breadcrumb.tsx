import { Link, createFileRoute } from '@tanstack/react-router'

import { Preview } from '@/components/preview'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbEllipsisMenuItem,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/registry/ui/breadcrumb'

export const Route = createFileRoute('/_docs/components/breadcrumb')({
  component: BreadcrumbDocsPage,
})

function BreadcrumbDocsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Breadcrumb
        </h1>
        <p className="text-muted-foreground text-lg">
          A single-line trail of the current page&apos;s ancestors in a
          hierarchy. Every level above the current one is a link back up, and
          the current page ends the trail as plain text.
        </p>
        <p className="text-muted-foreground text-lg">
          <strong className="text-foreground">
            A trail has at least two levels.
          </strong>{' '}
          A page that sits at the top of the hierarchy renders no breadcrumb,
          because a trail of one says nothing the page title has not already
          said.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Breadcrumb, sidebar, stepper, history
        </h2>
        <p className="text-muted-foreground">
          A breadcrumb shows{' '}
          <strong className="text-foreground">location</strong>: where this page
          sits and what contains it.{' '}
          <strong className="text-foreground">Sidebar</strong> moves between
          sections; breadcrumb moves up within one.{' '}
          <strong className="text-foreground">Stepper</strong> is a position in
          a sequence a person is walking, which a hierarchy is not. And a
          breadcrumb is never{' '}
          <strong className="text-foreground">history</strong> — it lists the
          pages above this one, not the pages you came through, so it reads the
          same however you arrived.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Parts</h2>
        <p className="text-muted-foreground">
          Four parts: <code>Breadcrumb</code>, <code>BreadcrumbItem</code>,{' '}
          <code>BreadcrumbSeparator</code>, and <code>BreadcrumbEllipsis</code>,
          with <code>BreadcrumbEllipsisMenuItem</code> for the levels the
          ellipsis hides. <code>Breadcrumb</code> is the <code>nav</code> and
          the <code>ol</code> inside it; every other part is an <code>li</code>.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">One item, three shapes.</strong>{' '}
          <code>BreadcrumbItem</code> with <code>link</code> is an ancestor and
          renders an anchor; with <code>active</code> it is the page you are on
          and renders plain text; with neither it is a bare list item, which is
          what the ellipsis sits in. <code>link</code> and <code>active</code>{' '}
          are mutually exclusive, and the types say so.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            You place every separator yourself.
          </strong>{' '}
          A chevron the list inserted on its own would land in the wrong place
          the moment a level is conditional or collapses into the ellipsis, so{' '}
          <code>BreadcrumbSeparator</code> is an item you write between two
          others. It holds a fixed chevron and there is no slot to change it.
        </p>
        <p className="text-muted-foreground">
          There are no variants and no sizes. A breadcrumb sits in one place,
          above the page title, at <code>text-sm</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">A trail</h2>
        <p className="text-muted-foreground">
          Ancestors carry <code>link</code> and an <code>href</code>; the page
          you are on carries <code>active</code>, which renders plain text with{' '}
          <code>aria-current=&quot;page&quot;</code>. It is not a link and takes
          no focus, because a link to the page you are already on goes nowhere.
        </p>
        <Preview>
          <Breadcrumb>
            <BreadcrumbItem link href="#">
              Trips
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem link href="#">
              Japan
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem active>Kyoto</BreadcrumbItem>
          </Breadcrumb>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Collapsing a long trail
        </h2>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            A trail that does not fit collapses; it never wraps.
          </strong>{' '}
          Collapse from four levels: keep the root, the parent, and the current
          page visible, and hide everything between the root and the parent
          behind <code>BreadcrumbEllipsis</code>. Which levels collapse is your
          decision — the component measures nothing and collapses nothing on its
          own.
        </p>
        <p className="text-muted-foreground">
          The ellipsis owns its menu. It renders the dropdown menu, its trigger,
          and its content, and its children are{' '}
          <code>BreadcrumbEllipsisMenuItem</code>, so a hidden level is always
          one click or one Arrow Down away. It goes in a{' '}
          <code>BreadcrumbItem</code> with neither <code>link</code> nor{' '}
          <code>active</code>. List the hidden levels from the highest ancestor
          down, the order they sit in the trail.
        </p>
        <Preview>
          <Breadcrumb>
            <BreadcrumbItem link href="#">
              Trips
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis>
                <BreadcrumbEllipsisMenuItem asChild>
                  <a href="#">Japan</a>
                </BreadcrumbEllipsisMenuItem>
                <BreadcrumbEllipsisMenuItem asChild>
                  <a href="#">Kansai</a>
                </BreadcrumbEllipsisMenuItem>
                <BreadcrumbEllipsisMenuItem asChild>
                  <a href="#">Kyoto</a>
                </BreadcrumbEllipsisMenuItem>
              </BreadcrumbEllipsis>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem link href="#">
              Day 3
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem active>Kinkaku-ji</BreadcrumbItem>
          </Breadcrumb>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">A long page title</h2>
        <p className="text-muted-foreground">
          The current page is the part that truncates. It caps at 20 characters
          and shrinks below that cap when the row runs out of room; links never
          truncate, so the ancestors stay readable. Override the cap with{' '}
          <code>className</code>, and pass <code>title</code> for the full text.
        </p>
        <p className="text-muted-foreground">
          The list clips nothing. A trail with more room than the container has
          overflows in view rather than disappearing at the edge, which is both
          the signal to collapse a level and the reason a focus ring is never
          cut off.
        </p>
        <Preview>
          <div className="w-full max-w-xs">
            <Breadcrumb>
              <BreadcrumbItem link href="#">
                Trips
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem link href="#">
                Day 3
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem
                active
                title="Fushimi Inari and the thousand torii gates"
              >
                Fushimi Inari and the thousand torii gates
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Router links</h2>
        <p className="text-muted-foreground">
          A <code>link</code> item takes <code>asChild</code> and renders your
          router&apos;s link with breadcrumb&apos;s class names on it, so the
          trail navigates through the router instead of reloading the page.{' '}
          <code>BreadcrumbEllipsisMenuItem</code> takes the same{' '}
          <code>asChild</code> for the hidden levels. The trail below is this
          page&apos;s own: two real routes, which is the shortest trail worth
          rendering.
        </p>
        <Preview>
          <Breadcrumb>
            <BreadcrumbItem link asChild>
              <Link to="/">Components</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem active>Breadcrumb</BreadcrumbItem>
          </Breadcrumb>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">States and motion</h2>
        <p className="text-muted-foreground">
          Links and the ellipsis trigger sit on <code>--muted-foreground</code>{' '}
          and step to <code>--foreground</code> on hover and while pressed, with
          no underline: position in the trail and the chevrons already say these
          are links, and indigo stays reserved for indicators. The current page
          is <code>--foreground</code> at normal weight. There is no disabled
          state.
        </p>
        <p className="text-muted-foreground">
          The colour change is the only motion, on <code>--motion-fast</code>.
          The chevrons do not move, the trail has no enter animation, and
          truncation is not animated. The ellipsis menu opens and closes on the
          dropdown menu&apos;s own keyframes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The root is a <code>nav</code> named &ldquo;Breadcrumb&rdquo;, which{' '}
          <code>aria-label</code> overrides, holding an ordered list. Separators
          are presentational and hidden, so a screen reader hears the levels and
          nothing between them. The current page is a span with{' '}
          <code>aria-current=&quot;page&quot;</code> and no link role, so
          nothing in the trail announces as a link that goes nowhere.
        </p>
        <p className="text-muted-foreground">
          Tab moves through the links and the ellipsis trigger and skips the
          current page. The trigger is named &ldquo;Show hidden levels&rdquo;,
          which its own <code>aria-label</code> overrides; Enter, Space, or
          Arrow Down opens its menu, arrows move through the hidden levels, and
          Escape closes it and returns focus to the trigger. Every focus ring
          stands 5px off the text inside the row&apos;s 6px gap, clear of the
          chevrons on either side.
        </p>
        <p className="text-muted-foreground">
          Links and chevrons carry <code>--muted-foreground</code> on the page
          background at 4.73:1; hover and the current page are{' '}
          <code>--foreground</code>. All pass WCAG AA.
        </p>
      </section>
    </article>
  )
}
