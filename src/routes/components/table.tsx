import { createFileRoute } from '@tanstack/react-router'

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
          parts. Horizontal rules only, a primary header rule, left-aligned
          column labels, and an interactive row whose single link stretches over
          the whole row and turns the rules above and below it primary.
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
          <code>Card</code> if you want it boxed. Only an interactive row
          responds to hover, stepping its background to <code>--accent</code> at{' '}
          <code>--motion-fast</code>; a row you cannot click stays still,
          because a background step that leads nowhere reads as an affordance
          that is not there. The header and footer never respond to hover.
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
          Pass <code>interactive</code> to a <code>TableRow</code>, then mark
          the cell holding the row&rsquo;s link with <code>rowLink</code>{' '}
          &mdash; not necessarily the first cell.{' '}
          <strong className="text-foreground">
            That link stretches its hit area over the whole row
          </strong>{' '}
          through a pseudo-element, so a click anywhere on the row follows it
          and Enter activates it natively. The row is not a link and holds no
          key handler of its own. You write the anchor yourself, so a router
          link works the same as an <code>&lt;a&gt;</code>.
        </p>
        <p className="text-muted-foreground">
          Every other cell keeps its contents above the stretched link, so a
          second link or a button in the same row clicks, tabs, and shows its
          own focus ring exactly as it would anywhere else. Nothing to opt into.
          Mark two cells <code>rowLink</code> and the two overlays fight over
          the same area &mdash; that one is on you, and it is visible in your
          markup rather than inferred from the row.
        </p>
        <p className="text-muted-foreground">
          Focus and press build on hover rather than replacing it. The row takes
          the same <code>--accent</code> background a pointer gives it, and the
          line above it and the line below it both turn <code>--primary</code>,
          in the same weight and color as the header rule. The first body row
          borrows the header rule as its top line. The background is what tells
          you which row the two lines belong to, since the upper one is also the
          previous row&rsquo;s lower one; focus is the louder state because a
          keyboard user has no pointer to say where they are.
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
          &mdash; <code>align</code> is a real HTML attribute on a cell. Column
          labels always sit left, whatever the column holds. Body cells are
          yours: numerics take <code>className=&quot;text-right&quot;</code> so
          digits line up by place value, which is the only way to compare two
          amounts by reading down the column. A label is a word, not a quantity,
          so nothing lines up against it and moving it right buys nothing.
          Column widths and a tighter row rhythm are <code>className</code> too.
        </p>
        <p className="text-muted-foreground">
          A column that holds only controls takes an empty{' '}
          <code>TableHeadCell</code>. The button already names the action, so a
          label above it repeats what is written below and then sits far from
          it, since the controls are right-aligned to give the row a consistent
          end. Name an action column only when the label says something the
          buttons do not.
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
          scope, not the position: a row header takes body geometry rather than
          the column label&rsquo;s row height. Every cell in the table is{' '}
          <code>--foreground</code>; head cells separate from body cells by{' '}
          <code>font-medium</code> alone.
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
          <TableHeadCell>Stop</TableHeadCell>
          <TableHeadCell>Lodging</TableHeadCell>
          <TableHeadCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow interactive>
          <TableCell rowLink>
            <a href="#kyoto">Kyoto</a>
          </TableCell>
          <TableCell>
            <a href="#ryokan-aoi">Ryokan Aoi</a>
          </TableCell>
          <TableCell className="text-right">
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
              Save
            </Button>
          </TableCell>
        </TableRow>
        <TableRow interactive>
          <TableCell rowLink>
            <a href="#kanazawa">Kanazawa</a>
          </TableCell>
          <TableCell>
            <a href="#hotel-higashi">Hotel Higashi</a>
          </TableCell>
          <TableCell className="text-right">
            <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
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
          <TableHeadCell>Nights</TableHeadCell>
          <TableHeadCell>Cost</TableHeadCell>
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
