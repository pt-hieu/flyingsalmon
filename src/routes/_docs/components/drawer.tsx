import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { Preview } from '@/components/preview'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Checkbox } from '@/registry/ui/checkbox'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/ui/drawer'
import { Input } from '@/registry/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

export const Route = createFileRoute('/_docs/components/drawer')({
  component: DrawerPage,
})

function DrawerPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Drawer
        </h1>
        <p className="text-muted-foreground text-lg">
          A modal panel at the right edge of the viewport for secondary content
          that accompanies the page still visible beside it: filters for a list,
          the detail of a selected row. It is dialog's root and dialog's parts
          with one panel of its own, so it traps focus, locks scroll, and
          returns focus to its trigger the way a dialog does.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Drawer or dialog, and never navigation
        </h2>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            Pick a drawer when the user benefits from seeing the page while the
            panel is open.
          </strong>{' '}
          A dialog interrupts: it sits centred and whatever is behind it is
          irrelevant until it closes. A drawer accompanies: it sits at the edge
          so its subject — the list being filtered, the row being inspected —
          stays in view. A confirmation is never a drawer, and neither is a
          destructive prompt; both stop the page, which is what a dialog is for.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            A drawer is never app navigation.
          </strong>{' '}
          Moving between sections of an app belongs to the sidebar at every
          width, including the strip it collapses to under 700px. A panel that
          holds the app's nav links is a sidebar under another name.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Parts</h2>
        <p className="text-muted-foreground">
          Nine parts: <code>Drawer</code>, <code>DrawerTrigger</code>,{' '}
          <code>DrawerContent</code>, <code>DrawerTitle</code>,{' '}
          <code>DrawerDescription</code>, <code>DrawerBody</code>,{' '}
          <code>DrawerFooter</code>, <code>DrawerClose</code>, and the built-in
          X close button. Everything but <code>DrawerContent</code> is dialog's
          part re-exported under a <code>Drawer</code> name, so a drawer
          composes exactly as a dialog does and every prop means the same thing.{' '}
          <code>DrawerTitle</code> is required. <code>DrawerBody</code> is the
          only scroll region. The X is always rendered, positioned top-right and
          last in the DOM, because on a narrow screen the panel covers almost
          everything and there is little scrim left to click.
        </p>
        <p className="text-muted-foreground">
          <code>Drawer</code> takes dialog's root props — <code>open</code>,{' '}
          <code>defaultOpen</code>, <code>onOpenChange</code>,{' '}
          <code>dismissible</code>, and <code>pending</code> — and no{' '}
          <code>size</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Geometry and width</h2>
        <p className="text-muted-foreground">
          The panel is inset 8px from the top, the bottom, and the right, with a
          full border, the <code>rounded-xl</code> radius, and the same{' '}
          <code>--popover</code> surface dialog paints, so it reads as a surface
          on the page rather than as the page's edge. It is 448px wide, capped
          at the viewport minus 16px, which is what makes it fill a phone screen
          without a separate phone layout.{' '}
          <strong className="text-foreground">
            There is no <code>side</code> prop and no size prop
          </strong>{' '}
          — the edge is the right edge and the width is one number.
        </p>
        <p className="text-muted-foreground">
          <code>fitContent</code> on <code>DrawerContent</code> grows the panel
          to the width of its body. It never shrinks the panel below 448px and
          never grows it past the viewport cap.{' '}
          <strong className="text-foreground">
            The body content has to set its own width for this to mean anything.
          </strong>{' '}
          A bare paragraph's widest natural layout is its whole text on one
          line, so a body of loose prose pushes the panel straight to the cap.
          The title and the description never drive the width; they wrap inside
          whatever the body sets.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Scroll and footer</h2>
        <p className="text-muted-foreground">
          The panel is the full viewport height minus its inset, and{' '}
          <code>DrawerBody</code> scrolls inside it while the title and the
          footer stay in place, so the actions never scroll out of reach. The
          footer is dialog's: <code>justify-end gap-2</code> from 640px,
          full-width and column-reversed below it, with the primary action last
          in the DOM for the keyboard.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Dismissible and pending
        </h2>
        <p className="text-muted-foreground">
          <code>dismissible={'{false}'}</code> blocks an outside click only,
          permanently — Escape and the X still close. <code>pending</code>{' '}
          blocks Escape, outside click, and the X all at once, disables the X,
          and sets <code>aria-busy</code> on the panel. The drawer shows no
          other busyness of its own; the button inside carries the spinner. A
          drawer whose controls apply instantly never sets <code>pending</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Filters for a list</h2>
        <p className="text-muted-foreground">
          The panel a drawer was designed for. Open it and the list it filters
          is still on screen beside it.
        </p>
        <Preview>
          <FilterDrawerDemo />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          The detail of a selected row
        </h2>
        <p className="text-muted-foreground">
          One drawer serves every row. The app holds the selected row and drives{' '}
          <code>open</code>, so the panel has no <code>DrawerTrigger</code>; the
          buttons in the table are plain buttons that happen to open it, and
          they carry none of the <code>aria-expanded</code> wiring a real
          trigger sets.
        </p>
        <Preview>
          <RowDetailDrawerDemo />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          fitContent for a body that sets its own width
        </h2>
        <p className="text-muted-foreground">
          The itinerary table below is 512px wide, so the panel grows to hold
          it. Drop <code>fitContent</code> and the same table would scroll
          inside a 448px panel.
        </p>
        <Preview>
          <FitContentDrawerDemo />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          A form that survives a stray click
        </h2>
        <p className="text-muted-foreground">
          <code>dismissible={'{false}'}</code> on a drawer holding unsaved
          input. Click the page beside it and the panel stays; Escape and the X
          still close it.
        </p>
        <Preview>
          <NonDismissibleDrawerDemo />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          An operation running inside
        </h2>
        <p className="text-muted-foreground">
          Save sets <code>pending</code> on the drawer while the button carries
          its own spinner. Escape, the scrim, and the X all do nothing until it
          finishes.
        </p>
        <Preview>
          <PendingDrawerDemo />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          The panel travels 24px from the right with a fade, 250ms on the bounce
          curve in and 150ms on the settle curve out.{' '}
          <strong className="text-foreground">
            It does not slide in from off screen.
          </strong>{' '}
          The bounce curve overshoots by 4%, which on a full 448px travel is
          18px past the resting position and visibly widens the 8px inset before
          it settles. Over 24px the overshoot is about 1px. The scrim animates
          opacity only, from 0 to 0.5 over a solid <code>neutral-950</code>, so
          no color in the system carries alpha.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The drawer is a modal dialog. It is labelled by its required title
          and, when present, described by <code>DrawerDescription</code>, and it
          carries <code>aria-busy</code> while pending. Focus lands inside on
          open — on the first body or footer control, never the X — and returns
          to the trigger on close. Tab cycles inside and ends on the X. Content
          outside an open drawer is hidden from the accessibility tree. The
          surface, the text, and the border are dialog's colors, so every pair
          meets WCAG AA with nothing new to measure.
        </p>
      </section>
    </article>
  )
}

