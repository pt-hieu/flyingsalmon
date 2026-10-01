import { createFileRoute } from '@tanstack/react-router'
import { PlaneTakeoff, Share2 } from 'lucide-react'

import { PageHeaderSidebarExample } from '@/components/page-header-sidebar-example'
import { Preview } from '@/components/preview'
import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/registry/ui/page-header'

export const Route = createFileRoute('/_docs/components/page-header')({
  component: PageHeaderPage,
})

function PageHeaderPage() {
  return (
    <article className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Page Header
        </h1>
        <p className="text-muted-foreground text-lg">
          A page's title and the actions that act on the whole page, nothing
          else. Every page that uses it gets the same heading.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Title and actions only
        </h2>
        <p className="text-muted-foreground">
          Three slots. <code>PageHeader</code> renders a <code>header</code>.{' '}
          <code>PageHeaderTitle</code> is the page's one <code>h1</code>, in one
          size: there is no <code>size</code> prop, so every page's title
          matches. <code>PageHeaderActions</code> holds the actions that act on
          the whole page. Where the page came from, a description, the page's
          status, and any dimming for a superseded page belong to the page body,
          below the header. This is not the app's top bar; the{' '}
          <code>sidebar</code> covers that.
        </p>
        <Preview>
          <div className="w-full">
            <PageHeader>
              <PageHeaderTitle>Wallet</PageHeaderTitle>
            </PageHeader>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">With an action</h2>
        <p className="text-muted-foreground">
          The actions share the title's row, centered on it, and sit at the end
          of the row.
        </p>
        <Preview>
          <div className="w-full">
            <PageHeader>
              <PageHeaderTitle>Trips</PageHeaderTitle>
              <PageHeaderActions>
                <Button icon={<PlaneTakeoff />}>Plan a new trip</Button>
              </PageHeaderActions>
            </PageHeader>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Wrapping</h2>
        <p className="text-muted-foreground">
          The title and actions share one row for as long as they fit. The
          actions move under the title, left-aligned, only when the title would
          otherwise get narrower than 256px. The header measures its own width,
          not the viewport: at <code>@3xl</code> (768px) and wider the title is{' '}
          <code>text-6xl</code>, narrower it is <code>text-4xl</code>. Several
          actions wrap among themselves at <code>gap-2</code>. There is no
          overflow menu: pass a <code>dropdown-menu</code> as one of the actions
          when a page has more than fit. The same header is shown in a wide
          container and a narrow one.
        </p>
        <Preview>
          <div className="w-full space-y-10">
            <TripPageHeader />
            <div className="max-w-sm">
              <TripPageHeader />
            </div>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Long titles</h2>
        <p className="text-muted-foreground">
          A title wraps with <code>text-balance</code>, so its lines come out
          close in length, and it never truncates: the title is the page's name.
          The actions stay centered on the title's first line, so they sit where
          the eye starts reading.
        </p>
        <Preview>
          <div className="w-full">
            <PageHeader>
              <PageHeaderTitle>
                Ten days from Ho Chi Minh City through Tokyo, Kyoto, and Osaka
                with the whole family
              </PageHeaderTitle>
              <PageHeaderActions>
                <Button variant={ButtonVariant.Outline}>Replan</Button>
              </PageHeaderActions>
            </PageHeader>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Beside the sidebar</h2>
        <p className="text-muted-foreground">
          The sidebar is the app's top bar and navigation; the page header names
          the page in the pane beside it. Both read the theme's{' '}
          <code>--bar-height</code>: the sidebar header is that tall, and the
          title pads its first line to the same band, so the wordmark, the
          title, and actions that share its row sit on one center line. Put the
          header at the top of the pane with no padding above it and the line
          holds at both title sizes. Collapse the sidebar to its rail and the
          wider pane gives the actions room to join the title's row.
        </p>
        <Preview>
          <PageHeaderSidebarExample className="h-96 w-full" />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Under the strip</h2>
        <p className="text-muted-foreground">
          Under a 700px viewport the sidebar becomes a sticky strip across the
          top, one <code>--bar-height</code> tall, with its items in a menu the
          trigger opens. The page header sits directly beneath it with the same
          markup. The strip pads its sides by <code>--page-header-inset</code>,
          so with the variable set on the sidebar&apos;s provider its header
          content starts on the title&apos;s left edge and its trigger ends on
          the header&apos;s right one. The strip closes with its own bottom
          border, so the header stacks between two rules: the strip&apos;s above
          the title&apos;s band, its own below the last band. In a phone-width
          pane the title takes the row and the actions wrap under it into their
          own band. The frame below is 384px wide, so it renders the strip the
          way a phone does.
        </p>
        <Preview>
          <iframe
            title="Page header under the sidebar strip"
            src="/frames/page-header-strip"
            className="border-border h-144 w-96 rounded-lg border"
          />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Placement</h2>
        <p className="text-muted-foreground">
          Put <code>PageHeader</code> inside <code>main</code>. A{' '}
          <code>header</code> outside <code>main</code> becomes a{' '}
          <code>banner</code> landmark and competes with the app shell's own.
          The header adds no margin around itself unless it is inset; the page's
          layout gap places it. It closes with a 1px <code>--border</code> rule
          at the bottom of its last band, which separates the page's name from
          its body the way every surface in the system separates: by a solid
          line, never a shadow. The title's band pads its line equally above and
          below, so the gap from the top of the header to the capitals matches
          the gap from the baseline to the rule: about 24px at{' '}
          <code>text-4xl</code> and 16px at <code>text-6xl</code>. To run the
          rule across a padded pane, set <code>--page-header-inset</code> to the
          pane's side padding, as the sidebar example does with{' '}
          <code>[--page-header-inset:--spacing(6)]</code> on its provider beside
          the pane's <code>px-6</code>. The header bleeds out by that much on
          each side and pads back in, so the rule meets both edges and the title
          stays lined up with the body.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Contrast</h2>
        <p className="text-muted-foreground">
          The title is <code>--foreground</code>: 17.20:1 on{' '}
          <code>--background</code> and 18.25:1 on <code>--card</code>. The
          bottom rule is decorative: the title names the page without it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Accessibility and motion
        </h2>
        <p className="text-muted-foreground">
          The header has no states and no keyboard path of its own. Tab reaches
          the actions in the order they are written and nothing else. Nothing
          animates, including the actions wrapping: a layout change at a
          breakpoint is not feedback.
        </p>
      </section>
    </article>
  )
}

function TripPageHeader() {
  return (
    <PageHeader>
      <PageHeaderTitle>Kyoto in autumn</PageHeaderTitle>
      <PageHeaderActions>
        <Button icon={<Share2 />} variant={ButtonVariant.Outline}>
          Share
        </Button>
        <Button variant={ButtonVariant.Outline}>Replan</Button>
        <Button>Book stays</Button>
      </PageHeaderActions>
    </PageHeader>
  )
}
