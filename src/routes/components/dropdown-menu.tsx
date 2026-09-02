import { Link, createFileRoute } from '@tanstack/react-router'
import { Copy, Ellipsis, Pencil, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { Alert, AlertDescription, AlertTitle } from '@/registry/ui/alert'
import { Button } from '@/registry/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/registry/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

export const Route = createFileRoute('/components/dropdown-menu')({
  component: DropdownMenuPage,
})

function DropdownMenuPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Dropdown Menu
        </h1>
        <p className="text-muted-foreground text-lg">
          A trigger opens a list of actions the user runs once: rename,
          duplicate, share, delete, or go somewhere. The menu owns the surface,
          the positioning, and the keyboard path. The app owns what each item
          does and the result of it, shown inline via alert after the menu
          closes.
        </p>
        <p className="text-muted-foreground text-lg">
          <strong className="text-foreground">Actions only.</strong> No checkbox
          items, no radio items, and no submenu — a view-settings menu with
          toggles is <code>Switch</code> on the page, not a menu that stays
          open.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Parts</h2>
        <p className="text-muted-foreground">
          Eight parts: <code>DropdownMenu</code>,{' '}
          <code>DropdownMenuTrigger</code>, <code>DropdownMenuContent</code>,{' '}
          <code>DropdownMenuGroup</code>, <code>DropdownMenuLabel</code>,{' '}
          <code>DropdownMenuItem</code>, <code>DropdownMenuSeparator</code>, and{' '}
          <code>DropdownMenuShortcut</code>. <code>DropdownMenuTrigger</code>{' '}
          forces <code>asChild</code> and takes exactly one registry Button, the
          same rule as dialog. <code>DropdownMenuContent</code> takes only{' '}
          <code>side</code> and <code>align</code> — everything else about its
          positioning is fixed by the system. <code>DropdownMenuGroup</code> is
          semantic only, with no visual of its own; a group with a heading puts
          a <code>DropdownMenuLabel</code> as its first child.{' '}
          <code>DropdownMenuShortcut</code> is display only — the menu binds no
          key, the app owns the shortcut.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Item API</h2>
        <p className="text-muted-foreground">
          <code>DropdownMenuItem</code> takes <code>variant</code> (
          <code>default</code> or <code>destructive</code>), an{' '}
          <code>icon</code> rendered in a slot that is always reserved so text
          aligns down the menu, <code>asChild</code>, <code>onSelect</code>, and{' '}
          <code>disabled</code>.{' '}
          <strong className="text-foreground">
            An action item uses <code>onSelect</code>; a navigation item wraps
            the router's <code>Link</code> with <code>asChild</code>.
          </strong>{' '}
          With <code>asChild</code>, the item renders the icon slot, then its
          children inside Radix <code>Slot.Slottable</code>, so the icon lands
          inside the <code>Link</code> alongside its own text — the link gets a
          real <code>href</code>, middle-click, and modifier-click, and choosing
          it with the keyboard follows it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">States</h2>
        <p className="text-muted-foreground">
          Radix merges hover and keyboard focus into one{' '}
          <code>data-highlighted</code> state: a background step to{' '}
          <code>--accent</code>, or to <code>--error</code> for a destructive
          item.{' '}
          <strong className="text-foreground">
            The highlight snaps, by design
          </strong>{' '}
          — no transition, because a fade smears while arrowing quickly and
          native menus snap. An item draws no press ring and no focus ring: the
          highlight moves with focus and is the focus indicator. A disabled item
          still renders, at half opacity, so its position never shifts between
          opens. The panel itself takes <code>outline-hidden</code> for the
          pointer-opened case where Radix focuses the panel and not an item.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Panel</h2>
        <p className="text-muted-foreground">
          One size: a 32px item and a panel with <code>p-1</code> and a{' '}
          <code>min-w-32</code> floor. The panel caps its height to Radix's own
          available-height variable and scrolls internally, so a long list never
          runs off the viewport. <code>loop</code> stays <code>false</code>:{' '}
          <code>ArrowDown</code> on the last item stays put, matching macOS
          menus.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Exhibition mode</h2>
        <p className="text-muted-foreground">
          <code>exhibitionMode</code> renders the menu inline for this docs
          page, with Radix <code>modal</code> off — no scroll lock, no
          outside-pointer block — while Radix's own positioning stays on, so the
          panel still sits under its trigger.{' '}
          <strong className="text-foreground">
            It is never used in an app.
          </strong>
        </p>
        <ModePreview>
          <div className="relative h-64 w-full">
            <DropdownMenu defaultOpen exhibitionMode>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Trip actions"
                >
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Weekend in Kyoto</DropdownMenuLabel>
                <DropdownMenuItem icon={<Pencil />}>
                  Rename
                  <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem icon={<Copy />}>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={<Trash2 />} variant="destructive">
                  Delete trip
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Live example</h2>
        <p className="text-muted-foreground">
          An overflow menu on a trip card: two labelled groups, a disabled item,
          action items on <code>onSelect</code>, and one navigation item as a{' '}
          <code>Link</code> through <code>asChild</code> — both item forms sit
          side by side. Choosing{' '}
          <strong className="text-foreground">Delete trip</strong> opens the
          registry <code>Dialog</code> with no trigger of its own,{' '}
          <code>dismissible={'{false}'}</code>, and <code>pending</code> while
          the delete runs. The menu itself never holds open and shows no
          busyness — the dialog and, after it closes, the alert carry that.
        </p>
        <ModePreview>
          <TripCardOverflowMenu />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          Enter scales from 0.96 plus a fade over 250ms on the bounce curve,
          transform origin at the Radix popper variable so a flipped panel still
          grows from its trigger. Exit runs 150ms on the settle curve. The
          highlight itself carries no animation.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The trigger exposes <code>aria-haspopup="menu"</code> and{' '}
          <code>aria-expanded</code>. <code>Enter</code>, <code>Space</code>, or{' '}
          <code>ArrowDown</code> opens the menu with the first item highlighted;
          a pointer click opens it with no item highlighted.{' '}
          <code>ArrowUp</code>/<code>ArrowDown</code> move the highlight,{' '}
          <code>Home</code>/<code>End</code> jump, and typing runs typeahead.{' '}
          <code>Tab</code> is blocked inside the menu and disabled items are
          skipped. <code>Escape</code> and an outside click both close the menu
          and return focus to the trigger, including after a link item navigates
          within the same route tree. Every text pair meets WCAG AA in both
          modes.
        </p>
      </section>
    </article>
  )
}

