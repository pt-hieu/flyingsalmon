import { createFileRoute } from '@tanstack/react-router'
import { MapPin } from 'lucide-react'

import { ModePreview } from '@/components/mode-preview'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeadCell,
  TableHeadCellScope,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

export const Route = createFileRoute('/components/table')({
  component: TablePage,
})

function TablePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Table
        </h1>
        <p className="text-muted-foreground text-lg">
          A styled primitive for tabular data: plain table elements in seven
          parts. Horizontal rules only, a primary header rule, a background step
          on the hovered body row, and an interactive row whose single link
          stretches over the whole row.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Seven parts</h2>
        <p className="text-muted-foreground">
          <code>Table</code>, <code>TableHeader</code>, <code>TableBody</code>,{' '}
          <code>TableFooter</code>, <code>TableRow</code>,{' '}
          <code>TableHeadCell</code>, and <code>TableCell</code> &mdash; each
          one a plain element with the matching tag. <code>Table</code> wraps
          the table in a full-width scrolling div and sends your{' '}
          <code>className</code> to the table itself. There is no caption part
          and no empty-state part: an empty table is a row with a{' '}
          <code>colSpan</code> cell you write yourself, because only you know
          the column count.
        </p>
        <p className="text-muted-foreground">
          The sections own the rules. Every body row keeps a{' '}
          <code>--border</code> line, including the last, so the table
          terminates on a rule; the header row draws a 1px{' '}
          <code>--table-header-border</code> line, which is{' '}
          <code>--primary</code>; the footer draws none. There are no vertical
          rules and no outer border &mdash; drop the table inside a{' '}
          <code>Card</code> if you want it boxed. Hovering a body row steps its
          background to <code>--accent</code> at <code>--motion-fast</code> so
          you can track it across a wide table. The header and footer never
          respond to hover.
        </p>
        <ModePreview>
          <PartsExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Rows that lead somewhere
        </h2>
        <p className="text-muted-foreground">
          Pass <code>interactive</code> to a <code>TableRow</code> and put one
          link in any cell &mdash; not necessarily the first.{' '}
          <strong className="text-foreground">
            The link stretches its hit area over the whole row
          </strong>{' '}
          through a pseudo-element, so a click anywhere on the row follows it,
          the row costs exactly one Tab stop, and Enter activates it natively.
          The row is not a link and holds no key handler of its own. One link
          per interactive row: a second one would fight the first for the same
          area. That constraint is documented, not enforced.
        </p>
        <p className="text-muted-foreground">
          A button in another cell of an interactive row stays clickable on its
          own &mdash; the row lifts every nested button above the stretched
          link. If you need a second link to stay clickable rather than stretch,
          put <code>[&amp;_a]:relative [&amp;_a]:z-10</code> on the cell that
          holds it.
        </p>
        <ModePreview>
          <InteractiveExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Widths and alignment are yours
        </h2>
        <p className="text-muted-foreground">
          One size, no <code>density</code> prop, and no <code>align</code> prop
          &mdash; <code>align</code> is a real HTML attribute on a cell, and a
          right-aligned column needs the head cell and every body cell to agree
          anyway. Numerics take <code>className=&quot;text-right&quot;</code> on
          both. Column widths and a tighter row rhythm are{' '}
          <code>className</code> too.
        </p>
        <p className="text-muted-foreground">
          The wrapper is <code>overflow-x-auto</code> and the table is{' '}
          <code>w-full</code>, with no minimum width and no{' '}
          <code>whitespace-nowrap</code>. Cell text wraps by default, so{' '}
          <strong className="text-foreground">
            horizontal scroll engages only when you set column widths or opt a
            column into nowrap
          </strong>
          . It is not automatic.
        </p>
        <ModePreview>
          <AlignmentExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Row headers</h2>
        <p className="text-muted-foreground">
          <code>TableHeadCell</code> defaults to{' '}
          <code>scope=&quot;col&quot;</code> and exposes the{' '}
          <code>columnheader</code> role. Put one in a body row with{' '}
          <code>
            scope={'{'}TableHeadCellScope.Row{'}'}
          </code>{' '}
          and it exposes <code>rowheader</code> instead, so a screen reader
          announces each cell with the row it belongs to. Styling keys off the
          scope, not the position: a row header is content, so it takes body
          geometry, <code>--foreground</code>, and <code>font-medium</code>{' '}
          rather than the muted column-label type.
        </p>
        <ModePreview>
          <RowHeaderExample />
        </ModePreview>
      </section>

      <p className="text-muted-foreground">
        Table sorts nothing, selects nothing, and paginates nothing. Those
        belong to a data table built on top of this one.
      </p>
    </article>
  )
}

function PartsExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>Stop</TableHeadCell>
          <TableHeadCell>Nights</TableHeadCell>
          <TableHeadCell>Lodging</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Kyoto</TableCell>
          <TableCell>3</TableCell>
          <TableCell>Ryokan Aoi</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Kanazawa</TableCell>
          <TableCell>2</TableCell>
          <TableCell>Hotel Higashi</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Tokyo</TableCell>
          <TableCell>4</TableCell>
          <TableCell>Shibuya Loft</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>9</TableCell>
          <TableCell>3 stays</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

function InteractiveExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell className="w-8 pr-0" />
          <TableHeadCell>Stop</TableHeadCell>
          <TableHeadCell className="text-right">Plan</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow interactive>
          <TableCell className="pr-0">
            <MapPin aria-hidden className="size-4" />
          </TableCell>
          <TableCell>
            <a href="#kyoto">Kyoto</a>
          </TableCell>
          <TableCell className="text-right">
            <Button variant={ButtonVariant.Outline} size={ButtonSize.Small}>
              Save
            </Button>
          </TableCell>
        </TableRow>
        <TableRow interactive>
          <TableCell className="pr-0">
            <MapPin aria-hidden className="size-4" />
          </TableCell>
          <TableCell>
            <a href="#kanazawa">Kanazawa</a>
          </TableCell>
          <TableCell className="text-right">
            <Button variant={ButtonVariant.Outline} size={ButtonSize.Small}>
              Save
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

function AlignmentExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell className="w-1/2">Stop</TableHeadCell>
          <TableHeadCell className="text-right">Nights</TableHeadCell>
          <TableHeadCell className="text-right">Cost</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Kyoto</TableCell>
          <TableCell className="text-right">3</TableCell>
          <TableCell className="text-right">&yen;48,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Kanazawa</TableCell>
          <TableCell className="text-right">2</TableCell>
          <TableCell className="text-right">&yen;26,500</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">5</TableCell>
          <TableCell className="text-right">&yen;74,500</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

function RowHeaderExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>Stop</TableHeadCell>
          <TableHeadCell>Arrive</TableHeadCell>
          <TableHeadCell>Depart</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHeadCell scope={TableHeadCellScope.Row}>Kyoto</TableHeadCell>
          <TableCell>12 Apr</TableCell>
          <TableCell>15 Apr</TableCell>
        </TableRow>
        <TableRow>
          <TableHeadCell scope={TableHeadCellScope.Row}>Kanazawa</TableHeadCell>
          <TableCell>15 Apr</TableCell>
          <TableCell>17 Apr</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
