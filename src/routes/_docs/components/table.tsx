import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { PaginationUnderATable } from '@/examples/pagination/under-a-table'
import underATableSource from '@/examples/pagination/under-a-table.tsx?raw'
import { TableDemo } from '@/examples/table/demo'
import demoSource from '@/examples/table/demo.tsx?raw'
import { TableEmpty } from '@/examples/table/empty'
import emptySource from '@/examples/table/empty.tsx?raw'
import { TableInteractiveRows } from '@/examples/table/interactive-rows'
import interactiveRowsSource from '@/examples/table/interactive-rows.tsx?raw'
import { TableNumericColumns } from '@/examples/table/numeric-columns'
import numericColumnsSource from '@/examples/table/numeric-columns.tsx?raw'
import { TableRowHeaders } from '@/examples/table/row-headers'
import rowHeadersSource from '@/examples/table/row-headers.tsx?raw'
import usageSource from '@/examples/table/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/table')({
  component: TablePage,
})

function TablePage() {
  return (
    <DocPage
      title="Table"
      lead="A table lays out rows of comparable data under column labels, with horizontal rules and nothing else."
      preview={{ source: demoSource, demo: <TableDemo /> }}
      installation="table"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Numeric columns"
            description="Right-align a column of numbers so digits line up by place value, which is the only way to compare two amounts by reading down. Column labels stay left, because a label is a word, not a quantity."
            source={numericColumnsSource}
          >
            <TableNumericColumns />
          </Example>

          <Example
            caption="Row headers"
            description="Give the cell that names a row scope row. A screen reader then announces each cell together with the row it belongs to."
            source={rowHeadersSource}
          >
            <TableRowHeaders />
          </Example>

          <Example
            caption="Rows that lead somewhere"
            description="Mark a row interactive and one cell rowLink. That cell’s link stretches over the whole row, so a click anywhere follows it. Tab to a row and the rules above and below it turn orange. The Share button in each row still clicks and focuses on its own."
            source={interactiveRowsSource}
          >
            <TableInteractiveRows />
          </Example>

          <Example
            caption="Empty table"
            description="There is no empty-state part. Write one row with a cell that spans every column, because only you know the column count."
            source={emptySource}
          >
            <TableEmpty />
          </Example>

          <Example
            caption="With pagination"
            description="Put a pagination control under a long table, aligned right where the eye lands after the last row. The table renders the rows you hand it; slicing the data is yours."
            source={underATableSource}
          >
            <PaginationUnderATable />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To compare the same fields across many items: stops on a trip, travellers and their roles, bookings and their costs.',
          'When a reader scans down a column more than across a row.',
        ],
        whenNotToUse: [
          {
            situation:
              'to show one item with several fields, because a card gives each item its own edge and room.',
            alternative: { to: '/components/card', label: 'Card' },
          },
          {
            situation:
              'to show events in order with content beside each, because a timeline joins them with a connector.',
            alternative: { to: '/components/timeline', label: 'Timeline' },
          },
          {
            situation:
              'to hold form fields in a grid, because a table announces a data relationship that fields do not have.',
            alternative: { to: '/components/form', label: 'Form' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Right-align numeric columns and leave labels left.',
            reason:
              'Aligned digits are what let a reader compare two amounts by place value.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Leave the header cell empty on a column that holds only controls.',
            reason:
              'The button already names the action. A label above it repeats the words and sits far from them, because the controls are right-aligned.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: (
              <>
                Mark two cells in one row <code>rowLink</code>.
              </>
            ),
            reason:
              'The two stretched links cover the same area and fight over it. One row, one destination.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: (
              <>
                Mark a row <code>interactive</code> when nothing happens on
                click.
              </>
            ),
            reason:
              'The hover step tells a reader the row leads somewhere. A background change that leads nowhere reads as an affordance that is not there.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Expect sorting, selection, or paging from the table.',
            reason:
              'It sorts nothing, selects nothing, and paginates nothing. Those belong to a data table built on top of it.',
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
                  'Moves through the links and buttons in the rows. An interactive row has one stop for its row link; a second link or button in the same row is its own stop with its own focus ring.',
              },
              {
                keys: ['Enter'],
                description:
                  'Follows the focused link, including the row link of an interactive row.',
              },
              {
                keys: ['Space'],
                description: 'Presses a focused button in a row.',
              },
            ]}
          />
          <p>
            The table is a native <code>table</code>, so screen readers announce
            its rows, columns, and cell positions with no ARIA.{' '}
            <code>TableHeadCell</code> defaults to{' '}
            <code>scope=&quot;col&quot;</code> and is exposed as a column
            header; with{' '}
            <code>
              scope={'{'}TableHeadCellScope.Row{'}'}
            </code>{' '}
            in a body row it is exposed as a row header, so each cell is read
            with the row it belongs to. There is no caption part: label the
            table with <code>aria-label</code> or <code>aria-labelledby</code>{' '}
            on <code>Table</code> when the surrounding heading is not enough.
          </p>
          <p>
            An interactive row is not a link and holds no key handler of its
            own. Its row link is an anchor you write, so a router link works the
            same as an <code>&lt;a&gt;</code>, and Enter activates it natively.
            Focus on a row link paints the row’s hover background and turns the
            rules above and below it orange, in the same weight as the header
            rule: the louder state is for keyboard users, who have no pointer to
            say where they are.
          </p>
        </>
      }
      api={
        <>
          <p>
            <code>Table</code> takes every <code>&lt;table&gt;</code> attribute.
            It wraps the table in a full-width scrolling container and sends{' '}
            <code>className</code> to the table itself.
          </p>
          <PropsTable
            component="TableRow"
            description={
              <>
                Also takes every <code>&lt;tr&gt;</code> attribute.
              </>
            }
            rows={[
              {
                name: 'interactive',
                type: 'boolean',
                default: 'false',
                description:
                  'Steps the background to the accent colour on hover and on focus of the row link, and stretches the row link over the row.',
              },
            ]}
          />
          <PropsTable
            component="TableCell"
            description={
              <>
                Also takes every <code>&lt;td&gt;</code> attribute.
              </>
            }
            rows={[
              {
                name: 'rowLink',
                type: 'boolean',
                default: 'false',
                description:
                  'Marks the cell whose link stretches over its interactive row. Any cell can hold it, not only the first.',
              },
            ]}
          />
          <PropsTable
            component="TableHeadCell"
            description={
              <>
                Also takes every <code>&lt;th&gt;</code> attribute except{' '}
                <code>scope</code>.
              </>
            }
            rows={[
              {
                name: 'scope',
                type: 'TableHeadCellScope',
                default: 'TableHeadCellScope.Column',
                description:
                  'Column for a column label; Row for a cell in a body row that names that row.',
              },
            ]}
          />
          <p>
            <code>TableHeader</code>, <code>TableBody</code>, and{' '}
            <code>TableFooter</code> take only their element’s props.
          </p>
        </>
      }
      notes={
        <>
          <p>
            The sections own the rules. Every body row keeps a{' '}
            <code>--border</code> line, including the last, so the table ends on
            a rule. The header row draws a 1px{' '}
            <code>--table-header-border</code> line, which is{' '}
            <code>--indicator</code>. The footer draws none. There are no
            vertical rules and no outer border; put the table in a card to box
            it.
          </p>
          <p>
            Only an interactive row responds to hover, stepping its background
            to <code>--accent</code> over <code>--motion-fast</code>. The header
            and footer never respond. The link’s stretch is a pseudo-element, so
            every other cell keeps its contents above it and a second link or a
            button clicks as it would anywhere else. The first body row borrows
            the header rule as its top line.
          </p>
          <p>
            There is one size and no <code>density</code> or <code>align</code>{' '}
            prop; <code>align</code> is a real HTML attribute on a cell. Head
            cells are 40px tall with 16px side padding; body cells and row
            headers take 16px sides and 12px top and bottom. Every cell is{' '}
            <code>--foreground</code> and head cells differ by{' '}
            <code>font-medium</code> alone.
          </p>
          <p>
            The wrapper is <code>overflow-x-auto</code> and the table is{' '}
            <code>w-full</code>, with no minimum width and no{' '}
            <code>whitespace-nowrap</code>. Cell text wraps, so horizontal
            scroll engages only when you set column widths or opt a column into
            nowrap.
          </p>
        </>
      }
      related={[
        {
          to: '/components/pagination',
          label: 'Pagination',
          description: 'The control that pages a long table.',
        },
        {
          to: '/components/badge',
          label: 'Badge',
          description: 'The marker for a status column.',
        },
        {
          to: '/components/card',
          label: 'Card',
          description: 'Boxes a table, or shows one item instead of many.',
        },
        {
          to: '/components/timeline',
          label: 'Timeline',
          description: 'Shows a sequence with content beside each marker.',
        },
        {
          to: '/spacing',
          label: 'Spacing',
          description: 'The 4px scale behind the cell padding.',
        },
      ]}
    />
  )
}
