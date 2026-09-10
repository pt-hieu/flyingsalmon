import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Compass,
  Copy,
  Ellipsis,
  Pencil,
  Plus,
  Share2,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'
import { Avatar, AvatarColor, AvatarSize } from '@/registry/ui/avatar'
import { Badge, BadgeVariant } from '@/registry/ui/badge'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import { Checkbox } from '@/registry/ui/checkbox'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuAlign,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemVariant,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'
import { Input, InputType } from '@/registry/ui/input'
import { Select, SelectItem } from '@/registry/ui/select'
import { Skeleton, SkeletonVariant } from '@/registry/ui/skeleton'
import { Spinner, SpinnerSize } from '@/registry/ui/spinner'
import { Switch } from '@/registry/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs'
import { Textarea } from '@/registry/ui/textarea'
import { Tooltip } from '@/registry/ui/tooltip'

export const Route = createFileRoute('/')({ component: ExemplarPage })

enum TripStatus {
  Confirmed = 'confirmed',
  Planning = 'planning',
  Completed = 'completed',
}

interface Collaborator {
  name: string
  color: AvatarColor
}

interface Trip {
  id: string
  title: string
  dates: string
  summary: string
  status: TripStatus
  collaborators: Collaborator[]
}

const badgeVariantByTripStatus: Record<TripStatus, BadgeVariant> = {
  [TripStatus.Confirmed]: BadgeVariant.Success,
  [TripStatus.Planning]: BadgeVariant.Warning,
  [TripStatus.Completed]: BadgeVariant.Secondary,
}

const badgeLabelByTripStatus: Record<TripStatus, string> = {
  [TripStatus.Confirmed]: 'Confirmed',
  [TripStatus.Planning]: 'Planning',
  [TripStatus.Completed]: 'Completed',
}

const initialTrips: Trip[] = [
  {
    id: 'kyoto',
    title: 'Weekend in Kyoto',
    dates: '14 – 17 Nov',
    summary:
      'Temples in the morning, tea in the afternoon, a river walk at dusk.',
    status: TripStatus.Confirmed,
    collaborators: [
      { name: 'Ada Lovelace', color: AvatarColor.Indigo },
      { name: 'Grace Hopper', color: AvatarColor.Green },
      { name: 'Brian Nguyen', color: AvatarColor.Pink },
    ],
  },
  {
    id: 'da-nang',
    title: 'Six days in Da Nang',
    dates: '2 – 8 Dec',
    summary: 'Beach mornings, Marble Mountains, and one long night market.',
    status: TripStatus.Planning,
    collaborators: [
      { name: 'Brian Nguyen', color: AvatarColor.Pink },
      { name: 'Linus Torvalds', color: AvatarColor.Sky },
    ],
  },
  {
    id: 'lisbon',
    title: 'Lisbon in spring',
    dates: '3 – 9 Apr',
    summary: 'Tram 28, pastel de nata every morning, a day trip to Sintra.',
    status: TripStatus.Completed,
    collaborators: [{ name: 'Ada Lovelace', color: AvatarColor.Indigo }],
  },
]

const destinationOptions = [
  { value: 'kyoto', label: 'Kyoto, Japan' },
  { value: 'da-nang', label: 'Da Nang, Vietnam' },
  { value: 'lisbon', label: 'Lisbon, Portugal' },
  { value: 'reykjavik', label: 'Reykjavík, Iceland' },
]

interface Notice {
  variant: AlertVariant
  title: string
  description: string
}