const tripStops = [
  {
    stop: 'Kyoto',
    nights: 3,
    lodging: 'Ryokan Aoi',
    arrival: '12 Oct',
    total: '€620',
  },
  {
    stop: 'Kanazawa',
    nights: 2,
    lodging: 'Hotel Higashi',
    arrival: '15 Oct',
    total: '€380',
  },
  {
    stop: 'Tokyo',
    nights: 4,
    lodging: 'Shinjuku Loft',
    arrival: '17 Oct',
    total: '€910',
  },
]

function FilterDrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant={ButtonVariant.Outline}>Filter trips</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Filter trips</DrawerTitle>
        <DrawerDescription>
          The list you are filtering stays on screen beside the panel.
        </DrawerDescription>
        <DrawerBody>
          <div className="flex flex-col gap-5">
            <Input label="Destination" placeholder="Lisbon" />

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 text-sm font-medium">Trip length</legend>
              <Checkbox label="A weekend" defaultChecked />
              <Checkbox label="One week" />
              <Checkbox label="Two weeks or more" />
            </fieldset>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button variant={ButtonVariant.Outline}>Clear</Button>
          </DrawerClose>
          <DrawerClose>
            <Button>Apply</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function RowDetailDrawerDemo() {
  const [selectedStop, setSelectedStop] = useState(tripStops[0])
  const [open, setOpen] = useState(false)

  function showDetail(stop: (typeof tripStops)[number]) {
    setSelectedStop(stop)
    setOpen(true)
  }

  return (
    <div className="w-full max-w-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>Stop</TableHeadCell>
            <TableHeadCell>Nights</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tripStops.map((tripStop) => (
            <TableRow key={tripStop.stop}>
              <TableCell>{tripStop.stop}</TableCell>
              <TableCell>{tripStop.nights}</TableCell>
              <TableCell>
                <Button
                  variant={ButtonVariant.Ghost}
                  size={ButtonSize.Small}
                  onClick={() => showDetail(tripStop)}
                >
                  Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerTitle>{selectedStop.stop}</DrawerTitle>
          <DrawerDescription>
            {selectedStop.nights} nights from {selectedStop.arrival}
          </DrawerDescription>
          <DrawerBody>
            <dl className="text-sm">
              <div className="border-border flex justify-between border-b py-3">
                <dt className="text-muted-foreground">Lodging</dt>
                <dd>{selectedStop.lodging}</dd>
              </div>
              <div className="border-border flex justify-between border-b py-3">
                <dt className="text-muted-foreground">Arrival</dt>
                <dd>{selectedStop.arrival}</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-muted-foreground">Total</dt>
                <dd>{selectedStop.total}</dd>
              </div>
            </dl>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose>
              <Button variant={ButtonVariant.Outline}>Close</Button>
            </DrawerClose>
            <Button>Edit stop</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

function FitContentDrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant={ButtonVariant.Outline}>Open the itinerary</Button>
      </DrawerTrigger>
      <DrawerContent fitContent>
        <DrawerTitle>Itinerary</DrawerTitle>
        <DrawerDescription>
          The panel takes the width the table asks for.
        </DrawerDescription>
        <DrawerBody>
          <div className="w-128">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeadCell>Stop</TableHeadCell>
                  <TableHeadCell>Arrival</TableHeadCell>
                  <TableHeadCell>Nights</TableHeadCell>
                  <TableHeadCell>Lodging</TableHeadCell>
                  <TableHeadCell>Total</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tripStops.map((tripStop) => (
                  <TableRow key={tripStop.stop}>
                    <TableCell>{tripStop.stop}</TableCell>
                    <TableCell>{tripStop.arrival}</TableCell>
                    <TableCell>{tripStop.nights}</TableCell>
                    <TableCell>{tripStop.lodging}</TableCell>
                    <TableCell>{tripStop.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button variant={ButtonVariant.Outline}>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function NonDismissibleDrawerDemo() {
  return (
    <Drawer dismissible={false}>
      <DrawerTrigger>
        <Button variant={ButtonVariant.Outline}>Add a stop</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Add a stop</DrawerTitle>
        <DrawerDescription>
          A click on the page beside the panel leaves it open.
        </DrawerDescription>
        <DrawerBody>
          <div className="flex flex-col gap-4">
            <Input label="City" placeholder="Porto" />
            <Input label="Nights" placeholder="3" />
            <Input label="Lodging" placeholder="Casa do Conto" />
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DrawerClose>
          <DrawerClose>
            <Button>Add stop</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function PendingDrawerDemo() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const pendingTimeout = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (pendingTimeout.current) clearTimeout(pendingTimeout.current)
    }
  }, [])

  function handleSave() {
    setPending(true)
    pendingTimeout.current = setTimeout(() => {
      setPending(false)
      setOpen(false)
    }, 1600)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} pending={pending}>
      <DrawerTrigger>
        <Button variant={ButtonVariant.Outline}>Edit the trip</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Edit the trip</DrawerTitle>
        <DrawerDescription>
          Save holds the panel until the operation finishes.
        </DrawerDescription>
        <DrawerBody>
          <div className="flex flex-col gap-4">
            <Input label="Trip name" placeholder="Autumn in Japan" />
            <Input label="Travellers" placeholder="2" />
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DrawerClose>
          <Button loading={pending} onClick={handleSave}>
            Save trip
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