function TripCardOverflowMenu() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletePending, setDeletePending] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const deleteTimeout = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (deleteTimeout.current) clearTimeout(deleteTimeout.current)
    }
  }, [])

  function handleConfirmDelete() {
    setDeletePending(true)
    deleteTimeout.current = setTimeout(() => {
      setDeletePending(false)
      setDeleteDialogOpen(false)
      setDeleted(true)
    }, 1200)
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Card className="w-72">
        <CardHeader className="flex-row items-start justify-between gap-2">
          <CardTitle>Weekend in Kyoto</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon-sm" aria-label="Trip actions">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Manage</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => setDeleted(false)}>
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setDeleted(false)}>
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem disabled>Archive</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Go</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/components/card">View itinerary</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => setDeleteDialogOpen(true)}
              >
                Delete trip
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Temples in the morning, tea in the afternoon, a river walk at dusk.
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        dismissible={false}
        pending={deletePending}
      >
        <DialogContent>
          <DialogTitle>Delete this trip?</DialogTitle>
          <DialogDescription>
            Weekend in Kyoto and its itinerary are gone for good.
          </DialogDescription>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              loading={deletePending}
              onClick={handleConfirmDelete}
            >
              Delete trip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Alert
        variant="success"
        open={deleted}
        onClose={() => setDeleted(false)}
        className="w-72"
      >
        <AlertTitle>Trip deleted</AlertTitle>
        <AlertDescription>Weekend in Kyoto was removed.</AlertDescription>
      </Alert>
    </div>
  )
}