function ExemplarPage() {
  const [trips, setTrips] = useState(initialTrips)
  const [notice, setNotice] = useState<Notice>()

  const upcomingTrips = trips.filter(
    (trip) => trip.status !== TripStatus.Completed,
  )
  const pastTrips = trips.filter((trip) => trip.status === TripStatus.Completed)

  function handleTripCreated(trip: Trip) {
    setTrips((currentTrips) => [trip, ...currentTrips])
    setNotice({
      variant: AlertVariant.Success,
      title: 'Trip saved',
      description: `${trip.title} is on your upcoming list.`,
    })
  }

  function handleTripDeleted(trip: Trip) {
    setTrips((currentTrips) =>
      currentTrips.filter((currentTrip) => currentTrip.id !== trip.id),
    )
    setNotice({
      variant: AlertVariant.Info,
      title: 'Trip deleted',
      description: `${trip.title} was removed.`,
    })
  }

  function handleTripDuplicated(trip: Trip) {
    const duplicatedTrip: Trip = {
      ...trip,
      id: `${trip.id}-copy-${trips.length}`,
      title: `${trip.title} (copy)`,
      status: TripStatus.Planning,
    }
    setTrips((currentTrips) => [duplicatedTrip, ...currentTrips])
    setNotice({
      variant: AlertVariant.Success,
      title: 'Trip duplicated',
      description: `${duplicatedTrip.title} is ready to edit.`,
    })
  }

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <header className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Exemplar — a trip planner assembled from the{' '}
          <Link to="/components" className="text-foreground underline">
            registry components
          </Link>
          .
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-heading text-4xl font-bold tracking-tight">
              Your trips
            </h1>
            <p className="text-muted-foreground text-lg">
              Everything you are planning, sharing, or have already taken.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip content="Share all trips">
              <Button
                variant={ButtonVariant.Outline}
                size={ButtonSize.Icon}
                aria-label="Share all trips"
              >
                <Share2 />
              </Button>
            </Tooltip>
            <PlanTripDialog onTripCreated={handleTripCreated} />
          </div>
        </div>
      </header>

      <Alert
        open={Boolean(notice)}
        variant={notice?.variant}
        onClose={() => setNotice(undefined)}
      >
        <AlertTitle>{notice?.title}</AlertTitle>
        <AlertDescription>{notice?.description}</AlertDescription>
      </Alert>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming
            <Badge variant={BadgeVariant.Secondary} className="ml-2">
              {upcomingTrips.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="pt-6">
          <TripGrid
            trips={upcomingTrips}
            onTripDeleted={handleTripDeleted}
            onTripDuplicated={handleTripDuplicated}
          />
        </TabsContent>

        <TabsContent value="suggestions" className="pt-6">
          <SuggestionsPanel />
        </TabsContent>

        <TabsContent value="past" className="pt-6">
          <TripGrid
            trips={pastTrips}
            onTripDeleted={handleTripDeleted}
            onTripDuplicated={handleTripDuplicated}
          />
        </TabsContent>
      </Tabs>

      <SharingPreferences />
    </main>
  )
}

function TripGrid({
  trips,
  onTripDeleted,
  onTripDuplicated,
}: {
  trips: Trip[]
  onTripDeleted: (trip: Trip) => void
  onTripDuplicated: (trip: Trip) => void
}) {
  if (trips.length === 0) {
    return (
      <EmptyState className="py-12">
        <EmptyStateIcon>
          <Compass />
        </EmptyStateIcon>
        <EmptyStateTitle>No trips yet</EmptyStateTitle>
        <EmptyStateDescription>
          Tell hottrip where you want to go and it drafts the route.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button>
            <Plus />
            Plan a trip
          </Button>
        </EmptyStateActions>
      </EmptyState>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
          onDeleted={() => onTripDeleted(trip)}
          onDuplicated={() => onTripDuplicated(trip)}
        />
      ))}
    </div>
  )
}

