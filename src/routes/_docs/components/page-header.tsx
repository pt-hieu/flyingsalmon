import { createFileRoute } from '@tanstack/react-router'
import { PlaneTakeoff, Share2 } from 'lucide-react'

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
          The header measures its own width, not the viewport. At{' '}
          <code>@3xl</code> (768px) and wider, the title and actions share one
          row. Narrower, the actions move under the title, left-aligned, and the
          title steps down from <code>text-6xl</code> to <code>text-4xl</code>.
          Several actions wrap among themselves at <code>gap-2</code>. There is
          no overflow menu: pass a <code>dropdown-menu</code> as one of the
          actions when a page has more than fit. The same header is shown in a
          wide container and a narrow one.
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
        <h2 className="font-heading text-2xl font-bold">Placement</h2>
        <p className="text-muted-foreground">
          Put <code>PageHeader</code> inside <code>main</code>. A{' '}
          <code>header</code> outside <code>main</code> becomes a{' '}
          <code>banner</code> landmark and competes with the app shell's own.
          The header adds no margin around itself; the page's layout gap places
          it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Contrast</h2>
        <p className="text-muted-foreground">
          The title is <code>--foreground</code>: 17.20:1 on{' '}
          <code>--background</code> and 18.25:1 on <code>--card</code>.
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