function TripCard({
  trip,
  onDeleted,
  onDuplicated,
}: {
  trip: Trip
  onDeleted: () => void
  onDuplicated: () => void
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const deleteTimeout = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (deleteTimeout.current) clearTimeout(deleteTimeout.current)
    }
  }, [])

  function handleConfirmDelete() {
    setDeleting(true)
    deleteTimeout.current = setTimeout(() => {
      setDeleting(false)
      setConfirmingDelete(false)
      onDeleted()
    }, 1200)
  }

  return (
    <Card interactive>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant={badgeVariantByTripStatus[trip.status]}>
            {badgeLabelByTripStatus[trip.status]}
          </Badge>
          <span className="text-muted-foreground text-xs">{trip.dates}</span>
        </div>
        <CardTitle>
          <a href={`#trip-${trip.id}`}>{trip.title}</a>
        </CardTitle>
        <CardDescription>{trip.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1">
          {trip.collaborators.map((collaborator) => (
            <Avatar
              key={collaborator.name}
              size={AvatarSize.Small}
              name={collaborator.name}
              color={collaborator.color}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs">
        {trip.collaborators.length === 1
          ? 'Just you'
          : `${trip.collaborators.length} travellers`}
      </CardFooter>
      <CardAction>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={ButtonVariant.Ghost}
              size={ButtonSize.IconSmall}
              aria-label={`Actions for ${trip.title}`}
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={DropdownMenuAlign.End}>
            <DropdownMenuLabel>{trip.title}</DropdownMenuLabel>
            <DropdownMenuItem icon={<Pencil />}>
              Rename
              <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem icon={<Copy />} onSelect={onDuplicated}>
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              icon={<Trash2 />}
              variant={DropdownMenuItemVariant.Destructive}
              onSelect={() => setConfirmingDelete(true)}
            >
              Delete trip
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardAction>

      <Dialog
        open={confirmingDelete}
        onOpenChange={setConfirmingDelete}
        dismissible={false}
        pending={deleting}
      >
        <DialogContent>
          <DialogTitle>Delete {trip.title}?</DialogTitle>
          <DialogDescription>
            This removes the itinerary for every traveller on it.
          </DialogDescription>
          <DialogFooter>
            <DialogClose>
              <Button variant={ButtonVariant.Outline} disabled={deleting}>
                Keep it
              </Button>
            </DialogClose>
            <Button
              variant={ButtonVariant.Destructive}
              loading={deleting}
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

function PlanTripDialog({
  onTripCreated,
}: {
  onTripCreated: (trip: Trip) => void
}) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState('')
  const [destination, setDestination] = useState<string>()
  const [titleError, setTitleError] = useState<string>()
  const [destinationError, setDestinationError] = useState<string>()
  const saveTimeout = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current)
    }
  }, [])

  function resetForm() {
    setTitle('')
    setDestination(undefined)
    setTitleError(undefined)
    setDestinationError(undefined)
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) resetForm()
  }

  function handleSave() {
    const nextTitleError = title.trim() ? undefined : 'Give the trip a name.'
    const nextDestinationError = destination ? undefined : 'Pick a destination.'
    setTitleError(nextTitleError)
    setDestinationError(nextDestinationError)
    if (nextTitleError || nextDestinationError) return

    setSaving(true)
    saveTimeout.current = setTimeout(() => {
      setSaving(false)
      onTripCreated({
        id: `trip-${title.trim().toLowerCase().replace(/\s+/g, '-')}`,
        title: title.trim(),
        dates: 'Dates to be decided',
        summary:
          destinationOptions.find((option) => option.value === destination)
            ?.label ?? '',
        status: TripStatus.Planning,
        collaborators: [{ name: 'Brian Nguyen', color: AvatarColor.Pink }],
      })
      handleOpenChange(false)
    }, 1400)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} pending={saving}>
      <DialogTrigger>
        <Button icon={<Plus />}>Plan a trip</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Plan a trip</DialogTitle>
        <DialogDescription>
          Name it, pick a destination, and add a note for your travellers.
        </DialogDescription>
        <DialogBody>
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              handleSave()
            }}
          >
            <Input
              label="Trip name"
              placeholder="Weekend in Kyoto"
              value={title}
              error={titleError}
              disabled={saving}
              onChange={(event) => {
                setTitle(event.target.value)
                if (titleError) setTitleError(undefined)
              }}
            />
            <Select
              label="Destination"
              placeholder="Choose a destination"
              value={destination}
              error={destinationError}
              disabled={saving}
              onValueChange={(nextDestination) => {
                setDestination(nextDestination)
                setDestinationError(undefined)
              }}
            >
              {destinationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            <Input
              label="Travellers to invite"
              type={InputType.Email}
              placeholder="ada@example.com"
              disabled={saving}
            />
            <Textarea
              label="Note for travellers"
              placeholder="Bring a rain jacket, and no plans before 10am."
              disabled={saving}
            />
            <Checkbox
              label="Let the planner draft a first itinerary"
              defaultChecked
              disabled={saving}
            />
          </form>
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant={ButtonVariant.Outline} disabled={saving}>
              Cancel
            </Button>
          </DialogClose>
          <Button loading={saving} onClick={handleSave}>
            Save trip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function SuggestionsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <Spinner size={SpinnerSize.Small} label="Drafting suggestions" />
        <span className="text-muted-foreground">
          Drafting three ideas from your past trips
        </span>
        <Badge icon={<Sparkles />}>AI</Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1].map((suggestionIndex) => (
          <Card key={suggestionIndex}>
            <CardHeader>
              <Skeleton className="w-20" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton />
              <Skeleton className="w-5/6" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <Skeleton variant={SkeletonVariant.Circle} className="size-6" />
                <Skeleton variant={SkeletonVariant.Circle} className="size-6" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SharingPreferences() {
  const [sharingEnabled, setSharingEnabled] = useState(true)
  const [savingSharing, setSavingSharing] = useState(false)
  const sharingTimeout = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (sharingTimeout.current) clearTimeout(sharingTimeout.current)
    }
  }, [])

  function handleSharingChange(nextEnabled: boolean) {
    setSharingEnabled(nextEnabled)
    setSavingSharing(true)
    sharingTimeout.current = setTimeout(() => setSavingSharing(false), 900)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sharing</CardTitle>
        <CardDescription>
          How travellers on your trips see changes.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Switch
          label="Let travellers edit the itinerary"
          checked={sharingEnabled}
          loading={savingSharing}
          onCheckedChange={handleSharingChange}
        />
        <Checkbox label="Email me when someone adds a stop" defaultChecked />
        <Checkbox label="Show my trips on my public profile" />
      </CardContent>
      <CardFooter className="gap-2">
        <Avatar
          size={AvatarSize.Small}
          name="Brian Nguyen"
          color={AvatarColor.Pink}
        />
        <span className="text-muted-foreground text-xs">
          Signed in as Brian Nguyen
        </span>
      </CardFooter>
    </Card>
  )
}
